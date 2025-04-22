import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
@Component({
  selector: 'app-patient-consent',
  templateUrl: './patient-consent.component.html',
  styleUrls: ['./patient-consent.component.css']
})
export class PatientConsentComponent {
  Mrn: string = '';
  mrnUrl: SafeHtml = ''; // For direct rendering
  useShadowDom: boolean = true; // Toggle for Shadow DOM usage

  constructor(
    private contentService: ContentService,
    private _location: Location,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Mrn = params['mrn'];
      if (this.Mrn) {
        this.getConsentForm();
      } else {
        console.error('MRN is missing');
      }
    });
  }

  getConsentForm(): void {
    // Map the language code to the respective language name
    const languageMap: { [key: string]: string } = {
      en: 'English',
      ar: 'Arabic'
    };
  
    // Retrieve the language code from localStorage and map it
    const languageCode = localStorage.getItem('language') || 'en'; // Default to 'en'
    const selectedLanguage = languageMap[languageCode] || 'English'; // Default to English if mapping fails
  
    let payload = {
      mrn: this.Mrn,
      language: selectedLanguage // Use the mapped language name
    };
  
    this.contentService.getConsent(payload).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          if (this.useShadowDom) {
            this.renderInShadowDom(response.data);
          } else {
            this.mrnUrl = this.sanitizer.bypassSecurityTrustHtml(response.data);
          }
        } else {
          console.error('Failed to fetch consent form');
        }
      },
      error => {
        console.error('Error fetching consent form', error);
      }
    );
  }
  
  renderInShadowDom(htmlContent: string): void {
    const container = this.elRef.nativeElement.querySelector('#shadowContainer');

    // Create Shadow DOM
    const shadowRoot = container.attachShadow({ mode: 'open' });

    // Add isolated styles and content
    shadowRoot.innerHTML = `
  <style>
        body {
            padding: 0;
            margin: 0;
        }

        .bg {
            width: 100%;
            height: auto;
            display: block;
            overflow: hidden;
            margin-bottom: 7%;
        }

        .backgroung {
            width: 50%;
            height: auto;
            float: left;
            position: relative;
        }

        .backgroung img {
            width: 115%!important;
            height: auto;
        }

        .king {
            position: absolute;
            top: 44%;
            left: 32%;
            /* Adjust horizontal position */
            transform: translate(-50%, -50%);
            /* Center the text */
            color: white;
            /* Change text color for better visibility */
            text-align: center;
            font-weight: bold;
            padding: 10px;
            border-radius: 8px;
        }

        .hr {
            font-size: 30px;
            padding-left: 30px;
            color: #F9BC34;
        }

        .toggle-menu {
            width: 50%;
            height: auto;
            float: left;
        }

        .toggle-menu img {
            width: 24%;
            height: auto;
            padding-left: 34px;
            padding-top: 15px;
        }

        .para {
            width: 90%;
            height: auto;
            margin: auto;
            border: 3px solid #9A7200;
            overflow: hidden;
        }

        .dashed-line {
            border-bottom: 2px dashed black;
            width: 90%;
            margin: 10px 0;
        }

        .dashed-line1 {
            border-bottom: 2px dashed black;
            width: 90%;
            float: right;
            margin: 10px 0;
        }

        .text {
            width: 49%;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        ul li {
            margin-right: 21px;
            font-size: 20px;
            float: left;
        }

        .mess ul {
            list-style-type: none;
            padding: 0;
        }

        .mess ul li {
            margin-right: 21px;
            font-size: 20px;
            float: right;
        }

        .center-divider {
            border: 2px solid #9A7200;
            height: 314px!important;
            overflow: hidden;
            float: left;
        }

        .text2 {
            width: 48%;
            height: auto;
            float: right;
            font-size: 15px;
            text-align: right;
            padding-right: 10px;
        }

        .text p {
            font-size: 20px;
            width: 80%;
        }

        .text2 p {
            font-size: 26px;
        }

        .text h3 {
            font-size: 17px;
        }

        .text2 h3 {
            font-size: 20px;
            width: 60%;
        }

        .text h5 {
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .text2 h5 {
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .top p {
            font-style: italic;
        }

        .top2 p {
            font-style: italic;
        }



        .request {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .done {
            width: 49% !important;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .center-divider1 {
            border: 2px solid #9A7200;
            height: 860px!important;
            overflow: hidden;
            float: left;
        }

        .done2 {
            width: 48% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .done p {
            font-size: 19px;
            text-align: left;
        }

        .done2 p {
            font-size: 21px;
            text-align: right;
        }


        .insert {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .also {
            width: 49% !important;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .center-divider2 {
            border: 2px solid #9A7200;
            height: 291px!important;
            overflow: hidden;
            float: left;
        }

        .also2 {
            width: 48% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .also p {
            font-size: 19px;
            text-align: left;
        }

        .also2 p {
            font-size: 21px;
            text-align: right;
        }

        .payment {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .cash {
            width: 49% !important;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .center-divider3 {
            border: 2px solid #9A7200;
            height: 254px!important;
            overflow: hidden;
            float: left;
        }

        .cash2 {
            width: 48% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .cash p {
            font-size: 19px;
            text-align: left;
            margin: 0;
        }

        .cash2 p {
            font-size: 21px;
            text-align: right;
            margin: 0;
        }

        .cash h3 {
            font-size: 20px;
            padding: 0;
            margin: 0;
        }

        .cash2 h3 {
            font-size: 20px;
            padding: 0;
            margin: 0;
        }

        .minstry {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .guard {
            width: 49% !important;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .center-divider4 {
            border: 2px solid #9A7200;
            height: 278px!important;
            overflow: hidden;
            float: left;
        }

        .guard2 {
            width: 48% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .guard p {
            font-size: 19px;
            text-align: left;
            margin: 0;
        }

        .guard2 p {
            font-size: 21px;
            text-align: right;
            margin: 0;
        }

        .guard h3 {
            font-size: 18px;
            padding: 0;
            margin: 0;
        }

        .guard2 h3 {
            font-size: 23px;
            padding: 0;
            margin: 0;
        }

        .section-container {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .box {
            width: 49% !important;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .boxarabic-box {
            width: 48% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .box p {
            font-size: 19px;
            text-align: left;
            margin: 0;
            padding-bottom: 20px;
        }

        .boxarabic-box p {
            font-size: 21px;
            text-align: right;
            margin: 0;
            padding-bottom: 12px;
        }

        .checkbox-group {
            font-size: 17px;
        }

        .center-divider5 {
            border: 2px solid #9A7200;
            height: 161px;
            overflow: hidden;
            float: left;
        }

        .center-divider6 {
            border: 2px solid #9A7200;
            height: 110px;
            overflow: hidden;
            float: left;
        }

        .container {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .left {
            width: 49% !important;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .right {
            width: 48% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .center-divider7 {
            border: 2px solid #9A7200;
            height: 301px!important;
            overflow: hidden;
            float: left;
        }

        .left p {
            font-size: 19px;
            text-align: left;
            margin: 0;
        }

        .right p {
            font-size: 21px;
            text-align: right;
            margin: 0;
        }

        .left h6 {
            font-size: 15px;
            padding: 0;
            margin: 5px;
        }

        .right h6 {
            font-size: 15px;
            padding: 0;
            margin: 5px;
        }

        .left h3 {
            font-size: 20px;
            padding: 0;
            margin-bottom: 15px;
        }

        .right h3 {
            font-size: 20px;
            padding: 0;
            margin-bottom: 15px;
        }

        .left h5 {
            font-size: 20px;
            margin-top: 20px;
            margin-bottom: 0;
        }

        .right h5 {
            font-size: 20px;
            margin-top: 20px;
            margin-bottom: 0;
        }

        .end {
            width: 100%;
            direction: rtl;
            text-align: right;
        }

        .dashed-line0 {
            border-bottom: 2px dashed black;
            width: 100%;
            margin: 10px 0;
        }

        .text_text {
            width: 100%;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .request1 {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .done1 {
            height: auto;
            font-size: 15px;
            padding-left: 10px;
        }

        .insert1 {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .also1 {
            height: auto;
            font-size: 15px;
            padding-left: 10px;
        }

        .payment1 {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .cash1 {
            height: auto;
            font-size: 15px;
            padding-left: 10px;
        }

        .cash1 p {
            padding-top: 10px;
            margin: 0;
            padding-bottom: 10px;
        }

        .cash1 h3 {
            padding: 0;
            margin: 0;
        }

        .minstry1 {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .guard1 {
            height: auto;
            font-size: 15px;
            padding-left: 10px;
        }

        .section-container1 {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .box1 {
            font-size: 15px;
            padding-left: 10px;
        }

        .box1 p {
            font-size: 15px;
        }

        .box1 ul {
            list-style-type: none;
            padding: 10px;
        }

        .box1 ul li {
            margin-right: 21px;
            font-size: 15px;
            float: left;
        }

        .container1 {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .left1 {
            width: 49% !important;
            height: auto;
            float: left;
            font-size: 15px;
            padding-left: 10px;
        }

        .left1 h3 {
            font-size: 16px;
            padding: 0;
            margin-bottom: 15px;
        }

        .left1 h5 {
            font-size: 14px;
            margin-top: 20px;
            margin-bottom: 0;
        }

        .para_up {
            width: 90%;
            height: auto;
            margin: auto;
            border: 3px solid #9A7200;
            overflow: hidden;
        }

        .text_up {
            font-size: 15px;
            padding-right: 10px;
        }

        .text_up p {
            font-size: 20px;
            width: 80%;
        }

        .text_up h3 {
            font-size: 17px;
        }

        .text_up h5 {
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .dashed-line10 {
            border-bottom: 2px dashed black;
            width: 100%;
            float: right;
            margin: 10px 0;
        }

        .done_up {
            width: 100% !important;
            height: auto;
            font-size: 15px;
        }

        .done_up p {
            font-size: 17px;
            padding-right: 10px;
        }

        .insert_up {
            width: 90%;
            height: auto;
            margin: auto;
            overflow: hidden;
            border-left: 3px solid #9A7200;
            border-right: 3px solid #9A7200;
            border-bottom: 3px solid #9A7200;
        }

        .also_up {
            width: 100% !important;
            height: auto;
            font-size: 15px;
        }

        .also_up p {
            font-size: 17px;
            padding-right: 10px;
        }

        .cash_up {
            width: 100% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .cash_up {
            font-size: 19px;
            margin: 0;
        }

        .cash_up p {
            font-size: 17px;
            text-align: right;
            margin: 0;
        }

        .cash_up h3 {
            font-size: 20px;
            padding: 0;
            margin: 0;
        }

        .guard_up {
            width: 100% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .guard_up p {
            font-size: 17px;
            text-align: right;
            margin: 0;
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .guard_up h3 {
            font-size: 20px;
            padding: 0;
            margin: 0;
        }

        .boxarabic-box_up {
            width: 100% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .boxarabic-box_up p {
            font-size: 17px;
            text-align: right;
            margin: 0;
            padding-bottom: 10px;
            padding-top: 10px;
        }

        .cash_time {
            width: 100% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .cash_time p {
            font-size: 17px;
            text-align: right;
            margin: 0;
            padding: 10px;
        }





        .right_up {
            width: 48% !important;
            height: auto;
            float: right;
            font-size: 15px;
            padding-right: 10px;
        }

        .right_up p {
            font-size: 21px;
            text-align: right;
            margin: 0;
            padding-top: 5px;
            padding-bottom: 5px;
        }

        .right_up h6 {
            font-size: 15px;
            padding: 0;
            margin: 5px;
        }

        .right_up h3 {
            font-size: 20px;
            padding: 0;
            margin-bottom: 15px;
        }

        .right_up h5 {
            font-size: 20px;
            margin-top: 20px;
            margin-bottom: 0;
        }

        @media only screen and (min-width: 320px) and (max-width: 500px) {
            .hr {
                font-size: 8px !important;
                width: 100%;
            }

            .text h5 {
                font-size: 10px !important;
            }

            .text h3 {
                font-size: 11px !important;
            }

            .text p {
                font-size: 11px !important;
            }

            .text2 h5 {
                font-size: 10px !important;
            }

            .text2 h3 {
                font-size: 11px !important;
            }

            .text2 p {
                font-size: 11px !important;
            }

            .dashed-line {
                width: 85% !important;
            }

            .dashed-line1 {
                width: 85%;
            }

            .text {
                width: 48% !important;
            }

            .text2 {
                width: 43% !important;
            }

            .center-divider {
                height: 201px;

            }

            .done p {
                font-size: 11px !important;
            }

            .done2 p {
                font-size: 11px !important;
            }

            .done {
                width: 48% !important;
            }

            .done2 {
                width: 43% !important;
            }

            .center-divider1 {
                height: 698px !important;
            }

            .also p {
                font-size: 11px !important;
            }

            .also2 p {
                font-size: 11px !important;
            }

            .also {
                width: 48% !important;
            }

            .also2 {
                width: 43% !important;
            }

            .center-divider2 {
                height: 282px !important;
            }

            .cash h3 {
                font-size: 13px !important;
            }

            .cash2 h3 {
                font-size: 13px !important;
            }

            .cash p {
                font-size: 11px !important;
            }

            .cash2 p {
                font-size: 11px !important;
            }

            .cash {
                width: 48% !important;
            }

            .cash2 {
                width: 43% !important;
            }

            .center-divider3 {
                height: 201px !important;
            }

            .guard p {
                font-size: 11px !important;
            }

            .guard2 p {
                font-size: 11px !important;
            }

            .box p {
                font-size: 11px !important;
            }

            .boxarabic-box p {
                font-size: 11px !important;
            }

            .guard {
                width: 48% !important;
            }

            .guard2 {
                width: 43% !important;
            }

            .box {
                width: 48% !important;
            }

            .boxarabic-box {
                width: 43% !important;
            }

            .center-divider4 {
                height: 251px !important;
            }

            .guard h3 {
                font-size: 13px !important;
                padding-top: 5px;
            }

            .guard2 h3 {
                font-size: 13px !important;
                padding-top: 5px;
            }

            .left p {
                font-size: 11px !important;
            }

            .right p {
                font-size: 11px !important;
            }

            .left {
                width: 48% !important;
            }

            .right {
                width: 43% !important;
            }

            .left h3 {
                font-size: 13px !important;
                padding-top: 5px;
            }

            .right h3 {
                font-size: 13px !important;
                padding-top: 5px;
            }

            .left h5 {
                font-size: 13px !important;
                padding-top: 5px;
            }

            .right h5 {
                font-size: 13px !important;
                padding-top: 5px;
            }
        }

        @media only screen and (min-width: 500px) and (max-width: 1000px) {

            .hr {
                font-size: 11px !important;
                width: 100%;
            }

            .text h5 {
                font-size: 12px !important;
            }

            .text h3 {
                font-size: 14px !important;
            }

            .text p {
                font-size: 16px !important;
            }

            .text2 h5 {
                font-size: 12px !important;
            }

            .text2 h3 {
                font-size: 14px !important;
            }

            .text2 p {
                font-size: 20px !important;
            }

            .dashed-line {
                width: 85% !important;
            }

            .dashed-line1 {
                width: 85%;
            }

            .text {
                width: 48% !important;
            }

            .text2 {
                width: 43% !important;
            }

            .center-divider {
                height: 234px;

            }

            .done p {
                font-size: 14px !important;
            }

            .done2 p {
                font-size: 14px !important;
            }

            .done {
                width: 48% !important;
            }

            .done2 {
                width: 43% !important;
            }

            .center-divider1 {
                height: 709px !important;
            }

            .also p {
                font-size: 14px !important;
            }

            .also2 p {
                font-size: 14px !important;
            }

            .also {
                width: 48% !important;
            }

            .also2 {
                width: 43% !important;
            }

            .center-divider2 {
                height: 242px !important;
            }

            .cash h3 {
                font-size: 15px !important;
            }

            .cash2 h3 {
                font-size: 15px !important;
            }

            .cash p {
                font-size: 14px !important;
            }

            .cash2 p {
                font-size: 14px !important;
            }

            .cash {
                width: 48% !important;
            }

            .cash2 {
                width: 43% !important;
            }

            .center-divider3 {
                height: 217px !important;
            }

            .guard p {
                font-size: 14px !important;
            }

            .guard2 p {
                font-size: 14px !important;
            }

            .box p {
                font-size: 14px !important;
            }

            .boxarabic-box p {
                font-size: 14px !important;
            }

            .guard {
                width: 48% !important;
            }

            .guard2 {
                width: 43% !important;
            }

            .box {
                width: 48% !important;
            }

            .boxarabic-box {
                width: 43% !important;
            }

            .center-divider4 {
                height: 240px !important;
            }

            .guard h3 {
                font-size: 13px !important;
                padding-top: 5px;
            }

            .guard2 h3 {
                font-size: 13px !important;
                padding-top: 5px;
            }

            .left p {
                font-size: 14px !important;
            }

            .right p {
                font-size: 14px !important;
            }

            .left {
                width: 48% !important;
            }

            .right {
                width: 43% !important;
            }

            .left h3 {
                font-size: 15px !important;
                padding-top: 5px;
            }

            .right h3 {
                font-size: 15px !important;
                padding-top: 5px;
            }

            .left h5 {
                font-size: 15px !important;
                padding-top: 5px;
            }

            .right h5 {
                font-size: 15px !important;
                padding-top: 5px;
            }
        }

        @media only screen and (min-width: 1000px) and (max-width: 1200px) {
            .center-divider {
                height: 244px !important;

            }
            .center-divider1 {
                height: 611px !important;

            }
        }
    </style>
      ${htmlContent}
    `;
  }

  backClicked(): void {
    this._location.back();
  }
}
