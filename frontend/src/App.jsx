import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import other pages like EditProduct when ready

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/edit/:id" element={<EditProduct />} /> */}
      </Routes>
    </Router>
  );
}

export default App;