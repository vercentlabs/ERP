import type { Router } from "express";
import { downtimeController } from "./controller";
import { manifest } from "./manifest";

export function registerDowntimeRoutes(router: Router) {
  router.get(manifest.routeBase, downtimeController.list);
  router.post(manifest.routeBase, downtimeController.create);
  router.patch(`${manifest.routeBase}/:id`, downtimeController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, downtimeController.transition);
}
