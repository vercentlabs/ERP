import type { Router } from "express";
import { complianceDisclosuresController } from "./controller";
import { manifest } from "./manifest";

export function registerComplianceDisclosuresRoutes(router: Router) {
  router.get(manifest.routeBase, complianceDisclosuresController.list);
  router.post(manifest.routeBase, complianceDisclosuresController.create);
  router.patch(`${manifest.routeBase}/:id`, complianceDisclosuresController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, complianceDisclosuresController.transition);
}
