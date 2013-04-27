slidy = {
	page: 0
};

$(function () {
	$('pre.php').attr('data-language', 'php');
	$('pre.js').attr('data-language', 'javascript');
	$('pre.html').attr('data-language', 'html');

	$('pre.js.example, pre.html.example').each(function () {
		var el = $(this);

		if (el.is('.js')) {
			el.before($('<script />').text(el.text()));
		} else {
			var demo = $('<div class="demo" />').insertBefore(el);
			demo.html(el.text());
		}
	});

	if (location.hash) {
		slidy.page = parseInt(location.hash.substr(1));
	}

	$('div.slide').hide().eq(slidy.page).show();
});


$(window).keyup(function (e) {
	var current = $('div.slide:visible');

	if (e.keyCode == 37 && slidy.page > 0) {
		current.prev().show();
		current.hide();
		slidy.page--;
		location.hash = slidy.page;
	}

	if (e.keyCode == 39 && current.next().size() > 0) {
		current.next().show();
		current.hide();
		slidy.page++;
		location.hash = slidy.page;
	}
});