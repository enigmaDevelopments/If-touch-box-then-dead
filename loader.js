//https://www.geeksforgeeks.org/how-to-disable-scrolling-temporarily-using-javascript/
scrollTop = window.pageYOffset || document.documentElement.scrollTop;
scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
window.onscroll = function() {
window.scrollTo(scrollLeft, scrollTop);
};