# 반려견 성향 기반으로 추천하는 알고리즘 구현 파일
import json

from service.db_manager import get_data_for_dbti, get_pet_ids, get_place_ids_by_pet_id, get_popular_place
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity #유사도 산출


def dbti_recomm(member_id):
    #반환 할 데이터(강아지별 추천 여행지 20개)
    result_list = []

    # DB에서 member_id를 가지고 pet 리스트 가지고 오기
    my_pets = get_pet_ids(member_id)

    # 강아지가 없을 경우
    if(len(my_pets)==0):
        result = {
            "petId": None,
            "recommendPlaceList": []
        }
        result_list.append(result)
        return result_list

    #강아지마다 추천 여행지 가지고 오기
    for pet in my_pets:
        pet_id,mbti_id = pet


        # mbti_id가 없을 경우
        if mbti_id is None:
            # 인기있는 지역 가지고 오기
            recom_place_id = no_my_heart()

            result = {
                "petId": pet_id,
                "recommendPlaceList": recom_place_id
            }

            result_list.append(result)

            continue


        # 같은 mbti를 가진 강아지가 평가한 리뷰만 가지고 오기
        data_dbti = get_data_for_dbti(mbti_id)

        #만약 같은 mbti가 평가한 리뷰가 없을 경우 -> 이건 더미데이터로 처리
        if len(data_dbti == 0) :
            # 인기있는 지역 가지고 오기
            recom_place_id = no_my_heart()

            result = {
                "petId": pet_id,
                "recommendPlaceList": recom_place_id
            }
            result_list.append(result)

            continue


        # pandas로 데이터 프레임으로 변환
        dataframe_dbti=pd.DataFrame(data_dbti,columns=['place_id','score','pet_id'])
        # pivot table 만들기
        ratings_matrix = dataframe_dbti.pivot_table(index="place_id",columns="pet_id",values="score")
        # null값은 0으로 채우기
        ratings_matrix.fillna(0, inplace=True)

        # cosin으로 여행지별 리뷰 유사도 구하기
        item_sim = cosine_similarity(ratings_matrix, ratings_matrix) #협업필터링 아이템 기반

        # 데이터 프레임 형태로 저장
        item_sim_df = pd.DataFrame(item_sim, index=ratings_matrix.index, columns=ratings_matrix.index)
        # item_sim_df.iloc[:4, :4]  # item_sim_df.shape: 9719 x 9719


        top_similar_places = []
        # 강아지가 좋아한 각 여행지마다 추천 여행지 20가지를 추리고
        # 각 여행지별 추천 여행지를 다 합쳐서 유사도가 가장 높은 20개의 여행지 중복제거 후 가지고오기

        # 반려견이 좋아한 장소 가지고 오기
        likes = get_place_ids_by_pet_id(pet_id)
        likes = [item[0] for item in likes]

        # 반려견이 좋아한 장소가 없을 경우, 가장 인기있는 지역 가지고 오기
        if likes == 0:
            likes = no_my_heart()

        for like in likes:
            # 현재 열의 값에서 상위 20개의 행(여행지)를 선택
            col = item_sim_df[like]
            top_20 = col.nlargest(20)

            # 상위 20개의 열(여행지)와 해당 값 가져오기
            places = top_20.index
            similarities = top_20.values

            # 결과를 데이터프레임에 추가
            df = pd.DataFrame({'place_id': places, 'similarity': similarities})
            # print(df)

            # 데이터프레임을 리스트에 추가
            top_similar_places.append(df)

        # 리스트를 하나의 데이터프레임으로 결합
        total_similarity = pd.concat(top_similar_places, ignore_index=True)
        # print(total_similarity)

        # 정렬한 후 place_id로 중복제거 한 뒤 유사도가 높은 상위 20개 여행지 id 선별(내가 좋아한 여행지 제거)
        recom_place = total_similarity.sort_values(by='similarity', ascending=False).drop_duplicates(subset=['place_id'])
        recom_place = recom_place[~recom_place['place_id'].isin(likes)][:20]
        # recom_place = total_similarity.sort_values(by = 'similarity', ascending=False).drop_duplicates(subset=['place_id'])[len(likes):20+len(likes)]

        # print("pet_id: ", pet_id, "\n", recom_place)

        # 여행지 id만 가지고 오기
        recom_place_id = recom_place['place_id'].tolist()

        result = {
            "petId":pet_id,
            "recommendPlaceList": recom_place_id
        }

        result_list.append(result)

    # json_data = json.dumps(result_list, indent=4)
    # print(json_data)

    return result_list


def no_my_heart():

    recom_place_id = get_popular_place()  # 찜이 가장 많이된 여행지 가지고 오기
    recom_place_id = [item[0] for item in recom_place_id]

    if len(recom_place_id) == 0:  # 만약 찜된 여행지가 없다면
        for i in range(1, 21):
            recom_place_id.append(i)

    return recom_place_id

