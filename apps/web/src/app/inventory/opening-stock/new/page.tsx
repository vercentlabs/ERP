import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createOpeningStockAction } from "../../../../features/inventory/stock/actions";

export default function OpeningStockPage() {
  return (
    <main className="page-shell">
      <ModuleHeader title="Opening Stock" eyebrow="Inventory" description="Create initial stock balance through an immutable ledger entry." />
      <form className="form-panel" action={createOpeningStockAction}>
        <label>Item id<input name="itemId" required /></label>
        <label>Warehouse id<input name="warehouseId" required /></label>
        <label>Bin id<input name="binId" /></label>
        <label>Posting date<input type="date" name="postingDate" /></label>
        <label>Quantity<input type="number" step="0.000001" name="quantity" required /></label>
        <label>UOM id<input name="uomId" /></label>
        <label>Unit cost<input type="number" step="0.000001" name="unitCost" /></label>
        <label>Remarks<textarea name="remarks" /></label>
        <button type="submit">Create opening stock</button>
      </form>
    </main>
  );
}
