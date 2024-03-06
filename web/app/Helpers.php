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
