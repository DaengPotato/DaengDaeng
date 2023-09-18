# DB 조회 관련 파일
import pymysql as mysql
from flask import current_app, g


def get_db():
    if 'db' not in g:
        # MariaDB 연결 생성
        conn = mysql.connect(host='127.0.0.1',
                             user="ssafy",
                             password="ssafy",
                             db="daengdb",
                             charset='utf8')
        g.db = conn
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def query_db(query, args):
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
        # 추후 오류 종류에 따라 return 분리할 예정. sql문 오류,
        print('오류', e)
    finally:
        if cursor:
            cursor.close()
    # 데이터 없으면 반환이 어떻게 되지? 알아볼 것
    return result


# 연결 테스트용 함수
# def show_test():
#     sql = "SELECT * FROM member"
#     result = query_db(sql, ())
#     # result = query_db(sql, (table_name,))
#     # result = query_db(sql, ())
#     return result


# 반려견 성향 관련 추천에 사용할 데이터 가져오는 함수
def get_data_for_dbti(mbti_id): # args = "sql에서 %s에 넣을 조건 들어갈 곳"
    # 반려견 성향 관련 추천에 사용할 데이터 가져올 sql문 작성할 것
    sql="""
    SELECT r.place_id, r.score, p.pet_id 
    FROM review_pet rp
        INNER JOIN (SELECT * FROM pet WHERE mbti_id = %s) p
        USING (pet_id)
        INNER JOIN review r
        USING (review_id)
    """
    result = query_db(sql, (mbti_id))
    # 선배기수 플젝에서는 data/input/데이터파일에서 데이터 가져오고 계산한 result를 data/output/데이터파일에 저장했다가 계산하는데, 저장 안하고 바로 계산해도 상관없나?
    return result

def get_pet_ids(member_id):
    sql="SELECT pet_id,mbti_id FROM pet WHERE member_id = %s"
    result = query_db(sql, (member_id))
    return result

def get_place_ids_by_pet_id(pet_id):
    sql="""
    SELECT place_id 
    FROM review 
    WHERE review_id IN (
        SELECT review_id 
        FROM review_pet 
        WHERE pet_id = %s
    )
    """
    result = query_db(sql, (pet_id))
    return result

# 리뷰 및 찜 관련 추천에 사용할 데이터 가져오는 함수
def get_data_for_review_heart(member_id): # args = "sql에서 %s에 넣을 조건 들어갈 곳"
    # 리뷰 및 찜 관련 추천에 사용할 데이터 가져올 sql문 작성할 것
    sql="SELECT place_id FROM heart WHERE member_id = %s"
    result = query_db(sql, (member_id))
    return result

def get_heart_place():
    # 찜된 여행지 다 가지고 오기
    sql = "SELECT place_id,member_id,1 AS heart FROM heart"
    result =  query_db(sql,())
    return result

def get_review_by_person(member_id):
    sql = "SELECT place_id FROM review WHERE member_id = %s AND score > 4"
    result = query_db(sql, (member_id))
    return result

def get_popular_place():
    sql = """
    SELECT place_id, COUNT(*) AS count
    FROM heart
    GROUP BY place_id
    ORDER BY count DESC
    LIMIT 20
    """
    result = query_db(sql, ())
    return result