 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		    swiperAnimateCache(swiper); //隐藏动画元素 
		    swiperAnimate(swiper); //初始化完成开始动画
	  	}, 
	  	onSlideChangeEnd: function(swiper){ 
	    	swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  		} 
    });
    
var oA = document.querySelector("audio");
var music_pic = document.querySelector(".music-pic");
var music_bg = document.querySelector(".music-bg");
document.getElementById("music").onclick = function(){
	if(oA.paused){
		oA.play();
		music_bg.style.display = "block";
		music_pic.style.animation = "music 2s infinite linear";
	}else{
		oA.pause();
		music_bg.style.display = "none";
		music_pic.style.animation ="none";
	}
	
}