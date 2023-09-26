delete from mbti;
insert into mbti(mbti_id, mbti) values(1, 'EWOS');
insert into mbti(mbti_id, mbti) values(2, 'EWON');
insert into mbti(mbti_id, mbti) values(3, 'EWHS');
insert into mbti(mbti_id, mbti) values(4, 'EWHN');
insert into mbti(mbti_id, mbti) values(5, 'EDOS');
insert into mbti(mbti_id, mbti) values(6, 'EDON');
insert into mbti(mbti_id, mbti) values(7, 'EDHS');
insert into mbti(mbti_id, mbti) values(8, 'EDHN');
insert into mbti(mbti_id, mbti) values(9, 'IWOS');
insert into mbti(mbti_id, mbti) values(10, 'IWON');
insert into mbti(mbti_id, mbti) values(11, 'IWHS');
insert into mbti(mbti_id, mbti) values(12, 'IWHN');
insert into mbti(mbti_id, mbti) values(13, 'IDOS');
insert into mbti(mbti_id, mbti) values(14, 'IDON');
insert into mbti(mbti_id, mbti) values(15, 'IDHS');
insert into mbti(mbti_id, mbti) values(16, 'IDHN');

delete from mbti_question;
delete from mbti_type;

insert into mbti_type(type_id, typeA, typeB) values(1, 'D', 'W');
insert into mbti_type(type_id, typeA, typeB) values(2, 'O', 'H');
insert into mbti_type(type_id, typeA, typeB) values(3, 'S', 'N');
insert into mbti_type(type_id, typeA, typeB) values(4, 'E', 'D');

insert into mbti_question(question_id, question, answera, answerb, type_id) values(1, '목욕을 하자고 할 때,', '나는 물 싫어.. 무서워(크으응)', '물 좋아!!! 아싸', 1);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(2, '물 웅덩이에 장난감이 빠졌다.', '꺼내줘ㅠㅠ', '퐁당!', 1);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(3, '물 속에서 나는', '끄응...헥헥', '폴폴폴폴', 1);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(4, '산책을 할 때', '산책 좋아 (폴짝폴짝)', '귀찮아…', 2);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(5, '드넓은 초원을 마주했을 때', '주인 날 잡지마 (와다다)', '우와... 초원이다...(어쩌라고)', 2);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(6, '(자고있을 때) 산책갈까?', '(벌떡) 문앞으로 나간다.', '(쿨쿨) …', 2);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(7, '처음 만나는 강아지가 있을 때', '친구 하자! 다가가기', '왈왈! 너 누구야?!', 3);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(8, '낯선 장소에 갔을 때', '이게 뭐야? 여기저기 탐색하기', '아르르... 경계하기', 3);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(9, '강아지가 많은 장소에 갔을 때', '우왕.. 여기 최고야 또 오자(폴짝폴짝)', '도망갈래.. 나 좀 안아줘ㅠ', 3);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(10, '주인이 다가오면', '호다닥 뛰어간다', '언제 오나 지켜본다', 4);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(11, '심심할 때 나는', '뛰어 놀아 (뛰뛰)', '바닥 좋아 (눕눕)', 4);
insert into mbti_question(question_id, question, answera, answerb, type_id) values(12, '내가 안보일 때 주인이 나에게 하는 말은?', '안돼! 멈춰!', '어딨니~?', 4);


delete from category;
insert into category (category) values ("여행지"), ("동물병원"), ("동물약국"), ("문예회관"), ("미술관"), ("미용"), ("박물관"), ("반려동물용품"),("식당"), ("위탁관리"), ("카페"), ("펜션"), ("호텔") ;