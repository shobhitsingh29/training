export function createTableRow(instrument) {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    td.innerHTML = instrument.Symbol;
    tr.appendChild(td);

    const tdAsk = document.createElement("td");
    tdAsk.setAttribute('class', 'js-ask-cell-' + instrument.Uic);
    tr.appendChild(tdAsk);

    const tdBid = document.createElement("td");
    tdBid.setAttribute('class', 'js-bid-cell-' + instrument.Uic);
    tr.appendChild(tdBid);

    return tr;
}

function formatAllowDecimalPips(price, format, orderDecimals) {
    let priceStr = price.toString();
    let decimalPortion = priceStr.split('.').pop();
    const len = decimalPortion.length;
    const digitsToBeChanged = len - orderDecimals;

    if (digitsToBeChanged > 0) {
        return {
            base: priceStr.slice(0, -1 * digitsToBeChanged),
            exp: priceStr.substr(-1 * digitsToBeChanged)
        }
    } else {
        for (let i = 0; i < -1 * digitsToBeChanged; i++) {
            priceStr += '0';
        }
        return {
            base: priceStr,
            exp: 0
        }
    }
}

export function formatPrice(price, format, orderDecimals) {
    switch (format) {
        case "AllowDecimalPips":
            return formatAllowDecimalPips(price, format, orderDecimals);
        default:
            return price.toString();
    }
}
