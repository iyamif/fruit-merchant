// App.tsx (TypeScript / React)
import React, { useState, type JSX } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./App.css";

interface Product {
  id: string;
  name: string;
  price: number;
  stock?: number;
  image_url?: string;
}

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      stock
      image_url
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      category
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export default function App(): JSX.Element {
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image_url: "",
  });

  // cart state: typed Product[]
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // CREATE PRODUCT
  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price) return alert("Lengkapi data");

    await createProduct({
      variables: {
        input: {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          category: newProduct.category,
        },
      },
    });

    setNewProduct({ name: "", price: "", category: "" , image_url: ""});
    refetch();
  };

  // DELETE PRODUCT (id typed)
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } });
      await refetch();
      alert("Produk berhasil dihapus!");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ADD TO CART (p typed)
  const addToCart = (p: Product) => {
    setCart((prev) => [...prev, p]); // now prev: Product[]
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>E-Commerce Productssss</h1>

      {/* Button buka keranjang */}
      <button style={styles.cartButton} onClick={() => setShowCart(true)}>
        Keranjang ({cart.length})
      </button>

      {/* FORM INPUT */}
      <div style={styles.form}>
        <input
          placeholder="Nama Produk"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Harga"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Kategori"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>
          Tambah Produk
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div style={styles.grid}>
        {data?.products?.map((p) => (
          <div key={p.id} style={styles.card}>
           <img
            src={p.image_url}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
            alt={p.name}
            />
            <div style={styles.content}>
              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.price}>Rp {p.price.toLocaleString()}</p>
              <p style={styles.stock}>Stock: {p.stock ?? 0}</p>

              <button onClick={() => addToCart(p)} style={styles.cartAdd}>
                + Keranjang
              </button>

              <button onClick={() => handleDelete(p.id)} style={styles.deleteButton}>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CART MODAL */}
      {showCart && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Keranjang</h2>

            {cart.length === 0 ? (
              <p>Keranjang kosong</p>
            ) : (
              cart.map((c, i) => (
                <div key={i} style={styles.cartItem}>
                  <span>{c.name}</span>
                  <span>Rp {c.price.toLocaleString()}</span>
                </div>
              ))
            )}

            <button onClick={() => setShowCart(false)} style={styles.closeModal}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* styles typed so TS accepts objectFit etc */
const styles: { [k: string]: React.CSSProperties } = {
  container: { padding: "2rem", fontFamily: "Arial" },
  title: { marginBottom: "1rem" },
  cartButton: {
    padding: "0.5rem 1rem",
    background: "#1E88E5",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  form: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem" },
  input: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #aaa",
  },
  addButton: {
    padding: "0.5rem 1rem",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: { width: "100%", height: "150px", objectFit: "cover" },
  content: { padding: "1rem" },
  name: { margin: 0, marginBottom: "0.5rem" },
  price: { margin: 0, fontWeight: "bold", marginBottom: "0.5rem" },
  stock: { margin: 0, marginBottom: "1rem", color: "#666" },
  cartAdd: {
    padding: "0.4rem 0.8rem",
    background: "#1976D2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  deleteButton: {
    padding: "0.4rem 0.8rem",
    background: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "2rem",
    borderRadius: "10px",
    width: "320px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
  closeModal: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    background: "#444",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};
