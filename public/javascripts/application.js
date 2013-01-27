// place your application-wide javascripts here
function writeToLog(txt)
{
	//console.log(txt);
}

function showMessage(messageText, messageType, fadeDuration)
{
	//console.log("flashing message");
	//console.log(parent.showMessage);
	
	//console.log(parent.parent);
	
	if (this.IsMessageContainerPage != null)
	{
		//console.log("flashing message");
		var $messageDiv = $("#inner_message_div");

		hideMessage(0, function(){
			
			$(".message_container_text").html(messageText);
			
			var messageColor = "#D9E2E1";
			
			if (messageType == "warning")
				messageColor = "#F6F4DA";
			
			if (messageType == "error")
				messageColor = "#DF9496";
			
			if (messageType == "success")
				messageColor = "#bfffbf";
			
			$messageDiv.css('left', '400px');
			$messageDiv.css('background-color', messageColor);
			
			$messageDiv.show();
			
			$messageDiv.animate({
			      left: parseInt($messageDiv.css('left'), 10) == 0 ?
			        -$messageDiv.outerWidth() :
			        0
			    }, function(){
			    	//$(this).delay(delayMilliseconds)
			    	if (fadeDuration > 0)
			    		$messageDiv.delay(fadeDuration).fadeOut(1000);
			    	
			    }.bind(this));
			
		}.bind(this));
	}
	else
		parent.showMessage(messageText, messageType, fadeDuration);
}

function hideMessage(fadeDuration, done)
{
	var messageDiv = $("#inner_message_div");
	messageDiv.hide(fadeDuration, done);
}

function fetchAccountObject(url, success)
{
	var fetchSuccess = function(response)
	{
		console.log('fetched acc object');
		console.log(response);
		
		if (response.status == 'OK')
		{
			success(response.data);
		}
		else
			success(null, response);
	};
	
	getData(url, fetchSuccess);
}

function fetchAccountObjects(url, success, sortBy, sortDirection, sortType)
{
	if (sortDirection == null)
		sortDirection = "ASC";
	
	if (sortType == null)
		sortType = "";
	
	var fetchSuccess = function(response)
	{
		console.log('fetched acc objects');
		console.log(response);
		
		if (response.status == 'OK')
		{
			if (sortBy != null)
				response.data.sort(dynamicSort(sortBy, sortDirection + sortType));
			
			success(response.data);
		}
		else
			success(null, response);
	};
	
	getData(url, fetchSuccess);
}

function postAccountObject(url, type, data, success, failure)
{
	 var objectPosted = function(response)
	 {
		 if (response.status = "OK")
		 {
			 //console.log(response);
			 success(response);
		 }
		 else
		 {
			 if (failure != null)
				 failure(response);
			 else
				 flashMessage(response.message, true, false); 
		 }
	 }
	 
	 var postBody = {};
	 postBody[type] = data;
	 
	 postBody[$('meta[name=csrf-param]').attr('content')] = $('meta[name=csrf-token]').attr('content');
	 
	 //console.log('posting data');
	 //console.log(url);
	 //console.log(postBody);
	 
	 postData(url, postBody, objectPosted);
	 
}

