import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { listStockLedger } from "../../../../features/inventory/stock/api";

export default async function StockLedgerPage({ searchParams }: { searchParams?: { itemId?: string; warehouseId?: string; movementType?: string; postingDateFrom?: string; postingDateTo?: string } }) {
  const ledger = await listStockLedger({ ...searchParams, pageSize: "50" });
  return (
    <main className="page-shell">
      <ModuleHeader title="Stock Ledger" eyebrow="Inventory" description="Immutable stock movement history." />
      <section className="toolbar">
        <form className="filter-row">
          <input name="itemId" placeholder="Item id" defaultValue={searchParams?.itemId ?? ""} />
          <input name="warehouseId" placeholder="Warehouse id" defaultValue={searchParams?.warehouseId ?? ""} />
          <select name="movementType" defaultValue={searchParams?.movementType ?? ""}>
            <option value="">All movements</option>
            {["OPENING", "ADJUSTMENT_IN", "ADJUSTMENT_OUT", "TRANSFER_IN", "TRANSFER_OUT", "SALES_HOLD", "SALES_RELEASE", "SALES_ISSUE", "PURCHASE_RECEIPT", "MANUFACTURING_RECEIPT", "MANUFACTURING_ISSUE"].map((type) => <option key={type}>{type}</option>)}
          </select>
          <input type="date" name="postingDateFrom" defaultValue={searchParams?.postingDateFrom ?? ""} />
          <input type="date" name="postingDateTo" defaultValue={searchParams?.postingDateTo ?? ""} />
          <button type="submit">Filter</button>
        </form>
      </section>
      <section className="table-panel">
        <table><thead><tr><th>Entry</th><th>Date</th><th>Movement</th><th>Item</th><th>Warehouse</th><th>Bin</th><th>Qty</th><th>Value</th></tr></thead>
          <tbody>{ledger.rows.map((entry) => <tr key={entry.id}><td>{entry.entryNumber}</td><td>{entry.postingDate}</td><td>{entry.movementType}</td><td>{entry.itemId}</td><td>{entry.warehouseId}</td><td>{entry.binId ?? "-"}</td><td>{entry.quantity}</td><td>{entry.stockValue ?? "-"}</td></tr>)}</tbody>
        </table>
      </section>
    </main>
  );
}
