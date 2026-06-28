import type { Router } from "express";
import { dataQualityController } from "./controller";
import { manifest } from "./manifest";

export function registerDataQualityRoutes(router: Router) {
  router.get(manifest.routeBase, dataQualityController.list);
  router.post(manifest.routeBase, dataQualityController.create);
  router.patch(`${manifest.routeBase}/:id`, dataQualityController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dataQualityController.transition);
}
