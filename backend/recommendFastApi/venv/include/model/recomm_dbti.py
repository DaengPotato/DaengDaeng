# 반려견 성향 기반으로 추천하는 알고리즘 구현 파일
import json
import asyncio
from service.db_manager import get_data_for_dbti, get_pet_ids, get_place_ids_by_pet_id
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity  # 유사도 산출


async def dbti_recomm(member_id):
    # 반환 할 데이터(강아지별 추천 여행지 20개)
    result_list = []

    # DB에서 member_id를 가지고 pet 리스트 가지고 오기
    my_pets = await get_pet_ids(member_id)
    # print(my_pets)
    # 강아지마다 추천 여행지 가지고 오기
    for pet in my_pets:
        pet_id, mbti_id = pet.values()

        # 반려견이 좋아한 장소, 같은 mbti를 가진 강아지가 평가한 리뷰로 판단한 장소 유사도 가져오기
        likes, item_sim_df = await asyncio.gather(get_likes_place_id(pet_id), select_similar_dbti_place_by_likes(mbti_id))
        # print(likes)
        print(item_sim_df)

        # 좋아한 여행지에 대한 데이터만 선택하기
        selected_columns = item_sim_df[likes]

        top_similar_places = []
        # 강아지가 좋아한 각 여행지마다 추천 여행지 20가지를 추리고
        # 각 여행지별 추천 여행지를 다 합쳐서 유사도가 가장 높은 20개의 여행지 중복제거 후 가지고오기
        for column in selected_columns.columns:
            # 현재 열의 값에서 상위 20개의 행(여행지)를 선택
            col = selected_columns[column]
            top_20 = col.nlargest(20)

            # 상위 20개의 열(여행지)와 해당 값 가져오기
            places = top_20.index.to_numpy()
            similarities = top_20.values

            # 결과를 데이터프레임에 추가
            df = pd.DataFrame({'place_id': places, 'similarity': similarities})

            # 데이터프레임을 리스트에 추가
            top_similar_places.append(df)

        # 리스트를 하나의 데이터프레임으로 결합
        total_similarity = pd.concat(top_similar_places, ignore_index=True)

        # 정렬한 후 place_id로 중복제거 한 뒤 유사도가 높은 상위 20개 여행지 id 선별(여행지 중복 제거)
        recom_place = total_similarity.sort_values(by='similarity', ascending=False).drop_duplicates(
            subset=['place_id'])[len(likes):20 + len(likes)]

        # 여행지 id만 가지고 오기
        recom_place_id = recom_place['place_id'].tolist()
        result = {"pet_id": pet_id, "recom_place": recom_place_id}
        result_list.append(result)

    return result_list


async def get_likes_place_id(pet_id):
    # 반려견이 좋아한 장소 가지고 오기
    likes = await get_place_ids_by_pet_id(pet_id)
    likes = [item['place_id'] for item in likes]
    return likes


async def select_similar_dbti_place_by_likes(mbti_id):
    # print(mbti_id)
    data_dbti = await get_data_for_dbti(mbti_id)
    print(data_dbti)

    # pandas로 데이터 프레임으로 변환
    dataframe_dbti = pd.DataFrame(data_dbti, columns=['place_id', 'score', 'pet_id'])
    print(dataframe_dbti)

    # pivot table 만들기
    ratings_matrix = dataframe_dbti.pivot_table(index="place_id", columns="pet_id", values="score")

    # null값은 0으로 채우기
    ratings_matrix.fillna(0, inplace=True)

    # cosin으로 여행지별 리뷰 유사도 구하기
    item_sim = cosine_similarity(ratings_matrix, ratings_matrix)  # 협업필터링 아이템 기반

    # 데이터 프레임 형태로 저장
    item_sim_df = pd.DataFrame(item_sim, index=ratings_matrix.index, columns=ratings_matrix.index)

    return item_sim_df
