exports.routes = function (map) {
    map.resources('webresources');
    map.resources('users');
    map.get('accounts/:id/design', 'accounts#design');
    map.get('accounts/:account_id/projects/createNew','projects#createNew');
    map.post('accounts/:account_id/projects/createNewInternal','projects#createNewInternal');
    map.get('accounts/:account_id/projects/jsonlist','projects#jsonlist');
    map.get('accounts/:account_id/projects/:project_id/blueprints/jsonlist','blueprints#jsonlist');
    //map.get('accounts/:account_id/projects/:project_id/blueprints/:blueprint_id','blueprints#jsonlistarchive');
    map.get('accounts/:account_id/robots/new','robots#new');
    map.get('applications/test','application#test');
    map.get('applications/test2','application#test2');
    map.get('accounts/:account_id/blueprints/new','blueprints#new');
    map.post('accounts/:account_id/projects/:project_id/blueprints/createNewInternal','blueprints#createNewInternal');
    map.get('accounts/:account_id/projects/:project_id/robots/jsonlist','robots#jsonlist');
    map.get('accounts/:account_id/projects/:project_id/robots/pick','robots#pick');
    map.post('accounts/:account_id/projects/:project_id/robots/createNewInternal','robots#createNewInternal');
    map.get('accounts/:account_id/projects/:project_id/robots/:id/configure','robots#configure');
    map.get('accounts/:account_id/projects/:project_id/robots/:id/configureComponent','robots#configureComponent');
    map.get('accounts/:account_id/projects/:project_id/robots/:id/jsonlistcomponents','robots#jsonlistcomponents');
    map.post('accounts/:account_id/projects/:project_id/robots/:id/updatecomponent','robots#updatecomponent');
    map.post('accounts/:account_id/projects/:project_id/robots/:id/addcomponent','robots#addcomponent');
    map.get('accounts/:account_id/projects/:project_id/robots/:id/deletecomponent','robots#deletecomponent');
    map.get('accounts/:account_id/projects/:project_id/robots/:id/getcomponent','robots#getcomponent');
    map.get('accounts/:account_id/robots/jsonlistall','robots#jsonlistall');
    map.get('application/pick','application#pick');
    
    
	map.root('accounts#index');
	
	map.resources('accounts', function (account) {
			map.resources('projects', function (project) {
				/*
		        project.resources('blueprints', function (blueprint){
		        	blueprint.resources('blueprintarchives');
		        });
		        */
		        project.resources('blueprints');
		        project.resources('robots');
		        project.resources('webresources');
		    });
	        account.resources('users');
	});
    

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    //map.all(':controller/:action');
    //map.all(':controller/:action/:id');
};