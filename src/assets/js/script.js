(function($) {
    "use strict";

    $(".header-outer").on('click','li.li-current',function(event){
     	if($('.active').length > 0){
     		$(".header-outer li").removeClass("active"); 
     	}else{
  			$(this).addClass("active");
     	}

	});	
 
})(jQuery);
