from flask import Flask, jsonify, request
from flask_cors import CORS
from service.db_manager import *  # db 연결 테스트용으로 임시 추가
from include.model.recomm_dbti import dbti_recomm
from include.model.recomm_review_heart import review_heart_recomm, hash_review_content

# 플라스크 객체 인스턴스 생성
app = Flask(__name__)
# CORS 설정. 웹 애플리케이션에서 Cross-Origin 요청에서 자격 증명을 허용하도록 설정하는 부분.
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_SUPPORTS_CREDENTIALS"] = True

PREFIX = "/rec"

# 접속용 url 설정. 실행 테스트용.
@app.route(PREFIX + '/test', methods=['GET'])
def send_data():  # put application's code here
    return "test"


# 컨텐츠 유사도 db에 저장
@app.route(PREFIX + '/save/dataframe', methods=['GET'])
def dataframe_to_db():
    #테이블 만들기

    # 컨텐츠 유사도
    content_df = hash_review_content()
    # dataframe DB에 저장
    save_dataframe_to_db(content_df)
    return "ok"


# 반려견 성향 기반 추천 요청 api, 아이템 기반 협업 필터링
@app.route(PREFIX + '/recom/byMbti', methods=['GET'])
def by_dbti():
    member_id = request.headers.get('memberId')
    result = dbti_recomm(member_id)
    return result


# 리뷰&찜 기반 추천 요청 api, 리뷰는 콘텐츠 기반 필터링, 찜은 사용자 기반 협업 필터링
@app.route(PREFIX + '/recom/byReviewHeart', methods=['GET'])
def by_review_heart():
    member_id = request.headers.get('memberId')
    member_id = int(member_id)
    result = review_heart_recomm(member_id)
    return result


if __name__ == '__main__':
    app.run()