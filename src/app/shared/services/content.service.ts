import { HttpClient, HttpParams,HttpHeaders  } from '@angular/common/http';
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
    return this.http.get<any>(environment.apiUrl +  ApiEndPoint.doctors)
  }

  patientDetails(data:any){
    debugger
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.patientDetail + '?Mrn=' + data)
  }

  getConsent(mrn:any){
    debugger
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.consentForm + '?mrn=' + mrn.mrn + '&language=' + mrn.language )
  }

  
  getVisit(data:any) {  
    return this.http.get<any>(environment.apiUrl +  ApiEndPoint.visitList + '?mrn=' + data + '&forPatient=true' + '&forDoctor=false')
  }


  getLab(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.LabReport + '?PatientUid=' + data.PatientUid 
      + '&PatientVisitUid=' + data.PatientVisitUid
    )
  }

  getRis(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.RisReport + '?PatientUid=' + data.PatientUid 
      + '&PatientVisitUid=' + data.PatientVisitUid
    )
  }

  getAppointment(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.appointment + '?mrn=' + data)
  }
 
  // saveConsentForm(data: any) {
  //   debugger
  //   const formData = new FormData();
  //   formData.append('mrn', data.mrn);
  //   formData.append('Signature', data.Signature); // Signature should be a File (e.g., from an input type="file")
  
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.saveConsent, formData);
  // }

  saveConsentForm(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.saveConsent, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  aboutUs() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAbout);
  }


  getComplaint(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.complaintList + '?mrn=' + data.mrn +
      '&page=' + data.page + '&pageSize=' + data.pageSize
    )
  }


  getMessagesList(userName: any) {
    const url = `${environment.apiUrl}${ApiEndPoint.messagesList}/${userName}`;
    return this.http.get<any>(url);
  }
  
  getComplaintType(){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.complaintType)
  }
  
  addComplaint(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addComplaint,data)
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
  getAvailableDate(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.availableDates + '?OrgCode=' + data.OrgCode
      + '&CareProviderCode=' + data.CareProviderCode + '&FromDate=' + data.FromDate + '&ToDate=' + data.ToDate
    )
  }

  slotsAvaliable(data: any) {
    debugger
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

  getRequestType(){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.requestType)
  }

  getRequestList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.requestList + '?userName=' + data.userName + '&pageNumber=' + data.pageNumber
      + '&pageSize=' + data.pageSize
    );
  }
}
