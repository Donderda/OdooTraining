odoo.define('awesome_tshirt.MyCustomer', function (require) {
    "use strict";
    
    const FormController = require('web.FormController');
    const FormView = require("web.FormView");
    const viewRegistry = require('web.view_registry');

    var MyCustomer = FormController.extend({
        renderButtons: function($node) {
            console.log("rendering buttons")
            this._super.apply(this, arguments);
        }
    });
    
    var MyCustomerView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
            Controller: MyCustomer,
        }),
    });
    
    viewRegistry.add('my_customer', MyCustomerView);
    return MyCustomer;
});