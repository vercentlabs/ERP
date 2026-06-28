import type { Router } from "express";
import { purchaseContractsController } from "./controller";
import { manifest } from "./manifest";

export function registerPurchaseContractsRoutes(router: Router) {
  router.get(manifest.routeBase, purchaseContractsController.list);
  router.post(manifest.routeBase, purchaseContractsController.create);
  router.patch(`${manifest.routeBase}/:id`, purchaseContractsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, purchaseContractsController.transition);
}
