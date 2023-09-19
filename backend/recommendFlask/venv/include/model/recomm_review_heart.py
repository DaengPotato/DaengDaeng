# 리뷰 및 찜 기반으로 추천하는 알고리즘 구현 파일
from service.db_manager import get_data_for_review_heart, get_heart_place, get_review_by_person, get_popular_place, get_review_keyword
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

    # 찜이 된 모든 여행지 가지고 오기
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

    # 유사도가 높은 사람들이 좋은 리뷰를 남긴 여행지
    place_by_recom_people = []

    # 유사도가 높은 사람들이 별점을 5점 남긴 여행지 가지고 오기
    for person in recom_people.index:
        review_by_person = get_review_by_person(person)
        review_by_person = [item[0] for item in review_by_person]
        place_by_recom_people.extend(review_by_person)

    place_by_recom_people = list(set(place_by_recom_people))
    print(place_by_recom_people)

    similarity_table = review_heart_recomm_content()
    select_place = similarity_table[place_by_recom_people]
    print(select_place)

    #사용자가 찜한 여행지와 추천 여행지(유사한 사용자가 좋은 리뷰를 남긴 여행지)와 유사도 계산
    top_similar_places = []
    for place in my_places:
        top_20 = select_place.loc[place].nlargest(20)
        print(top_20)

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

    # 정렬한 후 place_id로 중복제거 한 뒤 유사도가 높은 상위 20개 여행지 id 선별(내가 좋아한 여행지 제거)
    recom_place = total_similarity.sort_values(by='similarity', ascending=False).drop_duplicates(subset=['place_id'])
    recom_place = recom_place[~recom_place['place_id'].isin(my_places)][:20]

    # 여행지 id만 가지고 오기
    recom_place_id = recom_place['place_id'].tolist()

    result = {
        "recom_place": recom_place_id
    }

    return result

def review_heart_recomm_content():
    place_review_keyword = get_review_keyword()

    # place_length = place_review_keyword[len(place_review_keyword)-1][0]
    #
    # place_review_count = [[0]*100 for _ in range(place_length+1)]
    #
    # for keyword in place_review_keyword:
    #     place_id, keyword_id, count = keyword
    #     place_review_count[place_id][keyword_id] = count
    #
    # for place in place_review_count:
    #     total_count = sum(place)
    #     for i in range(len(place)):
    #         if place[i]>0:
    #             place[i] = place[i]/total_count
    # print(place_review_count)

    # pandas로 데이터 프레임으로 변환
    dataframe_dbti = pd.DataFrame(place_review_keyword, columns=['place_id', 'keyword_id', 'count'])
    # pivot table 만들기
    ratings_matrix = dataframe_dbti.pivot_table(index="place_id", columns="keyword_id", values="count")
    # null값은 0으로 채우기
    ratings_matrix.fillna(0, inplace=True)

    # 각 행마다 리뷰 키워드 count를 비율로 설정
    ratings_matrix = ratings_matrix.div(ratings_matrix.sum(axis=1), axis=0)

    # cosin으로 여행지별 리뷰 유사도 구하기
    item_sim = cosine_similarity(ratings_matrix, ratings_matrix)  # 협업필터링 아이템 기반

    # 데이터 프레임 형태로 저장
    item_sim_df = pd.DataFrame(item_sim, index=ratings_matrix.index, columns=ratings_matrix.index)

    return item_sim_df
