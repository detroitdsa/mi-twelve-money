window.addEventListener('load', (event) => {
    let slides = document.getElementsByClassName("swiper-slide"); 
let arr = Array.from(slides);
arr.forEach(element =>{
   let image_height =  element.childNodes[1].offsetHeight;
   let name_height = element.childNodes[3].offsetHeight;
   var blurb  = element.childNodes[5];
   height_string = "calc(100% - "+ image_height +"px - "+name_height+"px)";
   blurb.style.setProperty('height',height_string);

})
});

window.addEventListener('resize', function(event){
let slides = document.getElementsByClassName("swiper-slide"); 
let arr = Array.from(slides);
arr.forEach(element =>{
   let image_height =  element.childNodes[1].offsetHeight;
   let name_height = element.childNodes[3].offsetHeight;
   var blurb  = element.childNodes[5];
   height_string = "calc(100% - "+ image_height +"px - "+name_height+"px)";
   blurb.style.setProperty('height',height_string);

})
});
var links = document.querySelectorAll("a.links");
links.forEach(element =>{
   element.target = "_blank";
   element.rel= "noreferrer";
   referrerpolicy="no-referrer";
});