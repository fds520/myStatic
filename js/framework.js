var tui_touchEnable=1;//1启用触摸滚动 0禁用触摸滚动

$(function() {
	document.body.addEventListener('touchstart', function () {});  
	
	//启用/禁用触摸滚动
	document.addEventListener("touchmove",function(e){
	if(tui_touchEnable==0){
		e.preventDefault();
		e.stopPropagation();
	}})

	//page location
	var reg = new RegExp("(^|&)"+ "data-href" +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		$("section [id='"+unescape(r[2])+"']").addClass("ui-page-active");
		
	}
	else{
		if(sessionStorage.lastpage && $(sessionStorage.lastpage).length>0){
			console.log(sessionStorage.lastpage);
			
			$(sessionStorage.lastpage).addClass("ui-page-active");
		}
		else
			$("section [data-role='page']").eq(0).addClass("ui-page-active");
	}
	reRender();
});

//---------插件开始---------------
(function($){ 
	$.fn.render = function(){ 
		if ($(this).hasClass("tui_search")){
			$(this).searchRender();
			return;
		}
		if ($(this).hasClass("group_hor")){
			$(this).groupHorRender();
			return;
		}
		if ($(this).hasClass("navbar")){
			$(this).navRender();
			return;
		}
		if ($(this).hasClass("tui_menubar")){
			$(this).navRender();
			return;
		}
		if ($(this).hasClass("tooltips")){
			$(this).tooTipsRender();
			return;
		}
	};

	$.fn.searchRender = function(){ 
		var thismc = this;
		$(this).addClass("searchbar_wrap");
		$(this).append('<div class="searchbar"><div class="searchbar_text"><i class="fa fa-search"></i> 搜索</div><div class="searchbar_input"><input value="" type="text" placeholder="搜索" autocapitalize="off" ></div><div class="searchbar_clear"><button type="reset"><i class="fa fa-times-circle"></i></button></div> <div class="searchbar_btn"> <button type="submit"><i class="fa fa-search"></i></button></div></div><button class="searchbar_cancel">取消</button>');
              
		$(this).find(".searchbar").click(function(){
			$(thismc).addClass('sfocus');
			$(thismc).find('.searchbar_input input').focus();
		});

      	$(this).find(".searchbar_cancel").click(function(){
			$(thismc).find('.searchbar_input input').val("");
			$(thismc).removeClass('sfocus');
		});         
		$(this).find(".searchbar_clear").click(function(){
			$(thismc).find('.searchbar_input input').val("");
		});

		$(this).find(".searchbar_btn").click(function(){
			var search = $(thismc).attr("search"); 
			if(search){
				search = eval(search); 
				search($(thismc).find('.searchbar_input input').val()); 
			}
		});
	};

	$.fn.groupHorRender = function(){ 
		var thismc = this;
		$(this).find(".form_item").change(function(){
			var input = $(this).find("input");
			if(input.attr("type")=="radio"){
				$(thismc).find(".form_item").removeClass("radio_on")
				$(thismc).find("input").attr("checked", false);

				$(this).addClass("radio_on");
				input.attr("checked", true);
			}

			if(input.attr("type")=="checkbox"){
				if (input.is(":checked")) {
					$(this).addClass("checkbox_on");
					input.attr("checked", true);
				}
				else{
					$(this).removeClass("checkbox_on");
					input.attr("checked", false);
				}
			}
		});
	};

	$.fn.navRender = function(){ 
		var lists = $(this).children("ul").children("li");
		lists.click(function(){ 
			lists.removeClass("current");
			$(this).addClass("current");
		});
	};

	$.fn.tooTipsRender = function(){ 
		var closemc = this.find(".icon_close")
		if(closemc.length>0){
			$(this).click(function(){ 
				$(this).remove();
			});
		}
	};

})(jQuery); 
//---------插件over--------------

function reRender(){
	renderComponents();
	renderPanels();
	renderPages();
}

function renderComponents(){
	$("div,input,textarea,button,select,form,table,a,img,span,li").each(function() {
		$(this).render();
	});
}

