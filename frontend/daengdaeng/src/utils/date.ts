export const clacAge = (birth: string): number => {
  // 1. 주어진 날짜 문자열을 Date 객체로 파싱
  const birthDate = new Date(birth);

  // 2. 현재 날짜를 가져오기
  const currentDate = new Date();

  // 3. 두 날짜 간의 연도 차이 계산
  const yearDifference = currentDate.getFullYear() - birthDate.getFullYear();

  // 4. 나이 계산
  // 현재 날짜의 월과 주어진 날짜의 월을 비교하여 아직 생일이 오지 않았을 경우 연도에서 1을 빼줍니다.
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return yearDifference - 1;
  }
  return yearDifference;
};
