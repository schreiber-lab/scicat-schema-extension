import json


def test_get_addons_metadata_schemas(client, use_prepop_db):
    # check that dataset is default object_type
    response = client.get("/addons/metadata_schemas")
    assert b'"schema_type":"dataset"' in response.data
    assert b'"schema_type":"sample"' in response.data

    # check this works for a given object_type
    response = client.get("/addons/metadata_schemas?object_type=sample")
    assert b'"schema_type":"dataset"' not in response.data
    assert b'"schema_type":"sample"' in response.data

    # check that marshaling works
    response = client.get("/addons/metadata_schemas?object_type=nothing")
    assert response.status_code == 422


def test_patch_fixed_value_entry(client, use_prepop_db):
    response = client.get("/addons/get_fixed_value_entries?schema_name=test schema100")
    entries = json.loads(response.data)["entries"]

    assert {"test key": "100", "test key56": "test value"} in entries
    assert len(entries) == 2

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "test schema100",
        "entry_id": "test value",
        "new_entry_details": {"test key": "150", "test key56": "test value2"},
    }

    patch_response = client.patch(
        "/addons/fixed_value_entry", data=json.dumps(data), headers=headers
    )

    assert patch_response.status_code == 200

    response2 = client.get("/addons/get_fixed_value_entries?schema_name=test schema100")
    entries2 = json.loads(response2.data)["entries"]

    assert {"test key": "100", "test key56": "test value"} not in entries2
    assert {"test key": "150", "test key56": "test value2"} in entries2
    assert len(entries2) == 2

    data["schema_name"] = "inexistent"

    patch_response = client.patch(
        "/addons/fixed_value_entry", data=json.dumps(data), headers=headers
    )

    assert patch_response.status_code == 406

    data["schema_name"] = "test schema100"
    data["entry_id"] = "doesn't exist"

    assert patch_response.status_code == 406


def test_delete_fixed_value_entry(client, use_prepop_db):
    response = client.get("/addons/get_fixed_value_entries?schema_name=test schema200")
    entries = json.loads(response.data)["entries"]
    assert len(entries) == 2

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "test schema200",
        "entry_id": "test value",
    }

    del_response = client.delete(
        "/addons/fixed_value_entry", data=json.dumps(data), headers=headers
    )

    assert del_response.status_code == 200

    response = client.get("/addons/get_fixed_value_entries?schema_name=test schema200")
    entries = json.loads(response.data)["entries"]
    assert len(entries) == 1

    # see what happens with invalid schema name
    data["schema_name"] = "inexistent"

    del_response = client.delete(
        "/addons/fixed_value_entry", data=json.dumps(data), headers=headers
    )

    assert del_response.status_code == 406

    # see what happens with invalid entry id
    data["schema_name"] = "test schema200"
    data["entry_id"] = "doesn't exist"

    del_response = client.delete(
        "/addons/fixed_value_entry", data=json.dumps(data), headers=headers
    )

    assert del_response.status_code == 406


def test_get_addons_metadata_schema(client, use_prepop_db):
    # check this works for a given object_type
    response = client.get("/addons/get_metadata_schema?schema_name=measurement")

    schema = json.loads(response.data)
    assert schema["schema_name"] == "measurement"


def test_post_addons_metadata_schemas(client, mongodb):
    """
    check that schema can be added to the db and that invalid schema is rejected
    """

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "test_md_schema",
        "schema_type": "dataset",
        "keys": [
            {"key_name": "key1", "changes_likely": False},
            {
                "key_name": "key2",
                "allowed": ["beamtime", "lab"],
            },
        ],
    }

    response = client.post(
        "/addons/metadata_schemas", data=json.dumps(data), headers=headers
    )
    assert response.status_code == 200
    assert json.loads(response.data)["status"] == "success"
    assert (
        len(
            [
                x
                for x in mongodb.metadata_schemas.find(
                    {"schema_name": "test_md_schema"}
                )
            ]
        )
        == 1
    )

    data["toto"] = "titi"

    response = client.post(
        "/addons/metadata_schemas", data=json.dumps(data), headers=headers
    )
    assert response.status_code == 422


def test_addons_get_fixed_value_entries(client, use_prepop_db):
    """
    check that data in fixed_value collection is available
    """
    response = client.get("/addons/get_fixed_value_entries?schema_name=test schema200")
    assert b"test key" in response.data
    assert response.status_code == 200

    response = client.get("/addons/get_fixed_value_entries?schema_name=does_not_exist")
    assert b"error" in response.data
    assert response.status_code == 406


def test_add_fixed_value_entries(client):

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "material",
        "schema_type": "sample",
        "fixed_value_entries": True,
        "multiples_entries": True,
        "id_key": "material_id",
        "keys": [
            {
                "key_name": "material_id",
                "type": "string",
                "required": True,
            },  # a.k.a. short name
            {"key_name": "full_name", "type": "string", "required": False},
            {"key_name": "formula", "type": "string", "required": False},
            {"key_name": "composition", "type": "dict", "required": False},
        ],
    }

    response = client.post(
        "/addons/metadata_schemas", data=json.dumps(data), headers=headers
    )
    assert response.status_code == 200

    data = {
        "entries": [
            {
                "schema_name": "material",
                "material_id": "NM",
                "full_name": "new_matieral",
                "formula": "C222H444",
            },
        ]
    }

    response = client.post(
        "/addons/add_fixed_value_entries", data=json.dumps(data), headers=headers
    )
    assert b"C222H444" in response.data
    assert response.status_code == 200

    # check what happens when adding the same key twice
    response = client.post(
        "/addons/add_fixed_value_entries", data=json.dumps(data), headers=headers
    )
    assert response.status_code != 403
    assert b"already exists" in response.data

    # check what happens with invalid schema
    data = {
        "entries": [
            {
                "schema_name": "material",
                "material_id": "NM1",
                "just_a_unkown_key": "something",
                "full_name": "new_matieral",
                "formula": "C222H444",
            },
        ]
    }
    response = client.post(
        "/addons/add_fixed_value_entries", data=json.dumps(data), headers=headers
    )
    assert b"unknown field" in response.data


