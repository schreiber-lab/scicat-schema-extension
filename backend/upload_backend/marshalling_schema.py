from marshmallow import Schema
from webargs import fields


class TypeSchema(Schema):
    object_type = fields.String(
        required=False,
        description="specifies it this is a dataset, instrument, sample...",
        validate=lambda p: p in ("dataset", "instrument", "sample"),
        missing=None,
    )


class MetadataValidationSchema(Schema):
    object_type = fields.String(
        required=True,  ## should be false ... should have a default.
        description="specifies it this is a dataset, instrument, sample...",
        validate=lambda p: p in ("dataset", "instrument", "sample"),
    )
    metadata = fields.Mapping(required=True, description="metadata json")


class MetadataValidationResponseSchema(Schema):
    object_type = fields.String(
        required=True,
        description="specifies it this is a dataset, instrument, sample...",
    )
    metadata = fields.Mapping(required=False, description="metadata json")
    valid = fields.Bool(required=True, description="metadata valid")
    message = fields.String(
        required=False, description="optional validation error message"
    )


# ~ class MaterialSchema(Schema):
# ~ material_id = fields.String(
# ~ required=True, description="unique material identifier (e.g. short name)",
# ~ )
# ~ full_name = fields.String(required=False)
# ~ formula = fields.String(required=False)
# ~ composition = fields.Mapping(
# ~ required=False,
# ~ description="for composed materials. Dict containing material_id as keys and component share (of ratio) between 0 and 1",
# ~ )


class MdSchemaName(Schema):
    schema_name = fields.String(required=True, description="unique schema name",)


class MdSchemaSchema(MdSchemaName):
    keys = fields.List(fields.Mapping, required=True)
    schema_type = fields.String(
        required=True,
        description="specifies if this is for a dataset, instrument, sample...",
    )
    fixed_value_entries = fields.Bool(
        required=False, description="allowed values should be managed in db"
    )
    multiples_entries = fields.Bool(
        required=False, description="list of values or single value"
    )
    id_key = fields.String(
        required=False,
        description="only needed for fixed entry stuff ... defines id key in db",
    )


class MdEntriesSchema(Schema):
    entries = fields.List(fields.Mapping, required=True)
