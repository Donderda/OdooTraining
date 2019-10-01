odoo.define('awesome_tshirt.buttons', function (require) {
    "use strict";
    const core = require('web.core');
    const ActionManager = require('web.ActionManager');

    const Widget = require('web.Widget');
    const widgetRegistry = require("web.widget_registry");
    
    const _t = core._t;
    var Buttons = Widget.extend({
        template: "awesome_tshirt.buttons",
        events: {
            'click .customers': '_displayCustomers',
            'click .new_orders': '_displayNewOrder',
            'click .cancelled_orders': '_displayCancelledOrders'
        },
        init: function () {
            return this._super.apply(this, arguments);
        },
        
        _displayCustomers: function(){
            console.log("customers");
            this.do_action("base.action_partner_customer_form");
            
            /*this.do_action({
                res_model: 'res.partner',
                name: "Contacts",
                view_type: 'kanban',
                views: [[false, 'kanban'], [false, 'form']],
                type: 'ir.actions.act_window'
            });*/
        },
        
        _displayNewOrder: function(){
            console.log("new orders");
            var date = new Date();
            date.setDate(new Date().getDate() - 7);
            var isoDate = date.toISOString().split("T")[0];

            this.do_action({
                res_model: 'awesome_tshirt.order',
                name: _t("New Orders"),
                view_type: 'list',
                views: [[false, 'list']],
                type: 'ir.actions.act_window',
                domain: [['create_date', '>=', isoDate],['state',"!=","cancelled"]] 
            });
        },
        
        _displayCancelledOrders: function(){
            console.log("cancelled orders");
            
            var date = new Date();
            date.setDate(new Date().getDate() - 7);
            var isoDate = date.toISOString().split("T")[0];

            this.do_action({
                res_model: 'awesome_tshirt.order',
                name: _t("Cancelled Orders"),
                view_type: 'list',
                views: [[false, 'list']],
                type: 'ir.actions.act_window',
                domain: [['write_date', '>=', isoDate],['state',"=","cancelled"]] 
            });
        },
        
        reload: function(){},
        
    });
    
    return Buttons;
});
