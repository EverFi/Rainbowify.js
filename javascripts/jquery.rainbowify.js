/*
*
* Rainbowify.js
*
* jQuery Plug-in to give DOM elements a CSS3 animated rainbow background.
* by Colin Van Dyke
* Copyright (c) 2012 EverFi, Inc.
* Released under the MIT License
*
*/

(function($) {
    var CSS_PROPS = {
      "{{BROWSER_PREFIX}}background-size": "50% 35px",
      "background-size": "50% 35px",
      "{{BROWSER_PREFIX}}animation-name": "rainbow-glory",
      "{{BROWSER_PREFIX}}animation-duration": "3s",
      "{{BROWSER_PREFIX}}animation-iteration-count": "infinite",
      "{{BROWSER_PREFIX}}animation-timing-function": "linear"
    };
    var VENDORED_CSS_PROPS = {};

    var helpers = {
      canAnimate: function(elm){
        var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            animation = false,
            pfx = '';

        this.keyframeprefix = '';
        if( elm.style.animationName ) { animation = true; }

        if( animation === false ) {
          for( var i = 0; i < domPrefixes.length; i++ ) {
            if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
              pfx = domPrefixes[ i ];
              this.animationstring = pfx + 'Animation';
              this.keyframeprefix = '-' + pfx.toLowerCase() + '-';
              animation = true;
              break;
            }
          }
        }
        var self = this;
        $.each(CSS_PROPS, function(k,v){
          var key = k.replace("{{BROWSER_PREFIX}}", self.keyframeprefix);
          VENDORED_CSS_PROPS[key] = v;
        })
        return animation;
      },


      addKeyframe: function(){
        var keyframes = '@' + this.keyframeprefix + 'keyframes rainbow-glory { '+
            "0% {background-position: left bottom;} "+
            "100% {background-position: right bottom;} "+
          "} ";
        if( document.styleSheets && document.styleSheets.length ) {
            document.styleSheets[0].insertRule( keyframes, 0 );
        } else {
          var s = document.createElement( 'style' );
          s.innerHTML = keyframes;
          document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
        }
      }
    }

  var Rainbowify = function(elem, options){
    this.elem = elem;
    this.$elem = $(elem);
    this.options = this.getOptions(options);
    this.state = {};
    this.storeState(this);
    this.animate();
    if(typeof this.options.duration != 'undefined'){
      var self = this;
      setTimeout(function(){ self.stop() }, this.options.duration);
    }
  }

  Rainbowify.prototype = {
    type: 'rainbowify',
    stop: function(){
      this.$elem.css(this.state);
    },

    getOptions: function(options){
       return $.extend({}, $.fn[this.type].defaults, options, this.$elem.data())
    },

    animate: function(){
      this.elem.style[ 'background' ] = helpers.keyframeprefix +
                                        "linear-gradient(left," +
                                        this.options.colors.join(",") +
                                        ") repeat";
      this.$elem.css(VENDORED_CSS_PROPS);
    },

    storeState: function(){
      var self = this;
      var tmpState = {};
      // Save the state of each css style we are going to set
      $.each(VENDORED_CSS_PROPS, function(key, value) {
        tmpState[key] = self.$elem.css(key);
      })
      this.state['background'] = this.$elem.css('background');
      $.each(tmpState, function(k,v){
        // Only save the state of styles with existing values
        if(typeof v != 'undefined' && v != ""){
          self.state[k] = v;
        }
      })
    }
  }

 /* RAINBOWIFY PLUGIN DEFINITION
  * ========================= */

  $.fn.rainbowify = function ( option ) {
    if (helpers.canAnimate(this[0])) {
      helpers.addKeyframe();
      return this.each(function () {
        var $this = $(this)
          , data = $this.data('rainbowify')
          , options = typeof option == 'object' && option;
        if (!data) $this.data('rainbowify', (data = new Rainbowify(this, options)));
        if (typeof option == 'string') data[option]();
      });
    }
  }

  $.fn.rainbowify.Constructor = Rainbowify;
  $.fn.rainbowify.defaults = {
    duration: undefined,
    colors: [
      '#7965d3', '#ff7a7a', '#ddb56a', '#9ace63',
      '#16ceb6', '#1549c1', '#7965d3'
    ]
  }

})(jQuery);
