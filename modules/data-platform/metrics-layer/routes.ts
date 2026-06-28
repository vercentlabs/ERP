import type { Router } from "express";
import { metricsLayerController } from "./controller";
import { manifest } from "./manifest";

export function registerMetricsLayerRoutes(router: Router) {
  router.get(manifest.routeBase, metricsLayerController.list);
  router.post(manifest.routeBase, metricsLayerController.create);
  router.patch(`${manifest.routeBase}/:id`, metricsLayerController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, metricsLayerController.transition);
}
