import {
    BlockStack,
    Button,
    Card,
    Divider,
    Checkbox,
    Text,
    Page,
    Form,
    FormLayout,
    TextField,
    Box,
    List
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks";
import Toaster from "../../components/Toaster";
import SkeletonOrderLimit from "./Skeleton/OrderLimit";
import { useDispatch, useSelector } from "react-redux";
import { setSchedule } from "../../store/reducers/RequestStock";
import TextFieldWithDatePicker from "../../components/TextFieldWithDatePicker";

export default function Schedule() {
    
    const today = new Date();
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();
    const scheduleRedux = useSelector((state) => state.requeststock.schedule);

    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastContent, setToastContent] = useState('');
    const [isErrorToast, setIsErrorToast] = useState(false);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState('');
    const [restockDate, setRestockDate] = useState('');
    const [noEndDate, setNoEndDate] = useState(true);
    const [noRestockDate, setNoRestockDate] = useState(true);

    const falsyValueModifier = (value) => {
        let hasValue = 0;
        if(value == false || value == 'false') hasValue = 0;
        else hasValue = 1;
        return hasValue;
    }

    const setTodaysDate = (todaysDate) => {
        if(todaysDate == null) return dateFormatter(today);
        else return dateFormatter(todaysDate);
    }

    const setScheduleData = (scheduleData) => {
        setStartDate(setTodaysDate(scheduleData?.start_date));
        setEndDate(setTodaysDate(scheduleData?.end_date));
        setRestockDate(setTodaysDate(scheduleData?.estimated_restock_date));
        setNoEndDate(scheduleData?.no_end_date);
        setNoRestockDate(scheduleData?.no_restock_date);
    }

    const getRequestStockSchedule = async () => {
        const response = await fetch("/api/request-stock/schedule");

        if (response.ok) {
            const requestStockSchedule = await response.json();
            
            setScheduleData(requestStockSchedule);
            dispatch(setSchedule(requestStockSchedule));
            
            setLoading(false);

        } else {
            setLoading(false);
            console.log("Error in Activaing Coming Soon: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    const saveRequestStockSchedule = async () => {
        
        const formData = new FormData();
        
        let endDateString = dateFormatter(endDate);
        if (falsyValueModifier(noEndDate)) {
            endDateString = null;
        }

        let restockDateString = dateFormatter(restockDate);
        if(falsyValueModifier(noRestockDate)) {
            restockDateString = null;
        }

        formData.append("start_date", dateFormatter(startDate));
        formData.append("end_date", endDateString);
        formData.append("no_end_date", falsyValueModifier(noEndDate));
        formData.append("restock_date", restockDateString);
        formData.append("no_restock_date", falsyValueModifier(noRestockDate));

        const response = await fetch("/api/request-stock/schedule", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            setToastContent("Something went wrong");
            setIsErrorToast(true);
            setShowToast(true);
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Schedule Saved Successfully");
            setIsErrorToast(false);
            setShowToast(true);
            getRequestStockSchedule();
        }
    }

    const dateFormatter = (date) => {
        let dateString = new Date(date);
        const year = dateString.getFullYear();
        const month = (dateString.getMonth() + 1).toString().padStart(2, '0');
        const day = dateString.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const isDataChanged = useCallback(() => {

        const formattedStartDate = dateFormatter(startDate ?? today);
        const formattedEndDate = dateFormatter(endDate ?? today);
        const formattedRestockDate = dateFormatter(restockDate ?? today); 

        if (formattedStartDate !== dateFormatter(scheduleRedux.start_date ?? today)) {
            return true;
        }

        if (formattedEndDate !== dateFormatter(scheduleRedux.end_date ?? today)) {
            return true;
        }

        if (formattedRestockDate !== dateFormatter(scheduleRedux.estimated_restock_date ?? today)) {
            return true;
        }

        if(scheduleRedux.no_end_date !== noEndDate) return true;
        if(scheduleRedux.no_restock_date !== noRestockDate) return true;

        return false;
    }, [startDate, endDate, restockDate, noEndDate, noRestockDate, scheduleRedux]);

    useEffect(() => {
        setLoading(true);
        if(Object.keys(scheduleRedux).length === 0) getRequestStockSchedule();
        else {
            setScheduleData(scheduleRedux);
            setLoading(false);
        }
    }, []);

    return (
        <div className="schedule [&>div>div]:pt-0">
            {loading === true && <SkeletonOrderLimit title="Schedule for Request Stock" />}
            {loading === false && <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Schedule for Request Stock
                    </Text>
                    <Divider borderColor="border" />
                    <Card padding={0}>
                        <div className="pb-3 pt-5 px-5">
                            <Text variant="headingMd" as="h6">Request Stock Start, End & Restock Date</Text>
                            <Text>Best way to set a start and end date for all products. Then if you need to change then do it on product setup page.</Text>
                        </div>
                        <div className="pb-3 pt-3 px-5">
                            <Form>
                                <FormLayout>

                                    <div className="flex">
                                        <div className="flex-1 mr-3">
                                            <TextFieldWithDatePicker
                                                label={"Start Date"}
                                                initialDate={startDate}
                                                setDate={setStartDate}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextFieldWithDatePicker
                                                label={"End Date"}
                                                initialDate={endDate}
                                                setDate={setEndDate}
                                                isDisabled={noEndDate}
                                            />
                                            <Checkbox
                                                label="No End Date"
                                                checked={noEndDate}
                                                onChange={() => setNoEndDate(!noEndDate)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1 mr-3">
                                            <TextFieldWithDatePicker
                                                label={"Estimated Restock Date"}
                                                initialDate={restockDate}
                                                setDate={setRestockDate}
                                                isDisabled={noRestockDate}
                                            />
                                            <Checkbox
                                                label="No Restock Date"
                                                checked={noRestockDate}
                                                onChange={() => setNoRestockDate(!noRestockDate)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                        </div>
                                    </div>
                                </FormLayout>
                            </Form>
                        </div>
                        <div className="mt-5">
                            <Box
                                background="bg-surface-secondary"
                                paddingBlock="300"
                                paddingInline="600"
                            >
                                <BlockStack gap="200">
                                <Text as="h3" variant="headingSm" fontWeight="medium">
                                    Note
                                </Text>
                                <List>
                                    <List.Item><strong>Start Date:</strong> When you want to take Coming Soon.</List.Item>
                                    <List.Item><strong>End Date:</strong> When you want to stop taking Coming Soon.</List.Item>
                                    <List.Item><strong>Restock Date:</strong> When you will be able to deliver or restock those products.</List.Item>
                                </List>
                                </BlockStack>
                            </Box>
                        </div>
                    </Card>
                </BlockStack>
                <div className="mt-3">
                    <Button
                        variant="primary"
                        size="large"
                        disabled={!isDataChanged()}
                        onClick={() => saveRequestStockSchedule()}
                    >
                        Save
                    </Button>

                    <Toaster
                        active={showToast}
                        content={toastContent}
                        toggleToastActive={() => setShowToast(false)}
                        isError={isErrorToast}
                    />
                </div>
            </Page>}
        </div>
    );
}
