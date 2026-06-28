import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createAddressAction } from "../../../../features/master-data/actions";
import { getParty, listAddresses } from "../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function PartyDetailPage({ params }: PageProps) {
  const [party, addresses] = await Promise.all([getParty(params.id), listAddresses(params.id)]);
  const addressAction = createAddressAction.bind(null, party.id);

  return (
    <main className="page-shell">
      <ModuleHeader
        title={party.displayName}
        eyebrow={party.partyNumber}
        description={party.legalName ?? `${party.partyType} party`}
        actions={<Link className="vercent-button" href={`/master-data/parties/${party.id}/edit`}>Edit</Link>}
      />

      <section className="vercent-detail-grid">
        <article>
          <h2>Party details</h2>
          <dl className="vercent-fields">
            <dt>Status</dt><dd><span className="vercent-status">{party.status}</span></dd>
            <dt>Type</dt><dd>{party.partyType}</dd>
            <dt>Email</dt><dd>{party.email ?? "-"}</dd>
            <dt>Phone</dt><dd>{party.phone ?? "-"}</dd>
            <dt>GSTIN</dt><dd>{party.gstin ?? "-"}</dd>
            <dt>PAN</dt><dd>{party.pan ?? "-"}</dd>
            <dt>Website</dt><dd>{party.website ?? "-"}</dd>
          </dl>
        </article>

        <article>
          <h2>Add address</h2>
          <form action={addressAction} className="vercent-stack">
            <label>Type<select name="addressType" defaultValue="REGISTERED"><option value="REGISTERED">Registered</option><option value="BILLING">Billing</option><option value="SHIPPING">Shipping</option><option value="OFFICE">Office</option><option value="WAREHOUSE">Warehouse</option><option value="OTHER">Other</option></select></label>
            <label>Line 1<input name="line1" required /></label>
            <label>Line 2<input name="line2" /></label>
            <label>City<input name="city" required /></label>
            <label>State<input name="state" required /></label>
            <label>Postal code<input name="postalCode" required /></label>
            <label>Country<input name="country" defaultValue="IN" required /></label>
            <label><input name="isDefaultBilling" type="checkbox" /> Default billing</label>
            <label><input name="isDefaultShipping" type="checkbox" /> Default shipping</label>
            <button type="submit">Add address</button>
          </form>
        </article>
      </section>

      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>Type</th><th>Address</th><th>City</th><th>State</th><th>Defaults</th></tr></thead>
          <tbody>
            {addresses.map((address) => (
              <tr key={address.id}>
                <td>{address.addressType}</td>
                <td><strong>{address.line1}</strong><span>{address.line2 ?? ""}</span></td>
                <td>{address.city}</td>
                <td>{address.state} {address.postalCode}</td>
                <td>{[address.isDefaultBilling ? "Billing" : "", address.isDefaultShipping ? "Shipping" : ""].filter(Boolean).join(", ") || "-"}</td>
              </tr>
            ))}
            {addresses.length === 0 ? <tr><td colSpan={5}>No addresses found.</td></tr> : null}
          </tbody>
        </table>
      </section>
    </main>
  );
}
