import type { Router } from "express";
import { assetPerformanceController } from "./controller";
import { manifest } from "./manifest";

export function registerAssetPerformanceRoutes(router: Router) {
  router.get(manifest.routeBase, assetPerformanceController.list);
  router.post(manifest.routeBase, assetPerformanceController.create);
  router.patch(`${manifest.routeBase}/:id`, assetPerformanceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, assetPerformanceController.transition);
}