function dynamicSort(property, direction) {
	
	//console.log('sorting: ' + property + ' ' + direction);
	
	if (direction == "ASC")
	{
		return function (a,b) {
			return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		}
	}
	else if (direction == "DESC")
	{
		return function (a,b) {
			return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
		}
	}
	else if (direction == "ASCNUM")
	{
		return function (a,b) {
			return (parseFloat(a[property]) < parseFloat(b[property])) ? -1 : (parseFloat(a[property]) > parseFloat(b[property])) ? 1 : 0;
		}
	}
	else if (direction == "DESCNUM")
	{
		return function (a,b) {
			return (parseFloat(a[property]) > parseFloat(b[property])) ? -1 : (parseFloat(a[property]) < parseFloat(b[property])) ? 1 : 0;
		}
	}
	else if (direction == "ASCDATE")
	{
		return function (a,b) {
			return (new Date(a[property]) < new Date(b[property])) ? -1 : (new Date(a[property]) > new Date(b[property])) ? 1 : 0;
		}
	}
	else if (direction == "DESCDATE")
	{
		return function (a,b) {
			return (new Date(a[property]) > new Date(b[property])) ? -1 : (new Date(a[property]) < new Date(b[property])) ? 1 : 0;
		}
	}
	else
	{
		return function (a,b) {
			return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		}
	}
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

function getData(pURL, onSuccess) {
	
	//console.log(new Date().toString() + ":Posting to URL: " + pURL);
	
	$.ajax({
		type: "GET",
		url: pURL,
		success: function (response) {
			////console.log(response);
			//var resp = $.parseJSON(response);
			onSuccess(response);
		}
	});
}

function  postData(pURL, pData, onSuccess) {
	
	//console.log(new Date().toString() + ":Posting to URL: " + pURL + "&" + pData);
	
	$.ajax({
		type: "POST",
		url: pURL,
		data: pData,
		success: function (response) {
			onSuccess(response);
			/*
			var resp = $.parseJSON(response);
			onSuccess(resp);
			*/
		}
	});
}

function closeModalChildWindow()
{
	$('#modalMask').remove();
	$('#modalDialog').remove();
}

function openModalChildWindow(header, content, width, height)
{
	var modalWindowHtml = "<div id=\"modalMask\"></div>";
	 modalWindowHtml += "<div id=\"modalDialog\" class=\"modalWindow\">";
	 modalWindowHtml += "<table class=\"modalContainerTable\">";
	 modalWindowHtml += "<tr class=\"toolBar modalHeader\">";
	 modalWindowHtml += "<td class=\"modalHeaderCell\">";
	 modalWindowHtml += "<table style=\"width:100%\"><tr><td><table><tr id=\"modalToolbarItemContainerRow\"></tr></table></td><td id=\"modalHeaderSpan\" style=\"font-weight:bold;font-size:12;color:gray;font-style:italic\" text-align=\"right\"></td><td style=\"width:20px\"><a href=\"#\" class=\"close modalCloseLink\"><img src=\"/Images/minus16.png\"></img></a></td></tr></table>";
	 modalWindowHtml += "</td>";
	 modalWindowHtml += "</tr>";
	 modalWindowHtml += "<tr>";
	 modalWindowHtml += "<td id=\"modalContentTd\" vertical-align=\"top\" class=\"modalContentTdCls\">";
	 modalWindowHtml += "</td>";
	 modalWindowHtml += "</tr>";
	 modalWindowHtml += "</table>";
	 modalWindowHtml += "</div>";
	 
	 //console.log('opening modal window');
	 
	 $('body').append(modalWindowHtml);
	 
	 $(".modalWindow").css("width", width);
     $(".modalWindow").css("height", height);
     $("#modalMask").css("z-index", 1000);
     $(".modalWindow").css("z-index", 1001);
     
	 $("#modalContentTd").html(content);
	 $("#modalHeaderSpan").text(header);
	 $("#modalToolbarItemContainerRow").html("");
		
	//if close button is clicked
    $('.modalWindow .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        closeModalChildWindow();
    });
      
    var id = "modalDialog";
    readOnly(true, id);
    
    $('body').data('ModalWindowOpen', true);
}

var modalResize = function (modalPopupId)
{
	 //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
  
    //Set height and width to mask to fill up the whole screen
    $('#modalMask').css({'width':maskWidth,'height':maskHeight});

	if (modalPopupId != null)
	{
		/*
		 //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
        
        //Set the popup window to center
		$("#" + modalPopupId).css('top',  winH/2-$("#" + modalPopupId).height()/2);
	    $("#" + modalPopupId).css('left', winW/2-$("#" + modalPopupId).width()/2);
	   */
	   
		$("#" + modalPopupId).css('top',  "10px");
	    $("#" + modalPopupId).css('left', "10px");
	}
}

function modalWindowCurrentlyOpen()
{
	return $('body').data('ModalWindowOpen')==null?false:$('body').data('ModalWindowOpen');
}

function readOnly(makeReadOnly, modalPopupId)
{
	if (!makeReadOnly)
	{
		$('#modalMask').hide();
	}
	else
	{
		 //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
     
        $(window).unbind('resize', modalResize(modalPopupId));
        $(window).bind('resize', modalResize(modalPopupId));
        
        //Set height and width to mask to fill up the whole screen
        $('#modalMask').css({'width':maskWidth,'height':maskHeight});
         
        //transition effect     
        $('#modalMask').fadeIn(0);    
        $('#modalMask').fadeTo("slow",0.8);  
        
        if (modalPopupId)
        {
        	/*
			 //Get the window height and width
	        var winH = $(window).height();
	        var winW = $(window).width();
	        
	        //Set the popup window to center
			$("#" + modalPopupId).css('top',  winH/2-$("#" + modalPopupId).height()/2);
		    $("#" + modalPopupId).css('left', winW/2-$("#" + modalPopupId).width()/2);
		   */
		   
		   //naah - we want it on the top left
			$("#" + modalPopupId).css('top',  "10px");
		    $("#" + modalPopupId).css('left', "10px");
        	
	        //transition effect
	        $("#" + modalPopupId).fadeIn(500); 
        }
       
	}
}

