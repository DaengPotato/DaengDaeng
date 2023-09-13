from flask import Flask, jsonify
from flask_cors import CORS
from service.db_manager import * # db 연결 테스트용으로 임시 추가
from include.model.recomm_dbti import dbti_recomm
from include.model.recomm_review_heart import review_heart_recomm

# 플라스크 객체 인스턴스 생성
app = Flask(__name__)
# CORS 설정. 웹 애플리케이션에서 Cross-Origin 요청에서 자격 증명을 허용하도록 설정하는 부분. 필요 없나?
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_SUPPORTS_CREDENTIALS"] = True


# 접속용 url 설정. 실행 테스트용.
@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


# 반려견 성향 기반 추천 요청 api, 아이템 기반 협업 필터링
@app.route('/recom/byMbti', methods=['GET'])
def by_dbti():
    result = dbti_recomm()
    return result


# 리뷰&찜 기반 추천 요청 api, 리뷰는 콘텐츠 기반 필터링, 찜은 사용자 기반 협업 필터링
@app.route('/recom/byReviewHeart', methods=['GET'])
def by_review_heart():
    result = review_heart_recomm()
    return result


# db 연결 테스트용 api. 추후 삭제 예정
@app.route('/dbtest')
def dbtest():  # put application's code here
    result = show_test("foreigntest")
    print(result)
    res_data = []
    for item in result:
        id, name = item
        res_data.append({"id": id, "name": name})
    return jsonify(res_data)
    # return 'test'


if __name__ == '__main__':
    app.run()
