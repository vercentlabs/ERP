import type { Router } from "express";
import { salesTargetsController } from "./controller";
import { manifest } from "./manifest";

export function registerSalesTargetsRoutes(router: Router) {
  router.get(manifest.routeBase, salesTargetsController.list);
  router.post(manifest.routeBase, salesTargetsController.create);
  router.patch(`${manifest.routeBase}/:id`, salesTargetsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, salesTargetsController.transition);
}
