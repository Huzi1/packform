import pytest
import requests

url = "http://127.0.0.1:5000"  # The root url of the flask app


def test_main():
    app = Flask(__name__)
    configure_routes(app)
    client = app.test_client()
    resp = client.get(url + "/")  #  path  "/"
    assert resp.status_code == 200  # status code ok 200

