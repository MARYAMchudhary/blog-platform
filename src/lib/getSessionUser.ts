import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getSessionUser() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return null;

    return session.user;
}