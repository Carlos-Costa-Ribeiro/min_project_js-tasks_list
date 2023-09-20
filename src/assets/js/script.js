let lastId = 0;
function generatedId() {
    lastId++;
    return `${Date.now()}-${lastId}`;
}

function BuildData(textEl) {
    this.content = textEl
    this.id = generatedId()
    this.checked = false
}

function getNewData() {
    let data = localStorage.getItem("tasks");
    data = JSON.parse(data);
    if (data == null) {
        data = [];
    }
    return data.length ? data : [
        {
            content: "Fazer mudança",
            id: generatedId(),
            checked: false
        },
        {
            content: "Lavar a louça",
            id: generatedId(),
            checked: false
        },
        {
            content: "Limpar a casa",
            id: generatedId(),
            checked: false
        },
        {
            content: "Fazer mudança",
            id: generatedId(),
            checked: false
        },
        {
            content: "Lavar a louça",
            id: generatedId(),
            checked: false
        },
        {
            content: "Limpar a casa",
            id: generatedId(),
            checked: false
        },
        {
            content: "Fazer mudança",
            id: generatedId(),
            checked: false
        },
        {
            content: "Lavar a louça",
            id: generatedId(),
            checked: false
        },
        {
            content: "Limpar a casa",
            id: generatedId(),
            checked: false
        },
        {
            content: "Fazer mudança",
            id: generatedId(),
            checked: false
        },
        {
            content: "Lavar a louça",
            id: generatedId(),
            checked: false
        },
        {
            content: "Limpar a casa",
            id: generatedId(),
            checked: false
        },
    ];
};

const arrayElements = getNewData();

function setNewData() {
    localStorage.setItem("tasks", JSON.stringify(arrayElements));
};

let clickedElement = null;
showElements();
setNewData();

function addElementToDOM(item) {
    let elementPai = document.querySelector(".corpo");
    let element = document.querySelector(".corpo .elemento").cloneNode(true);
    let span = element.querySelector(".content");
    let btnEdit = element.querySelector(".btnEdit");
    let checkBox = element.querySelector(".check");
    let removeBtn = element.querySelector(".removeBtn");
    element.setAttribute("id", item.id);
    checkBox.checked = item.checked
    editContentElement(btnEdit);
    editCheckedElement(checkBox);
    removeElement(removeBtn);
    span.textContent = item.content;
    element.classList.remove("d-none");
    element.classList.add("d-flex");
    elementPai.append(element);
}

function showElements() {
    arrayElements.forEach(currentItem => {
        addElementToDOM(currentItem)
    });
};

let addBtn = document.querySelector(".addElement button");
addBtn.addEventListener("click", addElement);
function addElement() {
    let input = document.querySelector(".addElement input");
    let newEle = new BuildData(input.value);
    arrayElements.push(newEle);
    addElementToDOM(newEle);
    input.value = "";
    setNewData();
};

function editContentElement(btn) {
    btn.addEventListener("click", (e) => {
        clickedElement = e.target.closest('.elemento').getAttribute("id");
    });
};

let btnModalAlt = document.querySelector(".btnAlt");
btnModalAlt.addEventListener("click", (e) => {
    let newValue = document.querySelector("#recipient-name").value;
    let item = arrayElements.find(element => element.id === clickedElement);
    if (item) {
        item.content = newValue;
    }
    let eleAlt = document.getElementById(clickedElement);
    eleAlt.querySelector("span").textContent = newValue;
    document.querySelector("#recipient-name").value = "";
    setNewData();
});

function editCheckedElement(checkBox) {
    checkBox.addEventListener("change", (e) => {
        clickedElement = e.target.closest('.elemento').getAttribute("id");
        let item = arrayElements.find(element => element.id === clickedElement);
        if (e.target.checked) {
            item.checked = true;
        } else {
            item.checked = false;
        }
        setNewData();
    });
};

function removeElement(removeBtn) {
    removeBtn.addEventListener("click", (e) => {
        clickedElement = e.target.closest('.elemento').getAttribute("id");
        let indexEl = arrayElements.findIndex(element => element.id === clickedElement);
        arrayElements.splice(indexEl, 1);
        document.getElementById(clickedElement).remove();
        setNewData();
    });
};