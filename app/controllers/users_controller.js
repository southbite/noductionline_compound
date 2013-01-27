load('application');

before(loadAccount);
before(loadUser, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New user';
    this.user = new User;
    render();
});

action(function create() {
	
	console.log(req.body.User);
	
	req.body.User.uniqueKey = params.account_id + req.body.User.emailaddress;
	
    this.account.users.create(req.body.User, function (err, user) {
        if (err) {
            flash('error', 'User can not be created');
            render('new', {
                user: user,
                title: 'New user'
            });
        } else {
            flash('info', 'User created');
            redirect(path_to.account_users(params.account_id));
        }
    });
});

action(function index() {
    this.title = 'Users for account ' + this.account.name;
    this.account.users(function (err, users) {
        render({
        	users: users
        });
    });
});

action(function show() {
    this.title = 'User show';
    render();
});

action(function edit() {
    this.title = 'User edit';
    render();
});

action(function update() {
    this.user.updateAttributes(body.User, function (err) {
        if (!err) {
            flash('info', 'User updated');
            redirect(path_to.account_user(params.account_id, this.user));
        } else {
            flash('error', 'User can not be updated');
            this.title = 'Edit user details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.user.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy user');
        } else {
            flash('info', 'User successfully removed');
        }
        send("'" + path_to.account_users(params.account_id) + "'");
    });
});

function loadAccount() {
    Account.find(params.account_id, function (err, account) {
        this.account = account;
        next();
    }.bind(this));
}

function loadUser() {
    User.find(params.id, function (err, user) {
        if (err || !user) {
            redirect(path_to.users());
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}
