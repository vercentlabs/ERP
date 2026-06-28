import type { Router } from "express";
import { nonConformanceController } from "./controller";
import { manifest } from "./manifest";

export function registerNonConformanceRoutes(router: Router) {
  router.get(manifest.routeBase, nonConformanceController.list);
  router.post(manifest.routeBase, nonConformanceController.create);
  router.patch(`${manifest.routeBase}/:id`, nonConformanceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, nonConformanceController.transition);
}
