load('application');
layout('clean');

before(loadAccount);
before(loadProject);
before(loadBlueprint, {only: ['show', 'edit', 'update', 'destroy']});

var getJSONResponse = use('getJSONResponse');

action('new', function () {
    this.title = 'New blueprint';
    this.blueprint = new Blueprint;
    render();
});

action('createNewInternal', function () {
	console.log('req.body');
	console.log(req.body);
	 //getJSONResponse(status, message, data)
	req.body.Blueprint['projectId'] = this.project.id;
	
	 this.project.blueprints.create(req.body.Blueprint, function (err, blueprint) {
        if (err) {
           send(getJSONResponse('FAILED', err.toString(), null));
        } else {
           send(getJSONResponse('OK', 'Blueprint created successfully', blueprint));
        }
    });
});

action(function create() {
    this.project.blueprints.create(req.body.Blueprint, function (err, blueprint) {
        if (err) {
            flash('error', 'Blueprint can not be created');
            render('new', {
                blueprint: blueprint,
                title: 'New blueprint'
            });
        } else {
            flash('info', 'Blueprint created');
            redirect(path_to.account_project_blueprints(params.account_id, params.project_id));
        }
    });
});

action(function index() {
    this.title = 'Blueprints for project ' + this.project.name;
    console.log(this.project.name);
    this.project.blueprints(function (err, blueprints) {
        render({
            blueprints: blueprints
        });
    });
});

action(function jsonlist() {
    this.project.blueprints(function (err, blueprints) {
    	if (err != null)
    		send(getJSONResponse('FAILED', err.toString(), null));
    	else
    		send(getJSONResponse('OK', 'Blueprints fetched successfully', blueprints));
    });
});

action(function show() {
	console.log(this.project);
    this.title = 'Blueprint show';
    render();
});

action(function edit() {
    this.title = 'Blueprint designer';
    render('designer');
});

action(function update() {
	
	console.log('body.Blueprint');
	console.log(body.Blueprint);
	
	console.log('this.blueprint');
	console.log(this.blueprint);
	

	archive(this.blueprint, function(){
		this.blueprint.updateAttributes(body.Blueprint, function (err) {
	        if (!err) {
	        	this.title = 'Blueprint edit';
	            flash('info', 'Blueprint updated');
	            render('designer');
	           // redirect(path_to.account_project_blueprint(params.account_id, params.project_id, this.blueprint));
	        } else {
	            flash('error', 'Blueprint can not be updated');
	            this.title = 'Edit blueprint details';
	            render('edit');
	        }
	    }.bind(this));		
	}.bind(this));

	
	/*
	this.blueprint.updateAttributes(body.Blueprint, function (err) {
        if (!err) {
        	this.title = 'Blueprint edit';
            flash('info', 'Blueprint updated');
            render('designer');
           // redirect(path_to.account_project_blueprint(params.account_id, params.project_id, this.blueprint));
        } else {
            flash('error', 'Blueprint can not be updated');
            this.title = 'Edit blueprint details';
            render('edit');
        }
    }.bind(this));		
	 */
});


var archive = function(blueprint, done)
{
	BlueprintArchive.create(blueprint, function(err){
		if (!err)
			done();
		else
			console.log(err);
	});
	
	/*
	this.blueprint.updateAttributes(body.Blueprint, function (err) {
        if (!err) {
        	this.title = 'Blueprint edit';
            flash('info', 'Blueprint updated');
            render('designer');
           // redirect(path_to.account_project_blueprint(params.account_id, params.project_id, this.blueprint));
        } else {
            flash('error', 'Blueprint can not be updated');
            this.title = 'Edit blueprint details';
            render('edit');
        }
    }.bind(this));	
    */	
}


action(function destroy() {
    this.blueprint.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy blueprint');
        } else {
            flash('info', 'Blueprint successfully removed');
        }
        send("'" + path_to.account_project_blueprints(params.account_id, params.project_id) + "'");
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

function loadBlueprint() {
    Blueprint.find(params.id, function (err, blueprint) {
        if (err || !blueprint) {
            redirect(path_to.blueprints());
        } else {
            this.blueprint = blueprint;
            next();
        }
    }.bind(this));
}
