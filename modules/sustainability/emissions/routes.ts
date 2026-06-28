import type { Router } from "express";
import { emissionsController } from "./controller";
import { manifest } from "./manifest";

export function registerEmissionsRoutes(router: Router) {
  router.get(manifest.routeBase, emissionsController.list);
  router.post(manifest.routeBase, emissionsController.create);
  router.patch(`${manifest.routeBase}/:id`, emissionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, emissionsController.transition);
}
