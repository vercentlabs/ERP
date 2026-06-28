import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listStockBalances } from "../../../features/inventory/stock/api";

export default async function InventoryStockPage({ searchParams }: { searchParams?: { itemId?: string; warehouseId?: string } }) {
  const balances = await listStockBalances({ itemId: searchParams?.itemId, warehouseId: searchParams?.warehouseId, pageSize: "50" });
  return (
    <main className="page-shell">
      <ModuleHeader title="Stock Balances" eyebrow="Inventory" description="Current on-hand, reserved, and available inventory." />
      <section className="toolbar">
        <form className="filter-row">
          <input name="itemId" placeholder="Item id" defaultValue={searchParams?.itemId ?? ""} />
          <input name="warehouseId" placeholder="Warehouse id" defaultValue={searchParams?.warehouseId ?? ""} />
          <button type="submit">Filter</button>
        </form>
        <Link className="button" href="/inventory/opening-stock/new">Opening stock</Link>
        <Link className="button" href="/inventory/stock/adjustments/new">Adjustment</Link>
      </section>
      <section className="table-panel">
        <table><thead><tr><th>Item</th><th>Warehouse</th><th>Bin</th><th>On hand</th><th>Reserved</th><th>Available</th><th>Value</th></tr></thead>
          <tbody>{balances.rows.map((row) => <tr key={row.id}><td>{row.itemId}</td><td>{row.warehouseId}</td><td>{row.binId ?? "-"}</td><td>{row.quantityOnHand}</td><td>{row.quantityReserved}</td><td>{row.quantityAvailable}</td><td>{row.stockValue ?? "-"}</td></tr>)}</tbody>
        </table>
      </section>
    </main>
  );
}
