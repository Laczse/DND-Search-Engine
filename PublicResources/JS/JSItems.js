

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {

    console.log("JUHUU!")
    let name = document.getElementById("itemName").value;
    let type = $('#type').val();
    let rarity = $('#rarity').val();
    console.log(name);
    console.log("\n");
    console.log(type);
    console.log("\n");
    console.log(rarity);
};


