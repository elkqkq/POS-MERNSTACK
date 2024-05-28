import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cartpages from "./pages/Cartpages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Itemspage from "./pages/Itemspage";
import Customerpage from "./pages/Customerpage";
import Billspage from "./pages/Billspage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } 
          />
          <Route 
          path="/items"
           element={
            <ProtectedRoute>
              <Itemspage />
            </ProtectedRoute>
          } 
          />
          <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cartpages />
            </ProtectedRoute>
          } 
          />
          <Route path="/bills" element={
            <ProtectedRoute>
              <Billspage />
            </ProtectedRoute>
          } />
          <Route path="/customers" element={
            <ProtectedRoute>
              <Customerpage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}