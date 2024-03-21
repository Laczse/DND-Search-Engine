let price = 0;
let rowCounter = -1;


var totalPriceField = document.createElement("input");
totalPriceField.setAttribute("type", "text");
totalPriceField.setAttribute("id", "totalPriceField");
totalPriceField.setAttribute("class", "textField");
totalPriceField.setAttribute("value", "0");
totalPriceField.setAttribute("readonly", "true");

var totalPriceLabel = document.createElement("label");
totalPriceLabel.setAttribute("for", "totalPriceField");
totalPriceLabel.setAttribute("class", "label");
totalPriceLabel.innerHTML = "Total Price: ";

totalPriceField.style.position = "fixed"; 
totalPriceField.style.bottom = "20%";
totalPriceField.style.right = "20%";

totalPriceLabel.style.position = "fixed"; 
totalPriceLabel.style.bottom = "25%";
totalPriceLabel.style.right = "20%";

document.body.appendChild(totalPriceField);
document.body.appendChild(totalPriceLabel);



function createItemLine(){
    rowCounter++;
    var itemTypes = ["Choose Type","Armor","Gemstone","Weapons"];
    const breakLine = document.createElement("br");
    document.body.appendChild(breakLine);

    //Create and append select list
    var typeSelect = document.createElement("select");
    let tempId = "typeSelect" + rowCounter;
    typeSelect.setAttribute("id", tempId);
    typeSelect.setAttribute("class", "mySelect");
    typeSelect.setAttribute("data-placeholder","Choose type");
    document.body.appendChild(typeSelect);

    //Create and append the options
    for (var i = 0; i < itemTypes.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", itemTypes[i]);
        option.text = itemTypes[i];
        typeSelect.appendChild(option);
    }
    typeSelect.addEventListener("change",reactChosenType);
}

function reactChosenType(event){
    var typeSelect = event.target;
    console.log(typeSelect.value);

    //Create and append select list
    var itemSelect = document.createElement("select");
    let tempItemId = "itemSelect" + rowCounter;
    itemSelect.setAttribute("id", tempItemId);
    itemSelect.setAttribute("class", "chosen-select");
    itemSelect.setAttribute("tabindex","-1");

    document.body.appendChild(itemSelect);

    createItemList(itemSelect, typeSelect);

    var conditionSelect = document.createElement("select");
    let tempConditionId = "conditionSelect" + rowCounter;
    conditionSelect.setAttribute("id", tempConditionId);
    conditionSelect.setAttribute("class", "chosen-select");
    conditionSelect.setAttribute("tabindex","-1");

    document.body.appendChild(conditionSelect);

    createConditionList(conditionSelect, typeSelect);

    var quantityField = document.createElement("input");
    quantityField.setAttribute("type", "number");
    quantityField.setAttribute("id", "quantityField" + rowCounter);
    quantityField.setAttribute("class", "textField");
    quantityField.setAttribute("min", "1");
    quantityField.setAttribute("value", "1");
    quantityField.setAttribute("max", "100");

    document.body.appendChild(quantityField);

    var standardPriceField = document.createElement("input");
    standardPriceField.setAttribute("type", "text");
    standardPriceField.setAttribute("id", "standardPriceField" + rowCounter);
    standardPriceField.setAttribute("class", "textField");
    standardPriceField.setAttribute("value", "0");
    standardPriceField.setAttribute("readonly", "true");
    standardPriceField.setAttribute("style", "margin-left: 60px;");

    document.body.appendChild(standardPriceField);

    var sellingPriceField = document.createElement("input");
    sellingPriceField.setAttribute("type", "text");
    sellingPriceField.setAttribute("id", "sellingPriceField" + rowCounter);
    sellingPriceField.setAttribute("class", "textField");
    sellingPriceField.setAttribute("value", "0");
    sellingPriceField.setAttribute("readonly", "true");
    sellingPriceField.setAttribute("style", "margin-left: 90px;");

    document.body.appendChild(sellingPriceField);
    
    var lineTotalPriceField = document.createElement("input");
    lineTotalPriceField.setAttribute("type", "text");
    lineTotalPriceField.setAttribute("id", "lineTotalPriceField" + rowCounter);
    lineTotalPriceField.setAttribute("class", "textField");
    lineTotalPriceField.setAttribute("value", "0");
    lineTotalPriceField.setAttribute("readonly", "true");
    lineTotalPriceField.setAttribute("style", "margin-left: 90px;");

    document.body.appendChild(lineTotalPriceField);

    $('.chosen-select').on('change', updateInputFields);
    $(".chosen-select").chosen({width: "125px"});
    $(".chosen-select").chosen({margin: "10px"});
    $(".chosen-select").chosen();
    itemSelect.append(".chosen-select");
    typeSelect.removeEventListener("change",reactChosenType);
    typeSelect.addEventListener("change",changeChosenItem);
    quantityField.addEventListener("change", updateLineTotalPrice);
    

    createItemLine();
}

