import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateOpportunityAction } from "../../../../../features/crm/opportunities/actions";
import { getOpportunity } from "../../../../../features/crm/opportunities/api";

type PageProps = {
  params: { id: string };
};

export default async function EditOpportunityPage({ params }: PageProps) {
  const opportunity = await getOpportunity(params.id);
  const action = updateOpportunityAction.bind(null, opportunity.id);

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Edit Opportunity"
        eyebrow={opportunity.opportunityNumber}
        description={`Update ${opportunity.name}`}
        actions={<Link className="vercent-button secondary" href={`/crm/opportunities/${opportunity.id}`}>Back to opportunity</Link>}
      />

      <form action={action} className="vercent-form">
        <label>Name<input name="name" required defaultValue={opportunity.name} /></label>
        <label>Customer ID<input name="customerId" required defaultValue={opportunity.customerId} /></label>
        <label>Probability<input name="probability" type="number" min="0" max="100" defaultValue={opportunity.probability} /></label>
        <label>Expected value<input name="expectedValue" type="number" min="0" step="0.01" defaultValue={opportunity.expectedValue} /></label>
        <label>Currency<input name="currency" defaultValue={opportunity.currency} maxLength={3} /></label>
        <label>Expected close date<input name="expectedCloseDate" type="date" defaultValue={opportunity.expectedCloseDate ?? ""} /></label>
        <label>Source<input name="source" defaultValue={opportunity.source ?? ""} /></label>
        <label>Tags<input name="tags" defaultValue={opportunity.tags.join(", ")} /></label>
        <label className="full">Notes<textarea name="notes" rows={5} defaultValue={opportunity.notes ?? ""} /></label>
        <div className="full form-actions">
          <button type="submit">Save changes</button>
        </div>
      </form>
    </main>
  );
}
