import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiEndPoint } from '../enums/api-end-point.enum';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ContentService {


  constructor(private http: HttpClient) { }


  getDoctors() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.doctor + '?OrgCode=AMC' + '&ShowInPatientPortal=true')
  }

    getDoctorss(data:any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.doctor + '?OrgCode=AMC' + '&ShowInPatientPortal=true' + '&DepartmentName=' + data.DepartmentName)
  }
  patientDetails(data: any) {
    
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.patientDetail + '?Mrn=' + data)
  }

  getConsent(mrn: any) {
    
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.consentForm + '?mrn=' + mrn.mrn + '&language=' + mrn.language)
  }

  patientAssignd(data:any){
return this.http.post<any>(environment.apiUrl + ApiEndPoint.patientAssign,data)
  }

 uploadVitalPicture(file: File, id: number, type: string): Observable<any> {
  const formData = new FormData();
  formData.append('File', file);       // "File" must match the backend field name
  formData.append('Id', id.toString()); 
  formData.append('Type', type);        // e.g., 'BloodPressure', 'HeartRate', etc.

  return this.http.post(environment.apiUrl + 'api/User/UploadVitalPicture', formData);
}


  getVisit(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.visitList + '?mrn=' + data + '&forPatient=true' + '&forDoctor=false')
  }


  getLab(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.LabReport + '?PatientUid=' + data.PatientUid
      + '&PatientVisitUid=' + data.PatientVisitUid + '&orderUid=' + data.orderUid
    )
  }

  getRis(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.RisReport + '?PatientUid=' + data.PatientUid
      + '&PatientVisitUid=' + data.PatientVisitUid + '&orderUid=' + data.orderUid
    )
  }

  getAppointment(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.appointment + '?mrn=' + data)
  }


  // saveConsentForm(data: any) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   const options = {
  //     headers: headers
  //   };
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.saveConsent, data, options).pipe(map((data: any) => {
  //     localStorage.setItem('File', data);
  //     return data;
  //   }));
  // }

  saveConsentForm(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.saveConsent, data).pipe(
      map((response: any) => {
        localStorage.setItem('File', JSON.stringify(response));
        return response;
      })
    );
  }

  aboutUs() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAbout);
  }


  getComplaint(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.complaintList + '?mrn=' + data.mrn +
      '&page=' + data.page + '&pageSize=' + data.pageSize
    )
  }


    getComplaintdoctor(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.complaintList + '?careProviderCode=' + data.careProviderCode +
      '&page=' + data.page + '&pageSize=' + data.pageSize
    )
  }

  getMessagesList(userName: any) {
    const url = `${environment.apiUrl}${ApiEndPoint.messagesList}/${userName}`;
    return this.http.get<any>(url);
  }

  getComplaintType(mrn:any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.complaintType + '?mrn=' + mrn)
  }

  addComplaint(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addComplaint, data)
  }


  getChatHistory(senderId: string, receiverId: string) {
    const url = `${environment.apiUrl + ApiEndPoint.chatHistory}?senderId=${senderId}&receiverId=${receiverId}`;
    return this.http.get<any>(url);
  }

  sendMessage(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.sendMessage,
      data
    );
  }


  getComplaintReply(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.complaintReply + '?complaintId=' + data.complaintId + '&page=' + data.page
      + '&pageSize=' + data.pageSize
    );
  }

  complaintAddUpdate(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addUpdatecomplaint,
      data
    );

  }
  getAvailableDate(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.availableDates + '?OrgCode=' + data.OrgCode
      + '&CareProviderCode=' + data.CareProviderCode + '&FromDate=' + data.FromDate + '&ToDate=' + data.ToDate
    )
  }

  slotsAvaliable(data: any) {
    
    return this.http.get<any>(
      `${environment.apiUrl}${ApiEndPoint.DoctorTimeSlot}?OrgCode=${data.OrgCode}&CareProviderCode=${data.CareProviderCode}&FromDate=${data.FromDate}&ToDate=${data.ToDate}`
    );
  }

  bookAppointment(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.bookAppointment,
      data
    );
  }

  getmedication(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.medication + '?mrn=' + data.mrn + '&pageNumber=' + data.pageNumber
      + '&pageSize=' + data.pageSize
    );
  }

  getRequestType(mrn:any) {
    
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.requestType + '?mrn=' +mrn)
  }

  getRequestList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.requestList + '?userName=' + data.userName + '&pageNumber=' + data.pageNumber
      + '&pageSize=' + data.pageSize
    );
  }

  
  getRequestListdoctor(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.requestList + '?careProviderCode=' + data.userName + '&pageNumber=' + data.pageNumber
      + '&pageSize=' + data.pageSize
    );
  }

  getHealthTracker(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.healthTracker + '?mrn=' + data.mrn + '&type=' + data.type +
      '&pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize
    );
  }


  getXray(mrn: string) {
    return this.http.get<any>(`${environment.apiUrl + ApiEndPoint.xray}?mrn=${mrn}`);
  }
  
  addBloodPressure(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addBloodPressure,
      data
    );

  }

  addBloodSugar(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addBloodSugar,
      data
    );

  }
  addHeartRate(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addHeartRate,
      data
    );

  }
  addWeight(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addWeight,
      data
    );

  }
  addStep(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addStep,
      data
    );

  }

  geteducationalMaterial(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.educationalMaterial + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize
      + '&mrn=' + data.mrn
    );
  }

  statusEducational(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.educationalStatus, data);
  }

  addRequest(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addRequest,
      data
    );
  }

  

  geteducationalMaterialDetail(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}${ApiEndPoint.educationalMaterialDetail}?id=${id}`
    );
  }

  cancelAppoint(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.cancelAppointment, data)
  }

  rescheduleAppointment(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.rescheduleAppointment, data
    );
  }

  getsatisfactionList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.satisfactionList + '?PageNumber=' + data.PageNumber + '&PageSize=' + data.pageSize

    );
  }

  addUpdateSatisfaction(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addUpdateSatisfaction,
      data
    );
  }

  satisfactionDetail(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}${ApiEndPoint.satisfactionDetail}?id=${id}`
    );
  }



  // doctor api's

 docAppointment(data:any){
  
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.doctorAppointment + '?CareProviderCode=' + data.careProviderCode 
+ '&FromDate=' + data.FromDate + '&ToDate=' + data.ToDate
  )
 }

  docPatient(CareProviderCode:any){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.doctorPatient + '?CareProviderCode=' + CareProviderCode)
 }

  geteducationalMaterialDoc(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.educationalMaterial + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize
      + '&careProviderCode=' + data.careProviderCode
    );
  }

  getdoctorMedication(data:any){
    return this.http.get<any>(environment.apiUrl +  ApiEndPoint.doctorMedication + '?pageNumber=' + data.pageNumber
      + '&pageSize=' + data.pageSize + '&careProviderCode=' + data.careProviderCode + '&mrn=' + data.mrn
    )
  }

  setMedicationStatus(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.medicationStatus,data)
  }

    geteducationalMaterialDoct(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.educationalMaterial + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize
      + '&mrn=' + data.mrn + '&careProviderCode=' + data.careProviderCode
    );
  }


  getPatientReport(data:any){
    return this.http.get<any>(environment.apiUrl +  ApiEndPoint.patientReport + '?PatientUid=' + data.PatientUid 
      + '&PatientVisitUid=' + data.PatientVisitUid + '&ReportType=' + data.ReportType  + '&PageNumber=' + data.PageNumber  + '&PageSize=' + data.PageSize
    )
  }

  getDoctorVisit(data:any){
        return this.http.get<any>(environment.apiUrl + ApiEndPoint.visitList + '?mrn=' + data + '&forPatient=false' + '&forDoctor=true')

  }

  //   terms() {
  //   return this.http.get<any>(environment.apiUrl + ApiEndPoint.getterms);
  // }

  terms(): Observable<any> {
  return this.http.get( environment.apiUrl + 'api/Admin/GetTermsHtml', {
    responseType: 'text' as 'json' // This is the key fix
  });
}


