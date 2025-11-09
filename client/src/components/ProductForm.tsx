import { useState } from "react";

export default function ProductForm({ onAdd }: { onAdd: (input: any) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, price: Number(price), category, stock: 0 });
    setName("");
    setPrice(0);
    setCategory("");
    setStock(0);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Tambah Produk</h2>
      <input
        placeholder="Nama produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Harga"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <input
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
       <input
        placeholder="Kategori"
        value={stock}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Tambah</button>
    </form>
  );
}
