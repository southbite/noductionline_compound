/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var Blueprint = describe('Blueprint', function () {
    property('name', String);
    property('created', Date);
    property('createdBy', String);
    property('version', String);
    property('description', String);
    property('systemVersion', String);
    property('flowDiagram', String);
    property('projectId', String);
    property('parentId', String);
});
var BlueprintArchive = describe('BlueprintArchive', function () {
    property('name', String);
    property('created', Date);
    property('createdBy', String);
    property('version', String);
    property('description', String);
    property('systemVersion', String);
    property('systemVersionTag', String);
    property('flowDiagram', String);
    property('blueprintId', String);
});var Project = describe('Project', function () {
    property('name', String);
    property('created', Date);
    property('createdBy', String);
    property('description', String);
    property('uniqueKey', String);
    property('accountId', String);
});var User = describe('User', function () {
    property('emailaddress', String);
    property('password', String);
    property('firstname', String);
    property('lastname', String);
    property('uniqueKey', String);
    property('accountId', String);
});var Robot = describe('Robot', function () {
    property('name', String);
    property('version', String);
    property('systemVersion', String);
    property('configuratorHtml', String);
    property('javascript', String);
    property('helpHtml', String);
    property('created', Date);
    property('category', String);
    property('description', String);
    property('thumbnail', Buffer);
    property('thumbnailPath', String);
    property('uniqueKey', String);
    property('public', Boolean);
    property('type', String);
    property('projectId', String);
    property('parentId', String);
});var RobotArchive = describe('RobotArchive', function () {
    property('name', String);
    property('version', String);
    property('systemVersion', String);
    property('configuratorHtml', String);
    property('javascript', String);
    property('helpHtml', String);
    property('created', Date);
    property('category', String);
    property('description', String);
    property('thumbnail', Buffer);
    property('thumbnailPath', String);
    property('uniqueKey', String);
    property('public', Boolean);
    property('type', String);
    property('projectId', String);
    property('blueprintId', String);
});

var Robotcomponent = describe('Robotcomponent', function () {
	property('robotId', String);
	property('componentRobotId', String);
    property('componentRobotVersion', String);
    property('status', String);
    property('configuration', String);
});

var Account = describe('Account', function () {
    property('name', String);
    property('created', String);
    property('description', String);
    set('restPath', pathTo.accounts);
});

var Webresource = describe('Webresource', function () {
    property('key', String);
    property('created', String);
    property('description', String);
    property('category', String);
    property('path', String);
    property('type', String);
    property('uniqueKey', String);
});


