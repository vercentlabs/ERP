import type { Router } from "express";
import { customerAssetsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomerAssetsRoutes(router: Router) {
  router.get(manifest.routeBase, customerAssetsController.list);
  router.post(manifest.routeBase, customerAssetsController.create);
  router.patch(`${manifest.routeBase}/:id`, customerAssetsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customerAssetsController.transition);
}
