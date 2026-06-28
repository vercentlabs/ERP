import type { Router } from "express";
import { wholesaleDistributionController } from "./controller";
import { manifest } from "./manifest";

export function registerWholesaleDistributionRoutes(router: Router) {
  router.get(manifest.routeBase, wholesaleDistributionController.list);
  router.post(manifest.routeBase, wholesaleDistributionController.create);
  router.patch(`${manifest.routeBase}/:id`, wholesaleDistributionController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, wholesaleDistributionController.transition);
}
