"use client";

import { useState } from "react";
import { guests } from "@/data/guests";
import StickerCard from "@/components/StickerCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [onlyPaid, setOnlyPaid] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredGuests = guests
    .filter((g) => g.name.includes(search))
    .filter((g) => !onlyPaid || g.appearances >= 3)
    .filter((g) => {
      if (!onlyFavorites) return true;
      return localStorage.getItem(`like-${g.name}`) === "true";
    })
    .sort((a, b) =>
      sortOrder === "desc"
        ? b.appearances - a.appearances
        : a.appearances - b.appearances
    );

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 hover:underline hover:text-pink-500 transition"
        >
          <Image
            src="/핑계고로고.png"
            alt="핑계고 로고"
            width={52}
            height={52}
            className="inline-block"
          />
          핑ㄱㅖ고 쿠폰북
        </Link>
      </h1>

      {/* 검색 & 정렬 & 체크박스 */}
      <div className="flex flex-col items-center justify-center gap-2 mb-6 px-4 py-3 bg-pink-50 rounded-xl shadow-sm border border-pink-100">
        {/* ✅ 첫 줄: 검색 + 정렬 */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="출연자 이름 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-64"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="desc">출연 많은 순 🔽</option>
            <option value="asc">출연 적은 순 🔼</option>
          </select>
        </div>

        {/* ✅ 둘째 줄: 체크박스 */}
        <label className="flex items-center gap-2 text-sm mt-1">
          <input
            type="checkbox"
            checked={onlyPaid}
            onChange={(e) => setOnlyPaid(e.target.checked)}
            className="accent-pink-400"
          />
          출연료 받은 사람만 보기 💸
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyFavorites}
            onChange={(e) => setOnlyFavorites(e.target.checked)}
            className="accent-pink-400"
          />
          즐겨찾기만 보기 ❤️
        </label>
      </div>

      {/* 스티커 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {filteredGuests.map((guest) => (
          <StickerCard key={guest.name} guest={guest} />
        ))}
      </div>
    </main>
  );
}
