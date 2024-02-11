import { TitleBar } from "@shopify/app-bridge-react";
import { Page, Icon, Text } from "@shopify/polaris"
import { useState } from "react";
import {
    ChatMajor,
    StatusActiveMajor,
    ProductsMajor,
    OrdersFilledMinor,
    CalendarTimeMinor,
    DiscountsMajor,
    ColorsMajor,
    OrdersMinor
} from "@shopify/polaris-icons";


export default function ComingSoon() {
    const primaryAction = { content: "Help", url: "/help" };

    const [storeName, setStoreName] = useState('');
    const [storeMainPart, setStoreMainPart] = useState('');

    const [flagActivation, setFlagActivation] = useState(true);
    return (
        <Page fullWidth>
            <TitleBar
                title="Coming Soon: Settings"
                primaryAction={primaryAction}
            />

            <div className="flex">
                <div
                    className="self-start preorder-nav mx-3 hs-overlay hs-overlay-open:translate-x-0 w-64 bg-white -translate-x-full transition-all duration-300 transform hidden z-[60] border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
                >
                    <nav
                        className="hs-accordion-group pb-3 w-full flex flex-col flex-wrap"
                        data-hs-accordion-always-open
                    >
                        <div className="gap-2 flex items-center bg-gray-200 justify-start p-3">
                            <div className="flex grow-0 shrink-0 basis-auto items-center">
                                <img width="40" height="40" src="https://img.icons8.com/emoji/40/convenience-store.png" alt="convenience-store"/>
                            </div>
                            <div>
                                <h3 className="BHLa_">{storeMainPart}</h3>
                                <p className="MIA9A">
                                    <span className="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj Polaris-Text--subdued_17vaa">
                                        {storeName}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <ul className="space-y-1.5 mt-3 px-2">
                            <li
                                className="cursor-pointer"
                                onClick={() => activeActivation()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagActivation
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={StatusActiveMajor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Activation</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </Page>
    );
}
