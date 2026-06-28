import type { Router } from "express";
import { returnsController } from "./controller";
import { manifest } from "./manifest";

export function registerReturnsRoutes(router: Router) {
  router.get(manifest.routeBase, returnsController.list);
  router.post(manifest.routeBase, returnsController.create);
  router.patch(`${manifest.routeBase}/:id`, returnsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, returnsController.transition);
}
