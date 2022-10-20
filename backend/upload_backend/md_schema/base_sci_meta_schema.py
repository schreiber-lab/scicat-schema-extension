# -*- coding: utf-8 -*-

# TODO rethink this... maybe it would be better to have valid creberous schemata here instead of custom json...
# this should be done in a sort of plugin way, not from within the package....
# only purpose of this file is to pre-populate the db mainly to speed up development


schema_template_json = [
    {
        "schema_name": "measurement",
        "keys": [
            {"key_name": "instrument_id", "changes_likely": False},
            {
                "key_name": "measurement_type",
                "allowed": ["beamtime", "lab"],
                "changes_likely": False,
            },
        ],
    },
    {
        "schema_name": "beamtime",
        "keys": [
            {"key_name": "facility", "changes_likely": False},
            {"key_name": "beamline", "changes_likely": False},
            {"key_name": "date_start", "changes_likely": False},
            {"key_name": "date_end", "required": False, "changes_likely": False},
            {"key_name": "title", "required": False, "changes_likely": False},
            {
                "key_name": "participants",
                "type": "list",
                "schema": {"type": "string"},
                "required": False,
                "changes_likely": False,
            },
        ],
    },
    {
        "schema_name": "logbook",
        "keys": [
            {"key_name": "logbook_file", "required": False, "changes_likely": False},
            {"key_name": "logbook_pages", "required": False, "changes_likely": True},
        ],
    },
    {
        "schema_name": "XRR",
        "schema_type": "dataset",
        "keys": [{"key_name": "counter_name"}, {"key_name": "scans", "type": "list"}],
    },
    {
        "schema_name": "GIWAXS",
        "schema_type": "dataset",
        "keys": [
            {"key_name": "sample_detector_distance", "type": "number"},
            {"key_name": "central_pixel", "type": "list", "schema": {"type": "number"}},
        ],
    },
    {
        "schema_name": "insitu_perovskite",
        "schema_type": "dataset",
        "keys": [
            {"key_name": "spinning_scan", "type": "number"},
            {"key_name": "annealing_scan", "type": "number"},
            {"key_name": "incidence_angle_scan", "type": "number"},
        ],
    },
    {
        "schema_name": "ML_pero_classification",
        "schema_type": "dataset",
        "keys": [
            {
                "key_name": "film_structure",
                "type": "string",
                "allowed": ["3d powder", "2d powder", "textured 3d powder"],
            },
            {"key_name": "grainy_rings", "type": "boolean"},
            {"key_name": "moving_grains", "type": "boolean"},
        ],
    },
    {
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
    },
]


fixed_value_entries = [
    {
        "schema_name": "material",
        "material_id": "DIP",
        "full_name": "Diindenoperylene",
        "formula": "C32H16",
    },
    {
        "schema_name": "material",
        "material_id": "PEN",
        "full_name": "Pentacene",
        "formula": "C22H14",
    },
    {
        "schema_name": "material",
        "material_id": "DIP:PEN 4:1",
        "composition": {"DIP": 0.8, "PEN": 0.2},
    },
]
