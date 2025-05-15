import { useState } from "react";
import { TopBar, TopLink, PageTitle } from "../Style.styled";
import ProductList from "../ProductList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function Home() {
  const [view, setView] = useState("default"); // "add" or "edit" or "default"
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const refreshProductList = () => setRefreshFlag(prev => !prev);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setView("edit");
  };

  const handleDelete = async (product_id) => {
    try {
      await fetch("/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id }),
      });
      refreshProductList();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
  return (
    <>
      <TopBar>
        <TopLink href="/" onClick={(e) => { e.preventDefault(); setView("default"); setSelectedProduct(null); }}>
          Home
        </TopLink>
        <TopLink href="/new" onClick={(e) => { e.preventDefault(); setView("add"); setSelectedProduct(null); }}>
          Add New Product
        </TopLink>
      </TopBar>

      <PageTitle>Product Catalog from Database</PageTitle>

      {/* Form appears above product list */}
      {view === "add" && (
        <AddProduct
          onSuccess={() => {
            refreshProductList();
            setView("default");
          }}
          onCancel={() => {
            setView("default");
            setSelectedProduct(null);
          }}
        />
      )}

      {view === "edit" && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onSuccess={() => {
            refreshProductList();
            setView("default");
            setSelectedProduct(null);
          }}
          onCancel={() => {
            setView("default");
            setSelectedProduct(null);
          }}
        />
      )}

      <ProductList refresh={refreshFlag} onEdit={handleEdit} onDelete={handleDelete}/>
    </>
  );
}

export default Home;
