# import pytest
# from flask import url_for


def test_hello(client):
    response = client.get("/hello")
    assert b"Hello, World!" in response.data


## simple test to see that mock of mongodb is working
def test_simple_mongo(mongodb):
    assert "prepopulate_metadata_schemas" in mongodb.list_collection_names()


## test combination of flask and mongo
def test_flask_and_mongo(client):
    response = client.get("/addons/metadata_schemas")
    assert b"changes_likely" in response.data


def test_db_collection_creation(client, mongodb):
    """
    check if the additional collections in db are created on before first request if missing
    """
    assert "prepopulate_metadata_schemas" in mongodb.list_collection_names()
    assert len(mongodb.list_collection_names()) == 2

    response = client.get("/addons/metadata_schemas")

    assert "metadata_schemas" in mongodb.list_collection_names()
    assert "fixed_values_material" in mongodb.list_collection_names()
    assert len(mongodb.list_collection_names()) == 4

    assert b"changes_likely" in response.data


def test_db_use_prepop_db(client, mongodb, use_prepop_db):
    """
    check if app works with existing 'metadata_schemas' collection in db
    """
    assert "metadata_schemas" in mongodb.list_collection_names()
    assert len(mongodb.list_collection_names()) == 2

    response = client.get("/addons/metadata_schemas")

    assert "metadata_schemas" in mongodb.list_collection_names()
    assert len(mongodb.list_collection_names()) == 2

    assert b"changes_likely" in response.data
