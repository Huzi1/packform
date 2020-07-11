import psycopg2
import initializeDB as insertCsv
from pymongo import MongoClient
import app as app

mongoClient = MongoClient("mongodb://root:admin@localhost:27017")
mongoDB = mongoClient["clientDB"]
mongoCol = mongoDB["customer"]

connPgsql = psycopg2.connect(
    host="localhost", database="test", user="postgres", password="admin"
)

# cur = connPgsql.cursor()
# app.mongoInsert(mongoCol)
# populate data in postgresql, uncomment line 8 & 9 for DB init
insertCsv.main(connPgsql, mongoCol)
# insertCsv.initDB(conn)
# insertCsv.insertdata(conn)


# qry = """Select * from orders"""
# cur.execute(qry)
# rows = cur.fetchall()
# print("the number of parts: ", cur.rowcount)
# for row in rows:
#     print(row)
# cur.close()

# conn.close()
