# 반려견 성향 기반으로 추천하는 알고리즘 구현 파일
from service.db_manager import get_data_for_dbti, get_pet
import pandas as pd
import numpy as np


def dbti_recomm():

    # DB에서 member_id를 가지고 pet 리스트 가지고 오기
    my_pets = get_pet(member_id)

    for pet in my_pets:
        pet_id,mbti_id = pet

        # DB에서 데이터 가져오기. 가져오는 sql문은 db_manager.py에서 구현할 것
        data_dbti = get_data_for_dbti(mbti_id)
        # data_dbti = get_data_for_dbti()

        # pandas로 데이터 프레임으로 변환
        dataframe_dbti=pd.DataFrame(data_dbti,columns=['place_id','score','member_id'])

        ratings_matrix = dataframe_dbti.pivot_table(index="place_id",columns="member_id",values="score") #이거만 가지고 오기
        ratings_matrix.fillna(0, inplace=True)
        print(ratings_matrix)
        # pandas로 안하고 바로 np 행렬 변환하는 식 예시. 실제로 쓰려면 수정 필요
        # numeric_data = np.array([list(row.values()) for row in data_dbti])

        # 행렬로 유사도 계산하는 코드 들어갈 곳
        item_sim = cosine_similarity(ratings_matrix, ratings_matrix) #아이템 유사도
        # np.set_printoptions(precision=3,suppress=True)

        # 데이터 프레임 형태로 저장
        item_sim_df = pd.DataFrame(item_sim, index=ratings_matrix.index, columns=ratings_matrix.index)
        item_sim_df.iloc[:4, :4]  # item_sim_df.shape: 9719 x 9719
        # print(item_sim_df)

        # 유사도가 높은 상위 20개 여행지
        recom_place = item_sim_df[1].sort_values(ascending=False)[1:5]

        # print(recom_place)

    # 유사도 높은 데이터 반환 할 것. 데이터 통신하는 형식 얘기 필요
    return "a"
