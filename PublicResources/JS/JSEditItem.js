let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

fillItemInfo();

async function handleSubmit() {
  console.log("JUHUU!");
  let name = document.getElementById("itemName").value;
  let type = $("#type").val();
  let rarity = $("#rarity").val();
  let attunement = $("#attunement").val();
  let charges = $("#charges").val();
  let description = document.getElementById("itemDescription").value;
  let url;
  console.log(name);
  console.log(type);
  console.log(rarity);

  if (
    name != "" &&
    type != "" &&
    rarity != "" &&
    attunement != "" &&
    charges != "" &&
    description != ""
  ) {
    console.log("All fields filled");
    let editItem = JSON.stringify({
      name: name,
      type: type,
      rarity: rarity,
      attunement: attunement,
      charges: charges,
      description: description,
      url: url,
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
  itemName = localStorage.getItem("editItem");
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
    .then((response) => response.text())
    .then((text) => console.log("Test \n" + text));
}
