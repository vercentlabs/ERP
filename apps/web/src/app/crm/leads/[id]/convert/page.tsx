import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { convertLeadAction } from "../../../../../features/crm/leads/actions";
import { getLead } from "../../../../../features/crm/leads/api";

type PageProps = {
  params: { id: string };
};

function displayName(lead: Awaited<ReturnType<typeof getLead>>) {
  return lead.companyName ?? `${lead.firstName} ${lead.lastName}`.trim();
}

export default async function ConvertLeadPage({ params }: PageProps) {
  const lead = await getLead(params.id);
  const action = convertLeadAction.bind(null, lead.id);
  const canConvert = lead.status === "QUALIFIED" && !lead.convertedCustomerId;

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Convert Lead"
        eyebrow={lead.leadNumber}
        description="Create a Master Data party and customer from this qualified lead."
        actions={<Link className="vercent-button secondary" href={`/crm/leads/${lead.id}`}>Back to lead</Link>}
      />

      {!canConvert ? (
        <section className="vercent-panel">
          <h2>Conversion unavailable</h2>
          <p>Only qualified leads that have not already been converted can be converted to customers.</p>
        </section>
      ) : (
        <form action={action} className="vercent-form">
          <label>
            Party type
            <select name="partyType" defaultValue={lead.companyName ? "COMPANY" : "INDIVIDUAL"}>
              <option value="COMPANY">Company</option>
              <option value="INDIVIDUAL">Individual</option>
            </select>
          </label>
          <label>Display name<input name="displayName" required defaultValue={displayName(lead)} /></label>
          <label>Legal name<input name="legalName" defaultValue={lead.companyName ?? ""} /></label>
          <label>Email<input name="email" type="email" defaultValue={lead.email ?? ""} /></label>
          <label>Phone<input name="phone" defaultValue={lead.phone ?? ""} /></label>
          <label>GSTIN<input name="gstin" /></label>
          <label>PAN<input name="pan" /></label>
          <label>Customer group<input name="customerGroup" placeholder="Enterprise, Retail, Distributor" /></label>
          <label>Payment terms<input name="paymentTerms" placeholder="Net 30" /></label>
          <label>Currency<input name="currency" required maxLength={3} defaultValue={lead.currency} /></label>
          <label>GST treatment<input name="gstTreatment" placeholder="Registered, Unregistered, Export" /></label>

          <fieldset className="full">
            <legend>Opportunity</legend>
            <label>
              <input name="createOpportunity" type="checkbox" />
              Create opportunity
            </label>
            <label>Opportunity name<input name="opportunityName" defaultValue={`${displayName(lead)} opportunity`} /></label>
            <label>Expected value<input name="opportunityExpectedValue" type="number" min="0" step="0.01" defaultValue={lead.expectedValue ?? ""} /></label>
            <label>Expected close date<input name="opportunityExpectedCloseDate" type="date" /></label>
            <label>Source<input name="opportunitySource" defaultValue={lead.source ?? ""} /></label>
          </fieldset>

          <fieldset className="full">
            <legend>Billing address</legend>
            <label>Line 1<input name="billingLine1" /></label>
            <label>Line 2<input name="billingLine2" /></label>
            <label>City<input name="billingCity" /></label>
            <label>State<input name="billingState" /></label>
            <label>Postal code<input name="billingPostalCode" /></label>
            <label>Country<input name="billingCountry" defaultValue="IN" /></label>
            <label>GST state code<input name="billingGstStateCode" /></label>
          </fieldset>

          <fieldset className="full">
            <legend>Shipping address</legend>
            <label>Line 1<input name="shippingLine1" /></label>
            <label>Line 2<input name="shippingLine2" /></label>
            <label>City<input name="shippingCity" /></label>
            <label>State<input name="shippingState" /></label>
            <label>Postal code<input name="shippingPostalCode" /></label>
            <label>Country<input name="shippingCountry" defaultValue="IN" /></label>
            <label>GST state code<input name="shippingGstStateCode" /></label>
          </fieldset>

          <label className="full">Conversion notes<textarea name="notes" rows={5} defaultValue={lead.notes ?? ""} /></label>

          <div className="full form-actions">
            <button type="submit">Convert to customer</button>
          </div>
        </form>
      )}
    </main>
  );
}
