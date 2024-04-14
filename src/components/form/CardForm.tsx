import { createCard } from "@/api/card";
import { useLanguage } from "@/context/LanguageContext";
import { axiosAuthorized } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const CardForm = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { message } = App.useApp();
    const { getHref } = useLanguage();
    const mutation = useMutation({
        mutationFn: createCard,
        onSuccess() {
            message.success("Success!");
            router.push(getHref("/home/profile"));
        },
        onError() {
            message.error("Error!");
        },
    });

    const handleSubmit = async () => {
        const registerDTO: any = {
            number: formik.values.number,
            expired_date: formik.values.expired_date,
            card_type: formik.values.card_type,
            // card_type_name: formik.values.card_type_name,
            // name: formik.values.name,
        };
        await mutation.mutateAsync(registerDTO);
    };

    const formik = useFormik<any>({
        initialValues: {
            number: "",
            expired_date: "",
            card_type: "",
            // card_type_name: null,
            // name: "",
        },

        onSubmit: handleSubmit,
    });
    const [selectedBank, setSelectedBank] = useState("");

    const { data: banks, isPending } = useQuery({
        queryKey: ["banks"],
        queryFn: async () => {
            const { data } = await axiosAuthorized.get(`/api/bank/`);
            return data;
        },
        retry: 2,
    });
    const { data: cardTypes, isPending: isCardTypesPending } = useQuery({
        queryKey: ["cardTypes", selectedBank],
        queryFn: async () => {
            if (!selectedBank) return null;
            const { data } = await axiosAuthorized.get(
                `/api/bank/${selectedBank}/`
            );
            return data;
        },
        enabled: !!selectedBank,
        retry: 2,
    });
    useEffect(() => {
        formik.setFieldValue("card_type", selectedBank);
    }, [selectedBank, formik.setFieldValue]);

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                {/* Payment */}
                <form onSubmit={formik.handleSubmit} className="pt-10">
                    <h2 className="text-lg font-medium text-gray-900">
                        Платежные данные
                    </h2>

                    <fieldset className="mt-4">
                        <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Выберите карту
                        </label>
                        <select
                            onChange={(e) => setSelectedBank(e.target.value)}
                            value={selectedBank}
                            id="card"
                            name="card"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {banks?.map((bank: any) => (
                                <option key={bank.id} value={bank.id}>
                                    {bank.name}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    {selectedBank && cardTypes && (
                        <fieldset className="mt-4">
                            <label
                                htmlFor="card-type"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Выберите тип карты
                            </label>
                            <select
                                onChange={formik.handleChange}
                                value={formik.values.card_type}
                                id="card_type"
                                name="card_type"
                                defaultValue={formik.values.card_type}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {cardTypes?.cards.map((type: any) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                    )}
                    <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                        <div className="col-span-4">
                            <label
                                htmlFor="card-number"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Номер карта
                            </label>
                            <div className="mt-1">
                                <input
                                    maxLength={16}
                                    type="text"
                                    id="number"
                                    name="number"
                                    value={formik.values.number}
                                    onChange={formik.handleChange}
                                    autoComplete="cc-number"
                                    className="block w-full px-3 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label
                                htmlFor="expiration-date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Срок действие (MM/YY)
                            </label>
                            <div className="mt-1">
                                <input
                                    maxLength={5}
                                    type="text"
                                    name="expired_date"
                                    id="expired_date"
                                    onChange={formik.handleChange}
                                    value={formik.values.expired_date}
                                    autoComplete="cc-exp"
                                    className="block w-full px-3 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="col-span-4 flex justify-end w-full">
                            <button
                                type="submit"
                                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last  sm:w-full"
                            >
                                Добавить карту
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
