import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createWarehouseAction } from "../../../../features/inventory/stock/actions";

export default function NewWarehousePage() {
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Warehouse" eyebrow="Inventory" description="Add a physical or logical stock location." />
      <form className="form-panel" action={createWarehouseAction}>
        <label>Name<input name="name" required /></label>
        <label>Code<input name="code" required /></label>
        <label>Type<select name="type" defaultValue="MAIN">{["MAIN", "BRANCH", "TRANSIT", "VIRTUAL", "PRODUCTION", "THIRD_PARTY"].map((type) => <option key={type}>{type}</option>)}</select></label>
        <label>Status<select name="status" defaultValue="ACTIVE"><option>ACTIVE</option><option>INACTIVE</option><option>BLOCKED</option></select></label>
        <label>Manager user id<input name="managerUserId" /></label>
        <label>Notes<textarea name="notes" /></label>
        <label><input type="checkbox" name="isDefault" /> Default warehouse</label>
        <button type="submit">Create warehouse</button>
      </form>
    </main>
  );
}
