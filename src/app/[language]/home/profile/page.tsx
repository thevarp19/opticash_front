"use client";

import { CreditCard } from "@/components/card/CreditCard";
import { useLanguage } from "@/context/LanguageContext";
import { axiosAuthorized } from "@/lib/axios";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const { getHref } = useLanguage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: cards, isPending } = useQuery({
        queryKey: ["cards"],
        queryFn: async () => {
            const { data } = await axiosAuthorized.get(`/api/cards/`);
            return data;
        },
        retry: 2,
    });

    if (isPending) {
        return (
            <div className="w-full h-[60vh] items-center flex justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="w-full h-full pb-40 flex flex-col justify-center items-center pt-5 gap-5">
            <Link
                href={getHref("/home/profile/create-card/")}
                type="button"
                className="mr-5 self-end inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                />
                Новая карта
            </Link>
            <div className="h-full border-2 border-primary bg-gray-100 p-5 rounded-lg ">
                <h2 className="text-primary text-3xl pb-5 font-bold">
                    Мои карты
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:min-w-[1064px] md:min-h-[472px] w-full">
                    {cards && cards.length === 0 && (
                        <div className="col-span-3 text-center text-lg text-gray-700">
                            Карты не найдены.
                        </div>
                    )}
                    {cards?.map((card: any, key: number) => (
                        <CreditCard
                            key={key}
                            cardId={card.id}
                            bankName={card.bank_name || ""}
                            cardTitle={card.card_type_name}
                            cardNumber={card.number}
                            expirationDate={card.expired_date}
                            name={card.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
