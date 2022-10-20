import json
from copy import deepcopy

BASE_DATA = {
    "object_type": "dataset",
    "metadata": {
        "measurement": {"instrument_id": "P08", "measurement_type": "beamtime"},
        "beamtime": {
            "facility": "DESY",
            "beamline": "P08",
            "date_start": "2020-01-20",
            "title": "a nice proposal",
            "participants": ["Max Mustermann", "John Doe"],
        },
        "logbook": {"logbook_file": "/path/to/logbook.pdf", "logbook_pages": "17-19",},
    },
}

BASE_SAMPLE_DATA = {
    "object_type": "sample",
    "metadata": {
        "measurement": {"instrument_id": "P08", "measurement_type": "beamtime"},
        "beamtime": {
            "facility": "DESY",
            "beamline": "P08",
            "date_start": "2020-01-20",
            "title": "a nice proposal",
            "participants": ["Max Mustermann", "John Doe"],
        },
        "logbook": {"logbook_file": "/path/to/logbook.pdf", "logbook_pages": "17-19",},
    },
}


def _post_request(client, endpoint, data):
    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    return client.post(endpoint, data=json.dumps(data), headers=headers)


def test_post_addons_validate(client):
    """
    check that schema can be added to the db and that invalid schema is rejected
    """
    data = deepcopy(BASE_DATA)

    data["metadata"].update(
        {
            "XRR": {"counter_name": "roi1", "scans": [17, 18, 19]},
            "GIWAXS": {"sample_detector_distance": 17, "central_pixel": [123, 345]},
            "insitu_perovskite": {
                "spinning_scan": 12,
                "annealing_scan": 13,
                "incidence_angle_scan": 14,
            },
        }
    )

    response = _post_request(client, "/addons/validate", data)
    assert response.status_code == 200
    resp = json.loads(response.data)
    assert resp["valid"] == True


def test_post_addons_validate_unit(client, use_prepop_db):
    """
    check that schema can be added to the db and that invalid schema is rejected
    """
    # check something without unit
    data = deepcopy(BASE_DATA)
    data["metadata"].update(
        {
            "GIWAXS_no_unit": {
                "sample_detector_distance": 17,
                "central_pixel": [123, 345],
            },
        }
    )

    response = _post_request(client, "/addons/validate", data)
    assert response.status_code == 200
    resp = json.loads(response.data)
    assert resp["valid"] == True

    # check something with unit
    data = deepcopy(BASE_DATA)
    data["metadata"].update(
        {
            "GIWAXS": {
                "sample_detector_distance": {"value": 722, "unit": "mm"},
                "central_pixel": [123, 345],
            },
        }
    )

    response = _post_request(client, "/addons/validate", data)
    assert response.status_code == 200
    resp = json.loads(response.data)
    assert resp["valid"] == True

    # check something with wrong unit
    data = deepcopy(BASE_DATA)
    data["metadata"].update(
        {
            "GIWAXS": {
                "sample_detector_distance": {"value": 722, "unit": "no_real_unit"},
                "central_pixel": [123, 345],
            },
        }
    )

    response = _post_request(client, "/addons/validate", data)
    assert response.status_code == 406
    resp = json.loads(response.data)
    assert (
        "'sample_detector_distance': [{'unit': ['unallowed value no_real_unit'"
        in resp["message"]
    )
    assert resp["valid"] == False


def test_post_addons_validate_check_wrong_type(client, use_prepop_db):
    """
    check that schema can be added to the db and that invalid schema is rejected
    """
    # check something without unit but of wrong type
    data = {
        "object_type": "dataset",
        "metadata": {
            "measurement": {"measurement_type": "beamtime"},
            "GIWAXS_no_unit": {
                "sample_detector_distance": "345",
                "central_pixel": [456, 567],
            },
        },
    }

    response = _post_request(client, "/addons/validate", data)
    assert response.status_code == 406
    assert b"'sample_detector_distance': ['must be of number type']" in response.data
