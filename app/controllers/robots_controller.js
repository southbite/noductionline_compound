load('application');
layout('clean');

before(loadAccount);
before(loadProject, {only: ['show', 'edit', 'update','index', 'destroy', 'configure', 'jsonlist', 'pick', 'createNewInternal']});
before(loadRobot, {only: ['show', 'edit', 'update', 'destroy', 'configure','jsonlistcomponents','addcomponent','deletecomponent','configureComponent','updatecomponent','getcomponent']});

var getJSONResponse = use('getJSONResponse');
var deserializeJSON = use('deserializeJSON');
var serializeJSON = use('serializeJSON');

action('new', function () {
    this.title = 'New robot';
    this.robot = new Robot;
    
    render();
});

action('createNewInternal', function () {
	////console.log('req.body');
	////console.log(req.body);
	 //getJSONResponse(status, message, data)
	req.body.Robot['configuratorHtml'] = '%3Cscript%3E%0Afunction%20getConfiguration()%0A%7B%0A%20%20%2F%2F%20the%20configuration%20object%20is%20stored%20%0A%20%20var%20configObject%20%3D%20%7B%7D%3B%0A%20%20%0A%20%20%2F*%0A%20%20%20ie%3A%0A%20%20%20configObject%5B%27userName%27%5D%20%3D%20%24(%27%23txtUserName%27).val()%3B%0A%20%20%20configObject%5B%27password%27%5D%20%3D%20%24(%27%23txtPassword%27).val()%3B%0A%20%20*%2F%0A%20%20configObject%5B%27MemoryThreshold%27%5D%20%3D%20%24(%27%23txt_memory_threshold%27).val()%3B%0A%20%20%0A%20%20return%20configObject%3B%0A%7D%0A%0Afunction%20setConfiguration(configObject)%0A%7B%09%0A%20%20%2F%2F%20this%20method%20is%20called%20when%20the%20bot%20configuration%20is%20first%20loaded%20from%20the%20step%0A%20%20%09%24(%27body%27).data(%27configObject%27%2C%20configObject)%3B%0A%09%24(%27%23txt_memory_threshold%27).val(configObject%5B%27MemoryThreshold%27%5D)%3B%0A%7D%0A%3C%2Fscript%3E%0A%3Cdiv%20class%3D%27header_light%27%3EStandard%20Configuration%20Items%3C%2Fdiv%3E%0A%3Cdiv%20class%3D%27panel_light%27%3E%0A%3Ctable%20class%3D%27table_config_items%27%20cellpadding%3D%275%27%3E%0A%20%20%20%3Ctr%3E%0A%20%20%20%20%20%3Ctd%3EMemory%20Threshold%3C%2Ftd%3E%3Ctd%3E%3Cinput%20id%3D%27txt_memory_threshold%27%20type%3D%27text%27%20class%3D%27small_text%27%20value%3D%2720%27%20%2F%3E%3C%2Ftd%3E%3Ctd%20style%3D%27text-align%3Aleft%27%3EMB%3C%2Ftd%3E%0A%20%20%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A%3C%2Fdiv%3E';
	req.body.Robot['projectId'] = this.project.id;
	
	 this.project.robots.create(req.body.Robot, function (err, robot) {
        if (err) {
           send(getJSONResponse('FAILED', err.toString(), null));
        } else {
           send(getJSONResponse('OK', 'Robot created successfully', robot));
        }
    });
});

