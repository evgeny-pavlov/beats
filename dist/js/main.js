// verticalAccordion team-section
;(function(){

    $(document).ready(() => {
        $('.team__title').on('click', function(e) {
            e.preventDefault();
            let teamContent = $(this).siblings('.team__content');
            const teamItem = $(this).parent('.team__item');
            teamItem.siblings('.team__item').find('.team__content').css('height', 0);
            $(this).parent().toggleClass('active');
    
            if($(this).parent().hasClass('active')){
                $(this).parent().siblings().removeClass('active');
                teamContent.css('height', teamContent.prop('scrollHeight') +'px');
    
            }else {
                teamContent.css('height', 0);
            }
        });
        
    });

})()


// horisontalAccordion color-section
;(function(){

    document.addEventListener('DOMContentLoaded' , () => {
        const links = document.querySelectorAll('.js-color-link')
        
        const colorItemActiveClass = 'cm-item_active'
        
        links.forEach( link => {
           link.addEventListener('click' , (e) => {
               e.preventDefault()
               const currentLink = e.currentTarget
        
               const colorItem = currentLink.closest('.cm-item')
        
               if (colorItem.classList.contains(colorItemActiveClass)) {
                   colorItem.classList.remove(colorItemActiveClass)
               } else {
                   document.querySelectorAll(`.${colorItemActiveClass}`)
                       .forEach( item => {
                           item.classList.remove(colorItemActiveClass)
                   })
        
                   colorItem.classList.add(colorItemActiveClass)
               }
        
           })
        })
        })

})()


