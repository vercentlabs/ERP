import type { Router } from "express";
import { consentManagementController } from "./controller";
import { manifest } from "./manifest";

export function registerConsentManagementRoutes(router: Router) {
  router.get(manifest.routeBase, consentManagementController.list);
  router.post(manifest.routeBase, consentManagementController.create);
  router.patch(`${manifest.routeBase}/:id`, consentManagementController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, consentManagementController.transition);
}
