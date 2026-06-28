import type { Router } from "express";
import { salesOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerSalesOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, salesOrdersController.list);
  router.post(manifest.routeBase, salesOrdersController.create);
  router.get(`${manifest.routeBase}/stats`, salesOrdersController.stats);
  router.get(`${manifest.routeBase}/:id`, salesOrdersController.getById);
  router.patch(`${manifest.routeBase}/:id`, salesOrdersController.update);
  router.delete(`${manifest.routeBase}/:id`, salesOrdersController.softDelete);
  router.post(`${manifest.routeBase}/:id/status`, salesOrdersController.changeStatus);
  router.get(`${manifest.routeBase}/:id/lines`, salesOrdersController.getLines);
}
