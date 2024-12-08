import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Available from './pages/available';
import Checkout from './pages/checkout';
import AddBook from "./pages/addBook";
import UpdateBook from "./pages/updateBook";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Available />} />
        <Route path = '/available' element={<Available />} />
        <Route path = '/checkout' element={<Checkout />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
