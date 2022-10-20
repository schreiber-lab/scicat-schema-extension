import pytest

# from pytest_mongodb import plugin

import upload_backend
import upload_backend.db

# from upload_backend import create_app

# from main import app as flaskapp


@pytest.fixture(autouse=True)  # (scope="session")
def patch_mongo(mongodb, monkeypatch):
    class fake_mongo:
        def init_app(self, app):
            self.db = mongodb

    def fake_mongo_func():
        # print("fake get mongo")
        return fake_mongo()

    monkeypatch.setattr(upload_backend.db, "get_mongo", fake_mongo_func)


@pytest.fixture()
def app(patch_mongo):

    test_config = {
        "TESTING": True,
        "MONGO_URI": "mongodb://nowhere:27017/scicat_addons",
    }

    app = upload_backend.create_app(config_mapping=test_config)

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    #  from flask import current_app
    #  print ("current app",current_app._get_current_object().config["TESTING"])

    yield app.test_client()


@pytest.fixture()
def runner(app):
    yield app.test_cli_runner()


@pytest.fixture()
def use_prepop_db(mongodb):
    """
    use prepopulated db for tests instead of creating all collections from fresh
    """
    mongodb.rename_collection("prepopulate_metadata_schemas", "metadata_schemas")
    mongodb.rename_collection(
        "prepopulated_fixed_values_test schema200", "fixed_values_test schema200"
    )