action(function create() {
	
	req.body.Robot['configuratorHtml'] = '%3Cscript%3E%0Afunction%20getConfiguration()%0A%7B%0A%20%20%2F%2F%20the%20configuration%20object%20is%20stored%20%0A%20%20var%20configObject%20%3D%20%7B%7D%3B%0A%20%20%0A%20%20%2F*%0A%20%20%20ie%3A%0A%20%20%20configObject%5B%27userName%27%5D%20%3D%20%24(%27%23txtUserName%27).val()%3B%0A%20%20%20configObject%5B%27password%27%5D%20%3D%20%24(%27%23txtPassword%27).val()%3B%0A%20%20*%2F%0A%20%20configObject%5B%27MemoryThreshold%27%5D%20%3D%20%24(%27%23txt_memory_threshold%27).val()%3B%0A%20%20%0A%20%20return%20configObject%3B%0A%7D%0A%0Afunction%20setConfiguration(configObject)%0A%7B%09%0A%20%20%2F%2F%20this%20method%20is%20called%20when%20the%20bot%20configuration%20is%20first%20loaded%20from%20the%20step%0A%20%20%09%24(%27body%27).data(%27configObject%27%2C%20configObject)%3B%0A%09%24(%27%23txt_memory_threshold%27).val(configObject%5B%27MemoryThreshold%27%5D)%3B%0A%7D%0A%3C%2Fscript%3E%0A%3Cdiv%20class%3D%27header_light%27%3EStandard%20Configuration%20Items%3C%2Fdiv%3E%0A%3Cdiv%20class%3D%27panel_light%27%3E%0A%3Ctable%20class%3D%27table_config_items%27%20cellpadding%3D%275%27%3E%0A%20%20%20%3Ctr%3E%0A%20%20%20%20%20%3Ctd%3EMemory%20Threshold%3C%2Ftd%3E%3Ctd%3E%3Cinput%20id%3D%27txt_memory_threshold%27%20type%3D%27text%27%20class%3D%27small_text%27%20value%3D%2720%27%20%2F%3E%3C%2Ftd%3E%3Ctd%20style%3D%27text-align%3Aleft%27%3EMB%3C%2Ftd%3E%0A%20%20%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A%3C%2Fdiv%3E';
	
    this.project.robots.create(req.body.Robot, function (err, robot) {
        if (err) {
            flash('error', 'Robot can not be created');
            render('new', {
                robot: robot,
                title: 'New robot'
            });
        } else {
            flash('info', 'Robot created');
            redirect(path_to.account_project_robots(params.account_id, params.project_id));
        }
    });
});

action(function index() {
    this.title = 'Robots for project ' + this.project.name;
    this.project.robots(function (err, robots) {
        render({
            robots: robots
        });
    });
});

action(function jsonlist() {
    this.project.robots(function (err, robots) {
    	if (err != null)
    		send(getJSONResponse('FAILED', err.toString(),null));
    	else
    	{
    		send(getJSONResponse('OK', robots.length.toString() + ' items fetched', filterByQuery(robots, req.query)));
    	}
    });
});

action(function jsonlistcomponents() {
	
	////console.log("this jsonlistcomponents");
	////console.log(this);
	
	var internalListMethod = listcomponentsInternal.bind(this);
	
	internalListMethod(function(e, returnComponents){
		if (!e)
		{
			//console.log('returning comps');
			//console.log(returnComponents);
			send(getJSONResponse('OK', 'Components fetched successfully', returnComponents));
		}
		else
		{
			//console.log('failed returning comps');
			send(getJSONResponse('FAILED', e.toString(), null));
		}
			
	});
	
});

function listcomponentsInternal(done)
{
	Robotcomponent.all({where: {robotId: this.robot.id}}, function(err, components)
	{
		if (!err)
		{
			var getComponentRobotsBound = getComponentRobots.bind(this);
			
			getComponentRobotsBound(components, function(getComponentRobotsBoundErr, componentRobots){
				
				if (getComponentRobotsBoundErr != null)
				{
					done(getComponentRobotsBoundErr);
				}
				else
				{
					done(null, componentRobots);
				}
				
			}.bind(this));
		}
		else
			done(err);
		}
	);
}

function getComponentRobots(robotComponents, done)
{
	var returnComponents = [];
	var i = 0;
	
	var getReturnComponent = function(i) {
	    if( i < robotComponents.length ) {
	    	Robot.find(robotComponents[i].componentRobotId, function (errGetComponent, component) {
	    		 if (errGetComponent)
	    			 done(errGetComponent, null);
        		  else
        		  {
        			  component['robot_component_id'] = robotComponents[i].id.toString();
        			  returnComponents.push(component);
        			  getReturnComponent(i+1); 
        		  } 
	    	});
	    }
	    else
	    {
	    	done(null, returnComponents);
	    }
	  }.bind(this);
	  
	  getReturnComponent(0);
}

