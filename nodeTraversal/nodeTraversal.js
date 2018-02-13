class NodeTraversal {
    constructor() {
        const obj = {
            '1': {
                '2': {
                    '3': {
                        '4': '',
                        '10': {'11': ''}
                    }
                },
                '7': {
                    '8': '',
                    '14': {
                        '15': {
                            '16': '',
                            '20': {'21': ''}
                        }
                    }
                }
            }
        };
      /*  var arr = Array.prototype.slice.call(obj);
        arr.map(function (val, key) {
            console.log(val);
            console.log("key", key);

        })*/
        this.div0 = document.getElementsByTagName("pre")[0];
        this.div1 = document.getElementsByTagName("div")[0];
        this.div0.innerHTML = JSON.stringify(obj, null, 4);
        this.nodes = '';

        this.traverse = this.traverse.bind(this);
        this.traverse(obj);


    }

    traverse(obj) {
        for (let key in obj) {
            if (typeof obj[key] == "object") {

                this.nodes += key;
                this.nodes += "=>";

                this.traverse(obj[key]);

            }
            else {
                this.nodes += key;
                this.nodes += "=>";


            }

        }

        this.div1.innerHTML = this.nodes;
    }

}

const nodeTraversal = new NodeTraversal();
