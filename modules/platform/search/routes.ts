import type { Router } from "express";
import { searchController } from "./controller";
import { manifest } from "./manifest";

export function registerSearchRoutes(router: Router) {
  router.get(manifest.routeBase, searchController.list);
  router.post(manifest.routeBase, searchController.create);
  router.patch(`${manifest.routeBase}/:id`, searchController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, searchController.transition);
}