action(function getcomponent() {
	
	console.log('getting component');
	console.log(req.query['component_id']);
	var componentId = req.query['component_id'];
	var getcomponentInternalBound = getcomponentInternal.bind(this);
	
	getcomponentInternalBound(componentId, function(getcomponentInternalBoundError, component){
		
		if (getcomponentInternalBoundError != null)
		{
			send(getJSONResponse("FAILED", getcomponentInternalBoundError.toString(), null));
		}
		else
		{
			send(getJSONResponse("OK", "Fetched component", component));
		}
		
	}.bind(this));
	
});

function getcomponentInternal(componentRobotId, done)
{
	Robotcomponent.all({where: {componentRobotId: componentRobotId}}, function(err, components)
	{
		if (!err)
		{
			if (components.length > 0)
			{
				var returnComponent = components[0];
				
				if (returnComponent['configuration'] == null)
					returnComponent['configuration'] = {};
				else
					returnComponent['configuration'] = deserializeJSON(returnComponent['configuration']);
				
				done(null, components[0]);
			}
			else
				done("Could not find component");
		}
		else
			done(err);
		
	});
}

action(function deletecomponent() {
	var componentId = req.query['component_id'];
	
	Robotcomponent.exists(componentId, function(err, doesexist){
		if (err)
		{
			send(getJSONResponse("FAILED", err.toString(), null));
		}
		else
		{
			if (doesexist)
			{
				Robotcomponent.destroy(componentId, function(err1){
					if (err1)
					{
						send(getJSONResponse("FAILED", err1.toString(), null));
					}
					else
					{
						send(getJSONResponse("OK", "Component deleted successfully", null));
					}
				});
			}
			else
				send(getJSONResponse("FAILED","Component does not exist", null));
		}
	});
});

action(function updatecomponent() {
	
	console.log('updating component');
	//console.log(req);
	
	var componentRobotId = req.body.Robotcomponent['component_robot_id'];
	var componentConfig = serializeJSON(req.body.Robotcomponent['component_configuration']);
	
	var getcomponentInternalBound = getcomponentInternal.bind(this);
	
	getcomponentInternalBound(componentRobotId, function(getcomponentInternalBoundError, componentInstance){
		
		if (getcomponentInternalBoundError != null)
		{
			console.log('getting internal component broke');
			send(getJSONResponse("FAILED", getcomponentInternalBoundError.toString(), null));
		}
		else
		{
			console.log('getting internal component worked');
			var componentId = componentInstance.id;
			
			console.log('upd params:');
			console.log(componentId);
			console.log(componentConfig);
			
			updateComponentInternal(componentId, componentConfig, function(e, updatedComponentInstance){
				
				if (e != null)
					send(getJSONResponse("FAILED",err.toString(), null));
				else
					send(getJSONResponse("OK", "Component updated sucessfully", updatedComponentInstance));
			});
		}
		
	}.bind(this));
	
	
	
});

function updateComponentInternal(componentId, componentConfig, done)
{
	try
	{
		Robotcomponent.find(componentId, function(e, component){
			
			if (e != null)
				throw e;
			
			if (component == null)
				throw "Component not found";	

			component.updateAttribute('configuration', componentConfig, function(errUpdt){
				
				if (errUpdt != null)
					throw errUpdt;
				else
					done(null, component);
				
			});
		});
	}
	catch(e)
	{
		done(e, null);
	}
}

action(function addcomponent() {
	var componentRobotId = req.body.Robotcomponent['component_robot_id'];
	var componentRobotVersion = req.body.Robotcomponent['component_robot_version'];
	
	console.log("adding comp");
	console.log(req.body.Robotcomponent['component_robot_id']);
	console.log(req.body.Robotcomponent['component_robot_version']);
	console.log(this.robot.id);
	
	var addcomponentInternalBound = addcomponentInternal.bind(this);
	
	addcomponentInternalBound(componentRobotId, componentRobotVersion, function(err, newComponent){
		if (err)
		{
			console.log("something broke: " + err);
			send(getJSONResponse("FAILED", err.toString(), null));
		}
		else
		{
			var getComponentRobotsBound = getComponentRobots.bind(this);
			
			getComponentRobotsBound([newComponent], function(getComponentRobotsBoundErr, componentRobots){
				
				if (getComponentRobotsBoundErr != null)
				{
					send(getJSONResponse("FAILED", getComponentRobotsBoundErr.toString(), null));
				}
				else
				{
					send(getJSONResponse("OK", "Component added successfully", componentRobots[0]));
				}
				
			}.bind(this));
		}
	});
});

