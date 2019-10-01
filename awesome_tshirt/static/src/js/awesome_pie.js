odoo.define('awesome_tshirt.pie', function (require) {
    "use strict";
    var Widget = require('web.Widget');
    const chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };
    var Pie = Widget.extend({
        config : {
			type: 'pie',
			data: {
				datasets: [{
					data: [],
					backgroundColor: [
						chartColors.red,
						chartColors.orange,
						chartColors.yellow,
						chartColors.green,
						chartColors.blue,
                        chartColors.purple,
                        chartColors.grey,
					],
					label: 'Orders by Size'
				}],
				labels: []
			},
			options: {
                animation: false,
				responsive: true
			}
        },
        data: false,
        template: "awesome_tshirt.pie",

        willStart: function(){
            var self = this;
            this._rpc({
                route: '/awesome_tshirt/statistics',
            }).then(function(data){
                let dataJSON = JSON.stringify(data);
                let oldDataJSON = JSON.stringify(self.data);

                self.data = data;
                let values = [];
                let names = [];
                for(let key in self.data.orders_by_size){
                    names.push(key);
                    values.push(self.data.orders_by_size[key]);
                }
                self.config.data.datasets[0].data = values;
                self.config.data.labels = names;
                if(dataJSON != oldDataJSON)
                {
                    self._render();
                }
            });
           
            return this._super.apply(this, arguments);
        },
        reload: function(){
            this.willStart();
        },
        _render: function(){
            if(this.data != undefined){
                // render chart
                if(this.data.hasOwnProperty("orders_by_size")){
                    var ctx = document.getElementById('chart-area').getContext('2d');
                    window.myPie = new Chart(ctx, this.config);
                    this.do_show();
                }
            }
        },
    });
    
    return Pie;
});
