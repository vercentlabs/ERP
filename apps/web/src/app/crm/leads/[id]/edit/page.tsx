import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateLeadAction } from "../../../../../features/crm/leads/actions";
import { getLead } from "../../../../../features/crm/leads/api";

type PageProps = {
  params: { id: string };
};

export default async function EditLeadPage({ params }: PageProps) {
  const lead = await getLead(params.id);
  const action = updateLeadAction.bind(null, lead.id);

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Edit Lead"
        eyebrow={lead.leadNumber}
        description={`Update ${lead.firstName} ${lead.lastName}`}
        actions={<Link className="vercent-button secondary" href={`/crm/leads/${lead.id}`}>Back to lead</Link>}
      />

      <form action={action} className="vercent-form">
        <label>First name<input name="firstName" required defaultValue={lead.firstName} /></label>
        <label>Last name<input name="lastName" required defaultValue={lead.lastName} /></label>
        <label>Company name<input name="companyName" defaultValue={lead.companyName ?? ""} /></label>
        <label>Email<input name="email" type="email" defaultValue={lead.email ?? ""} /></label>
        <label>Phone<input name="phone" defaultValue={lead.phone ?? ""} /></label>
        <label>Source<input name="source" defaultValue={lead.source ?? ""} /></label>
        <label>Expected value<input name="expectedValue" type="number" min="0" step="0.01" defaultValue={lead.expectedValue ?? ""} /></label>
        <label>Currency<input name="currency" defaultValue={lead.currency} maxLength={3} /></label>
        <label className="full">Notes<textarea name="notes" rows={5} defaultValue={lead.notes ?? ""} /></label>
        <div className="full form-actions">
          <button type="submit">Save changes</button>
        </div>
      </form>
    </main>
  );
}
