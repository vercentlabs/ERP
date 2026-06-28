import type { Router } from "express";
import { anomalyDetectionController } from "./controller";
import { manifest } from "./manifest";

export function registerAnomalyDetectionRoutes(router: Router) {
  router.get(manifest.routeBase, anomalyDetectionController.list);
  router.post(manifest.routeBase, anomalyDetectionController.create);
  router.patch(`${manifest.routeBase}/:id`, anomalyDetectionController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, anomalyDetectionController.transition);
}
