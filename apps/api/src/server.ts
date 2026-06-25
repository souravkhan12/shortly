import { app } from "./app.js";

app.get("/", async () => {
  return {
    message: "URL Shortener API",
  };
});

const start = async () => {
  try {
    await app.listen({
      host: "0.0.0.0",
      port: 3000,
    });

    console.log("🚀 Running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
