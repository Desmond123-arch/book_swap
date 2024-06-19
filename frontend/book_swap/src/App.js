import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useEffect } from "react";
import routes from './routes';

import WebFont from 'webfontloader';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Layout from './components/Layout';
export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Noto Sans', 'Sans-Serif']
      }
    });
   }, []);

   const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: routes
    }
   ])
  return (
    <div className="font-loader">
      <RouterProvider router={router}/>
    </div>
  )
}