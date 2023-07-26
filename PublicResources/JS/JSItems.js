

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

async function handleSubmit() {

    console.log("JUHUU!")
    let name = document.getElementById("itemName").value;
    let type = $('#type').val();
    let rarity = $('#rarity').val();
    console.log(name);
    console.log(type);
    console.log(rarity);

    let searchObject = JSON.stringify({
        "name": name,
        "type": type,
        "rarity": rarity
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


