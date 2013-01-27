module.exports = function (compound, Robot) {
Robot.belongsTo(compound.models.Project, {as: 'robot', foreignKey: 'projectId'});
Robot.hasMany(compound.models.Robotcomponent, {as: 'components', foreignKey: 'componentId'});

Robot.beforeCreate = function (done) {
    this.created = new Date;
    this.systemVersion = '0';
    
    done();
};

Robot.beforeUpdate = function (done) {
    
	/*
    if (this.systemVersion == null)
    	this.systemVersion = '0';
    else
    	this.systemVersion = (parseInt(this.systemVersion) + 1).toString();
    */
	
    done();
};
};

