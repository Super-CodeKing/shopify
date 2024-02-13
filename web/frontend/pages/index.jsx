import { Page, Layout, Text, Divider } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import Analytics from "./Dashboard/Analytics.jsx";
import QuickSetup from "./Dashboard/QuickSetup";
import AppActivation from "./Dashboard/AppActivation";
import Plan from "./Dashboard/Plan";
import { setShopName, setActivation } from "../store/reducers/PreOrder";
import { useDispatch, useSelector } from "react-redux";
import { useAppQuery } from "../hooks/useAppQuery.js";

export default function HomePage() {
    const activation = useSelector((state) => state.preorder.activation);
    const dispatch = useDispatch();
    const { data } = useAppQuery({
        url: "/api/preorder/init",
        reactQueryOptions: {
            onSuccess: (data) => {
                dispatch(setShopName(data?.shop));
                dispatch(setActivation({
                    'active': data?.active,
                    'active_on_collection': data?.active_on_collection,
                    'active_on_product': data?.active_on_product,
                    'when_show_pre_order': data?.when_show_pre_order,
                    'specific_inventory': data?.specific_inventory
                }));
            },
        },
    });

    const { t } = useTranslation();
    const helpAction = { content: "Help", url: "/help" };
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
