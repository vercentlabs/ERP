import type { Router } from "express";
import { replenishmentTasksController } from "./controller";
import { manifest } from "./manifest";

export function registerReplenishmentTasksRoutes(router: Router) {
  router.get(manifest.routeBase, replenishmentTasksController.list);
  router.post(manifest.routeBase, replenishmentTasksController.create);
  router.patch(`${manifest.routeBase}/:id`, replenishmentTasksController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, replenishmentTasksController.transition);
}
