$(document).ready(function (){

        //get value from hidden span
        let deviceSelectValue = $("#deviceListValue").text();

        //set the list value to the value the book object has saved
        $("#deviceList").val(deviceSelectValue);

});