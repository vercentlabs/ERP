import type { Router } from "express";
import { catalogController } from "./controller";
import { manifest } from "./manifest";

export function registerCatalogRoutes(router: Router) {
  router.get(manifest.routeBase, catalogController.list);
  router.post(manifest.routeBase, catalogController.create);
  router.patch(`${manifest.routeBase}/:id`, catalogController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, catalogController.transition);
}
