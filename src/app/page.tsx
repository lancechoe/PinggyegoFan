import { guests } from "@/data/guests";
import StickerCard from "@/components/StickerCard";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">🎀 핑계고 스티커판</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {guests.map((guest) => (
          <StickerCard key={guest.name} guest={guest} />
        ))}
      </div>
    </main>
  );
}
