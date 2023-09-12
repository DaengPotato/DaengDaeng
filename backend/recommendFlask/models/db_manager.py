import pymysql as mysql
from flask import current_app, g


def get_db():
    if 'db' not in g:
        # MariaDB 연결 생성
        conn = mysql.connect(host='127.0.0.1',
                             user="root",
                             password="root",
                             db="test",
                             charset='utf8')
        g.db = conn
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def query_db(query, args):
    # print(args[0])
    # new_args=
    cursor = None
    result = None
    try:
        cursor = get_db().cursor()
        if args:

            cursor.execute(query, args)

        else :
            cursor.execute(query)
        result = cursor.fetchall()
    except Exception as e:
        print('오류', e)
    finally:
        if cursor:
            cursor.close()
    return result


def show_test(table_name):
    sql = "SELECT * FROM foreigntest where name like %s"
    # sql = "SELECT * FROM "
    # sql = "SELECT * FROM `%s`"

    result = query_db(sql, ("%01",))

    # result = query_db(sql, (table_name,))
    # result = query_db(sql, ())
    return result
