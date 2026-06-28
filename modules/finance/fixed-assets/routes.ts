import type { Router } from "express";
import { fixedAssetsController } from "./controller";
import { manifest } from "./manifest";

export function registerFixedAssetsRoutes(router: Router) {
  router.get(manifest.routeBase, fixedAssetsController.list);
  router.post(manifest.routeBase, fixedAssetsController.create);
  router.patch(`${manifest.routeBase}/:id`, fixedAssetsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, fixedAssetsController.transition);
}
