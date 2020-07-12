import pandas as pd
import psycopg2
import pymongo
import json
import csv


def main(conn, colMongo):
    try:
        # calling mongo insert functionality
        mongoInsert(colMongo)

        qry = """select exists(select * from information_schema.tables where table_name=%s;"""
        cur = conn.cursor()

        cur.execute(qry, ("orders",))
        check = cur.fetchone()[0]
        # print(check)
        if check is True:
            print("#####table exists...skipping table creation#####")
            print("###########checking data####")
            # qryOrders = (
            #     """select order_id from orders order by order_id desc limit 1 ;"""
            # )
            # qryDelievers = """select deliveries_id from deliveries order by deliveries_id desc limit 1;"""
            # qryOrderItem = """select order_items_id from order_items order by order_items_id desc limit 1;"""

            # cur.execute(qryDelievers)
            # deliverLastID = cur.rowcount

            # cur.execute(qryOrderItem)
            # orderItmLastID = cur.rowcount

            # cur.execute(qryOrders)
            # orderID = cur.rowcount

            # # calling insert function

            # insertdata(conn, deliverLastID, orderItmLastID, orderID)
            # cur.close()
        else:
            print("creating tables in Postgresql")
            initDB(conn)
    except Exception as e:
        print("table check failed")
        print(e)


def initDB(conn):
    try:

        cur = conn.cursor()
        sql_file = open("initDB.sql", "r")
        cur.execute(sql_file.read())
        cur.close()

    except psycopg2.errors.DuplicateTable as e:
        print("Table creation failed")
        print(e)
    except Exception as e:
        print("Table Creation Failed")
        print(e)


def insertdata(conn):
    cur = conn.cursor()
    try:

        with open("../csv/Test task-Postgres-orders.csv", "r") as f:
            # lastIndex = int((list(f)[-1]).split(',')[0])
            # if orderID > lastIndex:
            # next(f)
            reader = csv.reader(f)
            next(reader)
            print("ignoring duplicate order IDs")
            try:
                for row in reader:
                    cur.execute(
                        "INSERT INTO orders VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING",
                        row,
                    )
                # cur.copy_from(f, 'orders', null='', sep=',')
            except Exception as e:
                print(e)

        conn.commit()

        with open("../csv/Test task - Postgres - order_items.csv", "r") as f:

            reader = csv.reader(f)
            next(reader)
            print("ignoring duplicate order_items IDs")
            try:
                for row in reader:
                    cur.execute(
                        """INSERT INTO order_items VALUES (%s, %s, %s, %s, %s)  ON CONFLICT DO NOTHING """,
                        (row[0], row[1], row[2] or None, row[3], row[4]),
                    )
            except Exception as e:
                print(e)
        conn.commit()

        with open("../csv/Test task - Postgres - deliveries.csv", "r") as f:
            reader = csv.reader(f)
            next(reader)
            print("ignoring duplicate deliveries IDs")
            try:
                for row in reader:
                    cur.execute(
                        "INSERT INTO deliveries VALUES (%s, %s, %s) ON CONFLICT DO NOTHING",
                        row,
                    )
            except Exception as e:
                print(e)
        conn.commit()

        cur.close()
    except Exception as e:
        print("Insert failed!")
        print(e)


def mongoInsert(conn):
    try:

        dataCustmr = pd.read_csv("../csv/Test task - Mongo - customers.csv")
        dataCustmrComp = pd.read_csv(
            "../csv/Test task - Mongo - customer_companies.csv"
        )
        # merge df
        data = pd.merge(dataCustmr, dataCustmrComp, on="company_id")
        records = json.loads(data.T.to_json()).values()
        conn.create_index([("user_id", pymongo.ASCENDING)], unique=True)
        for row in records:
            try:
                conn.insert_one(row)
                print(row)
            except pymongo.errors.DuplicateKeyError:
                print(
                    "MongoDB duplicate ignore:duplicate company_id key for customer",
                    row["user_id"],
                )
            except Exception as e:
                print(e)

    except Exception as e:
        print("mongo insert fail")
        print(e)


# def insertMongo(conn):
