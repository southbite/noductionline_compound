(function() {
	
	window.jsPlumbConnector = {
		stepStartpoint : {
				endpoint:"Dot",
				paintStyle:{ fillStyle:"#CCC",radius:5 },
				isSource:true, 
				maxConnections:-1, 
				connector:[ "Flowchart", { stub:[40, 60], gap:5 } ],
				connectorStyle:{lineWidth:3,
					strokeStyle:"#CCC",
					joinstyle:"round",
					outlineColor:"gray",
					outlineWidth:1},
				hoverPaintStyle:{
					lineWidth:5,
					strokeStyle:"#CCC"},
				connectorHoverStyle:{
					lineWidth:5,
					strokeStyle:"#CCC"},
                dragOptions:{},
                overlays:[]
		},
		stepEndpoint : {
				endpoint:"Dot",
				paintStyle:{ fillStyle:"#CCC",radius:5 },
				isTarget:true, 
				maxConnections:-1, 
				connector:[ "Flowchart", { stub:[40, 60], gap:10 } ],
				connectorStyle:{lineWidth:3,
					strokeStyle:"#CCC",
					joinstyle:"round",
					outlineColor:"gray",
					outlineWidth:1},
				hoverPaintStyle:{
					lineWidth:5,
					strokeStyle:"#CCC"},
				connectorHoverStyle:{
					lineWidth:5,
					strokeStyle:"#CCC"},
                dragOptions:{},
                overlays:[]
		},
		allSourceEndpoints : [],
		allTargetEndpoints : [],
		addEndpoints : function(toId, sourceAnchors, targetAnchors) {
			for (var i = 0; i < sourceAnchors.length; i++) {
				var sourceUUID = toId + sourceAnchors[i];
				this.allSourceEndpoints.push(jsPlumb.addEndpoint(toId, this.stepStartpoint, { anchor:sourceAnchors[i], uuid:sourceUUID }));
			}
			for (var j = 0; j < targetAnchors.length; j++) {
				var targetUUID = toId + targetAnchors[j];
				this.allTargetEndpoints.push(jsPlumb.addEndpoint(toId, this.stepEndpoint, { anchor:targetAnchors[j], uuid:targetUUID }));
			}
		},
		init : function() {
			jsPlumb.importDefaults({
				// default drag options
				DragOptions : { cursor: 'pointer', zIndex:2000 },
				// default to blue at one end and green at the other
				EndpointStyles : [{ fillStyle:'#225588' }, { fillStyle:'#558822' }],
				// blue endpoints 7 px; green endpoints 11.
				Endpoints : [ [ "Dot", {radius:3} ], [ "Dot", { radius:3 } ]],
				// the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
				// case it returns the 'labelText' member that we set on each connection in the 'init' method below.
				ConnectionOverlays : [
					//[ "Arrow", { location:0.9 } ],
					[ "Label", { 
						location:0.1,
						id:"label",
						cssClass:"aLabel"
					}]
				]
			});			

			init = function(connection) {
				//connection.getOverlay("label").setLabel(connection.sourceId.substring(6) + "-" + connection.targetId.substring(6));
			};	
			
			// listen for new connections; initialise them the same way we initialise the connections at startup.
			jsPlumb.bind("jsPlumbConnection", function(connInfo, originalEvent) { 
				console.log("connInfo");
				console.log(connInfo);
				init(connInfo.connection);
				
				this.addStep(connInfo.sourceId, connInfo.targetId);
				
			}.bind(this));
			//
			// listen for clicks on connections, and offer to delete connections on click.
			//
			jsPlumb.bind("click", function(conn, originalEvent) {
				if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
					jsPlumb.detach(conn); 
			});	
			
			jsPlumb.bind("connectionDrag", function(connection) {
				//console.log("connection " + connection.id + " is being dragged");
			});		
			
			jsPlumb.bind("connectionDrop", function(connection) {
				console.log(connection);
				console.log("connection " + connection.id + " is being dropped");
			});		
			
			jsPlumb.bind("connectionDragStop", function(connection) {
				console.log("connection " + connection.id + " was dragged");
			});
		},
		addShape : function(shapeId)
		{
			this.addEndpoints(shapeId, ["RightMiddle"], ["LeftMiddle"]);	
			jsPlumb.draggable(jsPlumb.getSelector(".process-step"));
		},
		connectShapes : function(parentId, childId)
		{
			jsPlumb.connect({uuids:[parentId + "RightMiddle",childId + "LeftMiddle"]});
			var parentIds = $('#' + childId).data('parentIds');
			if (parentIds == null)
				parentIds = [];
			
			parentIds.push(parentId);
			$('#' + childId).data('parentIds', parentIds);
		},
		addStep : function (parentId, childId)
		{
			var sourceElement = $('#' + parentId);
			var sourceStepData  = sourceElement.data('steps');
			
			if (sourceStepData == null)
				sourceStepData = [];
			
			sourceStepData.push(childId.replace("blueprint_step_",""));
			sourceElement.data('steps', sourceStepData);
		}
		,
		removeStep : function (parentId, childId)
		{
			var sourceElement = $('#' + parentId);
			var sourceStepData  = sourceElement.data('steps');
			
			if (sourceStepData == null)
				sourceStepData = [];
			
		}
	};
})();

