export interface TheoryCourse {
  courseCode: string;
  courseName: string;
  academicYear: string;
  pattern: string;
  faculty: string;
  department: string;
  programme: string;
  credits: string;
  semester: string;
  division: string;
  courseTeacher: string;
  dateWEF: string;
  LTP: string;
  type?: string;
}

export interface TheoryCourseRow {
  unitNo: string;
  lectureNo: string;
  topic: string;
  CO: string;
  coThreshold: string;
  BTL: string;
  teachingMethod: string;
  studentActivity: string;
  assessmentTool: string;
  scheduleA?: string;
  scheduleB?: string;
  scheduleC?: string;
  conductiionA?: string;
  conductiionB?: string;
  conductiionC?: string;
  deviationReason?: string;
}

export interface PracticalCourse {
  courseCode: string;
  courseName: string;
  academicYear: string;
  pattern: string;
  faculty: string;
  department: string;
  programme: string;
  credits: string;
  semester: string;
  division: string;
  batch: string;
  dateWEF: string;
  LTP: string;
  type?: string;
}

export interface PracticalCourseRow {
  practicalNo: string;
  nameOfExperiment: string;
  CO: string;
  coThreshold: string;
  BTL: string;
  teachingMethod: string;
  studentActivity: string;
  assessmentTool: string;
  scheduleA?: string;
  scheduleB?: string;
  scheduleC?: string;
  conductiionA?: string;
  conductiionB?: string;
  conductiionC?: string;
  deviationReason?: string;
}
