import type { Router } from "express";
import { integrationsController } from "./controller";
import { manifest } from "./manifest";

export function registerIntegrationsRoutes(router: Router) {
  router.get(manifest.routeBase, integrationsController.list);
  router.post(manifest.routeBase, integrationsController.create);
  router.patch(`${manifest.routeBase}/:id`, integrationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, integrationsController.transition);
}
