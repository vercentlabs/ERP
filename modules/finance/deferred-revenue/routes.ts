import type { Router } from "express";
import { deferredRevenueController } from "./controller";
import { manifest } from "./manifest";

export function registerDeferredRevenueRoutes(router: Router) {
  router.get(manifest.routeBase, deferredRevenueController.list);
  router.post(manifest.routeBase, deferredRevenueController.create);
  router.patch(`${manifest.routeBase}/:id`, deferredRevenueController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, deferredRevenueController.transition);
}
