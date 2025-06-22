import { getServerSession } from "next-auth";
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/getSessionUser";
import { db } from "@/lib/db";
import { posts } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function GET() {
    console.log('get list called');

    const user = await getSessionUser();
    if (!user) {
        redirect("/login");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };

    const result = await db.select().from(posts).where(eq(posts.user_id, user.id));
    return NextResponse.json(result)
}