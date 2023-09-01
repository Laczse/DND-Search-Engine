

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

let coll = document.getElementsByClassName("collapsible");
console.log(coll.length);
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
