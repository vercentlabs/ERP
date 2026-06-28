import type { Router } from "express";
import { wavesController } from "./controller";
import { manifest } from "./manifest";

export function registerWavesRoutes(router: Router) {
  router.get(manifest.routeBase, wavesController.list);
  router.post(manifest.routeBase, wavesController.create);
  router.patch(`${manifest.routeBase}/:id`, wavesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, wavesController.transition);
}
