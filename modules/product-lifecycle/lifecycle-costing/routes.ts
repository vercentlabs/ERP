import type { Router } from "express";
import { lifecycleCostingController } from "./controller";
import { manifest } from "./manifest";

export function registerLifecycleCostingRoutes(router: Router) {
  router.get(manifest.routeBase, lifecycleCostingController.list);
  router.post(manifest.routeBase, lifecycleCostingController.create);
  router.patch(`${manifest.routeBase}/:id`, lifecycleCostingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, lifecycleCostingController.transition);
}
