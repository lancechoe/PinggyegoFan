const fs = require("fs");

const rawData = fs.readFileSync("guest-episodes.json", "utf-8");
const data = JSON.parse(rawData);

const lines = [];
lines.push(
  "// 참고용 타입: { name: string, appearances: number, youtubeLinks: { title: string, url: string }[], image: string }"
);
lines.push("");
lines.push("export const guests = [");

for (const [name, info] of Object.entries(data)) {
  const count = info.count;

  // ✅ title + url 모두 포함
  const links = Array.isArray(info.episodes)
    ? info.episodes
        .map(
          (ep) =>
            `{ title: ${JSON.stringify(ep.title)}, url: ${JSON.stringify(
              ep.url
            )} }`
        )
        .join(", ")
    : "";

  lines.push(
    `  { name: ${JSON.stringify(
      name
    )}, appearances: ${count}, youtubeLinks: [${links}], image: "/stickers/${name}.png" },`
  );
}

lines.push("];");

fs.writeFileSync("guests.ts", lines.join("\n"), "utf-8");
console.log("✅ guests.ts 생성 완료!");
