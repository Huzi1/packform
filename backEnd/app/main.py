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
    return jsonData


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

