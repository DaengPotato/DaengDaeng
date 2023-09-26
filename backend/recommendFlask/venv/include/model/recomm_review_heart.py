# 리뷰 및 찜 기반으로 추천하는 알고리즘 구현 파일
from service.db_manager import get_data_for_review_heart, get_heart_place, get_place_by_person_review, get_popular_place, get_review_keyword, hashtag_review_place
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity #유사도 산출
from sklearn.feature_extraction.text import CountVectorizer

def review_heart_recomm(member_id):

    # 사용자가 찜한 장소 가지고 오기
    my_hearts = get_data_for_review_heart(member_id)
    my_places = [item[0] for item in my_hearts]

    # 사용자가 찜한 장소가 없을 때
    if(len(my_hearts) == 0):
        recom_place = get_popular_place() #가장 인기있는 장소 가지고 오기(찜)
        recom_place = [item[0] for item in recom_place]

        if len(recom_place)==0: #찜이 없어서 가지고오지 못했다면
            for i in range(1,21): #임의로 넣어주기
                recom_place.append(i)

        recom_place = {
            "recommendPlaceList": recom_place
        }

        return recom_place

    # 찜 유사도가 높은 사용자들 추리기
    recom_people = recommend_people(member_id)

    # 유사도가 높은 사람들이 좋은 리뷰를 남긴 여행지들
    recom_place = place_by_recom_people(recom_people)

    # 여행지 간 유사도
    csv_similarity = pd.read_csv('./include/dataset/similarity_matrix.csv')

    csv_similarity.index = range(1, 1001)
    csv_similarity.columns = range(1, 1001)

    # 추천 사용자가 높은 리뷰를 남긴 장소만 추리기
    select_place = csv_similarity[recom_place]
    # 사용자가 찜한 여행지와 추천 여행지(유사한 사용자가 좋은 리뷰를 남긴 여행지)와 유사도 계산
    top_similar_places = []

    for place in my_places:
        top_20 = select_place.loc[place].nlargest(20)

        # 상위 20개의 열(여행지)와 해당 값 가져오기
        places = top_20.index
        similarities = top_20.values

        # 결과를 데이터프레임에 추가
        df = pd.DataFrame({'place_id': places, 'similarity': similarities})

        # 데이터프레임을 리스트에 추가
        top_similar_places.append(df)
    # 리스트를 하나의 데이터프레임으로 결합
    total_similarity = pd.concat(top_similar_places, ignore_index=True)
    recom_place = total_similarity.sort_values(by='similarity', ascending=False).drop_duplicates(subset=['place_id'])
    # 내가 좋아한 여행지를 제외한 유사도가 높은 상위 20개 여행지 id 선별
    recom_place = recom_place[~recom_place['place_id'].isin(my_places)][:20]

    # 여행지 id만 가지고 오기
    recom_place_id = recom_place['place_id'].tolist()

    result = {
        "recommendPlaceList": recom_place_id
    }

    return result


def place_by_recom_people(recom_people): #유사도가 높은 사용자들이 높은 별점을 남긴 여행지들
    recom_place = []
    for person in recom_people.index:
        # 별점을 5점 남긴 여행지 가지고 오기
        place_by_person_review = get_place_by_person_review(person)
        place_by_person_review = [item[0] for item in place_by_person_review]
        # 다 더해주기
        recom_place.extend(place_by_person_review)

    recom_place = list(set(recom_place))
    return recom_place


def recommend_people(member_id): # 찜 유사도가 높은 사용자 가지고 오기
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

    # 유사도가 높은 20명의 사용자 가지고 오기(본인 제외)
    recom_people = item_sim_df[member_id].sort_values(ascending=False)
    recom_people = recom_people[~recom_people.index.isin([member_id])][:5]

    return recom_people


def hash_review_content():
    # place_id, 해시태그 + 리뷰 키워드
    data_hash_review = hashtag_review_place()
    # 데이터 프레임으로 변환
    dataframe_hash_review = pd.DataFrame(data_hash_review, columns=['place_id', 'combined_list'])

    combined_list = dataframe_hash_review['combined_list'].tolist()
    # 리스트를 쉼표로 합쳐서 하나의 문자열 combined_text로 만들고
    new_list = [' '.join(sentence.split(', ')) for sentence in combined_list]

    vectorizer = CountVectorizer()
    # 문서 벡터화
    combined = vectorizer.fit_transform(new_list)
    # 유사도 계산
    similarity_hash_review = cosine_similarity(combined, combined)
    # pandas로 데이터 프레임으로 변환
    dataframe_hash = pd.DataFrame(similarity_hash_review)
    # 인덱스 +1

    return dataframe_hash
