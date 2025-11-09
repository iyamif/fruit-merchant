import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

dotenv.config();

const app = express();

// ✅ Middleware HARUS SEBELUM Apollo
app.use(cors());
app.use(express.json());

// ✅ Buat instance Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Start server dan pasang middleware setelah json()
const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || null,
      }),
    })
  );

  app.use(cors({
    origin: ["https://fruit-merchantt-joo7-b6icapmy8.vercel.app"], // domain frontend Vercel
    credentials: true,
  }));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
