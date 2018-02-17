class Module {
    constructor() {
        this.cardNum = document.getElementById('cardNo');
        this.expiryTime = document.getElementById('cardExpiryDate');
        this.cvvNumber = document.getElementById('cvv');
        //  this.userName = document.getElementById('userName')
        this.savedCardContainer = document.getElementById('savedCard');
        this.setInStorage = this.setInStorage.bind(this);
        this.cardInfoTable = this.cardInfoTable.bind(this);
        this.cardInfo = this.cardInfo.bind(this);
        this.fetchValidation = this.fetchValidation.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.GetCardType = this.GetCardType.bind(this);
        this.setCard = this.setCard.bind(this);

        this.fetchUrl = "https:api.myJson.com/bins/fvzpp";
        this.cardInformation = [];
        this.validationObj = {};
        this.cardTypeName = "";
        this.isPresent = false;

        this.fetchValidation();
        this.cardInfoTable();


    }


    GetCardType(number) {
        // visa
        var str, lastSlash, restoredRegex;
        str = this.validationObj.VISA.cardPattern;
        lastSlash = str.lastIndexOf("/");
        restoredRegex = new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));


        if (number.match(restoredRegex) != null)
            return "Visa";

        str = this.validationObj.MASTERCARD.cardPattern;
        lastSlash = str.lastIndexOf("/");
        restoredRegex = new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));

        if (number.match(restoredRegex) != null)
            return "Mastercard";

        str = this.validationObj.MAESTRO.cardPattern;
        lastSlash = str.lastIndexOf("/");
        restoredRegex = new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));

        if (number.match(restoredRegex) != null)
            return "MAESTRO";
        return "";
    }


    checkValidation(cardType, cardNumDetail, expiryDateDetail, cvvNumDetail) {

        var str, lastSlash, restoredRegex,validationObjReturned = {
                cardNo: false,
                cvvNumDetail: false
            };

        if (cardType == "Visa") {
            str = this.validationObj.VISA.cardNumberLength;
            if (cardNumDetail.length == str) {
                validationObjReturned.cardNo = true;

            }
            str = this.validationObj.VISA.cvvLength;
            if (this.validationObj.VISA.cvv == "required") {
                if (cvvNumDetail.length == str) {
                    validationObjReturned.cvvNumDetail = true;
                }

            }
        }
        if (cardType == "MAESTRO") {
            str = this.validationObj.MAESTRO.cardNumberLength;
            if (cardNumDetail.length == str) {
                validationObjReturned.cardNo = true;

            }
            str = this.validationObj.MAESTRO.cvvLength;
            if (this.validationObj.MAESTRO.cvv == "required") {
                if (cvvNumDetail.length == str) {
                    validationObjReturned.cvvNumDetail = true;
                }

            }
        }
        if (cardType == "MASTERCARD") {
            str = this.validationObj.MASTERCARD.cardNumberLength;
            if (cardNumDetail.length == str) {
                validationObjReturned.cardNo = true;

            }
            str = this.validationObj.MASTERCARD.cvvLength;
            if (this.validationObj.MASTERCARD.cvv == "required") {
                if (cvvNumDetail.length == str) {
                    validationObjReturned.cvvNumDetail = true;
                }

            }
        }
        return validationObjReturned;

    }

    fetchValidation() {
        let data = fetch(this.fetchUrl).then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            return response.json();

        }).catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
        console.log(data);
        data.then((res) => {
            this.validationObj = res;
            console.log(res);

        });
    }

    setCard(cardType) {

        let div = document.createElement('div');
        this.cardNum.append(div);
        div.innerHTML = cardType;
    }

    cardInfo() {
       // console.log("v", this.validationObj);
        const cardNumber = this.cardNum.value;
        const expiryDate = this.expiryTime.value;
        const cvvNum = this.cvvNumber.value;

        const cardType = this.GetCardType(cardNumber);
        this.cardTypeName = cardType;
        let validationObjret = this.checkValidation(cardType, cardNumber, expiryDate, cvvNum);
        if (validationObjret.cardNo && validationObjret.cvvNumDetail && expiryDate) {

            this.cvvNumber.setCustomValidity('');

            this.cardNum.setCustomValidity('');

            this.setInStorage(cardNumber, expiryDate, cvvNum, cardType);
        } else {

            if (!validationObjret.cvvNumDetail) {
                this.cvvNumber.setCustomValidity('Enter cvv Nmber');

            }
            if (!validationObjret.cardNo) {
                this.cardNum.setCustomValidity('Enter correct Card no');

            }
            if(validationObjret.cardNo){
                this.cardNum.setCustomValidity('');
            }
            if(validationObjret.cvvNumDetail){
                this.cvvNumber.setCustomValidity('');
            }

        }


    }

    setInStorage(cardNumDetail, expiryDateDetail, cvvNumDetail, cardType) {

        this.isPresent = false;
        let cardObj = {cardKey: cardNumDetail, expiryKey: expiryDateDetail, cvvKey: cvvNumDetail, cardType: cardType};

        if (localStorage.getItem('cardInformation') !== null) {
            const isCardPresent = JSON.parse(localStorage.getItem('cardInformation')).map((value) => {
                if ((value.cardKey == cardNumDetail) && (value.expiryKey == expiryDateDetail) && (value.cvvKey == cvvNumDetail)) {
                    this.isPresent = true;
                }
            });
        }
        if (this.isPresent) {

        } else {
            if (localStorage.getItem('cardInformation') !== null) {
                this.cardInformation = JSON.parse(localStorage.getItem('cardInformation'));
            }
            this.cardInformation.push(cardObj);

            localStorage.setItem('cardInformation', JSON.stringify(this.cardInformation));
            this.cardInfoTable();
        }
    }

    cardInfoTable() {
        this.savedCardContainer.innerHTML = '';
        if (localStorage.getItem('cardInformation')) {
            (JSON.parse(localStorage.getItem('cardInformation'))).map((value, key) => {
                const individualCard = document.createElement('div');
                individualCard.classList.add('individualCard');

                const cardKey = document.createElement('div');
                cardKey.appendChild(document.createTextNode(value.cardKey));
                cardKey.classList.add('card-key');

                const cardType = document.createElement('span');
                cardType.appendChild(document.createTextNode(value.cardType));
                cardType.classList.add('card-type');

                /*  const expiryKey = document.createElement('div');
                 expiryKey.appendChild(document.createTextNode(value.expiryKey));
                 */
                /* const cvvKey = document.createElement('div');
                 cvvKey.appendChild(document.createTextNode(value.cvvKey));
                 */
                /* const userName = document.createElement('div');
                 userName.appendChild(document.createTextNode(value.userName));

                 */
                const button = document.createElement('button');
                button.classList.add('remove-btn');
                button.classList.add('button');
                button.innerHTML = 'Remove';

                //  individualCard.appendChild(userName);
                individualCard.appendChild(cardKey);
                individualCard.appendChild(cardType);
                //   individualCard.appendChild(expiryKey);
                // individualCard.appendChild(cvvKey);
                individualCard.appendChild(button);

                button.addEventListener('click', (e) => {
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    this.removeFromStorage(value, key, e.target);
                });

                this.cardNum.addEventListener('change', (e) => {
                   this.cardTypeName=this.GetCardType(e.target.value);
                   document.getElementById("labelCard").innerText="Card : "+this.cardTypeName;

                });
                this.savedCardContainer.appendChild(individualCard);
            });
        }
    }

    removeFromStorage(value, removalKey, node) {
        let setStorage = JSON.parse(localStorage.getItem('cardInformation')).filter((value, key) => {
            return removalKey !== key;
        });
        localStorage.setItem('cardInformation', JSON.stringify(setStorage));
    }
}

const module = new Module();
window.onInfo = module.cardInfo;
