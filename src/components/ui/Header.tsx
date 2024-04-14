"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Header = ({ isMain }: { isMain: boolean }) => {
    const { getHref } = useLanguage();

    const navigation = [
        { name: "Главная", href: getHref("/home") },
        { name: "Профиль", href: getHref("/home/profile") },
    ];
    const router = useRouter();
    const { isAuth, logout } = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // useEffect(() => {
    //     console.log("isAuth", isAuth);
    //     if (!isAuth) {
    //         router.push(getHref("/auth/login"));
    //     }
    // }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full items-center flex justify-center">
                <Spin size="small" />
            </div>
        );
    }
    return (
        <header
            className={` ${
                isMain ? "absolute inset-x-0 top-0 z-50" : "bg-gray-900 "
            }`}
        >
            <nav
                className="flex items-center justify-between lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                        <img
                            className="h-16 w-auto"
                            src="https://d2vm05b1botqyl.cloudfront.net/images/p13_v3_wgc_nt/quiz/anxious/1.webp"
                            alt=""
                        />{" "}
                        <h2 className="text-lg flex gap-4 text-white  font-medium hover:text-primary">
                            OptiCash
                        </h2>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-white"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isAuth ? (
                        <Link
                            onClick={logout}
                            href={getHref("#")}
                            className="text-sm font-semibold leading-6 text-white"
                        >
                            Выйти <span aria-hidden="true">&rarr;</span>
                        </Link>
                    ) : (
                        <Link
                            href={getHref("/auth/login")}
                            className="text-sm font-semibold leading-6 text-white"
                        >
                            Войти <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt=""
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/25">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                {isAuth ? (
                                    <Link
                                        onClick={logout}
                                        href={getHref("#")}
                                        className="text-sm font-semibold leading-6 text-white"
                                    >
                                        Выйти{" "}
                                        <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={getHref("/auth/login")}
                                        className="text-sm font-semibold leading-6 text-white"
                                    >
                                        Войти{" "}
                                        <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

// <header
//     className={clsx(
//         "flex items-center justify-between max-sm:h-16 h-24 px-5 sm:px-10",
//         "border-b border-primary"
//     )}
// >
//     <div className="flex items-center justify-between gap-52">
//         <Logo href="/en/home" />
//     </div>
//     <div className="hidden sm:flex z-50 gap-5 ">
//         <div className="flex items-center justify-center">
//             <div>
//                 <h2 className="font-medium sm:text-lg">{`${userProfile?.first_name} ${userProfile?.last_name}`}</h2>
//             </div>
//             <div>
//                 {/* <button
//                     onClick={handleConfirmEmail}
//                     className={`opacity-50 text-xs bg-yellow rounded-lg px-1 sm:line-height-lg ${
//                         confirmEmail && "hidden"
//                     }`}
//                 >
//                     Confirm email
//                 </button> */}
//             </div>
//         </div>
//         <a
//             // href="/login"
//             onClick={logout}
//             className="text-primary rounded-md py-3 px-5 w-fit sm:line-height-lg"
//         >
//             Logout
//         </a>
//     </div>
// </header>
