import type { Router } from "express";
import { itemCategoriesController } from "./controller";
import { manifest } from "./manifest";

export function registerItemCategoriesRoutes(router: Router) {
  router.get(manifest.routeBase, itemCategoriesController.list);
  router.post(manifest.routeBase, itemCategoriesController.create);
  router.patch(`${manifest.routeBase}/:id`, itemCategoriesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, itemCategoriesController.transition);
}
