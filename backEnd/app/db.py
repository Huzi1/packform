import psycopg2
import initializeDB as insertCsv
from pymongo import MongoClient
import initializeDB as insertCsv


mongoClient = MongoClient("mongodb://root:admin@localhost:27017")
mongoDB = mongoClient["clientDB"]
mongoCol = mongoDB["customer"]

connPgsql = psycopg2.connect(
    host="localhost", database="test", user="postgres", password="admin"
)

# Initialize and populate data in postgresql, uncomment line 8 & 9 for DB init
# insertCsv.main(connPgsql, mongoCol)


def view():
    cur = connPgsql.cursor()

    qry = """select * from orders t1 inner join order_items t2 on t1.order_id = t2.order_id inner join deliveries t3 on t2.order_items_id = t3.order_items_id;"""
    myRawList = []
    cur.execute(qry)
    rawData = cur.fetchall()
    for row in rawData:
        pricePrUnt = row[6]
        if pricePrUnt == None:
            pricePrUnt = 0
        customer = row[3]
        mongoDoc = mongoCol.find_one({"user_id": "{}".format(customer)})
        companyName = mongoDoc["company_name"]
        # print(mongoDoc["company_name"])
        totalAmount = round((row[7] * pricePrUnt), 2)
        deliveredAmount = round((row[11] * pricePrUnt), 2)
        tempDict = {
            "order_name": row[2],
            "product": row[8],
            "customer_company": companyName,
            "customer": customer,
            "created": row[1],
            "deliveredAmount": deliveredAmount,
            "total": totalAmount,
        }
        myRawList.append(tempDict)
    cur.close()
    return myRawList


def search(keyword):

    cur = connPgsql.cursor()

    qry = """select * from orders t1 inner join order_items t2 on t1.order_id = t2.order_id inner join deliveries t3 on t2.order_items_id = t3.order_items_id where upper(order_name) like upper(%s)or upper(product) like upper(%s);"""
    myRawList = []
    cur.execute(qry, ("%{}%".format(keyword), "%{}%".format(keyword),))
    rawData = cur.fetchall()
    print(type(rawData))
    if len(rawData) != 0:
        for row in rawData:
            pricePrUnt = row[6]
            if pricePrUnt == None:
                pricePrUnt = 0
            customer = row[3]
            mongoDoc = mongoCol.find_one({"user_id": "{}".format(customer)})
            companyName = mongoDoc["company_name"]
            # print(mongoDoc["company_name"])
            totalAmount = round((row[7] * pricePrUnt), 2)
            deliveredAmount = round((row[11] * pricePrUnt), 2)
            tempDict = {
                "order_name": row[2],
                "product": row[8],
                "customer_company": companyName,
                "customer": customer,
                "created": row[1],
                "deliveredAmount": deliveredAmount,
                "total": totalAmount,
            }
            myRawList.append(tempDict)
        cur.close()
        return {"code": 200, "data": myRawList}
    else:
        cur.close()
        return {"code": 202}


# print(myRawList)
