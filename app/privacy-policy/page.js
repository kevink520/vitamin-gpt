'use client'

import Link from 'next/link'
import ReactGA from 'react-ga4'
import { RiRobot3Line } from 'react-icons/ri'

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)

export default function PrivacyPolicy () {
  return (
    <section className='max-w-4xl mx-auto'>
      <Link href='/' className='inline-flex items-center gap-2'>
        <div className='w-16 h-16 flex justify-center items-center rounded-full overflow-hidden mb-3 bg-[#74AA9C]'>
          <RiRobot3Line size={40} color='#fff' />
        </div>
        <span className='text-2xl font-bold'>Vitamin GPT</span>
      </Link>
      <h1 className='mt-8 mb-4 text-3xl font-bold'>Privacy Policy for “Vitamin GPT”</h1>
      <p className='mb-4 text-sm text-gray-500'>Last updated: May 18, 2025</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>1. Who We Are</h2>
      <p className='mb-4 text-lg'>Vitamin GPT (“we,” “us,” “our”) is an open‑source chatbot hosted on Vercel. Source code is publicly available at https://github.com/kevink520/vitamin-gpt. To contact us, email kevin@digitalmedia.nyc.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>2. Scope</h2>
      <p className='mb-4 text-lg'>This Privacy Policy explains how we collect, use, disclose, and safeguard information obtained when you interact with the chatbot located at https://vitamin-gpt.vercel.app (the “Service”).</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>3. Information We Collect</h2>
      <table className='table-auto my-4'>
        <thead>
          <tr className='text-left'>
            <th className='pr-4'>Category</th>
            <th className='pr-4'>Examples</th>
            <th className='pr-4'>Collected How</th>
            <th className='pr-4'>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='pr-4'>Chat Content</td>
            <td className='pr-4'>Free‑form text you enter</td>
            <td className='pr-4'>Directly from you</td>
            <td className='pr-4'>Provide responses, improve Service</td>
          </tr>
          <tr>
            <td className='pr-4'>Analytics Data</td>
            <td className='pr-4'>Page‑views, anonymised IP (last octet removed), device/OS, geographic region (city/country)</td>
            <td className='pr-4'>Google Analytics 4 JavaScript (gtag.js) cookies & local‑storage</td>
            <td className='pr-4'>Measure traffic patterns, improve performance</td>
          </tr>
          <tr>
            <td className='pr-4'>Device & Usage</td>
            <td className='pr-4'>IP address, browser type, timestamps, referrer</td>
            <td className='pr-4'>Automated logs</td>
            <td className='pr-4'>Security, analytics</td>
          </tr>
          <tr>
            <td className='pr-4'>Optional Identifiers</td>
            <td className='pr-4'>Email (if voluntarily provided)</td>
            <td className='pr-4'>Directly from you</td>
            <td className='pr-4'>Account linking, support</td>
          </tr>
        </tbody>
      </table>

      <p className='mb-4 text-lg'>We do not intentionally collect special categories of personal data (e.g., health, biometric).</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>4. Legal Bases for Processing (GDPR)</h2>
      <p className='mb-4 text-lg'>Consent – when you click the “Send” button, you consent to processing the text you enter.</p>

      <p className='mb-4 text-lg'>Legitimate Interests – to prevent abuse, maintain logs, and improve the Service.</p>

      <p className='mb-4 text-lg'>Contract – if you sign up for an account or API key.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>5. How We Use Information</h2>
      <p className='mb-4 text-lg'>Generate and display chatbot responses.</p>

      <p className='mb-4 text-lg'>Analyse usage trends via Google Analytics 4 to understand which prompts and pages are most helpful and to diagnose errors.</p>

      <p className='mb-4 text-lg'>Monitor performance and debug errors.</p>

      <p className='mb-4 text-lg'>Anonymize conversations for research or documentation.</p>

      <p className='mb-4 text-lg'>Comply with legal obligations.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>6. Sharing & Sub‑Processors</h2>
      <p className='mb-4 text-lg'>We share data only with:</p>
      <table className='table-auto my-4'>
        <thead>
          <tr className='text-left'>
            <th className='pr-4'>Provider</th>
            <th className='pr-4'>Role</th>
            <th className='pr-4'>Safeguards</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='pr-4'>Google LLC (Google Analytics 4)</td>
            <td className='pr-4'>Web analytics & performance metrics</td>
            <td className='pr-4'>IP-anonymisation, no PII per GA ToS, EU Standard Contractual Clauses for cross-border transfers</td>
          </tr>
          <tr>
            <td className='pr-4'>Amazon Web Services (DynamoDB, Region us-east-1)</td>
            <td className='pr-4'>Primary database</td>
            <td className='pr-4'>Encryption at rest (KMS); AWS DPA</td>
          </tr>
          <tr>
            <td className='pr-4'>Vercel Inc.</td>
            <td className='pr-4'>Hosting & edge caching</td>
            <td className='pr-4'>Standard Contractual Clauses (for EU data)</td>
          </tr>
          <tr>
            <td className='pr-4'>GitHub Inc. (Actions logs)</td>
            <td className='pr-4'>Continuous deployment</td>
            <td className='pr-4'>Access restricted</td>
          </tr>
        </tbody>
      </table>

      <p className='mb-4 text-lg'>No data is sold or rented.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>7. Retention</h2>
      <p className='mb-4 text-lg'>Chat logs are kept for 30 days, then irreversibly anonymized; system backups are deleted within 90 days. Aggregated statistics may be kept indefinitely.</p>
      <p className='mb-4 text-lg'>Google Analytics reports are automatically set to 26-month rolling deletion, the shortest GA4 retention period, after which only aggregated statistics remain.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>8. Security</h2>
      <p className='mb-4 text-lg'>We employ TLS 1.3 for all network traffic, encryption at rest via AWS KMS, IAM least‑privilege policies, and routine vulnerability scans.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>9. Your Rights</h2>
      <p className='mb-4 text-lg'>GDPR/UK GDPR: access, rectification, erasure, restriction, data portability, object.</p>

      <p className='mb-4 text-lg'>California: right to know, delete, correct, and opt‑out of selling/sharing personal info.</p>

      <p className='mb-4 text-lg'>To exercise any right, email kevin@digitalmedia.nyc or open an issue on the GitHub repo. We will respond within 30 days.</p>
      <p className='mb-4 text-lg'>Users may also opt out of analytics tracking at any time via the methods listed in §10 or by e‑mailing us.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>10. Cookies & Tracking</h2>
      <p className='mb-4 text-lg'>The Service itself sets no first‑party cookies, but Google Analytics 4 places the following cookies or uses local‑storage keys:</p>
      <table className='table-auto my-4'>
        <thead>
          <tr className='text-left'>
            <th className='pr-4'>Name</th>
            <th className='pr-4'>Lifetime</th>
            <th className='pr-4'>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='pr-4'>_ga</td>
            <td className='pr-4'>24 months</td>
            <td className='pr-4'>Distinguish users</td>
          </tr>
          <tr>
            <td className='pr-4' dangerouslySetInnerHTML={{ __html: '_ga_&lt;container‑id&gt;' }}></td>
            <td className='pr-4'>24 months</td>
            <td className='pr-4'>Persist session state</td>
          </tr>
          <tr>
            <td className='pr-4'>_gid</td>
            <td className='pr-4'>24 h</td>
            <td className='pr-4'>Session counter</td>
          </tr>
        </tbody>
      </table>

      <p className='mb-4 text-lg'>Opt‑out: Visitors can install the Google Analytics Opt‑out Browser Add‑on or use browser Do Not Track settings. We honour these signals by disabling GA4 collection when consent is not granted (see banner on first visit).</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>11. Children’s Privacy</h2>
      <p className='mb-4 text-lg'>The Service is not directed to children under 13. We do not knowingly collect info from children. If you believe we have inadvertently collected such info, contact us for deletion.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>12. Changes to This Policy</h2>
      <p className='mb-4 text-lg'>We may update this Policy from time to time. Material changes will be announced on the GitHub repository’s Releases page and take effect 14 days after posting.</p>

      <h2 className='mt-8 my-4 text-2xl font-bold'>13. Contact</h2>
      <p className='mb-4 text-lg'>Questions? Email kevin@digitalmedia.nyc.</p>
    </section>
  )
}
