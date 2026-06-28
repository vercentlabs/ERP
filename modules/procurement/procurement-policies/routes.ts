import type { Router } from "express";
import { procurementPoliciesController } from "./controller";
import { manifest } from "./manifest";

export function registerProcurementPoliciesRoutes(router: Router) {
  router.get(manifest.routeBase, procurementPoliciesController.list);
  router.post(manifest.routeBase, procurementPoliciesController.create);
  router.patch(`${manifest.routeBase}/:id`, procurementPoliciesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, procurementPoliciesController.transition);
}
