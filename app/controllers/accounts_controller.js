load('application');
layout('clean');

before(loadAccount, {only: ['show', 'edit', 'update', 'destroy', 'design']});

action('new', function () {
    this.title = 'New account';
    this.account = new Account;
    render();
});

action(function create() {
    Account.create(req.body.Account, function (err, account) {
        if (err) {
            flash('error', 'Account can not be created');
            render('new', {
                account: account,
                title: 'New account'
            });
        } else {
            flash('info', 'Account created');
            redirect(path_to.accounts());
        }
    });
});

action(function index() {
    this.title = 'Accounts index';
    Account.all(function (err, accounts) {
    	
    	console.log('accounts');
    	console.log(accounts);
    	
        render({
            accounts: accounts
        });
    });
});

action(function show() {
    this.title = 'Account show';
    render();
});

action(function edit() {
    this.title = 'Account edit';
    render();
});

action(function design() {
    this.title = 'Account ' + this.account.name;
    render('designer');
});

action(function update() {
    this.account.updateAttributes(body.Account, function (err) {
        if (!err) {
            flash('info', 'Account updated');
            redirect(path_to.account(this.account));
        } else {
            flash('error', 'Account can not be updated');
            this.title = 'Edit account details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.account.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy account');
        } else {
            flash('info', 'Account successfully removed');
        }
        send("'" + path_to.accounts() + "'");
    });
});

function loadAccount() {
    Account.find(params.id, function (err, account) {
        if (err || !account) {
            redirect(path_to.accounts());
        } else {
            this.account = account;
            next();
        }
    }.bind(this));
}
