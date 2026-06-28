import type { Router } from "express";
import { complianceDocumentsController } from "./controller";
import { manifest } from "./manifest";

export function registerComplianceDocumentsRoutes(router: Router) {
  router.get(manifest.routeBase, complianceDocumentsController.list);
  router.post(manifest.routeBase, complianceDocumentsController.create);
  router.patch(`${manifest.routeBase}/:id`, complianceDocumentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, complianceDocumentsController.transition);
}
