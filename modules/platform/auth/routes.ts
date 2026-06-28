import type { Router } from "express";
import { authController } from "./controller";
import { manifest } from "./manifest";

export function registerAuthRoutes(router: Router) {
  router.get(manifest.routeBase, authController.list);
  router.post(manifest.routeBase, authController.create);
  router.patch(`${manifest.routeBase}/:id`, authController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, authController.transition);
}
