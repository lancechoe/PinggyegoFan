type Props = {
  count: number; // 출연 횟수
};

export default function CouponStamp({ count }: Props) {
  const max = 3;
  const stamps = Array.from({ length: max }).map((_, i) =>
    i < count ? "💮" : "⬜"
  );

  return (
    <div className="flex gap-1 justify-center mt-3 text-xl">
      {stamps.map((icon, idx) => (
        <span key={idx}>{icon}</span>
      ))}
    </div>
  );
}
