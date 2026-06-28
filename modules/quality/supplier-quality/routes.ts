import type { Router } from "express";
import { supplierQualityController } from "./controller";
import { manifest } from "./manifest";

export function registerSupplierQualityRoutes(router: Router) {
  router.get(manifest.routeBase, supplierQualityController.list);
  router.post(manifest.routeBase, supplierQualityController.create);
  router.patch(`${manifest.routeBase}/:id`, supplierQualityController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, supplierQualityController.transition);
}
