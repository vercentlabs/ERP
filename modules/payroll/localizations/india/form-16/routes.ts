import type { Router } from "express";
import { localizationsIndiaForm16Controller } from "./controller";
import { manifest } from "./manifest";

export function registerLocalizationsIndiaForm16Routes(router: Router) {
  router.get(manifest.routeBase, localizationsIndiaForm16Controller.list);
  router.post(manifest.routeBase, localizationsIndiaForm16Controller.create);
  router.patch(`${manifest.routeBase}/:id`, localizationsIndiaForm16Controller.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, localizationsIndiaForm16Controller.transition);
}
