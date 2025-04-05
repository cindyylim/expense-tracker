import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import User from "./models/user.model.js";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import connectDB from "./db/connectDB.js";
import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

configurePassport();
// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (error) => {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // this option prevents the session from being saved to the store on every request
    saveUninitialized: false, // this option prevents uninitialized sessions from being saved to the store
    store: store, 
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true, // this option prevents Cross-Site Scripting (XSS) attacks
      secure: process.env.NODE_ENV === "production",
    }
  })
)

app.use(passport.initialize());
app.use(passport.session());

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (error) => {
    console.error("Apollo Server error:", error);
    return error;
  },
});

// Ensure we wait for our server to start
await server.start();

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/graphql",

  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: ({ req, res }) => buildContext({ req, res, User })
  })
);
// npm run build will build your frontend app, and it will the optimized version of your app
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
// Modified server startup
await connectDB();
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
