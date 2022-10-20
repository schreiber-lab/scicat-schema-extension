# -*- coding: utf-8 -*-

# ~ pure_material = {'material_name': {'type': 'string'}

# ~ mixed_material = {'component_name': {'type': 'string'}

# ~ material = {'oneof': [pure_material,mixed_material]}

# ~ sample = {
# ~ "sample_id": {"type": "string", "required": True,},
# ~ "sample_remarks": {"type": "string"},
# ~ "sample_composition": {"type": "list", "schema": {"type": "string"}},
# ~ }

# ~ material = {
# ~ "material_id": {"type": "string", "required": True},
# ~ "full_name": {"type": "string"},
# ~ "formula": {"type": "string"},
# ~ "composition": {"type": "dict"},
# ~ }

metadata_entry_schema = {
    "key_name": {"type": "string", "required": True},
    "required": {"type": "boolean", "default": True, "required": False},
    "scan_ref": {"type": "boolean", "default": False, "required": False},
    "default": {"nullable": True},
    "type": {
        "type": "string",
        "default": "string",
        "allowed": ["boolean", "dict", "float", "integer", "number", "list", "string"],
    },  # ceberus type
    "schema": {"type": "dict"},  # ceberus schema in case of list or dict
    "allowed": {"type": "list"},  # list of predefined, allowed values
    "changes_likely": {
        "type": "boolean",
        "default": True,
        "required": False,
    },  # fields marked with this flag should be highlighted by the frontend when using a template
    "unit": {"type": "string", "nullable": True, "default": None},
}

metadata_schema = {
    "schema_name": {"type": "string", "required": True},
    "schema_type": {
        "type": "string",
        "required": True,
        "default": "dataset",
    },  # to specify if this is e.g. for sample or dataset
    "fixed_value_entries": {
        "type": "boolean",
        "default": False,
    },  # if this flag is set values can only be selected from values present in database
    "multiples_entries": {
        "type": "boolean",
        "required": False,
        "dependencies": {"fixed_value_entries": [True]},
    },  # defines if this schema specifies a list of entries or a simple entry
    "keys": {
        "type": "list",
        "schema": {"type": "dict", "schema": metadata_entry_schema},
    },
    "id_key": {
        "type": "string",
        "required": False,
    },  # key that should serve as index in mongo db # TODO: make rule more complex i.e. depends on fixed_value_entries
}

# ~ fixed_value_entry_schema = {
# ~ "schema_name": {"type": "string", "required": True},
# ~ "value_dict": {"type": "dict"},
# ~ }   TODO: to be defined...
