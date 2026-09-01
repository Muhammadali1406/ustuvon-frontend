import type { TaxamonySubject } from "@/widgets/test/hook/test-types";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL ?? "";
const API_BASE = `${API_ORIGIN}/api/v1`;

export const links = {
  auth: {
    login: `${API_BASE}/auth/login/`,
    register: `${API_BASE}/auth/register/`,
    me: `${API_BASE}/auth/me/`,
    tokenRefresh: `${API_BASE}/auth/token/refresh/`,
    verify: `${API_BASE}/auth/verify/`,
    verifyResend: `${API_BASE}/auth/verify/resend/`,
    passwordChange: `${API_BASE}/auth/password/change/`,
    passwordChangeConfirm: `${API_BASE}/auth/password/change/confirm/`,
    passwordReset: `${API_BASE}/auth/password/reset/`,
    passwordResetConfirm: `${API_BASE}/auth/password/reset/confirm/`,
    telegramGenerateToken: `${API_BASE}/auth/auth/telegram/generate-token/`,
    telegramVerifyToken: `${API_BASE}/auth/auth/telegram/verify-token/`,
  },

  notifications: {
    sms: {
      request: `${API_BASE}/notifications/sms/request/`,
      verify: `${API_BASE}/notifications/sms/verify/`,
      resend: `${API_BASE}/notifications/sms/resend/`,
      status: `${API_BASE}/notifications/sms/status/`,
      balance: `${API_BASE}/notifications/sms/balance/`,
      logs: `${API_BASE}/notifications/sms/logs/`,
    },
  },

  subjects: {
    taxonomyTree: `${API_BASE}/subjects/taxanomy-tree/`, // backend'dagi imlo shu (qarang: yuqoridagi eslatma)
    categoryCreate: `${API_BASE}/subjects/category_create/`, // oxirida "/" yo'q
    categoryUpdate: (id: number | string) =>
      `${API_BASE}/subjects/category_update/${id}/`,
    categoryDelete: (id: number | string) =>
      `${API_BASE}/subjects/category_delete/${id}/`,
    subjectCreate: `${API_BASE}/subjects/subject_create/`,
    subjectUpdate: (data: TaxamonySubject) =>
      `${API_BASE}/subjects/subject_update/${data}/`,
    subjectDelete: (id: number | string) =>
      `${API_BASE}/subjects/subject_delete/${id}/`,
  },

exams: {
  examinations: `${API_BASE}/exams/examinations/`,
  examinationDetail: (id: number | string) =>
    `${API_BASE}/exams/examinations/${id}/`,
  examinationStart: (id: number | string) =>
    `${API_BASE}/exams/examinations/${id}/start/`,
  examinationSubmit: (id: number | string) =>
    `${API_BASE}/exams/examinations/${id}/submit/`,
  questions: `${API_BASE}/exams/questions/`,
  questionDetail: (id: number | string) =>
    `${API_BASE}/exams/questions/${id}/`,
  results: `${API_BASE}/exams/results/`,
  resultDetail: (id: number | string) => `${API_BASE}/exams/results/${id}/`,
},

  certificates: {
    list: `${API_BASE}/certificates/`,
    detail: (id: string) => `${API_BASE}/certificates/${id}/`,
    validate: (certificateNumber: string) =>
      `${API_BASE}/certificates/validate/${certificateNumber}/`, // public, auth talab qilmaydi
  },

  aiParser: {
    jobs: `${API_BASE}/ai-parser/jobs/`,
    jobDetail: (id: string) => `${API_BASE}/ai-parser/jobs/${id}/`,
    jobUpload: `${API_BASE}/ai-parser/jobs/upload/`,
    jobRetry: (jobId: string) => `${API_BASE}/ai-parser/jobs/${jobId}/retry/`,
    jobPublish: (jobId: string) =>
      `${API_BASE}/ai-parser/jobs/${jobId}/publish/`,
    jobQuestions: (jobId: string) =>
      `${API_BASE}/ai-parser/jobs/${jobId}/questions/`,
    jobQuestionDetail: (jobId: string, id: string) =>
      `${API_BASE}/ai-parser/jobs/${jobId}/questions/${id}/`,
    jobQuestionsConfirmAll: (jobId: string) =>
      `${API_BASE}/ai-parser/jobs/${jobId}/questions/confirm-all/`,
    testTypes: `${API_BASE}/ai-parser/test-types/`,
  },

  adminPanel: {
    dashboard: `${API_BASE}/admin-panel/dashboard/`,
    users: `${API_BASE}/admin-panel/users/`,
    userDetail: (id: string) => `${API_BASE}/admin-panel/users/${id}/`,
  },
};
