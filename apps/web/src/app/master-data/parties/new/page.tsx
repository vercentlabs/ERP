import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createPartyAction } from "../../../../features/master-data/actions";

export default function NewPartyPage() {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Create Party"
        eyebrow="Master Data"
        description="Create the legal or individual identity before assigning customer or supplier roles."
        actions={<Link className="vercent-button secondary" href="/master-data/parties">Back to parties</Link>}
      />

      <form action={createPartyAction} className="vercent-form">
        <label>Party type<select name="partyType" defaultValue="COMPANY"><option value="COMPANY">Company</option><option value="INDIVIDUAL">Individual</option></select></label>
        <label>Status<select name="status" defaultValue="ACTIVE"><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <label>Display name<input name="displayName" required /></label>
        <label>Legal name<input name="legalName" /></label>
        <label>Email<input name="email" type="email" /></label>
        <label>Phone<input name="phone" /></label>
        <label>GSTIN<input name="gstin" /></label>
        <label>PAN<input name="pan" /></label>
        <label className="full">Website<input name="website" /></label>
        <div className="full form-actions"><button type="submit">Create party</button></div>
      </form>
    </main>
  );
}
