import type { Router } from "express";
import { reservationsController } from "./controller";
import { manifest } from "./manifest";

export function registerReservationsRoutes(router: Router) {
  router.get(manifest.routeBase, reservationsController.list);
  router.post(manifest.routeBase, reservationsController.create);
  router.patch(`${manifest.routeBase}/:id`, reservationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, reservationsController.transition);
}
