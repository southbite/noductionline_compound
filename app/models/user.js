module.exports = function (compound, User) {
User.belongsTo(compound.models.Account, {as: 'account', foreignKey: 'accountId'});
User.validatesUniquenessOf('uniqueKey', {message: 'The email address for this account is not unique'});

User.beforeCreate = function (done) {
	this.isValid(function (valid) {
	    if (!valid) {
	    	done(this.errors); // hash of errors {attr: [errmessage, errmessage, ...], attr: ...}    
	    }
	    else
	    	done();
	});
};
};