function changeChosenItem(event){
    let typeSelect = event.target;
    let idNumber = typeSelect.id.replace(/\D/g, "");
    
    let itemSelect = document.getElementById("itemSelect" + idNumber);
    removeChildrenElements(itemSelect);
    createItemList(itemSelect, typeSelect);

    let conditionSelect = document.getElementById("conditionSelect" + idNumber);
    removeChildrenElements(conditionSelect)
    createConditionList(conditionSelect, typeSelect);

    let quantityField = document.getElementById("quantityField" + idNumber);
    quantityField.setAttribute("value", 1);

    let standardPriceField = document.getElementById("standardPriceField" + idNumber);
    standardPriceField.setAttribute("value", 1);

    let sellingPriceField = document.getElementById("sellingPriceField" + idNumber);
    sellingPriceField.setAttribute("value", 1);

    let lineTotalPriceField = document.getElementById("lineTotalPriceField" + idNumber);
    lineTotalPriceField.setAttribute("value", 1);

    $('.chosen-select').trigger('chosen:updated');
}

function createItemList(parentSelect, typeSelect){

    switch(typeSelect.value){
        case "Armor":
            var itemList = armorList;
            break;
        case "Gemstone":
            var itemList = gemstoneList;
            break;
        case "Weapons":
            var itemList = weaponList;
            break;
        default:
            var itemList = [];
            break;
    }
    createSelectListFromJSON(parentSelect, itemList);
}

function createConditionList(parentSelect, typeSelect){
    switch(typeSelect.value){
        case "Armor":
        case "Weapons":
            var conditionList = ["New","Used","Tattered"];
            break;
        case "Gemstone":
            var conditionList = ["Perfect", "Flawed", "Cracked"];
            break;
        default:
            var conditionList = [];
            break;
    }

    createSelectListFromArray(parentSelect, conditionList);

}

function createSelectListFromArray(parentSelect, list){
    var option = document.createElement("option");
        option.setAttribute("value", "");
        option.text = "-";
        parentSelect.appendChild(option);

    //Create and append the options
    for (var i = 0; i < list.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", list[i]);
        option.text = list[i];
        parentSelect.appendChild(option);
    }
}

function createSelectListFromJSON(parentSelect, list){
    var option = document.createElement("option");
        option.setAttribute("value", "");
        option.text = "-";
        parentSelect.appendChild(option);

    //Create and append the options
    for (var i = 0; i < list.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", list[i].name);
        option.text = list[i].name;
        parentSelect.appendChild(option);
    }
}

function removeChildrenElements(parentElement){
    while (parentElement.firstChild) {
        parentElement.lastChild.remove();
    }
}


function updateInputFields(event){
    let select = event.target;
    let idNumber = select.id.replace(/\D/g, "");

    let item = document.getElementById("itemSelect" + idNumber);
    let condition = document.getElementById("conditionSelect" + idNumber);
    console.log(item.value);
    console.log(condition.value);

    let standardPriceField = document.getElementById("standardPriceField" + idNumber);
    standardPriceField.setAttribute("value", findStandardPrice(item));

    let sellingPriceField = document.getElementById("sellingPriceField" + idNumber);
    sellingPriceField.setAttribute("value", calculateSellingPrice(standardPriceField.value, condition.value));

    let quantityField = document.getElementById("quantityField" + idNumber);

    let lineTotalPriceField = document.getElementById("lineTotalPriceField" + idNumber);
    lineTotalPriceField.setAttribute("value", calculateLineTotalPrice(sellingPriceField.value, quantityField.value));
    
    updateTotalPriceField();
}

