import type { Router } from "express";
import { scrapReworkController } from "./controller";
import { manifest } from "./manifest";

export function registerScrapReworkRoutes(router: Router) {
  router.get(manifest.routeBase, scrapReworkController.list);
  router.post(manifest.routeBase, scrapReworkController.create);
  router.patch(`${manifest.routeBase}/:id`, scrapReworkController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, scrapReworkController.transition);
}
