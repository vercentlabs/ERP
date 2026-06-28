import type { Router } from "express";
import { warehousesController } from "./controller";
import { manifest } from "./manifest";

export function registerWarehousesRoutes(router: Router) {
  router.get(manifest.routeBase, warehousesController.list);
  router.post(manifest.routeBase, warehousesController.create);
  router.patch(`${manifest.routeBase}/:id`, warehousesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, warehousesController.transition);
}
