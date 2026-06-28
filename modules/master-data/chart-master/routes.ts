import type { Router } from "express";
import { chartMasterController } from "./controller";
import { manifest } from "./manifest";

export function registerChartMasterRoutes(router: Router) {
  router.get(manifest.routeBase, chartMasterController.list);
  router.post(manifest.routeBase, chartMasterController.create);
  router.patch(`${manifest.routeBase}/:id`, chartMasterController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, chartMasterController.transition);
}
