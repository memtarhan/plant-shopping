// src/components/CartItems.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

const CartItems = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items || []);

    const parsePrice = (costString) => {
        // remove non-numeric chars and parse
        const num = parseFloat(costString.replace(/[^0-9.-]+/g, ''));
        return isNaN(num) ? 0 : num;
    };

    const calculateTotalAmount = () => {
        return items.reduce((sum, item) => sum + parsePrice(item.cost) * item.quantity, 0);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
        } else {
            // remove if would become zero
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleCheckout = () => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <button onClick={onContinueShopping}>Continue Shopping</button>
                </div>
            ) : (
                <div>
                    <ul style={{listStyle:'none', padding:0}}>
                        {items.map(item => {
                            const price = parsePrice(item.cost);
                            const subtotal = (price * item.quantity).toFixed(2);
                            return (
                                <li key={item.name} style={{display:'flex', gap:12, alignItems:'center', borderBottom:'1px solid #eee', padding:'12px 0'}}>
                                    <img src={item.image} alt={item.name} style={{width:80, height:80, objectFit:'cover', borderRadius:6}}/>
                                    <div style={{flex:1}}>
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                        <p>Price: {item.cost}</p>
                                    </div>
                                    <div style={{textAlign:'right'}}>
                                        <div style={{display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end'}}>
                                            <button onClick={() => handleDecrement(item)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleIncrement(item)}>+</button>
                                        </div>
                                        <p>Subtotal: ${subtotal}</p>
                                        <div>
                                            <button onClick={() => handleRemove(item)} style={{color:'red'}}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div style={{marginTop:20, textAlign:'right'}}>
                        <h3>Total: ${calculateTotalAmount().toFixed(2)}</h3>
                        <button onClick={handleCheckout} style={{marginRight:10}}>Checkout</button>
                        <button onClick={onContinueShopping}>Continue Shopping</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItems;