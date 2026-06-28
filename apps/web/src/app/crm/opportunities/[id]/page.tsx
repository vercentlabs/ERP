import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { assignOpportunityAction, changeOpportunityStageAction } from "../../../../features/crm/opportunities/actions";
import { getOpportunity, type OpportunityStage } from "../../../../features/crm/opportunities/api";

type PageProps = {
  params: { id: string };
};

const nextStages: Record<OpportunityStage, OpportunityStage[]> = {
  PROSPECTING: ["QUALIFICATION"],
  QUALIFICATION: ["PROPOSAL", "LOST"],
  PROPOSAL: ["NEGOTIATION", "LOST"],
  NEGOTIATION: ["WON", "LOST"],
  WON: [],
  LOST: [],
};

export default async function OpportunityDetailPage({ params }: PageProps) {
  const opportunity = await getOpportunity(params.id);
  const stageAction = changeOpportunityStageAction.bind(null, opportunity.id);
  const assignAction = assignOpportunityAction.bind(null, opportunity.id);
  const terminal = opportunity.stage === "WON" || opportunity.stage === "LOST";

  return (
    <main className="page-shell">
      <ModuleHeader
        title={opportunity.name}
        eyebrow={opportunity.opportunityNumber}
        description={`${opportunity.currency} ${opportunity.expectedValue.toLocaleString("en-IN")} at ${opportunity.probability}% probability`}
        actions={
          <>
            <Link
              className="vercent-button"
              href={`/sales/quotations/new?customerId=${opportunity.customerId}&opportunityId=${opportunity.id}&currency=${opportunity.currency}`}
            >
              Create quotation
            </Link>
            <Link className="vercent-button secondary" href={`/crm/opportunities/${opportunity.id}/edit`}>Edit</Link>
          </>
        }
      />

      <section className="vercent-detail-grid">
        <article>
          <h2>Opportunity details</h2>
          <dl className="vercent-fields">
            <dt>Stage</dt><dd><span className="vercent-status">{opportunity.stage}</span></dd>
            <dt>Customer</dt><dd><Link href={`/master-data/customers/${opportunity.customerId}`}>{opportunity.customerId}</Link></dd>
            <dt>Party</dt><dd>{opportunity.partyId ? <Link href={`/master-data/parties/${opportunity.partyId}`}>{opportunity.partyId}</Link> : "-"}</dd>
            <dt>Lead</dt><dd>{opportunity.leadId ? <Link href={`/crm/leads/${opportunity.leadId}`}>{opportunity.leadId}</Link> : "-"}</dd>
            <dt>Expected close</dt><dd>{opportunity.expectedCloseDate ?? "-"}</dd>
            <dt>Source</dt><dd>{opportunity.source ?? "-"}</dd>
            <dt>Owner</dt><dd>{opportunity.ownerUserId ?? "-"}</dd>
            <dt>Team</dt><dd>{opportunity.assignedTeamId ?? "-"}</dd>
            <dt>Closed at</dt><dd>{opportunity.closedAt ? new Date(opportunity.closedAt).toLocaleString("en-IN") : "-"}</dd>
            <dt>Loss reason</dt><dd>{opportunity.lossReason ?? "-"}</dd>
            <dt>Notes</dt><dd>{opportunity.notes ?? "-"}</dd>
          </dl>
        </article>

        <article>
          <h2>Actions</h2>
          <form action={stageAction} className="vercent-stack">
            <label>
              Change stage
              <select name="stage" required disabled={terminal}>
                <option value="">Select stage</option>
                {nextStages[opportunity.stage].map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </label>
            <label>Loss reason<textarea name="lossReason" rows={3} placeholder="Required when marking LOST" /></label>
            <button type="submit" disabled={nextStages[opportunity.stage].length === 0}>Update stage</button>
          </form>

          <form action={assignAction} className="vercent-stack">
            <label>Owner user ID<input name="ownerUserId" defaultValue={opportunity.ownerUserId ?? ""} /></label>
            <label>Assigned team ID<input name="assignedTeamId" defaultValue={opportunity.assignedTeamId ?? ""} /></label>
            <button type="submit">Assign opportunity</button>
          </form>
        </article>
      </section>

      <section className="vercent-panel">
        <h2>Timeline</h2>
        <p>Timeline events will use the CRM opportunity audit stream when the shared timeline component is implemented.</p>
      </section>
    </main>
  );
}
