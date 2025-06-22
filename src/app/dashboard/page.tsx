"use client";

import Button from "@/components/button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return router.push("/login");

  return (
    <div>
      <section className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]">
        <div className="container w-full max-w-none px-4">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                 Blog PlatForm
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  This is a Free Next.js full stack template that you can use to
                  create Blogs based on different category and also you can chat
                  with others. This website is full of functionalities.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  // className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white 
                  // hover:bg-primary/80"
                    onClick={() => router.push("/dashboard/lists")}
                                    text="Explore All Blogs"
                 
                />
                
                  
             
              </div>
            </div>
          </div>
        </div>
      </section>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout
      </button>
    </div>
  );
}
