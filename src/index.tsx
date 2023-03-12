import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CircuitPage } from './product/circuit/Circuit';
import { RectSoundPage } from './product/rectsound/RectSound';
import { RectSound2Page } from './product/rectsound2/RectSound2';
import { RectSound3Page } from './product/rectsound3/RectSound3';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/product/circuit",
    element: <CircuitPage/>,
  },
  {
    path: "/product/rectsound",
    element: <RectSoundPage/>,
  },
  {
    path: "/product/rectsound2",
    element: <RectSound2Page/>,
  },
  {
    path: "/product/rectsound3",
    element: <RectSound3Page/>,
  }
]);

root.render(
     <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
