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
import { setPreOrderSchedule } from "../../store/reducers/PreOrder";

export default function Schedule() {
    
    const today = new Date();
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();
    const scheduleRedux = useSelector((state) => state.preorder.schedule);

    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastContent, setToastContent] = useState('');
    const [isErrorToast, setIsErrorToast] = useState(false);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));
    const [restockDate, setRestockDate] = useState(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));
    const [noEndDate, setNoEndDate] = useState(true);
    const [noRestockDate, setNoRestockDate] = useState(true);

    const changeStartDate = (e) => {
        setStartDate(new Date(e));
    }

    const changeEndDate = (e) => {
        setEndDate(dateFormatter(e));
    }

    const changeRestockDate = (e) => {
        setRestockDate(dateFormatter(e));
    }

    const setScheduleData = (scheduleData) => {
        if(!scheduleData.start_date) {
            setStartDate(startDate);
        } else {
            setStartDate(dateFormatter(scheduleData.start_date));
        }

        if(!scheduleData.end_date) {
            setEndDate(endDate);
        } else {
            setEndDate(dateFormatter(scheduleData.end_date));
        }

        if(!scheduleData.estimated_restock_date) {
            setRestockDate(restockDate);
        } else {
            setRestockDate(dateFormatter(scheduleData.estimated_restock_date));
        }

        setNoEndDate(scheduleData.no_end_date);
        setNoRestockDate(scheduleData.no_restock_date);

        if(scheduleData.no_end_date) {
            setEndDate(null);
        }

        if(scheduleData.no_restock_date) {
            setRestockDate(null);
        }
    }

    const getPreOrderSchedule = async () => {
        const response = await fetch("/api/preorder/schedule");

        if (response.ok) {
            const preOrderSchedule = await response.json();
            console.log("Getting Schedule Data: ");
            console.log(preOrderSchedule);
            setScheduleData(preOrderSchedule);
            dispatch(setPreOrderSchedule(preOrderSchedule));
            setLoading(false);

        } else {
            setLoading(false);
            console.log("Error in Activaing Pre Order: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    const savePreOrderSchedule = async () => {
        console.log("Saving Scheduled Data");
        const formData = new FormData();
        
        let endDateString = dateFormatter(endDate);
        if (noEndDate) {
            endDateString = null;
        }

        let restockDateString = dateFormatter(restockDate);
        if(noRestockDate) {
            restockDateString = null;
        }

        formData.append("start_date", dateFormatter(startDate));
        formData.append("end_date", endDateString);
        formData.append("no_end_date", noEndDate == true ? 1 : 0);
        formData.append("restock_date", restockDateString);
        formData.append("no_restock_date", noRestockDate == true ? 1 : 0);

        const response = await fetch("/api/preorder/schedule", {
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
            setToastContent("Pre Order Schedule Saved Successfully");
            setIsErrorToast(false);
            setShowToast(true);
            getPreOrderSchedule();
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
        let flagStartDate       = false;
        let flagEndDate         = false;
        let flagRestockDate     = false;
        let flagNoEndDate       = false;
        let flagNoRestockDate   = false;

        if(dateFormatter(scheduleRedux.start_date) !== dateFormatter(startDate)) flagStartDate = true;
        if(dateFormatter(scheduleRedux.end_date) !== dateFormatter(endDate)) flagEndDate = true;
        if(dateFormatter(scheduleRedux.estimated_restock_date) !== dateFormatter(restockDate)) flagRestockDate = true;
        if(scheduleRedux.no_end_date !== noEndDate) flagNoEndDate = true;
        if(scheduleRedux.no_restock_date !== noRestockDate) flagNoRestockDate = true;
        
        if(flagStartDate || flagEndDate || flagRestockDate || flagNoEndDate || flagNoRestockDate) {
            return true;
        }
        return false;
    }, [startDate, endDate, restockDate, noEndDate, noRestockDate, scheduleRedux]);

    useEffect(() => {
        setLoading(true);
        if(Object.keys(scheduleRedux).length === 0) getPreOrderSchedule();
        else {
            setScheduleData(scheduleRedux);
            setLoading(false);
        }
    }, []);

    return (
        <div className="schedule [&>div>div]:pt-0">
            {loading === true && <SkeletonOrderLimit title="Schedule for Pre Order" />}
            {loading === false && <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Schedule for Pre Order
                    </Text>
                    <Divider borderColor="border" />
                    <Card padding={0}>
                        <div className="pb-3 pt-5 px-5">
                            <Text variant="headingMd" as="h6">Pre Order Start, End & Restock Date</Text>
                            <Text>Best way to set a start and end date for all products. Then if you need to change then do it on product setup page.</Text>
                        </div>
                        <div className="pb-3 pt-3 px-5">
                            <Form>
                                <FormLayout>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="flex-1 mr-3 mb-3 md:mb-0">
                                            <TextField
                                                label="Start Date"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => changeStartDate(e)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextField
                                                label="End Date"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => changeEndDate(e)}
                                                disabled={noEndDate}
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
                                            <TextField
                                                label="Estimated Restock Date"
                                                type="date"
                                                value={restockDate}
                                                onChange={(e) => changeRestockDate(e)}
                                                disabled={noRestockDate}
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
                                    <List.Item><strong>Start Date:</strong> When you want to take pre orders.</List.Item>
                                    <List.Item><strong>End Date:</strong> When you want to stop taking pre orders.</List.Item>
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
                        onClick={() => savePreOrderSchedule()}
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
