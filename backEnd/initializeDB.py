import pandas as pd

# data = pd.read_csv("./csv/Test task-Postgres-orders.csv")

# print(data.head())
def initDB(conn):
    cur = conn.cursor()
    sql_file = open('initDB.sql','r')
    cur.execute(sql_file.read())
    cur.close()
    



def insertdata(conn):
    cur = conn.cursor()
    try:

        with open("./csv/Test task-Postgres-orders.csv",'r') as f:
            next(f)
            cur.copy_from(f, 'orders', null='', sep=',')
        print("Orders inserted in pgsql")    
        conn.commit()   
        
        with open("./csv/Test task - Postgres - order_items.csv",'r') as f:
            next(f)
            cur.copy_from(f, 'order_items', null='', sep=',')
        print("Order_items inserted in pgsql")    
        conn.commit()

        with open("./csv/Test task - Postgres - deliveries.csv",'r') as f:
            next(f)
            cur.copy_from(f, 'deliveries',null='', sep=',')
        print("Order_items inserted in pgsql")    
        conn.commit()
        
        cur.close()   
    except Exception as e:
        print("Insert failed!")
        print(e)