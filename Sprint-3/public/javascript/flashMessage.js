
$(document).ready(function(){
    var success = $('.successMessage');
    var error = $('.errorMessage'); 
    if(success.length > 0){
        setTimeout(()=>{
            success.fadeOut('fast');
        },2000);
    }else if(error.length > 0){
        setTimeout(()=>{
            error.fadeOut('fast');
        },2000);
    }
});

