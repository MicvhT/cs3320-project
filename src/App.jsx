import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Available from './pages/available';
import Checkout from './pages/checkout';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Available />} />
        <Route path = '/available' element={<Available />} />
        <Route path = '/checkout' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
