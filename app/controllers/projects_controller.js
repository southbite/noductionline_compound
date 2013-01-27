load('application');
layout('clean');

before(loadAccount);
before(loadProject, {only: ['show', 'edit', 'update', 'destroy']});

var getJSONResponse = use('getJSONResponse');

action('new', function () {
    this.title = 'New project';
    this.project = new Project;
    render();
});

action('createNew', function () {
	 this.title = 'New project';
	 this.project = new Project;
    render();
});

action('createNewInternal', function () {
	console.log('req.body');
	console.log(req.body);
	 
	 this.account.projects.create(req.body.Project, function (err, project) {
        if (err) {
           send(getJSONResponse("FAILED", err.toString(), null));
        } else {
           send(getJSONResponse("OK", "Project created successfully", project));
        }
    });
});

action(function create() {
	
	console.log('req.body.Project');
	console.log(req.body.Project);
	
    this.account.projects.create(req.body.Project, function (err, project) {
        if (err) {
            flash('error', 'Project can not be created');
            render('new', {
                project: project,
                title: 'New project'
            });
        } else {
            flash('info', 'Project created');
            redirect(path_to.account_projects(params.account_id));
        }
    });
});

action(function index() {
    this.title = 'Projects for account ' + this.account.name;
    this.account.projects(function (err, projects) {
        render({
        	projects: projects
        });
    });
});

action(function jsonlist() {
    this.account.projects(function (err, projects) {
    	if (err != null)
    		send(getJSONResponse("FAILED",err.toString(),null));
    	else
    		send(getJSONResponse("OK", "Fetched projects", projects));
    });
});

action(function show() {
    this.title = 'Project show';
    render();
});

action(function edit() {
    this.title = 'Project edit';
    render();
});

action(function update() {
    this.project.updateAttributes(body.Project, function (err) {
        if (!err) {
            flash('info', 'Project updated');
            redirect(path_to.account_project(params.account_id, this.project));
        } else {
            flash('error', 'Project can not be updated');
            this.title = 'Edit project details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.project.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy project');
        } else {
            flash('info', 'Project successfully removed');
        }
        send("'" + path_to.account_projects(params.account_id) + "'");
    });
});

function loadAccount() {
    Account.find(params.account_id, function (err, account) {
        this.account = account;
        next();
    }.bind(this));
}

function loadProject() {
    Project.find(params.id, function (err, project) {
        if (err || !project) {
            redirect(path_to.projects());
        } else {
            this.project = project;
            next();
        }
    }.bind(this));
}
