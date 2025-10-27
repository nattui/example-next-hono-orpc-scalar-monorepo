import { defineConfig } from "tsdown"

/**
 * On Vercel
 *   Project Settings
 *   Build and Deployment
 *   Framework Settings
 *   Output Directory
 *   Override -> dist
 */
export default defineConfig({
  clean: false,
  dts: true,
  entry: "src/app.ts",
  format: "esm",
  noExternal: "db",
})
