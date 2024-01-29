
export { capitalizeWords };

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



function filterByType(items) {
    let filteredItems;

    return filteredItems;
}

function filterByRarity(items) {
    let filteredItems;

    return filteredItems;
}

function filterByCharges(items) {
    let filteredItems;

    return filteredItems;
}

function filterByAttunement(items) {

}
