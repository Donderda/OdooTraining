odoo.define('awesome_tshirt.MyPrint', function (require) {
    "use strict";
    
    const FormController = require('web.FormController');
    const FormView = require("web.FormView");
    const viewRegistry = require('web.view_registry');

    var MyPrint = FormController.extend({
        _isPrinting,
        init: function(){
            this._isPrinting = false;
            this._super.apply(this, arguments);
        },
        renderButtons: function($node) {
            console.log("rendering buttons")
            this._super.apply(this, arguments);
        }
    });
    
    var MyPrintView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
            Controller: MyPrint,
        }),
    });
    
    viewRegistry.add('my_print', MyPrintView);
    return MyPrint;
});