import type { Router } from "express";
import { serviceAnalyticsController } from "./controller";
import { manifest } from "./manifest";

export function registerServiceAnalyticsRoutes(router: Router) {
  router.get(manifest.routeBase, serviceAnalyticsController.list);
  router.post(manifest.routeBase, serviceAnalyticsController.create);
  router.patch(`${manifest.routeBase}/:id`, serviceAnalyticsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, serviceAnalyticsController.transition);
}
