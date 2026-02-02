import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserHome from "./pages/UserHome"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Favorites from "./pages/Favorites"
import Progress from "./pages/Progress"
import AdminPanel from "./pages/AdminPanel"
import ExtensionPopup from "./pages/ExtensionPopup"
import { AuthProvider } from "./context/AuthContext"
import { VocabularyProvider } from "./context/VocabularyContext"

function App() {
  return (
    <AuthProvider>
      <VocabularyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<UserHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/popup" element={<ExtensionPopup />} />
          </Routes>
        </Router>
      </VocabularyProvider>
    </AuthProvider>
  )
}

export default App
