import type { Router } from "express";
import { deduplicationController } from "./controller";
import { manifest } from "./manifest";

export function registerDeduplicationRoutes(router: Router) {
  router.get(manifest.routeBase, deduplicationController.list);
  router.post(manifest.routeBase, deduplicationController.create);
  router.patch(`${manifest.routeBase}/:id`, deduplicationController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, deduplicationController.transition);
}
