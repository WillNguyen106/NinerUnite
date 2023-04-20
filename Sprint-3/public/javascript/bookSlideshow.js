$(document).ready(function (){

    const imageCarousel = $("#imageCarousel");

  
    //slid.bs.carousel occurs after the carousel has gone to the next slide
    //slide.bs.carousel occurs as soon as the button is clicked

    //this makes sure that when the slide buttons are clicked, the image active before clicking is deactivated 
    imageCarousel.on('slide.bs.carousel', function(event){

        //this finds the index of the item in the imageCarousel with the active class
        let activeIndex = $(this).find('.active').index();
        let idOfActive = "#image" + activeIndex;
        console.log(idOfActive);
        $(idOfActive).attr("class", "carousel-item");
    })

    // let currentSlide = 0;
    // console.log("before any button is pushed:" + currentSlide);


    $(".link").on('click', function(){
        //console.log($(this).text());

        //find the currently active index and deactive
        let activeIndex = $(imageCarousel).find('.active').index();
        let idOfActive = "#image" + activeIndex;
        console.log(idOfActive);
        $(idOfActive).attr("class", "carousel-item");

        //find the target slide and set active class to it
        let currentSlide = $(this).text();
        let idOfSelected = "#image" + currentSlide;
        $(idOfSelected).attr("class", "carousel-item active");

        // console.log($(this).text());
        // let idOfNewSelected = "#image" + $(this).text() + " ";
        // console.log(idOfNewSelected);
        // $(idOfNewSelected).attr("class", "carousel-item active");
        // currentSlide = $(this).text();
        //console.log("after click: " + currentSlide);
    });

});

