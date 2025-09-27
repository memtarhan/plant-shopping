// src/components/ProductList.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';

const plantsArray = [
    {
        name: 'Snake Plant',
        image: 'https://via.placeholder.com/150',
        description: 'Low maintenance indoor plant.',
        cost: '$12.00',
    },
    {
        name: 'Monstera',
        image: 'https://via.placeholder.com/150',
        description: 'Large glossy leaves.',
        cost: '$25.00',
    },
    {
        name: 'Aloe Vera',
        image: 'https://via.placeholder.com/150',
        description: 'Medicinal succulent.',
        cost: '$8.00',
    },
    // add more objects as needed
];

const ProductList = () => {
    const dispatch = useDispatch();
    const totalItems = useSelector(state => state.cart.totalQuantity);
    const [addedToCart, setAddedToCart] = useState({}); // { 'Snake Plant': true }

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
    };

    return (
        <div>
            <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2>Plants</h2>
                <div>Cart: {totalItems}</div>
            </header>

            <div className="product-grid" style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'16px', marginTop:16}}>
                {plantsArray.map(plant => (
                    <div className="product-card" key={plant.name} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
                        <img src={plant.image} alt={plant.name} style={{width:'100%', height:140, objectFit:'cover', borderRadius:6}}/>
                        <h3>{plant.name}</h3>
                        <p style={{minHeight:40}}>{plant.description}</p>
                        <p><strong>{plant.cost}</strong></p>
                        <button
                            onClick={() => handleAddToCart(plant)}
                            disabled={!!addedToCart[plant.name]}
                            style={{
                                padding:'8px 12px',
                                borderRadius:6,
                                cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
                                background: addedToCart[plant.name] ? '#ccc' : '#28a745',
                                color: '#fff',
                                border:'none'
                            }}
                        >
                            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;