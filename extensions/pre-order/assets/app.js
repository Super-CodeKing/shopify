const BASE_URL = "https://wedding-retirement-sandy-syndication.trycloudflare.com/api/";

async function fetchXHR(
    {
        url,
        method = "GET",
        headers = { "Content-Type": "application/json" },
        data = null,
    },
    callback
) {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        if (callback) callback(result);
        return result;
    } catch (error) {
        console.error(url + " Error fetching data:", error.message);
    }
}

async function getQuickStart() {
    let result = await fetchXHR({
        url: `${BASE_URL}store-front/quick-start`,
        method: "POST",
        data: { shop: Shopify.shop },
    });
    return result;
}

function getLastUrlPart(url) {
    if (typeof URL !== "undefined") {
        return new URL(url).pathname.split("/").pop();
    }
    return url.substring(url.lastIndexOf("/") + 1);
}

async function getProductAPICall(productId) {
    try {
        const result = await fetchXHR({
            url: `${BASE_URL}store-front/product`,
            method: "POST",
            data: {
                shop: Shopify.shop,
                product_id: "gid://shopify/Product/" + productId,
            },
        });
        return result;
    } catch (error) {
        console.error("Error in second API call:", error);
    }
}

async function productDetails() {
    const lastPart = getLastUrlPart(window.location.href);
    const product = await fetch(
        window.Shopify.routes.root + "products/" + lastPart + ".js"
    ).then((response) => response.json());
    return product;
}

async function variantDetails(variantId) {
    let result = await fetchXHR({
        url: `${BASE_URL}store-front/variant`,
        method: "POST",
        data: {
            id: variantId, 
            shop: Shopify.shop 
        },
    });
    return result;
}

async function checkDailyLimitPreOrder() {
    let result = await fetchXHR({
        url: `${BASE_URL}store-front/pre-order-daily-limit`,
        method: "POST",
        data: {
            shop: Shopify.shop 
        },
    });
    return result;
}

async function checkTotalLimitPreOrder() {
    let result = await fetchXHR({
        url: `${BASE_URL}store-front/pre-order-total-limit`,
        method: "POST",
        data: {
            shop: Shopify.shop 
        },
    });
    return result;
}

async function getProductAvailability() {
    const product = await productDetails();
    const result = await getProductAPICall(product.id);
    return result;
}

function countCreatedToday(Array, dateField) {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    return Array.filter(item => item[dateField].startsWith(todayStr)).length;
}

const setPreOrderLimit = (preOrderButton, preOrderLimit) => {
    const limit = JSON.parse(preOrderLimit);
    
    if(limit.type == 'daily-limit')
    {
        // Check daily limit
        checkDailyLimitPreOrder().then((result) => {
            let allPreOrderOrders = result.orders;
            const dailyCount = countCreatedToday(allPreOrderOrders, "created_at");
            
            if(dailyCount >= limit.daily_limit) {
                const newParagraph = document.createElement("p");
                newParagraph.style.marginBlockStart = "0";
                newParagraph.textContent = "Today's limit exist. Please try later.";
                preOrderButton.after(newParagraph);
                preOrderButton.disabled = true;
            }
        })
        .catch((error) => {
            console.error("Error fetching on Pre Order Limit:", error);
        });
    }
    else if(limit.type == 'total-limit')
    {
        // Check Total limit
        checkTotalLimitPreOrder().then((result) => {
            let totalCountPreOrderOrders = result.orders.length;
            console.log("Total Count: ", result.orders);
            
            if(totalCountPreOrderOrders >= limit.daily_limit) {
                const newParagraph = document.createElement("p");
                newParagraph.style.marginBlockStart = "0";
                newParagraph.textContent = "Total limit exist. Please try later.";
                preOrderButton.after(newParagraph);
                preOrderButton.disabled = true;
            }
        })
        .catch((error) => {
            console.error("Error fetching on Pre Order Limit:", error);
        });
    }
}

