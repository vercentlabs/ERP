import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { createWarehouseBinAction, setDefaultBinAction } from "../../../../../features/inventory/stock/actions";
import { getWarehouse, listWarehouseBins } from "../../../../../features/inventory/stock/api";

export default async function WarehouseBinsPage({ params }: { params: { id: string } }) {
  const warehouse = await getWarehouse(params.id);
  const bins = await listWarehouseBins(params.id, { pageSize: "50" });
  const createAction = createWarehouseBinAction.bind(null, params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title="Warehouse Bins" eyebrow={warehouse.name} description="Manage sub-locations inside this warehouse." />
      <section className="form-panel">
        <form action={createAction}>
          <label>Code<input name="code" required /></label>
          <label>Name<input name="name" required /></label>
          <label>Zone<input name="zone" /></label>
          <label>Aisle<input name="aisle" /></label>
          <label>Rack<input name="rack" /></label>
          <label>Shelf<input name="shelf" /></label>
          <label><input type="checkbox" name="isDefault" /> Default bin</label>
          <button type="submit">Create bin</button>
        </form>
      </section>
      <section className="table-panel">
        <table><thead><tr><th>Code</th><th>Name</th><th>Zone</th><th>Aisle</th><th>Rack</th><th>Default</th><th></th></tr></thead>
          <tbody>{bins.rows.map((bin) => {
            const action = setDefaultBinAction.bind(null, params.id, bin.id);
            return <tr key={bin.id}><td>{bin.code}</td><td>{bin.name}</td><td>{bin.zone ?? "-"}</td><td>{bin.aisle ?? "-"}</td><td>{bin.rack ?? "-"}</td><td>{bin.isDefault ? "Yes" : "No"}</td><td><form action={action}><button type="submit">Set default</button></form></td></tr>;
          })}</tbody>
        </table>
      </section>
    </main>
  );
}
