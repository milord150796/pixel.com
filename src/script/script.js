let wrapper = document.querySelector(".wrapper");
let pageSlider= new Swiper('.page',{
    //свої класси
    wrapperClass:"page__wrapper",
    slideClass:"page__screen",

    //Вертикальний слайдер
    direction:'vertical',

    //Количество слайдів для показа
    slidesPerView:'auto',

    //Включаєм параллакс
    parallax:true,

    keyboard:{
        //включить/ виключить
        enabled:true,
        //включить/ виключить
        //только когда слайдер
        //в пределахвьпорта
        onlyInViewport:true,
        //включить/ виключить
        //управления коаіишами
        //pageUp, pageDown
        pageUpDown:true,
    },
//Управление колесом миші
    mousewheel:{
        //Чуствітельность колеса миші
        sensitivity:1,
        //класс обєкта на котором
        //будет сработовать прокрутка миші
        //eventsTarget:".image-slider"
    },

    //отключенія фунціонала
    //єслі слайдов менше чем нужно
    watchOverflow:true,

    //Скорость
    speed:800,

    //Обновить свайпер
    //при ізмененії елементов слайдера
    observer:true,

    //обновить свайпер
    //при ізмененія родітельськіх
    //елементи слайдера
    observeParents:true,

    //обновить свайпер
    //при ізмененії дочерніх
    //елементи слайда
    observeSlideChildren:true,

    //Навигіция
    //Буллети,текущіє положенія,прогрессбар
    pagination:{
        el:'.page__pagination',
        type:'bullets',
        clickable:true,
        bulletClass:"page__bullet",
        bulletActiveClass:'page__bullet_active',
    },
    //Скролл
    scrollbar:{
        el:'.page__scroll',
        dragClass:"page__drag-scroll",
        //Возможность перескакивать скролл
        draggable:true,
    },

    //Отключаємо автоматізацию
    init:false,

    //Собитія
    on:{
        //Собитія ініцалізациї
        init:function(){
            menuSlider();
            setScrollType();
            wrapper.classList.add("_loaded");
        },
        //Собитія смені слайдеров
        slideChange:function(){
            menuSliderRemove();
            menuLinks[pageSlider.realIndex].classList.add("_active")
        },
        resize: function(){
            setScrollType();
        }
    },
});

//header
let menuLinks = document.querySelectorAll(".menu__link");

function menuSlider(){
    if(menuLinks.length > 0){
        menuLinks[pageSlider.realIndex].classList.add('_active');
        for(let index = 0; index < menuLinks.length;index++){
            const menuLink=menuLinks[index];
            menuLink.addEventListener("click",function (e) {
                menuSliderRemove();
                pageSlider.slideTo(index,800);
                menuLink.classList.add("_active");
                e.preventDefault();
            })
        }
    }
}

function menuSliderRemove(){
    let menuLinkActive=document.querySelector(".menu__link._active");
    if(menuLinkActive){
        menuLinkActive.classList.remove("_active")
    }
}

function setScrollType (){
    if (wrapper.classList.contains("_free")){
        wrapper.classList.remove("_free");
        pageSlider.params.freeMode=false;
    }
    for (let index=0;index<pageSlider.slides.length;index++){
        const pageSlide=pageSlider.slides[index];
        const pageSlideContent=pageSlide.querySelector(".screen__content")
        if(pageSlideContent){
            const pageSlideContentHeight= pageSlideContent.offsetHeight;
            if(pageSlideContentHeight>window.innerHeight){
                wrapper.classList.add("_free");
                pageSlide.params.freeMode=true;
                break;
            }
        }
    }
}

pageSlider.init();