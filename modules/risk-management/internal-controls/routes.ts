import type { Router } from "express";
import { internalControlsController } from "./controller";
import { manifest } from "./manifest";

export function registerInternalControlsRoutes(router: Router) {
  router.get(manifest.routeBase, internalControlsController.list);
  router.post(manifest.routeBase, internalControlsController.create);
  router.patch(`${manifest.routeBase}/:id`, internalControlsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, internalControlsController.transition);
}
