class Module {
    constructor() {
        this.cardNum = document.getElementById('cardNo');
        this.expiryTime = document.getElementById('cardExpiryDate');
        this.cvvNumber = document.getElementById('cvv');
        this.userName = document.getElementById('userName')
        this.savedCardContainer = document.getElementById('savedCard');
        this.setInStorage = this.setInStorage.bind(this);
        this.cardInfoTable = this.cardInfoTable.bind(this);
        this.cardInfo = this.cardInfo.bind(this);
        this.cardInformation = [];
        this.isPresent = false;
        this.cardInfoTable();

    }

    cardInfo() {
        const cardNumber = this.cardNum.value;
        const expiryDate = this.expiryTime.value;
        const cvvNum = this.cvvNumber.value;
        const userName = this.userName.value;
        if (cardNumber && expiryDate && cvvNum) {
            this.setInStorage(cardNumber, expiryDate, cvvNum, userName);
        }
    }

    setInStorage(cardNumDetail, expiryDateDetail, cvvNumDetail, userName) {

        this.isPresent = false;
        let cardObj = {cardKey: cardNumDetail, expiryKey: expiryDateDetail, cvvKey: cvvNumDetail, userName: userName};

        if (localStorage.getItem('cardInformation') !== null) {
            const isCardPresent = JSON.parse(localStorage.getItem('cardInformation')).map((value) => {
                if ((value.cardKey == cardNumDetail) && (value.expiryKey == expiryDateDetail) && (value.cvvKey == cvvNumDetail) && (value.userName == userName)) {
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

                const expiryKey = document.createElement('div');
                expiryKey.appendChild(document.createTextNode(value.expiryKey));

                const cvvKey = document.createElement('div');
                cvvKey.appendChild(document.createTextNode(value.cvvKey));

                const userName = document.createElement('div');
                userName.appendChild(document.createTextNode(value.userName));

                const button = document.createElement('button');
                button.innerHTML = 'Remove';

                individualCard.appendChild(userName);
                individualCard.appendChild(cardKey);
                individualCard.appendChild(expiryKey);
                individualCard.appendChild(cvvKey);
                individualCard.appendChild(button);

                button.addEventListener('click', (e) => {
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    this.removeFromStorage(value, key, e.target);
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
