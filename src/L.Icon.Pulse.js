(function(window) {

    L.Icon.Pulse = L.DivIcon.extend({

        options: {
            className: '',
            iconSize: [12,12],
            color: '#ff0000',
            animate: true,
            heartbeat: 1,
        },

        initialize: function (options) {
            L.setOptions(this,options);

            // convert hex to rgba
            convertHexRGBA = function (hex,opacity){
                hex = hex.replace('#','');
                r = parseInt(hex.substring(0,2), 16);
                g = parseInt(hex.substring(2,4), 16);
                b = parseInt(hex.substring(4,6), 16);

                result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
                return result;
            }

            // css

            var uniqueClassName = 'lpi-'+ new Date().getTime()+'-'+Math.round(Math.random()*100000);

            var iconSizeAnimation = this.options.iconSize[0] * 20;
            var iconSizePos = ((iconSizeAnimation - this.options.iconSize[0]) / 2) * -1;
            var animation = '0%{opacity:1}100%{width:' + iconSizeAnimation + 'px;height:' + iconSizeAnimation +'px;top:' + iconSizePos + 'px;left:' + iconSizePos + 'px;opacity:0}'

            var before = ['background-color: '+this.options.color];
            var after = [

                '-webkit-box-shadow: 0px 0px 0px 1px ' + this.options.color,
                'background-color: ' + convertHexRGBA(this.options.color, 30),
                'animation: sonar-' + uniqueClassName + ' ' + this.options.heartbeat + 's ease-out',
                'animation-iteration-count: infinite',
                'animation-delay: '+ (this.options.heartbeat + .1) + 's',
            ];

            if (!this.options.animate){
                after.push('animation: none');
            }

            var css = [
                '.'+uniqueClassName+'{'+before.join(';')+';}',
                '.'+uniqueClassName+':after{'+after.join(';')+';}',
                '@keyframes sonar-'+uniqueClassName+'{'+animation+'}',
            ].join('');

            var el = document.createElement('style');
            if (el.styleSheet){
                el.styleSheet.cssText = css;
            } else {
                el.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName('head')[0].appendChild(el);

            // apply css class

            this.options.className = this.options.className+' sonar-emitter '+uniqueClassName;

            // initialize icon

            L.DivIcon.prototype.initialize.call(this, options);

        }
    });

    L.icon.pulse = function (options) {
        return new L.Icon.Pulse(options);
    };


    L.Marker.Pulse = L.Marker.extend({
        initialize: function (latlng,options) {
            options.icon = L.icon.pulse(options);
            L.Marker.prototype.initialize.call(this, latlng, options);
        }
    });

    L.marker.pulse = function (latlng,options) {
        return new L.Marker.Pulse(latlng,options);
    };

})(window);
