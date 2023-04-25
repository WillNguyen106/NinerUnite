const clearFilter = document.querySelector('#clearFilter');
const filterSelectors = document.querySelectorAll('input[name="price"],input[name="subject"]');
clearFilter.addEventListener('click',()=>{
    filterSelectors.forEach((radioButton)=>{
        radioButton.checked = false;
    })
})

