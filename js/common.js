$(document).ready(function () {
    $(".person_carousel").owlCarousel({
        items:21,
        loop:true,
        margin: 5,
        responsive:{
            0:{
                items:5
            },
            450:{
              items:9
            },
            767:{
              items:13
            },
            991:{
              items:21
            }
        }
    });
});