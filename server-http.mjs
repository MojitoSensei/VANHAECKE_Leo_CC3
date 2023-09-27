import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    const urlSegments = request.url.split("/");
    switch (urlSegments[1]) {
      case "":
      case "index.html":
        response.writeHead(200);
        return response.end(contents);
      case "random":
        const nb = parseInt(urlSegments[2]);
        if (!isNaN(nb)) {
          const randomNumbers = generateRandomNumbers(nb);
          response.writeHead(200);
          return response.end(`<html><p>${randomNumbers.join("<br>")}</p></html>`);
        }
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

function generateRandomNumbers(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(100 * Math.random()));
  }
  return randomNumbers;
}



const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Le serveur est en cours d'exécution sur http://${host}:${port}`);
});

console.log("NODE_ENV =", process.env.NODE_ENV);
