# DB 조회 관련 파일
import aiomysql
import asyncio
import pandas as pd

# 루프 가져오기
loop = asyncio.get_event_loop()

# pool 저장해놓을 컨테이너
poolContainer = []


# pool 가져오기
async def get_db_pool():
    # MariaDB 연결 생성
    global poolContainer
    global loop

    if not poolContainer :
        pool = await aiomysql.create_pool(
            host='127.0.0.1',
            user="ssafy",
            password="ssafy",
            db="daengdb",
            charset='utf8',
            cursorclass=aiomysql.cursors.DictCursor,
            loop=loop
        )
        poolContainer.append(pool)

    return poolContainer[0]


# def close_db(e=None):
#     db = dbstorage.pop('db', None)
#     if db is not None:
#         db.close()

async def query_db(query, args):
    cursor = None
    result = None
    try:
        pool = await get_db_pool()
        async with pool.acquire() as conn:
            async  with conn.cursor() as cursor:
                if args:
                    await cursor.execute(query, args)
                else:
                    await cursor.execute(query)
                # print(cursor.description, "실행됨")
                result = await cursor.fetchall()

    except Exception as e:
        # 추후 오류 종류에 따라 return 분리할 예정. sql문 오류,
        print('오류', e)
    finally:
        if cursor:
            await cursor.close()
    # 데이터 없으면 반환이 어떻게 되지? 알아볼 것
    return result


# 연결 테스트용 함수
def show_test():
    sql = "SELECT * FROM member"
    result = query_db(sql, ())
    # result = query_db(sql, (table_name,))
    # result = query_db(sql, ())
    return result


# 반려견 성향 관련 추천에 사용할 데이터 가져오는 함수
def get_data_for_dbti(mbti_id):  # args = "sql에서 %s에 넣을 조건 들어갈 곳"
    # 반려견 성향 관련 추천에 사용할 데이터 가져올 sql문 작성할 것
    sql = """
    SELECT r.place_id, r.score, p.pet_id 
    FROM review_pet rp
        INNER JOIN (SELECT * FROM pet WHERE mbti_id = %s) p
        USING (pet_id)
        INNER JOIN review r
        USING (review_id)
    """
    result = query_db(sql, (mbti_id))
    return result


def get_pet_ids(member_id):
    sql = "SELECT pet_id,mbti_id From pet WHERE member_id= %s"
    result = query_db(sql, (member_id))
    return result

def get_place_ids_by_pet_id(pet_id):
    sql = """
    SELECT DISTINCT place_id 
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
def get_data_for_review_heart(args):  # args = "sql에서 %s에 넣을 조건 들어갈 곳"
    # 리뷰 및 찜 관련 추천에 사용할 데이터 가져올 sql문 작성할 것
    sql = ""
    result = query_db(sql, (args,))
    # 선배기수 플젝에서는 data/input/데이터파일에서 데이터 가져오고 계산한 result를 data/output/데이터파일에 저장했다가 계산하는데, 저장 안하고 바로 계산해도 상관없나?
    return result
