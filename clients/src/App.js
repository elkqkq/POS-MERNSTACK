// import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemsPage from "./pages/Itemspage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;