function addcomponentInternal(componentRobotId, componentRobotVersion, done)
{
	Robotcomponent.create({"robotId":this.robot.id, "componentRobotId":componentRobotId, "componentRobotVersion":componentRobotVersion, "status":"enabled"}, function(err, newComponent){
		if (err)
			done(e, null);
		else
			done(null, newComponent);
	});
}

//addcomponent
//deletecomponent

function filterByQuery(items, query)
{
	if (query == null)
		return items;
	
	var returnItems = [];
	for (var itemIndex in items)
	{
		var itemInstance = items[itemIndex];
		var itemMatched = true;
		for (var property in query)
		{
			if (itemInstance[property] != query[property])
			{
				itemMatched = false;
				break;
			}
		}
		
		if (itemMatched)
			returnItems.push(itemInstance);
	}
	
	return returnItems;
}

action(function jsonlistall() {
	
	////console.log(req.query);
	
    Robot.all({where:req.query}, function (err, robots) {
    	if (err != null)
    		send(getJSONResponse("FAILED", err.toString(), null));
    	else
    		send(getJSONResponse("OK", robots.length.toString() + ' robots fetched', robots));
    });
});

action(function pick() {
	this.title = 'Pick a bot';
    render('picker');
});

action(function configure() {
	this.title = 'Configuration';
    render('configurator');
});

action(function configureComponent() {
	this.title = 'Component Configuration';
    render('componentConfigurator');
});

action(function show() {
    this.title = 'Robot show';
    render();
});

action(function edit() {
    this.title = 'Robot edit';
    render('designer');
});

action(function update() {
	
	var imageUploaded = function(imageUrl)
	{
		////console.log("image uploaded");
		////console.log(imageUrl);
		
		if (imageUrl != null)
			body.Robot["thumbnailPath"] = '/images/' + imageUrl;
		else
			////console.log("no image uploaded");
		
		////console.log("image saved uplaoding attributes");
		////console.log(this);
		////console.log("body.Robot");
		////console.log(body.Robot);
		
		var componentConfigurations = deserializeJSON(body.Robot["componentConfigurations"]);
		
		////console.log("what is this?");
		////console.log(this);
		
		var extractComponents = extractPostedComponents.bind(this);
		
		extractComponents(componentConfigurations, function(e, extractedComponents){
			
			if (!e)
			{
				var saveComponents = saveComponentsInternal.bind(this);
				
				saveComponents(extractedComponents, function(saveComponentsError){
					
					if (!saveComponentsError)
					{
						 this.robot.updateAttributes(body.Robot, function (err) {
						    	
						    	////console.log(JSON.stringify(body.Robot));
						    	////console.log(JSON.stringify(req.files));
						    	
						    	////console.log("Bot updated OK");
						    	////console.log(this);
						    	
						        if (!err) {
						            flash('success', 'Robot updated');
						            this.title = 'Robot designer';
						            render('designer');
						           // redirect(path_to.account_project_robot(params.account_id,params.project_id, this.robot));
						        } else {
						            flash('error', 'Robot can not be updated');
						            this.title = 'Robot designer';
						            render('designer');
						        }
							}.bind(this));
					}else {
			            flash('error', 'Failure updating components: ' + saveComponentsError);
			            this.title = 'Robot designer';
			            render('designer');
			        }
					
				}.bind(this));
			}
			else
			{
				 ////console.log(e);
				 flash('error', 'Robot can not be updated');
		         this.title = 'Robot designer';
		         render('designer');
			}
		}.bind(this));
	}.bind(this);
	
	uploadImage(body.Robot.name, imageUploaded);
});

