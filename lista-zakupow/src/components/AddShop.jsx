import React, { useState } from "react";

function AddShop({onAdd}) {
    const [shopName, setShopName] = useState('');


     // SPRAWDZAMY CZY onAdd ISTNIEJE
  console.log("AddShop otrzymał onAdd:", onAdd);  // ← DODAJ TO!


    const handleSubmit = (e) => {
        e.preventDeafult();
        console.log("Kliknięto przycisk! Nazwa:", shopName);  // ← DODAJ TO!

        if (shopName.trim()) {
            console.log("Wywołuję onAdd z:", shopName);  // ← DODAJ TO!
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