export enum ApiEndPoint {
    login = "api/Admin/login",
    emailOtp="api/Auth/EmailOTP",
    resetPasswords="api/Admin/ResetPassword",
    changePasswords="api/Admin/ChangePassword",
    logouts = "api/Auth/Logout",
    getCountry = "api/Content/GetCountries",
    getNationality = "api/Content/GetNationalities",
    getState = "api/Content/GetStates",
    // getSetting = "api/Content/GetAppSettings",
    // postSetting = "api/Content/AddUpdateAppSettings",
    getTerms="api/Admin/GetTerms",
    getPrivacy="api/Admin/GetPrivacy",
    getAbout="api/Admin/GetAbout",
    termsUpdate = "api/Admin/UpdateTerms",
    privacyUpdate = "api/Admin/UpdatePrivacy",
    aboutUpdate = "api/Admin/UpdateAboutUs",

    doctors="api/User/GetDoctors",
    doctorsDetail="api/User/GetDoctorDetails",
    patient="api/Admin/GetPatientList",
    patientDetail="api/User/GetPatientDetails",
    banners="api/Admin/GetBannerList",
    addupdateBanner="api/Admin/AddUpdateBanner",
    deleteBanner="api/Admin/DeleteBanner",
    visit="api/User/GetAllVisits",
    visitDetail="api/User/GetVisitDetail",
    consentForm="api/User/GetConsentForm",
    doctorAppointment="api/User/GetDoctorAppointments",
    patientAppointment="api/User/GetPatitentAppointments",
    
    getComplaints="api/Admin/GetComplaints",
    complaintStatus="api/Admin/SetComplaintStatus",
    complaintDetail="api/Admin/GetComplaintDetail",
    getFeedback="api/Admin/GetFeedbackList",
    complaintReply="api/Admin/GetComplaintReplys",
    addUpdatecomplaint="api/Admin/AddUpdateComplaintReply",

    satisfactionList="api/User/GetPatientSatisfactionList",
    satisfactionDetail="api/User/GetPatientSatisfactionDetail",
    satisfactionDelete="api/User/DeletePatientSatisfaction"


}

