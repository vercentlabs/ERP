import type { Router } from "express";
import { dataLakeController } from "./controller";
import { manifest } from "./manifest";

export function registerDataLakeRoutes(router: Router) {
  router.get(manifest.routeBase, dataLakeController.list);
  router.post(manifest.routeBase, dataLakeController.create);
  router.patch(`${manifest.routeBase}/:id`, dataLakeController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dataLakeController.transition);
}
