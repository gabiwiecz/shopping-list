import React, { useState } from "react";

function AddShop({onAdd}) {
    const [shopName, setShopName] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (shopName.trim()) {
            onAdd(shopName);
            setShopName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-shop">
            <input type="text"
            placeholder="Nazwa sklepu (np.Dino)"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            />
            <button type="submit">Dodaj sklep</button>
        </form>
    );
}

export default AddShop;