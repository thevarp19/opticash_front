import React from "react";

// Props interface for CreditCardSmall component
interface CardProps {
    cardName: string;
    cardType: string;
    cardUser: string;
    cashbackPercentage: number;
    cardNumber: string;
    hasQRPayment: boolean;
    hasCardPayment: boolean;
    isBest: boolean;
}

export function getImageOfCard(name: string): string {
    if (name === "ForteBank") {
        return "/images/fortebank_logo.jpeg";
    }
    if (name === "Kaspi") {
        return "/images/kaspi-logo.png";
    }
    if (name === "Jusan") {
        return "/images/jusan-logo.png";
    }
    if (name === "Halyk") {
        return "/images/halyk-logo.png";
    }
    if (name === "Freedom") {
        return "/images/freedom-logo.png";
    }
    if (name === "Home Credit Bank") {
        return "/images/home-bank-logo.png";
    }
    return "https://d2vm05b1botqyl.cloudfront.net/images/p13_v3_wgc_nt/quiz/anxious/1.webp";
}

export const CreditCardSmall: React.FC<CardProps> = ({
    cardName,
    cardType,
    cardUser,
    cashbackPercentage,
    cardNumber,
    hasQRPayment,
    hasCardPayment,
    isBest,
}) => {
    const formattedCardNumber = cardNumber.replace(/(.{4})/g, "$1 ");

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <li
            className={`overflow-hidden rounded-xl border ${
                isBest
                    ? "border-2 border-indigo-900 shadow-2xl bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0 relative rounded-2xl scale-[115%]"
                    : "border-gray-200"
            } max-w-[350px] min-w-[230px]`}
        >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                    src={getImageOfCard(cardName)}
                    alt={cardName}
                    className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div className="text-sm font-medium leading-6 text-gray-900">
                    {cardName}
                </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500 whitespace-nowrap">
                        Банковская карта
                    </dt>
                    <dd className="text-gray-700 truncate">{cardType}</dd>
                </div>
                {cardUser && (
                    <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Имя Фамилия</dt>
                        <dd className="text-gray-700">
                            <time dateTime={cardType}>{cardUser}</time>
                        </dd>
                    </div>
                )}
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Кэшбэк</dt>
                    <dd className="flex items-start gap-x-2">
                        <div className="font-medium text-gray-900">
                            {cashbackPercentage} %
                        </div>
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">QR оплата</dt>
                    <dd className="flex items-start gap-x-2">
                        <div className="font-medium text-gray-900">
                            {hasQRPayment ? "Да" : "Нет"}
                        </div>
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Оплата картой</dt>
                    <dd className="flex items-start gap-x-2">
                        <div className="font-medium text-gray-900">
                            {hasCardPayment ? "Да" : "Неи"}
                        </div>
                    </dd>
                </div>
            </dl>
        </li>

        // <div className="max-w-xs mx-auto my-10 bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg rounded-lg overflow-hidden">
        //     <div className="p-5">
        //         <div className="flex justify-between">
        //             <div>
        //                 <div className="text-[8px] truncate text-yellow-300 uppercase tracking-wider">
        //                     {cardName}
        //                 </div>
        //                 <div className="text-xs truncate font-medium text-gray-200 uppercase tracking-wider">
        //                     {cardType}
        //                 </div>
        //             </div>
        //             <div className="bg-yellow-400 rounded-sm p-1">
        //                 <div className="bg-white w-8 h-5 rounded-sm"></div>
        //             </div>
        //         </div>
        //         <div className="text-lg font-semibold text-white">
        //             {cashbackPercentage} cash
        //         </div>
        //         <div className="text-xl  text-white mt-2">
        //             {formattedCardNumber}
        //         </div>
        //     </div>
        // </div>
    );
};
