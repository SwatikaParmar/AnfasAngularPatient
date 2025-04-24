export enum ApiEndPoint {
    login = "api/User/PatientLogin",
    patientDetail = "api/User/GetPatientDetails",
    doctors = "api/Admin/GetDoctorList",
    consentForm="api/User/GetConsentForm",
    visitList = "api/User/GetAllVisits",
    LabReport  = "api/User/LabReport",
    RisReport = "api/User/RISReport",
    appointment = "api/User/GetPatitentAppointments",
    saveConsent = "api/User/SaveConsentForm",
    getAbout = "api/Admin/GetAbout",
    complaintList = "api/Admin/GetComplaints",
    messagesList = "api/Chat/chatUsers"
}

