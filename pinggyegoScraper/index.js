const axios = require("axios");
const fs = require("fs");

const API_KEY = "AIzaSyCy529uPhneUg9fBEsztCcUbMujSt3-ZYo";
const PLAYLIST_ID = "PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y";

// 한글 이름 조건 (2~3자)
function isValidKoreanName(tag) {
  return /^[가-힣]{2,3}$/.test(tag);
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

// 태그 가져오기
async function getTags(videoId) {
  const res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet",
      id: videoId,
      key: API_KEY,
    },
  });

  return res.data.items[0]?.snippet?.tags || [];
}

async function main() {
  const guestEpisodes = {}; // { 유재석: { count: 0, episodes: [] } }

  const videoItems = await getAllVideoItems();

  for (const video of videoItems) {
    // 🔥 mini핑계고 영상은 건너뜀
    if (video.title.includes("mini핑계고")) continue;
    const tags = await getTags(video.videoId);
    const likelyGuests = tags.slice(2); // 앞 2개만 제거

    for (const tag of likelyGuests) {
      if (!isValidKoreanName(tag)) continue;

      if (tag == "유재석") {
        if (!guestEpisodes[tag]) {
          guestEpisodes[tag] = { count: 0 };
        }
        guestEpisodes[tag].count++;
      } else if (!guestEpisodes[tag]) {
        guestEpisodes[tag] = { count: 0, episodes: [] };
      }

      guestEpisodes[tag].count++;
      guestEpisodes[tag].episodes.push({
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
      });
    }
  }

  // ✅ 2회 이상만 필터
  const filtered = Object.fromEntries(
    Object.entries(guestEpisodes).filter(([_, data]) => data.count >= 2)
  );

  fs.writeFileSync(
    "guest-episodes.json",
    JSON.stringify(filtered, null, 2),
    "utf-8"
  );
  console.log("📁 guest-episodes.json 저장 완료!");
}

main();
