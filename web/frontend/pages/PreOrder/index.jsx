import {
    Card,
    Page,
    Layout,
    TextContainer,
    RadioButton,
    TextField,
    Modal,
    Button,
    PageActions,
    DatePicker,
    Checkbox,
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
import { StatusActiveMajor } from "@shopify/polaris-icons";

export default function PreOrder() {
    const primaryAction = { content: "Help", url: "/help" };
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
                            <li>
                                <div
                                    padding="200"
                                    background="bg"
                                    roundedAbove="xs"
                                    className="bg-slate-200 rounded-lg py-2 px-2"
                                >
                                    <div className="flex justify-start">
                                        <Icon source={StatusActiveMajor} />
                                        <div className="ml-2 flex-1">
                                            <Text>Activation</Text>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="hs-accordion" id="users-accordion">
                                <button
                                    type="button"
                                    class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                    <svg
                                        class="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                    Users
                                    <svg
                                        class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="m18 15-6-6-6 6" />
                                    </svg>
                                    <svg
                                        class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    id="users-accordion"
                                    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                                >
                                    <ul
                                        class="hs-accordion-group ps-3 pt-2"
                                        data-hs-accordion-always-open
                                    >
                                        <li
                                            class="hs-accordion"
                                            id="users-accordion-sub-1"
                                        >
                                            <button
                                                type="button"
                                                class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            >
                                                Sub Menu 1
                                                <svg
                                                    class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="m18 15-6-6-6 6" />
                                                </svg>
                                                <svg
                                                    class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </button>

                                            <div
                                                id="users-accordion-sub-1"
                                                class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                                            >
                                                <ul class="pt-2 ps-2">
                                                    <li>
                                                        <a
                                                            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                            href="#"
                                                        >
                                                            Link 1
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                            href="#"
                                                        >
                                                            Link 2
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                            href="#"
                                                        >
                                                            Link 3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li
                                            class="hs-accordion"
                                            id="users-accordion-sub-2"
                                        >
                                            <button
                                                type="button"
                                                class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            >
                                                Sub Menu 2
                                                <svg
                                                    class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="m18 15-6-6-6 6" />
                                                </svg>
                                                <svg
                                                    class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </button>

                                            <div
                                                id="users-accordion-sub-2"
                                                class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden ps-2"
                                            >
                                                <ul class="pt-2 ps-2">
                                                    <li>
                                                        <a
                                                            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                            href="#"
                                                        >
                                                            Link 1
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                            href="#"
                                                        >
                                                            Link 2
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                            href="#"
                                                        >
                                                            Link 3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="hs-accordion" id="account-accordion">
                                <button
                                    type="button"
                                    class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                    <svg
                                        class="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <circle cx="18" cy="15" r="3" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                                        <path d="m21.7 16.4-.9-.3" />
                                        <path d="m15.2 13.9-.9-.3" />
                                        <path d="m16.6 18.7.3-.9" />
                                        <path d="m19.1 12.2.3-.9" />
                                        <path d="m19.6 18.7-.4-1" />
                                        <path d="m16.8 12.3-.4-1" />
                                        <path d="m14.3 16.6 1-.4" />
                                        <path d="m20.7 13.8 1-.4" />
                                    </svg>
                                    Account
                                    <svg
                                        class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="m18 15-6-6-6 6" />
                                    </svg>
                                    <svg
                                        class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    id="account-accordion"
                                    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                                >
                                    <ul class="pt-2 ps-2">
                                        <li>
                                            <a
                                                class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                href="#"
                                            >
                                                Link 1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                href="#"
                                            >
                                                Link 2
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                href="#"
                                            >
                                                Link 3
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="hs-accordion" id="projects-accordion">
                                <button
                                    type="button"
                                    class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                    <svg
                                        class="w-4 h-4"
                                        xmlns="ƒhttp://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                                        <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                                        <path d="M15 2v5h5" />
                                    </svg>
                                    Projects
                                    <svg
                                        class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="m18 15-6-6-6 6" />
                                    </svg>
                                    <svg
                                        class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    id="projects-accordion"
                                    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                                >
                                    <ul class="pt-2 ps-2">
                                        <li>
                                            <a
                                                class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                href="#"
                                            >
                                                Link 1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                href="#"
                                            >
                                                Link 2
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                href="#"
                                            >
                                                Link 3
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li>
                                <a
                                    class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    href="#"
                                >
                                    <svg
                                        class="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <rect
                                            width="18"
                                            height="18"
                                            x="3"
                                            y="4"
                                            rx="2"
                                            ry="2"
                                        />
                                        <line x1="16" x2="16" y1="2" y2="6" />
                                        <line x1="8" x2="8" y1="2" y2="6" />
                                        <line x1="3" x2="21" y1="10" y2="10" />
                                        <path d="M8 14h.01" />
                                        <path d="M12 14h.01" />
                                        <path d="M16 14h.01" />
                                        <path d="M8 18h.01" />
                                        <path d="M12 18h.01" />
                                        <path d="M16 18h.01" />
                                    </svg>
                                    Calendar
                                </a>
                            </li>
                            <li>
                                <a
                                    class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    href="#"
                                >
                                    <svg
                                        class="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex-1">
                    <BlockStack gap="500">
                        <Text variant="headingXl" as="h4">
                            Activation Area
                        </Text>
                        <Divider borderColor="border" />
                        <Card>
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <OptionList
                                        title="Where you want to active Pre Order?"
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
                </div>
            </div>
        </Page>
    );
}
