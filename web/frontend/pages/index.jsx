import {
    Page,
    Layout,
    Text,
    Collapsible,
    Card,
    Icon,
    Popover,
    ActionList,
    Button,
    Banner,
    Spinner
} from "@shopify/polaris";
import Analytics from "./Dashboard/Analytics.jsx";
import QuickSetup from "./Dashboard/QuickSetup";
import Plan from "./Dashboard/Plan";
import { useEffect, useCallback, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "../assets/preorder.css";
import { MenuHorizontalIcon } from "@shopify/polaris-icons";
import Switch from "../components/Switch.jsx";
import Welcome from "./Dashboard/Welcome.jsx";
import { useAuthenticatedFetch } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsAppEmbeded, setShopName } from "../store/reducers/Dashboard.js";

export default function HomePage() {
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const appEmbededStatusRedux = useSelector((state) => state.dashboard.isAppEmbeded);

    const [open, setOpen] = useState(true);
    const [closeActivation, setCloseActivation] = useState(false);

    const [shop, setShop] = useState('');
    const [appStatusLoading, setAppStatusLoading] = useState(false);
    const [themeId, setThemeId] = useState(null);
    const [isAppDisabled, setIsAppDisabled] = useState(true);
    const [appStatusMessage, setAppStatusMessage] = useState('');

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );

    const activator = (
        <Button variant="plain" onClick={togglePopoverActive}>
            <Icon source={MenuHorizontalIcon} tone="base" />
        </Button>
    );

    const OpenManualGuideline = () => {
        setOpen(!open);
        setPopoverActive(false);
    };

    const closeActivationDiv = () => {
        setCloseActivation(false);
        setPopoverActive(false);
        localStorage.setItem("active_activation", 1);
    };

    const getMainThemeAppStatus = async () => {
        let response = await fetch("/api/theme");
        if (response.ok) {
            response = await response.json();
         
            setThemeId(response.theme_id);
            setIsAppDisabled(!response.status);
            setAppStatusMessage('('+response.message+')');
            setAppStatusLoading(false);
            setShop(response.shop);
            dispatch(setIsAppEmbeded(!response.status));
            dispatch(setShopName(response.shop));
        } else {
            setAppStatusLoading(false);
            show("Cannot find theme! Please try again.", { isError: true });
        }
    };

    const openThemeSetting = () => {
        let shopName = shop !== '' ? shop : null;
        if (!shopName || !themeId) return;
        shopName = shopName.split(".")[0];
        window.open(
            `https://admin.shopify.com/store/${shopName}/themes/${themeId}/editor?context=apps`
        );
    };

    useEffect(() => {
        setAppStatusLoading(true);
        if(appEmbededStatusRedux !== null)
        {
            setIsAppDisabled(appEmbededStatusRedux);
            if(appEmbededStatusRedux == true) setAppStatusMessage("(App Enabled)")
            else setAppStatusMessage("(App Disabled)")
            setAppStatusLoading(false);
        }
        else getMainThemeAppStatus();

        if (localStorage.getItem("active_activation") == 1) {
            setCloseActivation(false);
            setOpen(true);
        } else {
            setCloseActivation(true);
            setOpen(false);
        }
    }, [appEmbededStatusRedux]);

    return (
        <>
            <Navbar title="Dashboard" />
            <Page>
                <div className="mx-auto">
                    <div className="my-5 mx-3">
                        <Welcome />
                        {closeActivation && (
                            <div className="mt-7">
                                <Card>
                                    <div className="w-full">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col space-y-1">
                                                <Text
                                                    variant="headingLg"
                                                    as="h3"
                                                >
                                                    App embeds {isAppDisabled === false && <span className="text-red-300 text-sm">{appStatusMessage}</span>}
                                                    {isAppDisabled === true && <span className="text-green-300 text-sm">{appStatusMessage}</span>}
                                                </Text>
                                                <Text>
                                                    If our app is installed but
                                                    not activated within your
                                                    Shopify store, it won't
                                                    work. Click here to setup.
                                                </Text>
                                            </div>

                                            <div className="flex">
                                                <div className="mr-2">
                                                    <Popover
                                                        active={popoverActive}
                                                        activator={activator}
                                                        autofocusTarget="first-node"
                                                        onClose={
                                                            togglePopoverActive
                                                        }
                                                    >
                                                        <ActionList
                                                            actionRole="menuitem"
                                                            items={[
                                                                {
                                                                    content: "Manual Setup",
                                                                    onAction: () => OpenManualGuideline(),
                                                                },
                                                                {
                                                                    content: "Dismiss",
                                                                    onAction: () => closeActivationDiv(),
                                                                },
                                                            ]}
                                                        />
                                                    </Popover>
                                                </div>
                                                {appStatusLoading === true && <Spinner size="small" />}
                                                {appStatusLoading === false && <Switch
                                                    checked={isAppDisabled}
                                                    onChange={() => openThemeSetting()}
                                                />}
                                            </div>
                                        </div>
                                    </div>
                                    <Collapsible
                                        open={open}
                                        id="basic-collapsible"
                                        transition={{
                                            duration: "500ms",
                                            timingFunction: "ease-in-out",
                                        }}
                                        expandOnPrint
                                    >
                                        <div className="mt-3">
                                            <Banner>
                                                <p>
                                                    If theme app extension could
                                                    not be enabled
                                                    automatically, please enable
                                                    it manually with the
                                                    following steps:
                                                </p>
                                                <p className="pt-2">
                                                    1. From your Shopify admin,
                                                    go to{" "}
                                                    <strong>
                                                        Sales Channel > Online
                                                        store
                                                    </strong>
                                                </p>
                                                <p className="pt-2">
                                                    2. Click on{" "}
                                                    <strong>Customize</strong>{" "}
                                                    button
                                                </p>
                                                <p className="pt-2">
                                                    3. Click on{" "}
                                                    <strong>App embeds</strong>{" "}
                                                    tab
                                                </p>
                                                <p className="pt-2">
                                                    4. Enable{" "}
                                                    <strong>Pre order</strong>{" "}
                                                    theme extension
                                                </p>
                                                <p className="pt-2">
                                                    5. Click on{" "}
                                                    <strong>Save</strong> button
                                                </p>
                                            </Banner>
                                        </div>
                                    </Collapsible>
                                </Card>
                            </div>
                        )}
                        <Analytics />
                        <div className="mt-7 mb-2">
                            <QuickSetup />
                        </div>
                        <Layout>
                            <Plan />
                        </Layout>
                        <div className="mt-7 mb-2 text-center">
                            <Text>Made by Deque Lab</Text>
                        </div>
                    </div>
                </div>
            </Page>
        </>
    );
}
