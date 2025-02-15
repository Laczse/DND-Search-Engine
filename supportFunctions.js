export {
  capitalizeWords,
  filterByType,
  filterByRarity,
  filterByCharges,
  filterByAttunement,
  setItemURL,
};

function capitalizeWords(str) {
  const arr = str.split(" ");

  //loop through each element of the array and capitalize the first letter.
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  const str2 = arr.join(" ");
  return str2;
}

function filterByType(items, types) {
  if (items.length != 0) {
    let filteredItems = [];
    if (types.length != 0) {
      items.forEach((element) => {
        types.forEach((type) => {
          if (element.type == type.toLowerCase()) {
            filteredItems.push(element);
          }
        });
      });
      return filteredItems;
    }
  }
  return items;
}

function filterByRarity(items, rarities) {
  if (items.length != 0) {
    let filteredItems = [];
    if (rarities.length != 0) {
      items.forEach((element) => {
        rarities.forEach((rarity) => {
          if (element.rarity == rarity.toLowerCase()) {
            filteredItems.push(element);
          }
        });
      });
      return filteredItems;
    }
  }
  return items;
}

function filterByCharges(items, charges) {
  if (items.length != 0) {
    let filteredItems = [];
    if (charges != "") {
      items.forEach((element) => {
        if (element.charges == charges) {
          filteredItems.push(element);
        }
      });
      return filteredItems;
    }
  }
  return items;
}

function filterByAttunement(items, attunement) {
  if (items.length != 0) {
    let filteredItems = [];
    if (attunement != "") {
      items.forEach((element) => {
        if (element.attunement == attunement) {
          filteredItems.push(element);
        }
      });
      return filteredItems;
    }
    return items;
  }
}

function setItemURL(req) {
  let url;
  if (req.body.url == null) {
    url = "itemImages/";
    switch (req.body.type.toLowerCase()) {
      case "armor":
        url = url.concat("default/armor.jpg");
        break;
      case "potion":
        url = url.concat("default/potion.jpg");
        break;
      case "ring":
        url = url.concat("default/ring.jpg");
        break;
      case "rod":
        url = url.concat("default/rod.jpg");
        break;
      case "scroll":
        url = url.concat("default/scroll.jpg");
        break;
      case "staff":
        url = url.concat("default/staff.jpg");
        break;
      case "wand":
        url = url.concat("default/wand.jpg");
        break;
      case "weapon":
        url = url.concat("default/weapon.jpg");
        break;
      case "wondrous item":
        url = url.concat("default/wondrousitem.jpg");
        break;
      default:
        url = url.concat("default/wondrousitem.jpg");
        break;
    }
  } else {
    url = req.body.url;
  }
  return url;
}
