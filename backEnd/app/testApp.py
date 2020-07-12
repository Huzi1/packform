from app import app
import unittest
import json

##############
### Test #####
##############


class FlaskTest(unittest.TestCase):

    # Check for response 200
    def test_index(self):
        client = app.test_client(self)
        resp = client.get("/")
        statuscode = resp.status_code

        self.assertEqual(statuscode, 200)

    # testing content from resp(all orders)
    def test_index_content(self):
        client = app.test_client(self)
        resp = client.get("/")

        self.assertEqual(resp.content_type, "application/json")

    ######### Search Filter Tests##############
    # Case 1
    # Testing search post request with keyword exist in database

    def test_index_search(self):
        client = app.test_client(self)
        resp = client.post(
            "/search",
            data=json.dumps({"keyword": "hand"}),
            content_type="application/json",
        )
        respData = json.loads(resp.get_data(as_text=True))
        # print("hereee", respData["code"])
        self.assertEqual(200, respData["code"])

    # Case 2
    # Testing search post request with keyword not exist in database
    def test_index_search(self):
        client = app.test_client(self)
        resp = client.post(
            "/search",
            data=json.dumps({"keyword": "hireMe"}),
            content_type="application/json",
        )
        respData = json.loads(resp.get_data(as_text=True))
        # print("hereee", respData["code"])
        self.assertEqual(202, respData["code"])


if __name__ == "__main__":
    unittest.main()

