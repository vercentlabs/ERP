import type { Router } from "express";
import { slasController } from "./controller";
import { manifest } from "./manifest";

export function registerSlasRoutes(router: Router) {
  router.get(manifest.routeBase, slasController.list);
  router.post(manifest.routeBase, slasController.create);
  router.patch(`${manifest.routeBase}/:id`, slasController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, slasController.transition);
}
