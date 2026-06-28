import type { Router } from "express";
import { locationsController } from "./controller";
import { manifest } from "./manifest";

export function registerLocationsRoutes(router: Router) {
  router.get(manifest.routeBase, locationsController.list);
  router.post(manifest.routeBase, locationsController.create);
  router.patch(`${manifest.routeBase}/:id`, locationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, locationsController.transition);
}
