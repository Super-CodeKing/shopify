async function fetchXHR({url, method = "GET", headers = { "Content-Type": "application/json" }, data = null}, callback) {
    try {
        const response = await fetch(url, { method, headers, body: data ? JSON.stringify(data) : null});

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
        url: `https://adipex-precipitation-establish-polls.trycloudflare.com/api/store-front/quick-start`,
        method: "POST",
        data: { shop: Shopify.shop }})
    console.log("Result of Quick Start", result);
}

getQuickStart();