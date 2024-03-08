import {
    BlockStack,
    Button,
    Card,
    Divider,
    Checkbox,
    Text,
    Toast,
    Frame,
    Page,
    RadioButton,
    TextField,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import SkeletonActivation from "./Skeleton/Activation";
import { useDispatch, useSelector } from "react-redux";
import { setShopName, setActivation } from "../../store/reducers/RequestStock";

export default function Activation() 
{
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();
    const activation = useSelector((state) => state.requeststock.activation);
    
    const [loading, setLoading] = useState(false);
    const [isRequestStockActive, setIsRequestStockActive] = useState(false);
    const [checkedProductPage, setCheckedProductPage] = useState(true);
    const [checkedCollectionPage, setCheckedCollectionPage] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [whenToShow, setWhenToShow] = useState('always');
    const [specicInventory, setSpecificInventory] = useState(0);

    const changeRequestStockStatus = () => setIsRequestStockActive(!isRequestStockActive);
    const activeOnProductPage = () => setCheckedProductPage(!checkedProductPage);
    const activeOnCollectionPage = () => setCheckedCollectionPage(!checkedCollectionPage);
    const toggleToastActive = useCallback(() => setToastActive((toastActive) => !toastActive),[]);
    
    const handleChange = (newWhenToShowValue) => {setWhenToShow(newWhenToShowValue)}
    const handleSpecificInventory = useCallback((value) => setSpecificInventory(value),[]);

    const toastMarkup = toastActive ? (
        <Toast content="Activation Data Saved Successfully!" onDismiss={toggleToastActive} />
    ) : null;

    const setActivationData = (passedActivation) => {
        let requestStockInitData = activation;
        if(passedActivation !== null && passedActivation !== undefined) {
            requestStockInitData = Object.keys(passedActivation).length !== 0 ? passedActivation : activation;
        }
        
        if(requestStockInitData.active == 1) {
            setIsRequestStockActive(true)
        } else if(requestStockInitData?.active == 0) {
            setIsRequestStockActive(false);
        }

        let poc = requestStockInitData?.active_on_collection;
        let pop = requestStockInitData?.active_on_product;

        if (poc && pop ) {
            setCheckedProductPage(true);
            setCheckedCollectionPage(true);
        } else if (poc && !pop) {
            setCheckedProductPage(false);
            setCheckedCollectionPage(true);
        } else if (!poc && pop) {
            setCheckedProductPage(true);
            setCheckedCollectionPage(false);
        } else {
            setCheckedProductPage(false);
            setCheckedCollectionPage(false);
        }

        if(requestStockInitData?.when_show_request_stock == 1) {
            setWhenToShow('always')
        } else if(requestStockInitData?.when_show_request_stock == 2) {
            setWhenToShow('sold-out')
        } else if(requestStockInitData?.when_show_request_stock == 3) {
            setWhenToShow('specific-inventory')
            setSpecificInventory(requestStockInitData?.specific_inventory)
        }

        setLoading(false);
    };

    const getRequestStockActivation = async () => {
        const response = await fetch("/api/request-stock/activate");
        if (response.ok) {
            const activationData = await response.json();
            console.log(activationData);
            const activationObj = {
                'active' : activationData.active,
                'active_on_collection' : activationData?.active_on_collection,
                'active_on_product' : activationData?.active_on_product,
                'when_show_request_stock': activationData?.when_show_request_stock,
                'specific_inventory': activationData?.specific_inventory
            }
            dispatch(setShopName(activationData?.shop));
            dispatch(setActivation(activationObj));
            setActivationData(activationObj);
            setLoading(false);
        } else {
            setLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    const saveRequestStockActivation = async () => {
        setLoading(true);
        const formData = new FormData();
    
        formData.append("active", isRequestStockActive);
        formData.append("active_on_product", checkedProductPage);
        formData.append("active_on_collection", checkedCollectionPage);
        formData.append("when_show_request_stock", whenToShow);
        formData.append("specific_inventory", specicInventory);
    
        const response = await fetch("/api/request-stock/activate", {
          method: "POST",
          body: formData ? formData : JSON.stringify(data),
        });
    
        if (!response.ok) {
          setLoading(true);
          console.log("Error on Activation.jsx: ");
          throw new Error(`HTTP error ${response.status}`);
        }
    
        if (response.ok) {
          toggleToastActive(true);
          getRequestStockActivation();
          setLoading(false);
        }
      };

    const isDataChanged = useCallback(() => {
        console.log(activation);
        let flagActivation          = false;
        let flagWhereToShow         = false;
        let flagWhenToShow          = false;
        let flagSpecificInventory   = false;

        let activeRedux = activation.active == 0 ? false : true;
        if(activeRedux !== isRequestStockActive) {
            flagActivation = true;
        }

        let whereToShowProductRedux = activation.active_on_product == 0 ? false: true;

        if(whereToShowProductRedux != checkedProductPage) {
            flagWhereToShow = true;
        }

        let whenToShowRedux = ''; 
        if(activation.when_show_request_stock == 1) {
            whenToShowRedux = 'always'
        } else if(activation.when_show_request_stock == 2) {
            whenToShowRedux = 'sold-out';
        } else if(activation.when_show_request_stock == 3) {
            whenToShowRedux = 'specific-inventory';
        }

        if(whenToShowRedux != whenToShow) {
            flagWhenToShow = true;
        }

        if(specicInventory != activation.specific_inventory) {
            flagSpecificInventory = true;
        }

        if(flagActivation || flagWhereToShow || flagWhenToShow || flagSpecificInventory) {
            return true;
        }
        return false;
    }, [isRequestStockActive, checkedProductPage, specicInventory, whenToShow, activation]);

    useEffect( () => {
        setLoading(true);
        if(Object.keys(activation).length === 0) getRequestStockActivation();
        else setActivationData();
    }, [])

    return (
        <div className="activation [&>div>div]:pt-0">
            {loading === true && <SkeletonActivation title="Activation Area" />}

            {loading === false &&<Page fullWidth>
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
                                    {isRequestStockActive && (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ml-1">
                                            On
                                        </span>
                                    )}
                                    {!isRequestStockActive && (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ml-1">
                                            Off
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="ml-auto">
                                {isRequestStockActive && (
                                    <Button
                                        variant="primary"
                                        tone="critical"
                                        onClick={() => changeRequestStockStatus()}
                                    >
                                        Deactive
                                    </Button>
                                )}
                                {!isRequestStockActive && (
                                    <Button
                                        variant="primary"
                                        onClick={() => changeRequestStockStatus()}
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
                                        You will be able to active this only on Product
                                        page.{" "}
                                    </Text>
                                    <div className="mt-3 mb-2">
                                        <Divider borderColor="border" />
                                    </div>
                                </div>
                                <div className="mt-1 flex flex-col">
                                    <div className="pb-1">
                                        <Checkbox
                                            label="Product Page"
                                            checked={checkedProductPage}
                                            onChange={() => activeOnProductPage()}
                                        />
                                    </div>

                                    {/* <Checkbox
                                        label="Collection Page"
                                        checked={checkedCollectionPage}
                                        onChange={() => activeOnCollectionPage()}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center">
                            <div className="flex flex-col w-full">
                                <div>
                                    <Text variant="headingMd" as="h6">
                                        When to show
                                    </Text>
                                    <Text>
                                        When you want to show the Request Stock button 
                                        on your product page.{" "}
                                    </Text>
                                    <div className="mt-3 mb-2">
                                        <Divider borderColor="border" />
                                    </div>
                                </div>
                                <div className="mt-1 flex flex-col">
                                    <RadioButton
                                        label="Always"
                                        helpText="Add to cart button will be always replaced by Request Stock Button"
                                        checked={whenToShow === 'always'}
                                        name="requeststock-whenToShow"
                                        onChange={() => handleChange('always')}
                                    />
                                    <RadioButton
                                        label="Inventory Zero"
                                        helpText="When inventory will zero then SOLD Out button comes, Replace that Sold Out button with Request Stock Button"
                                        name="requeststock-whenToShow"
                                        checked={whenToShow === 'sold-out'}
                                        onChange={() => handleChange('sold-out')}
                                    />
                                    <RadioButton
                                        label="After Specific Inventory"
                                        helpText="When inventory will reach out a specific number then Request Stock Button will come."
                                        name="requeststock-whenToShow"
                                        checked={whenToShow === 'specific-inventory'}
                                        onChange={() => handleChange('specific-inventory')}
                                    />
                                    {whenToShow === 'specific-inventory' &&
                                        <div className="ml-6 mt-3 w-1/2">    
                                            <TextField 
                                                type="number" 
                                                placeholder={10} 
                                                onChange={handleSpecificInventory} 
                                                requiredIndicator
                                                value={specicInventory}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Card>
                </BlockStack>
                <div className="mt-3">
                    <Button
                        variant="primary"
                        size="large"
                        disabled={!isDataChanged()}
                        onClick={() => saveRequestStockActivation()}
                    >
                    Save
                    </Button>
                    <Frame>{toastMarkup}</Frame>
                </div>
            </Page>}
        </div>
    );
}
