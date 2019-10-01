odoo.define('awesome_tshirt.IsLate', function (require) {
    "use strict";
    const BasicFields = require('web.basic_fields');
    const FieldBoolean = BasicFields.FieldBoolean;

    let IsLate = FieldBoolean.extend({
        className: "o_is_late",
        _render: function () {
            if(this.value){
                this.$el.addClass('o_is_late_red');
            } else {
                this.$el.addClass('o_is_late_green');
            }
        },
        isSet: function(){return true;}
    });


    const fieldRegistry = require('web.field_registry');
    fieldRegistry.add('is-late', IsLate);
    
    return IsLate;   
});
