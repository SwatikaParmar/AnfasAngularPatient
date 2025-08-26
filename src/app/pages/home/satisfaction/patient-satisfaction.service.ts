import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CodeLabel {
  code: number | string | null;
  label: string | null;
}

export interface EnumOption {
  code: number;
  label: string;
}

export interface RatingItem {
  key: any;
  label: any;
  value: any; // 5..0 or null
}

export interface CommentItem {
  key: any;
  label: any;
  value: any;
}

export interface SubjectInfo {
  mode: 'guest' | 'patient' | string;
  id: string | null;
  guestName: string | null;
  filledBy: CodeLabel;
  mrn: string | null;
  mobileNumber: string | null;
  gender: CodeLabel;
  ageBracket: CodeLabel;
  residence: CodeLabel;
  createdAt: string | null;
}

export interface SatisfactionLabels {
  form: { title: string; intro: string };
  fields: {
    filledBy: string;
    guestName: string;
    mrn: string;
    mobileNumber: string;
    gender: string;
    ageBracket: string;
    residence: string;
  };
}

export interface PatientSatisfactionResponse {
  subject: SubjectInfo;
  ratings: { items: RatingItem[] };
  comments: { items: CommentItem[] };
  ratingScale: EnumOption[]; // includes 5..0 (0 = Not Applicable)
  enums: {
    filledBy: EnumOption[];
    gender: EnumOption[];
    ageBracket: EnumOption[];
    residence: EnumOption[];
  };
  satisfactionLabel: SatisfactionLabels;
}

@Injectable({ providedIn: 'root' })
export class PatientSatisfactionService {
  // Adjust if you keep a global environment base URL
  private baseUrl = 'https://swagger.amchealthgroup.com/api/PatientSatisfaction';

  constructor(private http: HttpClient) {}

  /**
   * Fetch by visitId or mrn (either/both can be provided).
   * The API you shared shows visitId; we’ll pass both as query params if available.
   * If no data is found, the API should return the "empty form" shape.
   */
  getForm(params: { visitId?: string; mrn?: string }): Observable<PatientSatisfactionResponse> {
    let httpParams = new HttpParams();
    if (params.visitId) httpParams = httpParams.set('visitId', params.visitId);
    if (params.mrn) httpParams = httpParams.set('mrn', params.mrn);

    return this.http
      .get<PatientSatisfactionResponse>(`${this.baseUrl}/GetPatientSatisfactionForm`, { params: httpParams })
      .pipe(
        map((res) => {
          // Defensive: ensure arrays exist
          res.ratings ??= { items: [] as RatingItem[] };
          res.comments ??= { items: [] as CommentItem[] };
          res.ratingScale ??= [];
          res.enums ??= { filledBy: [], gender: [], ageBracket: [], residence: [] };
          return res;
        })
      );
  }
}
