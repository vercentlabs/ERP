import type { Router } from "express";
import { incidentsController } from "./controller";
import { manifest } from "./manifest";

export function registerIncidentsRoutes(router: Router) {
  router.get(manifest.routeBase, incidentsController.list);
  router.post(manifest.routeBase, incidentsController.create);
  router.patch(`${manifest.routeBase}/:id`, incidentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, incidentsController.transition);
}
