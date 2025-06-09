# 🎀 핑ㄱㅖ고 쿠폰북

유튜브 예능 채널 **핑계고**의 팬사이트입니다!  
출연 연예인의 출연 횟수를 뽀짝한 스티커 카드로 확인하고, 즐겨찾기로 나만의 즐겨찾는 출연진을 꾸며보세요 💖

This is a fan-made website for the YouTube channel "Pinggyego"!
Check out how many times each guest has appeared with adorable sticker cards,
and mark your favorite guests with a heart 💖 to create your own custom lineup!

> **https://pinggyegocoupon.com**

---

## 📸 미리보기

![미리보기](public/스크린샷.png)

---

## ✨ 주요 기능

- 🧡 **출연진 스티커 카드**  
  귀엽고 달걀형 카드에 출연 횟수, 출연 영상 정보 표시

- 🌟 **쿠폰 도장 시스템**  
  출연 횟수에 따라 별 도장 표시

  - 3회 미만: ⭐ + ⬜
  - 3~9회: ⭐ 개수만큼
  - 10회 이상: `🌟 x N` 축약

- 🔍 **검색 / 정렬 / 필터링**

  - 이름으로 검색
  - 출연 많은 순 / 적은 순 정렬
  - 출연료 지급자만 보기 💸
  - 즐겨찾기만 보기 ❤️

- 💾 **로컬 스토리지 기반 즐겨찾기 시스템**  
  하트를 눌러 즐겨찾기 등록하면, 전체 통계에서 반영됨

- 📈 **방문자 수 통계 (Supabase 연동)**

  - 오늘 방문자 수
  - 총 방문자 수

- 🤖 **유튜브 자동화 스크래핑 시스템**
  - YouTube API를 통해 영상 description의 태그 또는 참여자 목록 파싱
  - 출연자 이름, 출연 영상 링크 자동 수집
  - 2회 이상 출연자만 데이터화

---

## 🛠️ 사용 기술

- **Next.js** 14
- **TypeScript**
- **TailwindCSS** + ShadCN UI
- **Supabase**
- **YouTube Data API v3**
- **Node.js + axios** (출연자 스크래퍼)

---

## 📁 프로젝트 구조

```
pinggyego/
├── public/
│ ├── stickers/ # 출연자 이미지 폴더
│ └── 핑계고로고.png # 상단 로고 이미지
├── src/
│ ├── app/
│ │ └── page.tsx # 메인 페이지 (홈)
│ ├── components/
│ │ ├── StickerCard.tsx # 출연자 스티커 카드 컴포넌트
│ │ ├── CouponStamp.tsx # 출연 횟수에 따른 도장 표시
│ │ └── FavoriteCount.tsx # 즐겨찾기 통계 UI
│ ├── data/
│ │ └── guests.ts # 출연자 정보 (스크래핑 결과)
│ ├── pages/
│ │ └── about.tsx # 소개 페이지
│ └── api/
│ └── track-visit.ts # 방문자 수 API (Supabase)
├── pinggyegoScraper/ # 유튜브 출연자 데이터 수집기
│ └── index.js # 자동화 스크래퍼 실행 파일
├── .env.local # Supabase 등 API 키
├── tailwind.config.ts # Tailwind 설정
├── tsconfig.json # TypeScript 설정
└── README.md # 이 파일
```

---

## 👀 만든 사람

🧑‍💻 Dev: @lancechoe
🎨 Design & Planning: @lancechoe
