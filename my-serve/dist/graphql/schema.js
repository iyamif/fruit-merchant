import { gql } from "graphql-tag";
export const typeDefs = gql `
  # ============================
  # TYPE DEFINITIONS
  # ============================

  type User {
    id: ID!
    name: String!
    created_at: String
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    created_at: String
    stock: Int
    image_url: String
  }
  
  type Category {
    id: ID!
    name: String!
    created_at: String
  }

  # ============================
  # INPUT TYPES
  # ============================

  input CreateProductInput {
    name: String!
    price: Float!
    stock: Float
  }

  # ============================
  # QUERIES
  # ============================

  type Query {
    # ambil semua produk
    products: [Product!]!

    # ambil satu produk berdasarkan ID
    productById(id: ID!): Product

    # ambil semua user
    users: [User!]!
  }

  # ============================
  # MUTATIONS
  # ============================

  type Mutation {
    # buat user baru
    createUser(name: String!): User!

    # buat produk baru
    createProduct(input: CreateProductInput!): Product!

    # hapus produk berdasarkan ID
    deleteProduct(id: ID!): Boolean!
  }
`;
