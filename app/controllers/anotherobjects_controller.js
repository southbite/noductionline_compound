load('application');

before(loadAnotherobject, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New anotherobject';
    this.anotherobject = new Anotherobject;
    render();
});

action(function create() {
    Anotherobject.create(req.body.Anotherobject, function (err, anotherobject) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: anotherobject && anotherobject.errors || err});
                } else {
                    send({code: 200, data: anotherobject.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Anotherobject can not be created');
                    render('new', {
                        anotherobject: anotherobject,
                        title: 'New anotherobject'
                    });
                } else {
                    flash('info', 'Anotherobject created');
                    redirect(path_to.anotherobjects);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Anotherobjects index';
    Anotherobject.all(function (err, anotherobjects) {
        switch (params.format) {
            case "json":
                send({code: 200, data: anotherobjects});
                break;
            default:
                render({
                    anotherobjects: anotherobjects
                });
        }
    });
});

action(function show() {
    this.title = 'Anotherobject show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.anotherobject});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Anotherobject edit';
    switch(params.format) {
        case "json":
            send(this.anotherobject);
            break;
        default:
            render();
    }
});

action(function update() {
    var anotherobject = this.anotherobject;
    this.title = 'Edit anotherobject details';
    this.anotherobject.updateAttributes(body.Anotherobject, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: anotherobject && anotherobject.errors || err});
                } else {
                    send({code: 200, data: anotherobject});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Anotherobject updated');
                    redirect(path_to.anotherobject(anotherobject));
                } else {
                    flash('error', 'Anotherobject can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.anotherobject.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy anotherobject');
                } else {
                    flash('info', 'Anotherobject successfully removed');
                }
                send("'" + path_to.anotherobjects + "'");
            });
        });
    });
});

function loadAnotherobject() {
    Anotherobject.find(params.id, function (err, anotherobject) {
        if (err || !anotherobject) {
            if (!err && !anotherobject && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.anotherobjects);
        } else {
            this.anotherobject = anotherobject;
            next();
        }
    }.bind(this));
}
