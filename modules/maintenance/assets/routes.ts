import type { Router } from "express";
import { assetsController } from "./controller";
import { manifest } from "./manifest";

export function registerAssetsRoutes(router: Router) {
  router.get(manifest.routeBase, assetsController.list);
  router.post(manifest.routeBase, assetsController.create);
  router.patch(`${manifest.routeBase}/:id`, assetsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, assetsController.transition);
}
