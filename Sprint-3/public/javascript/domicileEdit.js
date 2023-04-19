//this is for setting the value of the select lists in the domicile edit page
$(document).ready(function (){


    //access the hidden span variables from edit.ejs
    let typeListVal = $("#typeListValue").text();
    let bedListVal = $("#bedListValue").text();
    let bathListVal = $("#bathListValue").text();


    //set the select lists with their value, so that the user understands what they had originally selected
    $("#typeList").val(typeListVal);
    $("#bedList").val(bedListVal);
    $("#bathList").val(bathListVal);

});

