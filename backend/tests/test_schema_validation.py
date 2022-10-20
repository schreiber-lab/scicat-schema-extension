import json
from copy import deepcopy


def _post_request(client, endpoint, data):
    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    return client.post(endpoint, data=json.dumps(data), headers=headers)


def test_fixed_values(client, mongodb):
    """
    check that schema can be added to the db and that invalid schema is rejected
    """
    data = {
        "schema_name": "test_cat",
        "schema_type": "dataset",
        "fixed_value_entries": True,
        "multiples_entries": True,
        "keys": [
            {"key_name": "key1", "type": "string"},
            {"key_name": "key2", "type": "string"},
        ],
    }

    # this should not work without id_key
    response = _post_request(client, "addons/metadata_schemas", data)
    assert response.status_code == 406

    data["id_key"] = "key1"
    response = _post_request(client, "addons/metadata_schemas", data)
    assert response.status_code == 200

    db_entry = mongodb.metadata_schemas.find_one({"schema_name": "test_cat"})
    assert db_entry is not None
    assert len(db_entry) == 7

    # check that sub-table has been created
    assert "fixed_values_test_cat" in mongodb.list_collection_names()

    # enter some values

    entry_data = {
        "entries": [
            {"schema_name": "test_cat", "key1": "a", "key2": "aa"},
            {"schema_name": "test_cat", "key1": "b", "key2": "bb"},
            {"schema_name": "test_cat", "key1": "c", "key2": "cc"},
        ]
    }
    response = _post_request(client, "/addons/add_fixed_value_entries", entry_data)
    assert response.status_code == 200

    # try to get the keys
    response = client.get("/addons/get_fixed_value_entries?schema_name=test_cat")
    assert response.status_code == 200
    resp = json.loads(response.data)

    # try to validate md
    ds_data = {
        "object_type": "dataset",
        "metadata": {
            "test_cat": [{"key1": "a", "key2": "aa"}, {"key1": "b", "key2": "bb"}]
        },
    }

    response = _post_request(client, "/addons/validate", ds_data)
    assert response.status_code == 200
