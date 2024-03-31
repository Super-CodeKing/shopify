import {
    BlockStack,
    Divider,
    Text,
    Page
} from "@shopify/polaris";
import { useState } from "react";
import "../../assets/preorder.css";
import ButtonSettings from "./ButtonSettings";
import FormSettings from "./FormSettings";

export default function FormAndButton() {
    const [buttonOrFormActiveIndex, setButtonOrFormActiveIndex] = useState(0);
    return (
        <div  className="color-n-text [&>div>div]:pt-0">
            <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Form & Button Settings
                    </Text>
                    <Divider borderColor="border" />
                </BlockStack>
                
                 <div className="mt-5">
                    <div className="w-full md:w-1/2 pr-0 md:pr-3">
                        <nav className="flex shadow rounded-lg isolate">
                            <a 
                                href="#" 
                                className="flex-1 bg-white font-medium text-sm text-center p-4 rounded-l-lg relative overflow-hidden border-r border-gray-200"
                                onClick={() => setButtonOrFormActiveIndex(0)}
                            >
                                <span>Button Design</span>
                                {buttonOrFormActiveIndex === 0 && 
                                <span aria-hidden="true" className="h-0.5 bottom-0 inset-x-0 absolute bg-indigo-400"></span>}
                            </a>
                            <a 
                                href="#" 
                                className="flex-1 bg-white font-medium text-sm text-center p-4 rounded-r-lg relative overflow-hidden"
                                onClick={() => setButtonOrFormActiveIndex(1)}
                            >
                                <span>Form Design</span>
                                {buttonOrFormActiveIndex === 1 && 
                                <span aria-hidden="true" className="h-0.5 bottom-0 inset-x-0 absolute bg-indigo-400"></span>}
                            </a>
                        </nav>
                    </div>
                    {buttonOrFormActiveIndex == 0 && 
                        <ButtonSettings />}
                    {buttonOrFormActiveIndex == 1 && 
                        <FormSettings />}
                 </div>
            </Page>
        </div>
    );
}
