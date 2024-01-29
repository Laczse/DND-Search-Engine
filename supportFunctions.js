
export { capitalizeWords, filterByType, filterByRarity, filterByCharges, filterByAttunement };

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



function filterByType(items, types) {
    let filteredItems;

    return filteredItems;
}

function filterByRarity(items, rarities) {
    let filteredItems;

    return filteredItems;
}

function filterByCharges(items, charges) {
    if(items.length != 0){
        console.log(charges);
        let filteredItems = [];
        if(charges != null){
            items.forEach((element) => {
                if(element.charges == charges){
                    filteredItems.push(element); 
                }
            });
            console.log("Before returning list filtered for charges")
            console.log(filteredItems);
            return filteredItems;
        }
    }    
    return items;
}


function filterByAttunement(items, attunement) {
    if(items.length != 0){
        let filteredItems  = [];
        if(attunement != null){
            items.forEach(element => {
                if(element.attunement == attunement){
                    filteredItems.push(element);
                }
            });
            console.log("Before returning list filtered for attunement")
            console.log(filteredItems);
            return filteredItems;
        }
        return items;
    }
}
