import type { Router } from "express";
import { stockLedgerController } from "./controller";
import { manifest } from "./manifest";

export function registerStockLedgerRoutes(router: Router) {
  router.get(manifest.routeBase, stockLedgerController.list);
  router.post(manifest.routeBase, stockLedgerController.create);
  router.patch(`${manifest.routeBase}/:id`, stockLedgerController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, stockLedgerController.transition);
}
