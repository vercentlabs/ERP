import type { Router } from "express";
import { resourcePlanningController } from "./controller";
import { manifest } from "./manifest";

export function registerResourcePlanningRoutes(router: Router) {
  router.get(manifest.routeBase, resourcePlanningController.list);
  router.post(manifest.routeBase, resourcePlanningController.create);
  router.patch(`${manifest.routeBase}/:id`, resourcePlanningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, resourcePlanningController.transition);
}
