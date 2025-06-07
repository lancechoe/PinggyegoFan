import Image from "next/image";
import { Guest } from "@/data/guests";
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

type Props = {
  guest: Guest;
};

export default function StickerCard({ guest }: Props) {
  const hasCoupon = guest.appearances >= 3;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-48 text-center shadow-md hover:scale-105 transition-all hover:rotate-1 hover:shadow-lg bg-white cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center">
            <Image
              src={guest.image}
              alt={guest.name}
              width={100}
              height={100}
              className="rounded-full border-2 border-pink-300 mb-2 object-cover"
              style={{ width: "100px", height: "100px" }}
            />
            <h2 className="font-bold text-lg">{guest.name}</h2>
            <p className="text-sm mt-1">🎬 {guest.appearances}회 출연</p>
            {hasCoupon && (
              <Badge className="mt-2 bg-pink-200 text-pink-900">
                💸 출연료 지급!
              </Badge>
            )}
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
          {guest.youtubeLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                🎥 영상 {idx + 1}
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