function BlueprintDesigner()
{
	
}

BlueprintDesigner.prototype = {
		containerControl : null,
		initialized : false,
		currentX : -1,
		currentY : -1,
		boundsX : -1,
		stepCounter : 0,
		initialize: function(containerID, onInitialized)
		{
			try
			{
				this.containerControl = $('#' + containerID);
				boundsX = this.containerControl.css('width');
				
				/*
				 *  This file contains the JS that handles the first init of each jQuery demonstration, and also switching
				 *  between render modes.
				 */
				jsPlumb.bind("ready", function() {
					// chrome fix.
					document.onselectstart = function () { return false; };				

				    // render mode
					var resetRenderMode = function(desiredMode) {
						var newMode = jsPlumb.setRenderMode(desiredMode);
						$(".rmode").removeClass("selected");
						$(".rmode[mode='" + newMode + "']").addClass("selected");		

						$(".rmode[mode='canvas']").attr("disabled", !jsPlumb.isCanvasAvailable());
						$(".rmode[mode='svg']").attr("disabled", !jsPlumb.isSVGAvailable());
						$(".rmode[mode='vml']").attr("disabled", !jsPlumb.isVMLAvailable());

						//var disableList = (newMode === jsPlumb.VML) ? ",.rmode[mode='svg']" : ".rmode[mode='vml']"; 
					//	$(disableList).attr("disabled", true);				
						jsPlumbConnector.init();
						initialized = true;
						onInitialized(null);
					}.bind(this);
					
					resetRenderMode(jsPlumb.SVG);
				}.bind(this));
			}
			catch(e)
			{
				onInitialized(e);
			}
		},
		drawBlueprint: function (processObj, onComplete)
		{
			// to test this we will create a dummy process object and have it draw steps
			
			console.log(processObj);
			
			//add the steps
			for (var stepIndex in processObj.steps)
			{
				var stepInstance = processObj.steps[stepIndex];
				this.addStep(stepInstance);
			}
			
			var getStepById = function(id)
			{
				for (var stepIndex in processObj.steps)
				{
					var stepInstance = processObj.steps[stepIndex];
					if (stepInstance.id == id)
						return stepInstance;
				}
				
				return null;
			}.bind(this);
			
			//wire the relationships
			for (var stepIndex in processObj.steps)
			{
				var stepInstance = processObj.steps[stepIndex];
				
				for (var childStepIdIndex in stepInstance.steps)
				{
					var childStepId = stepInstance.steps[childStepIdIndex];
					var childStep = getStepById(childStepId);
					
					if (childStep != null)
						this.joinSteps(stepInstance, childStep);
				}
			}
			
			onComplete();
			/*
			
			var stepDrawn = function(processStep)
			{
				if (processStep.steps.length > 0)
					drawSteps(processStep, stepDrawn);
			}.bind(this);
			
			var drawSteps = function(parentStep, stepDrawnFunc)
			{
				for (var stepIndex in parentStep.steps)
				{
					var stepInstance = parentStep.steps[stepIndex];
					{
						this.addStep(parentStep, stepInstance);
						stepDrawnFunc(stepInstance);
					}
				}
			}.bind(this);
			
			drawSteps(processObj, stepDrawn);
			
			*/
			
		},
		getProcessObject: function (getStepData)
		{
			var processObj = {steps:{}};
			
			$('div[id^="blueprint_step_"]').each(function()
			{
				var stepId = $(this).attr("id").replace("blueprint_step_","");
				var stepName = $('#' + $(this).attr("id").replace("blueprint_step_","blueprint_step_name")).html();
				var steps = $(this).data('steps');
				
				if (steps == null)
					steps = [];
				
				var stepx = $(this).css("left").replace("px","");
				var stepy = $(this).css("top").replace("px","");
				
				/*
				console.log('in body');
				
				console.log(getStepData(stepId,'stepData'));
				console.log(getStepData(stepId,'stepRobot'));
				
				*/
				
				var stepRobot = $(this).attr('robot');
				var stepData = $(this).attr('data');
				
				console.log('getting step info for ' + stepId);
				
				console.log(stepRobot);
				console.log(stepData);
				
				if (stepRobot == null)
					stepRobot = '{}';
				
				if (stepData == null)
					stepData = '{}';
				
				processObj.steps[stepId] = {id:stepId, name:stepName, ui: {x:stepx, y:stepy}, robot:stepRobot, data:stepData, steps: steps};
				
			});
			
			console.log(processObj);
			
			return processObj;
			/*
			var allStepsArray = {};
			var returnArray = {};
			
			$('div[id^="blueprint_step_"]').each(function()
			{
				console.log($(this));
				
				var stepId = $(this).attr("id").replace("blueprint_step_","");
				var stepName = $('#' + $(this).attr("id").replace("blueprint_step_","blueprint_step_name")).html();
				var stepParentIds = $(this).data('parentIds');
				
				console.log(stepParentIds);
				
				var stepx = $(this).css("left").replace("px","");
				var stepy = $(this).css("top").replace("px","");
				var stepRobot = $(this).data("robot_data");
				
				allStepsArray[stepId] = {id:stepId, parentIds:stepParentIds, name:stepName, x:stepx, y:stepy, robot:stepRobot, steps: [], childCount: 0};
			});
			
			for (var stepId in allStepsArray)
			{
				var stepInstance = allStepsArray[stepId];
				if (stepInstance.parentIds != null && stepInstance.parentIds.length > 0)
				{
					for (var parentIdIndex in stepInstance.parentIds)
					{
						allStepsArray[stepInstance.parentIds[parentIdIndex].replace("blueprint_step_","")].steps.push(stepInstance);
					}
					
				}
				else
					returnArray[stepId] = stepInstance;
					
			}
			
			console.log(allStepsArray);
			
			return allStepsArray;
			*/
		},
		addStep: function(stepObject)
		{
			console.log('adding step');
			console.log(stepObject);
			
			var stepHtml = this.getStepHtml(stepObject);
			this.containerControl.append(stepHtml);
			
			$('#blueprint_step_' +  stepObject.id).data('stepData', stepObject.data);
			$('#blueprint_step_' +  stepObject.id).data('stepRobot', stepObject.robot);
			
			jsPlumbConnector.addShape('blueprint_step_' + stepObject.id);
			
			this.stepCounter ++;
			
			/*
			if (parentStep != null && !parentStep.isProcess)
			{
				jsPlumbConnector.connectShapes('blueprint_step_' + parentStep.id, 'blueprint_step_' + stepObject.id);
			}
			*/
			//$('#blueprint_step_' + stepObject.id).draggable();
			//if the parent isnt null we join to the child via js plumb
		},
		joinSteps: function (parentStep, childStep)
		{
			jsPlumbConnector.connectShapes('blueprint_step_' + parentStep.id, 'blueprint_step_' + childStep.id);
		},
		editStep: function (robotId, stepId)
		{
			if (this.onEditStep != null)
				this.onEditStep(robotId, stepId);
		},
		onEditStep: null,
		getStepHtml: function(processStep)
		{
			var stepImage = "/images/defaultbot32.png";
			var robotId= "0";
			
			var id = "blueprint_step_" + processStep.id;
			var nameId = "blueprint_step_name" + processStep.id;
			
			var stepRobot = eval('(' + decodeURIComponent(processStep.robot) + ')');
			
			console.log('stepRobot');
			console.log(stepRobot);
			
			if (stepRobot.id != null && stepRobot.id != 0)
			{
				stepImage = stepRobot.thumbnailPath;
				robotId = stepRobot.id;
			}
			
			return "<div class=\"process-step\" robot=\"" + processStep.robot + "\" data=\"" + processStep.data + "\" style=\"background-image:url('" + stepImage + "');background-repeat:no-repeat;position:absolute;top:" + processStep.ui.y + "px;left:" + processStep.ui.x + "px\" id=\"" + id + "\" ><span onclick=\"blueprintDesigner.editStep('" + robotId + "'," + processStep.id + ");\" id=\"" + nameId + "\" class=\"process-step-text\">" + processStep.name + "</span></div>";
		}
};