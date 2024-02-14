import { Page, Layout, Text, Divider } from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import Analytics from "./Dashboard/Analytics.jsx";
import QuickSetup from "./Dashboard/QuickSetup";
import AppActivation from "./Dashboard/AppActivation";
import Plan from "./Dashboard/Plan";
import { setShopName, setActivation } from "../store/reducers/PreOrder";
import { useDispatch, useSelector } from "react-redux";
import { useAppQuery } from "../hooks/useAppQuery.js";
import { useEffect } from "react";

export default function HomePage() {

    const fetch = useAuthenticatedFetch();

    const { t } = useTranslation();
    const helpAction = { content: "Help", url: "/help" };

    const activation = useSelector((state) => state.preorder.activation);
    const shopName = useSelector((state) => state.preorder.shopName);

    const dispatch = useDispatch();
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
            }));
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        if(shopName.length === 0 || Object.keys(activation).length === 0) getShopName();
    }, []);

    return (
        <Page fullWidth>
            <div className="container mx-auto">
                <TitleBar title={t("HomePage.title")} primaryAction={helpAction} />
                <div className="pb-3">
                    <Text variant="heading2xl" as="h3">
                        Welcome to Pre Order of Deque Lab
                    </Text>
                </div>
                <Divider />
                <div className="my-5">
                    <Layout>
                        <AppActivation />
                        <Plan />
                    </Layout>
                    <Analytics />
                    <QuickSetup />
                </div>
            </div>
        </Page>
    );
}
