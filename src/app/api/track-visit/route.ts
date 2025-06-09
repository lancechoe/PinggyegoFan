// app/api/track-visit/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("visit_counts")
    .select("*")
    .eq("date", today)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("조회 실패:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data) {
    await supabase
      .from("visit_counts")
      .update({ count: data.count + 1 })
      .eq("id", data.id);
  } else {
    await supabase
      .from("visit_counts")
      .insert([{ date: today, count: 1 }]);
  }

  return NextResponse.json({ message: "ok" });
}
