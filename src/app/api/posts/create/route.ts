import { posts } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/getSessionUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("POST /api/posts/create called");

    try {
        const user = await getSessionUser();
        console.log("👤 Session user:", user);

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        console.log("📦 Request body:", body);

        const { title, content } = body;

        if (!title || !content) {
            return NextResponse.json({ error: "Title and Content are Required" }, { status: 400 });
        }

        const newPost = await db
            .insert(posts)
            .values({
                user_id: user.id,
                title,
                content,
            })
            .returning();

        console.log("✅ Post created:", newPost);
        return NextResponse.json({ post: newPost[0] });

    } catch (error) {
        console.error("❌ Internal error in create post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
