import {
    Card,
    Page,
    Layout,
    TextContainer,
    EmptyState,
    TextField,
    Modal,
    Button,
    PageActions,
    DatePicker,
    Text,
    AccountConnection,
    Link,
    BlockStack,
    Divider,
    OptionList,
    Icon,
    Avatar,
    useBreakpoints,
    Badge,
    useIndexResourceState,
} from "@shopify/polaris";
import { TitleBar, ResourcePicker } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import "../../assets/preorder.css";
import {
    ChatMajor,
    StatusActiveMajor,
    ProductsMajor,
    OrdersFilledMinor,
    CalendarTimeMinor,
    DiscountsMajor,
    ColorsMajor,
    CodeMajor,
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

export default function PreOrder() {
    const productListDummy = [
        {
            availablePublicationCount: 4,
            createdAt: "2023-11-07T17:42:38Z",
            descriptionHtml: "",
            handle: "selling-plans-ski-wax",
            hasOnlyDefaultVariant: false,
            id: "gid://shopify/Product/8301163675812",
            images: [
                {
                    id: "gid://shopify/ProductImage/43490589409444",
                    altText: "A bar of golden yellow wax",
                    originalSrc:
                        "https://cdn.shopify.com/s/files/1/0629/2599/6196/products/snowboard_wax.png?v=1699378958",
                },
                {
                    id: "gid://shopify/ProductImage/43490589474980",
                    altText: "A bar of purple wax",
                    originalSrc:
                        "https://cdn.shopify.com/s/files/1/0629/2599/6196/products/wax-special.png?v=1699378958",
                },
                {
                    id: "gid://shopify/ProductImage/43490589507748",
                    altText: "a small cube of wax",
                    originalSrc:
                        "https://cdn.shopify.com/s/files/1/0629/2599/6196/products/sample-normal-wax.png?v=1699378958",
                },
            ],
            options: [
                {
                    id: "gid://shopify/ProductOption/10596527931556",
                    name: "Title",
                    position: 1,
                    values: [
                        "Selling Plans Ski Wax",
                        "Special Selling Plans Ski Wax",
                        "Sample Selling Plans Ski Wax",
                    ],
                },
            ],
            productType: "",
            publishedAt: "2023-11-07T17:42:39Z",
            tags: ["Accessory", "Sport", "Winter"],
            templateSuffix: null,
            title: "Selling Plans Ski Wax",
            totalInventory: 30,
            tracksInventory: true,
            updatedAt: "2023-11-07T17:42:42Z",
            variants: [
                {
                    availableForSale: true,
                    barcode: null,
                    compareAtPrice: null,
                    createdAt: "2023-11-07T17:42:38Z",
                    displayName:
                        "Selling Plans Ski Wax - Selling Plans Ski Wax",
                    fulfillmentService: {
                        id: "gid://shopify/FulfillmentService/manual",
                        inventoryManagement: false,
                        productBased: true,
                        serviceName: "Manual",
                        type: "MANUAL",
                    },
                    id: "gid://shopify/ProductVariant/44738920710308",
                    image: {
                        id: "gid://shopify/ProductImage/43490589409444",
                        altText: "A bar of golden yellow wax",
                        originalSrc:
                            "https://cdn.shopify.com/s/files/1/0629/2599/6196/products/snowboard_wax.png?v=1699378958",
                    },
                    inventoryItem: {
                        __typename: "InventoryItem",
                        id: "gid://shopify/InventoryItem/46590023598244",
                    },
                    inventoryManagement: "SHOPIFY",
                    inventoryPolicy: "DENY",
                    inventoryQuantity: 10,
                    position: 1,
                    price: "24.95",
                    product: {
                        __typename: "Product",
                        id: "gid://shopify/Product/8301163675812",
                    },
                    requiresShipping: true,
                    selectedOptions: [
                        {
                            __typename: "SelectedOption",
                            value: "Selling Plans Ski Wax",
                        },
                    ],
                    sku: "",
                    taxable: true,
                    title: "Selling Plans Ski Wax",
                    updatedAt: "2023-11-07T17:42:38Z",
                    weight: 2,
                    weightUnit: "OUNCES",
                },
                {
                    availableForSale: true,
                    barcode: null,
                    compareAtPrice: null,
                    createdAt: "2023-11-07T17:42:38Z",
                    displayName:
                        "Selling Plans Ski Wax - Special Selling Plans Ski Wax",
                    fulfillmentService: {
                        id: "gid://shopify/FulfillmentService/manual",
                        inventoryManagement: false,
                        productBased: true,
                        serviceName: "Manual",
                        type: "MANUAL",
                    },
                    id: "gid://shopify/ProductVariant/44738920743076",
                    image: {
                        id: "gid://shopify/ProductImage/43490589474980",
                        altText: "A bar of purple wax",
                        originalSrc:
                            "https://cdn.shopify.com/s/files/1/0629/2599/6196/products/wax-special.png?v=1699378958",
                    },
                    inventoryItem: {
                        __typename: "InventoryItem",
                        id: "gid://shopify/InventoryItem/46590023631012",
                    },
                    inventoryManagement: "SHOPIFY",
                    inventoryPolicy: "DENY",
                    inventoryQuantity: 10,
                    position: 2,
                    price: "49.95",
                    product: {
                        __typename: "Product",
                        id: "gid://shopify/Product/8301163675812",
                    },
                    requiresShipping: true,
                    selectedOptions: [
                        {
                            __typename: "SelectedOption",
                            value: "Special Selling Plans Ski Wax",
                        },
                    ],
                    sku: "",
                    taxable: true,
                    title: "Special Selling Plans Ski Wax",
                    updatedAt: "2023-11-07T17:42:38Z",
                    weight: 2.5,
                    weightUnit: "OUNCES",
                },
                {
                    availableForSale: true,
                    barcode: null,
                    compareAtPrice: null,
                    createdAt: "2023-11-07T17:42:38Z",
                    displayName:
                        "Selling Plans Ski Wax - Sample Selling Plans Ski Wax",
                    fulfillmentService: {
                        id: "gid://shopify/FulfillmentService/manual",
                        inventoryManagement: false,
                        productBased: true,
                        serviceName: "Manual",
                        type: "MANUAL",
                    },
                    id: "gid://shopify/ProductVariant/44738920775844",
                    image: {
                        id: "gid://shopify/ProductImage/43490589507748",
                        altText: "a small cube of wax",
                        originalSrc:
                            "https://cdn.shopify.com/s/files/1/0629/2599/6196/products/sample-normal-wax.png?v=1699378958",
                    },
                    inventoryItem: {
                        __typename: "InventoryItem",
                        id: "gid://shopify/InventoryItem/46590023663780",
                    },
                    inventoryManagement: "SHOPIFY",
                    inventoryPolicy: "DENY",
                    inventoryQuantity: 10,
                    position: 3,
                    price: "9.95",
                    product: {
                        __typename: "Product",
                        id: "gid://shopify/Product/8301163675812",
                    },
                    requiresShipping: true,
                    selectedOptions: [
                        {
                            __typename: "SelectedOption",
                            value: "Sample Selling Plans Ski Wax",
                        },
                    ],
                    sku: "",
                    taxable: true,
                    title: "Sample Selling Plans Ski Wax",
                    updatedAt: "2023-11-07T17:42:38Z",
                    weight: 0.5,
                    weightUnit: "OUNCES",
                },
            ],
            vendor: "ShopQuizDQ",
            status: "ACTIVE",
        },
        {
            availablePublicationCount: 4,
            createdAt: "2023-11-07T17:42:35Z",
            descriptionHtml: "",
            handle: "the-3p-fulfilled-snowboard",
            hasOnlyDefaultVariant: true,
            id: "gid://shopify/Product/8301163577508",
            images: [
                {
                    id: "gid://shopify/ProductImage/43490589081764",
                    altText:
                        "Top and bottom view of a snowboard. The top view shows 7 stacked hexagons and the bottom view shows\n          a small, centred hexagonal logo for Hydrogen.",
                    originalSrc:
                        "https://cdn.shopify.com/s/files/1/0629/2599/6196/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1699378955",
                },
            ],
            options: [
                {
                    id: "gid://shopify/ProductOption/10596527833252",
                    name: "Title",
                    position: 1,
                    values: ["Default Title"],
                },
            ],
            productType: "",
            publishedAt: "2023-11-07T17:42:36Z",
            tags: ["Accessory", "Sport", "Winter"],
            templateSuffix: null,
            title: "The 3p Fulfilled Snowboard",
            totalInventory: 20,
            tracksInventory: true,
            updatedAt: "2023-11-07T17:42:42Z",
            variants: [
                {
                    availableForSale: true,
                    barcode: null,
                    compareAtPrice: null,
                    createdAt: "2023-11-07T17:42:35Z",
                    displayName: "The 3p Fulfilled Snowboard - Default Title",
                    fulfillmentService: {
                        id: "gid://shopify/FulfillmentService/manual",
                        inventoryManagement: false,
                        productBased: true,
                        serviceName: "Manual",
                        type: "MANUAL",
                    },
                    id: "gid://shopify/ProductVariant/44738920579236",
                    inventoryItem: {
                        __typename: "InventoryItem",
                        id: "gid://shopify/InventoryItem/46590023467172",
                    },
                    inventoryManagement: "SHOPIFY",
                    inventoryPolicy: "DENY",
                    inventoryQuantity: 20,
                    position: 1,
                    price: "2629.95",
                    product: {
                        __typename: "Product",
                        id: "gid://shopify/Product/8301163577508",
                    },
                    requiresShipping: true,
                    selectedOptions: [
                        {
                            __typename: "SelectedOption",
                            value: "Default Title",
                        },
                    ],
                    sku: "sku-hosted-1",
                    taxable: true,
                    title: "Default Title",
                    updatedAt: "2023-11-07T17:42:42Z",
                    weight: 0,
                    weightUnit: "KILOGRAMS",
                },
            ],
            vendor: "ShopQuizDQ",
            status: "ACTIVE",
        },
    ];
    const primaryAction = { content: "Help", url: "/help" };

    const [flagActivation, setFlagActivation] = useState(true);
    const [flagProductSetup, setFlagProductSetup] = useState(false);
    const [flagOrderLimit, setFlagOrderLimit] = useState(false);
    const [flagOrderSchedule, setFlagOrderSchedule] = useState(false);
    const [flagDisplayMessage, setFlagDisplayMessage] = useState(false);
    const [flagBadgeDesign, setFlagBadgeDesign] = useState(false);
    const [flagColorNText, setFlagColorNText] = useState(false);
    const [flagCustomCoding, setFlagCustomCoding] = useState(false);
    const [flagPreOrderProducts, setFlagPreOrderProducts] = useState(false)
    const [flagPreOrderList, setFlagPreOrderList] = useState(false);

    const [preOrderLimit, setPreOrderLimit] = useState(
        "preOrder-has-daily-limit"
    );

    // const [preOrderButtonText, setPreOrderButtonText] = useState("Pre Order");
    // const [preOrderUnderButtonText, setPreOrderUnderButtonText] = useState(
    //     "We will deliver your product as soon as possible."
    // );
    // const [preOrderTotalLimit, setPreOrderTotalLimit] = useState(0);
    // const [preOrderDailyTotalLimit, setPreOrderDailyTotalLimit] = useState(0);

    // const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
    // const [selectedDates, setSelectedDates] = useState({
    //     start: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
    //     end: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
    // });

    // const [connected, setConnected] = useState(false);

    // const handleAction = useCallback(() => {
    //     setConnected((connected) => !connected);
    // }, []);

    const [
        activePreOrderButtonTextPreviewModal,
        setActivePreOrderButtonTextPreviewModal,
    ] = useState(false);

    // const [preOrderTimeRemaining, setPreOrderTimeRemaining] = useState(false);
    // const [preOrderTimeRemainingMessage, setPreOrderTimeRemainingMessage] =
    //     useState("Only D days are remaining.");

    const [preOrderEndDateShowing, setPreOrderEndDateShowing] = useState(false);
    preOrderEndDateShowing;
    // const [preOrderEndDateMessage, setPreOrderEndDateMessage] = useState(
    //     "Pre Order ends on MM/DD/YYYY"
    // );

    // const [preOrderEstimatedDateMessage, setPreOrderEstimatedDateMessage] =
    //     useState("Pre Order Product will be available on MM/DD/YYYY");

    // const [productResourcePicker, setProductResourcePicker] = useState(false);

    // const handleChangePreOrderEndDateShowing = useCallback(
    //     (newChecked) => setPreOrderEndDateShowing(newChecked),
    //     []
    // );

    // const handleChangePreOrderTotalLimit = useCallback(
    //     (newValue) => setPreOrderTotalLimit(newValue),
    //     []
    // );

    // const handleChangePreOrderDailyTotalLimit = useCallback(
    //     (newValue) => setPreOrderDailyTotalLimit(newValue),
    //     []
    // );

    // const handleChangePreOrderButtonText = useCallback(
    //     (newValue) => setPreOrderButtonText(newValue),
    //     []
    // );

    // const handleChangePreOrderUnderButtonText = useCallback(
    //     (newValue) => setPreOrderUnderButtonText(newValue),
    //     []
    // );

    // const handleChangeOpenPreOrderButtonTextPreview = useCallback(
    //     () =>
    //         setActivePreOrderButtonTextPreviewModal(
    //             !activePreOrderButtonTextPreviewModal
    //         ),
    //     [activePreOrderButtonTextPreviewModal]
    // );

    // const handleChangePreOrderEndDateMessage = useCallback(
    //     (newValue) => setPreOrderEndDateMessage(newValue),
    //     []
    // );

    // const handleChangePreOrderTimeRemainingMessage = useCallback(
    //     (newValue) => setPreOrderTimeRemainingMessage(newValue),
    //     []
    // );

    // const handleChangePreOrderTimeRemaining = useCallback(
    //     (newValue) => setPreOrderTimeRemaining(newValue),
    //     []
    // );

    // const handleChangePreOrderEstimatedDateMessage = useCallback(
    //     (newValue) => setPreOrderEstimatedDateMessage(newValue),
    //     []
    // );

    // const GetPreviewModal = ({ imgSrc }) => {
    //     return (
    //         <div style={{ height: "500px" }}>
    //             <Modal
    //                 open={activePreOrderButtonTextPreviewModal}
    //                 onClose={handleChangeOpenPreOrderButtonTextPreview}
    //                 title="Reach more shoppers with Instagram product tags"
    //                 secondaryActions={[
    //                     {
    //                         content: "Close",
    //                         onAction: handleChangeOpenPreOrderButtonTextPreview,
    //                     },
    //                 ]}
    //             >
    //                 <Modal.Section>
    //                     <TextContainer>
    //                         <img
    //                             src={imgSrc}
    //                             alt="Preview of Pre Order Button and Under button Text"
    //                             className="mx-auto"
    //                         />
    //                     </TextContainer>
    //                 </Modal.Section>
    //             </Modal>
    //         </div>
    //     );
    // };

    // const preOrderProductList = {
    //     singular: "Product List",
    //     plural: "Product List",
    // };

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
                                <Avatar initials="WW" name="Woluwayemisi Weun-Jung" size="xl"/>
                            </div>
                            <div>
                                <h3 className="BHLa_">ShopQuizDQ</h3>
                                <p className="MIA9A">
                                    <span className="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj Polaris-Text--subdued_17vaa">
                                        shopquizdq.myshopify.com
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

                            <li
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
                            </li>
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
