odoo.define('awesome_tshirt.dashboard', function (require) {
    "use strict";
    //var ControlPanelMixin = require('web.ControlPanelMixin');
    var AbstractAction = require('web.AbstractAction');
    
    var core = require('web.core');
    var Counter = require('awesome_tshirt.counter');
    var Buttons = require('awesome_tshirt.buttons');
    var Statistics = require('awesome_tshirt.statistics');
    var Pie = require('awesome_tshirt.pie');

    var Dashboard = AbstractAction.extend({
        widgets: [],
        intervalID: false,
        init: function (parent, value) {
            return this._super.apply(this, arguments);
        },
        willStart: function(){
           
            return this._super.apply(this, arguments);        
        },
        start: function () {
            this.$el.html('<div id="awesome_dashboard"><div class="counterdiv"/><div class="buttondiv"/><div class="statisticdiv"/><div class="piediv"/></div>');
            // Create the instance
            var counter = new Counter(this, 4);
            var buttons = new Buttons(this);
            var statistics = new Statistics(this);
            var pie = new Pie(this);
            this.widgets = [counter, buttons, statistics, pie];
            // Render and insert into DOM
            return Promise.all([
                counter.appendTo(this.$(".counterdiv")),
                buttons.appendTo(this.$(".buttondiv")),
                statistics.appendTo(this.$(".statisticdiv")),
                pie.appendTo(this.$(".piediv")),

                this._super.apply(this, arguments)   
            ]);
        },
        
        do_start: function(){
            for(var i in this.widgets){
                var widget = this.widgets[i];
                widget.reload();
            }
        },
        destroy: function() {
            return this._super.apply(this, arguments);
        },
                /**
         * @override
         */
        on_attach_callback: function () {
            this.intervalID = window.setInterval(() => {
                for(var i in this.widgets){
                    var widget = this.widgets[i];
                    widget.reload();
                }
            }, 30000);
        },
        /**
         * @override
         */
        on_detach_callback: function () {
            if(this.intervalID){
                window.clearInterval(this.intervalID);
            }
        },
    });
    
    core.action_registry.add('awesome_tshirt.dashboard', Dashboard);
    
    return Dashboard;
});
