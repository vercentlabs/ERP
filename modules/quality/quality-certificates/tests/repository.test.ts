import { describe, expect, it } from "vitest";
import { manifest } from "../manifest";

describe("quality/quality-certificates repository", () => {
  it("is tenant-scoped and has a route base", () => {
    expect(manifest.tenantScoped).toBe(true);
    expect(manifest.routeBase).toContain("/api/");
  });
});
