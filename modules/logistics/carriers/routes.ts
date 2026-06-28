import type { Router } from "express";
import { carriersController } from "./controller";
import { manifest } from "./manifest";

export function registerCarriersRoutes(router: Router) {
  router.get(manifest.routeBase, carriersController.list);
  router.post(manifest.routeBase, carriersController.create);
  router.patch(`${manifest.routeBase}/:id`, carriersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, carriersController.transition);
}