// reviewsSlider
;(function(){

    document.addEventListener('DOMContentLoaded', () => {
        
        const links = document.querySelectorAll('.interative-avatar-link')
        const reviews = document.querySelectorAll('.s-reviews__item')
        

        links.forEach( (link) => {

        link.addEventListener( 'click', (e) => {
            e.preventDefault()
            console.log('click')
           
            })
        })
    
    })
        
})()
;(function(){

let myMap;

const init =() =>{
    myMap = new ymaps.Map("map",{
        center: [-1.689506, 29.248921],
        // 59.987945, 30.216766
        zoom: 14
        
    });

    const coords = [
     [-1.688508, 29.237060],
     [-1.683982, 29.235396],

    
    ];
    const myCollection = new ymaps.GeoObjectCollection({},{
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "img/marker.svg",
    
        
    })
    coords.forEach (coord =>{
        myCollection.add(new ymaps.Placemark(coord));
    })
    myMap.geoObjects.add(myCollection);
};
ymaps.ready(init);

})()
;(function(){


const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach((field) => {
        console.log("aasdasd", field.val());
        
        field.removeClass("input-error");
        if (field.val().trim() === "") {
            field.addClass("input-error");
        }
    });

    const errorFields = form.find("input-error");

    return errorFields.length === 0;
}

$('.form').on('submit', (e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find(".modal__content");

    modal.removeClass("error-modal");

    const isValid = validateFields(form, [name, phone, comment, to]);

    console.log("isValid", isValid);

    if (isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
            success: data => {
                content.text(data.message)

                console.log($("#modal").fancybox)
                
                $.fancybox.open({
                    src: "#modal",
                    type: "inline",
                });
            },
            error: data => {
                const message = data.responseJSON.message;
                content.text(message);
                modal.addClass("error-modal");

                console.log($("#modal").fancybox)

                $.fancybox.open({
                    src: "#modal",
                    type: "inline",
                });
            }
        });
    }

  
    $(".app-submit-btn").click(e => {
        e.preventDefault();

        $.fancybox.close();
    })
}));

})()
;(function(){

const burgerBtn = document.querySelector(".hamburger");
const overlay = document.querySelector( ".overlay");
const wrapper = document.querySelector (".wrapper");
const closeBtn = document.querySelector (".closeBtn");
// const gearBtn = document.querySelector (".gear-btn");
// const gearBtnMenu = document.querySelector (".gear-btn__menu");

// gearBtn.addEventListener('mouseover', e=>{
//     e.preventDefault();
//     gearBtnMenu.style.display = 'block';
//  });
//  gearBtn.addEventListener('mouseout', e=>{
//      e.preventDefault();
//      gearBtnMenu.style.display = 'none';
//   });

burgerBtn.addEventListener('click', e=>{
    wrapper.style.display = 'none';
    overlay.style.display = "flex";

});
closeBtn.addEventListener('click', e=>{
    overlay.style.display = 'none';
    wrapper.style.display = 'block';
});



$(document).ready(() =>{

    $('.team__item').on('click', (e)=>{
        
        $('.team__item').removeClass('team__item-active');

    });

    $('.team__item').on('click', function(e){
        
        $(this).addClass('team__item-active');

    });
    // $('.shop__slider').bxSlider({
    //     pager: false,
    //     responsive: true,
    // });

});

})()
;(function(){

let player;
const playerContainer = $('.player');

let eventsInit = () => {
   $(".player__start").click(e => {
       e.preventDefault;

       const btn = $(e.currentTarget);

       if (playerContainer.hasClass('paused')) {
           playerContainer.removeClass("paused");
           player.pauseVideo();
       } else {
           playerContainer.addClass("paused");
           player.playVideo();
       };

       $(".player__playback").click(e => {
           const bar = $(e.currentTarget);
           const clickedPosition = e.originalEvent.layerX;
           const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
           const newPlaybackPosition = (player.getDuration() / 100) * newButtonPositionPercent;

           $(".player__playback-button").css({
               left: `${newButtonPositionPercent}%`
           });

           player.seekTo(newPlaybackPosition);
       });

   });

};
const formatTime = timeSec => {
   const roundTime = Math.round(timeSec);

   const minutes = addZero(Math.floor(roundTime / 60));
   const seconds = addZero(roundTime - minutes * 60);

   function addZero(num) {
       return num < 10 ? `0${num}` : num;
   }

   return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
   let interval;
   const durationSec = player.getDuration();

   $(".player__duration-estimate").text(formatTime(durationSec));

   if (typeof interval === 'undefined') {
       clearInterval(interval);
   }
   interval = setInterval(() => {
       const completedSec = player.getCurrentTime();
       const completedPercent = (completedSec / durationSec) * 100;

       $(".player__playback-button").css({
           left: `${completedPercent}%`
       });
       $(".player__playback-completed").css({
           width: `${completedPercent}%`
       });


       $('.player__duration-completed').text(formatTime(completedSec))
   }, 1000);
};

function onYouTubeIframeAPIReady() {
   player = new YT.Player("player__content", {
       height: '390',
       width: '660',
       videoId: 'W5BxWMD8f_w',
       events: {
           onReady: onPlayerReady,
           // 'onStateChange': onPlayerStateChange
       },
       playerVars: {
           controls: 0,
           disablekb: 0,
           showinfo: 0,
           rel: 0,
           autoplay: 0,
           modestbranding: 0,
       }


   });
}

eventsInit();

})()
;(function(){
        const slider = document.querySelector('.products');
        const itemsCount = $('.product-item').length;
        const arrows = $('.product-slider__arrows');
        const arrowLeft = $('.product-slider__arrow--left');
        const arrowRight = $('.product-slider__arrow--right');
 
        let startIndex = 0;
        const width = document.querySelector('.product-item').clientWidth;
 
        arrowLeft.on('click', function(e){
         e.preventDefault();
              
             if(startIndex > 0){
                  startIndex--;
             } else {
                  startIndex = itemsCount -1;
              }
               
             slider.style.left = "-" + startIndex * width + "px";   
        });
 
        arrowRight.on('click', function(e){
         e.preventDefault();
         
         if(startIndex !== itemsCount - 1){
             startIndex++;
         } else{
             startIndex=0;
         }
 
             slider.style.left = "-" + startIndex * width + "px";
        });
})()