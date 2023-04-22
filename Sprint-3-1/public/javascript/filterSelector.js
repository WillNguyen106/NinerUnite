const checkBoxes = document.querySelectorAll("input[type=checkbox]");

checkBoxes.forEach(checkBox => {
    checkBox.addEventListener('click', filterBooks)
});

function filterBooks(){
    const selectedPriceOptions = [];
    checkBoxes.forEach(checkBox=>{
        if(checkBox.checked){
            selectedPriceOptions.push(checkBox.value);
        }
    })
    console.log(selectedPriceOptions);
}

