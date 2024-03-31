import { Page, Text, Icon, Avatar } from "@shopify/polaris";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useEffect, useState, Fragment } from "react";
import Navbar from "../../components/Navbar.jsx";
import "../../assets/preorder.css";
import {
    ChatIcon,
    StatusActiveIcon,
    ProductIcon,
    OrderIcon,
    CalendarTimeIcon,
    DiscountIcon,
    ColorIcon,
    OrderRepeatIcon,
    ProductListIcon,
    ChevronDownIcon
} from "@shopify/polaris-icons";
import Activation from "./Activation";
import ProductTable from "./ProductTable";
import OrderLimit from "./OrderLimit";
import Schedule from "./Schedule";
import DisplayMessage from "./DisplayMessage";
import OrdersTable from "./OrdersTable";
import ColorNText from "./ColorNText";
import BadgeDesign from "./BadgeDesign";
import { useDispatch, useSelector } from "react-redux";
import { setActivation, setShopName } from "../../store/reducers/PreOrder";

export default function PreOrder() {
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const shopName = useSelector((state) => state.preorder?.shopName);

    const [storeName, setStoreName] = useState("");
    const [storeMainPart, setStoreMainPart] = useState("");

    const flags = [
        { id: 1, name: "Activation", icon: StatusActiveIcon },
        { id: 2, name: "Product Setup", icon: ProductIcon },
        { id: 3, name: "Pre Orders", icon: OrderRepeatIcon },
        { id: 4, name: "Colors & Text", icon: ColorIcon },
        { id: 5, name: "Order Limit", icon: OrderIcon },
        { id: 6, name: "Set Schedule", icon: CalendarTimeIcon },
        { id: 7, name: "Display Message", icon: ChatIcon },
        { id: 8, name: "Badge Design", icon: DiscountIcon },
    ];

    const [activeFlag, setActiveFlag] = useState("Activation");

    const handleFlagClick = (flagName) => {
        setActiveFlag(flagName);
    };

    const FlagItem = ({ flag, isActive }) => {
        const bgColor = isActive ? "bg-slate-200" : "bg-white";
        return (
            <li
                className="cursor-pointer rounded-lg py-1 px-2"
                key={flag.name}
                onClick={() => handleFlagClick(flag.name)}
            >
                <div className={`rounded-lg py-1 px-2 ${bgColor}`}>
                    <div className="flex justify-start">
                        <Icon source={flag.icon} />
                        <div className="ml-2 flex-1">
                            <Text>{flag.name}</Text>
                        </div>
                    </div>
                </div>
            </li>
        );
    };

    const setStoreWithoutShopifySubDomain = (shop) => {
        const mainPart = shop.split(".");
        const parts = mainPart[0].split("-");
        const capitalizedParts = parts.map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1)
        );
        const capitalizedUrl = capitalizedParts.join("-");
        setStoreMainPart(capitalizedUrl);
    };

    const getShopName = async () => {
        const response = await fetch("/api/preorder/init");
        if (response.ok) {
            const preOrderActivation = await response.json();
            dispatch(setShopName(preOrderActivation?.shop));
            dispatch(
                setActivation({
                    active: preOrderActivation.active,
                    active_on_collection:
                        preOrderActivation.active_on_collection,
                    active_on_product: preOrderActivation.active_on_product,
                    when_show_pre_order: preOrderActivation.when_show_pre_order,
                    specific_inventory: preOrderActivation.specific_inventory,
                })
            );
            setStoreName(preOrderActivation?.shop);
            setStoreWithoutShopifySubDomain(preOrderActivation?.shop);
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(flags[0]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeActiveSection = (activatedSection) => {
        setSelectedSection(activatedSection);
        setIsOpen(false);
        setActiveFlag(activatedSection.name)
    };

    useEffect(() => {
        if (shopName.length === 0) getShopName();
        else setStoreWithoutShopifySubDomain(shopName);
    }, []);

    return (
        <>
            <Navbar title="Dashboard" />
            <Page fullWidth>
                <div className="relative md:hidden ml-3 mb-3 mr-3">
                    <button
                        type="button"
                        className="flex mr-3 relative w-full cursor-default rounded-md bg-white py-1.5 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        onClick={toggleDropdown}
                    >
                        <span className="flex">
                            <div className="mx-0">
                              <Icon source={selectedSection.icon}/>
                            </div>
                            <span className="ml-3 block truncate">
                                {selectedSection.name}
                            </span>
                        </span>
                        <div className="ml-auto"><Icon source={ChevronDownIcon} /></div>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {flags.map((flag) => (
                                <button
                                    key={flag.id}
                                    type="button"
                                    className={`w-full relative cursor-default select-none py-2 pl-3 pr-9 text-left ${
                                        selectedSection === flag
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-900"
                                    }`}
                                    onClick={() => changeActiveSection(flag)}
                                >
                                    <div className="flex">
                                        <div className="mx-0">
                                          <Icon source={flag.icon}/>
                                        </div>
                                        <span
                                            className={`${
                                                (selectedSection === flag
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                "ml-3 block truncate")
                                            }`}
                                        >
                                            {flag.name}
                                        </span>
                                    </div>
                                    {selectedSection === flag && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <Icon
                                                source={ProductListIcon}
                                                className="h-5 w-5 text-white"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex">
                    <div className="self-start preorder-nav mx-3 hs-overlay hs-overlay-open:translate-x-0 w-64 bg-white -translate-x-full transition-all duration-300 transform hidden z-[60] border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
                        <nav
                            className="hs-accordion-group pb-3 w-full flex flex-col flex-wrap"
                            data-hs-accordion-always-open
                        >
                            <div className="gap-2 flex items-center bg-gray-200 justify-start p-3">
                                <div className="flex grow-0 shrink-0 basis-auto items-center">
                                    <img
                                        width="40"
                                        height="40"
                                        src="https://img.icons8.com/emoji/40/convenience-store.png"
                                        alt="convenience-store"
                                    />
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
                            <ul className="space-y-1.5 mt-3">
                                {flags.map((flag) => (
                                    <FlagItem
                                        key={flag.name}
                                        flag={flag}
                                        isActive={flag.name === activeFlag}
                                    />
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="flex-1 px-3">
                        {activeFlag === "Activation" && <Activation />}
                        {activeFlag === "Product Setup" && <ProductTable />}
                        {activeFlag === "Pre Orders" && <OrdersTable />}
                        {activeFlag === "Order Limit" && <OrderLimit />}
                        {activeFlag === "Set Schedule" && <Schedule />}
                        {activeFlag === "Display Message" && <DisplayMessage />}
                        {activeFlag === "Badge Design" && <BadgeDesign />}
                        {activeFlag === "Colors & Text" && <ColorNText />}
                    </div>
                </div>
            </Page>
        </>
    );
}
