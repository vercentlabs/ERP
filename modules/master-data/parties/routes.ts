import type { Router } from "express";
import { partiesController } from "./controller";
import { manifest } from "./manifest";

export function registerPartiesRoutes(router: Router) {
  router.get(manifest.routeBase, partiesController.list);
  router.post(manifest.routeBase, partiesController.create);
  router.patch(`${manifest.routeBase}/:id`, partiesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, partiesController.transition);
}
