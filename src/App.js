import { BrowserRouter, Routes, Route } from "react-router-dom";
import Place from "./pages/Place";
import Tour from "./pages/Tour";
import Nav from "./pages/Nav";

export default function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
          
          <Route path="places" element={<Place />} />
          <Route path="tours" element={<Tour />} />
          <Route path="/" element={<Place />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

