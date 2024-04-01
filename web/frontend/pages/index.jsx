import { Page, Layout, Text, Collapsible, Card, Icon, Popover, ActionList, Button, Banner } from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch, useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import Analytics from "./Dashboard/Analytics.jsx";
import QuickSetup from "./Dashboard/QuickSetup";
import AppActivation from "./Dashboard/AppActivation";
import Plan from "./Dashboard/Plan";
import { setShopName, setActivation } from "../store/reducers/PreOrder";
import { useDispatch, useSelector } from "react-redux";
import { useAppQuery } from "../hooks/useAppQuery.js";
import { useEffect, useCallback, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import '../assets/preorder.css'
import { MenuHorizontalIcon } from '@shopify/polaris-icons';
import Switch from "../components/Switch.jsx";
import Welcome from "./Dashboard/Welcome.jsx";

export default function HomePage() {

    const fetch = useAuthenticatedFetch();

    const activation = useSelector((state) => state.preorder.activation);
    const shopName = useSelector((state) => state.preorder.shopName);

    const [appActivated, setAppActivated] = useState(true);
    const [open, setOpen] = useState(true);
    const [closeActivation, setCloseActivation] = useState(false);
    const handleToggle = useCallback(() => setOpen((open) => !open), []);

    const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

    const activator = (
        <Button variant="plain" onClick={togglePopoverActive}>
            <Icon
                source={MenuHorizontalIcon}
                tone="base"
                
            />
        </Button>
    );

    const OpenManualGuideline = () => {
        setOpen(!open);
        setPopoverActive(false)
    }

    const closeActivationDiv = () => {
        setCloseActivation(false);
        setPopoverActive(false);
        localStorage.setItem('active_activation', 1);
    }

    // const getThemeStatus = async () => {
    //     setThemeLoading(true);
    //     let response = await fetch("/api/shopify/themes");
    //     if (response.ok) {
    //         response = await response.json();
    //         console.log(response);
    //         setThemeId(response.theme_id);
    //         // checkAppEnabled(response.theme.id);
    //         setIsThemeActive(response.status);
    //         setThemeLoading(false);
    //     } else {
    //         show("Cannot find theme! Please try again.", { isError: true });
    //         setThemeLoading(false);
    //     }
    // };

    // const openThemeSetting = () => {
    //     setActivator(true);
    //     setThemeLoading(true);
    //     let shopName = shop?.shop;
    //     if(!shopName || !themeId) return; 
    //     shopName = shopName.split('.')[0];
    //     console.log(`https://admin.shopify.com/store/${shopName}/themes/${themeId}/editor?context=apps`);
    //     window.open(
    //         `https://admin.shopify.com/store/${shopName}/themes/${themeId}/editor?context=apps`
    //     );
    // };

    useEffect(() => {
        if(localStorage.getItem("active_activation") == 1) {
            setCloseActivation(false);
            setOpen(true)
        }
        else
        {
            setCloseActivation(true);
            setOpen(false);
        }
    }, []);

    return (
        <>
            <Navbar title="Dashboard"/>
            <Page>
                <div className="mx-auto">
                    <div className="my-5 mx-3">
                        <Welcome />
                        {closeActivation && <div className="mt-7">
                            <Card>
                                <div className="w-full">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col space-y-1">
                                            <Text variant="headingLg" as="h3">
                                                App embeds
                                            </Text>
                                            <Text>
                                            If our app is installed but not activated within your Shopify store, it won't work. Click here to setup.
                                            </Text>
                                        </div>

                                        <div className="flex">
                                            <div className="mr-2">
                                                <Popover
                                                    active={popoverActive}
                                                    activator={activator}
                                                    autofocusTarget="first-node"
                                                    onClose={togglePopoverActive}
                                                >
                                                    <ActionList
                                                        actionRole="menuitem"
                                                        items={[
                                                            {
                                                                content: 'Manual Setup',
                                                                onAction: () => OpenManualGuideline()
                                                            }, 
                                                            {
                                                                content: 'Dismiss',
                                                                onAction: () => closeActivationDiv()
                                                            }]}
                                                    />
                                                </Popover>
                                            </div>
                                            <Switch
                                                checked={appActivated}
                                                onChange={() => setAppActivated(!appActivated) }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Collapsible
                                    open={open}
                                    id="basic-collapsible"
                                    transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                                    expandOnPrint
                                >
                                    <div className="mt-3">
                                        <Banner>
                                            <p>
                                                If theme app extension could not be enabled
                                                automatically, please enable it manually with
                                                the following steps:
                                            </p>
                                            <p className="pt-2">
                                                1. From your Shopify admin, go to <strong>Sales Channel
                                                > Online store</strong>
                                            </p>
                                            <p className="pt-2">2. Click on <strong>Customize</strong> button</p>
                                            <p className="pt-2">3. Click on <strong>App embeds</strong> tab</p>
                                            <p className="pt-2">
                                                4. Enable <strong>Pre order</strong> theme extension
                                            </p>
                                            <p className="pt-2">5. Click on <strong>Save</strong> button</p>
                                        </Banner>
                                    </div>
                                </Collapsible>
                            </Card>
                        </div>}
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
