import React, { useState } from "react";

function AddShop({onAdd}) {
    const [shopName, setShopName] = useState('');

    const proponowaneSklepy = ['Lidl', 'Rossmann', 'Żabka'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (shopName.trim()) {
            onAdd(shopName);
            setShopName('');
        }
    };

        const dodajProponowany = (nazwa) => {
            onAdd(nazwa);
        };

    return (
        <div>
            <div className="proponowane-sklepy">
                {proponowaneSklepy.map(nazwa => (
                    <button
                    key={nazwa}
                    type="button"
                    onClick={() => dodajProponowany(nazwa)}
                    className="proponowany-btn"
                    >
                        {nazwa}
                    </button>
                ))}
            </div>
        <form onSubmit={handleSubmit} className="add-shop">
            <input type="text"
            placeholder="Nazwa sklepu (np.Dino)"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            />
            <button type="submit">Dodaj sklep</button>
        </form>
        </div>
    );
}

export default AddShop;