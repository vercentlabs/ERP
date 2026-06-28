import type { Router } from "express";
import { packingController } from "./controller";
import { manifest } from "./manifest";

export function registerPackingRoutes(router: Router) {
  router.get(manifest.routeBase, packingController.list);
  router.post(manifest.routeBase, packingController.create);
  router.patch(`${manifest.routeBase}/:id`, packingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, packingController.transition);
}
