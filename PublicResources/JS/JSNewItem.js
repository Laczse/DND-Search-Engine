let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);



async function handleSubmit() {

    console.log("JUHUU!")
    let name = document.getElementById("itemName").value;
    let type = $('#type').val();
    let rarity = $('#rarity').val();
    let attunement = $('#attunement').val();
    let charges = $('#charges').val();
    let description = document.getElementById("itemDescription").value;
    console.log(name);
    console.log(type);
    console.log(rarity);

    if (name != null && type != null && rarity != null && attunement != null && charges != null && description != null && type.length == 1 && rarity.length == 1) {
        let newItem = JSON.stringify({
            "name": name,
            "type": type,
            "rarity": rarity,
            "attunement": attunement,
            "charges": charges,
            "description": description,
            "url": url
        });
        console.log(newItem);
        await fetch('newItem', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: newItem
        }
        )
            .then(response => response.text())
            .then(text => console.log("Test \n" + text))
    } else {
        console.log("Please fill all the fields before submitting. Furthermore make sure you only select 1 rarity and 1 type.");
    }

};



