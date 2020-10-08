window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    console.log(121);
    if (document.documentElement.scrollTop > 20) {
        document.getElementById("gototop").style.display = "block";
    } else {
        document.getElementById("gototop").style.display = "none";
    }
}

function topfunction() {
	var set1=setInterval(
        function(){
            document.documentElement.scrollTop*=0.9814;
            if(document.documentElement.scrollTop<0.003)clearInterval(set1);
        },5);
}