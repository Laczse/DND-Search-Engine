import { capitalizeWords } from "./supportFunctions.js";

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

fillItemInfo();

async function handleSubmit() {
  let name = document.getElementById("itemName").value;
  let type = $("#type").val();
  let additionalType = $("#additionalType").val();
  let rarity = $("#rarity").val();
  let attunement = $("#attunement").val();
  let charges = $("#charges").val();
  let description = document.getElementById("itemDescription").value;
  let url;
  let formerName = localStorage.getItem("editItem");

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

  let editItem = JSON.stringify({
    name: itemName,
  });
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

  document.getElementById("itemName").value = capitalizeWords(item.name);
  document.getElementById("additionalType").value = item.additionalType;
  document.getElementById("itemDescription").value = item.description;
  document.getElementById("type").value = capitalizeWords(item.type);
  document.getElementById("rarity").value = capitalizeWords(item.rarity);
  document.getElementById("attunement").value = capitalizeWords(
    item.attunement
  );
  document.getElementById("charges").value = capitalizeWords(item.charges);
  $(".chosen-select").trigger("chosen:updated");
}
