import type { Router } from "express";
import { costCentersController } from "./controller";
import { manifest } from "./manifest";

export function registerCostCentersRoutes(router: Router) {
  router.get(manifest.routeBase, costCentersController.list);
  router.post(manifest.routeBase, costCentersController.create);
  router.patch(`${manifest.routeBase}/:id`, costCentersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, costCentersController.transition);
}
