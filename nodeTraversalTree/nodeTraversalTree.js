class NodeTraversalTree {
    constructor() {
        this.obj = {
            '1': {
                '2': {
                    '3': {
                        '4': '',
                        '10': {'11': '  '}
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
        this.divLocationPrev = document.getElementsByTagName("body")[0];
        this.traverse = this.traverse.bind(this);
        this.traverseJson = this.traverseJson.bind(this);
        this.flag;
        this.createBtnNode = this.createBtnNode.bind(this);
        this.plusHandler = this.plusHandler.bind(this);
        this.minusHandler = this.minusHandler.bind(this);
        this.traverse(this.divLocationPrev, this.obj);
    }

    createBtnNode(type) {
        let node = document.createElement("button");
        if (type == "plus") {
            node.addEventListener("click", this.plusHandler);

            node.innerText = "+";
        } else {
            node.addEventListener("click", this.minusHandler);

            node.innerText = "-";

        }
        return node;

    }

    plusHandler(e) {
        this.flag = true;
        let nodeToAdd = prompt("enter node to add");
        nodeToAdd = parseInt(nodeToAdd);
        let obj = {};
        obj[nodeToAdd] = "";

        if (e.target.parentElement.parentElement.childNodes.length > 2) {

            this.traverse(e.target.parentElement.parentElement, obj);
        } else {
            this.traverse(e.target.parentElement.parentElement, obj);


        }
        let targetValue = e.target.parentElement.innerText;
        targetValue = targetValue.replace("+", "");
        targetValue = targetValue.replace("-", "");
        this.traverseJson(this.obj, targetValue, this.flag, nodeToAdd);

    }

    minusHandler(e) {
        this.flag = false;
        let targetValue = e.target.parentElement.innerText;
        targetValue = targetValue.replace("+", "");
        targetValue = targetValue.replace("-", "");
        this.traverseJson(this.obj, targetValue, this.flag);
        e.target.parentElement.parentElement.innerHTML = '';


    }

//error hL
    traverseJson(obj, target, flag, objToAdd) {
        for (let key in obj) {
            if (key == target) {


                if (flag) {
                    let objAdded = {};
                    objAdded[objToAdd] = "";

                    obj[key] =Object.assign({},objAdded);


                } else {
                    obj = null;
                }

            }
            if (obj != null) {
                if (typeof obj[key] == "object") {

                    this.traverseJson(obj[key], target, flag, objToAdd);

                } else {


                }


            }
        }
        this.obj=obj;
    }


    traverse(container, obj) {
        for (let key in obj) {

            let div = document.createElement("ul");
            let divLi = document.createElement("li");
            divLi.classList.add("list-item");


            if (typeof obj[key] == "object") {
                divLi.innerHTML = key;
                let divLiBtnPlus = this.createBtnNode("plus");
                let divLiBtnMinus = this.createBtnNode("minus");

                divLi.appendChild(divLiBtnPlus);
                divLi.appendChild(divLiBtnMinus);
                div.appendChild(divLi);

                this.traverse(div, obj[key]);

            } else {
                let divLiBtnPlus = this.createBtnNode("plus");
                let divLiBtnMinus = this.createBtnNode("minus");

                divLi.innerHTML = key;
                divLi.appendChild(divLiBtnPlus);
                divLi.appendChild(divLiBtnMinus);
                div.appendChild(divLi);


            }

            container.appendChild(div);

        }

    }
}

const nodeTraversalTree = new NodeTraversalTree();
nodeTraversalTree.object=nodeTraversalTree.obj;
setInterval(function () {

    console.log(nodeTraversalTree.object);

},1000);
