import React from 'react'
import App from '../App.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Issues from '../pages/Issues'
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import store from '../redux/store'
import { Provider } from 'react-redux'
// 创建路由

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={
        <Provider store={store}><App /></Provider>
      
      }>
        <Route index element={<Issues />}></Route>
        <Route path="books" element={<Books />}></Route>
        <Route path="interviews" element={<Interviews/>}></Route>
      </Route>
  )
);



export default router