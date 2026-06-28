import type { Router } from "express";
import { dataMartsController } from "./controller";
import { manifest } from "./manifest";

export function registerDataMartsRoutes(router: Router) {
  router.get(manifest.routeBase, dataMartsController.list);
  router.post(manifest.routeBase, dataMartsController.create);
  router.patch(`${manifest.routeBase}/:id`, dataMartsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dataMartsController.transition);
}
