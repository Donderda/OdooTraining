odoo.define('awesome_tshirt.counter', function (require) {
    "use strict";
    var Widget = require('web.Widget');
    var widgetRegistry = require("web.widget_registry");
    
    var Counter = Widget.extend({
        template: "awesome_tshirt.counter",
        events: {
            'click .customers': 'increment',
            'click .dec': 'decrement'
        },
        _counter: 0,
        init: function (parent, value) {
            this._counter = value;
            return this._super.apply(this, arguments);
        },
        start: function(){
            this._render();
        },
        decrement: function(){
            this._counter--;
            this._render();
        },
        increment: function(){
            this._counter++;
            this._render();
        },
        _render: function(){
            this.$('.val').text(this._counter);
        },
        reload: function(){},
    });
    
    return Counter;
});
