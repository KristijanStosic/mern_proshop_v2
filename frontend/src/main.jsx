import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './assets/styles/index.css'
import App from './App.jsx'
import ProductsScreen from './screens/ProductsScreen'
import ProductScreen from './screens/ProductScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import CartScreen from './screens/CartScreen'
import AdminRoute from './components/admin/AdminRoute'
import ProductListScreen from './screens/admin/ProductListScreen'
import UserListScreen from './screens/admin/UserListScreen'
import OrderListScreen from './screens/admin/OrderListScreen'
import CategoryListScreen from './screens/admin/CategoryListScreen'
import BrandListScreen from './screens/admin/BrandListScreen'
import ModelListScreen from './screens/admin/ModelListScreen'
import PrivateRoute from './components/PrivateRoute'
import ReviewListScreen from './screens/admin/ReviewListScreen'

//createRoutesFromElements is a helper that creates route objects from <Route> elements. It's useful if you prefer to create your routes as JSX instead of objects.
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<ProductsScreen />} />
      <Route path='/search/:keyword' element={<ProductsScreen />} />
      <Route path='/page/:page' element={<ProductsScreen />} />
      <Route path='/search/:keyword/page/:page' element={<ProductsScreen />} />
      
      <Route path='/product/:productId' element={<ProductScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/cart' element={<CartScreen />} />

      {/* Admin Routes */}
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='/admin/all-products' element={<ProductListScreen />} />
        <Route path='/admin/all-users' element={<UserListScreen />} />
        <Route path='/admin/all-orders' element={<OrderListScreen />} />
        <Route path='/admin/all-categories' element={<CategoryListScreen />} />
        <Route path='/admin/all-brands' element={<BrandListScreen />} />
        <Route path='/admin/all-models' element={<ModelListScreen />} />
        <Route path='/admin/all-reviews' element={<ReviewListScreen />} />

        <Route path='/search/:keyword' element={<UserListScreen />} />
        <Route path='/page/:page' element={<UserListScreen />} />
        <Route path='/search/:keyword/page/:page' element={<UserListScreen />} />
      </Route>

      {/* Registered Users */}
      <Route path='' element={<PrivateRoute />}>

      </Route>

      <Route path='*' element={<NotFoundScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)