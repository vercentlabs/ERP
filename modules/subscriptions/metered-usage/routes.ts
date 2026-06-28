import type { Router } from "express";
import { meteredUsageController } from "./controller";
import { manifest } from "./manifest";

export function registerMeteredUsageRoutes(router: Router) {
  router.get(manifest.routeBase, meteredUsageController.list);
  router.post(manifest.routeBase, meteredUsageController.create);
  router.patch(`${manifest.routeBase}/:id`, meteredUsageController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, meteredUsageController.transition);
}
