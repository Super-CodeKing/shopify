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
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import "../../assets/preorder.css";
import { StatusActiveMajor, ProductsMajor } from "@shopify/polaris-icons";

export default function PreOrder() {
    const primaryAction = { content: "Help", url: "/help" };
    const [isPreOrderActive, setIsPreOrderStatus] = useState(true);

    const [flagActivation, setFlagActivation] = useState(true);
    const [flagProductSetup, setFlagProductSetup] = useState(false);

    const [preOrderLimit, setPreOrderLimit] = useState(
        "preOrder-has-daily-limit"
    );
    const [selected, setSelected] = useState([]);
    const [preOrderButtonText, setPreOrderButtonText] = useState("Pre Order");
    const [preOrderUnderButtonText, setPreOrderUnderButtonText] = useState(
        "We will deliver your product as soon as possible."
    );
    const [preOrderTotalLimit, setPreOrderTotalLimit] = useState(0);
    const [preOrderDailyTotalLimit, setPreOrderDailyTotalLimit] = useState(0);

    const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
    const [selectedDates, setSelectedDates] = useState({
        start: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
        end: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
    });

    const [connected, setConnected] = useState(false);
    const accountName = connected ? "Jane Appleseed" : "";

    const handleAction = useCallback(() => {
        setConnected((connected) => !connected);
    }, []);

    const buttonText = connected ? "Disconnect" : "Connect";
    const details = connected ? "Status: On" : "Status: Off";

    const [
        activePreOrderButtonTextPreviewModal,
        setActivePreOrderButtonTextPreviewModal,
    ] = useState(false);

    const [preOrderTimeRemaining, setPreOrderTimeRemaining] = useState(false);
    const [preOrderTimeRemainingMessage, setPreOrderTimeRemainingMessage] =
        useState("Only D days are remaining.");

    const [preOrderEndDateShowing, setPreOrderEndDateShowing] = useState(false);
    preOrderEndDateShowing;
    const [preOrderEndDateMessage, setPreOrderEndDateMessage] = useState(
        "Pre Order ends on MM/DD/YYYY"
    );

    const [preOrderEstimatedDateMessage, setPreOrderEstimatedDateMessage] =
        useState("Pre Order Product will be available on MM/DD/YYYY");

    const handleChangePreOrderEndDateShowing = useCallback(
        (newChecked) => setPreOrderEndDateShowing(newChecked),
        []
    );

    const handleChangePreOrderTotalLimit = useCallback(
        (newValue) => setPreOrderTotalLimit(newValue),
        []
    );

    const handleChangePreOrderDailyTotalLimit = useCallback(
        (newValue) => setPreOrderDailyTotalLimit(newValue),
        []
    );

    const handleChangePreOrderButtonText = useCallback(
        (newValue) => setPreOrderButtonText(newValue),
        []
    );

    const handleChangePreOrderUnderButtonText = useCallback(
        (newValue) => setPreOrderUnderButtonText(newValue),
        []
    );

    const handleChangeOpenPreOrderButtonTextPreview = useCallback(
        () =>
            setActivePreOrderButtonTextPreviewModal(
                !activePreOrderButtonTextPreviewModal
            ),
        [activePreOrderButtonTextPreviewModal]
    );

    const handleChangePreOrderEndDateMessage = useCallback(
        (newValue) => setPreOrderEndDateMessage(newValue),
        []
    );

    const handleChangePreOrderTimeRemainingMessage = useCallback(
        (newValue) => setPreOrderTimeRemainingMessage(newValue),
        []
    );

    const handleChangePreOrderTimeRemaining = useCallback(
        (newValue) => setPreOrderTimeRemaining(newValue),
        []
    );

    const handleChangePreOrderEstimatedDateMessage = useCallback(
        (newValue) => setPreOrderEstimatedDateMessage(newValue),
        []
    );

    const changePreOrderStatus = useCallback(() => {
        setIsPreOrderStatus(!isPreOrderActive);
    });

    const GetPreviewModal = ({ imgSrc }) => {
        return (
            <div style={{ height: "500px" }}>
                <Modal
                    open={activePreOrderButtonTextPreviewModal}
                    onClose={handleChangeOpenPreOrderButtonTextPreview}
                    title="Reach more shoppers with Instagram product tags"
                    secondaryActions={[
                        {
                            content: "Close",
                            onAction: handleChangeOpenPreOrderButtonTextPreview,
                        },
                    ]}
                >
                    <Modal.Section>
                        <TextContainer>
                            <img
                                src={imgSrc}
                                alt="Preview of Pre Order Button and Under button Text"
                                className="mx-auto"
                            />
                        </TextContainer>
                    </Modal.Section>
                </Modal>
            </div>
        );
    };

    function activeActivation() {
        setFlagActivation(!flagActivation);
        setFlagProductSetup(!!flagActivation);
    }

    function activeProductSetup() {
        setFlagActivation(!!flagProductSetup);
        setFlagProductSetup(!flagProductSetup);
    }

    return (
        <Page fullWidth>
            <TitleBar
                title="Pre Order: Settings"
                primaryAction={primaryAction}
            />

            <div className="flex">
                <div
                    id="docs-sidebar"
                    class="preorder-nav mx-3 hs-overlay hs-overlay-open:translate-x-0 w-64 bg-white -translate-x-full transition-all duration-300 transform hidden z-[60] border-e border-gray-200 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
                >
                    <nav
                        class="hs-accordion-group px-2 py-3 w-full flex flex-col flex-wrap"
                        data-hs-accordion-always-open
                    >
                        <ul class="space-y-1.5">
                            <li
                                className="cursor-pointer"
                                onClick={activeActivation}
                            >
                                <div
                                    className={
                                        "rounded-lg py-2 px-2 " +
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
                                onClick={activeProductSetup}
                            >
                                <div
                                    className={
                                        "rounded-lg py-2 px-2 " +
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
                        </ul>
                    </nav>
                </div>
                <div className="flex-1">
                    {flagActivation && (
                        <BlockStack gap="500">
                            <Text variant="headingXl" as="h4">
                                Activation Area
                            </Text>
                            <Divider borderColor="border" />
                            <Card>
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <Text variant="headingMd" as="h5">
                                            Activation Status
                                        </Text>
                                        <p>
                                            Current Status:{" "}
                                            {isPreOrderActive && (
                                                <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ml-1">
                                                    On
                                                </span>
                                            )}
                                            {!isPreOrderActive && (
                                                <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ml-1">
                                                    Off
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        {isPreOrderActive && (
                                            <Button
                                                variant="primary"
                                                tone="critical"
                                                onClick={changePreOrderStatus}
                                            >
                                                Deactive
                                            </Button>
                                        )}
                                        {!isPreOrderActive && (
                                            <Button
                                                variant="primary"
                                                onClick={changePreOrderStatus}
                                            >
                                                Active
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="flex items-center">
                                    <div className="flex flex-col w-full">
                                        <div>
                                            <Text variant="headingMd" as="h6">
                                                Where to show
                                            </Text>
                                            <Text>
                                                You will be able to active this
                                                on Product page and Collection
                                                page.{" "}
                                            </Text>
                                            <div className="mt-3 mb-2">
                                                <Divider borderColor="border" />
                                            </div>
                                        </div>
                                        <OptionList
                                            onChange={setSelected}
                                            options={[
                                                {
                                                    value: "online_store",
                                                    label: "Product Page",
                                                },
                                                {
                                                    value: "messenger",
                                                    label: "Collection Page",
                                                },
                                            ]}
                                            selected={selected}
                                            allowMultiple
                                        />
                                    </div>
                                </div>
                            </Card>
                        </BlockStack>
                    )}

                    {flagProductSetup && (
                        <BlockStack gap="500">
                            <Text variant="headingXl" as="h4">
                                Product List
                            </Text>
                            <Divider borderColor="border" />
                            <Card>
                                <EmptyState
                                    heading="Products for Pre Order"
                                    action={{ content: "Add Product" }}
                                    secondaryAction={{
                                        content: "Learn more",
                                        url: "https://help.shopify.com",
                                    }}
                                    image="https://cdn.shopify.com/shopifycloud/web/assets/v1/67d1bd2ad29c4adc.svg"
                                >
                                    <p>Select Products on which you want set up Pre Order.</p>
                                </EmptyState>
                            </Card>
                        </BlockStack>
                    )}
                </div>
            </div>
        </Page>
    );
}
