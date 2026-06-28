import type { Router } from "express";
import { dataWarehouseController } from "./controller";
import { manifest } from "./manifest";

export function registerDataWarehouseRoutes(router: Router) {
  router.get(manifest.routeBase, dataWarehouseController.list);
  router.post(manifest.routeBase, dataWarehouseController.create);
  router.patch(`${manifest.routeBase}/:id`, dataWarehouseController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dataWarehouseController.transition);
}
