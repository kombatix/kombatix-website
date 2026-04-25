import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

// Terms of Service — content extracted verbatim from the live kombatix.io
// WordPress site (Terms page) on 2026-04-25.
// "[contact information redacted]" placeholders replaced with operations@kombatix.io.
// Effective date carried forward as-is until legal updates it.

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "These Website Terms of Use govern your access to websites and related services operated by or on behalf of Kombatix, LLC.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Terms of Service", url: "/terms" },
          ]),
        )}
      />
      <LegalPage title="Terms of Service" lastUpdated="March 1, 2025">
        <h2>1. Acceptance of Terms</h2>
        <p>These Website Terms of Use (these &quot;<strong>Terms</strong>&quot;) govern your access to websites and related services operated by or on behalf of Kombatix, LLC (&quot;Kombatix&quot; &quot;<strong>we</strong>&quot; or &quot;<strong>us</strong>&quot;). These Terms are important and affect your legal rights, so please read them carefully. Note that Section 14 of these Terms contains a mandatory arbitration provision that requires the use of arbitration on an individual basis and limits the remedies available to you in the event of certain disputes.</p>

        <p>By accessing or using <a href="https://kombatix.io/">https://kombatix.io/</a> and our various related websites and services (collectively, the &quot;<strong>Kombatix Services</strong>&quot;), you agree to be bound by these Terms and all of the terms incorporated herein by reference.</p>

        <p>You must be 18 years of age or older and reside in the United States or any of its territories to use the Kombatix Services. By accepting these Terms, you represent that you have the legal authority to do so, and that, if you have accepted these Terms on behalf of any person or entity, you represent that you have legal authority to do so and that such person or entity agrees to be responsible to us if you or such person or entity violates these Terms. If you do not agree to every provision of these Terms, you may not, and we do not authorize you to, access or use the Kombatix Services or any features provided therein.</p>

        <p>By accessing or using the Kombatix Services, you represent and warrant that you have not been previously suspended or removed from the Kombatix Services or engaged in any activity that could result in suspension or removal from the Kombatix Services.</p>

        <p>You should not construe Kombatix&apos;s publication of any content found on the Kombatix Services as an endorsement by Kombatix of the views expressed therein, or any warranty or guarantee of any strategy, recommendation, treatment, action, or application of medication or preparation made by the author of such content.</p>

        <p>We may revise these Terms at any time for any reason and may provide you notice of these changes by any reasonable means, including through the Kombatix Services. You can determine when we last updated these Terms by referring to the &quot;Last Updated&quot; legend at the top of these Terms. Except to the extent that your express consent to any revised Terms is required under applicable law, by continuing to access, browse or use the Kombatix Services, you agree to any revised Terms. If you do not agree to any revised Terms, you may not and we do not authorize you to use the Kombatix Services. We strongly recommend that you periodically visit this page to review these Terms.</p>

        <h2>2. User Registration</h2>
        <p>In order to access and use certain areas or features of the Kombatix Services, you may need to provide certain information and/or answer certain questions. Each registration is for a single user only.</p>

        <p>You agree to (a) provide accurate, current and complete information, (b) maintain and promptly update, as necessary, your information, (c) be responsible for the acts or omissions of any third party who has authority to access or use the Kombatix Services on your behalf, and (d) immediately notify us if you discover or otherwise suspect any security breaches related to the Kombatix Services. If you provide information that is untrue, inaccurate, not current or incomplete, we may suspend and/or terminate your current or future use of the Kombatix Services.</p>

        <p>By providing information and/or answering questions, you also consent to receive electronic communications from Kombatix (e.g., via email or by posting notices to the Kombatix Services). You should maintain copies of electronic communications from us by printing a paper copy or saving an electronic copy.</p>

        <p>We may also send you promotional communications via email, including, but not limited to, newsletters, special offers, surveys and other news and information we think will be of interest to you. You may opt out of receiving these promotional emails at any time by following the unsubscribe instructions provided therein.</p>

        <p><strong>Kombatix Memberships.</strong> Kombatix offers numerous memberships, which allow you to conduct various types of searches for a monthly or annual fee, or a discounted per report fee.</p>

        <h3>Membership Subscriptions; Charges on Your Billing Account; Refund Policy</h3>

        <p><strong>One Time Service Fees.</strong> Kombatix Services are available for a one-time license fee. If you are not satisfied with your purchase, please contact us within 30 (thirty) days from the original date of purchase to discuss your concerns. If we cannot solve your concerns, we may provide you with another search, at no additional cost to you. We will not refund your purchase.</p>

        <p><strong>Membership Service Fees.</strong> If you sign up for our monthly membership or other subscription term you select (&quot;Membership Service&quot;) Kombatix bills you for your online account using the billing information you provide (your &quot;Billing Account&quot;) for use of the Membership Service which enables you to conduct searches during your term of membership you select. A one month term is agreed by you to be a 30-day period. You agree to pay Kombatix all charges at the prices then in effect for your use of the Membership Service using your Billing Account, and any applicable taxes, and you authorize Kombatix to charge your chosen payment provider (your &quot;Payment Method&quot;) for the Membership Service. You agree to make payment using that selected Payment Method. The terms of your payment will be based on your Payment Method and may be determined by agreements between you and the financial institution, credit card issuer or other provider of your chosen Payment Method (the &quot;Payment Method Provider&quot;). If Kombatix does not receive payment from your Payment Method Provider, you agree to pay all amounts due on your Billing Account upon demand. In the event we are advised of insufficient funds in your account or credit to cover your payment by credit card, we may re-present such uncleared or rejected payment to your Payment Method Provider. Kombatix reserves the right to correct any errors or mistakes that it makes even if it has already requested or received payment and to update your information from available third party sources. You can cancel your membership at any point during your current subscription term to avoid subsequent fees being billed by using our contact form located at <a href="https://kombatix.io/contact">https://kombatix.io/contact</a>. Because of the user access granted to you during the period of membership, all monthly charges are NON-REFUNDABLE regardless of the amount of time left on your monthly term. If you cancel a longer subscription term membership you may receive a pro-rata refund based upon any full months left on your term. Pro-rata months are not refunded. All prices are in US Dollars and do not include Internet service provider, telephone, and other connection charges.</p>

        <p><strong>Cancellation.</strong> You may cancel your membership at any time by contacting our Customer Care Department at (208) 944-1422 or by emailing us at <a href="mailto:operations@kombatix.io">operations@kombatix.io</a>. When you cancel automatic renewal on a monthly membership (or a longer term subscription), your membership will continue through the rest of the current month. At the end of that period, your membership will not renew automatically, and you will lose the benefits of membership.</p>

        <h2>3. Right to Access and Use the Kombatix Services and Content</h2>
        <p>Unless otherwise indicated in writing by us, the Kombatix Services and all content and other materials contained therein, including, without limitation, any Kombatix service mark or logo and all designs, text, graphics, pictures, information, data, software, other files and the selection and arrangement thereof (collectively, &quot;<strong>Content</strong>&quot;) are the property of Kombatix or our licensors or users, as applicable, and are protected by U.S. and international copyright and other laws.</p>

        <p>Subject to these Terms, you are hereby granted a limited personal, revocable, non-exclusive, non-transferable, non-sublicensable right to access, view and make personal, non-commercial use of the Kombatix Services and Content. All rights not expressly granted herein are reserved. You do not acquire any ownership interest in the Kombatix Services or Content under these Terms, or any other rights thereto other than to use the Kombatix Services in accordance with the rights granted by, and subject to all terms, conditions and restrictions of these Terms.</p>

        <p>You do not have any right to, and you shall not, directly or indirectly: (a) sell, resell or use commercially the Kombatix Services or Content, (b) distribute, publicly perform or publicly display the Kombatix Services or any Content, (c) modify or otherwise make any derivative uses of the Kombatix Services or Content, or any portion thereof, (d) use any data mining, robots or similar data gathering or extraction methods, (e) download (other than page caching) any portion of the Kombatix Services or Content, except as expressly permitted by us, (f) use the Kombatix Services to stalk, threaten, or otherwise violate the rights of others, including without limitation others&apos; privacy rights or rights of publicity; (g) interfere with the Kombatix Services or servers or networks used in connection with the Kombatix Services; or (h) use the Kombatix Services or Content other than for their intended purposes.</p>

        <p>Any use of the Kombatix Services or Content other than as specifically authorized herein, without our prior written permission, is strictly prohibited and will terminate the right of access and use granted herein. Such unauthorized use may also violate applicable laws, including, without limitation, copyright and trademark laws and applicable communications regulations and statutes. Except as expressly permitted herein, nothing in these Terms shall be construed as conferring any right or license to any patent, trademark, copyright or other proprietary rights of Kombatix or any third party, whether by estoppel, implication or otherwise.</p>

        <p>You will not remove, alter or conceal any copyright, trademark, service mark or other proprietary rights notices incorporated in or accompanying any Content and you will not reproduce, modify, adapt, prepare derivative works based on, perform, display, publish, distribute, transmit, broadcast, sell, license or otherwise exploit any Content.</p>

        <p>We reserve the right in our sole discretion to modify, suspend or discontinue, temporarily or permanently, the Kombatix Services (or any features or parts thereof) at any time.</p>

        <p>KOMBATIX IS NOT A CREDIT REPORTING AGENCY FOR PURPOSES OF THE FAIR CREDIT REPORTING ACT (&quot;FCRA&quot;). AS SUCH, THE ADDITIONAL PROTECTIONS AFFORDED TO CONSUMERS, AND OBLIGATIONS PLACED UPON CREDIT REPORTING AGENCIES, ARE NOT CONTEMPLATED BY, NOR CONTAINED WITHIN, THESE TERMS AND CONDITIONS.</p>

        <p><strong>Restrictions on your Use of our Services.</strong> You may not use any information obtained from our searches, including, without limitation, the Kombatix defense scores, in connection with determining a prospective candidate&apos;s suitability for:</p>
        <ul>
          <li>Health insurance or any other insurance</li>
          <li>Credit and/or loans</li>
          <li>Employment</li>
          <li>Education, scholarships or fellowships</li>
          <li>Housing or other accommodations</li>
          <li>Benefits, privileges or services provided by any business establishment</li>
        </ul>

        <h2>4. Kombatix as a Service Provider</h2>
        <p>Kombatix, LLC provides <strong>data validation and fraud prevention services</strong> to its users. <strong>Kombatix is a service provider and does not operate as a data broker.</strong></p>

        <p>Users acknowledge and agree that:</p>
        <ul>
          <li>Kombatix <strong>does not buy, sell, rent, or trade consumer data</strong> for any purpose.</li>
          <li>Kombatix processes <strong>user-submitted information solely to provide validation and enrichment services</strong> and does not maintain a database of consumer records for resale or external marketing.</li>
          <li>Kombatix does not disclose, distribute, or share user-submitted data with third parties, except as necessary to facilitate the requested services or as required by applicable law.</li>
          <li>Any data submitted through the Kombatix Services is processed in real-time and is <strong>not retained beyond what is necessary for service fulfillment, fraud prevention, compliance, or record-keeping obligations.</strong></li>
        </ul>

        <p>Users further acknowledge that Kombatix operates strictly as a <strong>data validation service provider</strong> and does not function as a <strong>consumer reporting agency</strong> under the Fair Credit Reporting Act (FCRA) or any similar laws. Accordingly, Kombatix <strong>does not provide consumer reports, credit decisions, or background screening services for employment, housing, or other eligibility determinations.</strong></p>

        <p>By using the Kombatix Services, users expressly agree and acknowledge that their data is processed <strong>for validation and fraud prevention purposes only</strong> and not for storage, resale, or any form of data brokering.</p>

        <h2>5. Trademarks</h2>
        <p>The Kombatix logo, and any other Kombatix product or service names, trademarks, logos, or other indicia that may appear on the Kombatix Services (&quot;<strong>Marks</strong>&quot;) are the property of Kombatix or its subsidiaries, affiliates or third parties, and may not be copied, imitated or used, in whole or in part, without our prior written permission. Nothing contained in these Terms and/or the Kombatix Services shall be construed as granting, by implication or otherwise, any license or right to use any such Marks without the prior written permission of Kombatix or such third party that may own such Marks.</p>

        <h2>6. Legal Requirements; Privacy Policy</h2>
        <p>Our Privacy Policy describes how we handle the personal information you provide to us when you use the Kombatix Services. For an explanation of our privacy practices, please visit our <a href="/privacy">Privacy Policy</a>.</p>

        <h2>7. User Content</h2>
        <p>You are solely responsible and liable for all data, information and other materials (&quot;<strong>User Content</strong>&quot;) that you submit, upload, post, e-mail or otherwise transmit (&quot;<strong>Transmit</strong>&quot;) in connection with the Kombatix Services. In addition, we have no control over, and shall have no liability for, any damages resulting from the use (including without limitation, republication) or misuse by any third party of information made public through the Kombatix Services. IF YOU CHOOSE TO SUBMIT TO US, OR OTHERWISE MAKE ANY USER CONTENT PUBLICLY AVAILABLE, YOU DO SO AT YOUR OWN RISK AND WE SHALL HAVE NO LIABILITY THEREFOR.</p>

        <p>You agree that you will not, and will not permit anyone else to, directly or indirectly: (a) Transmit any User Content that is unlawful, harmful, threatening, abusive, hateful, obscene, harassing, tortious, defamatory, libelous, slanderous, pornographic, profane, vulgar, offensive, lewd, invasive of another&apos;s privacy or racially, ethnically or otherwise objectionable; (b) Transmit any User Content: (i) that you do not have the right to Transmit, under any law or contractual or fiduciary relationships, including, without limitation, any inside information or proprietary or confidential information; (ii) that infringes any patent, copyright, trademark or other intellectual property right or misappropriates any trade secret or right of privacy of any third-party; (iii) that constitutes unsolicited or unauthorized advertising or promotional materials, &quot;spam,&quot; &quot;chain letters,&quot; or pyramid schemes; or (iv) that contains any software routine, code, instruction or virus that is designed to disable, delete, modify, damage or erase software, hardware or data; or (c) forge headers or otherwise manipulate identifiers in order to disguise any User Content Transmitted through the Kombatix Services.</p>

        <p>Although we have no obligation to screen, edit or monitor User Content, we reserve the right, and have absolute discretion, to remove, screen or edit User Content posted or stored on the Kombatix Services at any time and for any reason, and you are solely responsible for creating backup copies of and replacing any User Content you post or store on the Kombatix Services at your sole cost and expense.</p>

        <h2>8. Rights in User Content</h2>
        <p>We do not claim any ownership interest in User Content. However, by uploading, posting or submitting User Content to the Kombatix Services or to our pages or feeds on third-party social media platforms (e.g., Kombatix&apos;s Facebook page, LinkedIn page or X formerly Twitter feed), you hereby grant Kombatix a nonexclusive, royalty-free, worldwide, perpetual, irrevocable and fully sublicensable right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform and publicly display your User Content, in whole or in part, in any manner or media and for any purpose whatsoever at our sole discretion, including, without limitation, for publicity, promotional, advertising, trade, business, illustration, artistic and other commercial and noncommercial purposes. However, Kombatix will only share personal information that you provide in accordance with our Privacy Policy.</p>

        <p>You agree that Kombatix may disclose or use any User Content for any purposes permitted under applicable law, including, but not limited to: (a) enforcing these Terms; (b) complying with any laws, regulations or rules of any federal, state or local government or agency; (c) responding to claims that any User Content violates the rights of third parties; or (d) protecting the rights or property of Kombatix, its customers or the public.</p>

        <h2>9. Feedback</h2>
        <p>Separate and apart from User Content, you can submit questions, comments, suggestions, ideas, original or creative materials or other information about Kombatix, or the Kombatix Services (collectively, &quot;<strong>Feedback</strong>&quot;). Feedback shall become the sole property of Kombatix. Kombatix shall own exclusive rights, including, without limitation, all intellectual property rights, in and to Feedback and shall be entitled to the unrestricted use and dissemination of Feedback for any purpose, commercial or otherwise, without acknowledgment or compensation to you.</p>

        <h2>10. Third-Party Sites</h2>
        <p>We have not reviewed all of the websites linked to the Kombatix Services and are not responsible for the content of any third-party pages, any other websites linked to the Kombatix Services, or any products or services offered by third parties. Nothing in the Kombatix Services, including, without limitation, any links to other websites, should be construed as an endorsement by Kombatix of any products, services or information of any other persons or companies. Your choice to access a link to any other website is at your own risk, and you agree to comply with all terms and conditions relating to such websites. Kombatix reserves the right not to link, or to remove the link, to a particular website at any time.</p>

        <p>Any links to third-party websites are provided as a convenience to you and are neither owned nor operated by Kombatix. We have no control over these linked websites and make no representations or warranties with respect to these linked websites or third-party products or services. Your viewing and use of any third-party websites is at your sole discretion and risk.</p>

        <h2>11. Indemnification</h2>
        <p>You shall indemnify, hold harmless, and, at Kombatix&apos;s option, defend Kombatix and its affiliates and subsidiaries from and against any and all losses, damages, liabilities, costs (including reasonable attorneys&apos; fees) (&quot;Losses&quot;) incurred by Kombatix resulting from any third-party claim, suit, action or proceeding relating to or arising from your use of the Kombatix Services, any User Content, any Feedback you provide, any violation of these Terms by you, or any other act or omission by you, including your violation of any rights of another, arising from your use of the Kombatix Services or any of its features. You further agree that Kombatix shall have control of the defense or settlement of any third-party claims unless Kombatix exercises its option to require you to defend Kombatix. This indemnity is in addition to, and not in lieu of, any other indemnities set forth in a written agreement between you and Kombatix.</p>

        <h2>12. General Disclaimers</h2>
        <p>THE KOMBATIX SERVICES AND THE CONTENT ARE PROVIDED ON AN &quot;AS IS&quot;, &quot;AS AVAILABLE&quot; AND &quot;WITH ALL FAULTS&quot; BASIS. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, KOMBATIX DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES OR ENDORSEMENTS OF ANY KIND WHATSOEVER, EXPRESS OR IMPLIED, AS TO: (A) THE KOMBATIX SERVICES; (B) CONTENT; (C) USER CONTENT; OR (D) SECURITY ASSOCIATED WITH THE TRANSMISSION OF INFORMATION TO OR FROM THE KOMBATIX SERVICES. KOMBATIX HEREBY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, THAT ANY RESULTS WILL BE ACHIEVED, NON-INFRINGEMENT, TITLE, CUSTOM, TRADE, QUIET ENJOYMENT, SYSTEM INTEGRATION AND FREEDOM FROM COMPUTER VIRUS.</p>

        <p>KOMBATIX DOES NOT REPRESENT OR WARRANT THAT THE KOMBATIX SERVICES WILL BE ERROR-FREE OR UNINTERRUPTED; THAT DEFECTS WILL BE CORRECTED; OR THAT THE KOMBATIX SERVICES OR THE SERVERS THAT MAKE THE KOMBATIX SERVICES AVAILABLE ARE FREE FROM ANY HARMFUL COMPONENTS, INCLUDING, WITHOUT LIMITATION, VIRUSES. KOMBATIX DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES THAT THE INFORMATION (INCLUDING ANY INSTRUCTIONS) ON THE KOMBATIX SERVICES IS ACCURATE, COMPLETE, OR USEFUL. YOU ACKNOWLEDGE THAT YOUR USE OF THE KOMBATIX SERVICES IS AT YOUR SOLE RISK. KOMBATIX DOES NOT WARRANT THAT YOUR USE OF THE KOMBATIX SERVICES IS LAWFUL IN ANY PARTICULAR JURISDICTION. KOMBATIX SPECIFICALLY DISCLAIMS ALL SUCH WARRANTIES. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU TO THE EXTENT SUCH JURISDICTION&apos;S LAW IS APPLICABLE TO YOU AND THESE TERMS.</p>

        <p>BY ACCESSING OR USING THE KOMBATIX SERVICES YOU REPRESENT AND WARRANT THAT YOUR ACTIVITIES ARE LAWFUL IN EVERY JURISDICTION WHERE YOU ACCESS OR USE THE KOMBATIX SERVICES.</p>

        <h2>13. Limitation of Liability; Waiver</h2>
        <p>TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL KOMBATIX BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND (INCLUDING, BUT NOT LIMITED TO, LOSS OF REVENUE, INCOME OR PROFITS, LOSS OF USE OR DATA, LOSS OR DIMINUTION IN VALUE OF ASSETS OR SECURITIES, OR DAMAGES FOR BUSINESS INTERRUPTION) ARISING OUT OF OR IN ANY WAY RELATED TO THE ACCESS TO OR USE OF THE KOMBATIX SERVICES (INCLUDING, BUT NOT LIMITED TO, USER CONTENT AND LINKS TO THIRD-PARTY WEBSITES), OR THE ORDER, RECEIPT OR USE OF ANY PRODUCT OR SERVICE, OR OTHERWISE RELATED TO THESE TERMS (INCLUDING, BUT NOT LIMITED TO, ANY DAMAGES CAUSED BY OR RESULTING FROM RELIANCE ON ANY INFORMATION OBTAINED FROM KOMBATIX, OR FROM EVENTS BEYOND KOMBATIX&apos;S REASONABLE CONTROL, REGARDLESS OF THE FORM OF ACTION, WHETHER BASED IN CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, SIMPLE NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED) OR ANY OTHER LEGAL OR EQUITABLE THEORY, EVEN IF KOMBATIX HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE).</p>

        <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY OF KOMBATIX ARISING OUT OF OR IN ANY WAY RELATED TO THE KOMBATIX SERVICES EXCEED ONE HUNDRED DOLLARS ($100). THE FOREGOING LIMITATIONS SHALL APPLY EVEN IN THE EVENT YOUR REMEDIES HEREUNDER FAIL OF THEIR ESSENTIAL PURPOSE, AND THE FOREGOING SHALL CONSTITUTE KOMBATIX&apos;S SOLE LIABILITY AND OBLIGATION IN RESPECT HEREOF.</p>

        <p>IF YOU ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE YOUR RIGHTS UNDER CALIFORNIA CIVIL CODE 1542, WHICH STATES &quot;A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS THAT THE CREDITOR OR RELEASING PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE AND THAT, IF KNOWN BY HIM OR HER, WOULD HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR OR RELEASED PARTY.&quot;</p>

        <h2>14. Arbitration</h2>
        <p>PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT REQUIRES YOU TO ARBITRATE CERTAIN DISPUTES AND CLAIMS WITH KOMBATIX AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM US.</p>

        <p>YOU AND KOMBATIX AGREE THAT ANY DISPUTE, CLAIM OR CONTROVERSY ARISING OUT OF OR RELATING IN ANY WAY TO THESE TERMS OR THE KOMBATIX SERVICES SHALL BE FINALLY DECIDED BY BINDING ARBITRATION UNDER THE RULES OF THE AMERICAN ARBITRATION ASSOCIATION GOVERNING CONSUMER DISPUTES.</p>

        <p>Arbitration uses a single, neutral arbitrator to decide a dispute (instead of a judge or jury); arbitration allows for more limited discovery than in a court case; and the arbitration process and result is subject to very limited review by courts. In an arbitration you have the right, at your expense, to be represented by an attorney of your choosing. Arbitrators can award the same damages and relief under these Terms that a court can award under these Terms. You and Kombatix agree that any in-person arbitral hearing would occur in the United States in the same county and state as your billing address. Kombatix further agrees that your filing fee for an arbitration will be capped at the amount set by the American Arbitration Association. You agree that, by agreeing to these Terms, the U.S. Federal Arbitration Act governs the interpretation and enforcement of this provision, and that you and Kombatix are each waiving the right to a trial by jury and/or to participate in a class action. This arbitration provision shall survive termination of these Terms and the termination of your use of the Kombatix Services. Further, unless both you and Kombatix agree otherwise, the arbitrator may not join or consolidate more than one person&apos;s claims with your claims and may not otherwise preside over any form of a representative or class proceeding. If this specific provision is found to be unenforceable, then the entirety of this arbitration provision shall be null and void. The arbitrator may award declaratory or injunctive relief only in favor of the individual party seeking relief and only to the extent necessary to provide relief warranted by that party&apos;s individual claim.</p>

        <h2>15. Class Action Waiver</h2>
        <p>REGARDLESS OF THE FORUM, YOU AND KOMBATIX AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.</p>

        <h2>16. Termination</h2>
        <p>Notwithstanding anything contained in these Terms, we reserve the right, without notice and in our sole discretion, to terminate your right to access or use the Kombatix Services at any time and for any or no reason, and you acknowledge and agree that in such event we shall have no liability or obligation to you.</p>

        <h2>17. Governing Law and Jurisdiction</h2>
        <p>Kombatix operates the Kombatix Services from Idaho, U.S.A. These Terms and the transactions they contemplate, including without limitation their interpretation, construction, performance and enforcement, shall be governed by the laws of the State of Idaho, U.S.A., including its statutes of limitations, but without reference to conflict or choice of law provisions. The International Convention on the Sale of Goods, and other international treaties that are not mandatory with respect to contracts made and performed entirely in Idaho shall not apply. Any legal proceeding arising out of these terms must be brought in the state or federal courts located in Ada County, Idaho.</p>

        <h2>18. Notice</h2>
        <p>All notices, demands, or consents given by you under these Terms will be in writing and will be deemed given when delivered to Kombatix at the following contact: <a href="mailto:operations@kombatix.io">operations@kombatix.io</a>. Any notices to you may be made via either e-mail or postal mail to the address in Kombatix&apos;s records or via posting on the Kombatix Services. You agree that any notices, agreements, disclosures or other communications that we send to you electronically will satisfy any legal communication requirements, including, but not limited to, that such communications be in writing.</p>

        <p>Persons with disabilities who need assistance accessing these Terms may contact us as provided for in this Section, and depending on your individual needs, we will grant reasonable requests to furnish these Terms in an alternative format.</p>

        <h2>19. Severability</h2>
        <p>If any term, clause or provision of these Terms is held invalid or unenforceable, then that term, clause or provision will be severable from these Terms and will not affect the validity or enforceability of any remaining part of that term, clause or provision, or any other term, clause or provision of these Terms.</p>

        <h2>20. Procedure for Making Claims of Copyright Infringement</h2>
        <p>If you believe in good faith that any of the content on the Kombatix Services infringes your copyright, please provide our copyright agent the following written information: (a) an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest; (b) a description of the copyrighted work that you claim has been infringed; (c) a description of where the material that you claim is infringing is located on the Kombatix Services; (d) your address, telephone number and email address; (e) a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent or the law; and (f) a statement by you, made under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner, or are authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.</p>

        <p><strong>Kombatix&apos;s</strong> copyright agent for notice of claims of copyright infringement can be reached as follows:</p>

        <p>
          <strong>Kombatix, LLC</strong>
          <br />
          <strong>Attn: Compliance</strong>
          <br />
          2976 E State St, STE 120-2914
          <br />
          Eagle, ID 83616
          <br />
          <a href="mailto:operations@kombatix.io">operations@kombatix.io</a>
        </p>

        <h2>21. Miscellaneous</h2>
        <p>The Kombatix Services are hosted in the United States of America. If you are located outside of the United States of America and you contact us, please be advised that any information you provide to us will be transferred to the United States of America and that by submitting information, you explicitly authorize such transfer. These Terms constitute the entire agreement between you and Kombatix relating to your access to and use of the Kombatix Services. These Terms, and any rights granted hereunder, may not be transferred or assigned by you without the prior written consent of Kombatix. No waiver of any provision of these Terms will constitute a waiver of such provision in any prior, concurrent or subsequent circumstance, and Kombatix&apos;s failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision. Except as otherwise provided herein, these Terms are intended solely for the benefit of the parties and are not intended to confer third-party beneficiary rights upon any other person or entity.</p>

        <hr />

        <p>
          <strong>Contact Information</strong>
          <br />
          Email: <a href="mailto:operations@kombatix.io">operations@kombatix.io</a>
          <br />
          Phone: (208) 944-1422
          <br />
          Address: Kombatix, LLC, 2976 E State St, STE 120-2914, Eagle, ID 83616
        </p>
      </LegalPage>
    </>
  );
}
