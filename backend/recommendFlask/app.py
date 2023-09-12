from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import pickle

# 플라스크 객체 인스턴스 생성
app = Flask(__name__)
# CORS 설정. 웹 애플리케이션에서 Cross-Origin 요청에서 자격 증명을 허용하도록 설정하는 부분. 필요 없나?
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_SUPPORTS_CREDENTIALS"] = True


# 접속용 url 설정
@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


# 반려견 성향 기반 추천 요청 api, 아이템 기반 협업 필터링
@app.route('/recom/byMbti', methods=['OPTIONS','GET'])
def by_mbti():  # put application's code here
    return 'a'


# 리뷰&찜 기반 추천 요청 api, 리뷰는 콘텐츠 기반 필터링, 찜은 사용자 기반 협업 필터링
@app.route('/recom/byReviewHeart', methods=['OPTIONS','GET'])
def by_review_heart():  # put application's code here
    return 'b'


if __name__ == '__main__':
    app.run()
