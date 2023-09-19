# 리뷰 및 찜 기반으로 추천하는 알고리즘 구현 파일
from service.db_manager import get_data_for_review_heart
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity  # 유사도 산출

def review_heart_recomm():
    #DB에서 데이터 가져오기. 가져오는 sql문은 db_manager.py에서 구현할 것
    # data_review_heart = get_data_for_review_heart()

    data_hash_review = hashtag_review_place(place리스트)

    combined_list = data_hash_review['combined_list'].tolist
    combined_text = ' '.join(combined_list)

    vectorizer = CountVectorizer()
    # 문서 벡터화
    combined = vectorizer.fit_transform([combined_text])

    similarity_hash_review = cosine_similarity(combined, combined)
    # pandas로 데이터 프레임으로 변환
    dataframe_hash = pd.DataFrame(similarity_hash_review, index = combined.index, columns=combined.index)



    # pandas로 안하고 바로 np 행렬 변환하는 식 예시. 실제로 쓰려면 수정 필요
    numeric_data = np.array([list(row.values()) for row in data_review_heart])

    # 행렬로 유사도 계산하는 코드 들어갈 곳

    # 유사도 높은 데이터 반환 할 것. 데이터 통신하는 형식 얘기 필요
    return "b"
