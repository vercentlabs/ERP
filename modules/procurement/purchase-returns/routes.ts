import type { Router } from "express";
import { purchaseReturnsController } from "./controller";
import { manifest } from "./manifest";

export function registerPurchaseReturnsRoutes(router: Router) {
  router.get(manifest.routeBase, purchaseReturnsController.list);
  router.post(manifest.routeBase, purchaseReturnsController.create);
  router.patch(`${manifest.routeBase}/:id`, purchaseReturnsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, purchaseReturnsController.transition);
}
