import type { Router } from "express";
import { leadsController } from "./controller";
import { manifest } from "./manifest";

export function registerLeadsRoutes(router: Router) {
  router.get(manifest.routeBase, leadsController.list);
  router.post(manifest.routeBase, leadsController.create);
  router.get(`${manifest.routeBase}/stats`, leadsController.stats);
  router.get(`${manifest.routeBase}/:id`, leadsController.getById);
  router.patch(`${manifest.routeBase}/:id`, leadsController.update);
  router.delete(`${manifest.routeBase}/:id`, leadsController.softDelete);
  router.post(`${manifest.routeBase}/:id/status`, leadsController.changeStatus);
  router.post(`${manifest.routeBase}/:id/assign`, leadsController.assign);
  router.post(`${manifest.routeBase}/:id/convert`, leadsController.convert);
}
