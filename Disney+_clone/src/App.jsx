import { useState } from 'react'

import {createBrowserRouter,Route,createRoutesFromElements,NavLink,RouterProvider} from 'react-router-dom'
import './App.css'
import Login from './components/Login'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
    </Route>
  )
);
 
function App() {
  
  return (
   <RouterProvider router={router}/>
  )
}

export default App
