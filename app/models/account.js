module.exports = function (compound, Account) {
	Account.hasMany(compound.models.Project, {as: 'projects', foreignKey: 'projectId'});
	Account.hasMany(compound.models.User, {as: 'users', foreignKey: 'userId'});

	Account.beforeCreate = function (done) {
	    this.created = new Date;
	    done();
	};
};