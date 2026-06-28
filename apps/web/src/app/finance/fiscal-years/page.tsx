import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { closeFiscalYearAction, createFiscalYearAction, setDefaultFiscalYearAction } from "../../../features/finance/accounting/actions";
import { listFiscalYears } from "../../../features/finance/accounting/api";

export default async function FiscalYearsPage() {
  const years = await listFiscalYears();
  return (
    <main className="page-shell">
      <ModuleHeader title="Fiscal Years" eyebrow="Finance" description="Create, default, and close fiscal years for journals." />
      <form action={createFiscalYearAction} className="vercent-toolbar">
        <input name="name" placeholder="FY 2026-27" required />
        <input name="startDate" type="date" required />
        <input name="endDate" type="date" required />
        <label><input name="isDefault" type="checkbox" /> Default</label>
        <button type="submit">Create</button>
      </form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Name</th><th>Start</th><th>End</th><th>Status</th><th>Default</th><th>Actions</th></tr></thead><tbody>{years.rows.map((year) => <tr key={year.id}><td>{year.name}</td><td>{year.startDate}</td><td>{year.endDate}</td><td>{year.status}</td><td>{year.isDefault ? "Yes" : "No"}</td><td><form action={setDefaultFiscalYearAction.bind(null, year.id)}><button type="submit" disabled={year.status !== "OPEN"}>Set default</button></form><form action={closeFiscalYearAction.bind(null, year.id)}><button type="submit" disabled={year.status !== "OPEN"}>Close</button></form></td></tr>)}</tbody></table></section>
    </main>
  );
}
