import type { Router } from "express";
import { embeddedAnalyticsController } from "./controller";
import { manifest } from "./manifest";

export function registerEmbeddedAnalyticsRoutes(router: Router) {
  router.get(manifest.routeBase, embeddedAnalyticsController.list);
  router.post(manifest.routeBase, embeddedAnalyticsController.create);
  router.patch(`${manifest.routeBase}/:id`, embeddedAnalyticsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, embeddedAnalyticsController.transition);
}
