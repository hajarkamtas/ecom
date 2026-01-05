import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "./api/axios";   

function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .delete(`/apiProducts/${id}`) 
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error(err);
        navigate("/products");
      });
  }, [id, navigate]);

  return null;
}

export default DeleteProduct