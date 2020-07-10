import psycopg2
import initializeDB as insertCsv

conn = psycopg2.connect(host="localhost",database="test", user="postgres", password="admin")

cur = conn.cursor()
# populate data in postgresql, uncomment line 8 & 9 for DB init
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