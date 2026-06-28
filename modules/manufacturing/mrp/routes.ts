import type { Router } from "express";
import { mrpController } from "./controller";
import { manifest } from "./manifest";

export function registerMrpRoutes(router: Router) {
  router.get(manifest.routeBase, mrpController.list);
  router.post(manifest.routeBase, mrpController.create);
  router.patch(`${manifest.routeBase}/:id`, mrpController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, mrpController.transition);
}
