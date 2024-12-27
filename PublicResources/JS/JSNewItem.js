let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

async function handleSubmit() {
  console.log("JUHUU!");
  let name = document.getElementById("itemName").value;
  let type = $("#type").val();
  let additionalType = document.getElementById("additionalType").value;
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
    let newItem = JSON.stringify({
      name: name,
      type: type,
      additionalType: additionalType,
      rarity: rarity,
      attunement: attunement,
      charges: charges,
      description: description,
      url: url,
    });
    console.log(newItem);
    let itemCreationResponse = await fetch("newItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: newItem,
    })
      .then((response) => response.text())
      .then((text) => {
        if (text != "OK") {
          window.alert("Item with that name already exists");
        } else {
          console.log(text);
          location.reload();
        }
      });
  } else {
    window.alert("Please fill all fields before submitting.");
  }
}
