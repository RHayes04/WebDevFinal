import { useEffect, useState } from "react";
import axios from "axios";
import {
  ProductContainer,
  ProductCard,
  ProductImage,
  CardActions,
  IconButton
} from "./Style.styled";

function ProductList({ refresh, onEdit, onDelete }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const loadProducts = () => {
    axios.get("/products")
      .then(res => {
        setProducts(res.data.products || []);
        setError("");
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      });
  };

  useEffect(() => {
    loadProducts();
  }, [refresh]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <ProductContainer>
      {products.map(p => (
        <ProductCard key={p.product_id}>
          <ProductImage src={`http://localhost:3001${p.imageURL}`} alt={p.prod_name} />
          <h2>{p.prod_name}</h2>
          <p>Price: {p.price}</p>
          <p>{p.description}</p>

          <CardActions>
            <IconButton onClick={() => onEdit(p)} title="Edit Product">✏️</IconButton>
            <IconButton onClick={() => onDelete(p.product_id)} title="Delete Product">❌</IconButton>
          </CardActions>
        </ProductCard>
      ))}
    </ProductContainer>
  );
}


export default ProductList;
