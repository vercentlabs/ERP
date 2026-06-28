import type { Router } from "express";
import { purchaseOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerPurchaseOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, purchaseOrdersController.list);
  router.post(manifest.routeBase, purchaseOrdersController.create);
  router.patch(`${manifest.routeBase}/:id`, purchaseOrdersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, purchaseOrdersController.transition);
}
