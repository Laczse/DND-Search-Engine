

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

async function handleSubmit() {

    console.log("JUHUU!")
    let name = document.getElementById("itemName").value;
    let type = $('#type').val();
    let rarity = $('#rarity').val();
    let attunement = $('#attunement').val();
    let charges = $('#charges').val();
    console.log(name);
    console.log(type);
    console.log(rarity);

    let searchObject = JSON.stringify({
        "name": name,
        "type": type,
        "rarity": rarity,
        "attunement": attunement,
        "charges": charges
    });
    console.log(searchObject);
    await fetch('itemSearch', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: searchObject
    }
    )
        .then(response => response.text())
        .then(text => console.log(text))
};

function createList(list) {
    let i;
    for (i = 0; i < list.length; i++) {
        let collapsibleButton = document.createElement('button');
        let spaceName = 200 - getTextWidth(list[i].name);
        let spaceType = 225 - getTextWidth(list[i].type);
        let spaceRarity = 200 - getTextWidth(list[i].rarity);
        collapsibleButton.innerHTML = '<span style="padding-right: ' + spaceName + 'px">' + list[i].name + '</span><span style="padding-right: ' + spaceType + 'px">' + list[i].type + '</span><span style="padding-right: ' + spaceRarity + 'px">' + list[i].rarity + '</span>';
        collapsibleButton.className = 'collapsible';
        document.body.appendChild(collapsibleButton);
        let divElement = document.createElement('div');
        divElement.textContent = 'Test ' + i;
        divElement.className = 'content';
        document.body.appendChild(divElement);
    }
}


function activateCollapsible() {
    let coll = document.getElementsByClassName("collapsible");
    console.log(coll.length);
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

function getTextWidth(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context.font = getComputedStyle(document.body).font;

    return context.measureText(text).width;
}


let list = [{
    "name": "Flametongue",
    "type": "Weapon",
    "rarity": "Rare"
},
{
    "name": "Alchemy Jug",
    "type": "Wondrous",
    "rarity": "Uncommon"
},
{
    "name": "Amulet of the Black Skull",
    "type": "Wondrous",
    "rarity": "Very Rare"
},
{
    "name": "Adamantine Armor",
    "type": "Armor",
    "rarity": "Uncommon"
},
{
    "name": "Arrow-Catching Shield",
    "type": "Armor",
    "rarity": "Rare"
}];

createList(list);
activateCollapsible();
