# so far a dummy file

from flask_pymongo import PyMongo


def get_mongo():
    # just here to be pached in tests
    return PyMongo()


# checkout
# https://www.reddit.com/r/learnpython/comments/m5cdhz/using_pytest_with_flask_and_flaskrestful/
# https://gitlab.com/patkennedy79/flask_user_management_example/
# https://flask.palletsprojects.com/en/2.0.x/tutorial/
