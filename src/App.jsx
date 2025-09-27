// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItems from './components/CartItems';
import {useSelector} from "react-redux";

function CartLink() {
    // show badge count in navbar
    const total = useSelector(state => state.cart.totalQuantity);
    return <span>Cart ({total})</span>;
}

function AppWrapper() {
    const navigate = useNavigate();
    return (
        <div>
            <nav style={{background:'#2e8b57', padding:12, color:'#fff', display:'flex', justifyContent:'space-between'}}>
                <div><Link to="/" style={{color:'#fff', textDecoration:'none'}}>Paradise Nursery</Link></div>
                <div>
                    <button onClick={() => navigate('/plants')}>Plants</button>
                    <button onClick={() => navigate('/cart')}>Cart</button>
                </div>
            </nav>

            <div style={{padding:16}}>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/plants" element={<ProductList />} />
                    <Route path="/cart" element={<CartItems onContinueShopping={() => navigate('/plants')} />} />
                </Routes>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}