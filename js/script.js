/*************************************** BarGraph **********************************************/
/* 	Date : 06/13/2013
	Developer : TianYu
*/
var Network = {
	margin : [10,10,10,10],// left, right, top bottom
	radius : 7,
	selectedRadius : 15,
	connectionWidth : 2,
	labelPadding : 20,
	
	network : undefined,
	networkContainer : undefined,
	

	
	
	/***** drawNetwork  *******************/
	/*	functionality
			draw network
		parameters:
			container : graph container
			fileName : Json file name
	*/
	draw : function (container,fileName){
		fileName = "data/"+fileName; 
		d3.json(fileName, function(error, network) {
			if (error != null) {
				return;
			}
			
			Network.network = network;
			Network.networkContainer = container;
			
			Network.drawNetwork();
		});
	},
	
	
	
	
	
	
	
	
	
	
	
	drawNetwork : function (selectedSkillId) {
		$(this.networkContainer).html("");

		
		if (selectedSkillId == undefined) {
			selectedSkillId = Math.floor(Math.random()*(this.network.skills.length));
		}
		var width = $(this.networkContainer).width(),
			height = $(this.networkContainer).height(),
			realWidth = width - (this.margin[0] + this.margin[1]); 
			realHeight = height - (this.margin[1] + this.margin[3]);
		
		for (var i = 0; i < this.network.skills.length; i++) {
			if (i == selectedSkillId) {
				this.network.skills[i].cx = realWidth/2;
				this.network.skills[i].cy = realHeight/2;
			}
			else {
				this.network.skills[i].cx = Math.random()*realWidth;
				this.network.skills[i].cy = Math.random()*realHeight;
			}
		}
		
		//draw network
		var svg = d3.select(Network.networkContainer).append("svg")
			.attr("width",width)
			.attr("height",height);
		
		var networkPanel = svg.append('g')
			.attr("class","network_panel")
			.attr('transform', 'translate(' + this.margin[0] + ','+this.margin[3]+')');
		
		//draw connections
		networkPanel.selectAll(".connections")
			.data(this.network.connections)
			.enter().append("line")
			.attr("class","connections")
			.attr("x1",function(d,i){ return Network.network.skills[d.source].cx;})
			.attr("y1",function(d,i){ return Network.network.skills[d.source].cy;})
			.attr("x2",function(d,i){ return Network.network.skills[d.target].cx;})
			.attr("y2",function(d,i){ return Network.network.skills[d.target].cy;})
			.style("stroke-width",2)
			.style("stroke",function(d,i){ return (d.degree == 1)? "blue" : "green";})
			.style("display",function(d,i) { return (d.source == selectedSkillId)? "block" : "none"; });
		
		//draw skills	
		networkPanel.selectAll(".skills")
			.data(this.network.skills)
   			.enter().append("circle")
     		.attr("class","skills")
			.attr("cx",function(d,i){ return d.cx; })
			.attr("cy",function(d,i){ return d.cy; })
			.attr("r",function(d,i) { return (i == selectedSkillId)? Network.selectedRadius : Network.radius;})
			.attr("fill", function(d,i) { return (i == selectedSkillId)? "red" : "#EF7959" })
			.style("cursor","pointer")
			.on("click",function(d,i){ Network.drawNetwork(i) });
			
		//draw skill label
		networkPanel.selectAll(".skill_labels")
			.data(this.network.skills)
   			.enter().append("text")
     		.attr("class","skill_labels")
			.attr("x",function(d,i) { return d.cx + Network.labelPadding ;})
			.attr("y",function(d,i) { return d.cy; })
			.attr("dy",".35em")
			.attr("fill","white")
			.style("font-size","20px")
			.text(function(d,i){ return (i == selectedSkillId)? d.name : ""; });
			
			
	}
}




















