import pandas as pd
import psycopg2
import pymongo
import json
import csv

# flag = True


def main(conn, colMongo, flag):
    if flag:

        try:
            flag = False
            # calling mongo insert functionality
            mongoInsert(colMongo)

            qry = """select exists(select * from information_schema.tables where table_name=%s);"""
            cur = conn.cursor()

            cur.execute(qry, ("orders",))
            check = cur.fetchone()[0]

            # print(check)
            if check is True:
                print("#####table exists...skipping table creation#####")
                print("###########checking data####")

                cur.close()
                insertdata(conn)

            else:
                print("Creating tables in Postgresql")
                cur.close()
                initDB(conn)
        except Exception as e:
            print("table check failed")
            print(e)


def initDB(conn):
    try:

        cur = conn.cursor()
        sql_file = open("./initDB.sql", "r")
        print("reading sql script")
        cur.execute(sql_file.read())
        print("read done")
        insertdata(conn)
        cur.close()

    except psycopg2.errors.DuplicateTable as e:
        print("Table creation failed")
        print(e)
    except Exception as e:
        print("Table Creation Failed")
        print(e)


def insertdata(conn):
    con = conn
    cur = con.cursor()
    try:

        with open("../csv/Test task-Postgres-orders.csv", "r") as f:

            reader = csv.reader(f)
            next(reader)
            print("ignoring duplicate order IDs")
            try:
                for row in reader:
                    cur.execute(
                        "INSERT INTO orders VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING",
                        row,
                    )

            except Exception as e:
                print(e)

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

        print("####Tables populated with data")
        print(
            "############################\n### Databases Setup Done###\n###########################"
        )

        cur.close()
        return "ok"

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