function renderPanels(){
	//panel
	$("section [data-role='page']").each(function() {
		var panelIndex=0;
		$(this).find("[data-role='panel']").each(function() {
			panelIndex++;
			//如果当前是功能菜单
			if($(this).hasClass("tui_func_menus")){
				$(this).attr("data-display","overlay");
				$(this).attr("data-position","bottom");
				$(this).css({"height":$(this).outerHeight()+10});
			}
			//加入面板方位
			if ($(this).attr("data-position") == null||$(this).attr("data-position")=="") {
				$(this).attr("data-position","left");
			}
			$(this).addClass("ui-panel-position-"+$(this).attr("data-position"));

			if ($(this).attr("data-display") == null||$(this).attr("data-display")=="") {
				$(this).attr("data-display","reveal");
			}
			//加入面板覆盖方式
			$(this).addClass("ui-panel-display-"+$(this).attr("data-display"));
			$(this).addClass("ui-panel-animate");//加入面板滑动效果
			$(this).addClass("ui-panel-closed");//初始关闭面板
		})
		if(panelIndex>0){
			$(this).append("<div class='ui-panel-wrapper'></div>");
			$(this).find(".ui-panel-wrapper").append($(this).children(".tui_header"));
			$(this).find(".ui-panel-wrapper").append($(this).children(".tui_footer"));
			$(this).find(".ui-panel-wrapper").append($(this).children(".tui_container"));
		}
	});
}
function renderPages(){
	//点击
	$("[data-href]").click(function(){ 
		var targetID = $(this).attr("data-href"); 

		if(targetID.indexOf("#")!=-1){	
			switch($(targetID).attr("data-role"))
			{
				case "page":
						var thismc = $(this).parents(".ui-page-active");
						var effect = "fadeIn";
						var reverseEffect = "fadeOut";

						//反向运动
						if($(this).attr("data-direction")=="reverse"){
							switch($(this).attr("data-transition")){
								case "slide":
									effect = "fadeInLeft";
									reverseEffect = "fadeOutRight";
									break;
								case "fade":
									effect = "fadeIn";
									reverseEffect = "fadeOut";
									break;
								case "pop":
									effect="fadeIn";
									reverseEffect = "zoomOut";
									break;
							}
						}
						else{
							switch($(this).attr("data-transition"))
							{
								case "slide":
									effect = "fadeInRight";
									reverseEffect = "fadeOutLeft";
									break;
								case "fade":
									effect = "fadeIn";
									reverseEffect = "fadeOut";
									break;
								case "pop":
									effect="zoomIn";
									reverseEffect = "fadeOut";
									break;
							}
						}
						if($(this).attr("data-transition")=="none"){
							//无过渡效果
							$(targetID).addClass("ui-page-active");
							thismc.removeClass();
						}
						else{
							$(targetID).addClass("ui-page-active animated "+effect);
							thismc.addClass("animated "+reverseEffect).one('webkitAnimationEnd', function(){
								$(this).removeClass();
								$(targetID).addClass("ui-page-active");
								$(targetID).removeClass("animated "+effect);
								//pageChangeEnable = true;
							});
							}
						sessionStorage.lastpage=targetID;
						$(targetID +" .tui_container").scrollTop(0);
					break;

				case "panel"://打开面板或关闭面板
					if($(this).attr("data-rel")=="close"||($(this).attr("yoyo")=="true")&& $(targetID).hasClass("ui-panel-open")){
						//关闭面板
						var panel = $($(this).attr("data-href"));
						var display = panel.attr("data-display");
						var position = panel.attr("data-position");
						panel.removeClass("ui-panel-open");
						panel.siblings(".ui-panel-wrapper").removeClass("ui-panel-page-content-position-"+position+" ui-panel-page-content-display-"+display);
						setTimeout(function() {
							panel.addClass("ui-panel-closed");
							panel.siblings(".ui-panel-wrapper").removeClass("ui-panel-animate ui-panel-page-content-open")
						}, 300);
						if(panel.hasClass("tui_func_menus")){
							$(".tui_func_menus_mask").remove();
						}
					}
					else{
						var display = $(targetID).attr("data-display");
						$(targetID).removeClass("ui-panel-closed");
						$(targetID).addClass("ui-panel-open");
						if(display!="overlay"){
							var position = $(targetID).attr("data-position");
							$(targetID).siblings(".ui-panel-wrapper").addClass("ui-panel-animate ui-panel-page-content-position-"+position+" ui-panel-page-content-display-"+display+" ui-panel-page-content-open");
						}
						if($(targetID).hasClass("tui_func_menus")){
							$("body").append("<div class='tui_func_menus_mask'></div>");
						}
					}
					break;
				}
			}
			else{
				window.location.href=targetID;
			}

	});
}

