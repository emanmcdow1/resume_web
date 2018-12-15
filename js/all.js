console.log("1"),
console.log("2"),
console.log("3");

var offset = (window.screen.availHeight / 100) * 20,
  l1 = document.getElementById("c1").offsetTop - offset,
  l2 = document.getElementById("c2").offsetTop - offset,
  l3 = document.getElementById("c3").offsetTop - offset,
  height,
  height2,
  col = 0,
  dots = [document.getElementById("d1"), document.getElementById("d2"), document.getElementById("d3"), document.getElementById("d4")],
  hed = [document.getElementById("w0"), document.getElementById("w1"), document.getElementById("w2"), document.getElementById("w3")];

//Runs the function when scrolling
window.onscroll = function() {
    myFunction()
};

//Run at least once
myFunction();

function myFunction() {

    height = document.body.scrollTop;
    height2 = document.documentElement.scrollTop;

    //Responsive Topnav
    if (height > 200 || height2 > 200) {
        document.getElementById("topnav").style.backgroundColor = "rgba(255,255,255,.7)";
        for(i = 0; i < hed.length; i++)
          hed[i].style.color = 'black';
    } else {
        document.getElementById("topnav").style.backgroundColor = "rgba(0,0,0,0)";
        for(i = 0; i < hed.length; i++)
          hed[i].style.color = '#C2E5E5';
    }

    //Icon Selection
    if ((height < l1) || (height2 < l1)) {
      col = 0;
    }
    if ((height >= l1 && height < l2) || (height2 >= l1 && height2 < l2)) {
      col = 1;
    }
    if ((height >= l2 && height < l3) || (height2 >= l2 && height2 < l3)) {
      col = 2;
    }
    if ((height >= l3) || (height2 >= l3)) {
      col = 3;
    }


    //Dot Coloration
    for(i = 0; i < dots.length; i++){
      if(i != col){
        dots[i].style.backgroundColor = "rgba(0,0,0,0)";
      }else{
        dots[i].style.backgroundColor = "#D62929";
      }
    }

    //Topper Visibility
    if (document.body.scrollTop > 800 || document.documentElement.scollTop > 800) {
        document.getElementById("topper").style.visibility = "hidden";

    } else {
        document.getElementById("topper").style.visibility = "visible";
    }

};
