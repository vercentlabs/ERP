import type { Router } from "express";
import { capacityPlanningController } from "./controller";
import { manifest } from "./manifest";

export function registerCapacityPlanningRoutes(router: Router) {
  router.get(manifest.routeBase, capacityPlanningController.list);
  router.post(manifest.routeBase, capacityPlanningController.create);
  router.patch(`${manifest.routeBase}/:id`, capacityPlanningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, capacityPlanningController.transition);
}