function getQuerystring(key, defaultVal, URL) {
	if (defaultVal == null) {
		defaultVal = "";
	}
	
	if (URL == null)
		URL = window.location.href;
	
	key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var qs = regex.exec(URL);
	
	if (qs == null) {
		return defaultVal;
	}
	else {
		//////console.log("decoding " + qs[1]);
		//////console.log("decoded " + decodeURIComponent(qs[1]));
		return decodeURIComponent(qs[1]);
	}
}

function renderOptionTags(items, textFieldName, idFieldName, selectedId)
{
	var optionTags = '';
	
	if (idFieldName == null)
		idFieldName = textFieldName;
	
	for (var itemIndex in items)
	{
		var itemInstance = items[itemIndex];
		
		var selected = '';
		//console.log('comparing ' + itemInstance[idFieldName] + ' selectedId' + selectedId)
		if (itemInstance[idFieldName] == selectedId)
			selected = 'selected';
		
		 optionTags += '<option value=\"' + itemInstance[idFieldName] + '\" ' + selected + '>' + itemInstance[textFieldName]  + '</option>\r\n';
	}
	
	return optionTags;
}

function flashMessage(message, fade, modal)
{
	
}

function verticalList()
{
	
}

verticalList.prototype = {
		onItemClickedEvent:null,
		onItemDeletedEvent:null,
		selectedRowClassInternal:null,
		items:null,
		container:null,
		containerName:null,
		imagePropertyInternal:null,
		textPropertiesInternal:null,
		defaultImage:null,
		onItemNewInternal:null,
		onRenderItemTextEvent:null,
		selectItem: function(itemId)
		{
			clickedId = itemId;
			//console.log(clickedId);
			if (clickedId == null)//we need to find the first available item
			{
				//console.log($('tr[id^="vertical_list_item_' + this.containerName + '"]').first());
				var clickedId = $('tr[id^="vertical_list_item_' + this.containerName + '"]').first().attr("id").replace("vertical_list_item_" + this.containerName + "_","");
			}
			
			if (clickedId != null)
			{
				$('tr[id^="vertical_list_item_' + this.containerName + '"]').each(function(index, value){
					
					//console.log(index);
					//console.log(value);
					
					var listItemId = $(value).attr('id').replace("vertical_list_item_" + this.containerName + "_","");
					
					//console.log("check " + listItemId);
					//console.log("check " + clickedId);
					
					if (listItemId == clickedId)
					{
						//console.log('items are equal setting to ' + this.selectedRowClassInternal);
						//console.log(this);
						$(value).attr('class', this.selectedRowClassInternal);
					}	
					else
					{
						$(value).attr('class', "vertical-list-row");
					}
				}.bind(this));
				
				this.onItemClickedEvent(clickedId.replace("vertical_list_item_" + this.containerName + "_",""));
			}
		},
		internalAddItem:function(item)
		{
			var internalItems = this.getItemsArray();
			internalItems[item.id] = item;
			
			this.items = internalItems;
		},
		internalRemoveItem:function(itemId, done)
		{
			$("#vertical_list_item_" + this.containerName + "_" + itemId).remove();
			
			var internalItems = this.getItemsArray();
			internalItems[itemId] = null;
			
			this.items = internalItems;
			done();
		},
		getItemsArray:function()
		{
			if (this.items != null)
				return this.items;
			
			this.items = $('body').data('items');
			
			if (this.items == null)
				this.items = new Array();
			
			return this.items;
		},
		populateVerticalList:function(listItems, onItemClicked, defaultImage, selectedRowClass, containerTableID, imageProperty, textProperties, onItemDeleted, onNewItem, onRenderItemText, done)
		{
			try
			{
				//console.log('in populate method');
				$('body').data('items', listItems);
				
				this.imagePropertyInternal = imageProperty;
				this.textPropertiesInternal = textProperties;
				this.onItemClickedEvent = onItemClicked;
				this.onItemDeletedEvent = onItemDeleted;
				this.onItemNewInternal = onNewItem;
				this.onRenderItemTextEvent = onRenderItemText;
				
				this.container = $('#' + containerTableID);
				
				this.container.attr('cellpadding','5');
				this.container.attr('cellspacing','0');
				
				this.containerName = containerTableID;
				
				//console.log(this.container);
				
				if (this.selectedRowClass == null)
					this.selectedRowClass="vertical_list_row_selected";
				
				this.selectedRowClassInternal = this.selectedRowClass;
				
				for (var itemIndex in listItems)
				{
					this.addItem(listItems[itemIndex]);
				}
				
				this.selectItem();
				
				console.log("done populating list");
				done(null);
			}
			catch(e)
			{
				//console.log("failed populating list " + e);
				done(e);
			}
		},
		deleteItem:function(itemId)
		{
			if (confirm("Are you sure you wish to delete this item?")) 
			{ 
				var onItemRemoved = function(){
					
					this.onItemDeletedEvent(itemId);
					
					//console.log("selecting item");
					this.selectItem();
					
				}.bind(this);
				
				this.internalRemoveItem(itemId, onItemRemoved);
			}
		},
		addItem:function(item, itemImageURL, done)
		{
			//console.log('adding item to container');
			//console.log(this.container);
			
			if (this.checkItemAlreadyAdded(item))
			{
				this.container.append(this.renderItemHtml(item));
				this.internalAddItem(item);
				
				$("#vertical_list_item_add_" + this.containerName + "_" + item.id).click(function(clickedItem) {
					
					var clickedId = $(clickedItem.currentTarget).attr('id').replace("vertical_list_item_add_" + this.containerName + "_", "");
					
					if (this.onItemNewInternal)
						this.onItemNewInternal(clickedId);
					
				}.bind(this));
				
				$("#vertical_list_item_delete_" + this.containerName + "_" + item.id).click(function(clickedItem) {
					
					var clickedId = $(clickedItem.currentTarget).attr('id').replace("vertical_list_item_delete_" + this.containerName + "_", "");
					if (this.deleteItem)
						this.deleteItem(clickedId);
					
				}.bind(this));
				
				$("#vertical_list_item_edit_" + this.containerName + "_" + item.id).click(function(clickedItem) {

					var clickedId = $(clickedItem.currentTarget).attr('id').replace("vertical_list_item_edit_" + this.containerName + "_", "");
					this.selectItem(clickedId);
					
				}.bind(this));
				
				if (done)
					done();
			}
		},
	    checkItemAlreadyAdded:function(itemToAdd)
	    {
	    	var existingItems = this.getItemsArray();
		
	    	for (var itemId in existingItems)
	    	{
	    		if (itemId == itemToAdd.id)
	    			return false;
	    	}
		
	    	return true;
	    },
	    renderItemHtml:function(item)
		{
			var itemHtml = "<tr id=\"vertical_list_item_" + this.containerName + "_" + item.id + "\" class=\"vertical-list-row\">";
			
			var itemImage = item[this.imagePropertyInternal];
			
			if (itemImage == null)
				itemImage = this.defaultImageInternal;
			
			if (itemImage != null)
				itemHtml += "<td class=\"vertical_list_item_leftcell\"><img class=\"vertical_list_item_img\" src=\"" + itemImage + "\"></img></td>";
			else
				itemHtml += "<td class=\"vertical_list_item_leftcell\"></td>";
			
			if (this.onRenderItemTextEvent == null)
			{
				for (var propertyIndex in this.textPropertiesInternal)
				{
					itemHtml += "<td class=\"vertical_list_cell\">" + item[this.textPropertiesInternal[propertyIndex]] + "</td>";
				}
			}
			else
				itemHtml += "<td class=\"vertical_list_cell\">" + this.onRenderItemTextEvent(item) + "</td>";
			
			itemHtml += "<td id=\"vertical_list_item_edit_" + this.containerName + "_" + item.id + "\"  class=\"list_item_edit vertical_list_cell\"></td>";

			if (this.onItemNewInternal != null)
				itemHtml += "<td id=\"vertical_list_item_add_" + this.containerName + "_" + item.id + "\"  class=\"list_item_add vertical_list_cell\"></td>";
			
			if (this.onItemDeletedEvent != null)
				itemHtml += "<td id=\"vertical_list_item_delete_" + this.containerName + "_" + item.id + "\"  class=\"list_item_delete vertical_list_cell\"></td>";
			
			itemHtml += "<td class=\"vertical_list_item_rightcell\"></td>";
				
			itemHtml += "</tr>";
			return itemHtml;
		}
};