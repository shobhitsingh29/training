//Instruments used for batching
export const BATCHING_INSTRUMENTS = [{
    AssetType: "FxSpot",
    Uic: 2071,
    Symbol: "EURHUF"
}, {
    AssetType: "FxSpot",
    Uic: 31,
    Symbol: "GBPUSD"
}, {
    AssetType: "FxSpot",
    Uic: 19,
    Symbol: "EURNOK"
},];

//Order place arguments

export const PLACE_ORDER_ARGS = {
    AccountKey: '',
    Amount: "100006",
    AssetType: "FxSpot",
    BuySell: "Buy",
    OrderDuration: {"DurationType": "DayOrder"},
    OrderPrice: 84.956,
    OrderRelation: "StandAlone",
    OrderType: "Market",
    Orders: [],
    ToOpenClose: "ToOpen",
    Uic: 2
};

// Price formatting Instrument
export const INSTRUMENT = {
    AssetType: "FxSpot",
    Uic: 21
};

// Instrument for subscription
export const SUBSCRIPTION_INSTRUMENT = {
    AssetType: "FxSpot",
    Uics: 2071
};
