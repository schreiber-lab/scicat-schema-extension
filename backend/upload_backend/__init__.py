from flask import Flask, current_app
from flask_apispec import FlaskApiSpec
from flask_cors import CORS

from inspect import getmembers, isfunction


def create_app(config_file=None, config_mapping=None):
    # create and configure the app
    app = Flask(__name__)
    # app.config.from_mapping(
    #    SECRET_KEY='dev',
    #    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    # )

    if config_file is not None:
        # load config, if it exists
        app.config.from_pyfile(config_file, silent=False)
    if config_mapping is not None:
        # load the config if passed in config_mapping
        app.config.from_mapping(config_mapping)

    # print(app.config)

    # init db
    from .db import get_mongo

    mongo = get_mongo()
    mongo.init_app(app)
    app.db = mongo.db

    app.before_first_request(init_addon_db)

    # add CORS rules
    CORS(app)

    # a simple page that says hello
    @app.route("/hello")
    def hello():
        return "Hello, World!"

    # init docs
    docs = FlaskApiSpec(app)
    # ApiSpec generates
    # /swagger
    # /swagger-ui

    # register blueprints
    blueprint_modules = list()

    # sort of manual plugin-mechanism, only needed to automate
    # docs registration...
    from .views import schema_handling, validation

    blueprint_modules.append(schema_handling)
    blueprint_modules.append(validation)

    # there should be more elegant ways to do this.
    register(blueprint_modules, app, docs)

    return app


def register(bpm_list, app, docs):
    for bpm in bpm_list:
        bp = getattr(bpm, "bp")
        app.register_blueprint(bp)
        for f in getmembers(bpm, isfunction):
            docs.register(f[1], blueprint=bp.name)


### init db if needed
# helper to create dynamic collections
def create_dyn_collection(name, id_key):
    current_app.db.create_collection("fixed_values_" + name)
    print(
        "======= create scicat_addons fixed_values_" + name + " collection ==========="
    )
    if id_key is not None:
        # TODO replace getattr by something nice
        getattr(current_app.db, "fixed_values_" + name).create_index(
            id_key, unique=True
        )


def init_addon_db():
    if "metadata_schemas" not in current_app.db.list_collection_names():
        current_app.db.create_collection("metadata_schemas")
        current_app.db.metadata_schemas.create_index("schema_name", unique=True)
        print("======= create scicat_addons metadata schemas collection ===========")

        # to get started: prepopulate this collection  TODO: this should be done somewhere else
        from .md_schema.base_sci_meta_schema import (
            schema_template_json,
            fixed_value_entries,
        )
        from .md_schema import validator

        for s in schema_template_json:
            norm = validator.validate_md_schema(s)
            current_app.db.metadata_schemas.insert_one(norm)
            if norm["fixed_value_entries"]:
                create_dyn_collection(
                    norm["schema_name"], norm.setdefault("id_key", None)
                )

        for e in fixed_value_entries:
            # TODO: add validation
            # TODO: replace getattr with something 'nice'
            cp = e.copy()
            schema_name = cp.pop("schema_name")
            getattr(current_app.db, "fixed_values_" + schema_name).insert_one(cp)
