import type { Router } from "express";
import { performanceController } from "./controller";
import { manifest } from "./manifest";

export function registerPerformanceRoutes(router: Router) {
  router.get(manifest.routeBase, performanceController.list);
  router.post(manifest.routeBase, performanceController.create);
  router.patch(`${manifest.routeBase}/:id`, performanceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, performanceController.transition);
}
