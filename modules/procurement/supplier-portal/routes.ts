import type { Router } from "express";
import { supplierPortalController } from "./controller";
import { manifest } from "./manifest";

export function registerSupplierPortalRoutes(router: Router) {
  router.get(manifest.routeBase, supplierPortalController.list);
  router.post(manifest.routeBase, supplierPortalController.create);
  router.patch(`${manifest.routeBase}/:id`, supplierPortalController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, supplierPortalController.transition);
}
