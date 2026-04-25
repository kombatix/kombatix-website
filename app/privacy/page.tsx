import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

// Privacy Policy — content extracted verbatim from the live kombatix.io
// WordPress site (Privacy Policy page) on 2026-04-25.
// Email placeholders ([email protected]) replaced with operations@kombatix.io.
// Effective date carried forward as-is until legal updates it.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kombatix, LLC handles personal information you provide when you use the Kombatix Services.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Privacy Policy", url: "/privacy" },
          ]),
        )}
      />
      <LegalPage title="Privacy Policy" lastUpdated="March 1, 2025">
        <p>Kombatix, LLC (&quot;Kombatix,&quot; &quot;we,&quot; or &quot;us&quot;) respects your privacy. This Privacy Policy describes how we collect, use, and disclose personal information about you when you access the Kombatix Services.</p>

        <h2>1. Acceptance of Privacy Policy</h2>
        <p>By accessing <a href="https://kombatix.io/">https://kombatix.io/</a> and related services, you agree to this Privacy Policy. The company processes personal information consistent with requirements including CCPA, CPRA, Virginia Consumer Data Protection Act, Colorado Privacy Act, Utah Consumer Privacy Act, Connecticut Personal Data Privacy Act, GDPR, UK GDPR, and PIPEDA.</p>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Personal Information Collected Directly</h3>
        <p>Kombatix receives information provided by users, including:</p>
        <ul>
          <li>Individual information (email, phone number)</li>
          <li>Company information (address)</li>
          <li>Unique identifiers and passwords</li>
          <li>Personal information in user messages</li>
        </ul>

        <h3>2.2 Information Automatically Collected</h3>
        <p>Through tracking technologies, the company collects &quot;Traffic Data&quot; including:</p>
        <ul>
          <li>Domain names and search engines used</li>
          <li>IP addresses</li>
          <li>Time spent on services</li>
          <li>Pages viewed</li>
          <li>Device type and browser</li>
          <li>Visit frequency</li>
        </ul>

        <h2>3. How We Collect Information</h2>
        <p>Data collection occurs through:</p>
        <ul>
          <li>User access and contact with Kombatix Services</li>
          <li>Voluntary information provision</li>
          <li>Location-enabled browser information</li>
          <li>Cookies, Web Beacons, analytics services, and tracking technologies</li>
        </ul>

        <h2>4. Kombatix as a Service Provider</h2>
        <p>
          Kombatix, LLC provides <strong>data validation and fraud prevention services</strong> to users of the Kombatix Services. <strong>Kombatix is a service provider and does not operate as a data broker.</strong>
        </p>

        <h3>What This Means:</h3>

        <ol>
          <li>
            <strong>No Buying, Selling, or Trading of Personal Data.</strong> Kombatix does not buy, sell, lease, rent, or trade personal data for marketing or commercial resale purposes.
          </li>
          <li>
            <strong>Processing for Validation Purposes Only.</strong> Kombatix processes <strong>only the data that users submit</strong> to provide validation and fraud prevention services.
          </li>
          <li>
            <strong>No Persistent Consumer Databases.</strong> Kombatix does not maintain a <strong>database of consumer information for resale</strong> or third-party access.
          </li>
          <li>
            <strong>Limited Data Sharing with Service Partners.</strong> Kombatix <strong>only</strong> shares necessary user data with <strong>third-party service providers</strong> for fraud detection and identity verification to fulfill requests.
          </li>
          <li>
            <strong>Not a Consumer Reporting Agency.</strong> Kombatix does not furnish credit reports, background checks, or consumer scores and does not fall under the Fair Credit Reporting Act.
          </li>
        </ol>

        <h2>5. Tracking Tools, Behavioral Advertising, and Opt-Out Options</h2>

        <h3>5.1 Tracking Tools</h3>
        <p>
          <strong>Cookies:</strong> Small computer files transferred to devices containing user preferences and activity information. Used for improving services, customizing advertisements, measuring performance, storing authentication, and analytics.
        </p>
        <p>Types of cookies include:</p>
        <ul>
          <li><strong>Absolutely Necessary Cookies:</strong> Essential for website functionality</li>
          <li><strong>Performance Cookies:</strong> Collect aggregated usage information without personal identification</li>
          <li><strong>Functionality Cookies:</strong> Remember user choices and preferences</li>
        </ul>
        <p>
          <strong>Web Beacons:</strong> Tiny graphic files embedded in web pages or emails to collect usage information.
        </p>
        <p>
          <strong>Web Service Analytics:</strong> Third-party services register clicks, movements, scrolling, and text input to improve services.
        </p>
        <p>
          <strong>Mobile Device Identifiers:</strong> Track activities on devices and installed applications, enabling collection of MAC addresses, location, and Traffic Data.
        </p>

        <h3>5.2 Behavioral Advertising</h3>
        <p>Partners use tracking tools to collect information about online activities and display targeted Kombatix advertisements based on user interests. Partners may collect IP addresses, mobile device IDs, operating systems, and demographic information.</p>

        <h3>5.3 Options for Opting Out</h3>
        <p>
          Users may withdraw consent by contacting <a href="mailto:operations@kombatix.io">operations@kombatix.io</a>. Browser and device settings allow rejection of cookies and mobile identifiers, though this may limit service access.
        </p>
        <p>Opt-out options include:</p>
        <ul>
          <li>Network Advertising Initiative (NAI) opt-out page</li>
          <li>Digital Advertising Alliance (DAA) opt-out page</li>
          <li>DAA&apos;s AppChoice app for mobile devices</li>
        </ul>
        <p>Even after opting out of Behavioral Advertising, you may still see Kombatix advertisements that are not interest-based.</p>

        <h3>5.4 &quot;Do Not Track&quot; (DNT) and Universal Opt-Out Preference Signals</h3>
        <p>Kombatix does not proactively respond to DNT signals due to lack of industry consensus. However, the company will honor Global Privacy Control (GPC) signals and similar opt-out preference mechanisms as required by CPRA.</p>

        <h2>6. How We Use Your Information</h2>
        <p>We do not engage in automated decision making. Information is used to:</p>
        <ul>
          <li>Provide requested products and services</li>
          <li>Correspond with users</li>
          <li>Maintain and expand services and perform business analyses</li>
          <li>Combine third-party information with user data</li>
          <li>Display interest-based advertising</li>
          <li>Detect security incidents, fraud, and illegal activities</li>
          <li>Enforce the Privacy Policy</li>
        </ul>
        <p>Users consenting to email/phone contact may receive live, prerecorded, and automated messages. Standard message rates apply.</p>

        <h2>7. How We Share Your Information</h2>
        <ul>
          <li>The company does not sell personal information</li>
          <li>Personal information may be shared with partners for advertising customization</li>
          <li>Information shared with operational service partners (hosting, billing, fulfillment, security)</li>
          <li>Data shared for device activity analysis and targeted advertising</li>
          <li>Personal information may transfer in case of merger or acquisition</li>
          <li>Disclosure occurs when required by law, to protect rights/safety, or enforce agreements</li>
        </ul>

        <h2>8. Collection and Use of Sensitive Information</h2>
        <p>In the last twelve months, Kombatix collected:</p>
        <ul>
          <li>Government identifiers</li>
          <li>Complete account credentials</li>
          <li>Racial or ethnic origin</li>
          <li>Religious or philosophical beliefs</li>
          <li>Union membership</li>
          <li>Genetic data</li>
          <li>Mail, email, or text message contents</li>
          <li>Unique biometric information</li>
          <li>Health, sex life, or sexual orientation information</li>
          <li>Citizenship and immigration status</li>
        </ul>
        <p>We do not use or disclose sensitive personal information for purposes other than those specified in the CCPA/CPRA.</p>

        <h2>9. Storage and Security of Information</h2>
        <p>Any information you send to us electronically, while using the Kombatix Services or otherwise interacting with us, may not be secure when it is transmitted to us. The company recommends not using unsecure channels for sensitive information. Despite best efforts, no security measures are perfect or impenetrable.</p>

        <h2>10. Your Choices</h2>

        <h3>10.1 Information You Provide</h3>
        <p>Users may choose whether to provide personal information. The company will not discriminate by denying goods/services, providing different service levels, or charging different prices.</p>

        <h3>10.2 California Privacy Rights</h3>
        <p>In the preceding 12 months, Kombatix collected and disclosed for business purposes the following categories:</p>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Examples</th>
              <th>Collected?</th>
              <th>Categories of Recipients</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identifiers</td>
              <td>Name, address, email, IP address</td>
              <td>Yes</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Personal information (CA Customer Records)</td>
              <td>Name, professional/employment information</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Protected classification characteristics</td>
              <td>Age, citizenship, religion, marital status, sex, sexual orientation</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Commercial information</td>
              <td>Records of products/services purchased</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Internet activity</td>
              <td>Browsing/search history, service interactions</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Geolocation data</td>
              <td>Location and movement data</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Professional/employment information</td>
              <td>Proof of work eligibility, resume</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Biometric information</td>
              <td>Fingerprints, faceprints, voiceprints, iris scans</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Non-Public Education Information</td>
              <td>Grades, transcripts, class lists</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
            <tr>
              <td>Inferences</td>
              <td>Preferences, characteristics, predispositions</td>
              <td>No</td>
              <td>Organizations providing services to Kombatix</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Purposes for Collection, Use, and Sharing:</strong></p>
        <ul>
          <li>Legal compliance and auditing</li>
          <li>Detecting security incidents and protecting against fraud</li>
          <li>Performing and improving services</li>
          <li>Internal operations</li>
          <li>Other one-time or short-term uses</li>
        </ul>

        <p><strong>California Consumer Rights:</strong></p>
        <ul>
          <li><strong>Right to Know/Access:</strong> Request information about collection and use, specific pieces collected, categories, sources, purposes, and third-party recipients</li>
          <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
          <li><strong>Freedom from Discrimination:</strong> Protection from unlawful discrimination for exercising privacy rights</li>
          <li><strong>Right to Correct:</strong> Request correction of inaccurate information</li>
          <li><strong>Right to Restrict Sensitive Information Use:</strong> Restrict use of sensitive personal information</li>
          <li><strong>Right to Access Automated Decision-Making Information:</strong> Access information from automated processes and opt out</li>
        </ul>
        <p>To make requests, contact the company at the information in Section 14. Identity verification required.</p>

        <h3>10.3 Canada, European Union and United Kingdom Privacy Rights</h3>
        <p>Under GDPR, UK GDPR, and PIPEDA, users may have rights to:</p>
        <ul>
          <li>Request copies of personal information held</li>
          <li>Request correction of inaccurate information</li>
          <li>Request erasure when no longer necessary</li>
          <li>Withdraw consent to processing</li>
          <li>Request restrictions on processing when disputes exist</li>
          <li>Object to processing</li>
          <li>Lodge complaints with data supervisory authorities</li>
        </ul>
        <p>For EEA residents, personal information is processed only when:</p>
        <ul>
          <li>Necessary to perform contractual responsibilities</li>
          <li>Legitimate interest exists (marketing, communications, service provision)</li>
          <li>User consent is obtained</li>
        </ul>
        <p>If your personal data is subject to GDPR or UK GDPR, we will transfer personal data from the EEA to a location outside the EEA only when there has been a documented adequacy determination, or where we have confirmed adequate privacy protections.</p>

        <h2>11. How Long We Retain Your Information</h2>
        <p>Personal information is retained as long as necessary to provide services. In some cases, longer retention occurs for legal compliance. Afterwards, information may be retained in de-identified or aggregated form.</p>

        <h2>12. Information Provided on Behalf of Children and Others</h2>
        <p>The Kombatix Services are not intended for use by children. Individuals under the age of 18 may not use the Kombatix Services. The company does not knowingly collect information from children. Users represent they are at least 18 and have authority to use services. Parents/guardians may use services on behalf of minor children with authority.</p>

        <h2>13. Third Party Web Services</h2>
        <p>Links to third-party websites do not constitute endorsement. Visitors are subject to third-party privacy policies. Kombatix is not responsible for third-party policies or practices.</p>

        <h2>14. Updates and Changes to Privacy Policy</h2>
        <p>Last updated March 1, 2025. Material changes are posted on the webpage. Continued use after amendments constitutes acceptance. Users must stop using services if they disagree with future changes.</p>

        <h2>15. Contact Us</h2>
        <p><strong>Data controller:</strong> Kombatix, LLC</p>
        <p><strong>Email:</strong> <a href="mailto:operations@kombatix.io">operations@kombatix.io</a></p>
        <p>
          <strong>Address:</strong>
          <br />
          Kombatix, LLC
          <br />
          Attn: Privacy
          <br />
          2976 E State St, STE 120-2914
          <br />
          Eagle, ID 83616
        </p>
        <p><strong>Phone:</strong> (208) 944-1422</p>
      </LegalPage>
    </>
  );
}
