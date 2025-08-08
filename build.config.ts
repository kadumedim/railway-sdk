import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index.ts"],
  clean: true,
  declaration: true,
  externals: ["graphql-request"],
  failOnWarn: false,
  sourcemap: true,
});