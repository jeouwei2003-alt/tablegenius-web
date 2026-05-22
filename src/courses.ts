import { Course } from './types';

export const UNIVERSITY_COURSES: Course[] = [
  // 컴퓨터공학과
  {
    id: 'cs-algo',
    name: '알고리즘 개론',
    code: 'CS204',
    department: '컴퓨터공학과',
    year: 2,
    credits: 3,
    type: '전공필수',
    professor: '김동현 교수',
    location: 'IT공학관 302호',
    schedule: [
      { day: '월', startTime: '09:00', endTime: '10:30' },
      { day: '수', startTime: '09:00', endTime: '10:30' }
    ]
  },
  {
    id: 'cs-oop',
    name: '객체지향 프로그래밍 및 실습',
    code: 'CS102',
    department: '컴퓨터공학과',
    year: 1,
    credits: 3,
    type: '전공필수',
    professor: '박서준 교수',
    location: 'IT공학관 204호',
    schedule: [
      { day: '화', startTime: '13:30', endTime: '15:00' },
      { day: '목', startTime: '13:30', endTime: '15:00' }
    ]
  },
  {
    id: 'cs-db',
    name: '데이터베이스 시스템 설계',
    code: 'CS301',
    department: '컴퓨터공학과',
    year: 3,
    credits: 3,
    type: '전공선택',
    professor: '이지은 교수',
    location: 'IT공학관 401호',
    schedule: [
      { day: '월', startTime: '15:00', endTime: '16:30' },
      { day: '수', startTime: '15:00', endTime: '16:30' }
    ]
  },
  {
    id: 'cs-ai',
    name: '인공지능 입문 및 실습',
    code: 'CS305',
    department: '컴퓨터공학과',
    year: 3,
    credits: 3,
    type: '전공선택',
    professor: '최원영 교수',
    location: 'IT공학관 502호',
    schedule: [
      { day: '화', startTime: '10:30', endTime: '12:00' },
      { day: '목', startTime: '10:30', endTime: '12:00' }
    ]
  },
  {
    id: 'cs-web',
    name: '풀스택 웹 프레임워크 실습',
    code: 'CS208',
    department: '컴퓨터공학과',
    year: 2,
    credits: 3,
    type: '전공선택',
    professor: '윤소희 교수',
    location: 'IT공학관 104호',
    schedule: [
      { day: '월', startTime: '13:30', endTime: '15:00' },
      { day: '수', startTime: '13:30', endTime: '15:00' }
    ]
  },
  {
    id: 'cs-network',
    name: '컴퓨터 네트워크',
    code: 'CS302',
    department: '컴퓨터공학과',
    year: 3,
    credits: 3,
    type: '전공필수',
    professor: '한선우 교수',
    location: 'IT공학관 301호',
    schedule: [
      { day: '화', startTime: '15:00', endTime: '16:30' },
      { day: '목', startTime: '15:00', endTime: '16:30' }
    ]
  },
  {
    id: 'cs-os',
    name: '운영체제 설계',
    code: 'CS201',
    department: '컴퓨터공학과',
    year: 2,
    credits: 3,
    type: '전공필수',
    professor: '민경훈 교수',
    location: 'IT공학관 202호',
    schedule: [
      { day: '화', startTime: '09:00', endTime: '10:30' },
      { day: '목', startTime: '09:00', endTime: '10:30' }
    ]
  },
  {
    id: 'cs-graphic',
    name: '컴퓨터 그래픽스',
    code: 'CS402',
    department: '컴퓨터공학과',
    year: 4,
    credits: 3,
    type: '전공선택',
    professor: '고아라 교수',
    location: 'IT공학관 506호',
    schedule: [
      { day: '월', startTime: '10:30', endTime: '12:00' },
      { day: '수', startTime: '10:30', endTime: '12:00' }
    ]
  },

  // 경영학과
  {
    id: 'ba-market',
    name: '마케팅 관리 원론',
    code: 'BA101',
    department: '경영학과',
    year: 1,
    credits: 3,
    type: '전공필수',
    professor: '홍길동 교수',
    location: '경영관 101호',
    schedule: [
      { day: '월', startTime: '10:30', endTime: '12:00' },
      { day: '수', startTime: '10:30', endTime: '12:00' }
    ]
  },
  {
    id: 'ba-accounting',
    name: '재무회계 의사결정',
    code: 'BA202',
    department: '경영학과',
    year: 2,
    credits: 3,
    type: '전공필수',
    professor: '정민우 교수',
    location: '경영관 203호',
    schedule: [
      { day: '화', startTime: '09:00', endTime: '10:30' },
      { day: '목', startTime: '09:00', endTime: '10:30' }
    ]
  },
  {
    id: 'ba-consumer',
    name: '소비자 행동 분석론',
    code: 'BA304',
    department: '경영학과',
    year: 3,
    credits: 3,
    type: '전공선택',
    professor: '강수민 교수',
    location: '경영관 302호',
    schedule: [
      { day: '월', startTime: '13:30', endTime: '15:00' },
      { day: '수', startTime: '13:30', endTime: '15:00' }
    ]
  },
  {
    id: 'ba-ob',
    name: '조직행동 및 인사관리론',
    code: 'BA201',
    department: '경영학과',
    year: 2,
    credits: 3,
    type: '전공선택',
    professor: '조태희 교수',
    location: '경영관 405호',
    schedule: [
      { day: '화', startTime: '15:00', endTime: '16:30' },
      { day: '목', startTime: '15:00', endTime: '16:30' }
    ]
  },
  {
    id: 'ba-strategy',
    name: '글로벌 기업 전략 기획',
    code: 'BA401',
    department: '경영학과',
    year: 4,
    credits: 3,
    type: '전공필수',
    professor: '성시경 교수',
    location: '경영관 501호',
    schedule: [
      { day: '월', startTime: '15:00', endTime: '16:30' },
      { day: '수', startTime: '15:00', endTime: '16:30' }
    ]
  },
  {
    id: 'ba-finance',
    name: '재무관리입문',
    code: 'BA203',
    department: '경영학과',
    year: 2,
    credits: 3,
    type: '전공선택',
    professor: '유재석 교수',
    location: '경영관 112호',
    schedule: [
      { day: '화', startTime: '13:30', endTime: '15:00' },
      { day: '목', startTime: '13:30', endTime: '15:00' }
    ]
  },

  // 미디어커뮤니케이션학과
  {
    id: 'mc-intro',
    name: '미디어와 사회의 이해',
    code: 'MC101',
    department: '미디어커뮤니케이션학과',
    year: 1,
    credits: 3,
    type: '전공필수',
    professor: '손석희 교수',
    location: '사회과학관 201호',
    schedule: [
      { day: '월', startTime: '10:30', endTime: '12:00' },
      { day: '수', startTime: '10:30', endTime: '12:00' }
    ]
  },
  {
    id: 'mc-journal',
    name: '저널리즘 실습 및 비평',
    code: 'MC205',
    department: '미디어커뮤니케이션학과',
    year: 2,
    credits: 3,
    type: '전공필수',
    professor: '백지연 교수',
    location: '사회과학관 304호',
    schedule: [
      { day: '화', startTime: '09:00', endTime: '10:30' },
      { day: '목', startTime: '09:00', endTime: '10:30' }
    ]
  },
  {
    id: 'mc-content',
    name: '디지털 영상 미디어 제작',
    code: 'MC302',
    department: '미디어커뮤니케이션학과',
    year: 3,
    credits: 3,
    type: '전공선택',
    professor: '나영석 교수',
    location: '미디어관 스튜디오A',
    schedule: [
      { day: '월', startTime: '13:30', endTime: '16:30' } // 월 3시간 연속
    ]
  },
  {
    id: 'mc-ad',
    name: '광고 크레이티브 전략 및 기획',
    code: 'MC308',
    department: '미디어커뮤니케이션학과',
    year: 3,
    credits: 3,
    type: '전공선택',
    professor: '이효리 교수',
    location: '사회과학관 502호',
    schedule: [
      { day: '화', startTime: '13:30', endTime: '15:00' },
      { day: '목', startTime: '13:30', endTime: '15:00' }
    ]
  },

  // 교양선택
  {
    id: 'ge-psych',
    name: '현대 사회와 인간 심리학의 이해',
    code: 'GE101',
    department: '교양선택',
    year: 1,
    credits: 3,
    type: '교양선택',
    professor: '장인표 교수',
    location: '인문종합관 102호',
    schedule: [
      { day: '월', startTime: '13:30', endTime: '15:00' },
      { day: '수', startTime: '13:30', endTime: '15:00' }
    ]
  },
  {
    id: 'ge-lit',
    name: '세계 명작 문학의 비판적 읽기',
    code: 'GE102',
    department: '교양선택',
    year: 1,
    credits: 3,
    type: '교양선택',
    professor: '송혜교 교수',
    location: '인문종합관 203호',
    schedule: [
      { day: '화', startTime: '15:00', endTime: '16:30' },
      { day: '목', startTime: '15:00', endTime: '16:30' }
    ]
  },
  {
    id: 'ge-science',
    name: '메타버스 시대의 과학기술과 미래사회',
    code: 'GE103',
    department: '교양선택',
    year: 1,
    credits: 3,
    type: '교양선택',
    professor: '박보검 교수',
    location: '이학네트워크관 101호',
    schedule: [
      { day: '화', startTime: '09:00', endTime: '10:30' },
      { day: '목', startTime: '09:00', endTime: '10:30' }
    ]
  },
  {
    id: 'ge-english',
    name: '실용 비즈니스 무역 영어 실습',
    code: 'GE104',
    department: '교양선택',
    year: 1,
    credits: 3,
    type: '교양선택',
    professor: '엘리자베스 교수',
    location: '글로벌교육관 303호',
    schedule: [
      { day: '수', startTime: '15:00', endTime: '16:30' },
      { day: '금', startTime: '09:00', endTime: '10:30' }
    ]
  },
  {
    id: 'ge-universe',
    name: '우주의 역사와 기원 탐색',
    code: 'GE105',
    department: '교양선택',
    year: 1,
    credits: 3,
    type: '교양선택',
    professor: '유명한 교수',
    location: '자연과학관 104호',
    schedule: [
      { day: '금', startTime: '09:00', endTime: '12:00' } // 금요일 오전 3시간 연속
    ]
  },
  {
    id: 'ge-movie',
    name: '현대 예술 문화와 한국 영화 분석',
    code: 'GE106',
    department: '교양선택',
    year: 1,
    credits: 3,
    type: '교양선택',
    professor: '봉준호 교수',
    location: '예술종합관 102호',
    schedule: [
      { day: '금', startTime: '13:30', endTime: '16:30' } // 금요일 오후 3시간 연속
    ]
  },
  {
    id: 'ge-econ',
    name: '생활 속의 유익한 경제학 핵심 에센스',
    code: 'GE107',
    department: '교양선택',
    year: 1,
    credits: 2,
    type: '교양선택',
    professor: '임지연 교수',
    location: '사회과학관 108호',
    schedule: [
      { day: '수', startTime: '13:30', endTime: '15:00' }
    ]
  },
  {
    id: 'ge-philosophy',
    name: '철학적 사고와 논리적 대화법',
    code: 'GE108',
    department: '교양선택',
    year: 1,
    credits: 2,
    type: '교양선택',
    professor: '설민석 교수',
    location: '인문종합관 402호',
    schedule: [
      { day: '화', startTime: '13:30', endTime: '15:00' }
    ]
  }
];
