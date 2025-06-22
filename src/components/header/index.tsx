"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
// import { menuItems } from "@/utils";
// import { MenuItem } from "@/utils/types";
import Button from '../button';
// import ThemeToggler from "../theme";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


export default function Header() {
    const [sticky, setSticky] = useState<boolean>(false);
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    const router = useRouter();
    const pathName = usePathname();
    const isLoginPage = pathName === '/login';
    function handleStickyNavbar() {
        if (window.scrollY >= 80) setSticky(true);
        else setSticky(false);
    }

    function handleNavbarToggle() {
        setNavbarOpen(!navbarOpen);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
    });

    //   useEffect(()=> {
    //     setSearchResults([]) 
    //     setSearchQuery('')  
    //   },[pathName])

    return (
        <div>
            <header
                className={`top-0 left-0 z-40 flex w-full items-center bg-transparent px-4
        ${sticky
                        ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop:blur-sm !transition dark:!bg-primary dark:!bg-opacity-20 text-blue-400"
                        : "absolute"

                    }
        `}
            >
                <div className="container w-full max-w-none px-4">
                    <div className="relative -mx-4 flex items-center justify-between">
                        <div className="w-60 max-w-full px-4 xl:mr-12">
                            <Link
                                href={"/"}
                                className={`text-[30px] font-extrabold cursor-pointer block w-full
                    ${sticky ? "py-5 lg:py-2" : "py-8"}
                    `}
                            >
                                NextBlog
                            </Link>
                        </div>


                        <div className="flex gap-4 items-center justify-end pr-16 lg:pr-0">
                            {session !== null ? (
                                <Button
                                    onClick={() => router.push("/dashboard/create")}
                                    text="Create"
                                />
                            ) : null}
                            {!isLoginPage && <Button
                                onClick={session !== null ? () => signOut() : undefined}

                                text={session !== null ? "Logout" : "Login"}
                            />}


                        </div>

                    </div>
                </div>
            </header>
        </div>
    );
}