import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Gallery from "./components/Gallery"


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Gallery />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
