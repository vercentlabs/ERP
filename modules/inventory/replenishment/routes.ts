import type { Router } from "express";
import { replenishmentController } from "./controller";
import { manifest } from "./manifest";

export function registerReplenishmentRoutes(router: Router) {
  router.get(manifest.routeBase, replenishmentController.list);
  router.post(manifest.routeBase, replenishmentController.create);
  router.patch(`${manifest.routeBase}/:id`, replenishmentController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, replenishmentController.transition);
}
