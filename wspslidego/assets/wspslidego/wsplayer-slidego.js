(function(context,$,wsp) {

  "use strict";


/* wsplayer-slidego main */
var wspslidego = wsp.component('slidego', {
    build: function(webcast, options){
        var el = this.el = $('<div class="slidego slideshow wsplayer wsp-component"></div>');
        //TODO: Generate unique id for iframe
        var iframe = this.iframe = $('<iframe id="presentation" frameborder="0"></iframe>');
        if(options.width){
            el.css({
                "width": options.width+"px"
            });
            iframe.css({
                "width": options.width+"px"
            });
        }
        if(options.height){
            el.css({
                "height": options.height+"px"
            });
            iframe.css({
                "height": options.height+"px"
            });
        }

        this.currentPresentation = "";
        this.el.append(this.iframe);
        webcast.appendElement(this.el);
    },
    _jump: function(){

    },
    dispose: function(){},
    handlers: {
        layout: {
            onStart: function(params){
                var layout = this.webcast.options.components.layout.manifest[params.layout] || params.layout;
                if(layout.slideshow){
                    if(layout.slideshow.height){
                        this.el.css({
                            "height" : layout.slideshow.height+"px"
                        });
                        this.iframe.css({
                            "height" : layout.slideshow.height+"px"
                        });
                    }
                    if(layout.slideshow.width){
                        this.el.css({
                            "width": layout.slideshow.width+"px"
                        });
                        this.iframe.css({
                            "width": layout.slideshow.width+"px"
                        });
                    }
                }else {
                    if(this.options.width){
                        this.el.css({
                            "width": this.options.width+"px"
                        });
                        this.iframe.css({
                            "width": this.options.width+"px"
                        });
                    }
                    if(this.options.height){
                        this.el.css({
                            "height": this.options.height+"px"
                        });
                        this.iframe.css({
                            "height": this.options.height+"px"
                        });
                    }
                }
            }
        },
        slidego: {
            setup: function(){

            },
            onStart: function(params){
                if(params.src !== this.currentPresentation){
                    this.iframe.attr('src', params.src);
                    this.currentPresentation = params.src;
                    this.iframe.load(function(){
                        if(params.slide){
                            var api = document.getElementById('presentation').contentWindow;
                            api.jumpToAnimation(params.slide, params.step || 0, true);
                        }
                    });
                }else{
                    if(params.slide){
                        var api = document.getElementById('presentation').contentWindow;
                        api.jumpToAnimation(params.slide, params.step || 0, true);
                    }
                }
            },
            onEnd: function(){
            }
        }
    }

});
context.wspslidego = wspslidego;

}(this,jQuery,wsp));
