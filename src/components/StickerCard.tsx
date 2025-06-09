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
        <Card
          className={`
            w-40 sm:w-45 h-35 md:w-55 h-45 lg:w-65 h-55 
            ${getBgClass(guest.appearances)} rounded-lg shadow-md
            transform transition duration-300 ease-in-out
            hover:scale-105 hover:rotate-1 hover:ring-4 ring-pink-200
            relative
          `}
        >
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
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{guest.name}님의 출연 정보</DialogTitle>
        </DialogHeader>
        <p className="text-sm">총 {guest.appearances}회 출연</p>
        <CouponStamp count={guest.appearances} />

        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
          {guest.youtubeLinks.map(
            (link: { title: string; url: string }, idx: number) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  🎥 {link.title}
                </a>
              </li>
            )
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
