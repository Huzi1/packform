import db as db
from bson import json_util
import json
from flask import Flask
from flask import request

app = Flask(__name__)


@app.route("/")
# @app.route("/order")
def index():
    data = db.view()
    print(data)
    jsonData = json.dumps(data, default=str, sort_keys=True, indent=2)
    resp = app.response_class(
        response=jsonData, status=200, mimetype="application/json"
    )
    return resp


# HTTP POST method
@app.route("/search", methods=["POST"])
def search():
    obj = json.loads(request.data.decode("utf-8"))
    print(obj)
    keyword = obj["keyword"]
    data = db.search(keyword)
    if data["code"] == 200:
        print(data)
        resp = {"code": 200, "data": data["data"]}
        jsonData = json.dumps(resp, default=str, sort_keys=True, indent=2)
        return jsonData
    else:
        resp = {"code": 202}
        jsonData = json.dumps(resp, default=str, sort_keys=True, indent=2)
        return jsonData


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)


# import pytest
# import requests

# url = "http://127.0.0.1:5000"  # The root url of the flask app


# def test_main():
#     r = requests.get(url + "/")  #  path  "/"
#     assert r.status_code == 200  # status code ok 200


# def test_main_search(client):

#     mimetype = "application/json"
#     headers = {"Content-Type": mimetype, "Accept": mimetype}
#     data = {"keyword": "hand"}

#     response = c.post(url + "/search", data=json.dumps(data), headers=headers)
#     assert response.content_type == mimetype
#     assert response.json["code"] == 200

