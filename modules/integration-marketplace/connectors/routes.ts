import type { Router } from "express";
import { connectorsController } from "./controller";
import { manifest } from "./manifest";

export function registerConnectorsRoutes(router: Router) {
  router.get(manifest.routeBase, connectorsController.list);
  router.post(manifest.routeBase, connectorsController.create);
  router.patch(`${manifest.routeBase}/:id`, connectorsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, connectorsController.transition);
}
