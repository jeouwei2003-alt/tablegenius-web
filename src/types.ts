export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  year: number;
  credits: number;
  type: '전공필수' | '전공선택' | '교양선택';
  professor: string;
  location: string;
  schedule: Array<{
    day: '월' | '화' | '수' | '목' | '금';
    startTime: string; // e.g., "09:00"
    endTime: string;   // e.g., "10:30"
  }>;
}

export interface UserInput {
  department: string;
  year: number; // 1, 2, 3, 4
  semester: string; // "1학기" | "2학기"
  minCredits: number;
  maxCredits: number;
  preferredFreeDays: string[]; // ['금'] etc.
  creditGaps: {
    majorRequired: number;
    generalElective: number;
  };
  customKeywords: string;
}

export interface TimetableResult {
  schedule: Array<{
    courseId: string;
    course: Course;
    color: string;
  }>;
  aiExplanation: string;
  metadata: {
    totalCredits: number;
    fulfilledFreeDays: string[];
    majorRatio: number;
    liberalRatio: number;
  };
  planB: Array<{
    title: string;
    courses: Array<{
      id: string;
      name: string;
      credits: number;
      type: string;
      scheduleStr: string;
    }>;
    reason: string;
  }>;
}
