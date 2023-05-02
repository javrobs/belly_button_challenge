function bonusGauge(value) {
    //6. Define trace and layout
    let trace3={
        //6.1 graph type is indicador, mode means gauge and number will appear.
        type:"indicator",
        mode: "gauge+number",
        //6.2 use washing frequency value passed in function
        value:value,
        //6.3 graph title
        title:"Belly Button Washing Frequency<br>Scrubs per week",
        //6.4 gauge config
        gauge:{
            //6.4.1 range is 0 to 9, with 10 black ticks
            axis:{range:[0,9],tickwidth:1,tickcolor:"black",nticks:10},
            //6.4.2 indicator bar is 30% of tickness of gauge, dark red color, hex code obtained from color picker
            bar: {color: "#860000", thickness:0.3},
            //6.4.3 each of the nine steps with specific hex colors from color picker
            steps:[
                {range:[0,1],color:"#f7f2ec"},
                {range:[1,2],color:"#f3f0e5"},
                {range:[2,3],color:"#e9e7c9"},
                {range:[3,4],color:"#e5e9b1"},
                {range:[4,5],color:"#d5e595"},
                {range:[5,6],color:"#b7cd8b"},
                {range:[6,7],color:"#87c080"},
                {range:[7,8],color:"#85bc8b"},
                {range:[8,9],color:"#80b586"}
            ]
        }
    }
    //6.5 No top margin, graph height is 500
    let layout3={margin:{t:0},height:500}
    //6.6 Create plot in gauge div
    Plotly.newPlot("gauge",[trace3],layout3);
}