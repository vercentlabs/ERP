import type { Router } from "express";
import { demandPlanningController } from "./controller";
import { manifest } from "./manifest";

export function registerDemandPlanningRoutes(router: Router) {
  router.get(manifest.routeBase, demandPlanningController.list);
  router.post(manifest.routeBase, demandPlanningController.create);
  router.patch(`${manifest.routeBase}/:id`, demandPlanningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, demandPlanningController.transition);
}
