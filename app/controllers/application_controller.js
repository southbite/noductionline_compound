layout('clean');
publish('getJSONResponse', getJSONResponse);
publish('safeEncodeMarkup', safeEncodeMarkup);
publish('serializeJSON', serializeJSON);
publish('deserializeJSON', deserializeJSON);

before('protect from forgery', function () {
    protectFromForgery('0ac45e052242a06182a8df972746dfaf966ead42');
});

function getJSONResponse(status, message, data) {
	return {"status":status, "message":message, "data":data};
}

function safeEncodeMarkup(markup)
{
	return encodeURIComponent(markup).replace(/'/g,"%27");
}

function serializeJSON(obj)
{
	return safeEncodeMarkup(JSON.stringify(obj));
}

function deserializeJSON(json)
{
	return JSON.parse(decodeURIComponent(json));
}

action(function test() {
	this.title = 'Test page';
    render('test');
});

action(function test2() {
	this.title = 'Test page 2';
    render('test2');
});


action(function pick() {
	this.title = 'Pick an item';
    render('picker');
});

