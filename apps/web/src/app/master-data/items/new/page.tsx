import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createItemAction } from "../../../../features/master-data/actions";
import { listUoms } from "../../../../features/master-data/api";

export default async function NewItemPage() {
  const uoms = await listUoms({ pageSize: "100", status: "ACTIVE" });

  return (
    <main className="page-shell">
      <ModuleHeader title="Create Item" eyebrow="Master Data" description="Create a stock, sales, purchase, service, or manufacturing item linked to UOM master data." actions={<Link className="vercent-button secondary" href="/master-data/items">Back to items</Link>} />
      <form action={createItemAction} className="vercent-form">
        <label>Name<input name="name" required /></label>
        <label>SKU<input name="sku" /></label>
        <label>Item type<select name="itemType" defaultValue="PRODUCT"><option value="PRODUCT">Product</option><option value="SERVICE">Service</option><option value="RAW_MATERIAL">Raw material</option><option value="FINISHED_GOOD">Finished good</option><option value="SEMI_FINISHED_GOOD">Semi-finished good</option><option value="CONSUMABLE">Consumable</option><option value="ASSET">Asset</option></select></label>
        <label>Item group<input name="itemGroup" /></label>
        <label>Base UOM<select name="baseUomId" required><option value="">Select UOM</option>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code} - {uom.name}</option>)}</select></label>
        <label>Sales UOM<select name="salesUomId"><option value="">Use base UOM</option>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code} - {uom.name}</option>)}</select></label>
        <label>Purchase UOM<select name="purchaseUomId"><option value="">Use base UOM</option>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code} - {uom.name}</option>)}</select></label>
        <label>Standard cost<input name="standardCost" type="number" min="0" step="0.01" /></label>
        <label>Selling price<input name="sellingPrice" type="number" min="0" step="0.01" /></label>
        <label>Currency<input name="currency" defaultValue="INR" maxLength={3} /></label>
        <label>HSN/SAC<input name="hsnSacCode" /></label>
        <label>Status<select name="status" defaultValue="ACTIVE"><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <label><input name="isStockItem" type="checkbox" defaultChecked /> Stock item</label>
        <label><input name="isSalesItem" type="checkbox" defaultChecked /> Sales item</label>
        <label><input name="isPurchaseItem" type="checkbox" defaultChecked /> Purchase item</label>
        <label><input name="isManufacturingItem" type="checkbox" /> Manufacturing item</label>
        <label className="full">Description<textarea name="description" rows={4} /></label>
        <div className="full form-actions"><button type="submit">Create item</button></div>
      </form>
    </main>
  );
}
