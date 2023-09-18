# 리뷰 및 찜 기반으로 추천하는 알고리즘 구현 파일
from service.db_manager import get_data_for_review_heart, get_heart_place, get_review_by_person, get_popular_place
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity #유사도 산출
def review_heart_recomm(member_id):

    # 사용자가 찜한 장소 가지고 오기
    my_hearts = get_data_for_review_heart(member_id)
    my_places = [item[0] for item in my_hearts]
    if(len(my_hearts) == 0):
        recom_place = get_popular_place()
        recom_place = [item[0] for item in recom_place]
        print(recom_place)
        return recom_place

    # 찜이 된 여행지 가지고 오기
    data_review_heart = get_heart_place()

    # pandas로 데이터 프레임으로 변환
    dataframe_hearts=pd.DataFrame(data_review_heart,columns=['place_id','member_id', 'heart'])

    # pivot table 만들기
    ratings_matrix = dataframe_hearts.pivot_table(index="member_id", columns="place_id", values="heart")
    # null값은 0으로 채우기
    ratings_matrix.fillna(0, inplace=True)

    # cosin으로 사용자 찜 유사도 구하기
    item_sim = cosine_similarity(ratings_matrix, ratings_matrix)  # 협업필터링 아이템 기반

    # 데이터 프레임 형태로 저장
    item_sim_df = pd.DataFrame(item_sim, index=ratings_matrix.index, columns=ratings_matrix.index)
    print(item_sim_df)

    # 유사도가 높은 20명의 사용자 가지고 오기(본인 제외)
    recom_people = item_sim_df[member_id].sort_values(ascending=False)
    recom_people = recom_people[~recom_people.index.isin([member_id])][:5]
    print(recom_people)
    # 유사도가 높은 사람들이 좋은 리뷰를 남긴 여행지
    review_by_recom_people = []

    for person in recom_people.index:
        review_by_person = get_review_by_person(person)
        review_by_person = [item[0] for item in review_by_person]
        review_by_recom_people.extend(review_by_person)

    review_by_recom_people = list(set(review_by_recom_people))
    print(review_by_recom_people)

    return 'b'
