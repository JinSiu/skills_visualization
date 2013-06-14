/*************************************** BarGraph **********************************************/
/* 	Date : 06/13/2013
	Developer : TianYu
*/
var BarGraph = {
	marginLeft : 20,
	marginTop: 20,
	marginRight:20,
	marginBottom:20,
	
	labelPadding : 20,
	

	
	
	/***** drawBarGraph  *******************/
	/*	functionality
			draw bar graph
		parameters:
			container : graph container
			width: container width
			height: container height
			fileName : Json file name
	*/
	drawBarGraph : function (container, width, height,fileName){
		fileName = "data/"+fileName; 
		d3.json(fileName, function(error, json_data) {
			if (error != null) {
				return;
			}
			
			//get/calculate percentage of all relationship_status to draw the chart
			var data = BarGraph.getData(json_data);
			
			//sort data with percentage
			data.sort(function(a,b) {
				return a['percentage'] - b['percentage']
			});
			
			//calculate barHeight and barPadding
			var barHeight,
				barPadding;
				var totalHeight = height - (BarGraph.marginTop + BarGraph.marginBottom);
				var barTotalHeight = totalHeight / data.length;
				barHeight = barTotalHeight * 3 / 4; 
				barPadding = barTotalHeight / 4;
			
			//draw chart
			var y = function(d,i) { return i*(barHeight+barPadding);};
			var barWidth = function(d,i) { return width * d['percentage'] / 100 ; };
			
			var svg = d3.select(container).append("svg")
				.attr("class", "barchart")
				.attr("width",width)
				.attr("height",height);
			
			var chart = svg.append('g')
				.attr('transform', 'translate(' + BarGraph.marginLeft + ','+BarGraph.marginTop+')');

			
			//draw chart	
			chart.selectAll(".relationship_status")
				.data(data)
	   			.enter().append("rect")
	     		.attr("class","relationship_status")
				.attr("y",y)
				.attr("width",barWidth)
				.attr("height",barHeight)
				.attr("fill","#FFFFFF");
				
			//draw chart label
			chart.selectAll(".relationship_status_label")
				.data(data)
				.enter().append("text")
				.attr("class","relationship_status_label")
				.attr("x",function(d,i){ return barWidth(d,i) + BarGraph.labelPadding;})
				.attr("y", function(d,i){ return y(d,i)+barHeight/2;})
				.attr("dy","0.35em")
				.text(function(d,i) { return d['percentage'] + "% " + d['label']});
				
		});
	},
	
	
	
	
	
	
	
	
	
	
	
	/*************  getData  ***********************/
	/*	functionality
			get/calculate percentage of all relationship_status
		parameter
			json_data : json data
	*/
	getData : function  (json_data) {
		var single = 0,
			in_a_relationship = 0,
			engaged = 0,
			married = 0,
			it_complicated = 0,
			in_an_open_relationship = 0,
			widowed = 0,
			separated = 0,
			divorced = 0,
			in_a_civil_union = 0,
			in_a_domestic_partnership = 0,
			not_listed = 0,
			na = 0;
			
		
		var totalCount = json_data.length;
		//loop all of the persons
		for (var i = 0; i < totalCount; i++) {
			var person = json_data[i];
			
			//calculate the count according to their relationship_status
			var relationship_status = person.relationship_status;
			if (relationship_status != null) {
				relationship_status = relationship_status.toLowerCase();
			}
			switch (relationship_status) {
				case "single" :
					single ++;
					break;
				case "in a relationship" :
					in_a_relationship ++ ;
					break;
				case "engaged" :
					engaged ++;
					break;
				case "married" :
					married ++;
					break;
				case "it's complicated" :
					it_complicated ++ ;
					break;
				case "in an open relationship" :
					in_an_open_relationship ++ ;
					break;
				case "widowed" :
					widowed ++ ;
					break;
				case "separated" :
					separated ++ ;
					break;
				case "divorced" :
					divorced ++ ;
					break;
				case "in a civil union" :
					in_a_civil_union ++ ;
					break;
				case "in a domestic partnership" :
					in_a_domestic_partnership ++ ;
					break;
				case "not listed" :
					not_listed ++ ;
					break;
				case null :
					na ++ ;
					break;
			}
		}
		
		//add status labels and percentages into new array
		var data = 	[],
			status = [];
			
		status['label'] = "single";
		status['percentage'] = parseFloat(single/totalCount*100).toFixed(2);
		data.push(status);
		
		
		status = [];
		status['label'] = "in a relationship";
		status['percentage'] = parseFloat(in_a_relationship/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "engaged";
		status['percentage'] = parseFloat(engaged/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "married";
		status['percentage'] = parseFloat(married/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "it's complicated";
		status['percentage'] = parseFloat(it_complicated/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "in an open relationship";
		status['percentage'] = parseFloat(in_an_open_relationship/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "widowed";
		status['percentage'] = parseFloat(widowed/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "separated";
		status['percentage'] = parseFloat(separated/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "divorced";
		status['percentage'] = parseFloat(divorced/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "in a civil union";
		status['percentage'] = parseFloat(in_a_civil_union/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "in a domestic partnership";
		status['percentage'] = parseFloat(in_a_domestic_partnership/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "not listed";
		status['percentage'] = parseFloat(not_listed/totalCount*100).toFixed(2);
		data.push(status);
		
		status = [];
		status['label'] = "n/a";
		status['percentage'] = parseFloat(na/totalCount*100).toFixed(2);
		data.push(status);
		return data;
		
	}
}




















