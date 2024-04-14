"use client";
import { CreditCardSmall } from "@/components/card/CreditCardSmall";
import { axiosAuthorized } from "@/lib/axios";
import { Disclosure } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Select, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = {
    id: string;
    category: string;
};

const sortOptions = [
    { name: "Ask", href: "#", current: true },
    { name: "Desc", href: "#", current: false },
];
export default function HomePage() {
    const { message } = App.useApp();
    const router = useRouter();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // const [ordering, setOrdering] = useState<string>("");
    const [hasQRPayment, setHasQRPayment] = useState<boolean | null>(null); // Added state for QR payment filter
    const [hasCardPayment, setHasCardPayment] = useState<boolean | null>(null); // Added state for Card payment filter
    const [minPercent, setMinPercent] = useState<number | null>(null); // Added state for minimum percent
    const [maxPercent, setMaxPercent] = useState<number | null>(null); // Added state for maximum percent

    const handleChange = (selectedItems: string[]) => {
        setSelectedCategories(selectedItems);
    };

    // const handleOrderChange = (value: string) => {
    //     setOrdering(value);
    // };

    const { data: categories, isPending } = useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axiosAuthorized.get(`/api/category/`);
            return data;
        },
        retry: 2,
    });

    const fetchCashback = async () => {
        let queryString = selectedCategories.reduce(
            (acc, cur) => `${acc}category=${cur}&`,
            ""
        );
        // queryString += ordering ? `ordering=${ordering}&` : "";
        queryString +=
            hasQRPayment !== null ? `has_qr_payment=${hasQRPayment}&` : "";
        queryString +=
            hasCardPayment !== null
                ? `has_card_payment=${hasCardPayment}&`
                : "";
        queryString += minPercent !== null ? `min_percent=${minPercent}&` : "";
        queryString += maxPercent !== null ? `max_percent=${maxPercent}` : "";

        const { data } = await axiosAuthorized.get(
            `/api/cashback/get_user_cashbacks/?${queryString}`
        );
        return data;
    };

    const cashbackMutation = useMutation({
        mutationFn: fetchCashback,
        onSuccess: (data) => {
            console.log(data);
            message.success("Cashback data retrieved successfully!");
        },
        onError: (error) => {
            console.error(error);
            message.error("Error fetching cashback data!");
        },
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedCategories.length) {
            message.warning("Please select at least one category.");
            return;
        }
        cashbackMutation.mutate();
    };

    return (
        <div className="min-h-screen w-full bg-white shadow sm:rounded-lg">
            <div className="flex flex-col items-center w-full px-4 py-5 sm:p-6 gap-5">
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Выберите категорию вашего продукта
                    </h3>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-5 w-full max-w-80 flex flex-col items-center gap-5 pb-10"
                    >
                        <div className="w-full sm:max-w-xs flex items-center ">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Выберите категорию"
                                value={selectedCategories}
                                onChange={handleChange}
                            >
                                {categories?.map((category: Category) => (
                                    <Option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.category}
                                    </Option>
                                ))}
                            </Select>

                            {/* <Spin size="small" spinning={isPending} /> */}
                        </div>
                        <Disclosure
                            as="section"
                            aria-labelledby="filter-heading"
                            className="grid items-center border-b border-t border-gray-200"
                        >
                            <h2 id="filter-heading" className="sr-only">
                                Filters
                            </h2>
                            <div className="relative col-start-1 row-start-1 py-4">
                                <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                                    <div>
                                        <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                                            <FunnelIcon
                                                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Фильтры
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                            <Disclosure.Panel className="border-t border-gray-200 py-10">
                                <div className="mx-auto flex max-w-7xl flex-col gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                                    <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                                        <fieldset>
                                            <legend className="block font-medium">
                                                <Select
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    placeholder="QR Payment"
                                                    onChange={(value) =>
                                                        setHasQRPayment(
                                                            value === "true"
                                                        )
                                                    }
                                                >
                                                    <Option value="true">
                                                        Да
                                                    </Option>
                                                    <Option value="false">
                                                        Нет
                                                    </Option>
                                                </Select>
                                                <div className="grid grid-cols-2 grid-template-areas gap-x-14 w-full"></div>
                                            </legend>
                                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4"></div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="block font-medium">
                                                <Select
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    placeholder="Card Payment"
                                                    onChange={(value) =>
                                                        setHasCardPayment(
                                                            value === "true"
                                                        )
                                                    }
                                                >
                                                    <Option value="true">
                                                        Да
                                                    </Option>
                                                    <Option value="false">
                                                        Нет
                                                    </Option>
                                                </Select>
                                                <div className="grid grid-cols-2 grid-template-areas gap-x-14 w-full">
                                                    {" "}
                                                </div>
                                            </legend>
                                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4"></div>
                                        </fieldset>
                                    </div>
                                    <fieldset>
                                        <legend className="block font-medium">
                                            <div className="grid grid-cols-2 grid-template-areas gap-x-14 w-full">
                                                <input
                                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    type="number"
                                                    placeholder="Мин процент"
                                                    onChange={(e) =>
                                                        setMinPercent(
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                                <input
                                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    type="number"
                                                    placeholder="Макс процент"
                                                    onChange={(e) =>
                                                        setMaxPercent(
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                        </legend>
                                    </fieldset>
                                </div>
                                <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6"></div>
                            </Disclosure.Panel>
                            <div className="col-start-1 row-start-1 py-4">
                                <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8"></div>
                            </div>
                        </Disclosure>

                        <button
                            disabled={cashbackMutation.isPending}
                            type="submit"
                            className="mt-3 inline-flex min-w-80 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  sm:w-auto"
                        >
                            Анализировать
                        </button>
                    </form>
                </div>
                {cashbackMutation.isPending && <Spin size="large" />}
                {cashbackMutation?.data?.user_cashbacks && (
                    <div className="mx-auto min-w-auto lg:max-w-5xl sm:min-w-[600px] px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto min-w-[320px] max-w-2xl lg:mx-0 lg:max-w-none border border-gray-200 rounded-md">
                            <div className="flex items-center justify-between ">
                                <div className="w-full border-b border-gray-200 bg-gray-50 p-3">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Ваши карты
                                    </h2>
                                </div>
                            </div>
                            <ul
                                role="list"
                                className=" grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 p-5"
                            >
                                {cashbackMutation?.data?.user_cashbacks
                                    ?.length > 0 ? (
                                    cashbackMutation.data.user_cashbacks.map(
                                        (card: any, key: number) => (
                                            <CreditCardSmall
                                                key={key}
                                                isBest={key === 0}
                                                cardUser={card.user_name}
                                                hasQRPayment={
                                                    card.has_qr_payment
                                                }
                                                hasCardPayment={
                                                    card.has_card_payment
                                                }
                                                cardType={card.bank_card_type}
                                                cardName={card.bank}
                                                cashbackPercentage={
                                                    card.percent
                                                }
                                                cardNumber="****************"
                                            />
                                        )
                                    )
                                ) : (
                                    <p>Кэшбэки не найдены.</p>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
                {cashbackMutation?.data?.other_cashbacks && (
                    <div className="mx-auto min-w-auto lg:max-w-5xl sm:min-w-[600px] px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto min-w-[320px] max-w-2xl lg:mx-0 lg:max-w-none border border-gray-200 rounded-md">
                            <div className="flex items-center justify-between ">
                                <div className="w-full border-b border-gray-200 bg-gray-50 p-3">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Все карты
                                    </h2>
                                </div>
                            </div>
                            <ul
                                role="list"
                                className=" grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 p-5"
                            >
                                {cashbackMutation?.data?.other_cashbacks
                                    ?.length > 0 ? (
                                    cashbackMutation.data.other_cashbacks.map(
                                        (card: any, key: number) => (
                                            <CreditCardSmall
                                                key={key}
                                                isBest={key === 0}
                                                cardUser={card.user_name}
                                                hasQRPayment={
                                                    card.has_qr_payment
                                                }
                                                hasCardPayment={
                                                    card.has_card_payment
                                                }
                                                cardType={card.bank_card_type}
                                                cardName={card.bank}
                                                cashbackPercentage={
                                                    card.percent
                                                }
                                                cardNumber="****************"
                                            />
                                        )
                                    )
                                ) : (
                                    <p>Кэшбэки не найдены</p>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
