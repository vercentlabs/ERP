import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateWarehouseAction } from "../../../../../features/inventory/stock/actions";
import { getWarehouse } from "../../../../../features/inventory/stock/api";

export default async function EditWarehousePage({ params }: { params: { id: string } }) {
  const warehouse = await getWarehouse(params.id);
  const action = updateWarehouseAction.bind(null, params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title="Edit Warehouse" eyebrow={warehouse.warehouseNumber} description={warehouse.name} />
      <form className="form-panel" action={action}>
        <label>Name<input name="name" required defaultValue={warehouse.name} /></label>
        <label>Code<input name="code" required defaultValue={warehouse.code} /></label>
        <label>Type<select name="type" defaultValue={warehouse.type}>{["MAIN", "BRANCH", "TRANSIT", "VIRTUAL", "PRODUCTION", "THIRD_PARTY"].map((type) => <option key={type}>{type}</option>)}</select></label>
        <label>Status<select name="status" defaultValue={warehouse.status}><option>ACTIVE</option><option>INACTIVE</option><option>BLOCKED</option></select></label>
        <label>Notes<textarea name="notes" defaultValue={warehouse.notes ?? ""} /></label>
        <label><input type="checkbox" name="isDefault" defaultChecked={warehouse.isDefault} /> Default warehouse</label>
        <button type="submit">Save warehouse</button>
      </form>
    </main>
  );
}
