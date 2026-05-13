import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { idea, platform, tone, audience, userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!idea) {
      return NextResponse.json(
        { error: "Video idea is required." },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count } = await supabaseAdmin
      .from("usage_tracking")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", today.toISOString());

    const hasUsedDailyFree = (count || 0) >= 1;

    let shareCreditId: string | null = null;

    if (hasUsedDailyFree) {
      const { data: credit } = await supabaseAdmin
        .from("share_credits")
        .select("id")
        .eq("user_id", userId)
        .eq("used", false)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (!credit) {
        return NextResponse.json(
          {
            error:
              "Free limit reached. Upgrade to Pro or share Hookly to get one extra generation.",
          },
          { status: 403 }
        );
      }

      shareCreditId = credit.id;
    }

    let result;

    try {
      const prompt = `
You are a viral social media copywriter.

Generate:
- 3 hooks
- 2 captions
- 5 hashtags

Topic: ${idea}
Platform: ${platform}
Tone: ${tone}
Audience: ${audience}

Return ONLY valid JSON:
{
  "hooks": [],
  "captions": [],
  "hashtags": []
}
`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const content = completion.choices[0].message.content;
      result = content ? JSON.parse(content) : null;
    } catch {
      result = {
        hooks: [
          `Stop scrolling if you care about ${idea}`,
          "Nobody talks about this enough",
          "This is your sign to try it today",
        ],
        captions: [
          `${idea} made simple for creators.`,
          `Save this post and use it for your next ${platform} video.`,
        ],
        hashtags: ["#hookly", "#contentcreator", "#viral", "#reels", "#tiktok"],
      };
    }

    if (shareCreditId) {
      await supabaseAdmin
        .from("share_credits")
        .update({ used: true })
        .eq("id", shareCreditId);
    } else {
      await supabaseAdmin.from("usage_tracking").insert({
        user_id: userId,
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message || "Failed to generate content." },
      { status: 500 }
    );
  }
}