import express from "express";
import morgan from "morgan";
import createError from 'http-errors';

const host = "localhost";
const port = 8000;

const app = express();

if (app.get("env") === "development") app.use(morgan("dev"));

app.use(express.static("static"));

app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb, 10);

  // Vérifie si le paramètre n'est pas un nombre
  if (Number.isNaN(length)) {
    // Génère une erreur HTTP 400
    return next(createError(400, 'Invalid number'));
  }

  const numbers = Array.from({ length }).map(
    (_) => Math.floor(100 * Math.random())
  );
  const welcome = "Welcome to the Random Numbers Page";

  response.render("random", { numbers, welcome });
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);

app.set("view engine", "ejs");
