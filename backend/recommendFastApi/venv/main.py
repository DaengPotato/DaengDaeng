from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from service.db_manager import *  # db 연결 테스트용으로 임시 추가
from include.model.recomm_dbti import dbti_recomm
from include.model.recomm_review_heart import review_heart_recomm
import asyncio

app = FastAPI()
# loop = asyncio.get_event_loop()


# origins = [
#     "http://localhost",
#     "http://localhost:8080",
# ]


# 모든 CORS 요청 허용 상태
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# # 접속용 url 설정. 실행 테스트용.
@app.get("/")
async def root():
    return {"message": "Hello DaengDaeng"}


# 반려견 성향 기반 추천 요청 api, 아이템 기반 협업 필터링
@app.get('/recom/byMbti/{member_id}')
async def by_dbti(member_id:int):
    # member_id = request.headers.get('member_id')
    # member_id = 1
    # print(member_id)
    result = await dbti_recomm(member_id)
    return result


@app.get('/recom/byReviewHeart')
async def by_review_heart():
    result = await review_heart_recomm()
    result = 2

    return JSONResponse(content=result)


# db 연결 테스트용 api. 추후 삭제 예정
@app.get('/dbtest')
async def dbtest():  # put application's code here
    result = await show_test()

    res_data = []
    for item in result:
        member_id, email, login_type, nickname = item.values()
        res_data.append({"member_id": member_id, "email": email, "login_type": login_type, "nickname": nickname})

    return JSONResponse(content=res_data)
