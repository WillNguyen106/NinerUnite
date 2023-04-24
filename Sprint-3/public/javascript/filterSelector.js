const clearFilter = document.querySelector('#clearFilter');
const filterSelectors = document.querySelectorAll('input[name="filterBooks"]');
clearFilter.addEventListener('click',()=>{
    filterSelectors.forEach((radioButton)=>{
        radioButton.checked = false;
    })
})

