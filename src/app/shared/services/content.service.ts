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

  resetPassword(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.resetPasswords, data)
  }
  changePassword(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.changePasswords, data)
  }
 
  logout(){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.logouts, {});
  }
  // postsetting(data:any){
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.postSetting,data)
  // }
  // getsetting(languageMode: number = 1) {
  //   return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.getTerms}`, {
  //     params: { languageMode: languageMode.toString() }
  //   }).pipe(
  //     map((data: any) => {
  //       return data;
  //     })
  //   );
  // }

  
  termsAndConditions(languageMode: number = 1) {
    debugger
      return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.getTerms}`, {
        params: { languageMode: languageMode.toString() }
      }).pipe(
        map((data: any) => {
          return data;
        })
      );
    }

  privacy(languageMode: number = 1) {
    debugger
      return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.getPrivacy}`, {
        params: { languageMode: languageMode.toString() }
      }).pipe(
        map((data: any) => {
          return data;
        })
      );
    }


  aboutUs(languageMode: number = 1) {
    debugger
      return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.getAbout}`, {
        params: { languageMode: languageMode.toString() }
      }).pipe(
        map((data: any) => {
          return data;
        })
      );
    }
  
  // updateTermsAndConditons(data:any){
  //   debugger
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.termsUpdate,data)
  // }

  updateTermsAndConditons(termsCondition: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { termsCondition: termsCondition };

    return this.http.post<any>(environment.apiUrl + ApiEndPoint.termsUpdate, body, { headers: headers });
  }

  privacyUpdate(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.privacyUpdate, data)
  }
  
  updateAboutUs(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.aboutUpdate, data)
  }

 
  getDoctors(data: any) {
    debugger
    const params = new HttpParams()
      .set('OrgCode', data.OrgCode)
      .set('ShowInPatientPortal', data.ShowInPatientPortal);
  
    return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.doctors}`, { params });
  }
  
  DetailDoctor(data: any) {
    debugger
    const params = new HttpParams()
      .set('OrgCode', data.OrgCode)
      .set('ShowInPatientPortal', data.ShowInPatientPortal)
      .set('loginid', data.loginid);
  
    return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.doctorsDetail}`, { params });
  }
  getPatientList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.patient);
  }

  DetailPatient(data: any) {
    debugger
    const params = new HttpParams()
      .set('Mrn', data.Mrn)
      .set('MobilePhone', data.MobilePhone)
      .set('NationalId', data.NationalId);
  
    return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.patientDetail}`, { params });
  }
  getConsent(mrn:any){
    debugger
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.consentForm + '?mrn=' + mrn.mrn + '&language=' + mrn.language )
  }


  getBannerList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.banners);
  }

  bannerAddUpdate(data: any) {
    return this.http.post<any>(
      environment.apiUrl + ApiEndPoint.addupdateBanner,
      data
    );
  }

  deleteBanner(Id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}${ApiEndPoint.deleteBanner}?Id=${Id}`
    );
  }


  getVisits(data: any) {
    debugger
    const params = new HttpParams()
      .set('mrn', data.mrn)
      .set('forPatient', data.forPatient)
      .set('forDoctor', data.forDoctor);
  
    return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.visit}`, { params });
  }

  DetailVisit(data: any) {
    debugger
    const params = new HttpParams()
      .set('mrn', data.mrn)
      .set('visitId', data.visitId);
  
    return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.visitDetail}`, { params });
  }
  getConsentForm(mrn: string): Observable<any> {
    const params = new HttpParams().set('mrn', mrn);

    return this.http.get<any>(`${environment.apiUrl}${ApiEndPoint.consentForm}`, { params });
  }


  getComplaintList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getComplaints);
  }


  statusPost(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.complaintStatus, data);
  }
  getComplaintDetails(ComplaintId : number): Observable<any> {
    const url = `${environment.apiUrl}${ApiEndPoint.complaintDetail}/${ComplaintId }`;
    return this.http.get<any>(url);
  }

  getFeedbackList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getFeedback + '?PageNumber=' + data.PageNumber + '&PageSize=' + data.PageSize);
  }

  getSatisfactionList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.satisfactionList + '?PageNumber=' + data.PageNumber + '&PageSize=' + data.PageSize);
  }

  getSatisfactionDetail(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}${ApiEndPoint.satisfactionDetail}?id=${id}`
    );
  }

  getSatisfactionDelete(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}${ApiEndPoint.satisfactionDelete}?id=${id}`
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

  
}
