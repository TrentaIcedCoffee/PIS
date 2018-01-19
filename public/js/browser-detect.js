(function() {
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	// Safari 3.0+ "[object HTMLElementConstructor]"
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;

	if (isOpera) {
		alert('You are using Opera, please switch to Chrome');
		window.location.replace('404.html')
	} else if (isFirefox) {
		alert('You are using Firefox, please switch to Chrome');
		window.location.replace('404.html')
	} else if (isIE) {
		alert('You are using IE, please switch to Chrome');
		window.location.replace('404.html')
	} else if (isEdge) {
		alert('You are using Edge, please switch to Chrome');
		window.location.replace('404.html')
	}
})()
