import type { Router } from "express";
import { supplierScorecardsController } from "./controller";
import { manifest } from "./manifest";

export function registerSupplierScorecardsRoutes(router: Router) {
  router.get(manifest.routeBase, supplierScorecardsController.list);
  router.post(manifest.routeBase, supplierScorecardsController.create);
  router.patch(`${manifest.routeBase}/:id`, supplierScorecardsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, supplierScorecardsController.transition);
}
