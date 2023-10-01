
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

let contentButton = document.getElementById("change");
contentButton.addEventListener("click", toggleCollapsible);

let visible = true;

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
        .then(text => console.log("Test \n" + text))
};

function createList(list) {
    let i;
    for (i = 0; i < list.length; i++) {
        let collapsibleButton = document.createElement('button');
        let spaceName = 200 - getTextWidth(list[i].name);
        let spaceType = 225 - getTextWidth(list[i].type);
        let spaceRarity = 200 - getTextWidth(list[i].rarity);
        collapsibleButton.innerHTML = '<span style="padding-right: ' + spaceName + 'px">' + capitalizeWords(list[i].name) + '</span><span style="padding-right: ' + spaceType + 'px">' + capitalizeWords(list[i].type) + '</span><span style="padding-right: ' + spaceRarity + 'px">' + capitalizeWords(list[i].rarity) + '</span>';
        collapsibleButton.className = 'collapsible';
        document.body.appendChild(collapsibleButton);
        let divElement = document.createElement('div');
        let divContent = capitalizeWords(list[i].type) + ', ' + capitalizeWords(list[i].rarity) + '<br>' + list[i].description;
        console.log(divContent);
        divElement.innerHTML = divContent;
        divElement.className = 'content';
        document.body.appendChild(divElement);
    }
    activateCollapsible();
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

function deleteCollapsible() {
    let coll = document.getElementsByClassName("collapsible");
    let repeats = coll.length;
    for (i = 0; i < repeats; i++) {
        coll[0].remove();
        console.log("Deleting element: " + i);
    }
    let div = document.getElementsByClassName("content");
    for (i = 0; i < repeats; i++) {
        div[0].remove();
    }
}

function toggleCollapsible() {
    if (visible == true) {
        console.log("Deleting elements");
        deleteCollapsible();
    } else {
        console.log("Creating elements");
        createList(list);
    }
    visible = visible * -1;
}

async function onLoad() {
    console.log(list);
    let searchObject = JSON.stringify({
    });

    await fetch('onLoadItemSearch', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: searchObject
    }
    )
        .then(response => response.json())
        .then(json => createList(json))
}

async function fillDB(list){
    let i;
    for (i = 0; i < list.length; i++) {
        let searchObject = JSON.stringify({
            "name": list[i].name,
            "type": list[i].type,
            "rarity": list[i].rarity,
            "attunement": list[i].attunement,
            "charges": list[i].charges,
            "description": list[i].description
        });

        await fetch('newItem', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: searchObject
        }
        )
    }
}


function capitalizeWords(str){
    const arr = str.split(" ");

    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const str2 = arr.join(" ");
    console.log(str2);
    return str2;
}


let list = [{
    "name": "Flame Tongue",
    "type": "Weapon",
    "rarity": "Rare",
    "attunement": "Yes",
    "charges": "No",
    "description": "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword."
},
{
    "name": "Alchemy Jug",
    "type": "Wondrous",
    "rarity": "Uncommon",
    "attunement": "No",
    "charges": "No",
    "description": "Test 1"
},
{
    "name": "Amulet of the Black Skull",
    "type": "Wondrous",
    "rarity": "Very Rare",
    "attunement": "Yes",
    "charges": "Yes",
    "description": "Test 2"
},
{
    "name": "Adamantine Armor",
    "type": "Armor",
    "rarity": "Uncommon",
    "attunement": "No",
    "charges": "No",
    "description": "Test 3"
},
{
    "name": "Arrow-Catching Shield",
    "type": "Armor",
    "rarity": "Rare",
    "attunement": "Yes",
    "charges": "No",
    "description": "Test 4"
}];

//fillDB(list);
onLoad();