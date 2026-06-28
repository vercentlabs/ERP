import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { createStockAdjustmentAction } from "../../../../../features/inventory/stock/actions";

export default function StockAdjustmentPage() {
  return (
    <main className="page-shell">
      <ModuleHeader title="Stock Adjustment" eyebrow="Inventory" description="Create adjustment IN or OUT through the stock ledger." />
      <form className="form-panel" action={createStockAdjustmentAction}>
        <label>Item id<input name="itemId" required /></label>
        <label>Warehouse id<input name="warehouseId" required /></label>
        <label>Bin id<input name="binId" /></label>
        <label>Adjustment type<select name="adjustmentType" defaultValue="IN"><option value="IN">IN</option><option value="OUT">OUT</option></select></label>
        <label>Posting date<input type="date" name="postingDate" /></label>
        <label>Quantity<input type="number" step="0.000001" name="quantity" required /></label>
        <label>UOM id<input name="uomId" /></label>
        <label>Unit cost<input type="number" step="0.000001" name="unitCost" /></label>
        <label>Remarks<textarea name="remarks" /></label>
        <button type="submit">Create adjustment</button>
      </form>
    </main>
  );
}
