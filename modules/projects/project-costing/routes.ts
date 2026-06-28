import type { Router } from "express";
import { projectCostingController } from "./controller";
import { manifest } from "./manifest";

export function registerProjectCostingRoutes(router: Router) {
  router.get(manifest.routeBase, projectCostingController.list);
  router.post(manifest.routeBase, projectCostingController.create);
  router.patch(`${manifest.routeBase}/:id`, projectCostingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, projectCostingController.transition);
}
