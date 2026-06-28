import type { Router } from "express";
import { manufacturingAnalyticsController } from "./controller";
import { manifest } from "./manifest";

export function registerManufacturingAnalyticsRoutes(router: Router) {
  router.get(manifest.routeBase, manufacturingAnalyticsController.list);
  router.post(manifest.routeBase, manufacturingAnalyticsController.create);
  router.patch(`${manifest.routeBase}/:id`, manufacturingAnalyticsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, manufacturingAnalyticsController.transition);
}
