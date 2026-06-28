import type { Router } from "express";
import { routingsController } from "./controller";
import { manifest } from "./manifest";

export function registerRoutingsRoutes(router: Router) {
  router.get(manifest.routeBase, routingsController.list);
  router.post(manifest.routeBase, routingsController.create);
  router.patch(`${manifest.routeBase}/:id`, routingsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, routingsController.transition);
}
