import type { Router } from "express";
import { boardPacksController } from "./controller";
import { manifest } from "./manifest";

export function registerBoardPacksRoutes(router: Router) {
  router.get(manifest.routeBase, boardPacksController.list);
  router.post(manifest.routeBase, boardPacksController.create);
  router.patch(`${manifest.routeBase}/:id`, boardPacksController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, boardPacksController.transition);
}
