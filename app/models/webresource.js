module.exports = function (compound, Webresource) {
	Webresource.belongsTo(compound.models.Project, {as: 'webresource', foreignKey: 'projectId'});
	
	Webresource.beforeCreate = function (done) {
	
		this.type = getPartType(this.path);
	    this.created = new Date;
	    console.log('beforeCreate happening');
	    done();
	};
	
	Webresource.beforeSave = function (done) {
	
		this.type = getPartType(this.path);
		console.log('beforeSave happening');
	    done();
	};
	
	function getPartType(path)
	{
		try
		{
			console.log(path);
			if (path.indexOf('.') > -1)
			{
				var extension = this.path.split('.').pop().toLowerCase().replace(' ','');
				
				if (extension == "txt" || extension == "log")
					return "Text";
				
				if (extension == "xml" || extension == "xsd")
					return "XML";
				
				if (extension == "js")
					return "Javascript";
				
				if (extension == "gif" || extension == "ico"|| extension == "png"|| extension == "jpg" || extension == "jpeg" || extension == "tiff")
					return "Image";
			}
		}
		catch(e)
		{
			
		}
		return "Misc";
	}
};
