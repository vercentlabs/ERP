import type { Router } from "express";
import { taxComplianceController } from "./controller";
import { manifest } from "./manifest";

export function registerTaxComplianceRoutes(router: Router) {
  router.get(manifest.routeBase, taxComplianceController.list);
  router.post(manifest.routeBase, taxComplianceController.create);
  router.patch(`${manifest.routeBase}/:id`, taxComplianceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, taxComplianceController.transition);
}
