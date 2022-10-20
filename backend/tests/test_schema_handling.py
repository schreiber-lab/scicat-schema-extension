import json


def test_get_addons_metadata_schemas(client):
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


def test_get_addons_metadata_schema(client):
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
            {"key_name": "key2", "allowed": ["beamtime", "lab"],},
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


def test_addons_get_fixed_value_entries(client):
    """
    check that data in fixed_value collection is available
    """
    response = client.get("/addons/get_fixed_value_entries?schema_name=material")
    assert b"Diindenoperylene" in response.data
    assert response.status_code == 200

    response = client.get("/addons/get_fixed_value_entries?schema_name=does_not_exist")
    assert b"error" in response.data
    assert response.status_code == 406


def test_add_fixed_value_entries(client):
    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
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
