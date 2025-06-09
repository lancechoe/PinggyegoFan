import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CouponStamp from "@/components/CouponStamp";
import { useEffect, useState } from "react";

type Props = {
  guest: {
    name: string;
    appearances: number;
    image: string;
    youtubeLinks: { title: string; url: string }[];
  };
};

// 🏆 수상자 목록 + 이미지 경로 매핑
const awardBadgeMap: Record<string, string> = {
  이동욱: "/1주년대상",
  황정민: "/2주년대상",
  지석진: "/1주년최우수상",
  조세호: "/1주년최우수상",
  이동휘: "/2주년최우수상",
};

function getBgClass(appearances: number): string {
  if (appearances >= 50) return "bg-pink-500"; // 유재석
  if (appearances >= 10) return "bg-pink-400";
  if (appearances >= 5) return "bg-pink-300";
  if (appearances >= 3) return "bg-pink-200";
  return "bg-pink-100";
}

export default function StickerCard({ guest }: Props) {
  const hasCoupon = guest.appearances >= 3;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = localStorage.getItem(`like-${guest.name}`) === "true";
    setIsLiked(liked);
  }, [guest.name]);

  const toggleLike = () => {
    const newLike = !isLiked;
    setIsLiked(newLike);
    localStorage.setItem(`like-${guest.name}`, String(newLike));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative inline-block">
          {/* 👑 왕관 아이콘 */}
          {guest.name === "유재석" && (
            <div className="absolute -top-6 left-1 text-2xl z-20">👑</div>
          )}

          <Card
            className={`
              w-40 sm:w-45 h-35 md:w-55 h-45 lg:w-65 h-55 
              ${getBgClass(guest.appearances)} rounded-lg shadow-md
              transform transition duration-300 ease-in-out
              hover:scale-105 hover:rotate-1 hover:ring-4 ring-pink-200
              relative
            `}
          >
            {/* 🏆 수상 배지 이미지 */}
            {awardBadgeMap[guest.name] && (
              <Image
                src={`${awardBadgeMap[guest.name]}.png`}
                alt="수상 배지"
                width={40}
                height={40}
                className="absolute top-2 left-2 z-20"
                title={`${guest.name} 수상자`}
              />
            )}
            <CardContent className="p-4 flex flex-col items-center">
              <Image
                src={guest.image}
                alt={guest.name}
                width={100}
                height={100}
                className={`rounded-full mb-2 object-cover border-4 ${
                  guest.appearances >= 5 ? "border-pink-200" : "border-pink-300"
                }`}
                style={{ width: "100px", height: "100px" }}
              />

              <h2 className="font-bold text-lg">{guest.name}</h2>
              <p className="text-sm mt-1">🎬 {guest.appearances}회 출연</p>
              {hasCoupon && (
                <Badge className="mt-2 bg-pink-200 text-pink-900">
                  💸 출연료 지급!
                </Badge>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike();
                }}
                className="absolute top-2 right-2 text-xl"
              >
                {isLiked ? "❤️" : "🤍"}
              </button>
            </CardContent>
          </Card>
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{guest.name}님의 출연 정보</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm">총 {guest.appearances}회 출연</p>
          <CouponStamp count={guest.appearances} />

          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
            {guest.youtubeLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  🎥 {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
