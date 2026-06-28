import type { Router } from "express";
import { cycleCountsController } from "./controller";
import { manifest } from "./manifest";

export function registerCycleCountsRoutes(router: Router) {
  router.get(manifest.routeBase, cycleCountsController.list);
  router.post(manifest.routeBase, cycleCountsController.create);
  router.patch(`${manifest.routeBase}/:id`, cycleCountsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, cycleCountsController.transition);
}
