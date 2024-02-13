import {
    Page,
    Text,
    Icon,
    Avatar,
} from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import "../../assets/preorder.css";
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
import Activation from "./Activation";
import ProductTable from "./ProductTable";
import OrderLimit from "./OrderLimit";
import Schedule from "./Schedule";
import DisplayMessage from "./DisplayMessage";
import OrdersTable from "./OrdersTable";
import ColorNText from "./ColorNText";
import BadgeDesign from "./BadgeDesign";
import { useDispatch, useSelector } from 'react-redux'
import { setActivation, setShopName } from "../../store/reducers/PreOrder";

export default function PreOrder() {
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const shopName = useSelector((state) => state.preorder?.shopName);
    const primaryAction = { content: "Help", url: "/help" };

    const [storeName, setStoreName] = useState('');
    const [storeMainPart, setStoreMainPart] = useState('');
    const [flagActivation, setFlagActivation] = useState(true);
    const [flagProductSetup, setFlagProductSetup] = useState(false);
    const [flagOrderLimit, setFlagOrderLimit] = useState(false);
    const [flagOrderSchedule, setFlagOrderSchedule] = useState(false);
    const [flagDisplayMessage, setFlagDisplayMessage] = useState(false);
    const [flagBadgeDesign, setFlagBadgeDesign] = useState(false);
    const [flagColorNText, setFlagColorNText] = useState(false);
    const [flagCustomCoding, setFlagCustomCoding] = useState(false);
    const [flagPreOrderList, setFlagPreOrderList] = useState(false);

    function activeActivation() {
        setFlagActivation(true);
        setFlagProductSetup(false);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(false);
        setFlagColorNText(false);
        setFlagCustomCoding(false);
        setFlagPreOrderList(false)
        setFlagBadgeDesign(false);
    }

    function activeProductSetup() {
        setFlagActivation(false);
        setFlagProductSetup(true);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(false);
        setFlagColorNText(false);
        setFlagCustomCoding(false);
        setFlagPreOrderList(false)
        setFlagBadgeDesign(false);
    }

    function activeOrderLimit() {
        setFlagActivation(false);
        setFlagProductSetup(false);
        setFlagOrderLimit(true);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(false);
        setFlagColorNText(false);
        setFlagCustomCoding(false);
        setFlagPreOrderList(false)
        setFlagBadgeDesign(false);
    }

    function activeOrderSchedule() {
        setFlagActivation(false);
        setFlagProductSetup(false);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(true);
        setFlagDisplayMessage(false);
        setFlagColorNText(false);
        setFlagCustomCoding(false);
        setFlagPreOrderList(false)
        setFlagBadgeDesign(false);
    }

    function activeOrderDisplayMessage() {
        setFlagActivation(false);
        setFlagProductSetup(false);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(true);
        setFlagColorNText(false);
        setFlagCustomCoding(false);
        setFlagPreOrderList(false)
        setFlagBadgeDesign(false);
    }

    function activeColorNText() {
        setFlagActivation(false);
        setFlagProductSetup(false);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(false);
        setFlagColorNText(true);
        setFlagCustomCoding(false);
        setFlagPreOrderList(false);
        setFlagBadgeDesign(false);
    }

    function activeBadgeDesign() {
        setFlagActivation(false);
        setFlagProductSetup(false);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(false);
        setFlagColorNText(false);
        setFlagCustomCoding(false);
        setFlagPreOrderList(false);
        setFlagBadgeDesign(true);
    }

    function activeCustomCoding() {
        setFlagActivation(false);
        setFlagProductSetup(false);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(false);
        setFlagColorNText(false);
        setFlagCustomCoding(true);
        setFlagPreOrderList(false);
        setFlagBadgeDesign(false);
    }

    function activePreOrderList() {
        setFlagActivation(false);
        setFlagProductSetup(false);
        setFlagOrderLimit(false);
        setFlagOrderSchedule(false);
        setFlagDisplayMessage(false);
        setFlagColorNText(false);
        setFlagCustomCoding(false);
        setFlagPreOrderList(true);
        setFlagBadgeDesign(false);
    }

    const setStoreWithoutShopifySubDomain = (shop) => {
        const mainPart = shop.split('.');
        const parts = mainPart[0].split('-');
        const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        const capitalizedUrl = capitalizedParts.join('-');
        setStoreMainPart(capitalizedUrl);
    }

    const getShopName = async () => {
        const response = await fetch("/api/preorder/init");
        if (response.ok) {
            const preOrderActivation = await response.json();
            dispatch(setShopName(preOrderActivation?.shop));
            dispatch(setActivation({
                'active' : preOrderActivation.active,
                'active_on_collection' : preOrderActivation.active_on_collection,
                'active_on_product' : preOrderActivation.active_on_product,
                'when_show_pre_order': preOrderActivation.when_show_pre_order,
                'specific_inventory': preOrderActivation.specific_inventory
            }))
            setStoreName(preOrderActivation?.shop)
            setStoreWithoutShopifySubDomain(preOrderActivation?.shop);
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        if(shopName.length === 0) getShopName();
    }, []);

    return (
        <Page fullWidth>
            <TitleBar
                title="Pre Order: Settings"
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
                                        {shopName}
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

                            <li
                                className="cursor-pointer"
                                onClick={() => activeProductSetup()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagProductSetup
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={ProductsMajor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Product Setup</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li
                                className="cursor-pointer"
                                onClick={() => activePreOrderList()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagPreOrderList
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={OrdersMinor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Pre Orders</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li
                                className="cursor-pointer"
                                onClick={() => activeColorNText()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagColorNText
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={ColorsMajor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Colors & Text</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li
                                className="cursor-pointer"
                                onClick={() => activeOrderLimit()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagOrderLimit
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={OrdersFilledMinor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Order Limit</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li
                                className="cursor-pointer"
                                onClick={() => activeOrderSchedule()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagOrderSchedule
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={CalendarTimeMinor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Set Schedule</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li
                                className="cursor-pointer"
                                onClick={() => activeOrderDisplayMessage()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagDisplayMessage
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={ChatMajor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Display Message</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li
                                className="cursor-pointer"
                                onClick={() => activeBadgeDesign()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagBadgeDesign
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={DiscountsMajor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Badge Design</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* <li
                                className="cursor-pointer"
                                onClick={() => activeCustomCoding()}
                            >
                                <div
                                    className={
                                        "rounded-lg py-1 px-2 " +
                                        (flagCustomCoding
                                            ? "bg-slate-200"
                                            : "bg-white")
                                    }
                                >
                                    <div className="flex justify-start">
                                        <Icon source={CodeMajor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Custom CSS</Text>
                                        </div>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                    </nav>
                </div>
                <div className="flex-1">
                    {flagActivation && <Activation />}
                    {flagProductSetup && <ProductTable />}
                    {flagPreOrderList && <OrdersTable />}
                    {flagOrderLimit && <OrderLimit />}
                    {flagOrderSchedule && <Schedule />}
                    {flagDisplayMessage && <DisplayMessage />}
                    {flagBadgeDesign && <BadgeDesign />}
                    {flagColorNText && <ColorNText />}
                </div>
            </div>
        </Page>
    );
}
