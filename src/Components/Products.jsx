import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api/axios";
import Logout from "./Logout";

function Products() {
  const [products, setProducts] = useState([]);
  const priv = localStorage.getItem("priv");

  useEffect(() => {
    api.get("/apiProducts")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <Logout />

      {priv === "A" && <Link to="/product/add">Add Product</Link>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Picture</th>
            <th>Show</th>
            {priv === "A" && <th>Edit</th>}
            {priv === "A" && <th>Delete</th>}
          </tr>
        </thead>

        <tbody>
          {products.map(
            ({ id, name, description, price, type, category, pdDate, picture }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{description}</td>
                <td>{price}</td>
                <td>{type}</td>
                <td>{category}</td>
                <td>{pdDate}</td>
                <td>
                  {picture ? (
                    <img
                      src={picture}
                      alt={name}
                      width="60"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>

                <td>
                  <Link to={`/product/show/${id}`}>
                    <img src="show.png" width="30" alt="show" />
                  </Link>
                </td>

                {priv === "A" && (
                  <td>
                    <Link to={`/product/edit/${id}`}>
                      <img src="editicon.png" width="30" alt="edit" />
                    </Link>
                  </td>
                )}

                {priv === "A" && (
                  <td>
                    <Link to={`/product/delete/${id}`}>
                      <img src="deleteicone.png" width="30" alt="delete" />
                    </Link>
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