function extractPostedComponents(componentConfigurations, done)
{
	try
	{
		console.log("incoming componentConfigurations");
		console.log(componentConfigurations);
		
		var internalList = listcomponentsInternal.bind(this);
		
		internalList(function(e, returnComponents){
			if (!e)
			{
				//we compare the component configs here
				var componentsToUpdate = [];

				for (var componentID in componentConfigurations)
				{
					var componentFound  = false;
					var postedComponent = componentConfigurations[componentID];
					
					for (var componentIndex in returnComponents)
					{
						var robotComponent = returnComponents[componentIndex];
						
						if (robotComponent.id == componentID)
						{
							if (postedComponent['status'] == 'for-delete')
								componentsToUpdate.push({'robotId':this.robot.id,
									'status':'deleted',
									'id':componentID});
							else
								componentsToUpdate.push({'robotId':this.robot.id,
									'componentRobotVersion':postedComponent.version,
									'status':'active',
									'configuration':serializeJSON(postedComponent.configuration),
									'id':componentID});
							
							componentFound = true;
						}
					}
					
					if (componentFound == false)
						componentsToUpdate.push({'robotId':this.robot.id,
							'componentRobotId':componentID,
							'componentRobotVersion':postedComponent.version,
							'status':'active',
							'configuration':serializeJSON(postedComponent.configuration), 'id':'new'});
						
				}
				
				
				console.log('componentsToUpdate');
				console.log(componentsToUpdate);
				
				done(null, componentsToUpdate);
			}
			else
				throw e;
			
		}.bind(this));

	}
	catch(e)
	{
		done(e, null);
	}
}

function saveComponentsInternal(components, done)
{
	try
	{
		//console.log('saving comps');
		//console.log(components);
		
		done(null);
		
		/*
		var returnComponents = [];
		var i = 0;
		
		var saveComponent = function(i) {
		    if( i < components.length ) {
		    	
		    	if (components[i].id = 'new')
		    	{
		    		Robotcomponent.create(components[i], function(err, newComponent){
						if (err)
							throw err;
						else
							saveComponent(i+1); 
					}.bind(this));
		    	}
		    	else
		    	{
		    		Robotcomponent.find(components[i].id, function (errGetComponent, component) {
		    		 if (errGetComponent)
		    			 throw errGetComponent;
	        		  else
	        		  {
	        			  if (component != null)
	        				  component.updateAttributes(components[i], function(errUpdateComponent){
	        					  
	        					  if (errUpdateComponent)
	        						  throw errGetComponent;
	        					  else
	        						  saveComponent(i+1); 
	        					  
	        				  }.bind(this));
	        		  } 
		    		}.bind(this));
		    	}
		    }
		    else
		    {
		    	done(null);
		    }
		  }.bind(this);
		  
		  saveComponent(0);
		  */
	}
	catch(e)
	{
		done(e);
	}
}

function uploadImage(robotName, imageUploaded)
{
	////console.log("req.files.Robot.thumbnailFile");
	////console.log(req.files.Robot.thumbnailFile);
	
	if(req.files && req.files.Robot.thumbnailFile != null && req.files.Robot.thumbnailFile.size > 0){	
			this.file = new File();
			var tmpFile = req.files.Robot.thumbnailFile;
			
			var ext = tmpFile.name.substring(tmpFile.name.lastIndexOf('.')+1, tmpFile.name.length);
	
			////console.log(req.files);
			////console.log(req.files.Robot.thumbnailFile);
			
			this.filename = ('robotThumbnail_' + robotName + '.' + ext.toLowerCase());
			this.file.upload(this.filename, tmpFile.path, function (err) {
			if (err) 
			{
				////console.log(err);
			}
			else
			{
				imageUploaded(this.filename);
			}
		}.bind(this));	
	}
	else
		imageUploaded(null);
}

action(function destroy() {
    this.robot.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy robot');
        } else {
            flash('info', 'Robot successfully removed');
        }
        send("'" + path_to.account_project_robots(params.account_id, params.project_id) + "'");
    });
});

function loadAccount() {
    Account.find(params.account_id, function (err, account) {
        this.account = account;
        next();
    }.bind(this));
}

function loadProject() {
    Project.find(params.project_id, function (err, project) {
        this.project = project;
        next();
    }.bind(this));
}

function loadRobot() {
	
	////console.log('loading bot' + params.id);
	
    Robot.find(params.id, function (err, robot) {
        if (err || !robot) {
            redirect(path_to.account_project_robots(params.account_id, params.project_id));
        } else {
            this.robot = robot;
            next();
        }
    }.bind(this));
}
