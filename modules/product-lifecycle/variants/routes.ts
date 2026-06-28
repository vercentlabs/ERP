import type { Router } from "express";
import { variantsController } from "./controller";
import { manifest } from "./manifest";

export function registerVariantsRoutes(router: Router) {
  router.get(manifest.routeBase, variantsController.list);
  router.post(manifest.routeBase, variantsController.create);
  router.patch(`${manifest.routeBase}/:id`, variantsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, variantsController.transition);
}
