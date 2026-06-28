import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createOpportunityAction } from "../../../../features/crm/opportunities/actions";

export default function NewOpportunityPage() {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Create Opportunity"
        eyebrow="CRM Opportunities"
        description="Create a customer-linked pipeline opportunity."
        actions={<Link className="vercent-button secondary" href="/crm/opportunities">Back to opportunities</Link>}
      />

      <form action={createOpportunityAction} className="vercent-form">
        <label>Name<input name="name" required /></label>
        <label>Customer ID<input name="customerId" required /></label>
        <label>
          Stage
          <select name="stage" defaultValue="PROSPECTING">
            <option value="PROSPECTING">Prospecting</option>
            <option value="QUALIFICATION">Qualification</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="NEGOTIATION">Negotiation</option>
          </select>
        </label>
        <label>Probability<input name="probability" type="number" min="0" max="100" /></label>
        <label>Expected value<input name="expectedValue" type="number" min="0" step="0.01" defaultValue="0" /></label>
        <label>Currency<input name="currency" defaultValue="INR" maxLength={3} /></label>
        <label>Expected close date<input name="expectedCloseDate" type="date" /></label>
        <label>Source<input name="source" /></label>
        <label>Tags<input name="tags" placeholder="enterprise, renewal" /></label>
        <label className="full">Notes<textarea name="notes" rows={5} /></label>
        <div className="full form-actions">
          <button type="submit">Create opportunity</button>
        </div>
      </form>
    </main>
  );
}
