# make sure no callables are imported here ... due to inspection of module when building swagger
import json
import traceback
from http import HTTPStatus

import flask
import flask_apispec

from ..marshalling_schema import (
    MdEntriesSchema,
    MdSchemaName,
    MdSchemaSchema,
    TypeSchema,
    MdSchemaKey,
    MdSchemaKeyUpdate,
)
from ..md_schema import validator

bp = flask.Blueprint("schema", __name__)  # , url_prefix='/auth')


@bp.get("/addons/metadata_schemas")
@flask_apispec.use_kwargs(TypeSchema, location="query")
def get_metadata_schemas(object_type=None):
    """
    returns all stored schemas that of a given type
    """

    db = flask.current_app.db
    if object_type:
        md_schemas = db.metadata_schemas.find(
            {"schema_type": object_type}, {"_id": False}
        )
    else:
        md_schemas = db.metadata_schemas.find({}, {"_id": False})
    dyn_schemas = [md for md in md_schemas]
    return flask.jsonify(dyn_schemas)


@bp.post("/addons/metadata_schemas")
@flask_apispec.use_kwargs(MdSchemaSchema, location="json")
def add_metadata_schema(**mds):
    db = flask.current_app.db

    try:
        normalized_mds = validator.validate_md_schema(mds)

        if mds.pop("fixed_value_entries", False):
            id_key = mds.pop("id_key", None)
            if id_key is None:
                raise Exception("no id_key provided")
            getattr(db, "fixed_values_" + normalized_mds["schema_name"]).create_index(
                id_key, unique=True
            )

        #  print("==========", normalized_mat)
        db.metadata_schemas.insert_one(normalized_mds)
        normalized_mds.pop("_id")

        return flask.jsonify(status="success", normalized=normalized_mds)

    except (Exception, BaseException) as e:

        response_code = HTTPStatus.NOT_ACCEPTABLE
        return (
            str(type(e)) + " :   " + str(e) + "  " + traceback.format_exc(),
            int(response_code),
        )


@bp.get("/addons/get_metadata_schema")
@flask_apispec.use_kwargs(MdSchemaName, location="query")
def get_metadata_schema(schema_name=None):

    db = flask.current_app.db

    md_schemas = db.metadata_schemas.find({"schema_name": schema_name}, {"_id": False})
    dyn_schemas = [md for md in md_schemas][0]
    return flask.jsonify(dyn_schemas)


@bp.patch("/addons/metadata_schema_key")
@flask_apispec.use_kwargs(MdSchemaKeyUpdate, location="json")
def update_metadata_schema_key(schema_name=None, key_name=None, new_key_details=None):

    db = flask.current_app.db

    # make sure that there is also a key_name in new_key_details
    if "key_name" not in new_key_details:
        new_key_details["key_name"] = key_name

    try:
        md_schema = db.metadata_schemas.find({"schema_name": schema_name}).next()
        object_id = md_schema.pop("_id")

        keys_names = [k["key_name"] for k in md_schema["keys"]]
        if key_name in keys_names:
            md_schema["keys"][keys_names.index(key_name)].update(new_key_details)
        else:
            md_schema["keys"].append(new_key_details)

        normalized_mds = validator.validate_md_schema(md_schema)

        res = db.metadata_schemas.update_one(
            {"_id": object_id}, {"$set": {"keys": normalized_mds["keys"]}}, upsert=False
        )

        return flask.jsonify({"updatedExisting": res.raw_result["updatedExisting"]})

    except (Exception, BaseException) as e:

        response_code = HTTPStatus.NOT_ACCEPTABLE
        return (
            str(type(e)) + " :   " + str(e) + "  " + traceback.format_exc(),
            int(response_code),
        )


@bp.delete("/addons/metadata_schema_key")
@flask_apispec.use_kwargs(MdSchemaKey, location="query")
def delete_metadata_schema_key(schema_name=None, key_name=None):

    db = flask.current_app.db

    md_schema = db.metadata_schemas.find({"schema_name": schema_name}).next()

    # make sure that the key exists
    keys_names = [k["key_name"] for k in md_schema["keys"]]
    assert key_name in keys_names

    md_schema["keys"].pop(keys_names.index(key_name))

    res = db.metadata_schemas.update_one(
        {"_id": md_schema["_id"]}, {"$set": {"keys": md_schema["keys"]}}, upsert=False
    )

    #    breakpoint()
    #  dyn_schemas = [md for md in md_schemas][0]
    return flask.jsonify({"updatedExisting": res.raw_result["updatedExisting"]})


@bp.get("/addons/get_fixed_value_entries")
@flask_apispec.use_kwargs(MdSchemaName, location="query")
def get_fixed_value_entries(schema_name=None):
    db = flask.current_app.db
    resp = dict()

    db_collection = "fixed_values_" + schema_name

    if not db_collection in db.list_collection_names():
        response_code = HTTPStatus.NOT_ACCEPTABLE
        resp["error"] = "no db collection found corresponding to '" + schema_name + "'"
        return (json.dumps(resp), int(response_code))

    else:
        entries = getattr(db, db_collection).find({}, {"_id": False})
        resp["entries"] = [x for x in entries]
        return flask.jsonify(resp)


@bp.post("/addons/add_fixed_value_entries")
@flask_apispec.use_kwargs(MdEntriesSchema, location="json")
def add_fixed_value_entries(entries=None):
    db = flask.current_app.db

    validated_entries = list()

    # make sure all entries are valid
    for entry in entries:
        try:
            e_schema = db.metadata_schemas.find(
                {"schema_name": entry["schema_name"]}, {"_id": False}
            ).next()
            normalized_entry = validator.validate_fixed_entry(entry, e_schema)
            validated_entries.append(normalized_entry)

            # make sure all provided schema_names are valid
            schema_name = normalized_entry["schema_name"]
            db_collection = "fixed_values_" + schema_name
            if not db_collection in db.list_collection_names():
                response_code = HTTPStatus.NOT_ACCEPTABLE
                return (
                    json.dumps(
                        {
                            "error": "no db collection found corresponding to '"
                            + schema_name
                            + "'"
                        }
                    ),
                    int(response_code),
                )

            # make sure that no entry with same id-key exists
            if (
                getattr(db, db_collection).find_one(
                    {e_schema["id_key"]: normalized_entry[e_schema["id_key"]]}
                )
                is not None
            ):
                response_code = HTTPStatus.NOT_ACCEPTABLE
                return (
                    json.dumps(
                        {
                            "error": "entry for '"
                            + normalized_entry[e_schema["id_key"]]
                            + "' already exists!"
                        }
                    ),
                    int(response_code),
                )

        except (Exception, BaseException) as e:

            response_code = HTTPStatus.NOT_ACCEPTABLE
            return (
                str(type(e)) + " :   " + str(e) + "  " + traceback.format_exc(),
                int(response_code),
            )

    # finally enter all entries to db
    for entry in validated_entries:
        # make sure that schema_name does not enter db
        schema_name = entry.pop("schema_name")
        db_collection = "fixed_values_" + schema_name

        try:
            getattr(db, db_collection).insert_one(entry)
        except (Exception, BaseException) as e:
            return (
                json.dumps(
                    {
                        "error": "error during db insert",
                        "message": str(e),
                        "traceback": str(traceback.format_exc()),
                    }
                ),
                HTTPStatus.FORBIDDEN,
            )

        # pop _id in case it entered
        entry.pop("_id", None)
        entry["schema_name"] = schema_name

    return json.dumps({"entries": validated_entries})
