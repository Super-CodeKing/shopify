const BASE_URL = "https://actors-annie-diagnosis-disclosure.trycloudflare.com/api/";

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
        console.log("Calling API: ", result);
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
    if (typeof URL !== 'undefined') {
      return new URL(url).pathname.split('/').pop();
    }
    return url.substring(url.lastIndexOf('/') + 1);
  }

async function getProductAvailability() 
{
    const lastPart = getLastUrlPart(window.location.href);
    let productId = null;
    console.log("Last Part");
    console.log(lastPart);

    fetch(window.Shopify.routes.root + 'products/' + lastPart + '.js')
    .then(response => response.json())
    .then(product => {
        productId = product.id;

        async function getProductAPICall() {
            console.log("Calling product API");
            console.log("Product ID: ", productId);

            try {
                const result = await fetchXHR({
                    url: `${BASE_URL}store-front/product`,
                    method: "POST",
                    data: {
                       shop: Shopify.shop,
                       product_id: 'gid://shopify/Product/' + productId
                    },
                });

                console.log("Second API call result:", result);
            } catch (error) {
                console.error("Error in second API call:", error);
            }
        }

        getProductAPICall();
    });
    
}

const replaceCartButtonWithPreOrder = () => {
    const allForms = document.getElementsByTagName("form");

    let addToCartForm = [];

    for (let form = 0; form < allForms.length; form++) {
        let element = allForms[form];

        if(element.action.includes('/cart/add')) {
            addToCartForm.push(element);
        }
    }

    console.log("-------------Pre Order Replacement-----------------");

    for (let form = 0; form < addToCartForm.length; form++) {
        let element = addToCartForm[form];

        if(element.querySelector('.product-form__buttons')) {
            element.querySelector('.product-form__buttons').style.display = 'none'

            let button = document.createElement('button')
            button.innerText = 'Pre Order'
            button.className += 'product-form__submit button button--full-width button--secondary dqPreOrder-add-to-cart'

            let hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = 'properties[TAGS]';
            hiddenField.value = 'PRE_ORDER';

            element.appendChild(hiddenField);
            element.appendChild(button);
        }
    }
};

getQuickStart()
    .then((result) => {
        console.log(result);
        if (result?.pre_order == 1) {
            replaceCartButtonWithPreOrder();
        }
    })
    .catch((error) => {
        console.error("Error fetching quick start data:", error);
    });

getProductAvailability()
    .then((result) => {
        console.log("PRE ORDER OR COMING SOON OR REQUEST STOCK");
        console.log(result);
    })
    .catch((error) => {
        console.error("Error fetching quick start data:", error);
    });



