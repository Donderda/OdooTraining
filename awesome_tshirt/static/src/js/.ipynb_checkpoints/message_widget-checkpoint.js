odoo.define('awesome_tshirt.MessageWidget', function (require) {
    "use strict";
    
    const widgetRegistry = require('web.widget_registry');
    const Widget = require('web.Widget');
    
    var MessageWidget = Widget.extend({
            init: function (parent, record) {
                this._super.apply(this, arguments);
            },
            start: function () {
                this.$el.text("!");
                return this._super.apply(this, arguments);
            },
            updateState: function (dataPoint) {
                this.$el.text("!!");
            },
        });
    
    widgetRegistry.add('message_widget', MessageWidget);
    
    return MessageWidget;
    
});