import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Admin from "./components/Admin"
import User from "./components/User"
import { RequireToken } from "./Helper"
import Redirect from "./components/Redirect"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/redirect"
          element={
            <RequireToken>
              <Redirect />
            </RequireToken>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/index" element={<User />} />
      </Routes>
  )
}

export default App