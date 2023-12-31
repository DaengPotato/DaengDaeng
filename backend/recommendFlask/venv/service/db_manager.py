# DB 조회 관련 파일
import pymysql as mysql
from flask import current_app, g


def get_db():
    if 'db' not in g:
        # MariaDB 연결 생성
        conn = mysql.connect(host='j9a103.p.ssafy.io',
                             port=3324,
                             user="daeng",
                             password="daengpotato",
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


# 반려견 성향 관련 추천에 사용할 데이터 가져오는 함수
def get_data_for_dbti(mbti_id): 
    # mbti가 일치하는 강아지 좋아한 장소 가지고 오기
    sql="""
    SELECT r.place_id, r.score, p.pet_id 
    FROM review_pet rp
        INNER JOIN (SELECT * FROM pet WHERE mbti_id = %s) p
        USING (pet_id)
        INNER JOIN review r
        USING (review_id)
        INNER JOIN place p
        USING (place_id)
    WHERE p.category_id = 1
    """
    result = query_db(sql, (mbti_id))
    return result

def get_pet_ids(member_id):
    # 사용자의 반려견 정보 가지고 오기
    sql="SELECT pet_id,mbti_id FROM pet WHERE member_id = %s"
    result = query_db(sql, (member_id))
    return result

def get_place_ids_by_pet_id(pet_id):
    # 강아지가 좋아한 리뷰 가지고 오기
    sql="""
    SELECT place_id 
    FROM review r
    LEFT JOIN place p
    USING (place_id)
    WHERE review_id IN (
        SELECT review_id 
        FROM review_pet 
        WHERE pet_id = %s
    )
    AND p.category_id = 1
    """
    result = query_db(sql, (pet_id))
    return result

# 리뷰 및 찜 관련 추천에 사용할 데이터 가져오는 함수
def get_data_for_review_heart(member_id): 
    # 사용자가 찜한 장소 가지고 오기
    sql="""
    SELECT h.place_id 
    FROM heart h
    INNER JOIN place p
    USING (place_id)
    WHERE h.member_id = %s AND p.category_id = 1
    """
    result = query_db(sql, (member_id))
    return result

def get_heart_place():
    # 찜된 여행지 다 가지고 오기
    sql = """
    SELECT h.place_id, h.member_id, 1 AS heart 
    FROM heart h
    INNER JOIN place p
    USING (place_id)
    WHERE p.category_id = 1
    """
    result =  query_db(sql,())
    return result

def get_place_by_person_review(member_id):
    # 사용자가 별점 5점을 남긴 장소 가지고 오기
    sql = """
    SELECT r.place_id 
    FROM review r
    INNER JOIN place p
    USING (place_id)
    WHERE r.member_id = %s AND r.score > 3 AND p.category_id = 1 """
    result = query_db(sql, (member_id))
    return result

def get_popular_place():
    # 가장 찜이 많이 된 장소 20개 가지고 오기
    sql = """
    SELECT h.place_id, COUNT(*) AS count
    FROM heart h
    INNER JOIN place p
    USING (place_id)
    WHERE p.category_id = 1
    GROUP BY h.place_id
    ORDER BY count DESC
    LIMIT 100
    """
    result = query_db(sql, ())
    return result

def get_popular_place_by_pet():
    # 가장 찜이 많이 된 장소 20개 가지고 오기
    sql = """
    SELECT r.place_id, COUNT(*) AS count
    FROM review r 
    RIGHT JOIN review_pet rp
    USING (review_id)
    INNER JOIN place p
    USING (place_id)
    WHERE p.category_id = 1
    GROUP BY r.place_id
    ORDER BY count DESC
    LIMIT 100
    """
    result = query_db(sql, ())
    return result


def get_review_keyword():
    # 장소별 리뷰 키워드 집계 데이터 가지고 오기
    sql = """
    SELECT r.place_id, rk.keyword_id, COUNT(*)
    FROM review r
    INNER JOIN review_keyword rk ON r.review_id = rk.review_id
    INNER JOIN place p
    USING (place_id)
    WHERE p.category_id = 1
    GROUP BY r.place_id, rk.keyword_id
    ORDER BY r.place_id ASC
    """
    result = query_db(sql,())
    return result

def hashtag_review_place():
    sql = f"""
    SELECT 
        p.place_id,
        CONCAT(
            GROUP_CONCAT(DISTINCT k.keyword SEPARATOR ', '), 
            ', ', 
            COALESCE(GROUP_CONCAT(DISTINCT h.hashtag SEPARATOR ', '), '')
        ) as combined_list
    FROM 
        place p
    LEFT JOIN 
        place_hashtag ph ON p.place_id = ph.place_id
    LEFT JOIN 
        hashtag h ON ph.hashtag_id = h.hashtag_id
    LEFT JOIN 
        (
            SELECT 
                r.place_id,
                rk.keyword_id,
                COUNT(*) as keyword_count,
                ROW_NUMBER() OVER (PARTITION BY r.place_id ORDER BY COUNT(*) DESC) as keyword_rank
            FROM 
                review r
            JOIN 
                review_keyword rk ON r.review_id = rk.review_id
            JOIN 
                place p ON p.place_id = r.place_id
            WHERE 
                p.category_id = 1
            GROUP BY 
                r.place_id, rk.keyword_id
        ) top_keywords ON p.place_id = top_keywords.place_id
    LEFT JOIN 
        keyword k ON top_keywords.keyword_id = k.keyword_id
    WHERE
        (top_keywords.keyword_rank <= 3 OR top_keywords.keyword_id IS NULL)
        AND p.category_id = 1
    GROUP BY 
        p.place_id
    ORDER BY 
        p.place_id ASC;
    """
    result = query_db(sql, ())
    return result


def save_dataframe_to_db(dataframe):
    # 데이터베이스 연결 얻기
    conn = get_db()
    dataframe.to_csv("./include/dataset/similarity_matrix.csv", index=False, header=True)
    close_db()
