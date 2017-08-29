/*
 * jQuery popwConfirm Component
 * author:siwei
 * date: 2015/7/5
 * 
 */
(function($){ 

	var myData={}
	var type;

	$.showAlert = function(options){ 
		showPopWindws(options,"alert");	
	}

	
	$.showConfirm = function(options){ 
		showPopWindws(options,"confirm");
	}

	$.openDialog= function(options){ 
		showPopWindws(options,"dialog");
	}

	var showPopWindws=function(options,flag){
		var defaults = {
			title:"",
			content:"",
			showClose:true,
		}
		myData= $.extend(defaults,options); 
		var win;
		switch(flag)
		{
			case "alert":
				win= $('<div class="dialog"><div class="dialog_cnt"><div class="dialog_hd"><h3></h3></div><div class="dialog_bd"><div></div></div><div class="dialog_ft"><button type="button" class="sureBtn">确认</button></div></div></div>');
				break;
			case "confirm":
				win= $('<div class="dialog"><div class="dialog_cnt"><div class="dialog_hd"><h3></h3></div><div class="dialog_bd"><div></div></div><div class="dialog_ft"><button type="button" class="cancelBtn">取消</button><button type="button" class="sureBtn">确认</button></div></div></div>');
				break;
			case "dialog":
				win= $('<div class="dialog"><div class="dialog_cnt"><div class="dialog_hd"><h3></h3></div><div class="dialog_bd"></div><div class="dialog_ft"><button type="button" class="sureBtn">关闭</button></div></div></div>');
				break;
		}
		$("body").append(win);
		win.find("h3").append(myData.title);
		win.find(".dialog_bd div").append(myData.content);

		switch(flag)
		{
			case "alert":
				addSureEvent(win.find(".sureBtn"),myData);
				break;
			case "confirm":
				addSureEvent(win.find(".sureBtn"),myData);
				addCancelEvent(win.find(".cancelBtn"),myData);
				break;
		}
		if(options.title==undefined ||options.title==""){
			win.find(".dialog_hd").hide();
		}
		if(flag=='dialog'){
			//显示隐藏关闭按钮
			if(myData.showClose){
				addSureEvent(win.find(".sureBtn"),myData);
			}
			else{
				win.find(".dialog_ft").hide();
			}
			resizePercentWin(myData.width,myData.height,win.find(".dialog_cnt"));
			var boxCotent = win.find(".dialog_bd");
			setTimeout(function (){if(myData.url)
			boxCotent.append($("<iframe  width='100%' height='100%' frameBorder=0  allowTransparency='false' src='"+myData.url+"'></iframe>"));}, 100);
		}
		setTimeout(function (){$(".dialog").addClass("show");}, 100);
		tui_touchEnable = 0;
	}


	$.closePopWin= function(){ 
		$(".dialog").remove();
		tui_touchEnable = 1;
	}

	function addSureEvent(btn,myData){
		btn.bind('click',function(e){
			$.closePopWin();
			if(myData.sure)
				myData.sure(myData.data)
		});
	}

	function addCancelEvent(btn,myData){
		btn.bind('click',function(e){
			$.closePopWin();
			if(myData.cancel)
				myData.cancel(myData.data);
		});
	}

	function resizePercentWin(wid,hei,myPopBox){
		var boxCotent = myPopBox.find(".dialog_bd");
		var title= myPopBox.find(".dialog_hd");
		var foot = myPopBox.find(".dialog_ft");
		wid = wid.toString();
		hei = hei.toString();
		var index = wid.indexOf("%");
		if(index!=-1){
			wid = wid.substring(0,index);
			wid = document.documentElement.clientWidth*Number(wid)*0.01;
		}
		index = hei.indexOf("%");
		if(index!=-1){
			hei = hei.substring(0,index);
			hei = document.documentElement.clientHeight*Number(hei)*0.01;
		}
		myPopBox.css({"width":wid});
		boxCotent.css({"height":hei-title.height()-foot.height()});
	}

})(jQuery); 

