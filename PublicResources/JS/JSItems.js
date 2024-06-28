let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reload);

let nameButton = document.getElementById("sortName");
nameButton.addEventListener("click", sortByName);

let typeButton = document.getElementById("sortType");
typeButton.addEventListener("click", sortByType);

let rarityButton = document.getElementById("sortRarity");
rarityButton.addEventListener("click", sortByRarity);

let currentList;

let visible = true;

let sortedBy;

async function handleSubmit() {
  console.log("JUHUU!");
  let name = document.getElementById("itemName").value;
  let type = $("#type").val();
  let rarity = $("#rarity").val();
  let attunement = $("#attunement").val();
  let charges = $("#charges").val();
  console.log(name);
  console.log(type);
  console.log(rarity);
  let searchObject = JSON.stringify({
    name: name,
    type: type,
    rarity: rarity,
    attunement: attunement,
    charges: charges,
  });
  console.log(searchObject);
  await fetch("itemSearch", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: searchObject,
  })
    .then((res) => res.text())
    .then((text) =>
      text.length ? (currentList = JSON.parse(text)) : (currentList = {})
    )
    .catch((error) => {
      throw error;
    });

  createList(currentList);
  console.log("Testing");
  console.log(currentList);
}

function createList(list) {
  deleteCollapsible();
  let i;
  for (i = 0; i < list.length; i++) {
    let collapsibleButton = document.createElement("button");

    let stringHeadline =
      '<div class=orders><img src=" ' +
      list[i].url +
      '" width="35" height="35" style="padding: 0px 10px 0px 0px; vertical-align:middle"><span style="color:' +
      setTextColor(list[i].rarity) +
      ';">' +
      capitalizeWords(list[i].name);

    if (list[i].attunement == "yes") {
      stringHeadline += " (A)";
    }

    stringHeadline +=
      "</span><span>" +
      capitalizeWords(list[i].type) +
      "</span><span>" +
      capitalizeWords(list[i].rarity) +
      "</span><span>" +
      '<a id="' +
      list[i].name +
      '" href="editItem.html" class="button">Edit</a></div>';

    collapsibleButton.innerHTML = stringHeadline;
    collapsibleButton.className = "collapsible";
    document.body.appendChild(collapsibleButton);
    document
      .getElementById(list[i].name)
      .addEventListener("click", enterEditItem);
    let divElement = document.createElement("div");
    let divContent =
      capitalizeWords(list[i].type) +
      ", " +
      capitalizeWords(list[i].rarity) +
      "<br>" +
      list[i].description;
    console.log(divContent);
    divElement.innerHTML = divContent;
    divElement.className = "content";
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

async function onLoad() {
  console.log(list);
  let searchObject = JSON.stringify({});

  await fetch("onLoadItemSearch", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: searchObject,
  })
    .then((response) => response.json())
    .then((json) => (currentList = json));
  createList(currentList);
}

async function fillDB(list) {
  let i;
  for (i = 0; i < list.length; i++) {
    let searchObject = JSON.stringify({
      name: list[i].name,
      type: list[i].type,
      rarity: list[i].rarity,
      attunement: list[i].attunement,
      charges: list[i].charges,
      description: list[i].description,
      url: list[i].url,
    });

    await fetch("newItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: searchObject,
    });
  }
}

function sortByName() {
  if (sortedBy == "name") {
    currentList.reverse();
  } else {
    sortedBy = "name";
    currentList.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  createList(currentList);
}

function sortByType() {
  if (sortedBy == "type") {
    currentList.reverse();
  } else {
    sortedBy = "type";
    currentList.sort(function (a, b) {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0;
    });
  }
  createList(currentList);
}

function sortByRarity() {
  if (sortedBy == "rarity") {
    currentList.reverse();
  } else {
    sortedBy = "rarity";
    currentList.sort(function (a, b) {
      if (rarityToNumber(a.rarity) < rarityToNumber(b.rarity)) {
        return -1;
      }
      if (rarityToNumber(a.rarity) > rarityToNumber(b.rarity)) {
        return 1;
      }
      return 0;
    });
  }
  createList(currentList);
}

function rarityToNumber(rarity) {
  console.log(rarity);
  switch (rarity) {
    case "common":
      return 0;
    case "uncommon":
      return 1;
    case "rare":
      return 2;
    case "very rare":
      return 3;
    case "legendary":
      return 4;
    case "artifact":
      return 5;
    case "varies":
      return 6;
    default:
      return 7;
  }
}

function capitalizeWords(str) {
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

function setTextColor(str) {
  let color;

  switch (str) {
    case "common":
      color = "white";
      break;
    case "uncommon":
      color = "springgreen";
      break;
    case "rare":
      color = "deepskyblue";
      break;
    case "very rare":
      color = "magenta";
      break;
    case "legendary":
      color = "orange";
      break;
    case "artifact":
      color = "peru";
      break;
    default:
      color = "white";
      break;
  }
  console.log(color);
  return color;
}

function reload() {
  location.reload();
}

function enterEditItem(event) {
  event.stopPropagation();
  console.log(event.target.id);
  localStorage.setItem("editItem", event.target.id);
}

let list = [
  {
    name: "Flame Tongue",
    type: "Weapon",
    additionalType: "any sword",
    rarity: "Rare",
    attunement: "Yes",
    charges: "No",
    description:
      "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
    url: "itemImages/default/weapon.jpg",
  },
  {
    name: "Alchemy Jug",
    type: "Wondrous",
    additionalType: "",
    rarity: "Uncommon",
    attunement: "No",
    charges: "No",
    description: "Test 1",
    url: "itemImages/default/wondrousitem.jpg",
  },
  {
    name: "Amulet of the Black Skull",
    type: "Wondrous",
    additionalType: "",
    rarity: "Very Rare",
    attunement: "Yes",
    charges: "Yes",
    description: "Test 2",
    url: "itemImages/default/wondrousitem.jpg",
  },
  {
    name: "Adamantine Armor",
    type: "Armor",
    additionalType: "medium or heavy, but not hide",
    rarity: "Uncommon",
    attunement: "No",
    charges: "No",
    description: "Test 3",
    url: "itemImages/default/armor.jpg",
  },
  {
    name: "Arrow-Catching Shield",
    type: "Armor",
    additionalType: "shield",
    rarity: "Rare",
    attunement: "Yes",
    charges: "No",
    description: "Test 4",
    url: "itemImages/default/armor.jpg",
  },
];

//fillDB(list);
onLoad();
