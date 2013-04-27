function TodoList(items, reloadUrl, ajaxService) {
	var self = this;

	this.items = ko.observableArray();

	function setItems(items) {
		var items = $.map(items, function (item) {
			return new TodoItem(item.text, item.done);
		});
		self.items(items);
	}
	setItems(items);

	this.notDoneItemsCount = ko.computed(function () {
		var doneItems = $.grep(this.items(), function (item) {
			return item.done() === false;
		});

		return doneItems.length;
	}, this);

	this.newItemText = ko.observable('');
	this.reloading = ko.observable(false);

	this.addItem = function () {
		var text = self.newItemText();

		if (!text) {
			return;
		}

		self.items.push(new TodoItem(text));
		self.newItemText('');
	};

	this.removeItem = function (item) {
		self.items.remove(item);
	};

	this.reload = function () {
		self.reloading(true);
		ajaxService.run('GET', reloadUrl, {}, function (data) {
			setItems(data.items);
			self.reloading(false);
		}, function () {
			alert('Data se nepovedlo načíst.');
			self.reloading(false);
		});
	};
}

function TodoItem(text, done) {
	this.text = ko.observable(text || '');
	this.done = ko.observable(done || false);
}

function AjaxService() {
	this.run = function (method, url, params, success, failure) {
		$.ajax(url, {
			data: params,
			type: method,
			dataType: 'json',
			success: success,
			error: failure || null
		});
	}
}
