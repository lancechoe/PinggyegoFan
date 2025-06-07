import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="px-0 py-15 w-full overflow-x-auto text-center whitespace-nowrap flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">🎀 핑계고 팬사이트 소개</h1>

      <p className="text-gray-600">
        유튜브 채널 <strong>“핑계고”</strong>를 사랑하는 팬이 만든 비공식
        팬사이트입니다.
      </p>

      <p className="text-gray-500 text-sm">
        출연 횟수 기반의 뽀짝한 스티커판과 도장 시스템이 포함되어 있어요!
      </p>

      {/* 🐣 제작자 정보 */}
      <p className="text-sm text-gray-500 mt-8">
        본 사이트는 개인 포트폴리오 용도로 제작되었으며, 핑계고 유튜브 채널 또는
        해당 출연자들과는 무관합니다. 문의:{" "}
        <a href="mailto:musd128@naver.com" className="underline">
          musd128@naver.com
        </a>
      </p>

      {/* 🎀 홈으로 돌아가기 버튼 */}
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-pink-300 rounded-full text-white hover:bg-pink-400 transition"
      >
        홈으로 가기 🏠
      </Link>
    </main>
  );
}
