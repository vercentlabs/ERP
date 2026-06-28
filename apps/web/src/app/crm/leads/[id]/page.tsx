import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { assignLeadAction, changeLeadStatusAction } from "../../../../features/crm/leads/actions";
import { getLead, type LeadStatus } from "../../../../features/crm/leads/api";

type PageProps = {
  params: { id: string };
};

const nextStatuses: Record<LeadStatus, LeadStatus[]> = {
  NEW: ["CONTACTED"],
  CONTACTED: ["QUALIFIED", "DISQUALIFIED"],
  QUALIFIED: ["DISQUALIFIED"],
  DISQUALIFIED: [],
  CONVERTED: [],
};

export default async function LeadDetailPage({ params }: PageProps) {
  const lead = await getLead(params.id);
  const statusAction = changeLeadStatusAction.bind(null, lead.id);
  const assignAction = assignLeadAction.bind(null, lead.id);

  return (
    <main className="page-shell">
      <ModuleHeader
        title={`${lead.firstName} ${lead.lastName}`}
        eyebrow={lead.leadNumber}
        description={lead.companyName ?? "Individual lead"}
        actions={
          <>
            {lead.status === "QUALIFIED" ? <Link className="vercent-button" href={`/crm/leads/${lead.id}/convert`}>Convert</Link> : null}
            <Link className="vercent-button secondary" href={`/crm/leads/${lead.id}/edit`}>Edit</Link>
          </>
        }
      />

      <section className="vercent-detail-grid">
        <article>
          <h2>Lead details</h2>
          <dl className="vercent-fields">
            <dt>Status</dt><dd><span className="vercent-status">{lead.status}</span></dd>
            <dt>Email</dt><dd>{lead.email ?? "-"}</dd>
            <dt>Phone</dt><dd>{lead.phone ?? "-"}</dd>
            <dt>Source</dt><dd>{lead.source ?? "-"}</dd>
            <dt>Score</dt><dd>{lead.score}</dd>
            <dt>Expected value</dt><dd>{lead.expectedValue ? `${lead.currency} ${lead.expectedValue.toLocaleString("en-IN")}` : "-"}</dd>
            <dt>Owner</dt><dd>{lead.ownerUserId ?? "-"}</dd>
            <dt>Team</dt><dd>{lead.assignedTeamId ?? "-"}</dd>
            <dt>Notes</dt><dd>{lead.notes ?? "-"}</dd>
            <dt>Converted at</dt><dd>{lead.convertedAt ? new Date(lead.convertedAt).toLocaleString("en-IN") : "-"}</dd>
            <dt>Party</dt>
            <dd>{lead.convertedPartyId ? <Link href={`/master-data/parties/${lead.convertedPartyId}`}>{lead.convertedPartyId}</Link> : "-"}</dd>
            <dt>Customer</dt>
            <dd>{lead.convertedCustomerId ? <Link href={`/master-data/customers/${lead.convertedCustomerId}`}>{lead.convertedCustomerId}</Link> : "-"}</dd>
            <dt>Opportunity</dt>
            <dd>{lead.convertedOpportunityId ? <Link href={`/crm/opportunities/${lead.convertedOpportunityId}`}>{lead.convertedOpportunityId}</Link> : "-"}</dd>
            <dt>Conversion notes</dt><dd>{lead.conversionNotes ?? "-"}</dd>
          </dl>
        </article>

        <article>
          <h2>Actions</h2>
          <form action={statusAction} className="vercent-stack">
            <label>
              Change status
              <select name="status" required>
                <option value="">Select status</option>
                {nextStatuses[lead.status].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={nextStatuses[lead.status].length === 0}>Update status</button>
          </form>

          <form action={assignAction} className="vercent-stack">
            <label>
              Owner user ID
              <input name="ownerUserId" defaultValue={lead.ownerUserId ?? ""} placeholder="user-id" />
            </label>
            <label>
              Assigned team ID
              <input name="assignedTeamId" defaultValue={lead.assignedTeamId ?? ""} placeholder="team-id" />
            </label>
            <button type="submit">Assign lead</button>
          </form>

          {lead.status === "QUALIFIED" ? (
            <div className="vercent-stack">
              <h3>Lead conversion</h3>
              <p>Create a Master Data party and customer from this qualified lead.</p>
              <Link className="vercent-button" href={`/crm/leads/${lead.id}/convert`}>Convert to customer</Link>
            </div>
          ) : null}

          {lead.status !== "QUALIFIED" && lead.status !== "CONVERTED" ? (
            <p>Lead conversion is available after the lead reaches QUALIFIED status.</p>
          ) : null}
        </article>
      </section>

      <section className="vercent-panel">
        <h2>Timeline</h2>
        <p>Timeline events will use the CRM lead audit stream when the shared timeline component is implemented.</p>
      </section>
    </main>
  );
}
