import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Products from "./Components/Products";
import Product from "./Components/Product";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import DeleteProduct from "./Components/DeleteProduct";
import NoMatch from "./Components/NoMatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/show/:id"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/add"
          element={
            <ProtectedRoute adminOnly>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/delete/:id"
          element={
            <ProtectedRoute adminOnly>
              <DeleteProduct />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
