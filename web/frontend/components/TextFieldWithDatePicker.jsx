import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Popover,
  Card,
  TextField,
  BlockStack,
  Icon,
  DatePicker,
  Box,
} from '@shopify/polaris';
import { CalendarIcon } from "@shopify/polaris-icons";

export default function TextFieldWithDatePicker({
    label,
    initialDate,
    setDate,
    isDisabled
  }) {

    // Initial Value of Incoming Date format will be like this: 2024-03-02 00:00:00

    const datePickerRef = useRef(null);

    const dateToString = (date) => {
        if(date == null) return null;

        const dateObject = new Date(date);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const dateToDatePicker = (date) => {
        const newDate = new Date(date);
        const datePickerObject = {
            start: new Date(newDate.getTime()),
            end: new Date(newDate.getTime())
        }
        return datePickerObject;
    }

    const getPassedMonth = () => {
        const dateObject = new Date(initialDate);
        return Number(String(dateObject.getMonth()).padStart(2, '0'));
    }

    const getPassedYear = () => {
        const dateObject = new Date(initialDate);
        return dateObject.getFullYear();
    }

    const [visible, setVisible] = useState(false);
    const [formattedDateForInputField, setFormattedDateForInputField] = useState('');
    const [formattedDateForDatePicker, setFormattedDateForDatePicker] = useState('');
    const [month, setMonth] = useState(getPassedMonth());
    const [year, setYear] = useState(getPassedYear()); 

    const changeDatePicker = (e) => {
        setFormattedDateForDatePicker(e);
        const dateString = dateToString(e.start);
        setFormattedDateForInputField(dateString);
        setDate(dateString);
        setVisible(false);
    }
    const changeMonthOfDatePicker = useCallback((month, year) => {
        setMonth(month)
        setYear(year);
    },[]);

    const handleOnClose = () => {
        setVisible(false);
    }

    useEffect( () => {
        if(initialDate != null) {
            setFormattedDateForInputField(dateToString(initialDate)); 
            setFormattedDateForDatePicker(dateToDatePicker(initialDate));

            if(formattedDateForDatePicker)
            {
                setMonth(getPassedMonth());
                setYear(getPassedYear());
            }
        }
        else
        {
            setFormattedDateForInputField('');
            setFormattedDateForDatePicker(dateToDatePicker((new Date()).toLocaleDateString('en-US')));

            if(formattedDateForDatePicker)
            {
                setMonth(getPassedMonth());
                setYear(getPassedYear());
            }
        }
    }, [initialDate])

    return (
        <BlockStack inlineAlign="left">
            <Box minWidth="276px">
                <Popover
                    active={visible}
                    autofocusTarget="none"
                    preferredAlignment="left"
                    fullWidth
                    preferInputActivator={false}
                    preferredPosition="above"
                    preventCloseOnChildOverlayClick
                    onClose={handleOnClose}
                    activator={
                        <TextField
                            role="combobox"
                            label={label}
                            prefix={<Icon source={CalendarIcon} />}
                            value={formattedDateForInputField}
                            onFocus={() => setVisible(true)}
                            autoComplete="off"
                            disabled={isDisabled}
                        />
                    }
                >
                    <Card ref={datePickerRef}>
                        <DatePicker
                            month={month}
                            year={year}
                            selected={formattedDateForDatePicker}
                            onChange={changeDatePicker}
                            onMonthChange={changeMonthOfDatePicker}
                        />
                    </Card>
                </Popover>
            </Box>
        </BlockStack>
    )
}