import React, { useState } from "react";

function AddProduct({onAdd, onCancel }) {
    const [productName, setProductName] = useState('');

    const handleSubmit= (e) => {
        e.preventDefault();
        if (productName.trim()) {
            onAdd(productName);
            setProductName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <input type="text"
            placeholder="Nazwa produktu (np. Mleko)" 
            value={productName}
            onChange={(e) =>setProductName(e.target.value)}
            autoFocus
            />
            <div className="form-buttons">
                <button type='submit'>Dodaj</button>
                <button type="button" onClick={onCancel}>Anuluj</button>
            </div>
        </form>
    );
}

export default AddProduct;