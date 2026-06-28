import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createLeadAction } from "../../../../features/crm/leads/actions";

export default function NewLeadPage() {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Create Lead"
        eyebrow="CRM Leads"
        description="Add a database-backed sales lead for qualification."
        actions={<Link className="vercent-button secondary" href="/crm/leads">Back to leads</Link>}
      />

      <form action={createLeadAction} className="vercent-form">
        <label>First name<input name="firstName" required /></label>
        <label>Last name<input name="lastName" required /></label>
        <label>Company name<input name="companyName" /></label>
        <label>Email<input name="email" type="email" /></label>
        <label>Phone<input name="phone" /></label>
        <label>Source<input name="source" placeholder="website, referral, event" /></label>
        <label>Expected value<input name="expectedValue" type="number" min="0" step="0.01" /></label>
        <label>Currency<input name="currency" defaultValue="INR" maxLength={3} /></label>
        <label className="full">Notes<textarea name="notes" rows={5} /></label>
        <div className="full form-actions">
          <button type="submit">Create lead</button>
        </div>
      </form>
    </main>
  );
}
