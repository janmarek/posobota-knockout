describe('Todo', function () {
	var list, ajaxService;
	beforeEach(function () {
		ajaxService = {};
		list = new TodoList([
			{text: 'koupit pivo', done: true},
			{text: 'uklidit', done: false}
		], null, ajaxService);
	});

	it('loads data from constructor', function () {
		expect(list.items().length).toBe(2);
	});

	it('knows count of not done items', function () {
		expect(list.notDoneItemsCount()).toBe(1);
	});

	describe('adding new item', function () {
		it('adds new item', function () {
			list.newItemText('zavolat mamince');
			list.addItem();
			expect(list.items().length).toBe(3);
			expect(list.newItemText()).toBe('');
		});

		it('adds new item which is not done initially', function () {
			list.newItemText('zavolat mamince');
			list.addItem();
			var items = list.items();
			var lastItem = items[items.length - 1];
			expect(lastItem.done()).toBe(false);
		});

		it('does not add new item if text is not filled', function () {
			list.addItem();
			expect(list.items().length).toBe(2);
		});
	});

	describe('reload', function () {
		it('sets new data after reload', function () {
			ajaxService.run = function (method, url, params, success, failure) {
				expect(list.reloading()).toBe(true);

				success({
					items: []
				});
			};

			list.reload();
			expect(list.reloading()).toBe(false);
			expect(list.items().length).toBe(0);
		});

		it('shows alert on error', function () {
			var alertCalled = false;
			alert = function () {
				alertCalled = true;
			};
			ajaxService.run = function (method, url, params, success, failure) {
				failure();
			};

			list.reload();
			expect(list.reloading()).toBe(false);
			expect(alertCalled).toBe(true);
		});
	});
});