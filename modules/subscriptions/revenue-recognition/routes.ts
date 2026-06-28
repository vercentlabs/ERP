import type { Router } from "express";
import { revenueRecognitionController } from "./controller";
import { manifest } from "./manifest";

export function registerRevenueRecognitionRoutes(router: Router) {
  router.get(manifest.routeBase, revenueRecognitionController.list);
  router.post(manifest.routeBase, revenueRecognitionController.create);
  router.patch(`${manifest.routeBase}/:id`, revenueRecognitionController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, revenueRecognitionController.transition);
}
