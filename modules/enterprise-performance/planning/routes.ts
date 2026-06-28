import type { Router } from "express";
import { planningController } from "./controller";
import { manifest } from "./manifest";

export function registerPlanningRoutes(router: Router) {
  router.get(manifest.routeBase, planningController.list);
  router.post(manifest.routeBase, planningController.create);
  router.patch(`${manifest.routeBase}/:id`, planningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, planningController.transition);
}
