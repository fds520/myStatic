/**
 *发送验证码倒计时插件
 *siwei 2015-11-05
 */
(function($){
    $.fn.btnValidation = function(options){
        var defaults = {
            time:60,
            txt:"重新获取验证码(n)"
        }
        var myData = $.extend(defaults,options);
        return new Validform(this,myData);
    }

    var Validform=function(btn,options){
        this.enable = true;
        var time;
        var initTxt = $(btn).val();
        var currmc= this;
        var thismc = $(btn);

        Validform.prototype.start = function(){
            if(!currmc.enable)
                return;

            time=options.time;
            var txt = options.txt.replace(/n/, time)
            $(btn).val(txt);
            var intervalID;

            currmc.enable = false;
            $(btn).addClass("disabled")

            intervalID = setInterval(function (){
                time--;
                txt = options.txt.replace(/n/, time)
                thismc.val(txt);
                if(time==0)
                {
                    clearInterval(intervalID);
                    thismc.val(initTxt);
                    currmc.enable = true;
                    thismc.removeClass("disabled")
                }
            }, 1000);

        };
    }
})(jQuery);