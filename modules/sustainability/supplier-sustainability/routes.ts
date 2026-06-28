import type { Router } from "express";
import { supplierSustainabilityController } from "./controller";
import { manifest } from "./manifest";

export function registerSupplierSustainabilityRoutes(router: Router) {
  router.get(manifest.routeBase, supplierSustainabilityController.list);
  router.post(manifest.routeBase, supplierSustainabilityController.create);
  router.patch(`${manifest.routeBase}/:id`, supplierSustainabilityController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, supplierSustainabilityController.transition);
}
