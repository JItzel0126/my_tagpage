// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import BoardList from "./assets/pages/BoardList";
import NavBar from "./assets/components/NavBar";
import DesignExam from "./assets/pages/DesignExam";
import PracticePage from "./assets/pages/PracticePage";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board" element={<BoardList />} />
        {/* <Route path="/boards/new" element={<BoardNew />} /> */}
        {/* <Route path="/boards/:id" element={<BoardDetail />} /> */}
        {/* <Route path="/boards/:id/edit" element={<BoardEdit />} /> */}
        <Route path="/practice" element={<DesignExam />} />
        <Route path="/practice/:id" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}