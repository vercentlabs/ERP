import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getItem, getUom } from "../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function ItemDetailPage({ params }: PageProps) {
  const item = await getItem(params.id);
  const baseUom = await getUom(item.baseUomId);

  return (
    <main className="page-shell">
      <ModuleHeader title={item.name} eyebrow={item.itemNumber} description={item.description ?? item.itemType} actions={<Link className="vercent-button" href={`/master-data/items/${item.id}/edit`}>Edit</Link>} />
      <section className="vercent-detail-grid">
        <article>
          <h2>Item details</h2>
          <dl className="vercent-fields">
            <dt>Status</dt><dd><span className="vercent-status">{item.status}</span></dd>
            <dt>SKU</dt><dd>{item.sku ?? "-"}</dd>
            <dt>Type</dt><dd>{item.itemType}</dd>
            <dt>Group</dt><dd>{item.itemGroup ?? "-"}</dd>
            <dt>Base UOM</dt><dd>{baseUom.code} - {baseUom.name}</dd>
            <dt>Cost</dt><dd>{item.standardCost ? `${item.currency} ${item.standardCost.toLocaleString("en-IN")}` : "-"}</dd>
            <dt>Selling price</dt><dd>{item.sellingPrice ? `${item.currency} ${item.sellingPrice.toLocaleString("en-IN")}` : "-"}</dd>
            <dt>HSN/SAC</dt><dd>{item.hsnSacCode ?? "-"}</dd>
            <dt>Flags</dt><dd>{[item.isStockItem ? "Stock" : "", item.isSalesItem ? "Sales" : "", item.isPurchaseItem ? "Purchase" : "", item.isManufacturingItem ? "Manufacturing" : ""].filter(Boolean).join(", ") || "-"}</dd>
          </dl>
        </article>
      </section>
    </main>
  );
}
