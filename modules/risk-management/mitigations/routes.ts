import type { Router } from "express";
import { mitigationsController } from "./controller";
import { manifest } from "./manifest";

export function registerMitigationsRoutes(router: Router) {
  router.get(manifest.routeBase, mitigationsController.list);
  router.post(manifest.routeBase, mitigationsController.create);
  router.patch(`${manifest.routeBase}/:id`, mitigationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, mitigationsController.transition);
}
