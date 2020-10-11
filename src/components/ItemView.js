import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ItemView() {
  let { id } = useParams();

  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({
    images: {},
  });

  const fetchItem = async () => {
    const data = await fetch(
      `https://fortniteapi.io/v1/items/get?id=${id}&lang=en`,
      {
        headers: { Authorization: "0e35f61e-772d4b2f-35245465-f8b6c26c" },
      }
    ).then((response) => response.json());
    setItem(data.item);
    console.log(data.item);
  };

  return (
    <div>
      {item.name} <img src={item.images.icon}></img>
      <img src={item.images.full_size}></img>
      <h2>Rarity: {item.internalRarity}</h2>
    </div>
  );
}
