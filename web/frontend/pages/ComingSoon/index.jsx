import { TitleBar, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { Page, Icon, Text } from "@shopify/polaris"
import { useEffect, useState } from "react";
import { 
    StatusActiveIcon, 
    ProductIcon, 
    ColorIcon, 
    CalendarTimeIcon,
    ChatIcon,
    DiscountIcon
} from "@shopify/polaris-icons";
import { useDispatch, useSelector } from 'react-redux'
import Activation from "./Activation";
import { setShopName } from "../../store/reducers/ComingSoon";
import ProductTable from "./Products";
import ColorNText from "./ColorNText";

export default function ComingSoon() {

    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const primaryAction = { content: "Help", url: "/help" };
    const shopName = useSelector((state) => state.preorder?.shopName);
    const [storeMainPart, setStoreMainPart] = useState('');
    const [storeName, setStoreName] = useState('');

    const flags = [
        { name: 'Activation', icon: StatusActiveIcon },
        { name: 'Product Setup', icon: ProductIcon },
        { name: 'Colors & Text', icon: ColorIcon },
        { name: 'Restock Schedule', icon: CalendarTimeIcon },
        { name: 'Display Message', icon: ChatIcon },
        { name: 'Badge Design', icon: DiscountIcon }
    ];

    const [activeFlag, setActiveFlag] = useState('Activation');

    const handleFlagClick = (flagName) => {
        setActiveFlag(flagName);
    };

    const FlagItem = ({ flag, isActive }) => {
        const bgColor = isActive ? 'bg-slate-200' : 'bg-white';
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
        let store = '';
        if(storeName) {
            store = storeName;
        } else if(shop) {
            store = shop;
            setStoreName(shop);
        }
        const mainPart = store.split('.');
        const parts = mainPart[0].split('-');
        const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        const capitalizedUrl = capitalizedParts.join('-');
        setStoreMainPart(capitalizedUrl);
    }

    const getShopName = async () => {
        const response = await fetch("/api/coming-soon/init");
        if (response.ok) {
            const comingSoonActivation = await response.json();
            dispatch(setShopName(comingSoonActivation?.shop));
            setStoreName(comingSoonActivation?.shop);
            setStoreWithoutShopifySubDomain(comingSoonActivation?.shop);
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        if(shopName.length === 0) getShopName();
        else setStoreWithoutShopifySubDomain(shopName);
    }, []);

    return (
        <Page fullWidth>
            <TitleBar
                title="Coming Soon: Settings"
                primaryAction={primaryAction}
            />
            <div className="flex">
                <div className="self-start preorder-nav mx-3 hs-overlay hs-overlay-open:translate-x-0 w-64 bg-white -translate-x-full transition-all duration-300 transform hidden z-[60] border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
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
                        <ul className="space-y-1.5 mt-3">
                            {flags.map((flag) => (
                                <FlagItem key={flag.name} flag={flag} isActive={flag.name === activeFlag} />
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex-1">
                    {activeFlag === 'Activation' && <Activation />}
                    {activeFlag === 'Product Setup' && <ProductTable />}
                    {activeFlag === 'Colors & Text' && <ColorNText />}
                </div>
            </div>
        </Page>
    );
}
