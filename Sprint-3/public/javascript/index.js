//once the document is loaded, the document can be changed
$(document).ready(function (){


    //this changes the placeholder in the input box depending on what is selected
    $("#searchSelect").change(function(){

        //get value in select box
        let selectValue = this.value;

        if(selectValue == "book"){
            $("#searchInput").attr("placeholder","Search books by authors, ID, ISBN, or title!");
            $("#searchForm").attr("action", "/books/search");
            $("#searchForm").attr("method", "get");
            //the name needs to be changed to q to search for books properly
            $("#searchInput").attr("name", "q");
        }
        else if (selectValue == "tech"){
            $("#searchInput").attr("placeholder", "Search tech by brand...");
            $("#searchForm").attr("action", "/techs/search");
            $("#searchForm").attr("method", "get");
            //the name needs to be changed to p to search for tech properly
            $("#searchInput").attr("name", "p");
        }
        else { 
            $("#searchInput").attr("placeholder", "Select what you want to search by!");
            $("#searchForm").attr("action", "#");
            $("#searchForm").attr("method", "#");
            
        }
        
    });

    //this changes the function of the submit button depending on what is selected

});