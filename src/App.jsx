import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'flowbite';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCategory from './pages/AddCategory';
import AddMenu from './pages/AddMenu';
import AllCategory from './pages/AllCategory';
import AllMenu from './pages/AllMenu';
import MenuByCategory from './pages/MenuByCategory';
import SpecificMenuItem from './pages/SpecificMenuItem';
import NotFound from './pages/NotFound';
import AdminRoute from './context/RouteProtect';
import FoodListCart from './pages/FoodList';
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'
import About from './pages/About';

function App() {

  return (
    <>
    <div><Toaster/></div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/allMenu' element={<AllMenu />} />
          <Route path='/menu/:id' element={<SpecificMenuItem />} />
          <Route path='/allCategory' element={<AllCategory />} />
          <Route path='/menu/menuByCategory/:categoryId' element={<MenuByCategory />} />
          <Route path='/addMenu' element={
            <AdminRoute>
              <AddMenu />
            </AdminRoute>
            } /> 
          <Route path='/addCategory' element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
            } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cartList' element={<FoodListCart />} />
          <Route path='*' element={<NotFound />} />
           
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
