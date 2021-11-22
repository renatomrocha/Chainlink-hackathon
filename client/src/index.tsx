import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TicketGenerator from "./components/TicketGenerator";
import NFTicketsNavbar from "./components/Navbar";
import MyTickets from "./components/MyTickets";


ReactDOM.render(
    <BrowserRouter>
        <NFTicketsNavbar/>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="create-tickets" element={<TicketGenerator />} />
            <Route path="my-tickets" element={<MyTickets />} />
        </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
