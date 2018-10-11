(function() {
	'use strict';

	var mode = null;
	var modeTimeoutID;
	var M_BOTTOM = 1;

	var clearMode = function() {
		if (typeof modeTimeoutID !== "undefined") {
			clearTimeout(modeTimeoutID);
		}
		mode = null;
		modeTimeoutID = undefined;
	}

	var setMode = function(_mode, timeout) {
		clearMode();
		modeTimeoutID = setTimeout(clearMode, timeout || 500);
		mode = _mode;
	};

	var isScrollable = function(element) {
		var overflow = getComputedStyle(element).overflowY;
		return ['auto', 'scroll'].includes(overflow);
	};

	document.addEventListener('keydown', function(event) {
		var scrollable = event.target;
		while (!isScrollable(scrollable) && scrollable.parentElement) {
			scrollable = scrollable.parentElement;
		}

		if (event.target.tagName === 'INPUT' ||
				event.target.tagName === 'TEXTAREA' ||
				event.target.isContentEditable) {
			return;
		}

		if (event.altKey || event.ctrlKey) {
			return;
		}

		if (event.keyCode === 71) {
			if (event.shiftKey) {
				scrollable.scrollTop = scrollable.scrollHeight;
			} else if (mode === M_BOTTOM) {
				scrollable.scrollTop = 0;
				clearMode();
			} else {
				setMode(M_BOTTOM);
			}
			event.preventDefault();
		} else if (event.keyCode === 74) {
			scrollable.scrollTop += 40;
			event.preventDefault();
		} else if (event.keyCode === 75) {
			scrollable.scrollTop -= 40;
			event.preventDefault();
		}
	});
})();
