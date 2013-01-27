load('application');

before(loadAccount);
before(loadProject);
before(loadWebresource, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New part';
    this.webresource = new Webresource;
    render();
});

action(function create() {
	var imageUploaded = function(imageUrl)
	{
		if (imageUrl != null)
			req.body.Webresource["path"] = imageUrl;
		else
			console.log("no image uploaded");
		
	  this.project.webresources.create(req.body.Webresource, function (err, webresource) {
        if (err) {
            flash('error', 'Part can not be created');
            render('new', {
                webresource: webresource,
                title: 'New part'
            });
        } else {
            flash('info', 'Part created');
            redirect(path_to.account_project_webresources(params.account_id, params.project_id));
        }
	  }.bind(this));
	}.bind(this);
	
	uploadFile(body.Webresource.key, imageUploaded);
});

action(function index() {
    this.title = 'Parts for project ' + this.project.name;
    this.project.webresources(function (err, webresources) {
        render({
            webresources: webresources
        });
    });
});

action(function show() {
    this.title = 'Part show';
    render();
});

action(function edit() {
    this.title = 'Part edit';
    render();
});

action(function update() {
	var imageUploaded = function(imageUrl)
	{
		if (imageUrl != null)
			body.Webresource["path"] = imageUrl;
		else
			console.log("no image uploaded");
	
	    this.webresource.updateAttributes(body.Webresource, function (err) {
	        if (!err) {
	            flash('info', 'Part updated');
	            redirect(path_to.account_project_webresource(params.account_id, params.project_id, this.webresource));
	        } else {
	            flash('error', 'Part can not be updated');
	            this.title = 'Edit part details';
	            render('edit');
	        }
	    }.bind(this));
    
	}.bind(this);
	
	uploadFile(body.Webresource.key, imageUploaded);
});

function uploadFile(partName, fileUploaded)
{
	console.log("req.files.Webresource.resourceFile");
	console.log(req.files.Webresource.resourceFile);
	
	try
	{
		if(req.files && req.files.Webresource.resourceFile != null && req.files.Webresource.resourceFile.size > 0){	
				this.file = new File();
				var tmpFile = req.files.Webresource.resourceFile;
				
				var ext = tmpFile.name.substring(tmpFile.name.lastIndexOf('.')+1, tmpFile.name.length);
				
				this.filename = ('partfile_' + partName + '.' + ext.toLowerCase());
				this.file.upload(this.filename, tmpFile.path, function (err) {
					if (err) 
					{
						console.log(err);
					}
					else
					{
						fileUploaded(this.filename, null);
					}
				}.bind(this));	
		}
		else
			fileUploaded(null, null);
	}
	catch(e)
	{
		fileUploaded(null, e);
	}
}

action(function destroy() {
    this.webresource.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy part');
        } else {
            flash('info', 'Part successfully removed');
        }
        send("'" + path_to.account_project_webresources(params.account_id, params.project_id) + "'");
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

function loadWebresource() {
    Webresource.find(params.id, function (err, webresource) {
        if (err || !webresource) {
            redirect(path_to.webresources());
        } else {
            this.webresource = webresource;
            next();
        }
    }.bind(this));
}
