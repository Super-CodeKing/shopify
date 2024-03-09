<?php

function dateFormatToStore($requestDate)
{
    $date = '';
    if ($requestDate == "null" || $requestDate == NULL || $requestDate == "") {
        $date = NULL;
    } else {
        $date = date('Y-m-d H:i:s', strtotime($requestDate));
    }
    return $date;
}

function boolFormatToStore($requestBool)
{
    $value = false;
    if ($requestBool == "0" || $requestBool == 0 || $requestBool == false) {
        $value = false;
    } else if ($requestBool == "1" || $requestBool == 1 || $requestBool == true) {
        $value = true;
    }
    return $value;
}

function formatDate($date)
{
    $formattedDate = '';
    if($date == "null" || $date == NULL) {
        $formattedDate = NULL;
    } else {
        $formattedDate = date('Y-m-d H:i:s', strtotime($date));
    }
    return $formattedDate;
}

function formatFalsyValue($falsyValue)
{
    $falsyTo_0_1 = 1;
    
    if($falsyValue == "true" || $falsyValue == true || $falsyValue == 1 || $falsyValue == "1")
    {
        $falsyTo_0_1 =  1;
    }
    else if($falsyValue == "false" || $falsyValue == false || $falsyValue == 0 || $falsyValue == "0")
    {
        $falsyTo_0_1 = 0;
    }
    
    return $falsyTo_0_1;
}
