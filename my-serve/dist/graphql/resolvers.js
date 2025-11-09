import { supabase } from "../lib/supabase";
export const resolvers = {
    Query: {
        products: async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (error)
                throw new Error(error.message);
            return data;
        },
        productById: async (_, { id }) => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();
            if (error)
                throw new Error(error.message);
            return data;
        },
        users: async () => {
            const { data, error } = await supabase.from("users").select("*");
            if (error)
                throw new Error(error.message);
            return data;
        },
    },
    Mutation: {
        createUser: async (_, { name }) => {
            const { data, error } = await supabase.from("users").insert([{ name }]).select().single();
            if (error)
                throw new Error(error.message);
            return data;
        },
        createProduct: async (_, { input }) => {
            const { name, price, stock } = input;
            const { data, error } = await supabase
                .from("products")
                .insert([{ name, price, stock }])
                .select()
                .single();
            if (error)
                throw new Error(error.message);
            return data;
        },
        // 👇 fungsi baru untuk hapus produk
        deleteProduct: async (_, { id }) => {
            const { error } = await supabase.from("products").delete().eq("id", id);
            if (error)
                throw new Error(error.message);
            return true;
        },
    },
};
