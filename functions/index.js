const { onRequest } = require("firebase-functions/v2/https");
const server = require("next/dist/server/firebase-functions");

const nextApp = server.getServer({
  dir: __dirname + "/..",
});

exports.nextServer = onRequest(nextApp);
