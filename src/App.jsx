import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./App.css";
import { FooterComponent } from "./Components/FooterComponent";
import { HeaderComponent } from "./Components/HeaderComponent";
import ListBookComponent from "./Components/ListBookComponent";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookComponent } from "./Components/BookComponent";
import { AuthProvider } from "./context/AuthContext";
import { BookClubUsers } from './Components/BookClubUsers'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<BookClubUsers />} />
            <Route path='/books' element={<ListBookComponent />}></Route>
            <Route path='/add-book' element={<BookComponent />}></Route>
            <Route path='/edit-book/:id' element={<BookComponent />}></Route>
          </Routes>
        </AuthProvider>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
