import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './App.css'
import { FooterComponent } from './Components/FooterComponent'
import { HeaderComponent } from './Components/HeaderComponent'
import ListBookComponent from './Components/ListBookComponent'
import Register from './Components/Register'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookComponent } from './Components/BookComponent'

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/books' element={<ListBookComponent />}></Route>
          <Route path='/add-book' element={<BookComponent />}></Route>
          <Route path='/edit-book/:id' element={<BookComponent />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
