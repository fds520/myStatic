/**
 * tui infoTip
 * author: siwei
 * update: 2015.12.09
 */
(function($){ 
	var timeInterval;
	$.showLoading= function(options){ 
		tui_touchEnable = 0;
		var myLoadingBox='<div class="loading_block show"><div class="loading_cnt"><i class="loading_bright"></i><p>正在加载中...</p></div></div>'
		$("body").append(myLoadingBox);
	}

	$.removeLoading= function(options){ 
		$(".loading_block").remove();
		tui_touchEnable=1;
	}
})(jQuery); 
