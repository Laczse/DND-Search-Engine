let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

fillItemInfo();

async function handleSubmit() {
  console.log("JUHUU!");
  let name = document.getElementById("itemName").value;
  let type = $("#type").val();
  let additionalType = $("#additionalType").val();
  let rarity = $("#rarity").val();
  let attunement = $("#attunement").val();
  let charges = $("#charges").val();
  let description = document.getElementById("itemDescription").value;
  let url;
  let formerName = localStorage.getItem("editItem");

  console.log(name);
  console.log(type);
  console.log(additionalType);
  console.log(rarity);
  console.log(attunement);
  console.log(charges);
  console.log(description);

  if (
    name != "" &&
    type != "" &&
    rarity != "" &&
    attunement != "" &&
    charges != "" &&
    description != "" &&
    formerName != ""
  ) {
    console.log("All fields filled");
    let editItem = JSON.stringify({
      name: name,
      type: type,
      additionalType: additionalType,
      rarity: rarity,
      attunement: attunement,
      charges: charges,
      description: description,
      url: url,
      formerName: formerName,
    });
    console.log(editItem);
    await fetch("editItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: editItem,
    })
      .then((response) => response.text())
      .then((text) => console.log("Test \n" + text));
  } else {
    console.log("Please fill all the fields before submitting.");
  }
}

async function fillItemInfo() {
  let itemName = localStorage.getItem("editItem");
  let item;
  console.log(itemName);

  let editItem = JSON.stringify({
    name: itemName,
  });
  console.log(editItem);
  await fetch("findItem", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: editItem,
  })
    .then((response) => response.json())
    .then((json) => (item = json));

  console.log(item);

  document.getElementById("itemName").value = capitalizeWords(item.name);
  $("#typeoption").val();
  document.getElementById("additionalType").value = item.additionalType;
  let rarity = $("#rarity").val();
  let attunement = $("#attunement").val();
  let charges = $("#charges").val();
  document.getElementById("itemDescription").value = item.description;
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
  return str2;
}
