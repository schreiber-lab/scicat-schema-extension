import flask
import flask_apispec

from http import HTTPStatus
from cerberus.validator import DocumentError

from ..marshalling_schema import (
    MetadataValidationSchema,
    MetadataValidationResponseSchema,
)
from ..md_schema import validator

bp = flask.Blueprint("validation", __name__)  # , url_prefix='/auth')


@bp.post("/addons/validate")
@flask_apispec.use_kwargs(MetadataValidationSchema, location="json")
@flask_apispec.marshal_with(MetadataValidationResponseSchema)
def validate(object_type=None, metadata=None):
    db = flask.current_app.db
    valid = False
    message = None
    norm = None
    response_code = HTTPStatus.OK

    try:
        if object_type == "sample":
            norm = validator.validate_sample(metadata)
            valid = True
        elif object_type == "dataset":
            md_schemas = db.metadata_schemas.find({}, {"_id": False})
            dyn_schemas = [md for md in md_schemas]
            norm = validator.validate_dataset(metadata, dyn_schemas)
            valid = True
        else:
            message = "Not Implemented!"
            response_code = HTTPStatus.METHOD_NOT_ALLOWED
    except (RuntimeError, DocumentError) as e:
        message = e
        response_code = HTTPStatus.NOT_ACCEPTABLE
    resp = {
        "valid": valid,
        "object_type": object_type,
    }

    if norm:
        resp["metadata"] = norm

    if message:
        resp["message"] = message

    return resp, int(response_code)
