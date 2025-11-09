export default function ProductItem({
    product,
    onDelete,
  }: {
    product: any;
    onDelete: (id: string) => void;
  }) {
    return (
      <li style={{ marginBottom: "0.5rem" }}>
        <strong>{product.name}</strong> — Rp{product.price.toLocaleString()}{" "}
        {product.category && <em>({product.stock})</em>}
        <button
          onClick={() => onDelete(product.id)}
          style={{ marginLeft: "1rem", color: "red" }}
        >
          Hapus
        </button>
      </li>
    );
  }
  