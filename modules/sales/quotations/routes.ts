import type { Router } from "express";
import { quotationsController } from "./controller";
import { manifest } from "./manifest";

export function registerQuotationsRoutes(router: Router) {
  router.get(manifest.routeBase, quotationsController.list);
  router.post(manifest.routeBase, quotationsController.create);
  router.get(`${manifest.routeBase}/stats`, quotationsController.stats);
  router.get(`${manifest.routeBase}/:id`, quotationsController.getById);
  router.patch(`${manifest.routeBase}/:id`, quotationsController.update);
  router.delete(`${manifest.routeBase}/:id`, quotationsController.softDelete);
  router.post(`${manifest.routeBase}/:id/status`, quotationsController.changeStatus);
  router.get(`${manifest.routeBase}/:id/lines`, quotationsController.getLines);
}