function findStandardPrice(item){
    let price = 0;
    let itemList;

    let idNumber = item.id.replace(/\D/g, "");
    let itemType = document.getElementById("typeSelect" + idNumber).value;
    if(itemType == "Weapons"){
        itemList = weaponList;
    }else if(itemType == "Armor"){
        itemList = armorList;
    }else if(itemType == "Gemstone"){
        itemList = gemstoneList;
    }

    for(let i = 0; i < itemList.length; i++){
            if(itemList[i].name == item.value){
                price = itemList[i].price;
            }
        }
    return price;

}

function calculateSellingPrice(standardPrice, condition){
    let price = 0;

    switch(condition){
        case "Used":
        case "Flawed":
            price = standardPrice * 0.50;
            break;
        case "Tattered":
        case "Cracked":
            price = standardPrice * 0.25;
            break;
        case "New":
        case "Perfect":
        default:
            price = standardPrice;
            break;
    }
    return price;
}

function calculateLineTotalPrice(sellingPrice, quantity){
    return sellingPrice * quantity;

}

function updateLineTotalPrice(event){
    let quantityField = event.target;
    let idNumber = quantityField.id.replace(/\D/g, "");

    let sellingPriceField = document.getElementById("sellingPriceField" + idNumber);
    let lineTotalPriceField = document.getElementById("lineTotalPriceField" + idNumber);

    lineTotalPriceField.setAttribute("value", calculateLineTotalPrice(sellingPriceField.value, quantityField.value));
    updateTotalPriceField();
}

function updateTotalPriceField(){
    let totalPrice = 0;
    for(let i = 0; i < rowCounter; i++){
        let lineTotalPriceField = document.getElementById("lineTotalPriceField" + i);
        if(lineTotalPriceField.value >= 0){
            totalPrice += parseFloat(lineTotalPriceField.value);
        }
        
    }
    totalPriceField.setAttribute("value", totalPrice);
}

createItemLine();


weaponList = [
        {
            "name": "Battleaxe",
            "price": "10"
        },
        {
            "name": "Blowgun",
            "price": "10"
        },
        {
            "name": "Club",
            "price": "0.1"
        },
        {
            "name": "Crossbow, hand",
            "price": "75"
        },
        {
            "name": "Crossbow, heavy",
            "price": "50"
        },
        {
            "name": "Crossbow, light",
            "price": "25"
        },
        {
            "name": "Dagger",
            "price": "2"
        },
        {
            "name": "Dart",
            "price": "0.05"
        },
        {
            "name": "Double-bladed scimitar",
            "price": "100"
        },
        {
            "name": "Flail",
            "price": "10"
        },
        {
            "name": "Glaive",
            "price": "20"
        },
        {
            "name": "Greataxe",
            "price": "30"
        },
        {
            "name": "Greatclub",
            "price": "0.2"
        },
        {
            "name": "Greatsword",
            "price": "50"
        },
        {
            "name": "Halberd",
            "price": "20"
        },
        {
            "name": "Handaxe",
            "price": "5"
        },
        {
            "name": "Hoopak",
            "price": "1"
        },
        {
            "name": "Javelin",
            "price": "0.5"
        },
        {
            "name": "Lance",
            "price": "10"
        },
        {
            "name": "Light hammer",
            "price": "2"
        },
        {
            "name": "Longbow",
            "price": "50"
        },
        {
            "name": "Longsword",
            "price": "15"
        },
        {
            "name": "Mace",
            "price": "5"
        },
        {
            "name": "Maul",
            "price": "10"
        },
        {
            "name": "Morningstar",
            "price": "15"
        },
        {
            "name": "Net",
            "price": "1"
        },
        {
            "name": "Pike",
            "price": "5"
        },
        {
            "name": "Quarterstaff",
            "price": "0.2"
        },
        {
            "name": "Rapier",
            "price": "25"
        },
        {
            "name": "Scimitar",
            "price": "25"
        },
        {
            "name": "Shortbow",
            "price": "25"
        },
        {
            "name": "Shortsword",
            "price": "10"
        },
        {
            "name": "Sickle",
            "price": "1"
        },
        {
            "name": "Sling",
            "price": "0.1"
        },
        {
            "name": "Spear",
            "price": "1"
        },
        {
            "name": "Trident",
            "price": "5"
        },
        {
            "name": "War pick",
            "price": "5"
        },
        {
            "name": "Warhammer",
            "price": "15"
        },
        {
            "name": "Whip",
            "price": "2"
        },
        {
            "name": "Yklawa",
            "price": "1"
        }
    ]

