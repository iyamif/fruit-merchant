import { gql, useMutation, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      category
      image_url
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

export default function ProductList() {
  const { data, loading, refetch } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } });
      await refetch(); // refresh data setelah delete
      alert("Produk berhasil dihapus!");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk!");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Daftar Produk</h2>
      {data?.products.map((p: any) => (
        <div key={p.id}>
          <span>
            {p.title} - Rp{p.price}
          </span>
          <button onClick={() => handleDelete(p.id)}>🗑️ Hapus</button>
        </div>
      ))}
    </div>
  );
}
