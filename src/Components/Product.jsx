import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api/axios"; 

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/apiProducts/${id}`)   
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!product) return null;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        {product.name}
      </h2>

      {product.picture && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={product.picture}
            alt={product.name}
            style={{
              width: "320px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td><b>Description</b></td>
            <td>{product.description}</td>
          </tr>
          <tr>
            <td><b>Price</b></td>
            <td>{product.price} DA</td>
          </tr>
          <tr>
            <td><b>Type</b></td>
            <td>{product.type}</td>
          </tr>
          <tr>
            <td><b>Category</b></td>
            <td>{product.category}</td>
          </tr>
          <tr>
            <td><b>Date</b></td>
            <td>{product.pdDate}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          ⬅ Back to Products
        </Link>
      </div>
    </div>
  );
}

export default Product;
