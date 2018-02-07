class TileGame {
    constructor() {
        this.body = document.getElementsByTagName("body")[0];
        this.div = document.createElement("div");
        this.setScore = this.setScore.bind(this);
        this.setScore1 = this.setScore1.bind(this);
        this.createRandomTile = this.createRandomTile.bind(this);
        this.addlistener = this.addlistener.bind(this);
        this.score = 0;
        this.createRandomTile();
        this.addlistener();
    }

    addlistener(){
        this.body.addEventListener("click", (e) => {
            e.stopPropagation();
            this.setScore1(e);

        })
        this.div.addEventListener("click", (e) => {
            e.stopPropagation();
            this.setScore(e);

        });

    }
    createRandomTile() {
        let x, y;
        x = Math.random() * 900;
        y = Math.random() * 900;
        this.body.innerHTML = "";

        this.div.innerText = this.score;
        this.div.classList.add("click-div");
        x = parseInt(x);
        y = parseInt(y);
        this.div.style.position = "relative";
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
        this.body.appendChild(this.div);
    }

    setScore(e) {
        e.stopPropagation();
        this.score++;
        this.createRandomTile();
    }
    setScore1(e) {
        e.stopPropagation();
        this.score--;
        this.createRandomTile();
    }
}

const tilegame = new TileGame();
