import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updatePartyAction } from "../../../../../features/master-data/actions";
import { getParty } from "../../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function EditPartyPage({ params }: PageProps) {
  const party = await getParty(params.id);
  const action = updatePartyAction.bind(null, party.id);

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Edit Party"
        eyebrow={party.partyNumber}
        description={`Update ${party.displayName}`}
        actions={<Link className="vercent-button secondary" href={`/master-data/parties/${party.id}`}>Back to party</Link>}
      />

      <form action={action} className="vercent-form">
        <label>Party type<select name="partyType" defaultValue={party.partyType}><option value="COMPANY">Company</option><option value="INDIVIDUAL">Individual</option></select></label>
        <label>Status<select name="status" defaultValue={party.status}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <label>Display name<input name="displayName" required defaultValue={party.displayName} /></label>
        <label>Legal name<input name="legalName" defaultValue={party.legalName ?? ""} /></label>
        <label>Email<input name="email" type="email" defaultValue={party.email ?? ""} /></label>
        <label>Phone<input name="phone" defaultValue={party.phone ?? ""} /></label>
        <label>GSTIN<input name="gstin" defaultValue={party.gstin ?? ""} /></label>
        <label>PAN<input name="pan" defaultValue={party.pan ?? ""} /></label>
        <label className="full">Website<input name="website" defaultValue={party.website ?? ""} /></label>
        <div className="full form-actions"><button type="submit">Save changes</button></div>
      </form>
    </main>
  );
}