gemstoneList = [
        {
            "name": "Alexandrite",
            "price": "500"
        },
        {
            "name": "Amber",
            "price": "100"
        },
        {
            "name": "Amethyst",
            "price": "100"
        },
        {
            "name": "Aquamarine",
            "price": "500"
        },
        {
            "name": "Azurite",
            "price": "10"
        },
        {
            "name": "Banded agate",
            "price": "10"
        },
        {
            "name": "Black opal",
            "price": "1000"
        },
        {
            "name": "Black pearl",
            "price": "500"
        },
        {
            "name": "Black sapphire",
            "price": "5000"
        },
        {
            "name": "Bloodstone",
            "price": "50"
        },
        {
            "name": "Blue quartz",
            "price": "10"
        },
        {
            "name": "Blue sappphire",
            "price": "1000"
        },
        {
            "name": "Blue spinel",
            "price": "500"
        },
        {
            "name": "Carnelian",
            "price": "50"
        },
        {
            "name": "Chalcedony",
            "price": "50"
        },
        {
            "name": "Chrysoberyl",
            "price": "100"
        },
        {
            "name": "Chrysoprase",
            "price": "50"
        },
        {
            "name": "Citrine",
            "price": "50"
        },
        {
            "name": "Coral",
            "price": "100"
        },
        {
            "name": "Diamond",
            "price": "5000"
        },
        {
            "name": "Emerald",
            "price": "1000"
        },
        {
            "name": "Eye agate",
            "price": "10"
        },
        {
            "name": "Fire opal",
            "price": "1000"
        },
        {
            "name": "Garnet",
            "price": "100"
        },
        {
            "name": "Hematite",
            "price": "10"
        },
        {
            "name": "Jacinth",
            "price": "5000"
        },
        {
            "name": "Jade",
            "price": "100"
        },
        {
            "name": "Jasper",
            "price": "50"
        },
        {
            "name": "Jet",
            "price": "100"
        },
        {
            "name": "Lapis lazuli",
            "price": "10"
        },
        {
            "name": "Malachite",
            "price": "10"
        },
        {
            "name": "Moonstone",
            "price": "50"
        },
        {
            "name": "Moss agate",
            "price": "10"
        },
        {
            "name": "Obsidian",
            "price": "10"
        },
        {
            "name": "Onyx",
            "price": "50"
        },
        {
            "name": "opal",
            "price": "1000"
        },
        {
            "name": "Pearl",
            "price": "100"
        },
        {
            "name": "Peridot",
            "price": "500"
        },
        {
            "name": "Quartz",
            "price": "50"
        },
        {
            "name": "Rhodochrosite",
            "price": "10"
        },
        {
            "name": "Ruby",
            "price": "5000"
        },
        {
            "name": "Sadonyx",
            "price": "50"
        },
        {
            "name": "Spinel",
            "price": "100"
        },
        {
            "name": "Star rose quartz",
            "price": "50"
        },
        {
            "name": "Star ruby",
            "price": "1000"
        },
        {
            "name": "Star sapphire",
            "price": "1000"
        },
        {
            "name": "Tiger eye",
            "price": "10"
        },
        {
            "name": "Topaz",
            "price": "500"
        },
        {
            "name": "Tourmaline",
            "price": "100"
        },
        {
            "name": "Turquoise",
            "price": "10"
        },
        {
            "name": "Yellow sapphire",
            "price": "1000"
        },
        {
            "name": "Zircon",
            "price": "50"
        }
    ]

armorList = [
        {
            "name": "Breastplate",
            "price": "400"
        },
        {
            "name": "Chain mail",
            "price": "75"
        },
        {
            "name": "Chain shirt",
            "price": "50"
        },
        {
            "name": "Half plate",
            "price": "750"
        },
        {
            "name": "Hide",
            "price": "10"
        },
        {
            "name": "Leather",
            "price": "10"
        },
        {
            "name": "Padded",
            "price": "5"
        },
        {
            "name": "Plate",
            "price": "1500"
        },
        {
            "name": "Pride silk outfit",
            "price": "500"
        },
        {
            "name": "Ring mail",
            "price": "30"
        },
        {
            "name": "Scale mail",
            "price": "50"
        },
        {
            "name": "Spiked armor",
            "price": "75"
        },
        {
            "name": "Splint",
            "price": "200"
        },
        {
            "name": "Studded leather",
            "price": "45"
        }
    ]