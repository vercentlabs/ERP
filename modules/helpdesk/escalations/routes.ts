import type { Router } from "express";
import { escalationsController } from "./controller";
import { manifest } from "./manifest";

export function registerEscalationsRoutes(router: Router) {
  router.get(manifest.routeBase, escalationsController.list);
  router.post(manifest.routeBase, escalationsController.create);
  router.patch(`${manifest.routeBase}/:id`, escalationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, escalationsController.transition);
}