const setPreOrderSchedule = (preOrderButton, preOrderSchedule) => {
    const limit = JSON.parse(preOrderSchedule);
    
    if(limit.type == 'daily-limit')
    {
        // Check daily limit
        checkDailyLimitPreOrder().then((result) => {
            let allPreOrderOrders = result.orders;
            const dailyCount = countCreatedToday(allPreOrderOrders, "created_at");
            
            if(dailyCount >= limit.daily_limit) {
                const newParagraph = document.createElement("p");
                newParagraph.style.marginBlockStart = "0";
                newParagraph.textContent = "Today's limit exist. Please try later.";
                preOrderButton.after(newParagraph);
                preOrderButton.disabled = true;
            }
        })
        .catch((error) => {
            console.error("Error fetching on Pre Order Limit:", error);
        });
    }
    else if(limit.type == 'total-limit')
    {
        // Check Total limit
        checkTotalLimitPreOrder().then((result) => {
            let totalCountPreOrderOrders = result.orders.length;
            console.log("Total Count: ", result.orders);
            
            if(totalCountPreOrderOrders >= limit.daily_limit) {
                const newParagraph = document.createElement("p");
                newParagraph.style.marginBlockStart = "0";
                newParagraph.textContent = "Total limit exist. Please try later.";
                preOrderButton.after(newParagraph);
                preOrderButton.disabled = true;
            }
        })
        .catch((error) => {
            console.error("Error fetching on Pre Order Limit:", error);
        });
    }
}

const replaceCartButtonWithPreOrder = (buttonSettings) => {
    // console.log("Button Settings");
    // console.log(buttonSettings);
    const allForms = document.getElementsByTagName("form");

    let addToCartForm = [];

    for (let form = 0; form < allForms.length; form++) {
        let element = allForms[form];

        if (element.action.includes("/cart/add")) {
            addToCartForm.push(element);
        }
    }

    for (let form = 0; form < addToCartForm.length; form++) {
        let element = addToCartForm[form];

        if (element.querySelector(".product-form__buttons")) {
            element.querySelector(".product-form__buttons").style.display =
                "none";

            let preOrderButton = document.createElement("button");

            let buttonStyleSettings = JSON.parse(buttonSettings.color.settings);
            buttonStyleSettings = JSON.parse(buttonStyleSettings);

            preOrderButton.innerText = buttonStyleSettings?.button_text;

            if(buttonSettings.color.inherit_from_theme == 1) {
                preOrderButton.className +=
                "product-form__submit button button--full-width button--secondary dqPreOrder-add-to-cart";
            }
            else
            {
                // Set Style of Admin to Pre Order Button
            }
            
            // Set Order Limit:
            setPreOrderLimit(preOrderButton, buttonSettings.order_limit);
            setPreOrderSchedule(preOrderButton, buttonSettings.schedule);
            
            let hiddenField = document.createElement("input");
            hiddenField.type = "hidden";
            hiddenField.name = "properties[TAGS]";
            hiddenField.value = "PRE_ORDER";

            element.appendChild(hiddenField);
            element.appendChild(preOrderbutton);
        }
    }
};

const showPreOrderButton = (settings) => {
    replaceCartButtonWithPreOrder(settings?.settings)
}

const setUpPreOrder = async (data) => {
    // Check activation First
    const product = await productDetails();
    const variant = await variantDetails(product.variants[0].id);
    const activation = data.settings.activation;

    if(activation?.active && activation?.active_on_product) {
        if(activation?.when_show_pre_order === 1)
        showPreOrderButton(data);
        else if(activation?.when_show_pre_order === 2 && variant?.inventoryQuantity == 0)
        showPreOrderButton(data);
        else if(activation?.when_show_pre_order === 3 && variant?.inventoryQuantity <= activation?.specific_inventory)
        showPreOrderButton(data);
        else
        console.log("Condition not fulfilled to show Pre Order");
    }
};

async function handleAvailability() {
    try {
        const result = await getProductAvailability();
        console.log("Availability Checking....");
        console.log(result);

        if (result?.pre_order) setUpPreOrder(result?.pre_order);
        else if (result?.coming_soon) setUpComingSoon(result?.coming_soon);
        else if (result?.request_stock)
            setUpRequestStock(result?.request_stock);
        else {
            getQuickStart()
                .then((result) => {
                    if (result?.pre_order == 1) replaceCartButtonWithPreOrder();
                })
                .catch((error) => {
                    console.error("Error fetching quick start data:", error);
                });
        }
    } catch (error) {
        console.error("Error fetching quick start data:", error);
    }
}

handleAvailability();
