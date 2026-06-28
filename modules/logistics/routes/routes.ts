import type { Router } from "express";
import { routesController } from "./controller";
import { manifest } from "./manifest";

export function registerRoutesRoutes(router: Router) {
  router.get(manifest.routeBase, routesController.list);
  router.post(manifest.routeBase, routesController.create);
  router.patch(`${manifest.routeBase}/:id`, routesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, routesController.transition);
}
