import type { Router } from "express";
import { routePlanningController } from "./controller";
import { manifest } from "./manifest";

export function registerRoutePlanningRoutes(router: Router) {
  router.get(manifest.routeBase, routePlanningController.list);
  router.post(manifest.routeBase, routePlanningController.create);
  router.patch(`${manifest.routeBase}/:id`, routePlanningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, routePlanningController.transition);
}
