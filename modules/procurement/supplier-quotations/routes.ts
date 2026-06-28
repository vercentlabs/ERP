import type { Router } from "express";
import { supplierQuotationsController } from "./controller";
import { manifest } from "./manifest";

export function registerSupplierQuotationsRoutes(router: Router) {
  router.get(manifest.routeBase, supplierQuotationsController.list);
  router.post(manifest.routeBase, supplierQuotationsController.create);
  router.patch(`${manifest.routeBase}/:id`, supplierQuotationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, supplierQuotationsController.transition);
}
