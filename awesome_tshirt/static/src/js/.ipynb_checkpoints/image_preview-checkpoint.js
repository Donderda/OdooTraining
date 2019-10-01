odoo.define('awesome_tshirt.image-url', function (require) {
    "use strict";
    const FieldChar = require('web.basic_fields').FieldChar;

    var ImagePreview = FieldChar.extend({
        _renderReadonly: function () {
            if(!!this.value){
                this.$el.html("<img>", {
                            class: 'o_image_preview',
                            src: this.value
                    });
            } else {
                this.$el.text("MISSING TSHIRT DESIGN").addClass("o_image_preview_error");
            }
        }
    });


    const fieldRegistry = require('web.field_registry');
    fieldRegistry.add('image-url', ImagePreview);
    return ImagePreview;   
});
