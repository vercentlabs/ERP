import type { Router } from "express";
import { purchaseRequisitionsController } from "./controller";
import { manifest } from "./manifest";

export function registerPurchaseRequisitionsRoutes(router: Router) {
  router.get(manifest.routeBase, purchaseRequisitionsController.list);
  router.post(manifest.routeBase, purchaseRequisitionsController.create);
  router.patch(`${manifest.routeBase}/:id`, purchaseRequisitionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, purchaseRequisitionsController.transition);
}
