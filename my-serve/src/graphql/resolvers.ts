import { supabase } from "../lib/supabase.js";

export const resolvers = {
  Query: {
    products: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    productById: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    users: async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  },

  Mutation: {
    createUser: async (_: any, { name }: { name: string }) => {
      const { data, error } = await supabase.from("users").insert([{ name }]).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    createProduct: async (_: any, { input }: { input: { name: string; price: number; stock?:number, } }) => {
      const { name, price,  stock } = input;
      const { data, error } = await supabase
        .from("products")
        .insert([{ name, price, stock }])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

  // 👇 fungsi baru untuk hapus produk
  deleteProduct: async (_: any, { id }: { id: string }) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  },
  },
};
