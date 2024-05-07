// import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cartpages from "./pages/Cartpages";
import ItemsPage from "./pages/Itemspage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/items" element={<ItemsPage />} />/\ */}
          <Route path="/items" element={<ItemsPage/>}/>
          <Route path="/cart" element={<Cartpages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;