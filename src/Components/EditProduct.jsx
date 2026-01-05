import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/axios";   

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get(`/apiProducts/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.error(err));
    api.get("/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("type", product.type);
    formData.append("pdDate", product.pdDate);
    formData.append("CatID", product.CatID);

    if (image) {
      formData.append("picture", image);
    }

    api
      .post(`/apiProducts/${id}?_method=PUT`, formData)
      .then(() => navigate("/products"))
      .catch((err) => console.error(err));
  };

  if (!product) return null;

  return (
    <div style={styles.card}>
      <h2 style={{ textAlign: "center" }}>Edit Product</h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {product.picture && (
          <img
            src={product.picture}
            alt={product.name}
            style={styles.image}
          />
        )}
      </div>

      <form onSubmit={update} style={styles.form}>
        <div>
          <label>ID</label>
          <input value={product.id} disabled />
        </div>

        <div>
          <label>Name</label>
          <input
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />
        </div>

        <div>
          <label>Description</label>
          <input
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />
        </div>

        <div>
          <label>Type</label>
          <select
            value={product.type}
            onChange={(e) =>
              setProduct({ ...product, type: e.target.value })
            }
          >
            <option value="Unit">Unit</option>
            <option value="Weight">Weight</option>
          </select>
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            value={product.pdDate}
            onChange={(e) =>
              setProduct({ ...product, pdDate: e.target.value })
            }
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={product.CatID}
            onChange={(e) =>
              setProduct({ ...product, CatID: e.target.value })
            }
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Change Picture</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div style={styles.actions}>
          <button type="submit">Update</button><br />
          <Link to="/products">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    background: "#fff",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  image: {
    width: "220px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  actions: {
    gridColumn: "1 / -1",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default EditProduct;