getBloodPressure(data: any) {
  let url = `${environment.apiUrl}${ApiEndPoint.recordType}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&careProviderCode=${data.careProviderCode}&mrn=${data.mrn}&type=${data.type}`;

  if (data.fromDate) {
    url += `&fromDate=${data.fromDate}`;
  }

  if (data.toDate) {
    url += `&toDate=${data.toDate}`;
  }

  return this.http.get<any>(url);
}


getDoctorDeatail(data:any){

  return this.http.get<any>(environment.apiUrl + ApiEndPoint.doctorDetail + '?OrgCode=' + data.OrgCode + '&loginid=' + 
    data.loginid + '&ShowInPatientPortal=' + data.ShowInPatientPortal
  )
}


addMedication(data:any){

  return this.http.post<any>(environment.apiUrl + ApiEndPoint.addMedication,data)
}

medicationDetail(data:any){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.medicationDetail + '?medicationId=' + data.medicationId 
  )
}


addEduMaterial(data: any) {
  const formData = new FormData();
  formData.append('Id', data.Id || '');
  formData.append('Title', data.Title);
  formData.append('File', data.File); // This should be a File object
  formData.append('Description', data.Description);
  formData.append('CareProviderCode', data.CareProviderCode);

  return this.http.post<any>(
    environment.apiUrl + ApiEndPoint.addEducationMaterial,
    formData
  );
}


