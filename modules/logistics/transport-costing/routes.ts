import type { Router } from "express";
import { transportCostingController } from "./controller";
import { manifest } from "./manifest";

export function registerTransportCostingRoutes(router: Router) {
  router.get(manifest.routeBase, transportCostingController.list);
  router.post(manifest.routeBase, transportCostingController.create);
  router.patch(`${manifest.routeBase}/:id`, transportCostingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, transportCostingController.transition);
}
