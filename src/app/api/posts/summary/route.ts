import { posts } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/getSessionUser";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
export async function POST(req: Request) {

    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { postId } = await req.json();
    if (!postId) return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    const [post] = await db.select().from(posts).where(eq(posts.id, postId))
    if (!post) return NextResponse.json({ error: 'post not found' }, { status: 400 });
    const cohereRes = await fetch("https://api.cohere.ai/v1/summarize", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: post.content,
            length: "medium",
            format: "paragraph",
            model: "command",
        }),
    });
    const cohereData = await cohereRes.json();
    if (!cohereData.summary) {
        console.error("Cohere response missing summary:", cohereData);
        return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
    }
    const summary = cohereData.summary;
    await db.update(posts).set({ summary }).where(eq(posts.id, postId));
    return NextResponse.json({ summary })

}