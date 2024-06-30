/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	var $nav = $('#nav');

	if ($nav.length > 0) {

		// Shrink effect.
		$main
			.scrollex({
				mode: 'top',
				enter: function() {
					$nav.addClass('alt');
				},
				leave: function() {
					$nav.removeClass('alt');
				},
			});

		// Links.
		var $nav_a = $nav.find('a');

		$nav_a
			.off('click.scrolly')  // 解除 scrolly 插件的绑定
			.on('click', function(e) {
				var $this = $(this);

				// 外部链接？跳过。
				if ($this.attr('href').charAt(0) != '#')
					return;

				// 阻止默认的点击行为
				e.preventDefault();

				// 获取目标元素的ID
				var targetId = $this.attr('href');
				var $section = $(targetId);

				// 检查目标元素是否存在
				if ($section.length) {
					// 导航到目标位置
					//var targetOffset = $section.offset().top;

					// 设置滚动位置
					//$('html, body').scrollTop(targetOffset);
				}

				// Deactivate all links.
				$nav_a
					.removeClass('active')
					.removeClass('active-locked');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');
			})
			.each(function() {
				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					initialize: function() {

						// Deactivate section.
						if (browser.canUse('transition'))
							$section.addClass('inactive');

					},
					enter: function() {

						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($nav_a.filter('.active-locked').length == 0) {

							$nav_a.removeClass('active');
							$this.addClass('active');

						}

						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});
			});
	}

})(jQuery);
