import express from "express";
import next from "next";
import { parse } from "url";
// import fileUpload from "express-fileupload";
import * as middlewares from "./middlewares";
import cors from "cors";
import api from "./api";
import Logger from "./core/logger";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const app = express();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = parseInt(process.env.PORT || "5000", 10);

//
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", api);

nextApp.prepare().then(() => {
  const users = [
    { id: "1", name: "Quan" },
    {
      id: "2",
      name: "ao",
    },
  ];

  app.get("/api/users", (_req, res) => {
    res.json({
      users,
    });
  });

  //
  app.use((req, res, _next) => {
    const parsedUrl = parse(req.url!, true);
    nextHandler(req, res, parsedUrl);
  });

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  app
    .listen(port, () => {
      Logger.info(
        `> Server listening at http://localhost:${port} as ${
          dev ? "development" : process.env.NODE_ENV
        }`,
        { label: "SERVER" }
      );
    })
    .on("error", (e) => Logger.error(e));

  // tslint:disable-next-line:no-console
});