setvitalStatus(data:any){
  return this.http.post<any>(environment.apiUrl + ApiEndPoint.vitalStatus,data)
}


getMessageList(userName :any){

  return this.http.get<any>(environment.apiUrl + ApiEndPoint.messageList + userName )

}

 getDocLab(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.LabReport +
      '?PatientVisitUid=' + data.PatientVisitUid
    )
  }


    getDocRis(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.RisReport 
      + '?PatientVisitUid=' + data.PatientVisitUid
    )
  }


requestDetail(id: number, mrn: string): Observable<any> {
  return this.http.get<any>(
    `${environment.apiUrl}${ApiEndPoint.requestDetail}?id=${id}&mrn=${mrn}`
  );
}



visitDetail(data:any){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.visitDetail + '?mrn=' + data.mrn + '&visitId=' + data.visitId)
}


onlineStatusManually(data:any){
  return this.http.post<any>(environment.apiUrl + ApiEndPoint.onlineStatus,data)
}

visitupdation(data: any) {
  return this.http.post<any>(`${environment.apiUrl}${ApiEndPoint.visitupdation}`, data);
}

 getNotification(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.Notification + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize
    + '&userName=' + data.userName
    );
  }


  xrayDetail(data:any){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.xrayDetail + '?reportId=' + data.reportId )
}


 uploadXrayReport(reportId: number, file: File) {
  const formData = new FormData();
  formData.append('ReportId', reportId.toString()); // key must match backend expectation
  formData.append('File', file);                   // 'File' is required by the API

  return this.http.post<any>(`${environment.apiUrl}${ApiEndPoint.uploadXray}`, formData);
}


getSatisfactionData(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSatisfaction)
}


getSatisfactionForm(visitId:any){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSatisfactionForm + '?mrn=' + visitId)
}


postSatisfaction(data:any){
return this.http.post<any>(environment.apiUrl + ApiEndPoint.addUpdateSatisfactionform,data)
}

getPrefrence(data:any){
  return this.http.post<any>(environment.apiUrl + ApiEndPoint.getLanguagePrefrence,data)
}

addUpdatePrefrence(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addupdatePrefrence,data)

}
getBannerList(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBannerList)
}


}
