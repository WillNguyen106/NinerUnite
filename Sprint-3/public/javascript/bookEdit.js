$(document).ready(function (){


    //get value from hidden span
    let subjectSelectValue = $("#subjectValue").text();

    //set the list value to the value the book object has saved
    $("#subjectList").val(subjectSelectValue);


});