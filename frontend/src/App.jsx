import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import BoardPage from "./assets/pages/BoardPage";
import NavBar from "./assets/components/NavBar";
import DesignExam from "./assets/pages/DesignExam";
import PracticePage from "./assets/pages/PracticePage";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/practice" element={<DesignExam />} />
        <Route path="/practice/:id" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}