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

	document.addEventListener('keydown', function(event) {
		var scrollable = document.body;
		if (!scrollable) {
			return;
		}
		if (scrollable.scrollHeight <= scrollable.parentNode.scrollHeight) {
			scrollable = scrollable.parentNode;
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
		} else if (event.keyCode === 72) {
			scrollable.scrollLeft -= 40;
			event.preventDefault();
		} else if (event.keyCode === 74) {
			scrollable.scrollTop += 40;
			event.preventDefault();
		} else if (event.keyCode === 75) {
			scrollable.scrollTop -= 40;
			event.preventDefault();
		} else if (event.keyCode === 76) {
			scrollable.scrollLeft += 40;
			event.preventDefault();
		}
	});

	// disable auto scroll
	document.addEventListener('mousedown', function(event) {
		if (event.button === 1) {
			event.preventDefault();
		}
	});
})();
