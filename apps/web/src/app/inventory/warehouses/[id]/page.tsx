import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { setDefaultWarehouseAction } from "../../../../features/inventory/stock/actions";
import { getWarehouse, listWarehouseBins } from "../../../../features/inventory/stock/api";

export default async function WarehouseDetailPage({ params }: { params: { id: string } }) {
  const warehouse = await getWarehouse(params.id);
  const bins = await listWarehouseBins(params.id, { pageSize: "10" });
  const setDefault = setDefaultWarehouseAction.bind(null, params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={warehouse.name} eyebrow={warehouse.warehouseNumber} description={`${warehouse.code} · ${warehouse.type} · ${warehouse.status}`} />
      <section className="toolbar">
        <Link className="button" href={`/inventory/warehouses/${warehouse.id}/edit`}>Edit</Link>
        <Link className="button" href={`/inventory/warehouses/${warehouse.id}/bins`}>Manage bins</Link>
        <form action={setDefault}><button type="submit">Set default</button></form>
      </section>
      <section className="grid-panel">
        <article className="metric-card"><span>Status</span><strong>{warehouse.status}</strong></article>
        <article className="metric-card"><span>Type</span><strong>{warehouse.type}</strong></article>
        <article className="metric-card"><span>Default</span><strong>{warehouse.isDefault ? "Yes" : "No"}</strong></article>
      </section>
      <section className="table-panel">
        <h2>Bins</h2>
        <table><thead><tr><th>Code</th><th>Name</th><th>Zone</th><th>Status</th><th>Default</th></tr></thead>
          <tbody>{bins.rows.map((bin) => <tr key={bin.id}><td>{bin.code}</td><td>{bin.name}</td><td>{bin.zone ?? "-"}</td><td>{bin.status}</td><td>{bin.isDefault ? "Yes" : "No"}</td></tr>)}</tbody>
        </table>
      </section>
    </main>
  );
}
