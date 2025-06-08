type Props = {
  count: number; // 출연 횟수
};

export default function CouponStamp({ count }: Props) {
  const max = 3;

  let stamps: string[] = [];

  if (count < max) {
    // 3회 미만: 별 + 빈칸
    stamps = Array.from({ length: max }).map((_, i) =>
      i < count ? "🌟" : "⬜"
    );
  } else if (count < 10) {
    // 3~9회: 별 갯수만큼 출력
    stamps = Array.from({ length: count }).map(() => "🌟");
  } else {
    // 10회 이상: 축약 표시
    stamps = [`🌟 x ${count}`];
  }

  return (
    <div className="flex gap-1 justify-center mt-3 text-xl font-semibold">
      {stamps.map((icon, idx) => (
        <span key={idx}>{icon}</span>
      ))}
    </div>
  );
}
