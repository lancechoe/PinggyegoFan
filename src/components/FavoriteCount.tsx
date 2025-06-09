"use client";
import { useEffect, useState } from "react";

export default function FavoriteCount({ guests }: { guests: any[] }) {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const liked = guests.filter(
      (g) => localStorage.getItem(`like-${g.name}`) === "true"
    );
    setCount(liked.length);
  };

  useEffect(() => {
    updateCount();

    const onStorage = () => updateCount();
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [guests]);

  return (
    <div className="bg-pink-50 rounded-xl p-4 shadow-sm">
      <div className="text-2xl">💖</div>
      <div className="text-xl font-semibold">{count}</div>
      <div className="text-sm text-gray-500">즐겨찾기</div>
    </div>
  );
}
