import type { Router } from "express";
import { mpsController } from "./controller";
import { manifest } from "./manifest";

export function registerMpsRoutes(router: Router) {
  router.get(manifest.routeBase, mpsController.list);
  router.post(manifest.routeBase, mpsController.create);
  router.patch(`${manifest.routeBase}/:id`, mpsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, mpsController.transition);
}
