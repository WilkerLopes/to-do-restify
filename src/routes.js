import _ from "lodash";
import fs from "fs";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export async function loadRoutes(server) {
  const routesPath = __dirname;
  try {
    var folders = await fs.readdirSync(routesPath, { withFileTypes: true, encoding: "utf-8" }).filter((folder) => folder.isDirectory());

    for (const folder of folders) {
      const files = await fs.readdirSync(`${routesPath}/${folder.name}`);

      for (const file of files) {
        if (file.endsWith(".route.js")) {
          const routeModule = await import(`./${folder.name}/${file}`);
          if (typeof routeModule.default === "function") {
            routeModule.default(server);
          }
        }
      }
    }

    const routes = server.router.getRoutes();
    console.log("Rotas carregadas:");
    for (const key in routes) {
      let route = routes[key];
      console.log(`[${route.method}] ${route.path}`);
    }
  } catch (err) {
    console.error(err);
  }
}
