import { deleteCard } from "@/api/card";
import { useMutation } from "@tanstack/react-query";
import { App, Popconfirm } from "antd";
import Image from "next/image";
import { getImageOfCard } from "./CreditCardSmall";

export const CreditCard = ({
    cardId,
    cardTitle,
    cardNumber,
    name,
    expirationDate,
    bankName,
}: {
    cardId: number;
    cardTitle: string;
    cardNumber: number;
    name: string;
    expirationDate: string;
    bankName: string;
}) => {
    function formatCreditCardNumber(num: number) {
        const digitsOnly = String(num).replace(/\D/g, "");
        const groups = digitsOnly.match(/.{1,4}/g);
        return groups ? groups.join(" ") : "";
    }

    const { message } = App.useApp();

    const mutation = useMutation({
        mutationFn: deleteCard,
        onSuccess() {
            message.success("Success!");
            window.location.reload();
        },
        onError() {
            message.error("Error!");
        },
    });
    return (
        <div className="flex w-max h-max">
            <div className="mx-auto my-2 bg-gray-300 shadow-xl rounded-lg p-6 relative">
                <Popconfirm
                    title="Удалить эту карту "
                    description="Вы уверены, что хотите удалить эту карту?"
                    onConfirm={async () => {
                        await mutation.mutateAsync(cardId);
                    }}
                >
                    <span className="cursor-pointer absolute top-0 right-0 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-red-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </Popconfirm>{" "}
                <div className="flex justify-start mb-6 w-72">
                    <Image
                        width={48}
                        height={48}
                        alt="logo"
                        className="h-12"
                        src={getImageOfCard(bankName)}
                    />
                    <h2 className="px-2 truncate font-semibold text-gray-700">
                        {cardTitle}
                    </h2>
                </div>
                <div className="flex items-center mb-4 w-88">
                    <div className="space-x-2">
                        <span className="text-lg text-gray-700">
                            {formatCreditCardNumber(cardNumber)}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-700 text-sm uppercase">
                            {name}
                        </span>
                    </div>
                    <div className="text-right flex gap-1">
                        <span className="text-gray-700 text-sm uppercase">
                            годен до:
                        </span>
                        <div className="text-gray-700 text-sm">
                            {expirationDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
