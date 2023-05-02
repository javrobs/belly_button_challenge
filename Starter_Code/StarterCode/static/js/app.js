// JSON url
const url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Script: 
//Run initialize function
init();
//D3 listener for changes
d3.select("#selDataset").on("change",()=>{
    d3.json(url).then(data => {
        refresh(data)
    })
})

//Functions:
// Fetch JSON from URL and save it to a variable
function init() {
    d3.json(url).then(data => {
    console.log(data);
    // Add subjects by appending options to "select" html element 
    for (let i=0;i<data["names"].length;i++) {
        d3.select("select").append("option").text(data["names"][i]);
    }
    //run function called refresh to initialize charts and demographic info
    refresh(data);
    //run function called refresh every time there's a change in "select" html element
});
};



function refresh(data) {
    //Obtain subject from selected "option" in "select" element
    let subject=d3.select("#selDataset").property("value");

    //Update metadata
    //1. Remove all existing metadata
    d3.select("#sample-metadata").html("")
    //2. Use find function with id from subject to match an instance in dataset
    let metadata = data["metadata"].find(one=>{
        return one["id"]==subject;
    })
    //3. Save keys from metadata in array
    let keys=Object.keys(metadata);
    //4. For loop to append a paragraph for each key and value
    for (let i=0;i<keys.length;i++){
        d3.select("div#sample-metadata").append("p").text(`${keys[i]}: ${metadata[keys[i]]}`);
    }


    //Update Charts
    //1. Use find function with id from subject to match an instance in dataset
    let samples = data["samples"].find(one=>{
        return one["id"]==subject;
    })
    console.log(samples)
    console.log(metadata)

    //Bar chart
    //2. Define trace and layout
    let trace1={
        //2.1 get first 10 items and reverse them to put largest first
        y:samples["otu_ids"].map(value=>`OTU_${value} `).slice(0,10).reverse(),
        x:samples["sample_values"].slice(0,10).reverse(),
        //2.2 set up values for hover
        text:samples["otu_labels"],
        //2.3 select bar as type of chart
        type:"bar",
        //2.4 horizontal bar option
        orientation:"h"
    };
    //2.5 No top or right margin, height of chart is 500px
    let layout1={margin:{t:0,r:0},height:500}
    //3. Create plot in "bar" div
    Plotly.newPlot("bar",[trace1],layout1);
    

    //Bubble chart
    //4. Define trace and layout
    let trace2={
        //4.1 x is id number
        x:samples["otu_ids"],
        //4.2 y is amount of sample found
        y:samples["sample_values"],
        //4.3 mode of chart for bubblue chart
        mode:"markers",
        //4.4 set up values for hover
        text:samples["otu_labels"],
        //4.5 marker size, colors match ids in Earth colorscale
        marker:{
            color:samples["otu_ids"],
            colorscale:"Earth",
            size:samples["sample_values"]
        }
    }
    let layout2={
        //4.5 no top margin
        margin:{t:0},
        //4.6 define range as max/min values +/- 300
        xaxis:{
            range:[Math.min(samples["otu_ids"])-300,Math.max(samples["otu_ids"])+300]
        },
        //4.7 define range as max/min values +/- 300
        yaxis:{
            range:[Math.min(samples["sample_values"])-300,Math.max(samples["sample_values"])+300]
        },
        //4.8 height of graph is 500px
        height:500
    }
    //5. Create plot in "bubble" div
    Plotly.newPlot("bubble",[trace2],layout2);
    
    //BONUS: Call function in bonus.js code, passing the washing frequency value
    bonusGauge(metadata["wfreq"]);

}