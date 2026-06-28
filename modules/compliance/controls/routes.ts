import type { Router } from "express";
import { controlsController } from "./controller";
import { manifest } from "./manifest";

export function registerControlsRoutes(router: Router) {
  router.get(manifest.routeBase, controlsController.list);
  router.post(manifest.routeBase, controlsController.create);
  router.patch(`${manifest.routeBase}/:id`, controlsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, controlsController.transition);
}
