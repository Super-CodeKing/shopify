import { TextField, Button, Banner, Checkbox, Text, Card, Popover, ColorPicker, RangeSlider, Frame } from "@shopify/polaris";
import ToggleColorActivator from "../../components/ToggleColorActivator";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import '../../assets/requested-stock.css'

export default function FormSettings({}) {
    const dispatch = useDispatch();
    const fetch = useAuthenticatedFetch();
    
    const formSettingsRedux = useSelector((state) => state.requeststock.formSettings);
    const formInheritFromThemeRedux = useSelector((state) => state.requeststock.formInheritFromTheme);

    const [isLoading, setIsLoading] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [isInheritFromTheme, setIsInheritFromTheme] = useState(true);

    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );

    const isDataChanged = useCallback(() => {}, [])

    const toastMarkup = toastActive ? (
        <Toast
            content="Button Text and Color Settings Saved Successfully!"
            onDismiss={toggleToastActive}
        />
    ) : null;

    const getPreOrderButtonSettings = async () => {
        const response = await fetch("/api/coming-soon/colorntext");
        if (response.ok) {
            const preOrderButtonSettings = await response.json();
            
            setLoading(false);
        } else {
            setLoading(false);
            console.log("Error in Activaing Pre Order: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    const saveRequestStockFormSettings = async () => {
    };

    useEffect(() => {
    }, []);

    return (
        <>
            {isLoading === true && <SkeletonBodyWithDisplay />}
            {isLoading === false && <div className="pt-3">
                <div className="flex">
                    <div className="flex-1 mr-5">
                        <div className="mb-3">
                            <Card>
                                <Checkbox
                                    label="Inherit Design from Theme"
                                    checked={isInheritFromTheme}
                                    onChange={() =>
                                        setIsInheritFromTheme(!isInheritFromTheme)
                                    }
                                />
                                <div className="mt-1">
                                    <Banner>
                                        <Text>
                                            If inherit from theme is activated, then others design settings will not work.
                                        </Text>
                                    </Banner>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="border-dashed border-2 border-indigo-600 h-full flex items-center justify-center rounded-md">
                            <form class="p-5 mx-auto">
                                <div className="flex">
                                    <div class="mb-5 flex-1 mr-3">
                                        <label 
                                            for="fullName" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Your Name</label>
                                        <input 
                                            type="text" 
                                            id="fullName" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            placeholder="Mike Tyson" 
                                            required 
                                        />
                                    </div>
                                    <div class="mb-5 flex-1">
                                        <label 
                                            for="email" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Your Email</label>

                                        <input 
                                            type="email" 
                                            id="email" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            placeholder="name@example.com" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div class="mb-5 flex-1 mr-3">
                                        <label 
                                            for="phone" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Your Phone</label>
                                        <input 
                                            type="text" 
                                            id="phone" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            placeholder="+1-202-555-1234"
                                            required 
                                        />
                                    </div>
                                    <div class="mb-5 flex-1">
                                        <label 
                                            for="quantity" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Product Quantity</label>
                                        <input 
                                            type="number" 
                                            id="quantity" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            required 
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label 
                                        for="message" 
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >Your Message</label>
                                    <textarea 
                                        id="message" 
                                        rows="4" 
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Write notes..."></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Submit Request</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Button
                        variant="primary"
                        size="large"
                        disabled={!isDataChanged()}
                        onClick={() => saveRequestStockFormSettings()}
                    >
                        Save
                    </Button>
                </div>

                <Frame>{toastMarkup}</Frame>
            </div>}
        </>
    )
}