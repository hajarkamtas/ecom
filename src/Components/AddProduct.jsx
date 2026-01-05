import api from "./api/axios";  
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const save = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("type", e.target.type.value); 
    formData.append("CatID", e.target.CatID.value);
    formData.append("pdDate", e.target.pdDate.value);
    formData.append("picture", e.target.picture.files[0]);

    api
      .post("/apiProducts", formData)   
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={styles.card}>
      <h2 style={{ textAlign: "center" }}>Add Product</h2>

      <form onSubmit={save} encType="multipart/form-data" style={styles.form}>
        <div>
          <label>Name</label>
          <input name="name" required />
        </div>

        <div>
          <label>Description</label>
          <input name="description" required />
        </div>

        <div>
          <label>Price</label>
          <input name="price" type="number" required />
        </div>

        <div>
          <label>Type</label>
          <select name="type" required>
            <option value="U">Unit</option>
            <option value="W">Weight</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select name="CatID" required>
            <option value="1">Food</option>
            <option value="2">Electronics</option>
          </select>
        </div>

        <div>
          <label>Date</label>
          <input name="pdDate" type="date" required />
        </div>

        <div>
          <label>Picture</label>
          <input name="picture" type="file" required />
        </div>

        <div style={styles.actions}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    background: "#fff",
  },
  form: {
    display: "grid",
    gap: "15px",
  },
  actions: {
    textAlign: "center",
    marginTop: "20px",
  },
};

export default AddProduct;
