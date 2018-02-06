class Tictactoe {
    constructor() {

        this.body = document.getElementsByTagName("body")[0];

        this.createTicTacToeView();
        this.crossTick = this.crossTick.bind(this);
        this.zeroTick = this.zeroTick.bind(this);
        this.tick = this.tick.bind(this);
        this.counter = 0;
        this.resultArray = [];

    }


    createTicTacToeView() {
        let i = 0;

        while (i < 9) {
            if (i % 3 == 0) {
                var tr = document.createElement("tr");
                tr.classList.add("row");

            }
            this.body.appendChild(tr);

            let td = document.createElement("td");
            td.classList.add("column");
            td.addEventListener("click", (e) => {
                this.tick(e);
            });
            td.innerText = i+1;
            tr.appendChild(td);
            i++;
        }


    }

    tick(event) {
        if (this.counter % 2 == 0) {

            if (event.target.innerText == "O" || event.target.innerText == "X") {
                return;
            }
            if (event.target.innerText !== "X") {
                this.crossTick(event);
                this.counter++;

            }
        } else {
            if (event.target.innerText == "X" || event.target.innerText == "O") {
                return;
            }
            if (event.target.innerText !== "O") {
                this.zeroTick(event);
                this.counter++;
            }

        }
    }

    crossTick(event) {
        this.resultArray[parseInt(event.target.innerText)-1] = "X";

        event.target.innerText = "X";
        const winner = this.checkFinalResult();
        if (winner)
            alert("winner is " + winner);
    }

    zeroTick(event) {
        this.resultArray[parseInt(event.target.innerText)-1] = "0";

        event.target.innerText = "0";
        const winner = this.checkFinalResult();
        if (winner)
            alert("winner is " + winner);
    }

    checkFinalResult() {
        if ((this.resultArray[0] == "X" && this.resultArray[1] == "X" && this.resultArray[2] == "X") || (this.resultArray[0] == "O" && this.resultArray[1] == "O" && this.resultArray[2] == "O")) {
            return this.resultArray[0];
        }
        if ((this.resultArray[3] == "X" && this.resultArray[4] == "X" && this.resultArray[5] == "X") || (this.resultArray[3] == "O" && this.resultArray[4] == "O" && this.resultArray[5] == "O")) {
            return this.resultArray[3];
        }
        if ((this.resultArray[6] == "X" && this.resultArray[7] == "X" && this.resultArray[8] == "X") || (this.resultArray[6] == "O" && this.resultArray[7] == "O" && this.resultArray[8] == "O")) {
            return this.resultArray[6];
        }
        if ((this.resultArray[0] == "X" && this.resultArray[3] == "X" && this.resultArray[6] == "X") || (this.resultArray[0] == "O" && this.resultArray[3] == "O" && this.resultArray[6] == "O")) {
            return this.resultArray[0];
        }
        if ((this.resultArray[1] == "X" && this.resultArray[4] == "X" && this.resultArray[7] == "X") || (this.resultArray[1] == "O" && this.resultArray[4] == "O" && this.resultArray[7] == "O")) {
            return this.resultArray[1];
        }
        if ((this.resultArray[2] == "X" && this.resultArray[5] == "X" && this.resultArray[8] == "X") || (this.resultArray[2] == "O" && this.resultArray[5] == "O" && this.resultArray[8] == "O")) {
            return this.resultArray[2];
        }
        if ((this.resultArray[0] == "X" && this.resultArray[4] == "X" && this.resultArray[8] == "X") || (this.resultArray[0] == "O" && this.resultArray[4] == "O" && this.resultArray[8] == "O")) {
            return this.resultArray[0];
        }
        if ((this.resultArray[2] == "X" && this.resultArray[4] == "X" && this.resultArray[6] == "X") || (this.resultArray[2] == "O" && this.resultArray[4] == "O" && this.resultArray[6] == "O")) {
            return this.resultArray[2];
        }

    }
}

const tictactoe = new Tictactoe();
