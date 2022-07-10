var data = [
    {id: '0.0',parent: '',name: 'The U.S',donors:''}, 
    {id: '1.0',parent: '0.0',name: 'Out-of-state (94.5%)',value: 1390416,donors: 120}, 
    {id: '1.1',parent: '0.0',name: ' In-state (5.52%)',value: 81200,donors: 71},  

    ];
    var lobby_data=[
     {id: '0.0',parent: '',name: 'PACS'}, 
     {id: '1.0',parent: '0.0',name: 'Pro-Israel PACS (89.7%)',value: 1111851,donors: 16},  
     {id: '2.0',parent: '0.0',name: ' Police PACS (10.3%)',value: 127500,donors: 2}, 
    ]

var location_colors = ["#00FFFFFF","#EA262C","#8F1B20"];
var lobby_colors = ["#00FFFFFF","#EA262C","#8F1B20"]

Highcharts.chart('graphs-a', {

    chart: {
        height: '100%',
        styledMode:false,
    },
    accessibility: true,
    colors: ['transparent'],
    credits: false,
    // Let the center circle be transparent

    title: {
        text: 'Most of the money isn’t from the 12th district – or from Michigan.  Here’s what we found.'
    },

    plotOptions: {
    sunburst: {
      dataLabels: {
        enabled: true,
		padding: 0,
        rotationMode:"circular",
        formatter: function(){
            if(this.point.name == 'The U.S'){
                return undefined;
            }
            else {
                data_label_string = '<b>'+this.point.name+'</br>$'+(Math.round(this.point.value * 100) / 100).toLocaleString()+'</b>';
                return data_label_string;
            }
            },

      },
    },
    },
    series: [{
        type: 'sunburst',
        id:"Donor-Locations",
        size: '100%',
        colors: location_colors,
        title: {
        text: '',
        useHTML: true,
        },
        dataLabels: {
            enabled: true,
            style: {
                overflow: 'justify',
                crop: false,
            },
        },
        data: data,
        name: 'Donor Contributions',
        allowDrillToNode: true,
        cursor: 'pointer',
        levels: [{
            level: 1,
            levelIsConstant: false,

        }, {
            level: 2,
            colorByPoint: true
        },
        {
            level: 3,
            colorByPoint: true
        },
]
    }
    ],
    tooltip: {
        formatter: function(){
            if (this.point.name == "The U.S"){
                return undefined;
            }
            else if(this.series.name == "Donor Contributions")
            {
                var tooltip = '<b>'+this.point.name+'<br/>$'+(Math.round(this.point.value * 100) / 100).toLocaleString()+'</b>';
                return tooltip;
            }
            else if(this.series.name == "Lobbys")
            {
                var tooltip = '<b>'+this.point.name+'<br/>$'+(Math.round(this.point.value * 100) / 100).toLocaleString()+'</b>';
                return tooltip;
            }

        },

            },

});


Highcharts.chart('graphs-b', {

    chart: {
        height: '100%'
    },
    clip: false,
    accessibility: true,
    colors: ['transparent'],
    credits: false,
    // Let the center circle be transparent

    title: {
        text: 'Eight dark-money PACs are doing most of the spending, and the pro-war Israel lobby is behind most of it.'
    },

    plotOptions: {
    sunburst: {
        dataLabels: {
        enabled: true,
        rotationMode:"circular",
        formatter: function(){
            if(this.point.name == 'PACS'){
                return undefined;
            }
            else {
                data_label_string = '<b>'+this.point.name+'<br/>$'+(Math.round(this.point.value * 100) / 100).toLocaleString()+'</b>';
                return data_label_string;
            }
            },

      },
    },
    },
    series: [
    {
        type: 'sunburst',
        colors: lobby_colors,
        title: {
        text: 'Lobby Contributions'
        },
        useHTML:true,
        data: lobby_data,
        size: '100%',
        name: 'Lobbys',
        allowDrillToNode: true,
        cursor: 'pointer',
        credits: false,
        levels: [{
            level: 1,
            levelIsConstant: false,
        }, {
            level: 2,
            colorByPoint: true
        },
        ]

    }
    ],
    tooltip: {
        formatter: function(){
            if (this.point.name == "PACS"){
                return undefined;
            }
            if(this.series.name == "Donor Contributions")
            {
                var tooltip = '<b>'+this.point.name+'<br/>$'+(Math.round(this.point.value * 100) / 100).toLocaleString()+'</b>';
                return tooltip;
            }
            else if(this.series.name == "Lobbys")
            {
                var tooltip = '<b>'+this.point.name+'<br/>$'+(Math.round(this.point.value * 100) / 100).toLocaleString()+'</b>';
                return tooltip;
            }

        },

            },

});