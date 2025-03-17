import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import Placeholder from "./pages/Placeholder";
import NoPage from "./pages/NoPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./pages/Login";
// Simplify imports?

export default function App() {
  return (
    <div>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/about" element={<Placeholder />} />
          <Route path="/contact" element={<Placeholder />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Dashboard>
    </div>
  );
}
