import type { Router } from "express";
import { journalsController } from "./controller";
import { manifest } from "./manifest";

export function registerJournalsRoutes(router: Router) {
  router.get(manifest.routeBase, journalsController.list);
  router.post(manifest.routeBase, journalsController.create);
  router.patch(`${manifest.routeBase}/:id`, journalsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, journalsController.transition);
}
