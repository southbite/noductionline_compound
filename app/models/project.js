module.exports = function (compound, Project) {
Project.hasMany(compound.models.Blueprint, {as: 'blueprints', foreignKey: 'blueprintId'});
Project.hasMany(compound.models.Robot, {as: 'robots', foreignKey: 'robotId'});
Project.hasMany(compound.models.Webresource, {as: 'webresources', foreignKey: 'webresourceId'});
Project.belongsTo(compound.models.Account, {as: 'account', foreignKey: 'accountId'});
Project.beforeCreate = function (done) {
    this.created = new Date;
    done();
};
};


