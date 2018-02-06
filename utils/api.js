
/**
 * fetches user data from openapi/port/v1/users/me
 * @param accessToken
 * @returns {*}
 */

export function getUserDetails(accessToken) {
    return services.getData({
        serviceGroup: 'port',
        endPoint: 'v1/users/me',
        accessToken,
    });
}

/**
 *subscribe to Info prices for a set of instruments based on AssetType and Uics.
 eg: Query Params : {
        Arguments: {
            AssetType: 'FxSpot',
            Uics: 21,2
        },
        RefreshRate: 5
    }
 *
 * @param accessToken
 * @param instrumentData
 * @param onUpdate
 * @param onError
 * @returns {Promise}
 */

export function subscribeInfoPrices(accessToken, instrumentData, onUpdate, onError) {
    return new Promise((resolve) => {
        const subscription = services.subscribe({
            serviceGroup: 'trade',
            endPoint: 'v1/infoPrices/subscriptions',
            queryParams: {
                Arguments: {
                    AssetType: instrumentData.AssetType,
                    Uics: instrumentData.Uics,
                    FieldGroups: [
                        'DisplayAndFormat',
                        'InstrumentPriceDetails',
                        'MarketDepth',
                        'PriceInfo',
                        'PriceInfoDetails',
                        'Quote',
                    ],
                },
                RefreshRate: 5,
            },
            accessToken,
        }, onUpdate, onError);
        resolve(subscription);
    });
}

/**
 *  subscribe to Prices for a single instrument based on AssetType and Uic.
 eg: Query Params : {
         Arguments: {
             AssetType: 'FxSpot',
             Uic: 21
         },
         RefreshRate: 5
 *  }
 * @param accessToken
 * @param instrumentData
 * @param onUpdate
 * @param onError
 * @returns {Promise}
 */
export function subscribePrices(accessToken, instrumentData, onUpdate, onError) {
    return new Promise((resolve) => {
        const subscription = services.subscribe({
            serviceGroup: 'trade',
            endPoint: 'v1/Prices/subscriptions',
            queryParams: {
                Arguments: {
                    AssetType: instrumentData.AssetType,
                    Uic: instrumentData.Uic,
                    FieldGroups: [
                        'Commissions',
                        'DisplayAndFormat',
                        'Greeks',
                        'InstrumentPriceDetails',
                        'MarginImpact',
                        'MarketDepth',
                        'PriceInfo',
                        'PriceInfoDetails',
                        'Quote',
                    ],
                },
                RefreshRate: 5,
            },
            accessToken,
        }, onUpdate, onError);
        resolve(subscription);
    });
}

/**
 * remove individual subscription
 * @param accessToken
 * @param subscription
 * @returns {Promise}
 */

export function removeIndividualSubscription(accessToken, subscription) {
    return new Promise((resolve) => {
        services.disposeIndividualSubscription(accessToken, subscription);
        resolve();
    });
}

/**
 * batching helper method
 * @param accessToken
 * @param instrumentData
 * @param onUpdate
 * @param onError
 * @returns {Promise}
 */

export function subscribePricesBatch(accessToken, instrumentData, onUpdate, onError) {
    return new Promise(function (resolve) {
        const subscription = services.subscribeBatches({
            serviceGroup: 'trade',
            endPoint: 'v1/prices/subscriptions/active',
            queryParams: {
                Arguments: {
                    AssetType: instrumentData.AssetType,
                    Uic: instrumentData.Uic,
                    FieldGroups: [
                        'InstrumentPriceDetails',
                        'PriceInfo',
                        'PriceInfoDetails',
                        'Quote',
                        'DisplayAndFormat',
                    ],
                },
                RefreshRate: 5,
            },
            accessToken,
        }, onUpdate, onError);
        resolve(subscription);
    });
}

/**
 * to place order
 * @param accessToken
 * @param order
 * @returns {*}
 */

export function placeOrder(accessToken, order) {
    return services.postData({
        serviceGroup: 'trade',
        endPoint: 'v2/orders',
        queryParams: null,
        body: order,
        accessToken,
    });
}
