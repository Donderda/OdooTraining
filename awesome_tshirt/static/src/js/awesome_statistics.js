odoo.define('awesome_tshirt.statistics', function (require) {
    "use strict";
    var Widget = require('web.Widget');
    
    var Statistics = Widget.extend({
        data: undefined,
        template: "awesome_tshirt.statistics",
        loadData: function(){
            return this._rpc({
                route: '/awesome_tshirt/statistics',
            }).then((stats) => {
                stats.average_time = stats.average_time.toFixed(2);
                this.data = stats;
            });
        },
        willStart: function(){
            const ld = this.loadData();
            return Promise.all([
                ld,
                this._super.apply(this, arguments)
            ]);
        },
        reload: function(){
            this.willStart().then(() => {
                this.renderElement();
            });   
        },
    });
    
    return Statistics;
});
