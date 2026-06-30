import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ContentService } from '../shared/services/content.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyHtml: SafeHtml | null = null;
  isLoading = false;

  private readonly fallbackPrivacyHtml = `
    <h1>Privacy Policy</h1>

    <p>Effective Date: 22 June 2026</p>

    <p>
      Your privacy is important to us. Please read this privacy policy ("Policy") carefully to understand how we
      collect, use, retain, and protect your personal information when you use our platform, ANFAS / AMC ANFAS.
    </p>

    <section>
      <h2>1. Introduction</h2>
      <p>
        ANFAS / AMC ANFAS values your privacy and is committed to protecting the personal information you share
        with us. This Policy explains how we collect, use, store, retain, share, and protect your information when
        you access or use our website, mobile applications, and services (collectively, the "Service").
      </p>
    </section>

    <section>
      <h2>2. Information We Collect</h2>
      <p>
        We may collect account details, contact information, appointment information, medical records shared through
        the portal, device information, and other information required to provide healthcare services.
      </p>
    </section>

    <section>
      <h2>3. How We Use Information</h2>
      <p>
        We use information to provide patient services, manage appointments, display medical reports, support care
        coordination, improve the platform, send service notifications, and comply with legal or regulatory duties.
      </p>
    </section>

    <section>
      <h2>4. Sharing Of Information</h2>
      <p>
        We share information only with authorized healthcare providers, service providers who support the platform,
        and authorities when required by law. We do not sell patient personal information.
      </p>
    </section>

    <section>
      <h2>5. Data Security</h2>
      <p>
        We apply reasonable technical and organizational safeguards to protect personal and health information from
        unauthorized access, loss, misuse, or disclosure.
      </p>
    </section>

    <section>
      <h2>6. Your Choices</h2>
      <p>
        You may contact us to request support with accessing, updating, or correcting your information, subject to
        applicable healthcare and legal requirements.
      </p>
    </section>

    <section>
      <h2>7. Contact Us</h2>
      <p>
        For privacy questions, please contact us at <a href="mailto:support@anfashis.com">support@anfashis.com</a>.
      </p>
    </section>
  `;

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Privacy Policy | ANFAS');
    this.setPrivacyHtml(this.fallbackPrivacyHtml);
    this.loadPrivacyPolicy();
  }

  private loadPrivacyPolicy(): void {
    this.contentService.privacyPolicy().subscribe({
      next: (response: string) => {
        this.setPrivacyHtml(response || this.fallbackPrivacyHtml);
      },
      error: () => {
        this.setPrivacyHtml(this.fallbackPrivacyHtml);
      }
    });
  }

  private setPrivacyHtml(html: string): void {
    this.privacyHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