def test_post_addons_metadata_schemas_empty_schema(client, mongodb):
    """
    check that schema can be added to the db and that invalid schema is rejected
    """

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "test_md_schema",
        "schema_type": "dataset",
    }

    response = client.post(
        "/addons/metadata_schemas", data=json.dumps(data), headers=headers
    )
    assert response.status_code == 422


def test_fixed_value_metadata_schemas_post_get1(client, mongodb):
    """
    check that schema can be added to the db and that invalid schema is rejected
    """

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "test_fixed_value_schema",
        "schema_type": "dataset",
        "fixed_value_entries": True,
        "id_key": "key1",
        "keys": [
            {"key_name": "key1", "type": "string"},
            {"key_name": "key2", "type": "number", "unit": "mm"},
        ],
    }

    response = client.post(
        "/addons/metadata_schemas", data=json.dumps(data), headers=headers
    )
    assert response.status_code == 200

    data = {
        "entries": [
            {
                "schema_name": "test_fixed_value_schema",
                "key1": "test",
                "key2": {"value": 13, "unit": "mm"},
            },
        ]
    }

    response = client.post(
        "/addons/add_fixed_value_entries", data=json.dumps(data), headers=headers
    )
    assert response.status_code == 200


def test_fixed_value_metadata_schemas_post_get2(client, mongodb, use_prepop_db):

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}

    data = {
        "entries": [
            {
                "schema_name": "test schema200",
                "test key": {"unit": "mm", "value": 234},
                "test key56": "asfdasdf",
            }
        ]
    }

    response = client.post(
        "/addons/add_fixed_value_entries", data=json.dumps(data), headers=headers
    )

    assert response.status_code == 200


def test_addons_delete_metadata_schem_key(client, use_prepop_db):
    # check that there is measurement_type in measurement
    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    assert "measurement_type" in [k["key_name"] for k in schema["keys"]]

    # remove measurement type
    del_response = client.delete(
        "/addons/metadata_schema_key?schema_name=measurement&key_name=measurement_type"
    )

    # check that there is measurement_type NOT in measurement
    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    assert "measurement_type" not in [k["key_name"] for k in schema["keys"]]

    resp = json.loads(del_response.data)
    assert resp["updatedExisting"] == True


def test_addons_update_metadata_schem_key(client, use_prepop_db):
    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    n_keys = len(schema["keys"])
    ind = [k["key_name"] for k in schema["keys"]].index("measurement_type")
    assert schema["keys"][ind]["type"] == "string"

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "measurement",
        "key_name": "measurement_type",
        "new_key_details": {"type": "boolean"},
    }

    update_response = client.patch(
        "/addons/metadata_schema_key", data=json.dumps(data), headers=headers
    )

    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    m_keys = len(schema["keys"])
    ind = [k["key_name"] for k in schema["keys"]].index("measurement_type")
    assert schema["keys"][ind]["type"] == "boolean"

    assert n_keys == m_keys

    resp = json.loads(update_response.data)
    assert resp["updatedExisting"] == True

    # test if renaming key works
    data["new_key_details"]["key_name"] = "toto"

    update_response = client.patch(
        "/addons/metadata_schema_key", data=json.dumps(data), headers=headers
    )

    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    m_keys = len(schema["keys"])
    assert "toto" in [k["key_name"] for k in schema["keys"]]
    assert "measurement_type" not in [k["key_name"] for k in schema["keys"]]
    assert n_keys == m_keys


def test_addons_insert_metadata_schem_key(client, use_prepop_db):
    # check this works for a given object_type

    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    n_keys = len(schema["keys"])

    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    data = {
        "schema_name": "measurement",
        "key_name": "new_key",
        "new_key_details": {"key_name": "key1", "type": "string"},
    }

    update_response = client.patch(
        "/addons/metadata_schema_key", data=json.dumps(data), headers=headers
    )

    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    m_keys = len(schema["keys"])

    assert n_keys + 1 == m_keys

    resp = json.loads(update_response.data)
    assert resp["updatedExisting"] == True

    # check if everything still works if there is no key_name in new_details
    data["new_key_details"].pop("key_name")

    update_response = client.patch(
        "/addons/metadata_schema_key", data=json.dumps(data), headers=headers
    )

    response = client.get("/addons/get_metadata_schema?schema_name=measurement")
    schema = json.loads(response.data)
    m_keys = len(schema["keys"])

    assert n_keys + 2 == m_keys

    assert "key1" in [k["key_name"] for k in schema["keys"]]
    assert "new_key" in [k["key_name"] for k in schema["keys"]]
