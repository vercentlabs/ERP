import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getItemStats, listItems, type ListParams } from "../../../features/master-data/api";

type PageProps = { searchParams?: ListParams };

export default async function ItemsPage({ searchParams = {} }: PageProps) {
  const [items, stats] = await Promise.all([listItems(searchParams), getItemStats()]);

  return (
    <main className="page-shell">
      <ModuleHeader title="Items" eyebrow="Master Data" description="Item master records for stock, sales, purchase, and manufacturing references." actions={<Link className="vercent-button" href="/master-data/items/new">Create item</Link>} />
      <section className="grid-panel">
        <article className="metric-card"><span>Total items</span><strong>{stats.total}</strong></article>
        <article className="metric-card"><span>Active</span><strong>{stats.byStatus.ACTIVE}</strong></article>
        <article className="metric-card"><span>Stock items</span><strong>{stats.stockItems}</strong></article>
        <article className="metric-card"><span>Services</span><strong>{stats.serviceItems}</strong></article>
      </section>
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search name, SKU, HSN/SAC" defaultValue={searchParams.search ?? ""} />
        <select name="type" defaultValue={searchParams.type ?? ""}><option value="">All types</option><option value="PRODUCT">Product</option><option value="SERVICE">Service</option><option value="RAW_MATERIAL">Raw material</option><option value="FINISHED_GOOD">Finished good</option><option value="SEMI_FINISHED_GOOD">Semi-finished good</option><option value="CONSUMABLE">Consumable</option><option value="ASSET">Asset</option></select>
        <select name="status" defaultValue={searchParams.status ?? ""}><option value="">All statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select>
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>Item</th><th>Type</th><th>Group</th><th>Pricing</th><th>Flags</th><th>Status</th></tr></thead>
          <tbody>
            {items.rows.map((item) => (
              <tr key={item.id}>
                <td><Link href={`/master-data/items/${item.id}`}><strong>{item.name}</strong><span>{item.itemNumber}{item.sku ? ` / ${item.sku}` : ""}</span></Link></td>
                <td>{item.itemType}</td>
                <td>{item.itemGroup ?? "-"}</td>
                <td>{item.sellingPrice ? `${item.currency} ${item.sellingPrice.toLocaleString("en-IN")}` : "-"}</td>
                <td>{[item.isStockItem ? "Stock" : "", item.isSalesItem ? "Sales" : "", item.isPurchaseItem ? "Purchase" : ""].filter(Boolean).join(", ") || "-"}</td>
                <td><span className="vercent-status">{item.status}</span></td>
              </tr>
            ))}
            {items.rows.length === 0 ? <tr><td colSpan={6}>No items found.</td></tr> : null}
          </tbody>
        </table>
      </section>
    </main>
  );
}
