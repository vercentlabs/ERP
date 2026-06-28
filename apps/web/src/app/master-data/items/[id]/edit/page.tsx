import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateItemAction } from "../../../../../features/master-data/actions";
import { getItem, listUoms } from "../../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function EditItemPage({ params }: PageProps) {
  const [item, uoms] = await Promise.all([getItem(params.id), listUoms({ pageSize: "100", status: "ACTIVE" })]);
  const action = updateItemAction.bind(null, item.id);

  return (
    <main className="page-shell">
      <ModuleHeader title="Edit Item" eyebrow={item.itemNumber} description={`Update ${item.name}`} actions={<Link className="vercent-button secondary" href={`/master-data/items/${item.id}`}>Back to item</Link>} />
      <form action={action} className="vercent-form">
        <label>Name<input name="name" required defaultValue={item.name} /></label>
        <label>SKU<input name="sku" defaultValue={item.sku ?? ""} /></label>
        <label>Item type<select name="itemType" defaultValue={item.itemType}><option value="PRODUCT">Product</option><option value="SERVICE">Service</option><option value="RAW_MATERIAL">Raw material</option><option value="FINISHED_GOOD">Finished good</option><option value="SEMI_FINISHED_GOOD">Semi-finished good</option><option value="CONSUMABLE">Consumable</option><option value="ASSET">Asset</option></select></label>
        <label>Item group<input name="itemGroup" defaultValue={item.itemGroup ?? ""} /></label>
        <label>Base UOM<select name="baseUomId" required defaultValue={item.baseUomId}>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code} - {uom.name}</option>)}</select></label>
        <label>Sales UOM<select name="salesUomId" defaultValue={item.salesUomId ?? ""}><option value="">Use base UOM</option>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code} - {uom.name}</option>)}</select></label>
        <label>Purchase UOM<select name="purchaseUomId" defaultValue={item.purchaseUomId ?? ""}><option value="">Use base UOM</option>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code} - {uom.name}</option>)}</select></label>
        <label>Standard cost<input name="standardCost" type="number" min="0" step="0.01" defaultValue={item.standardCost ?? ""} /></label>
        <label>Selling price<input name="sellingPrice" type="number" min="0" step="0.01" defaultValue={item.sellingPrice ?? ""} /></label>
        <label>Currency<input name="currency" defaultValue={item.currency} maxLength={3} /></label>
        <label>HSN/SAC<input name="hsnSacCode" defaultValue={item.hsnSacCode ?? ""} /></label>
        <label>Status<select name="status" defaultValue={item.status}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <label><input name="isStockItem" type="checkbox" defaultChecked={item.isStockItem} /> Stock item</label>
        <label><input name="isSalesItem" type="checkbox" defaultChecked={item.isSalesItem} /> Sales item</label>
        <label><input name="isPurchaseItem" type="checkbox" defaultChecked={item.isPurchaseItem} /> Purchase item</label>
        <label><input name="isManufacturingItem" type="checkbox" defaultChecked={item.isManufacturingItem} /> Manufacturing item</label>
        <label className="full">Description<textarea name="description" rows={4} defaultValue={item.description ?? ""} /></label>
        <div className="full form-actions"><button type="submit">Save changes</button></div>
      </form>
    </main>
  );
}
