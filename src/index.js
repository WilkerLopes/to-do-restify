import restify from "restify";
import { env } from "./settings/environment.js";
import { connectMongoDb } from "./settings/connect.db.js";
import { loadRoutes } from "./routes.js";

async function bootstrap() {
  const app = restify.createServer();

  app.use(restify.plugins.queryParser());
  app.use(restify.plugins.bodyParser());

  try {
    await connectMongoDb();
  } catch (err) {
    console.error(`Erro ao conectar com o banco de dados | ${err}`);
    process.exit(1);
  }

  try {
    await loadRoutes(app);
  } catch (err) {
    console.error(`Erro ao carregar rotas | ${err}`);
    process.exit(1);
  }

  try {
    app.listen(env.PORT, () => {
      console.log(`Servidor rodando na porta: ${env.PORT}`);
    });
  } catch (err) {
    console.error(`Erro ao iniciar o servidor | ${err}`);
    process.exit(1);
  }
}

bootstrap();
