module.exports = function (compound, Blueprint) {
Blueprint.belongsTo(compound.models.Project, {as: 'blueprint', foreignKey: 'projectId'});
//Blueprint.hasMany(BlueprintArchive, {as: 'blueprintarchives', foreignKey: 'blueprintId'});

Blueprint.beforeCreate = function (done) {
	
    this.created = new Date;
    this.systemVersion = '0';
   
    done();
};

Blueprint.beforeUpdate = function (done) {
	
	/*
	    if (this.systemVersion == null || this.systemVersion == '')
	    	this.systemVersion = '0';
	    else
	    {
	    	console.log('sys version not null');
	    	this.systemVersion = (parseInt(this.systemVersion) + 1).toString();
	    }
	    	
	    console.log('sys version ' + this.systemVersion);
	    console.log(this);
	 */
    done();
};
};

