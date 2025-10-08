import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'flowbite';
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'
import Home from './pages/Home';
import Header from './Component/Header';
import Footer from './Component/Footer';
import SpecificPost from './pages/SpecificPost';
import SearchResult from './pages/SearchResult';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import AdminDashbord from './pages/AdminDashbord';
import AdminRoute from './auth/RouteProtect';
import ModifyPostData from './pages/ModifyPostData';
import AddPost from './pages/AddPost';
import MyPosts from './pages/MyPosts';

function App() {

  return (
    <>
    <div><Toaster/></div>
      <BrowserRouter>
      <Header />
        <div className='mb-20 mt-10'>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/post/:id' element={<SpecificPost />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/addPost' element={<AddPost />} />
            <Route path='/myPost' element={<MyPosts />} />
            <Route path='/adminDashbord' element={<AdminRoute><AdminDashbord /></AdminRoute>} />
            <Route path='adminDashbord/modifyPost/:id' element={<AdminRoute><ModifyPostData /></AdminRoute>} />
            <Route path='myPost/modifyPost/:id' element={<ModifyPostData />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
