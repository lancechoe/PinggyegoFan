const axios = require("axios");
const fs = require("fs");

const API_KEY = "AIzaSyCy529uPhneUg9fBEsztCcUbMujSt3-ZYo";
const PLAYLIST_ID = "PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y";

const EXCLUDE_TAGS = [
  "설연휴",
  "시상식",
  "다비치",
  "샤이니",
  "추석",
  "돌아온",
  "세븐틴",
  "커피",
  "피크닉",
  "토크",
  "뜬뜬",
  "핑계고",
  "가짜의삶",
];

// 1~4자 한글 이름 조건
function isValidKoreanName(tag) {
  return /^[가-힣]{1,4}$/.test(tag);
}

// 설명에서 #태그 추출 + 조건 필터링
function extractHashtagsFromDescription(description) {
  return (description.match(/#[가-힣]{1,10}/g) || [])
    .map((tag) => tag.replace("#", ""))
    .filter((tag) => isValidKoreanName(tag) && !EXCLUDE_TAGS.includes(tag));
}

// 13-1 13-2 1회로 통합
function normalizeEpisodeKey(title) {
  const isMini = title.includes("mini핑계고");

  const match = title.match(/EP[.\s]?(\d{1,3})/i);
  if (!match) return null;

  const baseEP = `EP${match[1]}`;
  return isMini ? `MINI-${baseEP}` : baseEP;
}

// 전체 영상 가져오기
async function getAllVideoItems() {
  let allItems = [];
  let nextPageToken = "";
  do {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: 50,
          playlistId: PLAYLIST_ID,
          key: API_KEY,
          pageToken: nextPageToken,
        },
      }
    );

    const items = res.data.items.map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
    }));

    allItems = [...allItems, ...items];
    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);

  return allItems;
}

// 설명에서 태그 추출
async function getTags(videoId) {
  const res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet",
      id: videoId,
      key: API_KEY,
    },
  });

  const description = res.data.items[0]?.snippet?.description || "";

  // 기존 해시태그 방식
  const hashTags = extractHashtagsFromDescription(description);

  // mini용 참여자 수동 추출
  let participantTags = [];
  const match = description.match(/참여자\s*[:：]\s*(.+)/); // ← 더 유연하게
  if (match) {
    console.log(`[${videoId}] 참여자 라인 추출됨:`, match[1]);

    participantTags = match[1]
      .split(",")
      .map((name) => name.trim())
      .filter(
        (name) => isValidKoreanName(name) && !EXCLUDE_TAGS.includes(name)
      );
  }

  const tags = [...new Set([...hashTags, ...participantTags])]; // 중복 제거

  console.log(`[${videoId}] 태그 추출됨:`, tags);
  return tags;
}

async function main() {
  const guestEpisodes = {}; // 출연자 데이터 저장
  const episodeSet = new Set(); // 중복 EP 처리 방지

  const videoItems = await getAllVideoItems();

  for (const video of videoItems) {
    const { videoId, title } = video;

    // 🎬 EP 키 추출 & 중복 체크
    const episodeKey = normalizeEpisodeKey(title);
    if (!episodeKey) continue;
    if (episodeSet.has(episodeKey)) continue;
    episodeSet.add(episodeKey);

    const tags = await getTags(videoId);
    if (tags.length === 0) continue;

    for (const tag of tags) {
      if (tag === "유재석") {
        if (!guestEpisodes[tag]) {
          guestEpisodes[tag] = { count: 0 };
        }
        guestEpisodes[tag].count++;
      } else {
        if (!guestEpisodes[tag]) {
          guestEpisodes[tag] = { count: 0, episodes: [] };
        }
        guestEpisodes[tag].count++;
        guestEpisodes[tag].episodes.push({
          title,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        });
      }
    }
  }

  // ✅ 2회 이상 출연자만 필터링
  const filtered = Object.fromEntries(
    Object.entries(guestEpisodes).filter(([_, data]) => data.count >= 2)
  );

  // 🔸 guest-episodes.json 저장
  fs.writeFileSync(
    "guest-episodes.json",
    JSON.stringify(filtered, null, 2),
    "utf-8"
  );
  console.log("📁 guest-episodes.json 저장 완료!");

  // 🔸 guest-counts.json 저장 (이름: 출연횟수만)
  const nameCountMap = {};
  for (const [name, data] of Object.entries(filtered)) {
    nameCountMap[name] = data.count;
  }

  fs.writeFileSync(
    "guest-counts.json",
    JSON.stringify(nameCountMap, null, 2),
    "utf-8"
  );
  console.log("📁 guest-counts.json 저장 완료!");
}

main();
