const domain = 'http://127.0.0.1:8000/'

export const HRUserDetailsAPI = `${domain}api/hr/users` // <pk>
export const HRUserListAPI = `${domain}api/hr/users/`
export const HRLoginAPI = `${domain}api/hr/users/login`
export const HRForgotPassAPI = `${domain}api/hr/users/forgot`

export const HRSystemQuestnAPI = `${domain}api/hr/system/questions`
export const HRSystemMcqsAPI = `${domain}api/hr/system/mcqs`
export const HRTestsListAPI = `${domain}api/hr/tests`
export const HRTestsDetailsAPI = `${domain}api/hr/tests` // <pk>

export const HRLogListAPI = `${domain}api/hr/logs`
export const HRScoreListAPI = `${domain}api/hr/score`
export const HRScoreDetailsAPI = `${domain}api/hr/score` // <pk>

export const HRCandidateFinderAPI = `${domain}api/hr/candidate_finder`
export const HRChangePassAPI = `${domain}api/hr/change_password` // <email>

// path('forgot_password/', views.forgot_password),