# 반려견 성향 기반으로 추천하는 알고리즘 구현 파일
import json

from service.db_manager import get_data_for_dbti, get_pet_ids, get_place_ids_by_pet_id
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity #유사도 산출


def dbti_recomm(member_id):
    #반환 할 데이터
    result_list = []

    # DB에서 member_id를 가지고 pet 리스트 가지고 오기
    my_pets = get_pet_ids(member_id)
    print(my_pets)


    #강아지마다 추천 여행지 가지고 오기
    for pet in my_pets:
        pet_id,mbti_id = pet
        # print(mbti_id)

        # 반려견이 좋아한 장소 가지고 오기
        likes = get_place_ids_by_pet_id(pet_id)
        # heart = [1, 2, 3]
        likes = [item[0] for item in likes]
        print(likes)

        # DB에서 데이터 가져오기. 가져오는 sql문은 db_manager.py에서 구현할 것
        data_dbti = get_data_for_dbti(mbti_id)

        # pandas로 데이터 프레임으로 변환
        dataframe_dbti=pd.DataFrame(data_dbti,columns=['place_id','score','member_id'])

        ratings_matrix = dataframe_dbti.pivot_table(index="place_id",columns="member_id",values="score") #이거만 가지고 오기
        ratings_matrix.fillna(0, inplace=True) #null값은 0으로 채우기
        # print(ratings_matrix)

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
        # recom_place = item_sim_df[1].sort_values(ascending=False)[1:21]
        selected_columns = item_sim_df[likes]
        total_similarity = selected_columns.sum(axis=1)
        recom_place = total_similarity.sort_values(ascending=False)[len(likes):20+len(likes)]
        print("pet_id: ", pet_id, "\n", recom_place)

        recom_place_id = recom_place.index.tolist()
        # print(recom_place)
        result = {
            "pet_id":pet_id,
            "recom_place": recom_place_id
        }

        result_list.append(result)

    json_data = json.dumps(result_list, indent=4)
        # print(json_data)

    # 유사도 높은 데이터 반환 할 것. 데이터 통신하는 형식 얘기 필요
    return json_data
