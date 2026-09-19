// ==UserScript==
// @name         Citizen Vector 2022 → Citizen skin (rewrite v2.29) · 无 HotCat 适配
// @namespace    CitizenVector
// @version      2.50
// @description  Rewrite Vector 2022 skin into Citizen look: header, page-actions, monochrome icons, TOC namespace guard, skin toggle, preferences alignment（不含 HotCat 分类药丸适配）
// @author       CitizenVector
// @updateURL    https://raw.githubusercontent.com/Chatsven/Citizen-skins-Wikimedia-Projects/main/citizen-wikimedia-projects.user.js
// @downloadURL  https://raw.githubusercontent.com/Chatsven/Citizen-skins-Wikimedia-Projects/main/citizen-wikimedia-projects.user.js
// @match        *://*.wikipedia.org/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
	if (window.__cvAnchorGuard) return;
	window.__cvAnchorGuard = true;
	var ATTR = 'data-mw-ve-target-container';
	function cvStripAnchors() {
		var list = document.querySelectorAll('[' + ATTR + ']');
		for (var i = 0; i < list.length; i++) {
			list[i].removeAttribute(ATTR);
		}
	}
	var mo = null;
	function cvWatchAnchors(mutations) {
		for (var i = 0; i < mutations.length; i++) {
			var m = mutations[i];
			if (m.type === 'attributes') {
				m.target.removeAttribute(ATTR);
				continue;
			}
			for (var j = 0; j < m.addedNodes.length; j++) {
				var n = m.addedNodes[j];
				if (n.nodeType !== 1) continue;
				if (n.hasAttribute(ATTR)) n.removeAttribute(ATTR);
				else if (n.children.length && n.querySelector('[' + ATTR + ']')) cvStripAnchors();
			}
		}
	}
	try {
		mo = new MutationObserver(cvWatchAnchors);
		mo.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: [ATTR] });
	} catch (e) {  }
	cvStripAnchors();
	function cvStopWatching() {
		cvStripAnchors();
		if (mo) { mo.disconnect(); mo = null; }
	}
	if (document.readyState === 'complete') {
		cvStopWatching();
	} else {
		document.addEventListener('DOMContentLoaded', cvStopWatching);
	}
}());

function cvInjectCSS() {
	'use strict';

	var s = document.createElement('style');
	s.setAttribute('data-citizen-vector','1');
	s.textContent = `

.citizen-cdx-button--size-large.cdx-button{min-height:40px}.citizen-cdx-button--size-large.cdx-button--icon-only{display:grid;place-items:center;min-width:40px;padding:0}.skin-citizen .cdx-button{font-weight:var(--font-weight-medium);border-radius:var(--border-radius-base)}.skin-citizen .cdx-button--weight-quiet{--mix-blend-mode-blend:normal}.skin-citizen .cdx-button:enabled:not(:active):not(.cdx-button--is-active):focus,.skin-citizen .cdx-button.cdx-button--fake-button--enabled:not(:active):not(.cdx-button--is-active):focus{border-color:transparent;box-shadow:none}.skin-citizen .cdx-button:enabled:not(:active):not(.cdx-button--is-active):focus-visible,.skin-citizen .cdx-button.cdx-button--fake-button--enabled:not(:active):not(.cdx-button--is-active):focus-visible{outline:1px solid transparent;border-color:var(--border-color-progressive--focus);box-shadow:inset 0 0 0 1px var(--color-progressive)}.citizen-v4 .cdx-button:enabled,.citizen-v4 .cdx-button.cdx-button--fake-button--enabled{color:var(--color-neutral)}.citizen-v4 .cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive,.citizen-v4 .cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive,.citizen-v4 .cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive,.citizen-v4 .cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive,.citizen-v4 .cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive:hover,.citizen-v4 .cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:hover,.citizen-v4 .cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive:hover,.citizen-v4 .cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive:hover,.citizen-v4 .cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive:active,.citizen-v4 .cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:active,.citizen-v4 .cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive:active,.citizen-v4 .cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive:active{border-color:transparent}.skin-citizen .cdx-checkbox__icon::before{box-sizing:content-box}.skin-citizen .cdx-message{border-radius:var(--border-radius-medium)}.cdx-button{display:inline-flex;align-items:center;justify-content:center;gap:4px;box-sizing:border-box;min-height:32px;max-width:28rem;margin:0;border-width:1px;border-style:solid;border-radius:2px;padding-right:11px;padding-left:11px;font-family:inherit;font-size:inherit;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-transform:none;transition-property:background-color,color,border-color,box-shadow;transition-duration:.1s}.cdx-button--size-large{min-height:44px;padding-right:15px;padding-left:15px}.cdx-button--icon-only{min-width:32px;padding-right:5px;padding-left:5px}.cdx-button--icon-only.cdx-button--size-large{min-width:44px;padding-right:11px;padding-left:11px}.cdx-button::-moz-focus-inner{border:0;padding:0}.cdx-button .cdx-button__icon,.cdx-button .cdx-icon{vertical-align:middle}.cdx-button .cdx-icon{color:inherit}.cdx-button--fake-button,.cdx-button--fake-button:hover,.cdx-button--fake-button:focus{text-decoration:none}.cdx-button:enabled,.cdx-button.cdx-button--fake-button--enabled{background-color:var(--background-color-interactive-subtle,#f8f9fa);color:var(--color-base,#202122);border-color:var(--border-color-base,#a2a9b1)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled .cdx-button__icon{background-color:var(--color-base,#202122)}}.cdx-button:enabled:hover,.cdx-button.cdx-button--fake-button--enabled:hover{background-color:var(--background-color-base,#fff);color:var(--color-base--hover,#404244);cursor:pointer}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled:hover .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled:hover .cdx-button__icon{background-color:var(--color-base--hover,#404244)}}.cdx-button:enabled:active,.cdx-button.cdx-button--fake-button--enabled:active,.cdx-button:enabled.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--is-active{background-color:var(--background-color-interactive,#eaecf0);color:var(--color-emphasized,#101418);border-color:var(--border-color-interactive,#72777d)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled:active .cdx-button__icon,.cdx-button:enabled.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--is-active .cdx-button__icon{background-color:var(--color-emphasized,#101418)}}.cdx-button:enabled:focus,.cdx-button.cdx-button--fake-button--enabled:focus{outline:1px solid transparent}.cdx-button:enabled:focus:not(:active):not(.cdx-button--is-active),.cdx-button.cdx-button--fake-button--enabled:focus:not(:active):not(.cdx-button--is-active){border-color:var(--border-color-progressive--focus,#36c);box-shadow:inset 0 0 0 1px var(--box-shadow-color-progressive--focus,#36c)}.cdx-button:enabled.cdx-button--action-progressive,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive{color:var(--color-progressive,#36c)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--action-progressive .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive .cdx-button__icon{background-color:var(--color-progressive,#36c)}}.cdx-button:enabled.cdx-button--action-progressive:hover,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive:hover{color:var(--color-progressive--hover,#4b77d6);border-color:var(--border-color-progressive--hover,#4b77d6)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--action-progressive:hover .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive:hover .cdx-button__icon{background-color:var(--color-progressive--hover,#4b77d6)}}.cdx-button:enabled.cdx-button--action-progressive:active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive:active,.cdx-button:enabled.cdx-button--action-progressive.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive.cdx-button--is-active{background-color:var(--background-color-progressive-subtle,#f1f4fd);color:var(--color-progressive--active,#233566);border-color:var(--border-color-progressive--active,#233566)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--action-progressive:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive:active .cdx-button__icon,.cdx-button:enabled.cdx-button--action-progressive.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-progressive.cdx-button--is-active .cdx-button__icon{background-color:var(--color-progressive--active,#233566)}}.cdx-button:enabled.cdx-button--action-destructive,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive{color:var(--color-destructive,#d73333)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--action-destructive .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive .cdx-button__icon{background-color:var(--color-destructive,#d73333)}}.cdx-button:enabled.cdx-button--action-destructive:hover,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive:hover{color:var(--color-destructive--hover,#fc493b);border-color:var(--border-color-destructive--hover,#fc493b)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--action-destructive:hover .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive:hover .cdx-button__icon{background-color:var(--color-destructive--hover,#fc493b)}}.cdx-button:enabled.cdx-button--action-destructive:active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive:active,.cdx-button:enabled.cdx-button--action-destructive.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive.cdx-button--is-active{background-color:var(--background-color-destructive-subtle,#ffe9e5);color:var(--color-destructive--active,#9f3526);border-color:var(--border-color-destructive--active,#9f3526)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--action-destructive:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive:active .cdx-button__icon,.cdx-button:enabled.cdx-button--action-destructive.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive.cdx-button--is-active .cdx-button__icon{background-color:var(--color-destructive--active,#9f3526)}}.cdx-button:enabled.cdx-button--action-destructive:focus:not(:active):not(.cdx-button--is-active),.cdx-button.cdx-button--fake-button--enabled.cdx-button--action-destructive:focus:not(:active):not(.cdx-button--is-active){border-color:var(--border-color-destructive--focus,#36c);box-shadow:inset 0 0 0 1px var(--box-shadow-color-destructive--focus,#36c)}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive{background-color:var(--background-color-progressive,#36c);color:var(--color-inverted-fixed,#fff);border-color:var(--border-color-progressive,#36c)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive .cdx-button__icon{background-color:var(--color-inverted-fixed,#fff)}}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive:hover,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:hover{background-color:var(--background-color-progressive--hover,#4b77d6);border-color:var(--border-color-progressive--hover,#4b77d6)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive:hover .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:hover .cdx-button__icon{background-color:var(--color-inverted-fixed,#fff)}}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive:active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:active,.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive.cdx-button--is-active{background-color:var(--background-color-progressive--active,#233566);border-color:var(--border-color-progressive--active,#233566)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:active .cdx-button__icon,.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive.cdx-button--is-active .cdx-button__icon{background-color:var(--color-inverted-fixed,#fff)}}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-progressive:focus:not(:active):not(.cdx-button--is-active),.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:focus:not(:active):not(.cdx-button--is-active){border-color:var(--border-color-progressive--focus,#36c);box-shadow:inset 0 0 0 1px var(--box-shadow-color-progressive--focus,#36c),inset 0 0 0 2px var(--box-shadow-color-inverted,#fff)}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive{background-color:var(--background-color-destructive,#d73333);color:var(--color-inverted-fixed,#fff);border-color:var(--border-color-destructive,#d73333)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive .cdx-button__icon{background-color:var(--color-inverted-fixed,#fff)}}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive:hover,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive:hover{background-color:var(--background-color-destructive--hover,#fc493b);border-color:var(--border-color-destructive--hover,#fc493b)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive:hover .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive:hover .cdx-button__icon{background-color:var(--color-inverted-fixed,#fff)}}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive:active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive:active,.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive.cdx-button--is-active{background-color:var(--background-color-destructive--active,#9f3526);border-color:var(--border-color-destructive--active,#9f3526)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive:active .cdx-button__icon,.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive.cdx-button--is-active .cdx-button__icon{background-color:var(--color-inverted-fixed,#fff)}}.cdx-button:enabled.cdx-button--weight-primary.cdx-button--action-destructive:focus:not(:active):not(.cdx-button--is-active),.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-destructive:focus:not(:active):not(.cdx-button--is-active){border-color:var(--border-color-destructive--focus,#36c);box-shadow:inset 0 0 0 1px var(--box-shadow-color-destructive--focus,#36c),inset 0 0 0 2px var(--box-shadow-color-inverted,#fff)}.cdx-button:enabled.cdx-button--weight-quiet,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet{background-color:var(--background-color-transparent,transparent);border-color:var(--border-color-transparent,transparent)}.cdx-button:enabled.cdx-button--weight-quiet:hover,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet:hover{background-color:var(--background-color-button-quiet--hover,rgba(0,24,73,.027))}.cdx-button:enabled.cdx-button--weight-quiet:active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet:active,.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--is-active{background-color:var(--background-color-button-quiet--active,rgba(0,24,73,.082));color:var(--color-emphasized,#101418);border-color:var(--border-color-interactive,#72777d)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-quiet:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet:active .cdx-button__icon,.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--is-active .cdx-button__icon{background-color:var(--color-emphasized,#101418)}}.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive{color:var(--color-progressive,#36c)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive .cdx-button__icon{background-color:var(--color-progressive,#36c)}}.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive:hover,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive:hover{background-color:var(--background-color-progressive-subtle,#f1f4fd);color:var(--color-progressive--hover,#4b77d6)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive:hover .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive:hover .cdx-button__icon{background-color:var(--color-progressive--hover,#4b77d6)}}.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive:active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive:active,.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive.cdx-button--is-active{background-color:var(--background-color-progressive--active,#233566);color:var(--color-inverted-fixed,#fff);border-color:var(--border-color-progressive--active,#233566)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive:active .cdx-button__icon,.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-progressive.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-progressive.cdx-button--is-active .cdx-button__icon{background-color:var(--color-inverted,#fff)}}.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive{color:var(--color-destructive,#d73333)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive .cdx-button__icon{background-color:var(--color-destructive,#d73333)}}.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive:hover,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive:hover{background-color:var(--background-color-destructive-subtle,#ffe9e5);color:var(--color-destructive--hover,#fc493b)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive:hover .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive:hover .cdx-button__icon{background-color:var(--color-destructive--hover,#fc493b)}}.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive:active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive:active,.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive.cdx-button--is-active,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive.cdx-button--is-active{background-color:var(--background-color-destructive--active,#9f3526);color:var(--color-inverted-fixed,#fff);border-color:var(--border-color-destructive--active,#9f3526)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive:active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive:active .cdx-button__icon,.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive.cdx-button--is-active .cdx-button__icon,.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive.cdx-button--is-active .cdx-button__icon{background-color:var(--color-inverted,#fff)}}.cdx-button:enabled.cdx-button--weight-quiet.cdx-button--action-destructive:focus:not(:active):not(.cdx-button--is-active),.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-quiet.cdx-button--action-destructive:focus:not(:active):not(.cdx-button--is-active){border-color:var(--border-color-destructive--focus,#36c);box-shadow:inset 0 0 0 1px var(--box-shadow-color-destructive--focus,#36c)}.cdx-button:disabled,.cdx-button.cdx-button--fake-button--disabled{background-color:var(--background-color-disabled,#c8ccd1);color:var(--color-inverted,#fff);border-color:var(--border-color-transparent,transparent)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:disabled .cdx-button__icon,.cdx-button.cdx-button--fake-button--disabled .cdx-button__icon{background-color:var(--color-inverted,#fff)}}.cdx-button:disabled.cdx-button--weight-quiet,.cdx-button.cdx-button--fake-button--disabled.cdx-button--weight-quiet{background-color:var(--background-color-transparent,transparent);color:var(--color-disabled,#72777d)}@supports ((-webkit-mask-image:none) or (mask-image:none)){.cdx-button:disabled.cdx-button--weight-quiet .cdx-button__icon,.cdx-button.cdx-button--fake-button--disabled.cdx-button--weight-quiet .cdx-button__icon{background-color:var(--color-disabled,#72777d)}}.mw-ui-icon-wikimedia-bell:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYmVsbAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTYgN2E1LjM4IDUuMzggMCAwIDAtNC40Ni00Ljg1QzExLjYgMS40NiAxMS41MyAwIDEwIDBTOC40IDEuNDYgOC40NiAyLjE1QTUuMzggNS4zOCAwIDAgMCA0IDd2NmwtMiAydjFoMTZ2LTFsLTItMnptLTYgMTNhMyAzIDAgMCAwIDMtM0g3YTMgMyAwIDAgMCAzIDMiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYmVsbAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTYgN2E1LjM4IDUuMzggMCAwIDAtNC40Ni00Ljg1QzExLjYgMS40NiAxMS41MyAwIDEwIDBTOC40IDEuNDYgOC40NiAyLjE1QTUuMzggNS4zOCAwIDAgMCA0IDd2NmwtMiAydjFoMTZ2LTFsLTItMnptLTYgMTNhMyAzIDAgMCAwIDMtM0g3YTMgMyAwIDAgMCAzIDMiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-message:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbWVzc2FnZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMCA4djhhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjhsLTEwIDR6Ii8+PHBhdGggZD0iTTIgMmEyIDIgMCAwIDAtMiAydjJsMTAgNCAxMC00VjRhMiAyIDAgMCAwLTItMnoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbWVzc2FnZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMCA4djhhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjhsLTEwIDR6Ii8+PHBhdGggZD0iTTIgMmEyIDIgMCAwIDAtMiAydjJsMTAgNCAxMC00VjRhMiAyIDAgMCAwLTItMnoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-speechBubbleAdd:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYWRkIHNwZWVjaCBidWJibGUKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTMgMWEyIDIgMCAwIDAtMiAydjE2bDQtNGgxMmEyIDIgMCAwIDAgMi0yVjNhMiAyIDAgMCAwLTItMnptMTIgOGgtNHY0SDlWOUg1VjdoNFYzaDJ2NGg0eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYWRkIHNwZWVjaCBidWJibGUKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTMgMWEyIDIgMCAwIDAtMiAydjE2bDQtNGgxMmEyIDIgMCAwIDAgMi0yVjNhMiAyIDAgMCAwLTItMnptMTIgOGgtNHY0SDlWOUg1VjdoNFYzaDJ2NGg0eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-speechBubbles:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc3BlZWNoIGJ1YmJsZXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTE3IDR2N2EyIDIgMCAwIDEtMiAySDR2MWEyIDIgMCAwIDAgMiAyaDEwbDQgNFY2YTIgMiAwIDAgMC0yLTJ6TTYgMTBIMHY2eiIvPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxMiIgcng9IjIiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc3BlZWNoIGJ1YmJsZXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTE3IDR2N2EyIDIgMCAwIDEtMiAySDR2MWEyIDIgMCAwIDAgMiAyaDEwbDQgNFY2YTIgMiAwIDAgMC0yLTJ6TTYgMTBIMHY2eiIvPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxMiIgcng9IjIiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-article:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNSAxYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMi0yVjNhMiAyIDAgMCAwLTItMnptMCAzaDV2MUg1em0wIDJoNXYxSDV6bTAgMmg1djFINXptMTAgN0g1di0xaDEwem0wLTJINXYtMWgxMHptMC0ySDV2LTFoMTB6bTAtMmgtNFY0aDR6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNSAxYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMi0yVjNhMiAyIDAgMCAwLTItMnptMCAzaDV2MUg1em0wIDJoNXYxSDV6bTAgMmg1djFINXptMTAgN0g1di0xaDEwem0wLTJINXYtMWgxMHptMC0ySDV2LTFoMTB6bTAtMmgtNFY0aDR6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-articleNotFound:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZSBub3QgZm91bmQKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTE1IDFINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTBhMiAyIDAgMCAwIDItMlYzYTIgMiAwIDAgMC0yLTJtLTQgMTVIOXYtMmgyem0yLjctNy42YTUgNSAwIDAgMS0uMy43IDIuNyAyLjcgMCAwIDEtLjUuNmwtLjUuNWEyLjcgMi43IDAgMCAxLS42LjVjLS4yLjItLjMuNC0uNS42YTEuOSAxLjkgMCAwIDAtLjMuOCAzLjQgMy40IDAgMCAwLS4xIDFIOS4xYTUgNSAwIDAgMSAuMS0xLjIgMyAzIDAgMCAxIC4yLS45IDIuNSAyLjUgMCAwIDEgLjQtLjdsLjYtLjZhMS44IDEuOCAwIDAgMSAuNS0uNGMuMi0uMS4zLS4zLjQtLjRsLjMtLjZhMS43IDEuNyAwIDAgMCAuMS0uNyAzIDMgMCAwIDAtLjItLjkgMi4yIDIuMiAwIDAgMC0xLS45LjkuOSAwIDAgMC0uNS0uMSAxLjY4IDEuNjggMCAwIDAtMS41LjdBMi44NiAyLjg2IDAgMCAwIDggOC4xSDYuMmE1LjEgNS4xIDAgMCAxIC4zLTEuNyAzLjUgMy41IDAgMCAxIC44LTEuMyAzLjYgMy42IDAgMCAxIDEuMi0uOCA1LjEgNS4xIDAgMCAxIDEuNy0uMyA2IDYgMCAwIDEgMS40LjIgMi42IDIuNiAwIDAgMSAxLjEuNyA0LjQgNC40IDAgMCAxIC44IDEuMSA0IDQgMCAwIDEgLjMgMS41IDMgMyAwIDAgMS0uMS45Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZSBub3QgZm91bmQKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTE1IDFINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTBhMiAyIDAgMCAwIDItMlYzYTIgMiAwIDAgMC0yLTJtLTQgMTVIOXYtMmgyem0yLjctNy42YTUgNSAwIDAgMS0uMy43IDIuNyAyLjcgMCAwIDEtLjUuNmwtLjUuNWEyLjcgMi43IDAgMCAxLS42LjVjLS4yLjItLjMuNC0uNS42YTEuOSAxLjkgMCAwIDAtLjMuOCAzLjQgMy40IDAgMCAwLS4xIDFIOS4xYTUgNSAwIDAgMSAuMS0xLjIgMyAzIDAgMCAxIC4yLS45IDIuNSAyLjUgMCAwIDEgLjQtLjdsLjYtLjZhMS44IDEuOCAwIDAgMSAuNS0uNGMuMi0uMS4zLS4zLjQtLjRsLjMtLjZhMS43IDEuNyAwIDAgMCAuMS0uNyAzIDMgMCAwIDAtLjItLjkgMi4yIDIuMiAwIDAgMC0xLS45LjkuOSAwIDAgMC0uNS0uMSAxLjY4IDEuNjggMCAwIDAtMS41LjdBMi44NiAyLjg2IDAgMCAwIDggOC4xSDYuMmE1LjEgNS4xIDAgMCAxIC4zLTEuNyAzLjUgMy41IDAgMCAxIC44LTEuMyAzLjYgMy42IDAgMCAxIDEuMi0uOCA1LjEgNS4xIDAgMCAxIDEuNy0uMyA2IDYgMCAwIDEgMS40LjIgMi42IDIuNiAwIDAgMSAxLjEuNyA0LjQgNC40IDAgMCAxIC44IDEuMSA0IDQgMCAwIDEgLjMgMS41IDMgMyAwIDAgMS0uMS45Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-articleSearch:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZSBzZWFyY2gKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEyLjQzIDE0LjM0QTUgNSAwIDAgMSAxMCAxNWE1IDUgMCAxIDEgMy45NS0yTDE3IDE2LjA5VjNhMiAyIDAgMCAwLTItMkg1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMS40NS0uNjN6Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMyIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZSBzZWFyY2gKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEyLjQzIDE0LjM0QTUgNSAwIDAgMSAxMCAxNWE1IDUgMCAxIDEgMy45NS0yTDE3IDE2LjA5VjNhMiAyIDAgMCAwLTItMkg1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMS40NS0uNjN6Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMyIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-articlesSearch:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2VhcmNoIGFydGljbGVzCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik03IDBhMiAyIDAgMCAwLTIgMmg5YTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJ6Ii8+PHBhdGggZD0iTTEwLjggMTUuNmE0LjYgNC43IDAgMCAxLTIuMy42IDQuNiA0LjcgMCAxIDEgMy43LTEuOWwyLjggM1Y0LjlBMS45IDEuOSAwIDAgMCAxMy4xIDNINGExLjkgMS45IDAgMCAwLTIgMS45VjE4YTEuOSAxLjkgMCAwIDAgMS45IDJIMTNhMS45IDEuOSAwIDAgMCAxLjQtLjZ6Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0iMTEuNSIgcj0iMyIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2VhcmNoIGFydGljbGVzCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik03IDBhMiAyIDAgMCAwLTIgMmg5YTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJ6Ii8+PHBhdGggZD0iTTEwLjggMTUuNmE0LjYgNC43IDAgMCAxLTIuMy42IDQuNiA0LjcgMCAxIDEgMy43LTEuOWwyLjggM1Y0LjlBMS45IDEuOSAwIDAgMCAxMy4xIDNINGExLjkgMS45IDAgMCAwLTIgMS45VjE4YTEuOSAxLjkgMCAwIDAgMS45IDJIMTNhMS45IDEuOSAwIDAgMCAxLjQtLjZ6Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0iMTEuNSIgcj0iMyIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-articleRedirect:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZSByZWRpcmVjdAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNSAxYTIgMiAwIDAgMC0yIDJ2MWMwIDUgMiA4IDcgOFY5bDUgNC01IDR2LTNjLTMuMTggMC01LjUxLS44NS03LTIuNjhWMTdhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMi0yVjNhMiAyIDAgMCAwLTItMnoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYXJ0aWNsZSByZWRpcmVjdAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNSAxYTIgMiAwIDAgMC0yIDJ2MWMwIDUgMiA4IDcgOFY5bDUgNC01IDR2LTNjLTMuMTggMC01LjUxLS44NS03LTIuNjhWMTdhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMi0yVjNhMiAyIDAgMCAwLTItMnoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-die:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZGllCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0zIDFhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWM2EyIDIgMCAwIDAtMi0yem0yIDE2YTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMk01IDdhMiAyIDAgMSAxIDItMiAyIDIgMCAwIDEtMiAybTUgNWEyIDIgMCAxIDEgMi0yIDIgMiAwIDAgMS0yIDJtNSA1YTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMm0wLTEwYTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZGllCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0zIDFhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWM2EyIDIgMCAwIDAtMi0yem0yIDE2YTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMk01IDdhMiAyIDAgMSAxIDItMiAyIDIgMCAwIDEtMiAybTUgNWEyIDIgMCAxIDEgMi0yIDIgMiAwIDAgMS0yIDJtNSA1YTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMm0wLTEwYTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-history:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaGlzdG9yeQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNOSA2djVoLjA2bDIuNDggMi40NyAxLjQxLTEuNDFMMTEgMTAuMTFWNnoiLz48cGF0aCBkPSJNMTAgMWE5IDkgMCAwIDAtNy44NSAxMy4zNUwuNSAxNkg2di01LjVsLTIuMzggMi4zOEE3IDcgMCAxIDEgMTAgMTd2MmE5IDkgMCAwIDAgMC0xOCIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaGlzdG9yeQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNOSA2djVoLjA2bDIuNDggMi40NyAxLjQxLTEuNDFMMTEgMTAuMTFWNnoiLz48cGF0aCBkPSJNMTAgMWE5IDkgMCAwIDAtNy44NSAxMy4zNUwuNSAxNkg2di01LjVsLTIuMzggMi4zOEE3IDcgMCAxIDEgMTAgMTd2MmE5IDkgMCAwIDAgMC0xOCIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-infoFilled:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaW5mbwoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTAgMEM0LjQ3NyAwIDAgNC40NzcgMCAxMHM0LjQ3NyAxMCAxMCAxMCAxMC00LjQ3NyAxMC0xMFMxNS41MjMgMCAxMCAwTTkgNWgydjJIOXptMCA0aDJ2Nkg5eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaW5mbwoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTAgMEM0LjQ3NyAwIDAgNC40NzcgMCAxMHM0LjQ3NyAxMCAxMCAxMCAxMC00LjQ3NyAxMC0xMFMxNS41MjMgMCAxMCAwTTkgNWgydjJIOXptMCA0aDJ2Nkg5eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-qrCode:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJUVIgY29kZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNyAzSDN2NGg0em02IDB2NGg0VjN6TTcgMTNIM3Y0aDR6bTggMHYtMmg0djJoLTJ2NGgtMnYyaDR2LTRoLTR2MmgtNHYyaDJ2LTRoLTJ2LTRoMnYyem0tNC00VjFoOHY4ek0xIDlWMWg4djh6bTAgMmg4djhIMXoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJUVIgY29kZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNyAzSDN2NGg0em02IDB2NGg0VjN6TTcgMTNIM3Y0aDR6bTggMHYtMmg0djJoLTJ2NGgtMnYyaDR2LTRoLTR2MmgtNHYyaDJ2LTRoLTJ2LTRoMnYyem0tNC00VjFoOHY4ek0xIDlWMWg4djh6bTAgMmg4djhIMXoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-share:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2hhcmUKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEyIDZWMmw3IDctNyA3di00Yy01IDAtOC41IDEuNS0xMSA1bC44LTMgLjItLjRBMTIgMTIgMCAwIDEgMTIgNiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2hhcmUKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEyIDZWMmw3IDctNyA3di00Yy01IDAtOC41IDEuNS0xMSA1bC44LTMgLjItLjRBMTIgMTIgMCAwIDEgMTIgNiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-specialPages:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc3BlY2lhbCBwYWdlcwoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNyAwYTIgMiAwIDAgMC0yIDJoOWEyIDIgMCAwIDEgMiAydjEyYTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0yeiIvPjxwYXRoIGQ9Ik0xMyAyMEg0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDlhMiAyIDAgMCAxIDIgMnYxM2EyIDIgMCAwIDEtMiAybS02LjUtMy41LjQxLTEuMDlMOCAxNWwtMS4wOS0uNDEtLjQxLTEuMDktLjQxIDEuMDlMNSAxNWwxLjA5LjQxem0yLjk4Mi0uOTQ5Ljk1Mi0yLjU2MSAyLjUzLS45NjQtMi41My0uOTY0TDkuNDgyIDguNWwtLjk1MiAyLjU2Mi0yLjUzLjk2NCAyLjUzLjk2NHpNNiAxMC41bC41NDctMS40NTNMOCA4LjVsLTEuNDUzLS41NDdMNiA2LjVsLS41NDcgMS40NTNMNCA4LjVsMS40NTMuNTQ3eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc3BlY2lhbCBwYWdlcwoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNyAwYTIgMiAwIDAgMC0yIDJoOWEyIDIgMCAwIDEgMiAydjEyYTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0yeiIvPjxwYXRoIGQ9Ik0xMyAyMEg0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDlhMiAyIDAgMCAxIDIgMnYxM2EyIDIgMCAwIDEtMiAybS02LjUtMy41LjQxLTEuMDlMOCAxNWwtMS4wOS0uNDEtLjQxLTEuMDktLjQxIDEuMDlMNSAxNWwxLjA5LjQxem0yLjk4Mi0uOTQ5Ljk1Mi0yLjU2MSAyLjUzLS45NjQtMi41My0uOTY0TDkuNDgyIDguNWwtLjk1MiAyLjU2Mi0yLjUzLjk2NCAyLjUzLjk2NHpNNiAxMC41bC41NDctMS40NTNMOCA4LjVsLTEuNDUzLS41NDdMNiA2LjVsLS41NDcgMS40NTNMNCA4LjVsMS40NTMuNTQ3eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-upload:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXBsb2FkCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xNyAxMnY1SDN2LTVIMXY1YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtNXoiLz48cGF0aCBkPSJNMTAgMSA1IDdoNHY4aDJWN2g0eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXBsb2FkCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xNyAxMnY1SDN2LTVIMXY1YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtNXoiLz48cGF0aCBkPSJNMTAgMSA1IDdoNHY4aDJWN2g0eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-labFlask:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbGFib3JhdG9yeSBmbGFzawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTMgNy42MVYzaDFWMUg2djJoMXY0LjYxbC01Ljg2IDkuODhBMSAxIDAgMCAwIDIgMTloMTZhMSAxIDAgMCAwIC44Ni0xLjUxem0tNC4yLjg4YTEgMSAwIDAgMCAuMi0uNlYzaDJ2NC44OWExIDEgMCAwIDAgLjE0LjUxbDIuMTQgMy42SDYuNzJ6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbGFib3JhdG9yeSBmbGFzawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTMgNy42MVYzaDFWMUg2djJoMXY0LjYxbC01Ljg2IDkuODhBMSAxIDAgMCAwIDIgMTloMTZhMSAxIDAgMCAwIC44Ni0xLjUxem0tNC4yLjg4YTEgMSAwIDAgMCAuMi0uNlYzaDJ2NC44OWExIDEgMCAwIDAgLjE0LjUxbDIuMTQgMy42SDYuNzJ6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-language:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbGFuZ3VhZ2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTIwIDE4aC0xLjQ0YS42LjYgMCAwIDEtLjQtLjEyLjguOCAwIDAgMS0uMjMtLjMxTDE3IDE1aC01bC0xIDIuNTRhLjguOCAwIDAgMS0uMjIuMy42LjYgMCAwIDEtLjQuMTRIOWw0LjU1LTExLjQ3aDEuODl6bS0zLjUzLTQuMzFMMTQuODkgOS41YTEyIDEyIDAgMCAxLS4zOS0xLjI0cS0uMDkuMzctLjE5LjY5bC0uMTkuNTYtMS41OCA0LjE5em0tNi4zLTEuNThhMTMuNCAxMy40IDAgMCAxLTIuOTEtMS40MSAxMS40NiAxMS40NiAwIDAgMCAyLjgxLTUuMzdIMTJWNEg3LjMxYTQgNCAwIDAgMC0uMi0uNTZDNi44NyAyLjc5IDYuNiAyIDYuNiAybC0xLjQ3LjVzLjQuODkuNiAxLjVIMHYxLjMzaDIuMTVBMTEuMjMgMTEuMjMgMCAwIDAgNSAxMC43YTE3LjIgMTcuMiAwIDAgMS01IDIuMXEuNTYuODIuODcgMS4zOGEyMy4zIDIzLjMgMCAwIDAgNS4yMi0yLjUxIDE1LjYgMTUuNiAwIDAgMCAzLjU2IDEuNzd6TTMuNjMgNS4zM2g0LjkxYTguMSA4LjEgMCAwIDEtMi40NSA0LjQ1IDkuMSA5LjEgMCAwIDEtMi40Ni00LjQ1Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbGFuZ3VhZ2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTIwIDE4aC0xLjQ0YS42LjYgMCAwIDEtLjQtLjEyLjguOCAwIDAgMS0uMjMtLjMxTDE3IDE1aC01bC0xIDIuNTRhLjguOCAwIDAgMS0uMjIuMy42LjYgMCAwIDEtLjQuMTRIOWw0LjU1LTExLjQ3aDEuODl6bS0zLjUzLTQuMzFMMTQuODkgOS41YTEyIDEyIDAgMCAxLS4zOS0xLjI0cS0uMDkuMzctLjE5LjY5bC0uMTkuNTYtMS41OCA0LjE5em0tNi4zLTEuNThhMTMuNCAxMy40IDAgMCAxLTIuOTEtMS40MSAxMS40NiAxMS40NiAwIDAgMCAyLjgxLTUuMzdIMTJWNEg3LjMxYTQgNCAwIDAgMC0uMi0uNTZDNi44NyAyLjc5IDYuNiAyIDYuNiAybC0xLjQ3LjVzLjQuODkuNiAxLjVIMHYxLjMzaDIuMTVBMTEuMjMgMTEuMjMgMCAwIDAgNSAxMC43YTE3LjIgMTcuMiAwIDAgMS01IDIuMXEuNTYuODIuODcgMS4zOGEyMy4zIDIzLjMgMCAwIDAgNS4yMi0yLjUxIDE1LjYgMTUuNiAwIDAgMCAzLjU2IDEuNzd6TTMuNjMgNS4zM2g0LjkxYTguMSA4LjEgMCAwIDEtMi40NSA0LjQ1IDkuMSA5LjEgMCAwIDEtMi40Ni00LjQ1Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-conversion:before{-webkit-mask-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iOTUgMjA2IDQxNCAzNDgiPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik00NzguNiw0NTYuNmgtODRjMC42LTMsMS4yLTUuNywxLjUtOC43aDcyLjZ2LTMxLjVIMzk3di04LjdoNjguMXYtNjMuNkgzOTd2LTYuOWg0NS42di0zNS40aDMwLjN2LTMyLjdoLTMwLjN2LTE0LjRoLTQ0LjF2MTQuNGgtMzAuNmwtMzIuMSw2OC4xaDE5Ljh2Ni45aC0yMy4xbC0zMCw2My42aDUzLjF2OC43aC01Ny4ybC04LjIsMTcuNXYxNGg2NC4yYy0wLjYsMy0xLjIsNi0yLjEsOC43aC03Mi44bC0xLDIuMXYyOS43aDQ5LjhjLTEyLjMsOC40LTMwLjMsMTUtNTUuNSwxOS4yYzguNyw4LjEsMjAuMSwyNCwyNC45LDMzYzQ0LjQtMTAuOCw3MC41LTI5LjEsODQuOS01Mi4yaDEzLjhsLTE1LjMsMjMuNGMyNC45LDcuMiw2MCwxOS44LDc3LjEsMjguNWwxOS44LTMyLjFjLTEzLjUtNi0zNi45LTEzLjgtNTcuNi0xOS44aDU4LjJMNDc4LjYsNDU2LjZMNDc4LjYsNDU2LjZ6IE0zNTUuNiwzODAuNGgtMjUuOHYtOS4zaDI1LjhWMzgwLjR6IE00MjMuNywzNzEuMXY5LjNIMzk3di05LjNINDIzLjd6IE0zNTUsMzEwLjV2LTguN2g0My41djguN0gzNTV6Ii8+PHBhdGggZD0iTTI2NC4zLDI2Ni4xaDgwLjJsMjAtNDIuNGwtMS41LTAuNWwtNi45LDEuOEgyMTYuNnY0MS4xaDMxLjJsLTI0LjksNS4xYzEyLjYsNTMuNCwyOS40LDk5LjMsNTQsMTM2LjVjLTIxLjYsMjEuNi00OC4zLDM3LjUtNzguOSw0Ny43YzguNyw4LjQsMTkuMiwyNS4yLDI0LjYsMzYuNmM2LjctMi43LDEzLjItNS42LDE5LjUtOC42bDU3LjMtMTIxLjdDMjgzLjYsMzMzLjUsMjcyLDMwMSwyNjQuMywyNjYuMXoiLz48cGF0aCBkPSJNMTk4LDMyMy40Yy0xMy41LTkuOS00MS4xLTIyLjgtNTkuNy0zMEwxMTcsMzI2LjdjMTkuMiw4LjcsNDUuOSwyMy4xLDU4LjIsMzMuNkwxOTgsMzIzLjR6Ii8+PHBhdGggZD0iTTIxMS41LDI0NS4xYy0xMi42LTEwLjgtMzguNC0yNC01Ni43LTMxLjVMMTMyLDI0NS43YzE4LjksOSw0My44LDI0LDU0LjksMzQuOEwyMTEuNSwyNDUuMXoiLz48cGF0aCBkPSJNMTgwLDM2Ni42Yy0xOCwzNS4xLTQwLjIsNzEuNC01NS44LDkzLjZsMzUuMSwyOS43YzE4LTMwLDM1LjQtNjIuNCw1MS05My45TDE4MCwzNjYuNnoiLz48L2c+PC9zdmc+");mask-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iOTUgMjA2IDQxNCAzNDgiPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik00NzguNiw0NTYuNmgtODRjMC42LTMsMS4yLTUuNywxLjUtOC43aDcyLjZ2LTMxLjVIMzk3di04LjdoNjguMXYtNjMuNkgzOTd2LTYuOWg0NS42di0zNS40aDMwLjN2LTMyLjdoLTMwLjN2LTE0LjRoLTQ0LjF2MTQuNGgtMzAuNmwtMzIuMSw2OC4xaDE5Ljh2Ni45aC0yMy4xbC0zMCw2My42aDUzLjF2OC43aC01Ny4ybC04LjIsMTcuNXYxNGg2NC4yYy0wLjYsMy0xLjIsNi0yLjEsOC43aC03Mi44bC0xLDIuMXYyOS43aDQ5LjhjLTEyLjMsOC40LTMwLjMsMTUtNTUuNSwxOS4yYzguNyw4LjEsMjAuMSwyNCwyNC45LDMzYzQ0LjQtMTAuOCw3MC41LTI5LjEsODQuOS01Mi4yaDEzLjhsLTE1LjMsMjMuNGMyNC45LDcuMiw2MCwxOS44LDc3LjEsMjguNWwxOS44LTMyLjFjLTEzLjUtNi0zNi45LTEzLjgtNTcuNi0xOS44aDU4LjJMNDc4LjYsNDU2LjZMNDc4LjYsNDU2LjZ6IE0zNTUuNiwzODAuNGgtMjUuOHYtOS4zaDI1LjhWMzgwLjR6IE00MjMuNywzNzEuMXY5LjNIMzk3di05LjNINDIzLjd6IE0zNTUsMzEwLjV2LTguN2g0My41djguN0gzNTV6Ii8+PHBhdGggZD0iTTI2NC4zLDI2Ni4xaDgwLjJsMjAtNDIuNGwtMS41LTAuNWwtNi45LDEuOEgyMTYuNnY0MS4xaDMxLjJsLTI0LjksNS4xYzEyLjYsNTMuNCwyOS40LDk5LjMsNTQsMTM2LjVjLTIxLjYsMjEuNi00OC4zLDM3LjUtNzguOSw0Ny43YzguNyw4LjQsMTkuMiwyNS4yLDI0LjYsMzYuNmM2LjctMi43LDEzLjItNS42LDE5LjUtOC42bDU3LjMtMTIxLjdDMjgzLjYsMzMzLjUsMjcyLDMwMSwyNjQuMywyNjYuMXoiLz48cGF0aCBkPSJNMTk4LDMyMy40Yy0xMy41LTkuOS00MS4xLTIyLjgtNTkuNy0zMEwxMTcsMzI2LjdjMTkuMiw4LjcsNDUuOSwyMy4xLDU4LjIsMzMuNkwxOTgsMzIzLjR6Ii8+PHBhdGggZD0iTTIxMS41LDI0NS4xYy0xMi42LTEwLjgtMzguNC0yNC01Ni43LTMxLjVMMTMyLDI0NS43YzE4LjksOSw0My44LDI0LDU0LjksMzQuOEwyMTEuNSwyNDUuMXoiLz48cGF0aCBkPSJNMTgwLDM2Ni42Yy0xOCwzNS4xLTQwLjIsNzEuNC01NS44LDkzLjZsMzUuMSwyOS43YzE4LTMwLDM1LjQtNjIuNCw1MS05My45TDE4MCwzNjYuNnoiLz48L2c+PC9zdmc+")}.mw-ui-icon-wikimedia-quotes:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcXVvdGVzCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Im03IDYgMS0ySDZDMy43OSA0IDIgNi43OSAyIDl2N2g3VjlINWMwLTMgMi0zIDItM203IDNjMC0zIDItMyAyLTNsMS0yaC0yYy0yLjIxIDAtNCAyLjc5LTQgNXY3aDdWOXoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcXVvdGVzCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Im03IDYgMS0ySDZDMy43OSA0IDIgNi43OSAyIDl2N2g3VjlINWMwLTMgMi0zIDItM203IDNjMC0zIDItMyAyLTNsMS0yaC0yYy0yLjIxIDAtNCAyLjc5LTQgNXY3aDdWOXoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-sandbox:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2FuZGJveAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNOCAxMlY5bDYtNiAzIDMtNiA2em0xMC03LTMtMyAyLTIgMyAzek04IDJoMnYySDh6TTQgMmgydjJINHpNMCAzYTEgMSAwIDAgMSAxLTFoMXYySDB6bTAgM2gydjJIMHptMCA0aDJ2Mkgwem0wIDRoMnYySDB6bTAgNGgydjJIMWExIDEgMCAwIDEtMS0xem00IDBoMnYySDR6bTQgMGgydjJIOHptNCAwaDJ2MWExIDEgMCAwIDEtMSAxaC0xem0wLTRoMnYyaC0yeiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2FuZGJveAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNOCAxMlY5bDYtNiAzIDMtNiA2em0xMC03LTMtMyAyLTIgMyAzek04IDJoMnYySDh6TTQgMmgydjJINHpNMCAzYTEgMSAwIDAgMSAxLTFoMXYySDB6bTAgM2gydjJIMHptMCA0aDJ2Mkgwem0wIDRoMnYySDB6bTAgNGgydjJIMWExIDEgMCAwIDEtMS0xem00IDBoMnYySDR6bTQgMGgydjJIOHptNCAwaDJ2MWExIDEgMCAwIDEtMSAxaC0xem0wLTRoMnYyaC0yeiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-wikiText:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJV2lraXRleHQKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEgM3YxNGgzdi0ySDNWNWgxVjN6bTQgMHYxNGg0di0ySDdWNWgyVjN6bTExIDB2MmgxdjEwaC0xdjJoM1Yzem0tNSAwdjJoMnYxMGgtMnYyaDRWM3oiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJV2lraXRleHQKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEgM3YxNGgzdi0ySDNWNWgxVjN6bTQgMHYxNGg0di0ySDdWNWgyVjN6bTExIDB2MmgxdjEwaC0xdjJoM1Yzem0tNSAwdjJoMnYxMGgtMnYyaDRWM3oiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-reference:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcmVmZXJlbmNlCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Im0xNSAxMC0yLjc4LTIuNzhMOS40NCAxMFYxSDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDEwYTIgMiAwIDAgMCAyLTJWM2EyIDIgMCAwIDAtMi0yeiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcmVmZXJlbmNlCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Im0xNSAxMC0yLjc4LTIuNzhMOS40NCAxMFYxSDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDEwYTIgMiAwIDAgMCAyLTJWM2EyIDIgMCAwIDAtMi0yeiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-edit:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWRpdAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJtMTYuNzcgOCAxLjk0LTJhMSAxIDAgMCAwIDAtMS40MWwtMy4zNC0zLjNhMSAxIDAgMCAwLTEuNDEgMEwxMiAzLjIzek0xIDE0LjI1VjE5aDQuNzVsOS45Ni05Ljk2LTQuNzUtNC43NXoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWRpdAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJtMTYuNzcgOCAxLjk0LTJhMSAxIDAgMCAwIDAtMS40MWwtMy4zNC0zLjNhMSAxIDAgMCAwLTEuNDEgMEwxMiAzLjIzek0xIDE0LjI1VjE5aDQuNzVsOS45Ni05Ljk2LTQuNzUtNC43NXoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-editLock:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWRpdCBsb2NrCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xMiAxMmEyIDIgMCAwIDEtMi0yVjUuMjVsLTkgOVYxOWg0Ljc1bDctN3ptNy04aC0uNVYyLjVhMi41IDIuNSAwIDAgMC01IDBWNEgxM2ExIDEgMCAwIDAtMSAxdjRhMSAxIDAgMCAwIDEgMWg2YTEgMSAwIDAgMCAxLTFWNWExIDEgMCAwIDAtMS0xbS0zIDRhMSAxIDAgMSAxIDEtMSAxIDEgMCAwIDEtMSAxbTEuNS00aC0zVjIuNzVDMTQuNSAyIDE0LjUgMSAxNiAxczEuNSAxIDEuNSAxLjc1eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWRpdCBsb2NrCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xMiAxMmEyIDIgMCAwIDEtMi0yVjUuMjVsLTkgOVYxOWg0Ljc1bDctN3ptNy04aC0uNVYyLjVhMi41IDIuNSAwIDAgMC01IDBWNEgxM2ExIDEgMCAwIDAtMSAxdjRhMSAxIDAgMCAwIDEgMWg2YTEgMSAwIDAgMCAxLTFWNWExIDEgMCAwIDAtMS0xbS0zIDRhMSAxIDAgMSAxIDEtMSAxIDEgMCAwIDEtMSAxbTEuNS00aC0zVjIuNzVDMTQuNSAyIDE0LjUgMSAxNiAxczEuNSAxIDEuNSAxLjc1eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-link:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbGluawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNC44MyAxNWgyLjkxYTQuOSA0LjkgMCAwIDEtMS41NS0ySDVhMyAzIDAgMSAxIDAtNmgzYTMgMyAwIDAgMSAyLjgyIDRoMi4xYTUgNSAwIDAgMCAuMDgtLjgzdi0uMzRBNC44MyA0LjgzIDAgMCAwIDguMTcgNUg0LjgzQTQuODMgNC44MyAwIDAgMCAwIDkuODN2LjM0QTQuODMgNC44MyAwIDAgMCA0LjgzIDE1Ii8+PHBhdGggZD0iTTE1LjE3IDVoLTIuOTFhNC45IDQuOSAwIDAgMSAxLjU1IDJIMTVhMyAzIDAgMSAxIDAgNmgtM2EzIDMgMCAwIDEtMi44Mi00aC0yLjFhNSA1IDAgMCAwLS4wOC44M3YuMzRBNC44MyA0LjgzIDAgMCAwIDExLjgzIDE1aDMuMzRBNC44MyA0LjgzIDAgMCAwIDIwIDEwLjE3di0uMzRBNC44MyA0LjgzIDAgMCAwIDE1LjE3IDUiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbGluawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNC44MyAxNWgyLjkxYTQuOSA0LjkgMCAwIDEtMS41NS0ySDVhMyAzIDAgMSAxIDAtNmgzYTMgMyAwIDAgMSAyLjgyIDRoMi4xYTUgNSAwIDAgMCAuMDgtLjgzdi0uMzRBNC44MyA0LjgzIDAgMCAwIDguMTcgNUg0LjgzQTQuODMgNC44MyAwIDAgMCAwIDkuODN2LjM0QTQuODMgNC44MyAwIDAgMCA0LjgzIDE1Ii8+PHBhdGggZD0iTTE1LjE3IDVoLTIuOTFhNC45IDQuOSAwIDAgMSAxLjU1IDJIMTVhMyAzIDAgMSAxIDAgNmgtM2EzIDMgMCAwIDEtMi44Mi00aC0yLjFhNSA1IDAgMCAwLS4wOC44M3YuMzRBNC44MyA0LjgzIDAgMCAwIDExLjgzIDE1aDMuMzRBNC44MyA0LjgzIDAgMCAwIDIwIDEwLjE3di0uMzRBNC44MyA0LjgzIDAgMCAwIDE1LjE3IDUiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-linkExternal:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZXh0ZXJuYWwgbGluawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTcgMTdIM1YzaDVWMUgzYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi01aC0yeiIvPjxwYXRoIGQ9Im0xMSAxIDMuMjkgMy4yOS01LjczIDUuNzMgMS40MiAxLjQyIDUuNzMtNS43M0wxOSA5VjF6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZXh0ZXJuYWwgbGluawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTcgMTdIM1YzaDVWMUgzYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi01aC0yeiIvPjxwYXRoIGQ9Im0xMSAxIDMuMjkgMy4yOS01LjczIDUuNzMgMS40MiAxLjQyIDUuNzMtNS43M0wxOSA5VjF6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-listBullet:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYnVsbGV0IGxpc3QKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTcgMTVoMTJ2Mkg3em0wLTZoMTJ2Mkg3em0wLTZoMTJ2Mkg3eiIvPjxjaXJjbGUgY3g9IjMiIGN5PSI0IiByPSIyIi8+PGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIi8+PGNpcmNsZSBjeD0iMyIgY3k9IjE2IiByPSIyIi8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYnVsbGV0IGxpc3QKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTcgMTVoMTJ2Mkg3em0wLTZoMTJ2Mkg3em0wLTZoMTJ2Mkg3eiIvPjxjaXJjbGUgY3g9IjMiIGN5PSI0IiByPSIyIi8+PGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIi8+PGNpcmNsZSBjeD0iMyIgY3k9IjE2IiByPSIyIi8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-ellipsis:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWxsaXBzaXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjMiIGN5PSIxMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjE3IiBjeT0iMTAiIHI9IjIiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWxsaXBzaXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjMiIGN5PSIxMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjE3IiBjeT0iMTAiIHI9IjIiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-help:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaGVscAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTAuMDYgMUMxMyAxIDE1IDIuODkgMTUgNS41M2E0LjU5IDQuNTkgMCAwIDEtMi4yOSA0LjA4Yy0xLjQyLjkyLTEuODIgMS41My0xLjgyIDIuNzFWMTNIOC4zOHYtLjgxYTMuODQgMy44NCAwIDAgMSAyLTMuODRjMS4zNC0uOSAxLjc5LTEuNTMgMS43OS0yLjcxYTIuMSAyLjEgMCAwIDAtMi4wOC0yLjE0aC0uMTdhMi4zIDIuMyAwIDAgMC0yLjM4IDIuMjJ2LjE3SDVBNC43MSA0LjcxIDAgMCAxIDkuNTEgMWE1IDUgMCAwIDEgLjU1IDAiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjE3IiByPSIyIi8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaGVscAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTAuMDYgMUMxMyAxIDE1IDIuODkgMTUgNS41M2E0LjU5IDQuNTkgMCAwIDEtMi4yOSA0LjA4Yy0xLjQyLjkyLTEuODIgMS41My0xLjgyIDIuNzFWMTNIOC4zOHYtLjgxYTMuODQgMy44NCAwIDAgMSAyLTMuODRjMS4zNC0uOSAxLjc5LTEuNTMgMS43OS0yLjcxYTIuMSAyLjEgMCAwIDAtMi4wOC0yLjE0aC0uMTdhMi4zIDIuMyAwIDAgMC0yLjM4IDIuMjJ2LjE3SDVBNC43MSA0LjcxIDAgMCAxIDkuNTEgMWE1IDUgMCAwIDEgLjU1IDAiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjE3IiByPSIyIi8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-home:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaG9tZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTAgMSAwIDEwaDN2OWg0di00LjZjMC0xLjQ3IDEuMzEtMi42NiAzLTIuNjZzMyAxLjE5IDMgMi42NlYxOWg0di05aDN6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaG9tZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTAgMSAwIDEwaDN2OWg0di00LjZjMC0xLjQ3IDEuMzEtMi42NiAzLTIuNjZzMyAxLjE5IDMgMi42NlYxOWg0di05aDN6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-logIn:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbG9nIGluCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xIDExdjZjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlYzYzAtMS4xLS45LTItMi0ySDNjLTEuMSAwLTIgLjktMiAydjZoOFY1bDQuNzUgNUw5IDE1di00eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbG9nIGluCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xIDExdjZjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlYzYzAtMS4xLS45LTItMi0ySDNjLTEuMSAwLTIgLjktMiAydjZoOFY1bDQuNzUgNUw5IDE1di00eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-logOut:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbG9nIG91dAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMyAzaDhWMUgzYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmg4di0ySDN6Ii8+PHBhdGggZD0iTTEzIDV2NEg1djJoOHY0bDYtNXoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbG9nIG91dAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMyAzaDhWMUgzYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmg4di0ySDN6Ii8+PHBhdGggZD0iTTEzIDV2NEg1djJoOHY0bDYtNXoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-printer:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcHJpbnRlcgoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNSAxaDEwdjRINXpNMyA2YTIgMiAwIDAgMC0yIDJ2N2g0djRoMTB2LTRoNFY4YTIgMiAwIDAgMC0yLTJ6bTExIDEySDZ2LTZoOHptMi04YTEgMSAwIDEgMSAxLTEgMSAxIDAgMCAxLTEgMSIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcHJpbnRlcgoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNNSAxaDEwdjRINXpNMyA2YTIgMiAwIDAgMC0yIDJ2N2g0djRoMTB2LTRoNFY4YTIgMiAwIDAgMC0yLTJ6bTExIDEySDZ2LTZoOHptMi04YTEgMSAwIDEgMSAxLTEgMSAxIDAgMCAxLTEgMSIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-reload:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcmVsb2FkCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xNS42NSA0LjM1QTggOCAwIDEgMCAxNy40IDEzaC0yLjIyYTYgNiAwIDEgMS0xLTcuMjJMMTEgOWg3VjJ6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcmVsb2FkCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xNS42NSA0LjM1QTggOCAwIDEgMCAxNy40IDEzaC0yLjIyYTYgNiAwIDEgMS0xLTcuMjJMMTEgOWg3VjJ6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-search:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2VhcmNoCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xMi4yIDEzLjZhNyA3IDAgMSAxIDEuNC0xLjRsNS40IDUuNC0xLjQgMS40ek0zIDhhNSA1IDAgMSAwIDEwIDBBNSA1IDAgMCAwIDMgOCIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc2VhcmNoCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xMi4yIDEzLjZhNyA3IDAgMSAxIDEuNC0xLjRsNS40IDUuNC0xLjQgMS40ek0zIDhhNSA1IDAgMSAwIDEwIDBBNSA1IDAgMCAwIDMgOCIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-settings:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHRpdGxlPgoJCXNldHRpbmdzCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAxMCkiPjxwYXRoIGlkPSJhIiBkPSJNMS41LTEwaC0zbC0xIDYuNWg1bTAgN2gtNWwxIDYuNWgzIi8+PHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoOTApIi8+PHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1KSIvPjwvZz48cGF0aCBkPSJNMTAgMi41YTcuNSA3LjUgMCAwIDAgMCAxNSA3LjUgNy41IDAgMCAwIDAtMTV2NGEzLjUgMy41IDAgMCAxIDAgNyAzLjUgMy41IDAgMCAxIDAtNyIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHRpdGxlPgoJCXNldHRpbmdzCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAxMCkiPjxwYXRoIGlkPSJhIiBkPSJNMS41LTEwaC0zbC0xIDYuNWg1bTAgN2gtNWwxIDYuNWgzIi8+PHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIi8+PHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoOTApIi8+PHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1KSIvPjwvZz48cGF0aCBkPSJNMTAgMi41YTcuNSA3LjUgMCAwIDAgMCAxNSA3LjUgNy41IDAgMCAwIDAtMTV2NGEzLjUgMy41IDAgMCAxIDAgNyAzLjUgMy41IDAgMCAxIDAtNyIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-recentChanges:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcmVjZW50IGNoYW5nZXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEgM2gxNnYySDF6bTAgNmgxMXYySDF6bTAgNmg3djJIMXptMTcuOC0zLjEgMS0xLjFhLjYuNiAwIDAgMCAwLS44TDE4IDguMmEuNi42IDAgMCAwLS44IDBsLTEgMXptLTMuMy0yTDEwIDE1LjNWMThoMi42bDUuNi01LjUtMi43LTIuN1oiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcmVjZW50IGNoYW5nZXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEgM2gxNnYySDF6bTAgNmgxMXYySDF6bTAgNmg3djJIMXptMTcuOC0zLjEgMS0xLjFhLjYuNiAwIDAgMCAwLS44TDE4IDguMmEuNi42IDAgMCAwLS44IDBsLTEgMXptLTMuMy0yTDEwIDE1LjNWMThoMi42bDUuNi01LjUtMi43LTIuN1oiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-image:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaW1hZ2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTIgMmEyIDIgMCAwIDAtMiAydjEyYTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMlY0YTIgMiAwIDAgMC0yLTJ6bS0uMTcgMTMgNC4wOS01LjI1IDIuOTIgMy41MUwxMi45MiA4bDUuMjUgN3oiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaW1hZ2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTIgMmEyIDIgMCAwIDAtMiAydjEyYTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMlY0YTIgMiAwIDAgMC0yLTJ6bS0uMTcgMTMgNC4wOS01LjI1IDIuOTIgMy41MUwxMi45MiA4bDUuMjUgN3oiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-imageGallery:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaW1hZ2UgZ2FsbGVyeQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMyA1YTIgMiAwIDAgMC0yIDJ2MTBhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0yVjdhMiAyIDAgMCAwLTItMnptMCAxMSAzLjUtNC41IDIuNSAzIDMuNS00LjUgNC41IDZ6TTE2IDJhMiAyIDAgMCAxIDIgMkgyYTIgMiAwIDAgMSAyLTJ6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJaW1hZ2UgZ2FsbGVyeQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMyA1YTIgMiAwIDAgMC0yIDJ2MTBhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0yVjdhMiAyIDAgMCAwLTItMnptMCAxMSAzLjUtNC41IDIuNSAzIDMuNS00LjUgNC41IDZ6TTE2IDJhMiAyIDAgMCAxIDIgMkgyYTIgMiAwIDAgMSAyLTJ6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-block:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYmxvY2sKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEwIDFhOSA5IDAgMSAwIDkgOSA5IDkgMCAwIDAtOS05bTUgMTBINVY5aDEweiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYmxvY2sKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEwIDFhOSA5IDAgMSAwIDkgOSA5IDkgMCAwIDAtOS05bTUgMTBINVY5aDEweiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-lock:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbG9jawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTYuMDcgOEgxNVY1czAtNS01LTUtNSA1LTUgNXYzSDMuOTNBMS45MyAxLjkzIDAgMCAwIDIgOS45M3Y4LjE1QTEuOTMgMS45MyAwIDAgMCAzLjkzIDIwaDEyLjE0QTEuOTMgMS45MyAwIDAgMCAxOCAxOC4wN1Y5LjkzQTEuOTMgMS45MyAwIDAgMCAxNi4wNyA4TTEwIDE2YTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMm0zLThIN1Y1LjVDNyA0IDcgMiAxMCAyczMgMiAzIDMuNXoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbG9jawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTYuMDcgOEgxNVY1czAtNS01LTUtNSA1LTUgNXYzSDMuOTNBMS45MyAxLjkzIDAgMCAwIDIgOS45M3Y4LjE1QTEuOTMgMS45MyAwIDAgMCAzLjkzIDIwaDEyLjE0QTEuOTMgMS45MyAwIDAgMCAxOCAxOC4wN1Y5LjkzQTEuOTMgMS45MyAwIDAgMCAxNi4wNyA4TTEwIDE2YTIgMiAwIDEgMSAyLTIgMiAyIDAgMCAxLTIgMm0zLThIN1Y1LjVDNyA0IDcgMiAxMCAyczMgMiAzIDMuNXoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-unLock:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdW4tbG9jawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTUgOFY1czAtNS01LTVhNC42MyA0LjYzIDAgMCAwLTQuODggNGgyQzcuMzEgMi45MyA4IDIgMTAgMmMzIDAgMyAyIDMgMy41VjhIMy45M0ExLjkzIDEuOTMgMCAwIDAgMiA5LjkzdjguMTVBMS45MyAxLjkzIDAgMCAwIDMuOTMgMjBoMTIuMTRBMS45MyAxLjkzIDAgMCAwIDE4IDE4LjA3VjkuOTNBMS45MyAxLjkzIDAgMCAwIDE2LjA3IDh6bS01IDhhMiAyIDAgMSAxIDItMiAyIDIgMCAwIDEtMiAyIi8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdW4tbG9jawoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMTUgOFY1czAtNS01LTVhNC42MyA0LjYzIDAgMCAwLTQuODggNGgyQzcuMzEgMi45MyA4IDIgMTAgMmMzIDAgMyAyIDMgMy41VjhIMy45M0ExLjkzIDEuOTMgMCAwIDAgMiA5LjkzdjguMTVBMS45MyAxLjkzIDAgMCAwIDMuOTMgMjBoMTIuMTRBMS45MyAxLjkzIDAgMCAwIDE4IDE4LjA3VjkuOTNBMS45MyAxLjkzIDAgMCAwIDE2LjA3IDh6bS01IDhhMiAyIDAgMSAxIDItMiAyIDIgMCAwIDEtMiAyIi8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-star:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc3RhcgoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMjAgN2gtN0wxMCAuNSA3IDdIMGw1LjQ2IDUuNDctMS42NCA3IDYuMTgtMy43IDYuMTggMy43My0xLjYzLTd6bS0xMCA2LjktMy43NiAyLjI3IDEtNC4yOEwzLjUgOC41aDQuNjFMMTAgNC42bDEuOSAzLjloNC42bC0zLjczIDMuNCAxIDQuMjh6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJc3RhcgoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMjAgN2gtN0wxMCAuNSA3IDdIMGw1LjQ2IDUuNDctMS42NCA3IDYuMTgtMy43IDYuMTggMy43My0xLjYzLTd6bS0xMCA2LjktMy43NiAyLjI3IDEtNC4yOEwzLjUgOC41aDQuNjFMMTAgNC42bDEuOSAzLjloNC42bC0zLjczIDMuNCAxIDQuMjh6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-unStar:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdW4tc3RhcgoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMjAgN2gtN0wxMCAuNSA3IDdIMGw1LjQ2IDUuNDctMS42NCA3IDYuMTgtMy43IDYuMTggMy43My0xLjYzLTd6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdW4tc3RhcgoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMjAgN2gtN0wxMCAuNSA3IDdIMGw1LjQ2IDUuNDctMS42NCA3IDYuMTgtMy43IDYuMTggMy43My0xLjYzLTd6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-trash:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdHJhc2gKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTE3IDJoLTMuNWwtMS0xaC01bC0xIDFIM3YyaDE0ek00IDE3YTIgMiAwIDAgMCAyIDJoOGEyIDIgMCAwIDAgMi0yVjVINHoiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdHJhc2gKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTE3IDJoLTMuNWwtMS0xaC01bC0xIDFIM3YyaDE0ek00IDE3YTIgMiAwIDAgMCAyIDJoOGEyIDIgMCAwIDAgMi0yVjVINHoiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-arrowPrevious:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcHJldmlvdXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTUuODMgOSA1LjU4LTUuNThMMTAgMmwtOCA4IDggOCAxLjQxLTEuNDFMNS44MyAxMUgxOFY5eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJcHJldmlvdXMKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTUuODMgOSA1LjU4LTUuNThMMTAgMmwtOCA4IDggOCAxLjQxLTEuNDFMNS44MyAxMUgxOFY5eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-collapse:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-move:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbW92ZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJtMTkgMTAtNC0zdjJoLTRWNWgybC0zLTQtMyA0aDJ2NEg1VjdsLTQgMyA0IDN2LTJoNHY0SDdsMyA0IDMtNGgtMnYtNGg0djJ6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJbW92ZQoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJtMTkgMTAtNC0zdjJoLTRWNWgybC0zLTQtMyA0aDJ2NEg1VjdsLTQgMyA0IDN2LTJoNHY0SDdsMyA0IDMtNGgtMnYtNGg0djJ6Ii8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-userAdd:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYWRkIHVzZXIKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PGNpcmNsZSBjeD0iOC41IiBjeT0iMTAuNSIgcj0iMy41Ii8+PHBhdGggZD0iTTE0IDB2NGgtNHYyaDR2NGgyVjZoNFY0aC00VjB6TTggMTVjLTQuNiAwLTcgMi42OS03IDQuMjNWMjBoMTR2LS43N0MxNSAxNy42OSAxMi42IDE1IDggMTUiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJYWRkIHVzZXIKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PGNpcmNsZSBjeD0iOC41IiBjeT0iMTAuNSIgcj0iMy41Ii8+PHBhdGggZD0iTTE0IDB2NGgtNHYyaDR2NGgyVjZoNFY0aC00VjB6TTggMTVjLTQuNiAwLTcgMi42OS03IDQuMjNWMjBoMTR2LS43N0MxNSAxNy42OSAxMi42IDE1IDggMTUiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-userAvatar:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciBhdmF0YXIKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEwIDExYy01LjkyIDAtOCAzLTggNXYzaDE2di0zYzAtMi0yLjA4LTUtOC01Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSI1LjUiIHI9IjQuNSIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciBhdmF0YXIKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTEwIDExYy01LjkyIDAtOCAzLTggNXYzaDE2di0zYzAtMi0yLjA4LTUtOC01Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSI1LjUiIHI9IjQuNSIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-userContributions:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciBjb250cmlidXRpb25zCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxjaXJjbGUgY3g9IjE1LjUiIGN5PSIxMC41IiByPSIyLjUiLz48cGF0aCBkPSJNMSAxNWg4djJIMVptMC02aDEwdjJIMVptMC02aDE2djJIMVptMTQuNSAxMC42Yy0zLjMgMC00LjUgMS42LTQuNSAyLjdWMThoOXYtMS43YzAtMS0xLjItMi43LTQuNS0yLjciLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciBjb250cmlidXRpb25zCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxjaXJjbGUgY3g9IjE1LjUiIGN5PSIxMC41IiByPSIyLjUiLz48cGF0aCBkPSJNMSAxNWg4djJIMVptMC02aDEwdjJIMVptMC02aDE2djJIMVptMTQuNSAxMC42Yy0zLjMgMC00LjUgMS42LTQuNSAyLjdWMThoOXYtMS43YzAtMS0xLjItMi43LTQuNS0yLjciLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-userGroup:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciBncm91cAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iMyIvPjxjaXJjbGUgY3g9IjE0IiBjeT0iNiIgcj0iMyIvPjxwYXRoIGQ9Ik0xNCAxMGMzLjMxIDAgNiAxLjc5IDYgNHYyaC02di0yYzAtMS40OC0xLjIxLTIuNzctMy0zLjQ2Ljg4LS4zNSAxLjkxLS41NCAzLS41NG0tOCAwYzMuMzEgMCA2IDEuNzkgNiA0djJIMHYtMmMwLTIuMjEgMi42OS00IDYtNCIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciBncm91cAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iMyIvPjxjaXJjbGUgY3g9IjE0IiBjeT0iNiIgcj0iMyIvPjxwYXRoIGQ9Ik0xNCAxMGMzLjMxIDAgNiAxLjc5IDYgNHYyaC02di0yYzAtMS40OC0xLjIxLTIuNzctMy0zLjQ2Ljg4LS4zNSAxLjkxLS41NCAzLS41NG0tOCAwYzMuMzEgMCA2IDEuNzkgNiA0djJIMHYtMmMwLTIuMjEgMi42OS00IDYtNCIvPjwvZz48L3N2Zz4K")}.mw-ui-icon-wikimedia-userTalk:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciB0YWxrCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xOCAwSDJhMiAyIDAgMCAwLTIgMnYxOGw0LTRoMTRhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJtLTQgNGExLjUgMS41IDAgMSAxLTEuNSAxLjVBMS41IDEuNSAwIDAgMSAxNCA0TTYgNGExLjUgMS41IDAgMSAxLTEuNSAxLjVBMS41IDEuNSAwIDAgMSA2IDRtNCA4Yy0yLjYxIDAtNC44My0uNjctNS42NS0zaDExLjNjLS44MiAyLjMzLTMuMDQgMy01LjY1IDMiLz48L2c+PC9zdmc+Cg==");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJdXNlciB0YWxrCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xOCAwSDJhMiAyIDAgMCAwLTIgMnYxOGw0LTRoMTRhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJtLTQgNGExLjUgMS41IDAgMSAxLTEuNSAxLjVBMS41IDEuNSAwIDAgMSAxNCA0TTYgNGExLjUgMS41IDAgMSAxLTEuNSAxLjVBMS41IDEuNSAwIDAgMSA2IDRtNCA4Yy0yLjYxIDAtNC44My0uNjctNS42NS0zaDExLjNjLS44MiAyLjMzLTMuMDQgMy01LjY1IDMiLz48L2c+PC9zdmc+Cg==")}.mw-ui-icon-wikimedia-watchlist:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJd2F0Y2hsaXN0Cgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xIDNoMTZ2MkgxWm0wIDZoNnYySDFabTAgNmg4djJIMVptOC00LjI0aDMuODVMMTQuNSA3bDEuNjUgMy43NkgyMGwtMyAzLjE3LjkgNC4wNS0zLjQtMi4xNEwxMS4xIDE4bC45LTQuMDVaIi8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJd2F0Y2hsaXN0Cgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0xIDNoMTZ2MkgxWm0wIDZoNnYySDFabTAgNmg4djJIMVptOC00LjI0aDMuODVMMTQuNSA3bDEuNjUgMy43NkgyMGwtMyAzLjE3LjkgNC4wNS0zLjQtMi4xNEwxMS4xIDE4bC45LTQuMDVaIi8+PC9nPjwvc3ZnPgo=")}.mw-ui-icon-wikimedia-logoWikidata:before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgc3Ryb2tlLXdpZHRoPSIzMC4yIiB2aWV3Qm94PSIwIDAgMjAgMjAiPjx0aXRsZT4KCQlXaWtpZGF0YSBsb2dvCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0wIDR2MTIuMjU4aC43NDJWNHptMS40ODIgMHYxMi4yNThoMi4yMjNWNHptMi45NiAwdjEyLjI1OEg2LjY3VjR6bTIuOTY0IDB2MTIuMjU4aC43NDRWNHptMS40OCAwdjEyLjI1OGguNzQ1VjR6bTEuNDgzIDB2MTIuMjU4aDIuMjI0VjR6bTIuOTYyIDB2MTIuMjU4aC43NDJWNHptMS40ODIgMHYxMi4yNThoMi4yMjNWNHptMi45NiAwdjEyLjI1OGguNzQ0VjR6bTEuNDg0IDB2MTIuMjU4SDIwVjR6Ii8+PC9nPjwvc3ZnPgo=");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgc3Ryb2tlLXdpZHRoPSIzMC4yIiB2aWV3Qm94PSIwIDAgMjAgMjAiPjx0aXRsZT4KCQlXaWtpZGF0YSBsb2dvCgk8L3RpdGxlPjxnIGZpbGw9IiMwMDAiPjxwYXRoIGQ9Ik0wIDR2MTIuMjU4aC43NDJWNHptMS40ODIgMHYxMi4yNThoMi4yMjNWNHptMi45NiAwdjEyLjI1OEg2LjY3VjR6bTIuOTY0IDB2MTIuMjU4aC43NDRWNHptMS40OCAwdjEyLjI1OGguNzQ1VjR6bTEuNDgzIDB2MTIuMjU4aDIuMjI0VjR6bTIuOTYyIDB2MTIuMjU4aC43NDJWNHptMS40ODIgMHYxMi4yNThoMi4yMjNWNHptMi45NiAwdjEyLjI1OGguNzQ0VjR6bTEuNDg0IDB2MTIuMjU4SDIwVjR6Ii8+PC9nPjwvc3ZnPgo=")}@media (prefers-reduced-motion:reduce){*,::before,::after{animation-delay:-0.01ms !important;animation-duration:0.01ms !important;animation-iteration-count:1 !important;scroll-behavior:auto !important;transition-duration:0ms !important}}body{margin:0}main{display:block}hr{box-sizing:content-box;height:0;overflow:visible}abbr[title]{border-bottom:1px dotted;cursor:help}@supports (text-decoration:underline dotted){abbr[title]{border-bottom:0;text-decoration:underline dotted}}pre,code,tt,kbd,samp{font-family:monospace,monospace}sub,sup{line-height:1}img{border:0}figure{margin:0}button,input,optgroup,select,textarea{margin:0}button::-moz-focus-inner,[type='button']::-moz-focus-inner,[type='reset']::-moz-focus-inner,[type='submit']::-moz-focus-inner{border-style:none;padding:0}legend{color:inherit;padding:0}@media screen{.mw-body-content::after{clear:both;content:'';display:block}.mw-body-content a.external.free{word-wrap:break-word}.mw-body-content .error{font-size:larger;color:var(--color-error,#d73333)}.rtl .mw-parser-output a.external.free,.rtl .mw-parser-output a.external.autonumber{direction:ltr;unicode-bidi:embed}.mw-hide-empty-elt .mw-parser-output:not(.mw-show-empty-elt) .mw-empty-elt{display:none}.emptyPortlet{display:none}.printfooter,.client-nojs #t-print{display:none}.noresize{max-width:100%;overflow-x:auto}@counter-style meetei{system:numeric;symbols:'\\ABF0' '\\ABF1' '\\ABF2' '\\ABF3' '\\ABF4' '\\ABF5' '\\ABF6' '\\ABF7' '\\ABF8' '\\ABF9';suffix:') '}@counter-style santali{system:numeric;symbols:'\\1C50' '\\1C51' '\\1C52' '\\1C53' '\\1C54' '\\1C55' '\\1C56' '\\1C57' '\\1C58' '\\1C59'}@counter-style myanmar_with_period{system:numeric;symbols:'\\1040' '\\1041' '\\1042' '\\1043' '\\1044' '\\1045' '\\1046' '\\1047' '\\1048' '\\1049';suffix:'\\104B\\0020'}ol:lang(azb) li,ol:lang(bcc) li,ol:lang(bgn) li,ol:lang(bqi) li,ol:lang(fa) li,ol:lang(glk) li,ol:lang(kk-arab) li,ol:lang(lrc) li,ol:lang(luz) li,ol:lang(mzn) li{list-style-type:persian}ol:lang(ckb) li,ol:lang(sdh) li{list-style-type:arabic-indic}ol:lang(hi) li,ol:lang(mai) li,ol:lang(mr) li,ol:lang(ne) li{list-style-type:devanagari}ol:lang(as) li,ol:lang(bn) li{list-style-type:bengali}ol:lang(mni) li{list-style-type:meetei}ol:lang(or) li{list-style-type:oriya}ol:lang(sat) li{list-style-type:santali}ol:lang(blk) li,ol:lang(kjp) li,ol:lang(ksw) li,ol:lang(mnw) li,ol:lang(my) li,ol:lang(shn) li{list-style-type:myanmar_with_period}.mw-heading1:lang(anp),.mw-heading1:lang(as),.mw-heading1:lang(awa),.mw-heading1:lang(bgc),.mw-heading1:lang(bh),.mw-heading1:lang(bho),.mw-heading1:lang(blk),.mw-heading1:lang(bn),.mw-heading1:lang(bo),.mw-heading1:lang(bpy),.mw-heading1:lang(ccp),.mw-heading1:lang(dty),.mw-heading1:lang(dz),.mw-heading1:lang(gom),.mw-heading1:lang(gu),.mw-heading1:lang(hi),.mw-heading1:lang(kjp),.mw-heading1:lang(km),.mw-heading1:lang(kn),.mw-heading1:lang(ks),.mw-heading1:lang(ksw),.mw-heading1:lang(mag),.mw-heading1:lang(mai),.mw-heading1:lang(ml),.mw-heading1:lang(mnw),.mw-heading1:lang(mr),.mw-heading1:lang(my),.mw-heading1:lang(new),.mw-heading1:lang(nit),.mw-heading1:lang(nod),.mw-heading1:lang(or),.mw-heading1:lang(pa),.mw-heading1:lang(pi),.mw-heading1:lang(rki),.mw-heading1:lang(sa),.mw-heading1:lang(shn),.mw-heading1:lang(si),.mw-heading1:lang(syl),.mw-heading1:lang(ta),.mw-heading1:lang(tcy),.mw-heading1:lang(tdd),.mw-heading1:lang(te),h1:lang(anp),h1:lang(as),h1:lang(awa),h1:lang(bgc),h1:lang(bh),h1:lang(bho),h1:lang(blk),h1:lang(bn),h1:lang(bo),h1:lang(bpy),h1:lang(ccp),h1:lang(dty),h1:lang(dz),h1:lang(gom),h1:lang(gu),h1:lang(hi),h1:lang(kjp),h1:lang(km),h1:lang(kn),h1:lang(ks),h1:lang(ksw),h1:lang(mag),h1:lang(mai),h1:lang(ml),h1:lang(mnw),h1:lang(mr),h1:lang(my),h1:lang(new),h1:lang(nit),h1:lang(nod),h1:lang(or),h1:lang(pa),h1:lang(pi),h1:lang(rki),h1:lang(sa),h1:lang(shn),h1:lang(si),h1:lang(syl),h1:lang(ta),h1:lang(tcy),h1:lang(tdd),h1:lang(te){line-height:1.6em !important}.mw-heading:lang(anp),.mw-heading:lang(as),.mw-heading:lang(awa),.mw-heading:lang(bgc),.mw-heading:lang(bh),.mw-heading:lang(bho),.mw-heading:lang(blk),.mw-heading:lang(bn),.mw-heading:lang(bo),.mw-heading:lang(bpy),.mw-heading:lang(ccp),.mw-heading:lang(dty),.mw-heading:lang(dz),.mw-heading:lang(gom),.mw-heading:lang(gu),.mw-heading:lang(hi),.mw-heading:lang(kjp),.mw-heading:lang(km),.mw-heading:lang(kn),.mw-heading:lang(ks),.mw-heading:lang(ksw),.mw-heading:lang(mag),.mw-heading:lang(mai),.mw-heading:lang(ml),.mw-heading:lang(mnw),.mw-heading:lang(mr),.mw-heading:lang(my),.mw-heading:lang(new),.mw-heading:lang(nit),.mw-heading:lang(nod),.mw-heading:lang(or),.mw-heading:lang(pa),.mw-heading:lang(pi),.mw-heading:lang(rki),.mw-heading:lang(sa),.mw-heading:lang(shn),.mw-heading:lang(si),.mw-heading:lang(syl),.mw-heading:lang(ta),.mw-heading:lang(tcy),.mw-heading:lang(tdd),.mw-heading:lang(te),h2:lang(anp),h2:lang(as),h2:lang(awa),h2:lang(bgc),h2:lang(bh),h2:lang(bho),h2:lang(blk),h2:lang(bn),h2:lang(bo),h2:lang(bpy),h2:lang(ccp),h2:lang(dty),h2:lang(dz),h2:lang(gom),h2:lang(gu),h2:lang(hi),h2:lang(kjp),h2:lang(km),h2:lang(kn),h2:lang(ks),h2:lang(ksw),h2:lang(mag),h2:lang(mai),h2:lang(ml),h2:lang(mnw),h2:lang(mr),h2:lang(my),h2:lang(new),h2:lang(nit),h2:lang(nod),h2:lang(or),h2:lang(pa),h2:lang(pi),h2:lang(rki),h2:lang(sa),h2:lang(shn),h2:lang(si),h2:lang(syl),h2:lang(ta),h2:lang(tcy),h2:lang(tdd),h2:lang(te),h3:lang(anp),h3:lang(as),h3:lang(awa),h3:lang(bgc),h3:lang(bh),h3:lang(bho),h3:lang(blk),h3:lang(bn),h3:lang(bo),h3:lang(bpy),h3:lang(ccp),h3:lang(dty),h3:lang(dz),h3:lang(gom),h3:lang(gu),h3:lang(hi),h3:lang(kjp),h3:lang(km),h3:lang(kn),h3:lang(ks),h3:lang(ksw),h3:lang(mag),h3:lang(mai),h3:lang(ml),h3:lang(mnw),h3:lang(mr),h3:lang(my),h3:lang(new),h3:lang(nit),h3:lang(nod),h3:lang(or),h3:lang(pa),h3:lang(pi),h3:lang(rki),h3:lang(sa),h3:lang(shn),h3:lang(si),h3:lang(syl),h3:lang(ta),h3:lang(tcy),h3:lang(tdd),h3:lang(te),h4:lang(anp),h4:lang(as),h4:lang(awa),h4:lang(bgc),h4:lang(bh),h4:lang(bho),h4:lang(blk),h4:lang(bn),h4:lang(bo),h4:lang(bpy),h4:lang(ccp),h4:lang(dty),h4:lang(dz),h4:lang(gom),h4:lang(gu),h4:lang(hi),h4:lang(kjp),h4:lang(km),h4:lang(kn),h4:lang(ks),h4:lang(ksw),h4:lang(mag),h4:lang(mai),h4:lang(ml),h4:lang(mnw),h4:lang(mr),h4:lang(my),h4:lang(new),h4:lang(nit),h4:lang(nod),h4:lang(or),h4:lang(pa),h4:lang(pi),h4:lang(rki),h4:lang(sa),h4:lang(shn),h4:lang(si),h4:lang(syl),h4:lang(ta),h4:lang(tcy),h4:lang(tdd),h4:lang(te),h5:lang(anp),h5:lang(as),h5:lang(awa),h5:lang(bgc),h5:lang(bh),h5:lang(bho),h5:lang(blk),h5:lang(bn),h5:lang(bo),h5:lang(bpy),h5:lang(ccp),h5:lang(dty),h5:lang(dz),h5:lang(gom),h5:lang(gu),h5:lang(hi),h5:lang(kjp),h5:lang(km),h5:lang(kn),h5:lang(ks),h5:lang(ksw),h5:lang(mag),h5:lang(mai),h5:lang(ml),h5:lang(mnw),h5:lang(mr),h5:lang(my),h5:lang(new),h5:lang(nit),h5:lang(nod),h5:lang(or),h5:lang(pa),h5:lang(pi),h5:lang(rki),h5:lang(sa),h5:lang(shn),h5:lang(si),h5:lang(syl),h5:lang(ta),h5:lang(tcy),h5:lang(tdd),h5:lang(te),h6:lang(anp),h6:lang(as),h6:lang(awa),h6:lang(bgc),h6:lang(bh),h6:lang(bho),h6:lang(blk),h6:lang(bn),h6:lang(bo),h6:lang(bpy),h6:lang(ccp),h6:lang(dty),h6:lang(dz),h6:lang(gom),h6:lang(gu),h6:lang(hi),h6:lang(kjp),h6:lang(km),h6:lang(kn),h6:lang(ks),h6:lang(ksw),h6:lang(mag),h6:lang(mai),h6:lang(ml),h6:lang(mnw),h6:lang(mr),h6:lang(my),h6:lang(new),h6:lang(nit),h6:lang(nod),h6:lang(or),h6:lang(pa),h6:lang(pi),h6:lang(rki),h6:lang(sa),h6:lang(shn),h6:lang(si),h6:lang(syl),h6:lang(ta),h6:lang(tcy),h6:lang(tdd),h6:lang(te){line-height:1.4em}.mw-heading1:lang(ne),h1:lang(ne){line-height:1.9}.mw-heading2:lang(th),.mw-heading2:lang(ne),h2:lang(th),h2:lang(ne){line-height:1.6}}@media print{.mw-parser-output a.external{}.mw-parser-output a.external.text::after,.mw-parser-output a.external.autonumber::after{content:' (' attr(href) ')';word-break:break-all;word-wrap:break-word}.mw-parser-output a.external.text[href^='//']:after,.mw-parser-output a.external.autonumber[href^='//']:after{content:' (https:' attr(href) ')'}.mw-editsection,.mw-editsection-like,.mw-indicators,#siteNotice,.usermessage{display:none}.printfooter{clear:both;padding:1em 0}}:root{--border-radius-medium:calc(var(--border-radius-base) * 2);--border-radius-large:calc(var(--border-radius-base) * 3);--box-shadow-border:var(--border-color-base) 0 0 0 1px;--filter-invert-fixed:invert(1) hue-rotate(180deg);--filter-image-brightness:none;--font-family-citizen-base:'Roboto','Roboto-fallback';--font-family-citizen-serif:'Roboto Serif';--font-family-citizen-monospace:'Roboto Mono';--font-family-language-base:'';--font-family-language-serif:'';--font-family-language-monospace:'';--size-icon:1.25rem;--toolbar-size:2.5rem;--height-sticky-header:0px;--header-size:3.5rem;--header-card-maxheight:calc(100dvh - var(--header-size) - var(--space-xs) * 2);--overflow-gradient-size:2rem;--width-layout:1080px;--width-layout--extended:calc(var(--width-layout) * 1.5);--width-toc:240px;--width-page:1080px;--padding-page:16px;--space-unit:1rem;--space-xxs:calc(0.25 * var(--space-unit));--space-xs:calc(0.5 * var(--space-unit));--space-sm:calc(0.75 * var(--space-unit));--space-md:var(--space-unit);--space-lg:calc(1.25 * var(--space-unit));--space-xl:calc(1.5 * var(--space-unit));--space-xxl:calc(2 * var(--space-unit));--transition-timing-function-ease:cubic-bezier(0.2,0,0,1);--transition-timing-function-ease-in:cubic-bezier(0.3,0,0.8,0.15);--transition-timing-function-ease-out:cubic-bezier(0.05,0.7,0.1,1);--transform-image-hover:scale(1.1);--citizen-clip-expand-up:inset(100% 0 0 0);--citizen-clip-expand-down:inset(0 0 100% 0);--citizen-clip-expand-right:inset(0 100% 0 0);--citizen-clip-expand-left:inset(0 0 0 100%);--citizen-translate-expand-up:translateY(var(--space-xs));--citizen-translate-expand-down:translateY(calc(var(--space-xs) * -1));--citizen-translate-expand-right:translateX(calc(var(--space-xs) * -1));--citizen-translate-expand-left:translateX(var(--space-xs));--border-base:var(--border-width-base) solid var(--border-color-base);--border-subtle:var(--border-width-base) solid var(--border-color-subtle);--border-width-base:1px;--border-width-thick:2px;--border-radius-base:4px;--border-radius-sharp:0;--border-radius-pill:9999px;--border-radius-circle:50%;--box-shadow-small:0 0 0 1px var(--border-color-base);--box-shadow-medium:0 0.5px 0.6px var(--box-shadow-color-alpha-base),0 1.6px 1.8px -0.8px var(--box-shadow-color-alpha-base),0 4px 4.5px -1.7px var(--box-shadow-color-alpha-base),0 9.800000000000001px 11px -2.5px var(--box-shadow-color-alpha-base);--box-shadow-large:0 0.5px 0.6px var(--box-shadow-color-alpha-base),0 2.8px 3.1px -0.4px var(--box-shadow-color-alpha-base),0 5.3px 6px -0.7px var(--box-shadow-color-alpha-base),0 8.699999999999999px 9.800000000000001px -1.1px var(--box-shadow-color-alpha-base),0 13.9px 15.6px -1.4px var(--box-shadow-color-alpha-base),0 21.8px 24.5px -1.8px var(--box-shadow-color-alpha-base);--font-family-base:var(--font-family-citizen-base),var(--font-family-language-base),system-ui,-apple-system,sans-serif;--font-family-serif:var(--font-family-citizen-serif),var(--font-family-language-serif),'Linux Libertine','Georgia','Times','Source Serif Pro',serif;--font-family-monospace:var(--font-family-citizen-monospace),var(--font-family-language-monospace),'Menlo','Consolas','Liberation Mono','Fira Code','Courier New',monospace;--font-weight-normal:400;--font-weight-medium:calc(var(--font-weight-normal) + 100);--font-weight-semi-bold:calc(var(--font-weight-normal) + 200);--font-weight-bold:calc(var(--font-weight-normal) + 300);--font-family-overline:var(--font-family-base);--font-weight-overline:var(--font-weight-medium);--font-size-overline:var(--font-size-small);--line-height-overline:var(--line-height-small);--text-transform-overline:none;--letter-spacing-overline:normal;--citizen-clip-closed:var(--citizen-clip-expand-up);--citizen-translate-closed:var(--citizen-translate-expand-up);--header-direction:row;--header-size-inline-start:0px;--header-size-inline-end:0px;--header-size-block-start:0px;--header-size-block-end:0px;--header-inset-block-start:0px;--header-inset-block-end:0px;--header-inset-inline-start:0px;--header-inset-inline-end:0px;--header-border-block-start-width:0px;--header-border-block-end-width:0px;--header-border-inline-start-width:0px;--header-border-inline-end-width:0px;--header-offset-block-start:var(--header-size-block-start);--header-offset-block-end:var(--header-size-block-end);--color-primary__h:var(--color-progressive-hsl__h);--color-primary__s:var(--color-progressive-hsl__s);--color-primary__l:var(--color-progressive-hsl__l);--font-size-base:var(--font-size-medium);--line-height:1.6;--line-height-xxx-small:1.25;--line-height-xx-small:1.375;--box-shadow-drop-small:var(--box-shadow-small);--box-shadow-drop-medium:var(--box-shadow-medium);--box-shadow-drop-xx-large:var(--box-shadow-large)}@media (min-width:640px){:root{--padding-page:calc(16px * 1.5)}}@media (min-width:1120px){:root{--padding-page:calc(16px * 2)}}@media (prefers-contrast:more){:root{--font-weight-normal:500}}@media (prefers-contrast:less){:root{--font-weight-normal:300}}@media (max-width:1119.98px){:root{--header-direction:row;--header-inset-inline-start:0px;--header-inset-inline-end:0px;--header-size-block-end:var(--header-size);--header-inset-block-start:auto;--header-inset-block-end:0px;--header-border-block-start-width:var(--border-width-base)}}@media (max-width:1119.98px){:root.citizen-header-position-mobile-top{--header-size-block-start:var(--header-size);--header-size-block-end:0px;--header-inset-block-start:0px;--header-inset-block-end:auto;--header-border-block-start-width:0px;--header-border-block-end-width:var(--border-width-base);--citizen-clip-closed:var(--citizen-clip-expand-down);--citizen-translate-closed:var(--citizen-translate-expand-down)}}@media (min-width:1120px){:root.citizen-header-position-left,:root.citizen-header-position-right{--header-direction:column;--header-inset-block-start:0px;--header-inset-block-end:0px;--header-card-maxheight:calc(100dvh - var(--space-xs) * 2)}:root.citizen-header-position-top,:root.citizen-header-position-bottom{--header-direction:row;--header-inset-inline-start:0px;--header-inset-inline-end:0px}:root.citizen-header-position-left{--header-size-inline-start:var(--header-size);--header-inset-inline-start:0px;--header-inset-inline-end:auto;--header-border-inline-end-width:var(--border-width-base);--citizen-clip-closed:var(--citizen-clip-expand-right);--citizen-translate-closed:var(--citizen-translate-expand-right)}:root.citizen-header-position-right{--header-size-inline-end:var(--header-size);--header-inset-inline-start:auto;--header-inset-inline-end:0px;--header-border-inline-start-width:var(--border-width-base);--citizen-clip-closed:var(--citizen-clip-expand-left);--citizen-translate-closed:var(--citizen-translate-expand-left)}:root.citizen-header-position-top{--header-size-block-start:var(--header-size);--header-inset-block-start:0px;--header-inset-block-end:auto;--header-border-block-end-width:var(--border-width-base);--citizen-clip-closed:var(--citizen-clip-expand-down);--citizen-translate-closed:var(--citizen-translate-expand-down)}:root.citizen-header-position-bottom{--header-size-block-end:var(--header-size);--header-inset-block-start:auto;--header-inset-block-end:0px;--header-border-block-start-width:var(--border-width-base);--citizen-clip-closed:var(--citizen-clip-expand-up);--citizen-translate-closed:var(--citizen-translate-expand-up)}}.citizen-animations-ready{--transition-hover:var(--transition-duration-base) var(--transition-timing-function-ease);--transition-menu:var(--transition-duration-medium) var(--transition-timing-function-ease-out);--transition-duration-base:100ms;--transition-duration-medium:250ms}@font-face{font-family:'Roboto';font-style:normal;font-weight:100 1000;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoFlex_cyrillic-ext.woff2?8fdc6) format('woff2-variations');font-display:swap;unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Roboto';font-style:normal;font-weight:100 1000;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoFlex_cyrillic.woff2?93b62) format('woff2-variations');font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Roboto';font-style:normal;font-weight:100 1000;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoFlex_greek.woff2?1b9d4) format('woff2-variations');font-display:swap;unicode-range:U+0370-03FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:100 1000;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoFlex_vietnamese.woff2?e22f5) format('woff2-variations');font-display:swap;unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Roboto';font-style:normal;font-weight:100 1000;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoFlex_latin-ext.woff2?a2395) format('woff2-variations');font-display:swap;unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:100 1000;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoFlex_latin.woff2?d34c0) format('woff2-variations');font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Roboto-fallback';src:local('Arial'),local('Liberation Sans');size-adjust:99.06%;ascent-override:93.66%;descent-override:24.65%;line-gap-override:0%}@font-face{font-family:'Roboto Mono';font-style:normal;font-weight:100 700;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoMono_latin-ext.woff2?88102) format('woff2-variations');font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Roboto Mono';font-style:normal;font-weight:100 700;src:url(/skins/Citizen/resources/skins.citizen.styles/fonts/RobotoMono_latin.woff2?87772) format('woff2-variations');font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.mw-ui-icon-wikimedia-configure::before{-webkit-mask-image:url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M3%204.17V2h2v2.17a3.001%203.001%200%200%201%200%205.66V18H3V9.83a3.001%203.001%200%200%201%200-5.66M4%206a1%201%200%201%201%200%202%201%201%200%200%201%200-2m11%2012v-6.17a3.001%203.001%200%200%201%200-5.66V2h2v4.17a3.001%203.001%200%200%201%200%205.66V18zm2-9a1%201%200%201%200-2%200%201%201%200%200%200%202%200%22%2F%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M11%2011.17a3.001%203.001%200%200%201%200%205.66V18H9v-1.17a3.001%203.001%200%200%201%200-5.66V2h2zM10%2013a1%201%200%201%201%200%202%201%201%200%200%201%200-2%22%2F%3E%0A%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M3%204.17V2h2v2.17a3.001%203.001%200%200%201%200%205.66V18H3V9.83a3.001%203.001%200%200%201%200-5.66M4%206a1%201%200%201%201%200%202%201%201%200%200%201%200-2m11%2012v-6.17a3.001%203.001%200%200%201%200-5.66V2h2v4.17a3.001%203.001%200%200%201%200%205.66V18zm2-9a1%201%200%201%200-2%200%201%201%200%200%200%202%200%22%2F%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M11%2011.17a3.001%203.001%200%200%201%200%205.66V18H9v-1.17a3.001%203.001%200%200%201%200-5.66V2h2zM10%2013a1%201%200%201%201%200%202%201%201%200%200%201%200-2%22%2F%3E%0A%3C%2Fsvg%3E)}.mw-ui-icon-wikimedia-arrowUp::before{-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K")}html,body{font-family:var(--font-family-base);font-variation-settings:'GRAD' var(--font-grade);font-weight:var(--font-weight-normal)}body{text-autospace:normal;text-spacing-trim:normal}input{font-family:var(--font-family-base)}b,strong{font-weight:var(--font-weight-semi-bold)}cite{font-style:inherit}p:not(.mw-empty-elt) + ul,p:not(.mw-empty-elt) + ol,p:not(.mw-empty-elt) + table,p:not(.mw-empty-elt) + dl,p:not(.mw-empty-elt) + blockquote{margin-top:calc(var(--space-xs) * -1)}blockquote{font-style:italic;text-wrap:pretty;font-size:var(--font-size-medium);line-height:var(--line-height-medium)}blockquote cite{font-style:normal;font-size:var(--font-size-small);line-height:var(--line-height-small)}figcaption{color:var(--color-subtle);font-size:var(--font-size-small);line-height:var(--line-height-small)}em:lang(zh),em:lang(ja),em:lang(ko),em:lang(mn-Mong){font-style:normal}em:lang(zh){-webkit-text-emphasis:filled dot;text-emphasis:filled dot;-webkit-text-emphasis-position:under;text-emphasis-position:under right}em:lang(ja),em:lang(ko){-webkit-text-emphasis:filled;text-emphasis:filled;-webkit-text-emphasis-position:over;text-emphasis-position:over right}em:lang(mn-Mong){text-decoration:underline wavy}.citizen-body{font-size:var(--font-size-medium);line-height:var(--line-height-content)}.citizen-body:lang(ja),.citizen-body:lang(ko),.citizen-body:lang(zh){--line-height-content:1.75}.citizen-text-heading-1{font-size:var(--font-size-xxx-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-xxx-large)}.citizen-text-heading-2{font-size:var(--font-size-xx-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-xx-large)}.citizen-text-heading-3{font-size:var(--font-size-x-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-x-large)}.citizen-text-heading-4{font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-large)}.citizen-text-body{font-size:var(--font-size-medium);line-height:var(--line-height-medium)}.citizen-text-small{font-size:var(--font-size-small);line-height:var(--line-height-small)}.citizen-text-overline{font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}img{vertical-align:middle}hr{margin-block:var(--space-md);border:0;border-top:var(--border-width-base) solid var(--border-color-base)}h1,h2,h3,h4,h5,h6{margin-block-end:0.25em;color:var(--color-emphasized)}h1,h2{margin-block-start:2em}h3,h4{margin-block-start:1.5em}h5,h6{margin-block-start:1.25em;font-size:var(--font-size-medium);font-weight:var(--font-weight-semi-bold)}h1{font-size:var(--font-size-xxx-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-xxx-large)}h2{font-size:var(--font-size-xx-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-xx-large)}h3{font-size:var(--font-size-x-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-x-large)}h4{font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-large)}p{margin-block:var(--space-md);overflow-wrap:break-word}p img{margin:0}ol,ul{padding:0;margin-block:var(--space-md);margin-inline:var(--space-xxl) 0}ol ol,ul ol,ol ul,ul ul{margin-block:0}dt{font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized)}dl{margin-block:var(--space-md)}dd{margin-inline-start:var(--space-xl)}pre,code,tt,kbd,samp,.mw-code{font-family:var(--font-family-monospace);font-size:var(--font-size-small);line-height:var(--line-height-small)}pre,code,.mw-code{color:var(--color-emphasized);background-color:var(--color-surface-2);border:var(--border-width-base) solid var(--border-color-base)}code{padding:2px 4px;border-radius:var(--border-radius-base)}pre,.mw-code{padding:1rem;overflow:auto;border-radius:var(--border-radius-large)}fieldset{padding:var(--space-xs) var(--space-md);margin:var(--space-md) 0;border:var(--border-width-base) solid var(--border-color-base)}legend{padding:var(--space-xxs);color:var(--color-subtle)}figure{margin:0}figure[typeof~='mw:File'].mw-halign-none,figure[typeof~='mw:File/Frameless'].mw-halign-none,figure[typeof~='mw:File/Thumb'].mw-halign-none,figure[typeof~='mw:File/Frame'].mw-halign-none{float:none;clear:none}figure[typeof~='mw:File'].mw-halign-center,figure[typeof~='mw:File/Frameless'].mw-halign-center,figure[typeof~='mw:File/Thumb'].mw-halign-center,figure[typeof~='mw:File/Frame'].mw-halign-center{margin-inline:auto;text-align:center}figure[typeof~='mw:File'] > figcaption,figure[typeof~='mw:File/Frameless'] > figcaption{display:none}figure[typeof~='mw:File/Thumb'],figure[typeof~='mw:File/Frame']{display:table;margin:var(--space-xs) auto var(--space-md) auto;text-align:center;font-size:var(--font-size-small);line-height:var(--line-height-small)}figure[typeof~='mw:File/Thumb'] > a:first-child span.mw-broken-media,figure[typeof~='mw:File/Frame'] > a:first-child span.mw-broken-media,figure[typeof~='mw:File/Thumb'] > span:first-child span.mw-broken-media,figure[typeof~='mw:File/Frame'] > span:first-child span.mw-broken-media{display:inline-block;width:180px;overflow-wrap:break-word}figure[typeof~='mw:File/Thumb'] > figcaption,figure[typeof~='mw:File/Frame'] > figcaption{display:table-caption;padding-inline:var(--border-radius-base);caption-side:bottom}figure[typeof~='mw:File/Thumb'] > figcaption:not(:empty),figure[typeof~='mw:File/Frame'] > figcaption:not(:empty){margin-top:var(--space-xs)}.mw-valign-middle .mw-file-element{vertical-align:middle}.mw-valign-baseline .mw-file-element{vertical-align:baseline}.mw-valign-sub .mw-file-element{vertical-align:sub}.mw-valign-super .mw-file-element{vertical-align:super}.mw-valign-top .mw-file-element{vertical-align:top}.mw-valign-text-top .mw-file-element{vertical-align:text-top}.mw-valign-bottom .mw-file-element{vertical-align:bottom}.mw-valign-text-bottom .mw-file-element{vertical-align:text-bottom}@media (min-width:640px){figure[typeof~='mw:File/Thumb'] > figcaption,figure[typeof~='mw:File/Frame'] > figcaption{text-align:start}.mw-content-ltr figure[typeof~='mw:File/Thumb'],.mw-content-ltr figure[typeof~='mw:File/Frame']{float:right;clear:right;margin-left:var(--space-lg)}.mw-content-rtl figure[typeof~='mw:File/Thumb'],.mw-content-rtl figure[typeof~='mw:File/Frame']{float:left;clear:left;margin-right:var(--space-lg)}figure[typeof~='mw:File'].mw-halign-right,figure[typeof~='mw:File/Frameless'].mw-halign-right,figure[typeof~='mw:File/Thumb'].mw-halign-right,figure[typeof~='mw:File/Frame'].mw-halign-right{float:right;clear:right;margin-left:var(--space-lg);margin-right:0}figure[typeof~='mw:File'].mw-halign-left,figure[typeof~='mw:File/Frameless'].mw-halign-left,figure[typeof~='mw:File/Thumb'].mw-halign-left,figure[typeof~='mw:File/Frame'].mw-halign-left{float:left;clear:left;margin-right:var(--space-lg);margin-left:0}figure[typeof~='mw:File'].mw-halign-center,figure[typeof~='mw:File/Frameless'].mw-halign-center,figure[typeof~='mw:File/Thumb'].mw-halign-center,figure[typeof~='mw:File/Frame'].mw-halign-center{float:none;clear:both;margin-inline:auto;text-align:center}}#siteSub,#contentSub,#contentSub2{overflow:hidden;text-overflow:ellipsis;color:var(--color-subtle);font-size:var(--font-size-small);line-height:var(--line-height-small)}#siteSub{line-height:var(--line-height-x-small)}#contentSub + #contentSub2{margin-top:calc(var(--space-xs) * -1)}#citizen-tagline-user > span + span::before{margin:0 var(--space-xxs);-webkit-user-select:none;user-select:none;content:'·'}span.subpages{display:block}@media screen{.citizen-page-container{display:flex;flex-direction:column;min-height:inherit}.mw-body,.parsoid-body{flex-grow:1}.citizen-body-container{display:grid;grid-template-areas:'content' 'footer';grid-template-columns:minmax(0,var(--width-layout));gap:0 var(--space-lg);justify-content:center;padding:0 var(--padding-page);margin-bottom:var(--space-xl)}.citizen-body{z-index:0;grid-area:content;word-wrap:break-word}#mw-data-after-content:not(:empty){margin-top:var(--space-xl)}.skin-invert-image img,.skin-invert{filter:var(--filter-invert)}.citizen-feature-custom-font-size-clientpref-small .citizen-body{--font-size-x-small:0.625rem;--font-size-small:0.75rem;--font-size-medium:0.875rem;--font-size-large:1rem;--font-size-x-large:1.125rem;--font-size-xx-large:1.375rem;--font-size-xxx-large:1.625rem;--line-height-x-small:1.125rem;--line-height-small:1.25rem;--line-height-medium:1.375rem;--line-height-large:1.625rem;--line-height-x-large:1.75rem;--line-height-xx-large:2rem;--line-height-xxx-large:2.25rem;--line-height-content:1.5714285}.citizen-feature-custom-font-size-clientpref-large .citizen-body{--font-size-x-small:0.875rem;--font-size-small:1rem;--font-size-medium:1.125rem;--font-size-large:1.25rem;--font-size-x-large:1.375rem;--font-size-xx-large:1.625rem;--font-size-xxx-large:1.875rem;--line-height-x-small:1.375rem;--line-height-small:1.625rem;--line-height-medium:1.75rem;--line-height-large:1.875rem;--line-height-x-large:2rem;--line-height-xx-large:2.25rem;--line-height-xxx-large:2.5rem;--line-height-content:1.55}.citizen-feature-custom-font-size-clientpref-xlarge .citizen-body{--font-size-x-small:1rem;--font-size-small:1.125rem;--font-size-medium:1.25rem;--font-size-large:1.375rem;--font-size-x-large:1.5rem;--font-size-xx-large:1.75rem;--font-size-xxx-large:2rem;--line-height-x-small:1.625rem;--line-height-small:1.75rem;--line-height-medium:1.875rem;--line-height-large:2rem;--line-height-x-large:2.125rem;--line-height-xx-large:2.375rem;--line-height-xxx-large:2.625rem;--line-height-content:1.5}:root.citizen-feature-custom-width-clientpref-standard{--width-layout:1080px}:root.citizen-feature-custom-width-clientpref-wide{--width-layout:1600px}:root.citizen-feature-custom-width-clientpref-full{--width-layout:100vw}:root:not(.citizen-v4).skin-theme-clientpref-night.citizen-feature-pure-black-clientpref-1{--color-surface-0-oklch__l:0%;--color-surface-0-oklch__c:0;--color-surface-1-oklch__c:0;--color-surface-2-oklch__c:0;--color-surface-3-oklch__c:0;--color-surface-4-oklch__c:0;--color-surface-0-hsl__l:0%;--color-surface-0-hsl__s:0%;--color-surface-1-hsl__s:0%;--color-surface-2-hsl__s:0%;--color-surface-3-hsl__s:0%;--color-surface-4-hsl__s:0%;--color-emphasized-oklch__c:0;--color-base-oklch__c:0;--color-subtle-oklch__c:0;--color-placeholder-oklch__c:0;--color-emphasized-hsl__s:0%;--color-base-hsl__s:0%;--color-subtle-hsl__s:0%;--color-placeholder-hsl__s:0%;--border-color-base:rgba(255,255,255,0.1);--border-color-subtle:rgba(255,255,255,0.05);--border-color-interactive:rgba(255,255,255,0.15);--border-color-interactive--hover:rgba(255,255,255,0.25);--border-color-interactive--active:rgba(255,255,255,0.35);--color-neutral-50:oklch(98% 0 var(--color-primary-oklch__h));--color-neutral-100:oklch(94% 0 var(--color-primary-oklch__h));--color-neutral-200:oklch(90% 0 var(--color-primary-oklch__h));--color-neutral-300:oklch(84% 0 var(--color-primary-oklch__h));--color-neutral-400:oklch(73% 0 var(--color-primary-oklch__h));--color-neutral-500:oklch(51% 0 var(--color-primary-oklch__h));--color-neutral-600:oklch(39% 0 var(--color-primary-oklch__h));--color-neutral-700:oklch(30% 0 var(--color-primary-oklch__h));--color-neutral-800:oklch(22% 0 var(--color-primary-oklch__h));--color-neutral-900:oklch(17% 0 var(--color-primary-oklch__h));--color-neutral-1000:oklch(0% 0 var(--color-primary-oklch__h))}:root.citizen-feature-performance-mode-clientpref-1{--backdrop-filter-frosted-glass:none !important;--opacity-glass:1 !important}.citizen-feature-performance-mode-clientpref-1 *,.citizen-feature-performance-mode-clientpref-1 ::before,.citizen-feature-performance-mode-clientpref-1 ::after{scroll-behavior:auto !important;transition-duration:0ms !important;animation-duration:0.01ms !important;animation-delay:-0.01ms !important;animation-iteration-count:1 !important}:root.skin-theme-clientpref-night.citizen-feature-image-dimming-clientpref-1,:root.skin-theme-clientpref-black.citizen-feature-image-dimming-clientpref-1{--filter-image-brightness:brightness(0.8)}:root{interpolate-size:allow-keywords}html{box-sizing:border-box;font-size:100%;scroll-padding-top:calc(var(--header-offset-block-start) + var(--height-sticky-header) + var(--space-xl));scroll-padding-bottom:calc(var(--header-offset-block-end) + var(--space-xl))}body{min-height:calc(100vh - env(safe-area-inset-bottom,0) - env(safe-area-inset-top,0));min-height:100dvh;color:var(--color-base);accent-color:var(--accent-color-base);background:var(--color-surface-0)}*,*::before,*::after{box-sizing:inherit;border-color:var(--border-color-base);border-style:solid;border-width:0}:focus{outline-color:var(--color-progressive)}::placeholder{color:var(--color-placeholder)}::selection{color:var(--color-inverted-primary);background-color:var(--color-progressive)}input,select,textarea{color:var(--color-emphasized);background-color:transparent;border:var(--border-width-base) solid var(--border-color-interactive)}input[disabled],select[disabled],textarea[disabled]{color:var(--color-disabled);border-color:var(--border-color-disabled)}input[disabled] ~ label,select[disabled] ~ label,textarea[disabled] ~ label{color:var(--color-disabled)}select option{background-color:var(--color-surface-1)}textarea{width:100%}blockquote{margin:var(--space-md);color:var(--color-subtle)}blockquote cite{display:block;margin-top:var(--space-sm)}blockquote cite::before{content:'— '}button{font-family:var(--font-family-base);color:var(--color-base)}th{font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized)}th > p:first-child,td > p:first-child,th > ul:first-child,td > ul:first-child,th > ol:first-child,td > ol:first-child{margin-top:0}th > p:last-child,td > p:last-child,th > ul:last-child,td > ul:last-child,th > ol:last-child,td > ol:last-child{margin-bottom:0}.hidden,.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}.nowrap{white-space:nowrap}.citizen-button{padding:0;appearance:none;cursor:pointer;background:transparent;border:0}.citizen-sitenotice-container{background-color:var(--color-surface-2)}.mw-body,.parsoid-body{direction:ltr}#mw-content-text{margin-block-start:var(--space-md)}.mw-indicators{display:flex;column-gap:var(--space-xs);align-items:center;padding-inline-start:var(--space-xs);margin-inline-start:var(--space-xs);font-size:var(--font-size-small);border-inline-start:var(--border-width-base) solid var(--border-color-base)}#mw-indicator-mw-helplink a{font-size:0}video{max-width:100%}.citizen-body a.image{display:inline-block;overflow:hidden;vertical-align:top}.citizen-body a.image > img{transition:var(--transition-hover);transition-property:transform}.citizen-body a.image:hover:not(.lazy):not(.new) > img{transform:var(--transform-image-hover)}.page-Main_Page.action-view #citizen-page-header-sticky-sentinel{display:none}.page-Main_Page.action-view .citizen-page-header{margin-top:calc(var(--space-xl) * 2)}.page-Main_Page.action-view .citizen-page-header-inner{justify-content:center}.page-Main_Page.action-view #contentSub,.page-Main_Page.action-view .citizen-page-heading{display:none}.page-Main_Page.action-view .citizen-body-container{margin-top:var(--space-xl)}.page-Main_Page.action-view .citizen-page-actions{margin-inline-start:0}.mw-heading{display:flex;align-items:center;margin-top:var(--space-md)}.mw-heading1,.mw-heading2{margin-top:3rem}.mw-heading3,.mw-heading4{margin-top:2rem}.mw-heading h1,.mw-heading h2,.mw-heading h3,.mw-heading h4,.mw-heading h5,.mw-heading h6{flex-grow:1;margin:0}a.feedlink{background:none !important}.screen-reader-text{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}.center{width:100%;text-align:center}*.center *{margin-inline:auto}.floatleft,.floatright{margin:0}div.tleft,div.tright{margin:var(--space-xs) 0 var(--space-md) 0}.citizen-loading::after{--delay-progress-bar:500ms;--height-progress-bar:2px;z-index:9999;box-sizing:border-box;display:block;width:100%;height:var(--height-progress-bar);content:'';background:linear-gradient(90deg,var(--color-progressive) 0%,var(--color-progressive) 100%) -10% 0 / 0 var(--height-progress-bar) no-repeat,transparent;border-radius:0 0 var(--border-radius-large) var(--border-radius-large);filter:drop-shadow(0 0 16px var(--color-progressive)) drop-shadow(0 0 24px var(--color-progressive));animation:progressbar 1200ms linear var(--delay-progress-bar) infinite alternate}@keyframes progressbar{0%{background-position:-10% 0;background-size:0 var(--height-progress-bar)}30%{background-position:-10% 0;background-size:30% var(--height-progress-bar)}70%{background-position:110% 0;background-size:30% var(--height-progress-bar)}100%{background-position:110% 0;background-size:0 var(--height-progress-bar)}}html.citizen-loading::after{position:fixed;top:0}a{text-decoration:none;text-underline-offset:0.25em}a:where(:not([role='button'])){color:var(--color-progressive,#36c);border-radius:2px;text-decoration:none;color:var(--color-link)}a:where(:not([role='button'])):visited{color:var(--color-visited,#6a60b0)}a:where(:not([role='button'])):visited:hover{color:var(--color-visited,#6a60b0)}a:where(:not([role='button'])):hover{color:var(--color-progressive--hover,#4b77d6);text-decoration:underline}a:where(:not([role='button'])):active{color:var(--color-progressive--active,#233566);text-decoration:underline}a:where(:not([role='button'])):focus-visible{outline:solid 2px var(--outline-color-progressive--focus,#36c)}@supports not selector(:focus-visible){a:where(:not([role='button'])):focus{outline:solid 2px var(--outline-color-progressive--focus,#36c)}}a:where(:not([role='button'])) .cdx-icon:not(.cdx-thumbnail__placeholder__icon--vue):last-child{min-width:12px;min-height:12px;width:1rem;height:1rem;padding-left:4px;vertical-align:middle}a:where(:not([role='button'])):hover{color:var(--color-link--hover)}a:where(:not([role='button'])):active{color:var(--color-link--active)}a:where(:not([role='button'])):visited:hover{color:var(--color-visited--hover)}a:where(:not([role='button'])):visited:active{color:var(--color-visited--active)}a:where(.new:not([role='button'])){color:var(--color-destructive,#d73333)}a:where(.new:not([role='button'])):visited{color:var(--color-destructive--visited,#9f5555)}a:where(.new:not([role='button'])):visited:hover{color:var(--color-destructive--visited,#9f5555)}a:where(.new:not([role='button'])):hover{color:var(--color-destructive--hover,#fc493b);text-decoration:underline}a:where(.new:not([role='button'])):active{color:var(--color-destructive--active,#9f3526);text-decoration:underline}a:where(.new:not([role='button'])):focus{outline-color:var(--outline-color-progressive--focus,#36c)}.mw-parser-output a.external::after{margin-inline-start:4px;content:'';min-width:12px;min-height:12px;width:0.75rem;height:0.75rem;vertical-align:text-bottom;display:inline-block;vertical-align:baseline}@supports not ((-webkit-mask-image:none) or (mask-image:none)){.mw-parser-output a.external::after{background-position:center;background-repeat:no-repeat;background-size:calc(max(0.75rem,12px))}}@supports (-webkit-mask-image:none) or (mask-image:none){.mw-parser-output a.external::after{-webkit-mask-size:calc(max(0.75rem,12px));mask-size:calc(max(0.75rem,12px));-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center}}@supports not ((-webkit-mask-image:none) or (mask-image:none)){.mw-parser-output a.external::after{background-image:url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" fill=\\"%23000000\\"><path d=\\"M19 1h-8l3.286 3.286L6 12l1.371 1.472 8.332-7.77.007.008L19 9zM2 5h4v2H3v10h10v-4.004h2V18a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1\\"/></svg>");filter:invert(var(--filter-invert-icon,0));opacity:var(--opacity-icon-base,0.87)}.cdx-button:not(.cdx-button--weight-quiet):disabled .mw-parser-output a.external::after,.cdx-button--weight-primary.cdx-button--action-progressive .mw-parser-output a.external::after,.cdx-button--weight-primary.cdx-button--action-destructive .mw-parser-output a.external::after{filter:invert(var(--filter-invert-primary-button-icon,1))}}@supports (-webkit-mask-image:none) or (mask-image:none){.mw-parser-output a.external::after{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" fill=\\"%23000000\\"><path d=\\"M19 1h-8l3.286 3.286L6 12l1.371 1.472 8.332-7.77.007.008L19 9zM2 5h4v2H3v10h10v-4.004h2V18a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1\\"/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" fill=\\"%23000000\\"><path d=\\"M19 1h-8l3.286 3.286L6 12l1.371 1.472 8.332-7.77.007.008L19 9zM2 5h4v2H3v10h10v-4.004h2V18a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1\\"/></svg>");background-color:currentColor}}.mw-parser-output a.external::after[dir='rtl'],html[dir='rtl'] .mw-parser-output a.external::after:not([dir='ltr']){transform:scaleX(-1)}.mw-parser-output .plainlinks a.external::after{display:none}a.mw-selflink{font-weight:var(--font-weight-semi-bold);color:inherit;text-decoration:inherit}a.mw-selflink:hover{cursor:inherit}.mw-underline-always a{text-decoration:underline}.mw-underline-never a{text-decoration:none}.cdx-button.cdx-button--icon-only span + span{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%);-webkit-user-select:none;-moz-user-select:none;user-select:none}.citizen-header{position:fixed;top:var(--header-inset-block-start);right:var(--header-inset-inline-end);bottom:var(--header-inset-block-end);left:var(--header-inset-inline-start);z-index:200;display:flex;flex-direction:var(--header-direction);gap:var(--space-xxs);padding:var(--space-xs) max(env(safe-area-inset-right),var(--space-xs)) max(env(safe-area-inset-bottom),var(--space-xs)) max(env(safe-area-inset-left),var(--space-xs));background-color:var(--color-surface-0);border-color:var(--border-color-base);border-style:solid;border-width:0;border-block-start-width:var(--header-border-block-start-width);border-block-end-width:var(--header-border-block-end-width);border-inline-start-width:var(--header-border-inline-start-width);border-inline-end-width:var(--header-border-inline-end-width)}.citizen-header__item{display:flex;align-items:center}.citizen-header__logo{padding:0 var(--space-xs) 0 0;margin:0 var(--space-xxs);border:0 solid var(--border-color-subtle);border-right-width:var(--border-width-base)}.citizen-header__logo .cdx-button{position:relative}.citizen-header__logo img{margin:auto}.citizen-header__logo .citizen-ui-icon{position:absolute;inset:0;margin:auto}.citizen-header__inner{display:flex;flex-grow:1;flex-direction:var(--header-direction);gap:var(--space-xxs);justify-content:space-between;min-width:0;overflow-x:auto}.citizen-header__start,.citizen-header__end{display:flex;flex-shrink:0;flex-direction:var(--header-direction);gap:var(--space-xxs)}.citizen-header__start > .citizen-menu > .citizen-menu__heading,.citizen-header__end > .citizen-menu > .citizen-menu__heading{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}.citizen-header__start{align-items:center;min-width:0}.citizen-header .citizen-dropdown-summary{contain:layout paint style}.citizen-notifications-button{position:relative}.citizen-notifications-button.cdx-button.cdx-button--icon-only{gap:0;min-height:40px;padding-inline:0}.citizen-notifications-button[data-counter-text]:not([data-counter-text='0'])::after{position:absolute;top:var(--space-xxs);right:var(--space-xxs);box-sizing:content-box;width:0.5rem;height:0.5rem;content:'';background:var(--color-progressive);border:4px solid var(--color-surface-0);border-radius:var(--border-radius-circle)}.client-nojs .citizen-preferences-dropdown{display:none}.citizen-jump-link:not(:focus){position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%);-webkit-user-select:none;-moz-user-select:none;user-select:none}.citizen-jump-link:focus{position:fixed;inset-block-start:var(--space-xs);inset-inline-start:var(--space-xs);z-index:450;padding:var(--space-xs) var(--space-md);font-weight:var(--font-weight-medium);color:var(--color-emphasized);background-color:var(--color-surface-2);border-width:var(--border-width-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-drop-medium)}.citizen-drawer__card{right:0;bottom:100%;left:0;max-height:var(--header-card-maxheight)}.citizen-drawer__header{display:flex;gap:var(--space-md);align-items:center;justify-content:center;padding:var(--space-md);border-bottom:var(--border-subtle)}.citizen-drawer__logo img{width:auto;height:3rem}.citizen-drawer__siteinfo{display:flex;flex-direction:column;gap:var(--space-xxs)}.citizen-drawer__menu{--size-icon:1rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,auto));gap:var(--space-sm);justify-content:center;max-width:inherit;padding:var(--space-xs);margin-bottom:var(--space-xs)}.citizen-drawer__menu .mw-list-item a{border-radius:var(--border-radius-base)}.citizen-drawer .citizen-dropdown-summary > svg > rect{transform-origin:center;transform-box:fill-box;transition:var(--transition-hover);transition-property:transform,opacity}.citizen-drawer > .citizen-dropdown-details[open] > .citizen-dropdown-summary > svg > rect:first-child{transform:translateY(6px) rotate(45deg)}.citizen-drawer > .citizen-dropdown-details[open] > .citizen-dropdown-summary > svg > rect:nth-child(2){opacity:0;transform:scaleX(0)}.citizen-drawer > .citizen-dropdown-details[open] > .citizen-dropdown-summary > svg > rect:last-child{transform:translateY(-6px) rotate(-45deg)}.citizen-userMenu .citizen-menu__card .citizen-menu__heading{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}#pt-createaccount a,#pt-login a,#pt-login-private a,#pt-logout a{margin:var(--space-xs);border:var(--border-width-base) solid var(--border-color-base);border-radius:var(--border-radius-medium)}#pt-createaccount .citizen-keyboard-hint-key,#pt-login .citizen-keyboard-hint-key,#pt-login-private .citizen-keyboard-hint-key,#pt-logout .citizen-keyboard-hint-key{display:none}#pt-login a{color:var(--color-inverted-primary) !important;background-color:var(--background-color-progressive)}#pt-login a:hover{background-color:var(--background-color-progressive--hover)}#pt-login a:active{background-color:var(--background-color-progressive--active)}#pt-logout a{color:var(--color-inverted-fixed) !important;background-color:var(--background-color-destructive)}#pt-logout a:hover{background-color:var(--background-color-destructive--hover)}#pt-logout a:active{background-color:var(--background-color-destructive--active)}.citizen-search .citizen-menu__card{--size-icon:1rem;top:0;right:0;left:0;width:56rem;max-width:calc(100vw - var(--padding-page));max-height:var(--header-card-maxheight);margin-inline:auto;--citizen-clip-closed:var(--citizen-clip-expand-down);--citizen-translate-closed:var(--citizen-translate-expand-down)}.citizen-search.citizen-dropdown .citizen-menu__card{content-visibility:visible}.citizen-search .citizen-dropdown-details + .citizen-menu__card{position:fixed}.citizen-search .citizen-dropdown-details[open] + .citizen-menu__card > .citizen-search__form{transition:none}.citizen-search__formIcon{--size-icon:20px;display:grid;place-content:center;width:56px;height:56px}.citizen-search__form{position:sticky;top:0;z-index:1;background-color:color-mix(in oklch,var(--color-surface-1) calc(var(--opacity-glass) * 100%),transparent);-webkit-backdrop-filter:var(--backdrop-filter-frosted-glass);backdrop-filter:var(--backdrop-filter-frosted-glass);display:flex;height:100%;overflow:hidden;font-size:var(--font-size-medium)}@supports (-webkit-touch-callout:none){.citizen-search__form{font-size:1rem}}.citizen-search__form.citizen-loading::after{position:absolute;bottom:0}#searchInput{flex-grow:1;padding:0;font-size:inherit;appearance:none;background:transparent;border:0}#searchInput:focus{outline:0}#searchInput::-webkit-search-cancel-button{-webkit-appearance:none}.citizen-search .citizen-dropdown-summary > svg > circle{stroke-dasharray:37.699;stroke-dashoffset:0;transition:var(--transition-hover);transition-property:stroke-dashoffset,opacity}.citizen-search .citizen-dropdown-summary > svg .citizen-icon-search__handle{stroke-dasharray:7.778;stroke-dashoffset:0;transition:var(--transition-hover);transition-property:stroke-dashoffset,opacity}.citizen-search .citizen-dropdown-summary > svg .citizen-icon-search__close{opacity:0;transition:var(--transition-hover);transition-property:opacity}.citizen-search > .citizen-dropdown-details[open] > .citizen-dropdown-summary > svg > circle{opacity:0;stroke-dashoffset:37.699}.citizen-search > .citizen-dropdown-details[open] > .citizen-dropdown-summary > svg .citizen-icon-search__handle{opacity:0}.citizen-search > .citizen-dropdown-details[open] > .citizen-dropdown-summary > svg .citizen-icon-search__close{opacity:1}.citizen-page-actions{display:flex;gap:var(--space-xxs);align-items:center;margin-inline-start:auto}.citizen-page-actions__item{display:flex}.citizen-page-actions .citizen-menu__card{right:calc(var(--space-xs) * -1);display:grid;gap:var(--space-xs);max-height:60vh;--citizen-clip-closed:var(--citizen-clip-expand-up);--citizen-translate-closed:var(--citizen-translate-expand-up)}.citizen-page-actions .citizen-menu__card-content{padding-block:var(--space-xs)}.citizen-page-actions > .mw-portlet ul{display:flex;gap:var(--space-xxs)}.citizen-page-actions > .mw-portlet li > a{gap:0;padding-right:var(--space-sm);padding-left:var(--space-sm);font-size:0;border-radius:var(--border-radius-medium)}.citizen-page-actions li{margin:0}.citizen-page-actions > .citizen-menu > .citizen-menu__heading{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}.citizen-page-languages .citizen-dropdown-summary{position:relative}.citizen-page-languages .citizen-dropdown-summary::after{position:absolute;top:0;right:0;display:block;padding:0.1em 0.4em;font-size:0.65rem;content:attr(data-counter-text);background:var(--color-surface-0);border-radius:var(--border-radius-pill)}#ca-ve-edit{order:98}#ca-edit{order:99}.client-js .citizen-ve-edit-merged#ca-ve-edit:has(+ #ca-edit:not(.selected)) > a{border-top-right-radius:0;border-bottom-right-radius:0}.client-js .citizen-ve-edit-merged#ca-edit{margin-left:calc(var(--space-xxs) * -1)}.client-js .citizen-ve-edit-merged#ca-edit > a{gap:0;font-size:0;border-left:var(--border-subtle);border-top-left-radius:0;border-bottom-left-radius:0}.client-nojs .citizen-share{display:none}.citizen-menu{font-size:var(--font-size-small);line-height:var(--line-height-small)}.citizen-menu__card{margin:var(--space-xs);contain:content;-webkit-user-select:none;user-select:none;border:var(--border-width-base) solid var(--border-color-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-large);clip-path:var(--citizen-clip-closed);transform:var(--citizen-translate-closed);background-color:color-mix(in oklch,var(--color-surface-1) calc(var(--opacity-glass) * 100%),transparent);-webkit-backdrop-filter:var(--backdrop-filter-frosted-glass);backdrop-filter:var(--backdrop-filter-frosted-glass)}.citizen-menu__card-content{max-width:inherit;max-height:inherit;overflow:auto;overscroll-behavior:contain;scrollbar-width:none;-ms-overflow-style:none}.citizen-menu__card-content::-webkit-scrollbar{display:none}.citizen-menu__heading{padding:var(--space-xs) var(--space-md);color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}.citizen-menu__content-list{margin:0;list-style:none}.citizen-menu .mw-list-item a{display:flex;gap:var(--space-sm);align-items:center;min-height:2.25rem;padding-inline:var(--space-md);font-weight:var(--font-weight-medium);color:var(--color-base);transition:var(--transition-hover);transition-property:opacity}.citizen-menu .mw-list-item a:hover{background-color:var(--background-color-button-quiet--hover)}.citizen-menu .mw-list-item a:active{background-color:var(--background-color-button-quiet--active)}.citizen-menu .mw-list-item a:hover,.citizen-menu .mw-list-item a:focus{text-decoration:none}.citizen-ui-icon{display:block;width:var(--size-icon);min-width:var(--size-icon);height:var(--size-icon);min-height:var(--size-icon);contain:strict}.citizen-ui-icon::before{display:block;width:100%;height:100%;content:'';background-color:currentcolor;background-image:none !important;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain}.mw-portlet .selected{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}.mw-portlet-empty{display:none !important}.action-view:has(.diff) #ca-view,.action-view:has(.mw-revision) #ca-view{position:relative;width:auto;height:auto;overflow:initial;white-space:unset;clip-path:unset}.citizen-dropdown .citizen-menu__card{z-index:50;min-width:16rem;max-width:80vw;content-visibility:hidden;transition-timing-function:var(--transition-timing-function-ease-in);transition-duration:var(--transition-duration-base);transition-property:clip-path,transform,content-visibility;transition-behavior:allow-discrete}.citizen-dropdown .citizen-menu__card .citizen-menu__card-content{opacity:0;transition-timing-function:var(--transition-timing-function-ease-in);transition-duration:var(--transition-duration-base);transition-property:opacity}.citizen-dropdown .citizen-menu__card:empty{display:none}.citizen-dropdown-summary{cursor:pointer}.citizen-dropdown-summary > span:not(.citizen-ui-icon){position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}.citizen-dropdown-summary:hover{background-color:var(--background-color-button-quiet--hover)}.citizen-dropdown-summary:active{background-color:var(--background-color-button-quiet--active)}.citizen-dropdown-summary::-webkit-details-marker{display:none}.citizen-dropdown-details + .citizen-menu__card{position:absolute}.citizen-dropdown-details[open] + .citizen-menu__card{content-visibility:visible;clip-path:inset(0 0 0 0);transform:none;transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium)}.citizen-dropdown-details[open] + .citizen-menu__card .citizen-menu__card-content{opacity:1;transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium)}.citizen-dropdown-details[open] > .citizen-dropdown-summary.cdx-button{color:var(--color-emphasized);background-color:var(--background-color-button-quiet--active)}.citizen-header__end .citizen-dropdown .citizen-menu__card{right:0;bottom:100%;left:0;max-height:var(--header-card-maxheight)}.citizen-page-header{position:relative;z-index:1;padding-inline:var(--padding-page);margin-top:var(--space-xl)}.citizen-page-header-inner{display:flex;flex-wrap:wrap;gap:var(--space-md);align-items:center;max-width:var(--width-layout);padding-block:var(--space-md);margin-inline:auto}.citizen-page-heading{flex-grow:1}.firstHeading-container{display:flex;flex-wrap:wrap;align-items:center}.firstHeading{margin-block:0;line-height:2rem;overflow-wrap:break-word}.mw-page-title-namespace{color:var(--color-base)}.mw-page-title-separator{margin-right:var(--space-xxs);color:var(--color-subtle)}.mw-page-title-parenthesis{color:var(--color-subtle);font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-large)}.citizen-page-sidebar{--size-icon:1rem}.citizen-page-sidebar .citizen-menu__heading,.citizen-page-sidebar .citizen-menu .mw-list-item a{padding-inline:var(--space-xs)}.citizen-page-sidebar .citizen-menu .mw-list-item a{gap:var(--space-xs);border-radius:var(--border-radius-base)}.citizen-page-footer{display:flex;flex-direction:column;grid-area:footer;gap:var(--space-xl);padding-top:var(--space-xl);margin-top:var(--space-xl);font-size:var(--font-size-small);line-height:var(--line-height-small)}.page-info{display:flex;flex-wrap:wrap;gap:var(--space-xl)}.page-info__item{display:flex;flex-direction:column;gap:var(--space-xxs)}.page-info__label{color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}.citizen-footer{--min-width-footer-link:10rem;clear:both;padding:var(--space-xxl) var(--padding-page);margin-top:8rem;contain:content;color:var(--color-subtle);background-color:var(--color-surface-1);direction:ltr;font-size:var(--font-size-small);line-height:var(--line-height-small)}.citizen-footer__container{max-width:var(--width-page);margin-inline:auto}.citizen-footer__content,.citizen-footer__bottom{display:flex;gap:var(--space-md) var(--space-xxl);justify-content:space-between;padding:var(--space-md) 0;margin-inline:auto}.citizen-footer__bottom{margin-inline:auto;border-top:var(--border-width-base) solid var(--border-color-base)}.citizen-footer__siteinfo{display:flex;flex-grow:1;flex-direction:column;gap:var(--space-xs);max-width:90ch}.citizen-footer__sitetitle{display:flex;flex-direction:column;gap:var(--space-sm)}.citizen-footer__sitetitle .mw-logo-wordmark{font-size:var(--font-size-xxx-large)}.citizen-footer__desc{margin:0;line-height:var(--line-height-small)}.citizen-footer a{font-weight:var(--font-weight-medium);color:var(--color-emphasized)}.citizen-footer ul{margin:0}.citizen-footer li{list-style:none}#footer-places{display:flex;flex-grow:1;align-items:flex-end}#footer-places ul{display:grid;flex-grow:1;grid-template-columns:repeat(auto-fit,minmax(var(--min-width-footer-link),1fr))}#footer-places a{display:block;padding:var(--space-xs) var(--space-md);border-radius:var(--border-radius-base)}#footer-places a:hover{background-color:var(--background-color-button-quiet--hover)}#footer-places a:active{background-color:var(--background-color-button-quiet--active)}#footer-places a:hover,#footer-places a:focus{text-decoration:none}#footer-icons ul{display:flex;flex-wrap:wrap;gap:var(--space-xs)}#footer-icons li{display:flex;gap:var(--space-xs)}#footer-icons a{display:flex;align-items:center;background-color:var(--background-color-base-fixed)}.citizen-notifications__placeholder{display:flex;flex-direction:column;height:min(20rem,60vh);max-height:var(--header-card-maxheight)}.citizen-notifications__placeholder-header{display:flex;flex-shrink:0;gap:var(--space-sm);align-items:center;justify-content:space-between;padding:var(--space-sm) var(--space-md)}.citizen-notifications__placeholder-title{margin:0;font-size:var(--font-size-medium);font-weight:var(--font-weight-semi-bold)}.citizen-notifications__placeholder-body{display:flex;flex:1;flex-direction:column;min-height:0;overflow:hidden}.citizen-notifications__placeholder-item{display:grid;flex-shrink:0;grid-template-columns:auto 1fr;gap:var(--space-xs);column-gap:var(--space-sm);padding:var(--space-sm) var(--space-md)}.citizen-notifications__placeholder-item + .citizen-notifications__placeholder-item{border-top:var(--border-subtle)}.citizen-notifications__placeholder-icon{grid-row:span 2;width:2rem;height:2rem;margin-block-start:0.125rem;background-color:var(--color-surface-3);border-radius:var(--border-radius-circle)}.citizen-notifications__placeholder-line{height:var(--font-size-small);background-color:var(--background-color-neutral);background-image:linear-gradient(90deg,transparent 0%,var(--background-color-interactive--hover) 50%,transparent 100%);background-repeat:no-repeat;background-position:200% 0;background-size:200% 100%;border-radius:var(--border-radius-base)}.citizen-notifications__placeholder-line--title{width:70%}.citizen-notifications__placeholder-line--meta{width:40%}.citizen-notifications__placeholder-footer{display:flex;flex-shrink:0;gap:var(--space-xs);padding:0 var(--space-md) var(--space-sm)}.citizen-notifications__placeholder-history{flex:1}.citizen-notifications__placeholder-history .citizen-ui-icon,.citizen-notifications__placeholder-prefs .citizen-ui-icon{padding-left:0}.citizen-notifications__empty{display:flex;flex:1;flex-direction:column;gap:var(--space-sm);align-items:center;justify-content:center;padding:var(--space-xl) var(--space-md);color:var(--color-subtle);text-align:center}.citizen-notifications > .citizen-notifications__see-all{display:block;padding:var(--space-md);font-size:var(--font-size-small)}.citizen-notifications__error{display:flex;flex:1;flex-direction:column;gap:var(--space-sm);align-items:center;justify-content:center;padding:var(--space-xl) var(--space-md);color:var(--color-subtle);text-align:center}@keyframes citizen-notifications-placeholder-shimmer{to{background-position:-200% 0}}.citizen-notifications__placeholder-body[hidden],.citizen-notifications__empty[hidden],.citizen-notifications__error[hidden]{display:none}.client-nojs .citizen-notifications__placeholder-body{display:none}.citizen-preferences{min-width:20rem}.citizen-preferences-skeleton{display:flex;flex-direction:column;gap:var(--space-sm);min-height:18rem;padding:var(--space-md)}.citizen-preferences-skeleton__heading{width:5rem;height:0.625rem;margin-block:var(--space-sm) var(--space-xs);border-radius:var(--border-radius-base)}.citizen-preferences-skeleton__heading:first-child{margin-block-start:0}.citizen-preferences-skeleton__row{display:flex;flex-direction:column;gap:var(--space-xxs);padding-block:var(--space-xxs)}.citizen-preferences-skeleton__label{width:55%;height:var(--font-size-small);border-radius:var(--border-radius-base)}.citizen-preferences-skeleton__description{width:80%;height:var(--font-size-small);border-radius:var(--border-radius-base)}.citizen-preferences-skeleton__heading,.citizen-preferences-skeleton__label,.citizen-preferences-skeleton__description{background-color:var(--background-color-neutral);background-image:linear-gradient(90deg,transparent 0%,var(--background-color-interactive--hover) 50%,transparent 100%);background-repeat:no-repeat;background-position:200% 0;background-size:200% 100%}@keyframes citizen-preferences-skeleton-shimmer{to{background-position:-200% 0}}.citizen-preferences-error{display:flex;flex-direction:column;gap:var(--space-sm);align-items:center;justify-content:center;min-height:12rem;padding:var(--space-md);text-align:center}.citizen-preferences-error__message{margin:0;color:var(--color-subtle)}.citizen-preferences-skeleton[hidden],.citizen-preferences-error[hidden]{display:none}.citizen-share-dialog{box-sizing:content-box;width:32rem;max-height:calc(100vh - 2 * var(--space-md));padding:0;overflow:hidden auto;background-color:var(--background-color-base);border:var(--border-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-drop-xx-large)}.citizen-share-dialog::backdrop{background-color:var(--background-color-backdrop-light);-webkit-backdrop-filter:var(--backdrop-filter-blur);backdrop-filter:var(--backdrop-filter-blur)}.citizen-share-dialog__content{display:flex;flex-direction:column}.citizen-share-skeleton{display:flex;flex-direction:column;gap:var(--space-sm);min-height:8rem;padding:var(--space-md)}.citizen-share-skeleton__bar{height:0.625rem;background-color:var(--background-color-neutral);background-image:linear-gradient(90deg,transparent 0%,var(--background-color-interactive--hover) 50%,transparent 100%);background-repeat:no-repeat;background-position:200% 0;background-size:200% 100%;border-radius:var(--border-radius-base)}.citizen-share-skeleton__bar--short{width:30%}.citizen-share-skeleton__bar--medium{width:60%}.citizen-share-skeleton__bar--wide{width:90%}@keyframes citizen-share-skeleton-shimmer{to{background-position:-200% 0}}.citizen-toc{font-size:var(--font-size-small);line-height:var(--line-height-small)}.citizen-toc-contents{position:relative;margin:0 0 0 var(--space-xs);border-left:var(--border-width-thick) solid var(--border-color-base)}.citizen-toc-contents > .citizen-toc-list{padding-left:0}.citizen-toc-list{position:relative;width:100%;padding-left:var(--space-xs);margin:0;list-style:none}.citizen-toc .citizen-toc-link{display:flex;flex-grow:1;gap:var(--space-xs);align-items:center;justify-content:normal;max-width:none;font-size:inherit;font-weight:var(--font-weight-medium);text-wrap:auto;border-top-left-radius:0;border-bottom-left-radius:0}.citizen-toc .citizen-toc-link.citizen-toc-top{height:0;min-height:0;padding:0;overflow:hidden;opacity:0;transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:opacity,height,padding}.citizen-toc .citizen-toc-toggle{display:none;padding:0}.citizen-toc-indicator{position:absolute;top:0;left:0;z-index:1;width:var(--border-width-thick);height:var(--indicator-unit-height,2rem);margin-left:calc(var(--border-width-thick) * -1);background-color:var(--color-progressive);border-radius:var(--border-width-thick);transform:translateY(var(--indicator-top,0)) scaleY(var(--indicator-scale,0));transform-origin:top center;transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:transform}.citizen-toc-text{display:flex;gap:var(--space-xs)}.citizen-toc-numb{display:none;color:var(--color-subtle)}.citizen-toc-summary{color:var(--color-subtle)}.citizen-toc-list-item{position:relative;display:flex;flex-wrap:wrap}.citizen-toc .citizen-toc-list-item--active > .citizen-toc-link{color:var(--color-progressive)}.client-js .citizen-toc--collapse-enabled .citizen-toc-level-1 .citizen-toc-list-item{display:none}.client-js .citizen-toc--collapse-enabled .citizen-toc-level-1.citizen-toc-list-item--expanded .citizen-toc-list-item{display:flex}.client-js .citizen-toc--collapse-enabled .citizen-toc-toggle{--size-icon:var(--font-size-x-small);display:grid;place-content:center}.client-js .citizen-toc--collapse-enabled .citizen-toc-toggle .citizen-ui-icon::before{transform:rotate3d(1,0,0,180deg);transition:var(--transition-hover);transition-property:transform}.client-js .citizen-toc--collapse-enabled .citizen-toc-level-1.citizen-toc-list-item--expanded .citizen-toc-toggle .citizen-ui-icon::before{transform:none}.citizen-sticky-header-visible .citizen-toc .citizen-toc-top.citizen-toc-link{height:2rem;padding-block:var(--space-xs);overflow:visible;opacity:1}#citizen-page-header-sticky-sentinel{visibility:hidden;height:1px;margin-top:-1px;contain:strict}.ve-activated #citizen-page-header-sticky-sentinel,.action-edit #citizen-page-header-sticky-sentinel{display:none}.citizen-sticky-header{padding-inline:var(--padding-page);border-bottom:var(--border-base)}.citizen-sticky-header-background{position:absolute;inset:0;z-index:-100;background-color:color-mix(in oklch,var(--color-surface-0) calc(var(--opacity-glass) * 100%),transparent);-webkit-backdrop-filter:var(--backdrop-filter-frosted-glass);backdrop-filter:var(--backdrop-filter-frosted-glass)}.citizen-sticky-header-container{position:fixed;top:0;right:0;left:0;z-index:100;visibility:hidden;margin-top:var(--header-size-block-start);transform:translateY(-100%);transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:transform,visibility}.citizen-sticky-header-inner{display:flex;gap:var(--space-md);align-items:center;justify-content:space-between;max-width:var(--width-page);min-height:3.25rem;padding-block:var(--space-xxs);margin-inline:auto}.citizen-sticky-header-start{display:flex;flex-grow:1;align-items:center;margin-inline-start:-16px;overflow:hidden}.citizen-sticky-header-end{display:flex;align-items:center}.citizen-sticky-header-backtotop{flex-grow:1}.citizen-sticky-header-backtotop.cdx-button{gap:var(--space-xs);justify-content:flex-start;max-width:none}.citizen-sticky-header-backtotop:hover .citizen-ui-icon.mw-ui-icon-wikimedia-arrowUp{opacity:1;transform:none}.citizen-sticky-header-backtotop:hover .citizen-sticky-header-page-info{transform:translateX(calc(var(--size-icon) + var(--space-xs)))}.citizen-sticky-header-backtotop .citizen-ui-icon{position:absolute;opacity:0;transform:translateX(-25%);transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-medium);transition-property:opacity,transform}.citizen-sticky-header-page-info{overflow:hidden;transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-base);transition-property:transform}.citizen-sticky-header-page-title,.citizen-sticky-header-page-tagline{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.citizen-sticky-header-page-title{font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized)}.citizen-sticky-header-page-tagline{display:none;font-size:var(--font-size-x-small);color:var(--color-subtle)}.citizen-sticky-header-dropdown-container .citizen-dropdown-details[open] .citizen-dropdown-summary{background-color:var(--background-color-button-quiet--active)}.citizen-sticky-header-dropdown-container .citizen-dropdown{position:relative}.citizen-sticky-header-dropdown-container .citizen-menu__card{top:calc(100% + var(--space-xs));right:calc(var(--space-xs) * -1);max-width:80vw;max-height:60vh;--citizen-clip-closed:var(--citizen-clip-expand-down);--citizen-translate-closed:var(--citizen-translate-expand-down)}.citizen-sticky-header-dropdown-container .citizen-menu__card-content{padding-block:var(--space-xs)}.citizen-sticky-header-visible .citizen-sticky-header-container{visibility:visible;transform:none}.mw-sticky-header-element{top:var(--header-offset-block-start) !important;transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-medium);transition-property:top}.citizen-sticky-header-visible .mw-sticky-header-element{--header-offset-block-start:calc(var(--header-size-block-start) + var(--height-sticky-header))}.citizen-siteStats{--size-icon:0.875rem;display:flex;gap:var(--space-md);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline);white-space:nowrap}.citizen-siteStats__item{display:flex;gap:var(--space-xs);align-items:center}.citizen-siteStats .citizen-ui-icon{width:0.875rem;height:0.875rem}.citizen-section-heading,section[data-mw-section-id] > .mw-heading,.mw-editsection{--size-icon:1.125rem}.citizen-section-heading{display:flex;align-items:center}.citizen-section-heading .mw-headline{flex-grow:1}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section) > :is(.mw-heading,.citizen-section-heading){cursor:pointer;-webkit-user-select:none;user-select:none}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section) > :is(.mw-heading,.citizen-section-heading)::before{flex-shrink:0;order:-2;margin-inline-end:var(--space-sm);display:block;width:var(--size-icon);height:var(--size-icon);content:'';background-color:currentcolor;-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K");-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain;transition:var(--transition-hover);transition-property:transform}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section) > :is(.mw-heading,.citizen-section-heading) :is(.mw-headline,h1,h2,h3,h4,h5,h6){transition:var(--transition-hover);transition-property:opacity}.client-js .citizen-sections-enabled.citizen-sections-interactive section:is([data-mw-section-id],.citizen-section) > :is(.mw-heading,.citizen-section-heading)::before{content:none}.client-js .citizen-sections-enabled .citizen-section-toggle{display:flex;flex-shrink:0;align-items:center;justify-content:center;order:-2;padding:0;margin-inline-end:var(--space-sm);color:inherit;appearance:none;cursor:pointer;background:transparent;border:0;border-radius:var(--border-radius-base)}.client-js .citizen-sections-enabled .citizen-section-toggle--noop::before{display:block;width:var(--size-icon);height:var(--size-icon);content:'';background-color:currentcolor;-webkit-mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K");mask-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJY29sbGFwc2UKCTwvdGl0bGU+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0ibTIuNSAxNS4yNSA3LjUtNy41IDcuNSA3LjUgMS41LTEuNS05LTktOSA5eiIvPjwvZz48L3N2Zz4K");-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain;transition:var(--transition-hover);transition-property:transform}.client-js .citizen-sections-enabled .citizen-section-toggle:focus-visible{outline:var(--border-width-thick) solid var(--color-progressive);outline-offset:var(--space-xxs)}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section).citizen-section--collapsed > :is(.mw-heading,.citizen-section-heading)::before,.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section).citizen-section--collapsed > :is(.mw-heading,.citizen-section-heading) > .citizen-section-toggle::before{transform:rotate3d(1,0,0,180deg)}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section).citizen-section--collapsed > :is(.mw-heading,.citizen-section-heading) :is(.mw-headline,h1,h2,h3,h4,h5,h6){color:var(--color-subtle)}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section).citizen-section--collapsed > [hidden]{display:none}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section).citizen-section--collapsed > [hidden='until-found']{display:block;margin-block:0}.citizen-overflow{overflow:auto hidden}.citizen-overflow-wrapper{position:relative;display:flex}.citizen-overflow-wrapper:has(.citizen-overflow-content > .wikitable){max-width:max-content;margin-block:var(--space-md);margin-inline:var(--border-width-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-border)}.citizen-overflow-wrapper:has(.citizen-overflow-content > .wikitable--fluid){max-width:none}.citizen-overflow-wrapper:has(.citizen-overflow-content > :is(ul,ol,dl,blockquote)){margin-block:var(--space-md)}.citizen-overflow-wrapper:has(.citizen-overflow-content > :is(ul,ol,dl,blockquote)).floatleft,.citizen-overflow-wrapper:has(.citizen-overflow-content > :is(ul,ol,dl,blockquote)).floatright{margin-block:0}p:not(.mw-empty-elt) + .citizen-overflow-wrapper:has(.citizen-overflow-content > :is(ul,ol,table,dl,blockquote)){margin-top:calc(var(--space-xs) * -1)}.citizen-overflow-wrapper--floatleft,.citizen-overflow-wrapper--floatright,.citizen-overflow-wrapper.floatleft,.citizen-overflow-wrapper.floatright{margin:0}.citizen-overflow-wrapper--floatleft .citizen-overflow-content > *,.citizen-overflow-wrapper--floatright .citizen-overflow-content > *,.citizen-overflow-wrapper.floatleft .citizen-overflow-content > *,.citizen-overflow-wrapper.floatright .citizen-overflow-content > *{margin:0 !important}.citizen-overflow-content{width:100%;overflow:auto hidden}.citizen-overflow-content > *{float:none !important}.citizen-overflow-content > .citizen-overflow{margin-block:0;overflow:initial}.citizen-overflow-content > .wikitable{display:table;max-width:none;margin:0;overflow:initial;box-shadow:none}.citizen-overflow-content > .wikitable--fluid{width:100%}.citizen-overflow--left > .citizen-overflow-content{-webkit-mask-image:linear-gradient(90deg,transparent,#000 var(--overflow-gradient-size));mask-image:linear-gradient(90deg,transparent,#000 var(--overflow-gradient-size))}.citizen-overflow--right > .citizen-overflow-content{-webkit-mask-image:linear-gradient(270deg,transparent,#000 var(--overflow-gradient-size));mask-image:linear-gradient(270deg,transparent,#000 var(--overflow-gradient-size))}.citizen-overflow--left.citizen-overflow--right > .citizen-overflow-content{-webkit-mask-image:linear-gradient(90deg,transparent,#000 var(--overflow-gradient-size),#000 calc(100% - var(--overflow-gradient-size)),transparent);mask-image:linear-gradient(90deg,transparent,#000 var(--overflow-gradient-size),#000 calc(100% - var(--overflow-gradient-size)),transparent)}.citizen-overflow-nav{position:absolute;inset:0;display:flex;justify-content:space-between;pointer-events:none}.citizen-overflow-navButton{display:flex;align-items:center;justify-content:center;width:2rem;height:100%;padding:0;appearance:none;cursor:pointer;background:transparent;border:0;border-radius:var(--border-radius-medium);visibility:hidden;pointer-events:none}.citizen-overflow-navButton::before{width:1.25rem}.citizen-overflow--left .citizen-overflow-navButton-left{z-index:3;visibility:visible;pointer-events:auto}.citizen-overflow-navButton-left::before{transform:rotate(-90deg)}.citizen-overflow--right .citizen-overflow-navButton-right{z-index:3;visibility:visible;pointer-events:auto}.citizen-overflow-navButton-right::before{transform:rotate(90deg)}.citizen-overflow-navButton:hover{background-color:var(--background-color-button-quiet--hover)}.citizen-overflow-navButton:active{background-color:var(--background-color-button-quiet--active)}.citizen-overflow-sticky-row{position:relative;z-index:1}.citizen-overflow-sticky-row > th,.citizen-overflow-sticky-row > td{background-color:var(--color-surface-0)}.citizen-overflow-sticky-row:not(tr){background-color:var(--color-surface-0)}.citizen-overflow-sticky-row--boundary > th,.citizen-overflow-sticky-row--boundary > td{box-shadow:0 1px 0 0 var(--border-color-base)}.citizen-overflow-sticky-row--boundary:not(tr){box-shadow:0 1px 0 0 var(--border-color-base)}.citizen-overflow-wrapper--sticky-js .citizen-overflow-sticky-row{transform:translateY(clamp(0px,calc(var(--header-offset-block-start) - var(--citizen-overflow-sticky-top,9999px)),var(--citizen-overflow-sticky-travel,0px)))}.citizen-sticky-header-visible .citizen-overflow-wrapper--sticky-js .citizen-overflow-sticky-row{--header-offset-block-start:calc(var(--header-size-block-start) + var(--height-sticky-header))}@supports (animation-timeline:view()) and (animation-range:exit-crossing 0%){.citizen-overflow-wrapper--sticky-css{view-timeline:--citizen-overflow block;view-timeline-inset:var(--header-offset-block-start) 0}.citizen-sticky-header-visible .citizen-overflow-wrapper--sticky-css{--header-offset-block-start:calc(var(--header-size-block-start) + var(--height-sticky-header))}@media (max-width:1119.98px){.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-overflow-wrapper--sticky-css{--header-offset-block-start:0px}}.citizen-overflow-wrapper--sticky-css .citizen-overflow-sticky-row{animation:citizen-overflow-sticky-band linear both;animation-timeline:--citizen-overflow;animation-range:exit-crossing 0% exit-crossing calc(100% - var(--citizen-overflow-sticky-band,0px))}}@keyframes citizen-overflow-sticky-band{from{transform:translateY(0)}to{transform:translateY(var(--citizen-overflow-sticky-travel,0))}}.citizen-animations-ready .citizen-overflow-content{scroll-behavior:smooth}.citizen-userInfo{padding:var(--space-sm) var(--space-md) var(--space-md);margin-bottom:var(--space-xs);border-bottom:var(--border-subtle);font-size:var(--font-size-small);line-height:var(--line-height-small)}.citizen-userInfo-title{font-weight:var(--font-weight-medium)}.citizen-userInfo-title > div,.citizen-userInfo #pt-userpage-2 > a,.citizen-userInfo #pt-tmpuserpage-2 > span{padding-block:var(--space-xxs);color:var(--color-emphasized);font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-large)}.citizen-userInfo #pt-userpage-2 > a > span{display:flex;flex-grow:1;flex-wrap:wrap;gap:var(--space-xs);align-items:baseline}.citizen-userInfo #pt-userpage-2 .citizen-keyboard-hint-key{display:none}.citizen-userInfo #pt-tmpuserpage-2 > span{display:block}.citizen-userInfo #pt-userpage-username{color:var(--color-subtle)}.citizen-userInfo-text{color:var(--color-subtle)}.citizen-userInfo-usergroups{display:flex;flex-wrap:wrap;gap:0 var(--space-xs);margin:0;list-style:none}.citizen-userInfo-usergroups a{color:var(--color-subtle)}.citizen-userInfo-stats{display:flex;flex-wrap:wrap;gap:var(--space-xs) var(--space-lg);margin-top:var(--space-sm)}.citizen-userInfo-stats-item{display:flex;flex-direction:column}.citizen-userInfo-stats-item-value{font-weight:var(--font-weight-medium);color:var(--color-emphasized);white-space:nowrap;font-size:var(--font-size-medium);line-height:var(--line-height-medium)}.citizen-userInfo-stats-item-label{color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}#pt-userpage-2 > a{padding-inline:0;border-radius:var(--border-radius-base)}.mw-logo-wordmark{font-size:1.25rem;font-weight:var(--font-weight-semi-bold);line-height:1;color:var(--color-emphasized)}img.mw-logo-wordmark{width:100%;height:1rem;margin:0.125rem 0;object-fit:contain;object-position:left center;filter:var(--filter-invert)}.citizen-keyboard-hint{display:none;gap:var(--space-xs);align-items:center}.citizen-keyboard-hint-label{color:var(--color-base)}.citizen-keyboard-hint-key{font-family:var(--font-family-base);font-weight:var(--font-weight-medium);color:var(--color-subtle);text-transform:capitalize;direction:ltr;unicode-bidi:isolate}.citizen-menu .mw-list-item .citizen-keyboard-hint-key{margin-left:auto}#p-navigation .citizen-keyboard-hint-key{display:none}:is(.citizen-drawer,.citizen-search) > .citizen-dropdown-details[open] > .citizen-dropdown-summary > svg{transition:var(--transition-hover);transition-property:transform}:is(a,button,summary) .citizen-ui-icon{transition:var(--transition-hover);transition-property:transform}:is(a,button,summary) .citizen-ui-icon.mw-ui-icon-wikimedia-configure{transition:none}.citizen-header__logo .mw-logo-icon,.citizen-header__logo .citizen-ui-icon{transform-origin:center center;transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-base);transition-property:color,transform,opacity}.skin-citizen .citizen-header__logo .cdx-button{color:transparent}.skin-citizen .citizen-header__logo .cdx-button:hover{color:var(--color-base)}.skin-citizen .citizen-header__logo .cdx-button:hover .mw-logo-icon{opacity:0}.skin-citizen .citizen-header__logo .cdx-button:hover .mw-logo-icon,.skin-citizen .citizen-header__logo .cdx-button:hover .citizen-ui-icon{transform:rotate(360deg);transition-duration:var(--transition-duration-medium)}.wikitable{display:block;max-width:max-content;margin-block:var(--space-md);margin-inline:var(--border-width-base);overflow-x:auto;border-collapse:collapse;border-color:var(--border-color-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-border);font-size:var(--font-size-small);line-height:var(--line-height-small)}.wikitable caption{padding:var(--space-xs) var(--space-sm);color:var(--color-emphasized);text-align:start;font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-large)}.wikitable tbody tr:hover{background-color:var(--background-color-button-quiet--hover)}.wikitable th{text-align:start}.wikitable th,.wikitable td{padding:var(--space-xs) var(--space-sm)}.wikitable tr:first-of-type th:first-child,.wikitable tr:first-of-type td:first-child{border-left-width:0;border-top-left-radius:var(--border-radius-medium)}.wikitable tr:first-of-type th:last-child,.wikitable tr:first-of-type td:last-child{border-right-width:0;border-top-right-radius:var(--border-radius-medium)}.wikitable tr:last-of-type th:first-child,.wikitable tr:last-of-type td:first-child{border-left-width:0;border-bottom-left-radius:var(--border-radius-medium)}.wikitable tr:last-of-type th:last-child,.wikitable tr:last-of-type td:last-child{border-right-width:0;border-bottom-right-radius:var(--border-radius-medium)}.wikitable > :where(caption,tr,thead,tbody,tfoot):not([hidden]) ~ :where(caption,tr,thead,tbody,tfoot):not([hidden]),.wikitable > :where(thead,tbody,tfoot) > :where(tr,thead,tbody,tfoot):not([hidden]) ~ :where(tr,thead,tbody,tfoot):not([hidden]){border-top:var(--border-width-base) solid var(--border-color-base)}.wikitable > :where(thead,tbody,tfoot):has(+ :where(thead,tbody,tfoot):not(:empty)) tr:last-of-type th:first-child,.wikitable > :where(thead,tbody,tfoot):has(+ :where(thead,tbody,tfoot):not(:empty)) tr:last-of-type td:first-child{border-bottom-left-radius:var(--border-radius-sharp)}.wikitable > :where(thead,tbody,tfoot):has(+ :where(thead,tbody,tfoot):not(:empty)) tr:last-of-type th:last-child,.wikitable > :where(thead,tbody,tfoot):has(+ :where(thead,tbody,tfoot):not(:empty)) tr:last-of-type td:last-child{border-bottom-right-radius:var(--border-radius-sharp)}.wikitable > :where(thead,tbody,tfoot) + :where(thead,tbody,tfoot):not(:empty) tr:first-of-type th:first-child,.wikitable > :where(thead,tbody,tfoot) + :where(thead,tbody,tfoot):not(:empty) tr:first-of-type td:first-child{border-top-left-radius:var(--border-radius-sharp)}.wikitable > :where(thead,tbody,tfoot) + :where(thead,tbody,tfoot):not(:empty) tr:first-of-type th:last-child,.wikitable > :where(thead,tbody,tfoot) + :where(thead,tbody,tfoot):not(:empty) tr:first-of-type td:last-child{border-top-right-radius:var(--border-radius-sharp)}.wikitable--border tr > :is(th,td):not([hidden]){border-right:var(--border-width-base) solid var(--border-color-base);border-left:var(--border-width-base) solid var(--border-color-base)}.wikitable--border tr > :is(th,td):not([hidden]):first-child{border-left:0}.wikitable--border tr > :is(th,td):not([hidden]):last-child{border-right:0}.wikitable--stripe tbody tr:nth-child(even){background-color:var(--color-surface-2)}.wikitable--fluid{max-width:none}figure[typeof~='mw:File'] > .mw-file-description,figure[typeof~='mw:File/Frameless'] > .mw-file-description,figure[typeof~='mw:File/Thumb'] > .mw-file-description,figure[typeof~='mw:File/Frame'] > .mw-file-description{display:inline-block;overflow:hidden}figure[typeof~='mw:File'] > .mw-file-description .mw-file-element,figure[typeof~='mw:File/Frameless'] > .mw-file-description .mw-file-element,figure[typeof~='mw:File/Thumb'] > .mw-file-description .mw-file-element,figure[typeof~='mw:File/Frame'] > .mw-file-description .mw-file-element,figure[typeof~='mw:File'] > .mw-file-description source,figure[typeof~='mw:File/Frameless'] > .mw-file-description source,figure[typeof~='mw:File/Thumb'] > .mw-file-description source,figure[typeof~='mw:File/Frame'] > .mw-file-description source{contain:strict;filter:var(--filter-image-brightness);transition:var(--transition-hover);transition-property:transform}table figure[typeof~='mw:File'] > .mw-file-description .mw-file-element,table figure[typeof~='mw:File/Frameless'] > .mw-file-description .mw-file-element,table figure[typeof~='mw:File/Thumb'] > .mw-file-description .mw-file-element,table figure[typeof~='mw:File/Frame'] > .mw-file-description .mw-file-element,table figure[typeof~='mw:File'] > .mw-file-description source,table figure[typeof~='mw:File/Frameless'] > .mw-file-description source,table figure[typeof~='mw:File/Thumb'] > .mw-file-description source,table figure[typeof~='mw:File/Frame'] > .mw-file-description source{max-width:none}figure[typeof~='mw:File'] > .mw-file-description:hover:not(.lazy):not(.new) .mw-file-element,figure[typeof~='mw:File/Frameless'] > .mw-file-description:hover:not(.lazy):not(.new) .mw-file-element,figure[typeof~='mw:File/Thumb'] > .mw-file-description:hover:not(.lazy):not(.new) .mw-file-element,figure[typeof~='mw:File/Frame'] > .mw-file-description:hover:not(.lazy):not(.new) .mw-file-element,figure[typeof~='mw:File'] > .mw-file-description:hover:not(.lazy):not(.new) source,figure[typeof~='mw:File/Frameless'] > .mw-file-description:hover:not(.lazy):not(.new) source,figure[typeof~='mw:File/Thumb'] > .mw-file-description:hover:not(.lazy):not(.new) source,figure[typeof~='mw:File/Frame'] > .mw-file-description:hover:not(.lazy):not(.new) source{transform:var(--transform-image-hover)}figure[typeof~='mw:File/Thumb'] > .mw-file-description,figure[typeof~='mw:File/Frame'] > .mw-file-description,figure[typeof~='mw:File/Thumb'] > span:first-child,figure[typeof~='mw:File/Frame'] > span:first-child{display:block;border-radius:var(--border-radius-base)}figure[typeof~='mw:File/Thumb'] > a:first-child:not(.mw-file-description):hover,figure[typeof~='mw:File/Frame'] > a:first-child:not(.mw-file-description):hover{color:var(--color-inverted-primary);background-color:var(--color-progressive--hover)}figure[typeof~='mw:File/Thumb'] > a:first-child:not(.mw-file-description):active,figure[typeof~='mw:File/Frame'] > a:first-child:not(.mw-file-description):active{color:var(--color-inverted-primary);background-color:var(--color-progressive--active)}figure[typeof~='mw:File/Thumb'] > a:first-child:not(.mw-file-description).new,figure[typeof~='mw:File/Frame'] > a:first-child:not(.mw-file-description).new{padding:var(--space-sm);border:var(--border-width-base) solid var(--border-color-interactive);border-style:dashed}figure[typeof~='mw:File/Thumb'] > a:first-child:not(.mw-file-description).new:hover,figure[typeof~='mw:File/Frame'] > a:first-child:not(.mw-file-description).new:hover{background-color:var(--color-destructive--hover)}figure[typeof~='mw:File/Thumb'] > a:first-child:not(.mw-file-description).new:active,figure[typeof~='mw:File/Frame'] > a:first-child:not(.mw-file-description).new:active{background-color:var(--color-destructive--active)}body.skin--responsive .mw-parser-output .noresize figure img.mw-file-element,body.skin--responsive .mw-parser-output figure.noresize img.mw-file-element,body.skin--responsive .mw-parser-output .noresize figure source,body.skin--responsive .mw-parser-output figure.noresize source{max-width:none}.mw-editsection{float:right;display:flex;align-items:center;margin-left:var(--space-sm);-webkit-user-select:none;user-select:none;font-size:var(--font-size-small);line-height:var(--line-height-small)}.mw-editsection .cdx-button--icon-only span:not(.citizen-ui-icon){display:none}.mw-content-ltr .mw-editsection,.mw-content-rtl .mw-content-ltr .mw-editsection{margin-right:0;margin-left:var(--space-sm)}.mw-content-rtl .mw-editsection,.mw-content-ltr .mw-content-rtl .mw-editsection{margin-right:var(--space-sm);margin-left:0}.mw-message-box{padding:var(--space-sm) var(--space-md);overflow:hidden;color:var(--color-emphasized);overflow-wrap:break-word;background-color:var(--color-surface-2);border:var(--border-width-base) solid var(--border-color-base);border-radius:var(--border-radius-base)}.mw-message-box > :only-child{margin:0}.mw-message-box .mw-logevent-loglines li{font-size:90%}.mw-message-box-error{background-color:var(--background-color-destructive-subtle)}.mw-message-box-warning{background-color:var(--background-color-warning-subtle)}.mw-message-box-success{background-color:var(--background-color-success-subtle)}#siteNotice .mw-message-box{border:0;border-radius:0}.usermessage{padding:var(--space-sm) var(--space-md);overflow:hidden;color:var(--color-emphasized);overflow-wrap:break-word;background-color:var(--background-color-warning-subtle);border:var(--border-width-base) solid var(--border-color-base);border-radius:var(--border-radius-base)}#siteNotice{position:relative;text-align:center}#localNotice{margin-bottom:var(--space-md)}.catlinks{clear:both;display:flex;flex-wrap:wrap;gap:var(--space-xs)}.catlinks ul{display:flex;flex-wrap:wrap;gap:var(--space-xs);margin:var(--space-xs) 0 0 0}.catlinks li{display:block}.catlinks li > a{display:block;padding:var(--space-xxs) var(--space-sm);color:var(--color-base);border:var(--border-width-base) solid var(--border-color-interactive);border-radius:var(--border-radius-pill);transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-base);transition-property:transform}.catlinks li > a:hover,.catlinks li > a:hover:visited{color:var(--color-inverted-primary);background-color:var(--background-color-progressive);border-radius:var(--border-radius-medium);transform:scale(1.05)}.catlinks li > a:hover,.catlinks li > a:focus{text-decoration:none}.catlinks li > a.new{border-style:dashed}.catlinks li > a.new:hover,.catlinks li > a.new:hover:visited{color:var(--color-inverted-fixed);background-color:var(--background-color-destructive)}.catlinks li > a.mw-redirect{font-style:italic}.mw-normal-catlinks > a,.mw-hidden-catlinks{color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}.mw-hidden-cats-hidden,.catlinks-allhidden{display:none}}@media screen and (max-width:1119.98px){.citizen-page-container{padding-block-start:var(--header-size-block-start)}}@media screen and (min-width:1120px){.citizen-page-container{padding-block:var(--header-size-block-start) var(--header-size-block-end);padding-inline:var(--header-size-inline-start) var(--header-size-inline-end)}.citizen-toc-enabled{--width-page:calc(var(--width-layout) + var(--width-toc) + var(--space-lg))}.citizen-toc-enabled .citizen-body-container{grid-template-areas:'content sidebar' 'footer footer';grid-template-columns:minmax(0,var(--width-layout)) var(--width-toc)}.citizen-page-header,.citizen-body-container{transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-medium)}.citizen-page-header{transition-property:max-width}.citizen-page-header,.firstHeading-container{flex-wrap:nowrap}.citizen-page-actions .mw-list-item{text-wrap:nowrap}.citizen-body-container{transition-property:grid}}@media screen and (min-width:1680px){.ns--1,.ns-6,.ns-14{--width-layout:var(--width-layout--extended);--width-page:calc(var(--width-layout--extended) + var(--width-toc) + var(--space-lg))}}@media screen and (prefers-color-scheme:dark){:root:not(.citizen-v4).skin-theme-clientpref-os.citizen-feature-pure-black-clientpref-1{--color-surface-0-oklch__l:0%;--color-surface-0-oklch__c:0;--color-surface-1-oklch__c:0;--color-surface-2-oklch__c:0;--color-surface-3-oklch__c:0;--color-surface-4-oklch__c:0;--color-surface-0-hsl__l:0%;--color-surface-0-hsl__s:0%;--color-surface-1-hsl__s:0%;--color-surface-2-hsl__s:0%;--color-surface-3-hsl__s:0%;--color-surface-4-hsl__s:0%;--color-emphasized-oklch__c:0;--color-base-oklch__c:0;--color-subtle-oklch__c:0;--color-placeholder-oklch__c:0;--color-emphasized-hsl__s:0%;--color-base-hsl__s:0%;--color-subtle-hsl__s:0%;--color-placeholder-hsl__s:0%;--border-color-base:rgba(255,255,255,0.1);--border-color-subtle:rgba(255,255,255,0.05);--border-color-interactive:rgba(255,255,255,0.15);--border-color-interactive--hover:rgba(255,255,255,0.25);--border-color-interactive--active:rgba(255,255,255,0.35);--color-neutral-50:oklch(98% 0 var(--color-primary-oklch__h));--color-neutral-100:oklch(94% 0 var(--color-primary-oklch__h));--color-neutral-200:oklch(90% 0 var(--color-primary-oklch__h));--color-neutral-300:oklch(84% 0 var(--color-primary-oklch__h));--color-neutral-400:oklch(73% 0 var(--color-primary-oklch__h));--color-neutral-500:oklch(51% 0 var(--color-primary-oklch__h));--color-neutral-600:oklch(39% 0 var(--color-primary-oklch__h));--color-neutral-700:oklch(30% 0 var(--color-primary-oklch__h));--color-neutral-800:oklch(22% 0 var(--color-primary-oklch__h));--color-neutral-900:oklch(17% 0 var(--color-primary-oklch__h));--color-neutral-1000:oklch(0% 0 var(--color-primary-oklch__h))}}@media screen and (max-width:1119.98px){.citizen-feature-autohide-navigation-clientpref-1 .citizen-header,.citizen-feature-autohide-navigation-clientpref-1 .citizen-page-header,.citizen-feature-autohide-navigation-clientpref-1 .citizen-page-heading,.citizen-feature-autohide-navigation-clientpref-1 .citizen-toc,.citizen-feature-autohide-navigation-clientpref-1 .citizen-page-actions{transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium)}.citizen-feature-autohide-navigation-clientpref-1 .citizen-header{transition-property:transform}.citizen-feature-autohide-navigation-clientpref-1 .citizen-page-header,.citizen-feature-autohide-navigation-clientpref-1 .citizen-toc,.citizen-feature-autohide-navigation-clientpref-1 .citizen-page-actions{transition-property:transform,opacity}.citizen-feature-autohide-navigation-clientpref-1 .citizen-page-heading{transition-property:opacity}.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-sticky-header-container,.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-header,.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-toc,.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-page-actions{transition-timing-function:var(--transition-timing-function-ease-in)}.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-header{transform:translate3d(0,100%,0)}.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-toc,.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-page-actions{pointer-events:none;opacity:0;transform:translate3d(0,var(--header-offset-block-end),0)}.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down.citizen-sticky-header-visible .citizen-sticky-header-container{transform:translate3d(0,calc(-100% - var(--header-size-block-start)),0)}.citizen-feature-autohide-navigation-clientpref-1.citizen-header-position-mobile-top .citizen-scroll--down .citizen-header{transform:translate3d(0,-100%,0)}}@media screen and (prefers-reduced-transparency:reduce){:root{--backdrop-filter-frosted-glass:none;--opacity-glass:1}}@media screen and (prefers-color-scheme:dark){:root.skin-theme-clientpref-os.citizen-feature-image-dimming-clientpref-1{--filter-image-brightness:brightness(0.8)}}@media screen and (hover:none){a,button,label{touch-action:manipulation}}@media screen and (max-width:1119.98px){.mw-body,.parsoid-body{overflow-x:hidden;overflow-x:clip}}@media screen and (min-width:1120px){.page-Main_Page.action-view .citizen-page-header-inner{border-top:var(--border-width-base) solid var(--border-color-base)}}@media screen and (min-width:640px){div.tright,.floatright{float:right;clear:right;margin-left:var(--space-lg)}div.tleft,.floatleft{float:left;clear:left;margin-right:var(--space-lg)}}@media screen and (display-mode:standalone){html.citizen-loading::after{--delay-progress-bar:0ms}}@media screen and (max-width:1119.98px){.citizen-header-position-mobile-top .citizen-header{padding:max(env(safe-area-inset-top),var(--space-xs)) max(env(safe-area-inset-right),var(--space-xs)) var(--space-xs) max(env(safe-area-inset-left),var(--space-xs))}}@media screen and (max-width:1120px){.citizen-feature-performance-mode-clientpref-0 .citizen-header{background:transparent}.citizen-feature-performance-mode-clientpref-0 .citizen-header::after{position:absolute;inset:0;z-index:-100;content:'';background-color:color-mix(in oklch,var(--color-surface-0) calc(var(--opacity-glass) * 100%),transparent);-webkit-backdrop-filter:var(--backdrop-filter-frosted-glass);backdrop-filter:var(--backdrop-filter-frosted-glass)}}@media screen and (min-width:1120px){.citizen-header{inset-block:var(--header-inset-block-start) var(--header-inset-block-end);inset-inline:var(--header-inset-inline-start) var(--header-inset-inline-end);border-block-start-width:var(--header-border-block-start-width);border-block-end-width:var(--header-border-block-end-width);border-inline-start-width:var(--header-border-inline-start-width);border-inline-end-width:var(--header-border-inline-end-width)}.citizen-header-position-left .citizen-header__logo,.citizen-header-position-right .citizen-header__logo{padding:0 0 var(--space-xs) 0;margin:var(--space-xxs) 0;border-right:0;border-bottom-width:var(--border-width-base)}.citizen-header-position-top .citizen-header{padding:var(--space-xs) var(--space-xxl)}}@media screen and (max-width:1119.98px){.citizen-header-position-mobile-top .citizen-drawer__card{top:100%;bottom:unset}}@media screen and (min-width:640px){.citizen-drawer__card{right:unset}}@media screen and (min-width:1120px){.citizen-drawer__card{right:unset;left:100%;top:0;bottom:unset}}@media screen and (min-width:1120px){.citizen-header-position-left .citizen-drawer__card{right:unset;left:100%}.citizen-header-position-right .citizen-drawer__card{right:100%;left:unset}.citizen-header-position-top .citizen-drawer__card{top:100%;right:unset;bottom:unset;left:0}.citizen-header-position-bottom .citizen-drawer__card{top:unset;right:unset;bottom:100%;left:0}}@media screen and (min-width:640px){.citizen-drawer__logo img{height:5rem}}@media screen and (min-width:1120px){.citizen-drawer__header{justify-content:flex-start}}@media screen and (hover:hover){.citizen-drawer .citizen-dropdown-summary:hover > svg > rect:first-child{transform:translateX(-25%) scaleX(0.5)}}@media screen and (min-width:1120px){.citizen-search .citizen-menu__card{top:3rem;max-height:calc(100vh - (var(--space-xs) + 3rem) * 2)}}@media screen and (max-width:1119.98px){.citizen-search .citizen-menu__card{width:auto}.citizen-search > .citizen-dropdown[open] > .citizen-menu__card{transition:none}}@media screen and (hover:hover){.citizen-search .citizen-dropdown-summary:hover > svg .citizen-icon-search__handle{stroke-dashoffset:-3.889}}@media screen and (min-width:1120px){.citizen-page-actions .citizen-menu__card{top:100%;--citizen-clip-closed:var(--citizen-clip-expand-down);--citizen-translate-closed:var(--citizen-translate-expand-down)}}@media screen and (min-width:1120px){.citizen-page-actions .citizen-dropdown{position:relative}}@media screen and (max-width:1119.98px){.citizen-page-actions{position:fixed;right:0;bottom:calc(var(--header-size-block-end) + max(env(safe-area-inset-bottom),var(--space-xs)));height:var(--toolbar-size);margin:var(--space-xs);background:var(--color-surface-1);border:1px solid var(--border-color-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-large)}.citizen-page-actions :not(.citizen-menu__card) .mw-list-item{--size-icon:1rem}.citizen-page-actions > .mw-portlet li > a{height:var(--toolbar-size)}.citizen-page-actions__item{position:unset}.citizen-page-actions .citizen-menu__card{bottom:100%;width:max-content}.citizen-page-languages .citizen-dropdown-summary::after{background:var(--color-surface-1)}}@media screen and (min-width:1120px){.citizen-page-actions > .mw-portlet li > a{gap:var(--space-xs);font-size:inherit}.citizen-page-actions .citizen-menu__card{white-space:nowrap}}@media screen and (hover:none){.citizen-dropdown-summary:hover{background-color:transparent}}@media screen and (max-width:1119.98px){.citizen-header-position-mobile-top .citizen-header__end .citizen-dropdown .citizen-menu__card{top:100%;bottom:unset}}@media screen and (min-width:640px){.citizen-header__end .citizen-dropdown .citizen-menu__card{left:unset}}@media screen and (min-width:1120px){.citizen-header__end .citizen-dropdown .citizen-menu__card{right:unset;left:100%;bottom:0}}@media screen and (min-width:1120px){.citizen-header-position-left .citizen-header__end .citizen-dropdown .citizen-menu__card{right:unset;left:100%}.citizen-header-position-right .citizen-header__end .citizen-dropdown .citizen-menu__card{right:100%;left:unset}.citizen-header-position-top .citizen-header__end .citizen-dropdown .citizen-menu__card{top:100%;right:0;bottom:unset;left:unset}.citizen-header-position-bottom .citizen-header__end .citizen-dropdown .citizen-menu__card{top:unset;right:0;bottom:100%;left:unset}}@media screen and (max-width:1119.98px){.citizen-dropdown .citizen-menu__card{max-width:calc(100vw - var(--space-xs) * 2)}.citizen-dropdown-details::before{content:'';background:var(--background-color-backdrop-light);opacity:0;transition-timing-function:var(--transition-timing-function-ease-in);transition-duration:var(--transition-duration-base);transition-property:opacity}.citizen-dropdown-details[open]::before{position:fixed;inset:0;z-index:300;opacity:1;transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium)}.citizen-dropdown-details[open] > .citizen-dropdown-summary{position:relative;z-index:351}.citizen-dropdown-details[open] + .citizen-menu__card{z-index:350}}@media screen and (max-width:1119.98px){body:has(.citizen-dropdown-details[open]){overflow:hidden}}@media screen and (min-width:1120px){.citizen-toc-enabled .citizen-page-header-inner{max-width:var(--width-page)}}@media screen and (min-width:1120px){.citizen-page-sidebar{display:flex;flex-direction:column;grid-area:sidebar;gap:var(--space-sm);margin-top:var(--space-sm);contain:size paint style}}@media screen and (max-width:1119.98px){#citizen-sidebar-lastmod{display:none}}@media screen and (max-width:1120px){.citizen-feature-autohide-navigation-clientpref-0 .citizen-footer{margin-bottom:var(--header-size-block-end)}}@media screen and (max-width:640px){.citizen-footer__content,.citizen-footer__bottom{flex-direction:column}}@media screen and (min-width:640px){.citizen-footer__bottom{align-items:center}}@media screen and (max-width:1119.98px){#footer-places{margin-inline:calc(-1 * var(--space-md))}}@media screen and (min-width:1120px){#footer-places{margin-top:calc(-1 * var(--space-xs))}}@media screen and (min-width:1120px){.citizen-footer{margin-bottom:0}}@media screen and (min-width:640px){#citizen-notifications-dropdown__card{width:24rem}}@media screen and (prefers-reduced-motion:no-preference){.citizen-notifications__placeholder-line{animation:citizen-notifications-placeholder-shimmer 1600ms linear infinite}}@media screen and (prefers-reduced-motion:no-preference){.citizen-preferences-skeleton__heading,.citizen-preferences-skeleton__label,.citizen-preferences-skeleton__description{animation:citizen-preferences-skeleton-shimmer 1600ms linear infinite}}@media screen and (prefers-reduced-motion:no-preference){.citizen-share-dialog{opacity:0;transform:scale(0.96);transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:opacity,transform,display,overlay;transition-behavior:allow-discrete}.citizen-share-dialog--animated{transition-property:opacity,transform,height,display,overlay}.citizen-share-dialog[open]{opacity:1;transform:scale(1)}@starting-style{.citizen-share-dialog[open]{opacity:0;transform:scale(0.96)}}.citizen-share-dialog::backdrop{opacity:0;transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:opacity,display,overlay;transition-behavior:allow-discrete}.citizen-share-dialog[open]::backdrop{opacity:1}@starting-style{.citizen-share-dialog[open]::backdrop{opacity:0}}}@media screen and (prefers-reduced-motion:no-preference){.citizen-share-skeleton__bar{animation:citizen-share-skeleton-shimmer 1600ms linear infinite}}@media screen and (max-width:1119.98px){.citizen-toc{position:fixed;bottom:calc(var(--header-size-block-end) + max(env(safe-area-inset-bottom),var(--space-xs)));left:0;z-index:100;pointer-events:none}.citizen-toc-card{bottom:calc(100% - var(--space-xs));width:max-content;max-height:calc(var(--header-card-maxheight) - 8rem);padding:var(--space-xs);--citizen-clip-closed:var(--citizen-clip-expand-up);--citizen-translate-closed:var(--citizen-translate-expand-up)}.citizen-toc .citizen-dropdown-summary{box-sizing:border-box;display:grid;place-content:center;width:var(--toolbar-size);height:var(--toolbar-size);margin:var(--space-xs);pointer-events:auto;background-color:var(--color-surface-1);border:1px solid var(--border-color-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-large)}.citizen-toc .citizen-dropdown-summary:hover{background:linear-gradient(var(--background-color-button-quiet--hover),var(--background-color-button-quiet--hover)) var(--color-surface-1)}.citizen-toc .citizen-dropdown-summary:active{background:linear-gradient(var(--background-color-button-quiet--active),var(--background-color-button-quiet--active)) var(--color-surface-1)}.citizen-toc .citizen-dropdown-details[open] + .citizen-menu__card{pointer-events:auto}.citizen-toc .citizen-dropdown-details[open] > .citizen-dropdown-summary{background:linear-gradient(var(--background-color-button-quiet--active),var(--background-color-button-quiet--active)) var(--color-surface-1)}}@media screen and (min-width:1120px){.citizen-toc{position:-webkit-sticky;position:sticky;top:var(--header-offset-block-start);max-height:calc(100vh - var(--header-offset-block-start));padding:var(--space-xs) 0;overflow-y:auto;overscroll-behavior:contain}.citizen-sticky-header-visible .citizen-toc{--header-offset-block-start:calc(var(--header-size-block-start) + var(--height-sticky-header))}.citizen-toc .citizen-menu__card{position:relative;min-width:auto;margin:0;contain:none;content-visibility:visible;background:transparent;border:0;border-radius:0;box-shadow:none;clip-path:none;transform:none}.citizen-toc .citizen-menu__card .citizen-menu__card-content{overflow:visible;opacity:1}.citizen-toc .citizen-dropdown-summary{display:none}}@media screen and (min-width:1120px) and (max-width:1119.98px){.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-toc{--header-offset-block-start:0px}}@media screen and (min-width:1120px){.citizen-sticky-header-container{margin-right:var(--header-size-inline-end);margin-left:var(--header-size-inline-start)}}@media screen and (max-width:1119.98px){.citizen-sticky-header-end{display:none}}@media screen and (max-width:1119.98px){.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .mw-sticky-header-element{--header-offset-block-start:0px}}@media screen and (max-width:480px){#citizen-siteStats__item--images{display:none}}@media screen and (hover:hover){.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section) > :is(.mw-heading,.citizen-section-heading) :is(.mw-headline,h1,h2,h3,h4,h5,h6):hover{opacity:var(--opacity-icon-base--hover)}.client-js .citizen-sections-enabled section:is([data-mw-section-id],.citizen-section) > :is(.mw-heading,.citizen-section-heading) :is(.mw-headline,h1,h2,h3,h4,h5,h6):active{opacity:var(--opacity-icon-base--selected)}}@media screen and (hover:hover){.client-js .citizen-sections-enabled .citizen-section-toggle:hover{opacity:var(--opacity-icon-base--hover)}.client-js .citizen-sections-enabled .citizen-section-toggle:active{opacity:var(--opacity-icon-base--selected)}}@media screen and (min-width:640px){.citizen-overflow-wrapper--floatright{float:right;clear:right;margin-left:var(--space-lg)}.citizen-overflow-wrapper--floatright:has(.citizen-overflow-content > .wikitable){margin-left:var(--space-lg)}.citizen-overflow-wrapper--floatleft{float:left;clear:left;margin-right:var(--space-lg)}.citizen-overflow-wrapper--floatleft:has(.citizen-overflow-content > .wikitable){margin-right:var(--space-lg)}}@media screen and (max-width:1119.98px){.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .citizen-overflow-wrapper--sticky-js .citizen-overflow-sticky-row{--header-offset-block-start:0px}}@media screen and print{.citizen-overflow-sticky-row{transform:none !important;animation:none !important}}@media screen and (min-width:640px){.mw-logo-wordmark{font-size:2rem;white-space:nowrap}img.mw-logo-wordmark{height:1.5rem;margin:0.25rem 0}}@media screen and (hover:hover) and (pointer:fine){.citizen-keyboard-hint{display:flex}}@media screen and (hover:hover){:is(.citizen-drawer,.citizen-search) > .citizen-dropdown-details[open] > .citizen-dropdown-summary:hover > svg{transform:scale(0.85)}}@media screen and (hover:hover){:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-configure{transform:rotate(180deg)}:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-edit{transform:translateX(2px)}:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-ellipsis{transform:rotate(-90deg)}:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-arrowUp,:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-speechBubbles,:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-userAdd{transform:translateY(-2px)}:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-history{transform:rotate(-270deg)}:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-logIn,:is(a,button,summary):hover .citizen-ui-icon.mw-ui-icon-wikimedia-share{transform:translateX(2px)}}@media print{@page{margin:1cm}:root{--border-color-base:#aaa !important;--border-width-base:1pt;--border-width-thick:2pt}.noprint,.mw-jump-link,.citizen-header,.citizen-sitenotice-container,.citizen-page-actions,.citizen-sticky-header-container,#citizen-page-header-sticky-sentinel,#citizen-page-header-sticky-placeholder,.citizen-page-footer,.citizen-page-sidebar,#footer-desc,#footer-places,.citizen-overflow-nav{display:none !important}a{color:#000;border-bottom:1pt solid var(--border-color-base)}table,img,svg{break-inside:avoid}.citizen-page-container{display:flex;flex-direction:column}.citizen-footer{order:-1;padding-block:var(--space-md);margin-bottom:var(--space-md);border-bottom:1pt solid var(--border-color-base)}.citizen-footer__container{display:flex;align-items:center;justify-content:space-between}#footer-tagline{font-size:9pt}#firstHeading{margin:0}.printfooter{margin-top:1em;font-size:9pt;border-top:1pt solid var(--border-color-base)}.wikitable{margin:1em 0;border-collapse:collapse;border:1pt solid var(--border-color-base)}.wikitable th,.wikitable td{padding:var(--space-xs) var(--space-sm);border:1pt solid var(--border-color-base)}}@layer citizen-tokens{:root{--color-base:oklch(var(--color-base-oklch__l) var(--color-base-oklch__c) var(--color-progressive-oklch__h));--color-base-fixed:#202122;--color-base--hover:oklch(calc(var(--color-base-oklch__l) + var(--delta-lightness-hover-state)) var(--color-base-oklch__c) var(--color-progressive-oklch__h));--color-emphasized:oklch(var(--color-emphasized-oklch__l) var(--color-emphasized-oklch__c) var(--color-progressive-oklch__h));--color-subtle:oklch(var(--color-subtle-oklch__l) var(--color-subtle-oklch__c) var(--color-progressive-oklch__h));--color-placeholder:oklch(var(--color-placeholder-oklch__l) var(--color-placeholder-oklch__c) var(--color-progressive-oklch__h));--color-disabled:oklch(var(--color-disabled-oklch__l) var(--color-disabled-oklch__c) var(--color-progressive-oklch__h));--color-base--subtle:var(--color-subtle);--color-inverted:#fff;--color-inverted-fixed:#fff;--color-progressive:oklch(var(--color-progressive-oklch__l) var(--color-progressive-oklch__c) var(--color-progressive-oklch__h));--color-progressive--hover:oklch(calc(var(--color-progressive-oklch__l) + var(--delta-lightness-hover-state)) var(--color-progressive-oklch__c) var(--color-progressive-oklch__h));--color-progressive--active:oklch(calc(var(--color-progressive-oklch__l) + var(--delta-lightness-active-state)) var(--color-progressive-oklch__c) var(--color-progressive-oklch__h));--color-progressive--focus:var(--color-progressive);--color-destructive:hsl(var(--color-destructive__h),100%,var(--color-destructive__l));--color-destructive--hover:hsl(var(--color-destructive__h),100%,calc(var(--color-destructive__l) + var(--delta-lightness-hover-state)));--color-destructive--active:hsl(var(--color-destructive__h),100%,calc(var(--color-destructive__l) + var(--delta-lightness-active-state)));--color-destructive--focus:var(--color-progressive);--color-visited:var(--color-link);--color-destructive--visited:var(--color-destructive);--color-error:var(--color-destructive);--color-warning:hsl(var(--color-warning__h),100%,var(--color-warning__l));--color-success:hsl(var(--color-success__h),100%,var(--color-success__l));--color-notice:var(--color-base);--color-content-added:var(--color-success);--color-content-removed:var(--color-destructive);--filter-invert-icon:0;--filter-invert-primary-button-icon:1;--box-shadow-color-base:var(--box-shadow-color-alpha-base);--box-shadow-color-progressive--active:var(--color-progressive--active);--box-shadow-color-progressive--focus:var(--color-progressive);--box-shadow-color-progressive-selected:var(--color-progressive);--box-shadow-color-progressive-selected--hover:var(--color-progressive--hover);--box-shadow-color-progressive-selected--active:var(--color-progressive--active);--box-shadow-color-destructive--focus:var(--color-progressive);--box-shadow-color-inverted:#fff;--box-shadow-color-transparent:transparent;--background-color-base:var(--color-surface-0);--background-color-base-fixed:oklch(96% 0.01 var(--color-progressive-oklch__h));--background-color-neutral:var(--color-surface-2);--background-color-neutral-subtle:var(--color-surface-1);--background-color-interactive:var(--color-surface-2);--background-color-interactive-subtle:var(--color-surface-1);--background-color-disabled:var(--color-surface-3);--background-color-disabled-subtle:var(--color-surface-1);--background-color-inverted:#101418;--background-color-progressive:var(--color-progressive);--background-color-progressive--hover:var(--color-progressive--hover);--background-color-progressive--active:var(--color-progressive--active);--background-color-progressive--focus:var(--color-progressive);--background-color-progressive-subtle:hsl(var(--color-progressive-hsl__h),var(--color-progressive-hsl__s),var(--background-color-subtle__l));--background-color-destructive:var(--color-destructive);--background-color-destructive--hover:var(--color-destructive--hover);--background-color-destructive--active:var(--color-destructive--active);--background-color-destructive--focus:var(--color-progressive);--background-color-destructive-subtle:hsl(var(--color-destructive__h),var(--background-color-subtle__s),var(--background-color-subtle__l));--background-color-error:var(--color-destructive);--background-color-error--hover:var(--color-destructive--hover);--background-color-error--active:var(--color-destructive--active);--background-color-error-subtle:var(--background-color-destructive-subtle);--background-color-warning-subtle:hsl(var(--color-warning__h),var(--background-color-subtle__s),var(--background-color-subtle__l));--background-color-success-subtle:hsl(var(--color-success__h),var(--background-color-subtle__s),var(--background-color-subtle__l));--background-color-notice-subtle:var(--color-surface-2);--background-color-content-added:var(--background-color-success-subtle);--background-color-content-removed:var(--background-color-destructive-subtle);--background-color-transparent:transparent;--background-color-backdrop-light:oklch(var(--color-surface-0-oklch__l) var(--color-surface-0-oklch__c) var(--color-progressive-oklch__h) / var(--backdrop-opacity));--background-color-backdrop-dark:rgba(0,0,0,var(--backdrop-opacity));--background-color-button-quiet--hover:rgba(0,24,73,0.027);--background-color-button-quiet--active:rgba(0,24,73,0.082);--background-color-input-binary--checked:var(--color-progressive);--background-color-tab-list-item-framed--hover:rgba(255,255,255,0.3);--background-color-tab-list-item-framed--active:rgba(255,255,255,0.65);--opacity-icon-base:0.6;--opacity-icon-base--hover:0.74;--opacity-icon-base--active:0.87;--opacity-icon-base--selected:1;--opacity-icon-base--disabled:0.51;--opacity-icon-placeholder:0.51;--opacity-icon-subtle:0.67;--border-color-base:rgb(0 0 0 / 0.1);--border-color-subtle:rgb(0 0 0 / 0.05);--border-color-muted:rgb(0 0 0 / 0.03);--border-color-interactive:rgb(0 0 0 / 0.1);--border-color-disabled:var(--border-color-subtle);--border-color-inverted:#fff;--border-color-progressive:var(--color-progressive);--border-color-progressive--hover:var(--color-progressive--hover);--border-color-progressive--active:var(--color-progressive--active);--border-color-progressive--focus:var(--color-progressive);--border-color-destructive:var(--color-destructive);--border-color-destructive--hover:var(--color-destructive--hover);--border-color-destructive--active:var(--color-destructive--active);--border-color-destructive--focus:var(--color-progressive);--border-color-error:var(--border-color-base);--border-color-error--hover:var(--border-color-base);--border-color-warning:var(--border-color-base);--border-color-success:var(--border-color-base);--border-color-notice:var(--border-color-base);--border-color-content-added:var(--border-color-base);--border-color-content-removed:var(--border-color-base);--border-color-transparent:transparent;--border-color-divider:var(--border-color-base);--outline-color-progressive--focus:var(--color-progressive);--color-link-red:var(--color-destructive);--color-link-red--hover:var(--color-destructive--hover);--color-link-red--active:var(--color-destructive--active);--color-link-red--focus:var(--color-destructive--focus);--color-link-red--visited:var(--color-destructive--visited);--border-color-input--hover:var(--border-color-interactive);--border-color-input-binary:var(--border-color-interactive);--border-color-input-binary--hover:var(--border-color-progressive--hover);--border-color-input-binary--active:var(--border-color-progressive--active);--border-color-input-binary--focus:var(--border-color-progressive--focus);--border-color-input-binary--checked:var(--border-color-progressive);--color-disabled-emphasized:var(--color-disabled);--color-visited--hover:var(--color-progressive--hover);--color-visited--active:var(--color-progressive--active);--color-destructive--visited--hover:var(--color-destructive--hover);--color-destructive--visited--active:var(--color-destructive--active);--color-error--hover:var(--color-destructive--hover);--color-error--active:var(--color-destructive--active);--color-icon-error:var(--color-destructive);--color-icon-warning:var(--color-warning);--color-icon-success:var(--color-success);--color-icon-notice:var(--color-placeholder);--mix-blend-mode-base:normal;--mix-blend-mode-blend:multiply;--background-color-interactive--hover:var(--color-surface-2--hover);--background-color-interactive--active:var(--color-surface-2--active);--background-color-progressive-subtle--hover:hsl(var(--color-progressive-hsl__h),var(--color-progressive-hsl__s),calc(var(--background-color-subtle__l) + (var(--delta-lightness-surface-base) * 3)));--background-color-progressive-subtle--active:hsl(var(--color-progressive-hsl__h),var(--color-progressive-hsl__s),calc(var(--background-color-subtle__l) + (var(--delta-lightness-surface-base) * 6)));--background-color-destructive-subtle--hover:hsl(var(--color-destructive__h),var(--background-color-subtle__s),calc(var(--background-color-subtle__l) + (var(--delta-lightness-surface-base) * 3)));--background-color-destructive-subtle--active:hsl(var(--color-destructive__h),var(--background-color-subtle__s),calc(var(--background-color-subtle__l) + (var(--delta-lightness-surface-base) * 6)));--background-color-error-subtle--hover:var(--background-color-destructive-subtle--hover);--background-color-error-subtle--active:var(--background-color-destructive-subtle--active);--border-color-interactive--hover:rgb(0 0 0 / 0.2);--border-color-interactive--active:rgb(0 0 0 / 0.3);--border-color-error--active:var(--border-color-base);--color-link-red--visited--hover:var(--color-destructive--visited--hover);--color-link-red--visited--active:var(--color-destructive--visited--active);--border-color-inverted-fixed:#fff;--border-color-emphasized:var(--color-base);--border-color-warning--hover:var(--border-color-base);--border-color-warning--active:var(--border-color-base);--color-link--focus:var(--color-progressive--focus);--color-link--visited:var(--color-visited);--color-link--visited--hover:var(--color-visited--hover);--color-link--visited--active:var(--color-visited--active);--color-neutral:var(--color-base);--color-icon-progressive:var(--color-progressive);--background-color-target-text:hsl(var(--color-warning__h),var(--background-color-subtle__s),calc(var(--background-color-subtle__l) + (var(--delta-lightness-surface-base) * 3)));--background-color-interactive-subtle--hover:var(--color-surface-1--hover);--background-color-interactive-subtle--active:var(--color-surface-1--active);--accent-color-base:var(--color-progressive);--box-shadow-color-alpha-base:oklch(var(--shadow-color-oklch__l) var(--shadow-color-oklch__c) var(--color-progressive-oklch__h) / var(--shadow-opacity));--font-size-x-small:0.75rem;--font-size-small:0.875rem;--font-size-medium:1rem;--font-size-large:1.125rem;--font-size-x-large:1.25rem;--font-size-xx-large:1.5rem;--font-size-xxx-large:1.75rem;--line-height-x-small:1.25rem;--line-height-small:1.375rem;--line-height-medium:1.625rem;--line-height-large:1.75rem;--line-height-x-large:1.875rem;--line-height-xx-large:2.125rem;--line-height-xxx-large:2.375rem;--line-height-content:1.625}@supports not (color:oklch(100% 0 0)){:root{--color-base:hsl(var(--color-progressive-hsl__h),var(--color-base-hsl__s),var(--color-base-hsl__l));--color-base--hover:hsl(var(--color-progressive-hsl__h),var(--color-base-hsl__s),calc(var(--color-base-hsl__l) + var(--delta-lightness-hover-state)));--color-emphasized:hsl(var(--color-progressive-hsl__h),var(--color-emphasized-hsl__s),var(--color-emphasized-hsl__l));--color-subtle:hsl(var(--color-progressive-hsl__h),var(--color-subtle-hsl__s),var(--color-subtle-hsl__l));--color-placeholder:hsl(var(--color-progressive-hsl__h),var(--color-placeholder-hsl__s),var(--color-placeholder-hsl__l));--color-disabled:hsl(var(--color-progressive-hsl__h),var(--color-disabled-hsl__s),var(--color-disabled-hsl__l));--color-progressive:hsl(var(--color-progressive-hsl__h),var(--color-progressive-hsl__s),var(--color-progressive-hsl__l));--color-progressive--hover:hsl(var(--color-progressive-hsl__h),var(--color-progressive-hsl__s),calc(var(--color-progressive-hsl__l) + var(--delta-lightness-hover-state)));--color-progressive--active:hsl(var(--color-progressive-hsl__h),var(--color-progressive-hsl__s),calc(var(--color-progressive-hsl__l) + var(--delta-lightness-active-state)));--background-color-backdrop-light:hsl(var(--color-progressive-hsl__h),var(--color-surface-0-hsl__s),var(--color-surface-0-hsl__l) / var(--backdrop-opacity));--box-shadow-color-alpha-base:hsl(var(--color-progressive-hsl__h) var(--shadow-color-hsl__s) var(--shadow-color-hsl__l) / var(--shadow-opacity))}}:root{--delta-lightness-state-base:4%;--delta-lightness-hover-state:calc(var(--delta-lightness-state-base) * 1);--delta-lightness-active-state:calc(var(--delta-lightness-state-base) * -1);--delta-lightness-surface-base:-2%;--color-progressive-oklch__l:53.25%;--color-progressive-oklch__c:0.1679;--color-progressive-oklch__h:262.29;--color-surface-0-oklch__l:96%;--color-surface-0-oklch__c:0.01;--color-surface-1-oklch__l:calc(var(--color-surface-0-oklch__l) + var(--delta-lightness-surface-base));--color-surface-1-oklch__c:0.015;--color-surface-2-oklch__l:calc(var(--color-surface-0-oklch__l) + (var(--delta-lightness-surface-base) * 2));--color-surface-2-oklch__c:0.02;--color-surface-3-oklch__l:calc(var(--color-surface-0-oklch__l) + (var(--delta-lightness-surface-base) * 3));--color-surface-3-oklch__c:0.03;--color-surface-4-oklch__l:calc(var(--color-surface-0-oklch__l) + (var(--delta-lightness-surface-base) * 4));--color-surface-4-oklch__c:0.04;--color-surface-0:oklch(var(--color-surface-0-oklch__l) var(--color-surface-0-oklch__c) var(--color-progressive-oklch__h));--color-surface-1:oklch(var(--color-surface-1-oklch__l) var(--color-surface-1-oklch__c) var(--color-progressive-oklch__h));--color-surface-1--hover:oklch(calc(var(--color-surface-1-oklch__l) + var(--delta-lightness-hover-state)) var(--color-surface-1-oklch__c) var(--color-progressive-oklch__h));--color-surface-1--active:oklch(calc(var(--color-surface-1-oklch__l) + var(--delta-lightness-active-state)) var(--color-surface-1-oklch__c) var(--color-progressive-oklch__h));--color-surface-2:oklch(var(--color-surface-2-oklch__l) var(--color-surface-2-oklch__c) var(--color-progressive-oklch__h));--color-surface-2--hover:oklch(calc(var(--color-surface-2-oklch__l) + var(--delta-lightness-hover-state)) var(--color-surface-2-oklch__c) var(--color-progressive-oklch__h));--color-surface-2--active:oklch(calc(var(--color-surface-2-oklch__l) + var(--delta-lightness-active-state)) var(--color-surface-2-oklch__c) var(--color-progressive-oklch__h));--color-surface-3:oklch(var(--color-surface-3-oklch__l) var(--color-surface-3-oklch__c) var(--color-progressive-oklch__h));--color-surface-4:oklch(var(--color-surface-4-oklch__l) var(--color-surface-4-oklch__c) var(--color-progressive-oklch__h));--color-emphasized-oklch__l:5%;--color-emphasized-oklch__c:0.07000000000000001;--color-base-oklch__l:20%;--color-base-oklch__c:0.09;--color-subtle-oklch__l:35%;--color-subtle-oklch__c:0.11;--color-placeholder-oklch__l:40%;--color-placeholder-oklch__c:0.07000000000000001;--color-disabled-oklch__l:60%;--color-disabled-oklch__c:0.05;--color-inverted-primary:#fff;--color-destructive__h:340;--color-destructive__l:40%;--color-success__h:170;--color-success__l:17%;--color-warning__h:48;--color-warning__l:40%;--background-color-subtle__s:95%;--background-color-subtle__l:95%;--background-color-icon:rgba(0,0,0,var(--opacity-icon-base));--background-color-icon--hover:rgba(0,0,0,var(--opacity-icon-base--hover));--background-color-icon--active:rgba(0,0,0,var(--opacity-icon-base--active));--color-link:var(--color-progressive);--color-link--hover:var(--color-progressive--hover);--color-link--active:var(--color-progressive--active);--color-syntax-red:#e53935;--color-syntax-orange:#f76d47;--color-syntax-yellow:#e2931d;--color-syntax-green:#91b859;--color-syntax-cyan:#39adb5;--color-syntax-blue:#6182b8;--color-syntax-paleblue:#8796b0;--color-syntax-purple:#9c3eda;--color-syntax-brown:#916b53;--color-syntax-pink:#ff5370;--color-syntax-violet:#945eb8;--color-syntax-gray:#90a4ae;--color-syntax-grey:var(--color-syntax-gray);--backdrop-filter-blur:blur(2px);--backdrop-filter-frosted-glass:blur(8px) saturate(140%);--backdrop-opacity:0.65;--filter-invert:none;--filter-invert-primary:invert(1) hue-rotate(180deg);--opacity-glass:0.9;--font-grade:25;--shadow-color-oklch__l:12%;--shadow-color-oklch__c:0.01;--shadow-color-hsl__s:10%;--shadow-color-hsl__l:20%;--shadow-opacity:0.03;color-scheme:light;--color-progressive-hsl__h:220;--color-progressive-hsl__s:60%;--color-progressive-hsl__l:50%;--color-surface-0-hsl__s:30%;--color-surface-0-hsl__l:96%;--color-surface-1-hsl__s:40%;--color-surface-1-hsl__l:calc(var(--color-surface-0-hsl__l) + var(--delta-lightness-surface-base));--color-surface-2-hsl__s:40%;--color-surface-2-hsl__l:calc(var(--color-surface-0-hsl__l) + (var(--delta-lightness-surface-base) * 2));--color-surface-3-hsl__s:43%;--color-surface-3-hsl__l:calc(var(--color-surface-0-hsl__l) + (var(--delta-lightness-surface-base) * 3));--color-surface-4-hsl__s:46%;--color-surface-4-hsl__l:calc(var(--color-surface-0-hsl__l) + (var(--delta-lightness-surface-base) * 4));--color-emphasized-hsl__s:85%;--color-emphasized-hsl__l:5%;--color-base-hsl__s:30%;--color-base-hsl__l:20%;--color-subtle-hsl__s:40%;--color-subtle-hsl__l:35%;--color-placeholder-hsl__s:85%;--color-placeholder-hsl__l:40%;--color-disabled-hsl__s:85%;--color-disabled-hsl__l:60%}@supports not (color:oklch(100% 0 0)){:root{--color-surface-0:hsl(var(--color-progressive-hsl__h),var(--color-surface-0-hsl__s),var(--color-surface-0-hsl__l));--color-surface-1:hsl(var(--color-progressive-hsl__h),var(--color-surface-1-hsl__s),var(--color-surface-1-hsl__l));--color-surface-1--hover:hsl(var(--color-progressive-hsl__h),var(--color-surface-1-hsl__s),calc(var(--color-surface-1-hsl__l) + var(--delta-lightness-hover-state)));--color-surface-1--active:hsl(var(--color-progressive-hsl__h),var(--color-surface-1-hsl__s),calc(var(--color-surface-1-hsl__l) + var(--delta-lightness-active-state)));--color-surface-2:hsl(var(--color-progressive-hsl__h),var(--color-surface-2-hsl__s),var(--color-surface-2-hsl__l));--color-surface-2--hover:hsl(var(--color-progressive-hsl__h),var(--color-surface-2-hsl__s),calc(var(--color-surface-2-hsl__l) + var(--delta-lightness-hover-state)));--color-surface-2--active:hsl(var(--color-progressive-hsl__h),var(--color-surface-2-hsl__s),calc(var(--color-surface-2-hsl__l) + var(--delta-lightness-active-state)));--color-surface-3:hsl(var(--color-progressive-hsl__h),var(--color-surface-3-hsl__s),var(--color-surface-3-hsl__l));--color-surface-4:hsl(var(--color-progressive-hsl__h),var(--color-surface-4-hsl__s),var(--color-surface-4-hsl__l))}}:root.skin-theme-clientpref-night{--delta-lightness-surface-base:2%;--color-progressive-oklch__l:60%;--color-progressive-hsl__l:60%;--color-surface-0-oklch__l:14%;--color-surface-0-hsl__l:4%;--color-emphasized-oklch__l:93%;--color-emphasized-oklch__c:0.03;--color-base-oklch__l:80%;--color-base-oklch__c:0.05;--color-subtle-oklch__l:70%;--color-subtle-oklch__c:0.07000000000000001;--color-placeholder-oklch__l:60%;--color-placeholder-oklch__c:0.03;--color-disabled-oklch__l:50%;--color-disabled-oklch__c:0.01;--color-emphasized-hsl__s:80%;--color-emphasized-hsl__l:95%;--color-base-hsl__s:45%;--color-base-hsl__l:85%;--color-subtle-hsl__s:35%;--color-subtle-hsl__l:70%;--color-placeholder-hsl__s:80%;--color-placeholder-hsl__l:60%;--color-disabled-hsl__s:80%;--color-disabled-hsl__l:50%;--color-destructive__l:50%;--color-success__l:35%;--color-warning__l:60%;--background-color-subtle__s:85%;--background-color-subtle__l:5%;--color-syntax-red:#f07178;--color-syntax-orange:#f78c6c;--color-syntax-yellow:#ffcb6b;--color-syntax-green:#c3e88d;--color-syntax-cyan:#89ddff;--color-syntax-blue:#82aaff;--color-syntax-paleblue:#b2ccd6;--color-syntax-purple:#c792ea;--color-syntax-brown:#916b53;--color-syntax-pink:#ff9cac;--color-syntax-violet:#bb80b3;--color-syntax-gray:#676E95;--background-color-button-quiet--hover:rgba(255,255,255,0.04);--background-color-button-quiet--active:rgba(255,255,255,0.08);--background-color-icon:rgba(255,255,255,var(--opacity-icon-base));--background-color-icon--hover:rgba(255,255,255,var(--opacity-icon-base--hover));--background-color-icon--active:rgba(255,255,255,var(--opacity-icon-base--active));--border-color-base:rgb(255 255 255 / 0.1);--border-color-subtle:rgb(255 255 255 / 0.05);--border-color-muted:rgb(255 255 255 / 0.03);--border-color-interactive:rgb(255 255 255 / 0.1);--border-color-interactive--hover:rgb(255 255 255 / 0.2);--border-color-interactive--active:rgb(255 255 255 / 0.3);--color-disabled-emphasized:var(--color-placeholder);--mix-blend-mode-blend:screen;--opacity-glass:0.8;--shadow-color-oklch__l:6%;--shadow-color-hsl__l:3%;--shadow-opacity:0.44;--filter-invert:invert(1) hue-rotate(180deg);--font-grade:0;color-scheme:dark}@media (prefers-color-scheme:dark){:root.skin-theme-clientpref-os{--delta-lightness-surface-base:2%;--color-progressive-oklch__l:60%;--color-progressive-hsl__l:60%;--color-surface-0-oklch__l:14%;--color-surface-0-hsl__l:4%;--color-emphasized-oklch__l:93%;--color-emphasized-oklch__c:0.03;--color-base-oklch__l:80%;--color-base-oklch__c:0.05;--color-subtle-oklch__l:70%;--color-subtle-oklch__c:0.07000000000000001;--color-placeholder-oklch__l:60%;--color-placeholder-oklch__c:0.03;--color-disabled-oklch__l:50%;--color-disabled-oklch__c:0.01;--color-emphasized-hsl__s:80%;--color-emphasized-hsl__l:95%;--color-base-hsl__s:45%;--color-base-hsl__l:85%;--color-subtle-hsl__s:35%;--color-subtle-hsl__l:70%;--color-placeholder-hsl__s:80%;--color-placeholder-hsl__l:60%;--color-disabled-hsl__s:80%;--color-disabled-hsl__l:50%;--color-destructive__l:50%;--color-success__l:35%;--color-warning__l:60%;--background-color-subtle__s:85%;--background-color-subtle__l:5%;--color-syntax-red:#f07178;--color-syntax-orange:#f78c6c;--color-syntax-yellow:#ffcb6b;--color-syntax-green:#c3e88d;--color-syntax-cyan:#89ddff;--color-syntax-blue:#82aaff;--color-syntax-paleblue:#b2ccd6;--color-syntax-purple:#c792ea;--color-syntax-brown:#916b53;--color-syntax-pink:#ff9cac;--color-syntax-violet:#bb80b3;--color-syntax-gray:#676E95;--background-color-button-quiet--hover:rgba(255,255,255,0.04);--background-color-button-quiet--active:rgba(255,255,255,0.08);--background-color-icon:rgba(255,255,255,var(--opacity-icon-base));--background-color-icon--hover:rgba(255,255,255,var(--opacity-icon-base--hover));--background-color-icon--active:rgba(255,255,255,var(--opacity-icon-base--active));--border-color-base:rgb(255 255 255 / 0.1);--border-color-subtle:rgb(255 255 255 / 0.05);--border-color-muted:rgb(255 255 255 / 0.03);--border-color-interactive:rgb(255 255 255 / 0.1);--border-color-interactive--hover:rgb(255 255 255 / 0.2);--border-color-interactive--active:rgb(255 255 255 / 0.3);--color-disabled-emphasized:var(--color-placeholder);--mix-blend-mode-blend:screen;--opacity-glass:0.8;--shadow-color-oklch__l:6%;--shadow-color-hsl__l:3%;--shadow-opacity:0.44;--filter-invert:invert(1) hue-rotate(180deg);--font-grade:0;color-scheme:dark}}:root.skin-theme-clientpref-black{--delta-lightness-surface-base:2%;--color-progressive-oklch__l:60%;--color-progressive-hsl__l:60%;--color-surface-0-oklch__l:14%;--color-surface-0-hsl__l:4%;--color-emphasized-oklch__l:93%;--color-emphasized-oklch__c:0.03;--color-base-oklch__l:80%;--color-base-oklch__c:0.05;--color-subtle-oklch__l:70%;--color-subtle-oklch__c:0.07000000000000001;--color-placeholder-oklch__l:60%;--color-placeholder-oklch__c:0.03;--color-disabled-oklch__l:50%;--color-disabled-oklch__c:0.01;--color-emphasized-hsl__s:80%;--color-emphasized-hsl__l:95%;--color-base-hsl__s:45%;--color-base-hsl__l:85%;--color-subtle-hsl__s:35%;--color-subtle-hsl__l:70%;--color-placeholder-hsl__s:80%;--color-placeholder-hsl__l:60%;--color-disabled-hsl__s:80%;--color-disabled-hsl__l:50%;--color-destructive__l:50%;--color-success__l:35%;--color-warning__l:60%;--background-color-subtle__s:85%;--background-color-subtle__l:5%;--color-syntax-red:#f07178;--color-syntax-orange:#f78c6c;--color-syntax-yellow:#ffcb6b;--color-syntax-green:#c3e88d;--color-syntax-cyan:#89ddff;--color-syntax-blue:#82aaff;--color-syntax-paleblue:#b2ccd6;--color-syntax-purple:#c792ea;--color-syntax-brown:#916b53;--color-syntax-pink:#ff9cac;--color-syntax-violet:#bb80b3;--color-syntax-gray:#676E95;--background-color-button-quiet--hover:rgba(255,255,255,0.04);--background-color-button-quiet--active:rgba(255,255,255,0.08);--background-color-icon:rgba(255,255,255,var(--opacity-icon-base));--background-color-icon--hover:rgba(255,255,255,var(--opacity-icon-base--hover));--background-color-icon--active:rgba(255,255,255,var(--opacity-icon-base--active));--border-color-base:rgb(255 255 255 / 0.1);--border-color-subtle:rgb(255 255 255 / 0.05);--border-color-muted:rgb(255 255 255 / 0.03);--border-color-interactive:rgb(255 255 255 / 0.1);--border-color-interactive--hover:rgb(255 255 255 / 0.2);--border-color-interactive--active:rgb(255 255 255 / 0.3);--color-disabled-emphasized:var(--color-placeholder);--mix-blend-mode-blend:screen;--opacity-glass:0.8;--shadow-color-oklch__l:6%;--shadow-color-hsl__l:3%;--shadow-opacity:0.44;--filter-invert:invert(1) hue-rotate(180deg);--font-grade:0;color-scheme:dark;--color-surface-0-oklch__l:0%;--color-surface-0-oklch__c:0;--color-surface-1-oklch__c:0;--color-surface-2-oklch__c:0;--color-surface-3-oklch__c:0;--color-surface-4-oklch__c:0;--color-surface-0-hsl__l:0%;--color-surface-0-hsl__s:0%;--color-surface-1-hsl__s:0%;--color-surface-2-hsl__s:0%;--color-surface-3-hsl__s:0%;--color-surface-4-hsl__s:0%;--color-emphasized-oklch__c:0;--color-base-oklch__c:0;--color-subtle-oklch__c:0;--color-placeholder-oklch__c:0;--color-emphasized-hsl__s:0%;--color-base-hsl__s:0%;--color-subtle-hsl__s:0%;--color-placeholder-hsl__s:0%;--border-color-base:rgba(255,255,255,0.1);--border-color-subtle:rgba(255,255,255,0.05);--border-color-interactive:rgba(255,255,255,0.15);--border-color-interactive--hover:rgba(255,255,255,0.25);--border-color-interactive--active:rgba(255,255,255,0.35);--color-neutral-50:oklch(98% 0 var(--color-primary-oklch__h));--color-neutral-100:oklch(94% 0 var(--color-primary-oklch__h));--color-neutral-200:oklch(90% 0 var(--color-primary-oklch__h));--color-neutral-300:oklch(84% 0 var(--color-primary-oklch__h));--color-neutral-400:oklch(73% 0 var(--color-primary-oklch__h));--color-neutral-500:oklch(51% 0 var(--color-primary-oklch__h));--color-neutral-600:oklch(39% 0 var(--color-primary-oklch__h));--color-neutral-700:oklch(30% 0 var(--color-primary-oklch__h));--color-neutral-800:oklch(22% 0 var(--color-primary-oklch__h));--color-neutral-900:oklch(17% 0 var(--color-primary-oklch__h));--color-neutral-1000:oklch(0% 0 var(--color-primary-oklch__h))}}

.vector-header-container,
.vector-sticky-header,
.vector-sticky-header-container,
.vector-main-menu-landmark,
.vector-appearance-landmark,
.vector-page-tools-landmark,
.vector-toc-landmark,
.vector-user-links,
#mw-panel,
.vector-page-titlebar,
.vector-page-title,
.vector-body-before-content,
.vector-page-toolbar,
.vector-page-toolbar-container,
.vector-page-tools-dropdown,
.vector-main-menu-dropdown,
.vector-user-menu,
.vector-menu-tabs,
.vector-sitenotice-container,
.vector-pinnable-element,
.vector-pinnable-header,
.vector-column-start,
.vector-column-end,
.vector-page-titlebar-toc,
.vector-collapsible,
.vector-button-flush-left,
.vector-button-flush-right,
body > #p-views,
body > #p-associated-pages,
body > #p-cactions,
body > #p-tb { display: none !important; }

html body main.mw-body {
	display: block !important;
	grid-template-columns: none !important;
	grid-template-areas: none !important;
}

html body .citizen-body-container {
	grid-template-columns: minmax(0, var(--width-layout, 1080px));
	grid-template-areas: "content" "footer";
	justify-content: center;
}
@media (min-width: 1120px) {
	html body .citizen-body-container:has(> .citizen-page-sidebar > *),
	html body.action-edit .citizen-body-container,
	html.ve-activated body .citizen-body-container {
		grid-template-columns: minmax(0, var(--width-layout, 1080px)) var(--width-toc, 240px);
		grid-template-areas: "content sidebar" "footer footer";
	}
	html body .citizen-body-container:has(> .citizen-page-sidebar > *) .citizen-page-sidebar { grid-area: sidebar; }
}
html body #bodyContent.citizen-body { grid-area: content; min-width: 0; }
html body .citizen-page-footer { grid-area: footer; }

@media (min-width: 1120px) {
html body .citizen-page-sidebar #citizen-toc {
	position: sticky;
	top: 53px;
	max-height: calc(100vh - 53px);
	overflow-y: auto;
	overscroll-behavior: contain;
	scrollbar-width: none;
	-ms-overflow-style: none;
}
html body .citizen-page-sidebar #citizen-toc::-webkit-scrollbar {
	display: none;
}
}

html body .citizen-menu__card-content {
	scrollbar-width: none;
	-ms-overflow-style: none;
}
html body .citizen-menu__card-content::-webkit-scrollbar {
	display: none;
}

html.ve-activated #citizen-page-header-sticky-sentinel,
html.ve-active #citizen-page-header-sticky-sentinel,
html.ve-active-visual #citizen-page-header-sticky-sentinel,
body.action-edit #citizen-page-header-sticky-sentinel,
html.ve-activated #citizen-sticky-header,
html.ve-active #citizen-sticky-header,
html.ve-active-visual #citizen-sticky-header,
body.action-edit #citizen-sticky-header,
html.ve-activated .citizen-sticky-header-background,
html.ve-active .citizen-sticky-header-background,
html.ve-active-visual .citizen-sticky-header-background,
body.action-edit .citizen-sticky-header-background,
html.ve-activated .citizen-sticky-header-container,
html.ve-active .citizen-sticky-header-container,
html.ve-active-visual .citizen-sticky-header-container,
body.action-edit .citizen-sticky-header-container,
html.ve-activated body.citizen-sticky-header-visible .citizen-sticky-header-container,
html.ve-active body.citizen-sticky-header-visible .citizen-sticky-header-container,
html.ve-active-visual body.citizen-sticky-header-visible .citizen-sticky-header-container,
body.action-edit.citizen-sticky-header-visible .citizen-sticky-header-container {
	display: none !important;
}

html.ve-activated .citizen-dropdown-details,
html.ve-active .citizen-dropdown-details,
html.ve-active-visual .citizen-dropdown-details,
body.action-edit .citizen-dropdown-details,
html.ve-activated .citizen-menu__card,
html.ve-active .citizen-menu__card,
html.ve-active-visual .citizen-menu__card,
body.action-edit .citizen-menu__card,
html.ve-activated .citizen-menu__card-content,
html.ve-active .citizen-menu__card-content,
html.ve-active-visual .citizen-menu__card-content,
body.action-edit .citizen-menu__card-content {
	z-index: 11000 !important;
}
html.ve-activated .citizen-page-header:has(details[open]),
html.ve-active .citizen-page-header:has(details[open]),
html.ve-active-visual .citizen-page-header:has(details[open]),
body.action-edit .citizen-page-header:has(details[open]),
html.ve-activated .citizen-header:has(details[open]),
html.ve-active .citizen-header:has(details[open]),
html.ve-active-visual .citizen-header:has(details[open]),
body.action-edit .citizen-header:has(details[open]),
html.ve-activated .citizen-body-container:has(.citizen-menu__card details[open]),
html.ve-active .citizen-body-container:has(.citizen-menu__card details[open]),
html.ve-active-visual .citizen-body-container:has(.citizen-menu__card details[open]),
body.action-edit .citizen-body-container:has(.citizen-menu__card details[open]) {
	z-index: 11000 !important;
}

html body .citizen-header__logo .mw-logo {
	position: relative !important;
	display: inline-flex !important;
	align-items: center !important;
	justify-content: center !important;
	width: 40px;
	height: 40px;
	padding: 0;
	margin: 0;
	border-radius: 4px !important;
	gap: 0 !important;
	color: var(--color-base, #202122) !important;
}
html body .citizen-header__logo .mw-logo .citizen-header-logo-svg {
	position: absolute !important;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transform-origin: center center;
	width: var(--size-icon, 1.25rem);
	height: var(--size-icon, 1.25rem);
	min-width: 0;
	min-height: 0;
	margin: 0;
	padding: 0;
	color: currentColor;
	transition-timing-function: var(--transition-timing-function-ease, ease);
	transition-duration: var(--transition-duration-medium, 0.3s);
	transition-property: transform, opacity;
}
html body .citizen-header__logo .mw-logo .citizen-header-logo-svg.citizen-header-logo-char {
	z-index: 1;
	fill: currentColor;
	opacity: 1;
	pointer-events: none;
}
html body .citizen-header__logo .mw-logo > .citizen-header-logo-svg.cv-home-icon {
	z-index: 2;
	opacity: 0;
	pointer-events: none;
}
html body .citizen-header__logo .mw-logo .citizen-header-logo-svg.cv-home-icon::before {
	display: block;
	width: 100%;
	height: 100%;
	content: '';
	background-color: currentColor;
	-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2220%22 height%3D%2220%22 viewBox%3D%220 0 20 20%22%3E%3Cg fill%3D%22%23000%22%3E%3Cpath d%3D%22M10 1 0 10h3v9h4v-4.6c0-1.47 1.31-2.66 3-2.66s3 1.19 3 2.66V19h4v-9h3z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
	mask-image: url("data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2220%22 height%3D%2220%22 viewBox%3D%220 0 20 20%22%3E%3Cg fill%3D%22%23000%22%3E%3Cpath d%3D%22M10 1 0 10h3v9h4v-4.6c0-1.47 1.31-2.66 3-2.66s3 1.19 3 2.66V19h4v-9h3z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
	-webkit-mask-repeat: no-repeat;
	mask-repeat: no-repeat;
	-webkit-mask-position: center;
	mask-position: center;
	-webkit-mask-size: contain;
	mask-size: contain;
}
html body .citizen-header__logo .mw-logo .citizen-ui-icon::before { display: none !important; }
html body .citizen-header__logo .mw-logo:hover .citizen-header-logo-svg.citizen-header-logo-char {
	opacity: 0;
	transform: translate(-50%, -50%) rotate(360deg);
}
html body .citizen-header__logo .mw-logo:hover > .citizen-header-logo-svg.cv-home-icon {
	opacity: 1;
	transform: translate(-50%, -50%) rotate(360deg);
}
html body .citizen-header { align-items: normal !important; }
html body .citizen-header .cdx-button,
html body .citizen-header .citizen-dropdown-summary { gap: 6px; }

html body a.mw-logo.citizen-drawer__logo {
	display: block !important;
	width: 80px !important;
	height: 80px !important;
	max-width: 80px !important;
	min-width: 0 !important;
	padding: 0;
	margin: 0;
}
html body a.mw-logo.citizen-drawer__logo img {
	width: 80px;
	height: 80px;
}

html .citizen-icon-search__close { opacity: 0; }
html .citizen-dropdown-details[open] .citizen-icon-search__close { opacity: 1; }
html .citizen-dropdown-details[open] .citizen-icon-search__handle { opacity: 0; }

html body .citizen-preferences-dropdown,
html body .citizen-userMenu,
html body .citizen-search,
html body .citizen-drawer { display: flex; }
html body .citizen-footer__sitetitle img { width: 48px !important; height: 48px !important; max-width: 48px !important; max-height: 48px !important; }
html body .citizen-footer__siteinfo { flex-grow: 1 !important; min-width: 0 !important; }
html body .citizen-footer #footer-places ul,
html body .citizen-footer #footer-places li,
html body .citizen-footer #footer-places a { font-size: 14px !important; }

@media (max-width: 1119.98px) {
	#citizen-toc,
	.citizen-page-actions {
		transition: opacity 200ms ease;
	}
	body.cv-footer-float-hidden #citizen-toc,
	body.cv-footer-float-hidden .citizen-page-actions {
		opacity: 0;
		pointer-events: none;
	}
}

.wikitable {
	border: 0 !important;
}
.wikitable > * > tr > th,
.wikitable > * > tr > td {
	padding: var(--space-xs) var(--space-sm) !important;
	border: 0 !important;
}
.wikitable > tr > th,
.wikitable > * > tr > th {
	text-align: start !important;
}
.wikitable > * > tr > td {
	text-align: start !important;
}

.mw-parser-output .wikitable {
	background-color: transparent;
}
.mw-parser-output .wikitable > * > tr > th,
.mw-parser-output .wikitable > * > tr > td {
	background-color: transparent;
}
.mw-parser-output .wikitable > * > tr > th {
	color: var(--color-emphasized);
}

.wikitable > caption ~ :where(tbody, thead, tfoot) > tr:first-of-type > :is(th, td),
.wikitable > caption ~ tr:first-of-type > :is(th, td) {
	border-top-left-radius: 0 !important;
	border-top-right-radius: 0 !important;
}

@media (min-width: 1120px) {
	html body.cv-sidebar-collapsed .citizen-body-container {
		grid-template-columns: minmax(0, calc(var(--width-layout, 1080px) + var(--width-toc, 240px) + var(--space-lg, 20px))) !important;
		grid-template-areas: "content" "footer" !important;
	}
	html body.cv-sidebar-collapsed .citizen-page-sidebar {
		display: none !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc {
		position: relative !important;
		top: auto !important;
		left: auto !important;
		bottom: auto !important;
		flex: none !important;
		width: auto !important;
		height: auto !important;
		max-height: none !important;
		margin: 0 !important;
		padding: 0 !important;
		overflow: visible !important;
		overscroll-behavior: auto !important;
		z-index: 1 !important;
	}
	html body.cv-sidebar-collapsed .citizen-sticky-header-start {
		overflow: visible !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc .citizen-dropdown-summary {
		display: inline-flex !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc .citizen-menu__card,
	html body.cv-sidebar-collapsed #citizen-toc .citizen-toc-card {
		position: absolute !important;
		top: calc(100% + var(--space-xs)) !important;
		left: calc(var(--space-xs) * -1) !important;
		right: auto !important;
		bottom: auto !important;
		width: max-content !important;
		min-width: 16rem !important;
		max-width: calc(100vw - var(--space-xs) * 2) !important;
		--cv-toc-card-max-h: 60vh;
		max-height: var(--cv-toc-card-max-h) !important;
		margin: var(--space-xs) !important;
		padding: 0 var(--space-xs) !important;
		contain: content !important;
		border: var(--border-width-base, 1px) solid var(--border-color-base) !important;
		border-radius: var(--border-radius-medium, 8px) !important;
		color: var(--color-base) !important;
		background-color: color-mix(in oklch, var(--color-surface-1) calc(var(--opacity-glass, 0.9) * 100%), transparent) !important;
		backdrop-filter: var(--backdrop-filter-frosted-glass) !important;
		-webkit-backdrop-filter: var(--backdrop-filter-frosted-glass) !important;
		box-shadow: var(--box-shadow-large) !important;
		z-index: 350 !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc .citizen-dropdown-details:not([open]) ~ .citizen-menu__card,
	html body.cv-sidebar-collapsed #citizen-toc .citizen-dropdown-details:not([open]) ~ .citizen-toc-card {
		content-visibility: hidden !important;
		clip-path: var(--citizen-clip-expand-down, inset(0 0 100% 0)) !important;
		transform: var(--citizen-translate-expand-down, translateY(-0.5rem)) !important;
		transition-property: clip-path, transform, content-visibility !important;
		transition-behavior: allow-discrete !important;
		transition-duration: var(--transition-duration-base, 100ms) !important;
		transition-timing-function: var(--transition-timing-function-ease-in, cubic-bezier(0.3, 0, 0.8, 0.15)) !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc .citizen-dropdown-details[open] ~ .citizen-menu__card,
	html body.cv-sidebar-collapsed #citizen-toc .citizen-dropdown-details[open] ~ .citizen-toc-card {
		content-visibility: visible !important;
		clip-path: inset(0) !important;
		transform: none !important;
		transition-property: clip-path, transform, content-visibility !important;
		transition-behavior: allow-discrete !important;
		transition-duration: var(--transition-duration-medium, 250ms) !important;
		transition-timing-function: var(--transition-timing-function-ease-out, cubic-bezier(0.05, 0.7, 0.1, 1)) !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc .citizen-menu__card-content {
		max-height: calc(var(--cv-toc-card-max-h) - 2px) !important;
		overflow: auto !important;
		opacity: 0 !important;
		transition-property: opacity !important;
		transition-duration: var(--transition-duration-base, 100ms) !important;
		transition-timing-function: var(--transition-timing-function-ease-in, cubic-bezier(0.3, 0, 0.8, 0.15)) !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc .citizen-dropdown-details[open] ~ .citizen-menu__card .citizen-menu__card-content {
		opacity: 1 !important;
		transition-duration: var(--transition-duration-medium, 250ms) !important;
		transition-timing-function: var(--transition-timing-function-ease-out, cubic-bezier(0.05, 0.7, 0.1, 1)) !important;
	}
	html body #citizen-toc .cv-toc-card-air {
		display: none !important;
	}
	html body.cv-sidebar-collapsed #citizen-toc .cv-toc-card-air {
		display: block !important;
		flex: none !important;
		height: var(--space-xs, 0.5rem) !important;
	}
}

html body .citizen-page-header .firstHeading,
html body .citizen-page-header #firstHeading,
html body .citizen-page-header h1 {
	font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", system-ui, sans-serif) !important;
	font-size: 28px !important;
	line-height: 32px !important;
	font-weight: 600 !important;
	padding: 0 !important;
	margin: 0 !important;
	border: 0 !important;
}
html body #bodyContent .mw-body-content:not(.ve-ui-surface):not(.ve-ui-mwWikitextSurface):not(.ve-ce-surface) { padding: 0 !important; margin: 0 !important; margin-block-start: var(--space-md, 16px) !important; }
html body #bodyContent #contentSub { margin: 0 !important; }
html body .citizen-page-header { margin-top: var(--space-xl, 24px) !important; padding: 0 var(--padding-page, 32px) !important; }
html body .citizen-page-header-inner {
	margin-inline: auto;
	max-width: var(--width-layout, 1080px);
}
@media (min-width: 1120px) {
	html body:is(.citizen-toc-enabled, :has(.citizen-body-container > .citizen-page-sidebar > *), .action-edit) .citizen-page-header-inner,
	html.ve-activated body .citizen-page-header-inner {
		max-width: calc(var(--width-layout, 1080px) + var(--width-toc, 240px) + var(--space-lg, 20px));
	}
}
html body .citizen-page-heading #siteSub { display: block !important; font-size: var(--font-size-small, 0.875rem); line-height: var(--line-height-x-small, 1.25rem); color: oklch(0.4 0.04 262.29); margin: 0; }

#citizen-page-header #p-views li#ca-view.selected {
	position: relative !important;
	width: auto !important;
	height: auto !important;
	overflow: visible !important;
	white-space: normal !important;
	clip-path: none !important;
}

html body #bodyContent.citizen-body,
html body .mw-body-content.citizen-body {
	font-size: var(--font-size-medium, 1rem) !important;
	line-height: var(--line-height-content, 1.75) !important;
}
html body #bodyContent h1,
html body #bodyContent h2,
html body #bodyContent h3,
html body #bodyContent h4,
html body #bodyContent h5,
html body #bodyContent h6,
html body .mw-parser-output h1,
html body .mw-parser-output h2,
html body .mw-parser-output h3,
html body .mw-parser-output h4,
html body .mw-parser-output h5,
html body .mw-parser-output h6 {
	font-family: var(--font-family-base, Roboto, system-ui, -apple-system, sans-serif) !important;
	color: oklch(0.05 0.07 262.29) !important;
	font-weight: 600 !important;
	border: 0 !important;
}
html body #bodyContent h1,
html body .mw-parser-output h1 { line-height: var(--line-height-xxx-large, 2.375rem) !important; }
html body #bodyContent h2,
html body .mw-parser-output h2 { line-height: var(--line-height-xx-large, 2.125rem) !important; }
html body #bodyContent h3,
html body .mw-parser-output h3 { line-height: var(--line-height-x-large, 1.875rem) !important; }
html body #bodyContent h4,
html body .mw-parser-output h4 { line-height: var(--line-height-large, 1.75rem) !important; }
html body #bodyContent h5,
html body #bodyContent h6,
html body .mw-parser-output h5,
html body .mw-parser-output h6 { line-height: var(--line-height-content, 1.75) !important; }
html body #bodyContent h1,
html body #bodyContent h2,
html body .mw-parser-output h1,
html body .mw-parser-output h2 {
	margin-block: 2em 0.25em !important;
}
html body #bodyContent h3,
html body #bodyContent h4,
html body .mw-parser-output h3,
html body .mw-parser-output h4 {
	margin-block: 1.5em 0.25em !important;
}
html body #bodyContent h5,
html body #bodyContent h6,
html body .mw-parser-output h5,
html body .mw-parser-output h6 {
	margin-block: 1.25em 0.25em !important;
}
html body #bodyContent h1,
html body .mw-parser-output h1 { font-size: var(--font-size-xxx-large, 1.75rem) !important; }
html body #bodyContent h2,
html body .mw-parser-output h2 { font-size: var(--font-size-xx-large, 1.5rem) !important; }
html body #bodyContent h3,
html body .mw-parser-output h3 { font-size: var(--font-size-x-large, 1.25rem) !important; }
html body #bodyContent h4,
html body .mw-parser-output h4 { font-size: var(--font-size-large, 1.125rem) !important; }
html body #bodyContent h5,
html body #bodyContent h6,
html body .mw-parser-output h5,
html body .mw-parser-output h6 { font-size: var(--font-size-medium, 1rem) !important; }
html body #bodyContent p:not(.ve-ce-paragraphNode),
html body .mw-parser-output p:not(.ve-ce-paragraphNode) {
	margin-block: var(--space-md, 16px) !important;
	overflow-wrap: break-word;
}

.mw-plusminus-pos {
	color: var(--color-success, oklch(0.56 0.11 146.07)) !important;
}
.mw-plusminus-neg {
	color: var(--color-destructive, oklch(0.56 0.19 25.26)) !important;
}
.mw-plusminus-null {
	color: var(--color-subtle) !important;
}

.mw-changeslist h4 {
	position: relative;
	z-index: 2;
	padding: var(--space-sm, 8px) 0;
	margin-bottom: 0;
	font-size: var(--font-size-x-small, 0.75rem);
	font-weight: var(--font-weight-normal, 400);
	color: var(--color-subtle);
	letter-spacing: 0.05em;
}

.mw-changeslist-line .mw-changeslist-line::before {
	content: none;
}
.mw-changeslist-line > td:first-child {
	position: relative;
}
.mw-changeslist-line > td:first-child::before {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 5px;
	width: 2px;
	content: '';
	background: var(--border-color-base, rgb(0 0 0 / 0.1));
}
.mw-changeslist-line-inner,
.mw-changeslist-separator {
	color: var(--color-subtle);
}

.mw-changeslist,
.mw-contributions-list {
	position: relative;
	font-size: var(--font-size-small, 0.875rem);
}
.mw-changeslist::before,
.mw-contributions-list::before {
	position: absolute;
	top: 0;
	bottom: 0;
	left: calc(var(--border-width-thick, 2px) + 1px);
	width: var(--border-width-thick, 2px);
	content: '';
	background: var(--border-color-base, rgb(0 0 0 / 0.1));
}
.mw-changeslist ul,
.mw-contributions-list {
	margin: 0 !important;
	list-style: none;
}

.mw-changeslist-line,
.mw-contributions-list li {
	padding: var(--space-sm, 8px) var(--space-xs, 4px) !important;
	margin: 0 0 0 16px !important;
	color: var(--color-subtle);
	border-radius: var(--border-radius-base, 4px);
}
.mw-changeslist-line:hover,
.mw-contributions-list li:hover {
	background-color: var(--background-color-button-quiet--hover, rgb(0 0 0 / 0.04));
}
.mw-changeslist-line:hover::before,
.mw-contributions-list li:hover::before {
	background-color: var(--color-emphasized);
}
.mw-changeslist-line::before,
.mw-contributions-list li::before {
	position: absolute;
	left: 0;
	display: block;
	width: 8px;
	height: 8px;
	margin-top: 7px;
	content: '';
	background-color: var(--color-subtle);
	border-radius: 100%;
	outline: 4px solid var(--color-surface-0, #fff);
}
.mw-changeslist-line .comment,
.mw-contributions-list li .comment {
	color: var(--color-base);
}

.mw-pager-navigation-bar {
	margin: var(--space-md, 16px) 0;
	color: var(--color-subtle);
}

.mw-changeslist-legend {
	position: relative;
	z-index: 2 !important;
	padding: var(--space-sm, 8px);
	font-size: var(--font-size-x-small, 0.75rem);
	background-color: var(--color-surface-2, rgb(0 0 0 / 0.04));
	border-color: var(--border-color-base, rgb(0 0 0 / 0.1));
	border-radius: var(--border-radius-base, 4px);
}
.mw-changeslist-legend strong {
	font-weight: var(--font-weight-normal, 400);
	color: var(--color-subtle);
	letter-spacing: 0.05em;
}
.mw-changeslist-legend dl,
.mw-changeslist-legend ul {
	margin-top: var(--space-xs, 4px);
}
.mw-changeslist-legend ul {
	margin-bottom: 0;
	margin-left: var(--space-sm, 8px);
}
@media (max-width: 639.98px) {
	.mw-changeslist-legend {
		margin: 0;
	}
}

#mw-history-compare {
	margin: var(--space-md, 16px) 0;
}
.mw-history-compareselectedversions {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	margin: var(--space-md, 16px) 0;
	font-size: var(--font-size-small, 0.875rem);
}
#pagehistory {
	margin: 0;
	list-style: none;
}
#pagehistory li.selected {
	color: var(--color-base--emphasized, var(--color-emphasized));
	outline-color: var(--border-color-base, rgb(0 0 0 / 0.1));
}
#pagehistory li.selected.before {
	background-color: var(--background-color-success-subtle, oklch(95% 0.03 146.07));
}
#pagehistory li.selected.after {
	background-color: var(--background-color-destructive-subtle, oklch(95% 0.05 25.26));
}

@media print {
	.mw-header,
	#mw-panel,
	.citizen-drawer__card,
	.citizen-menu__card,
	.citizen-search,
	.citizen-userMenu__card,
	.citizen-preferences__card,
	.citizen-sticky-header,
	.vector-pinnable-element { display: none !important; }
}

.citizen-command-palette{--citizen-command-palette-side-padding:var(--space-md);position:fixed;top:var(--space-xs);right:var(--space-xs);left:var(--space-xs);display:flex;flex-direction:column;max-width:56rem;max-height:calc(100vh - var(--space-xs) * 2);margin-inline:auto;overflow:hidden;border:var(--border-base);border-radius:var(--border-radius-medium);box-shadow:var(--box-shadow-drop-xx-large);transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:max-width;background-color:color-mix(in oklch,var(--color-surface-1) calc(var(--opacity-glass) * 100%),transparent);-webkit-backdrop-filter:var(--backdrop-filter-frosted-glass);backdrop-filter:var(--backdrop-filter-frosted-glass);font-size:var(--font-size-small);line-height:var(--line-height-small)}.citizen-command-palette[data-palette-layout='gallery']{max-width:60rem}@media (min-width:640px){.citizen-command-palette[data-palette-layout='gallery'] .citizen-command-palette__body-viewport--has-detail .citizen-command-palette__results{flex:3}.citizen-command-palette[data-palette-layout='gallery'] .citizen-command-palette__body-viewport--has-detail .citizen-command-palette__detail{flex:2}}@media (min-width:1119.98px){.citizen-command-palette{top:3rem;max-height:calc(100vh - 3rem * 2)}}.citizen-command-palette-backdrop{position:fixed;inset:0;background-color:var(--background-color-backdrop-light)}.citizen-command-palette__body{min-height:0;overflow:hidden;border-top:var(--border-subtle);transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:height}@media (min-width:640px){.citizen-command-palette__body-viewport--has-detail{display:flex}}.citizen-command-palette__body-viewport--uniform-type .citizen-command-palette-list-item__metadata__item--type{display:none}.citizen-command-palette__results{max-height:calc(100vh - 12rem);overflow-y:auto;overscroll-behavior:contain}@media (min-width:640px){.citizen-command-palette__body-viewport--has-detail .citizen-command-palette__results{flex:2;border-inline-end:var(--border-subtle)}.citizen-command-palette__body-viewport--has-detail .citizen-command-palette__results .citizen-command-palette-list-item__metadata,.citizen-command-palette__body-viewport--has-detail .citizen-command-palette__results .citizen-command-palette-list-item__text__description,.citizen-command-palette__body-viewport--has-detail .citizen-command-palette__results .citizen-command-palette-list-item__text-inline__description{display:none}}.citizen-command-palette__detail{display:none}@media (min-width:640px){.citizen-command-palette__detail{display:block;flex:3;max-height:calc(100vh - 12rem);overflow-y:auto;overscroll-behavior:contain}}.citizen-command-palette__no-results{padding:var(--space-md) var(--citizen-command-palette-side-padding);text-align:center}.citizen-command-palette-enter-active{transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:clip-path,transform,opacity}.citizen-command-palette-leave-active{transition-timing-function:var(--transition-timing-function-ease-in);transition-duration:var(--transition-duration-base);transition-property:clip-path,transform,opacity}.citizen-command-palette-enter-from,.citizen-command-palette-leave-to{opacity:0;clip-path:inset(0 0 100% 0);transform:translateY(calc(var(--space-xs) * -1))}.citizen-command-palette-enter-to,.citizen-command-palette-leave-from{opacity:1;clip-path:inset(0 0 0 0);transform:translateY(0)}.citizen-command-palette-backdrop-enter-active{transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:opacity}.citizen-command-palette-backdrop-leave-active{transition-timing-function:var(--transition-timing-function-ease-in);transition-duration:var(--transition-duration-base);transition-property:opacity}.citizen-command-palette-backdrop-enter-from,.citizen-command-palette-backdrop-leave-to{opacity:0}.citizen-command-palette-detail-enter-active,.citizen-command-palette-detail-leave-active{transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:flex,opacity}.citizen-command-palette-detail-enter-from,.citizen-command-palette-detail-leave-to{flex:0;opacity:0}.citizen-command-palette-empty-state{display:flex;flex-direction:column;gap:var(--space-sm);align-items:center;justify-content:center;padding:var(--space-xxl) var(--citizen-command-palette-side-padding);text-align:center}.citizen-command-palette-empty-state__icon{width:5rem;height:5rem;color:rgba(0, 18, 65, 1);accent-color:oklch(0.5325 0.1679 262.29)}.citizen-command-palette-empty-state__icon .cdx-icon{width:100%;height:100%;color:inherit}.citizen-command-palette-empty-state__content{display:flex;flex-direction:column}.citizen-command-palette-empty-state__title{font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-large);color:oklch(0.05 0.07 262.29)}.citizen-command-palette-empty-state__description{font-size:var(--font-size-medium);line-height:var(--line-height-medium);color:rgba(25, 55, 115, 1)}.citizen-command-palette__footer{display:flex;justify-content:flex-end;padding:var(--space-sm) var(--citizen-command-palette-side-padding);color:var(--color-subtle);border-top:var(--border-subtle)}.citizen-command-palette-header{--citizen-command-palette-back-button-size:24px;position:relative;padding:var(--space-sm) calc(var(--citizen-command-palette-side-padding) - 8px);transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-base);transition-property:padding-inline-start;font-size:var(--font-size-medium);line-height:var(--line-height-medium)}.citizen-command-palette-header--mode-active{padding-inline-start:calc(var(--citizen-command-palette-side-padding) - 8px + var(--citizen-command-palette-back-button-size))}.citizen-command-palette-header__back{position:absolute;inset-block:0;inset-inline-start:calc(var(--citizen-command-palette-side-padding) - 8px);min-width:var(--citizen-command-palette-back-button-size);margin-block:auto}.citizen-command-palette-header-back-enter-active,.citizen-command-palette-header-back-leave-active{transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-base);transition-property:opacity,transform}.citizen-command-palette-header-back-enter-from,.citizen-command-palette-header-back-leave-to{opacity:0;transform:translateX(-25%)}.citizen-command-palette-header__chip{flex-shrink:0;font-weight:var(--font-weight-medium);background-color:var(--background-color-interactive);border:var(--border-base);border-radius:var(--border-radius-base)}.citizen-command-palette-header__chip--outlined{background-color:transparent;border-style:dashed}.citizen-command-palette-header__chip--selected{background-color:transparent;border-color:var(--border-color-subtle)}.citizen-command-palette-header__input-area{display:flex;flex-grow:1;flex-wrap:nowrap;gap:4px;align-items:center}.citizen-command-palette-header__icon{flex-shrink:0;color:var(--color-placeholder,#72777d);transition-timing-function:var(--transition-timing-function-ease);transition-duration:var(--transition-duration-base);transition-property:opacity,transform}.citizen-command-palette-header__icon.cdx-icon{width:40px}.citizen-command-palette-header__input{flex-grow:1;min-width:0}.citizen-command-palette-header__input .cdx-text-input__input{padding-block:0;padding-inline-start:0;outline:0 !important;background-color:transparent !important;border:0 !important;box-shadow:none !important}.citizen-command-palette-header__progress-indicator{position:absolute;right:0;bottom:0;left:0}.citizen-command-palette-help__mode-summary{display:flex;gap:var(--space-sm);align-items:flex-start;padding-block-end:var(--space-md)}.citizen-command-palette-help__mode-thumbnail{flex-shrink:0}.citizen-command-palette-help__mode-text{flex:1;min-width:0}.citizen-command-palette-help__mode-label{font-size:var(--font-size-medium);line-height:var(--line-height-medium);font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized)}.citizen-command-palette-help__mode-description{color:var(--color-subtle)}.citizen-command-palette-help__triggers{display:flex;flex-wrap:wrap;gap:var(--space-xs)}.citizen-command-palette-help__trigger-chip{padding:var(--space-xxs) var(--space-sm);font-family:var(--font-family-monospace);font-size:var(--font-size-medium);color:var(--color-base);background-color:var(--background-color-interactive);border:var(--border-subtle);border-radius:var(--border-radius-pill)}.citizen-command-palette-help__long-description code{padding:0 var(--space-xxs);background-color:var(--background-color-interactive);border-radius:var(--border-radius-base)}.citizen-command-palette__footer-hints{display:flex;flex-wrap:wrap;gap:var(--space-sm)}.citizen-command-palette-list{padding-block:var(--space-xs)}.citizen-command-palette-list__heading{padding-block:var(--space-xs) var(--space-xxs);padding-inline:var(--citizen-command-palette-side-padding);color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}.citizen-command-palette-list-item{position:relative;outline:0;list-style:none}.citizen-command-palette-list-item--highlighted{cursor:pointer;background-color:var(--background-color-interactive-subtle--hover);--actions-fade-color:var(--background-color-interactive-subtle--hover)}.citizen-command-palette-list-item--active{background-color:var(--background-color-interactive-subtle--active);--actions-fade-color:var(--background-color-interactive-subtle--active)}.citizen-command-palette-gallery{padding-block:var(--space-md);padding-inline:var(--citizen-command-palette-side-padding)}.citizen-command-palette-gallery__heading{padding-block:var(--space-xs) var(--space-xxs);color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}.citizen-command-palette-gallery__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--space-sm)}.citizen-command-palette-detail-panel{padding:var(--space-md) var(--citizen-command-palette-side-padding);overflow-y:auto}.citizen-command-palette-detail-panel__media{margin-block-end:var(--space-md);border:1px solid var(--border-color-subtle);border-radius:var(--border-radius-medium)}.citizen-command-palette-detail-panel__header{display:flex;gap:var(--space-xs);align-items:flex-start;padding-block-end:var(--space-md)}.citizen-command-palette-detail-panel__header-text{flex:1;min-width:0}.citizen-command-palette-detail-panel__header-label{font-size:var(--font-size-medium);line-height:var(--line-height-medium);font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized);overflow-wrap:break-word}.citizen-command-palette-detail-panel__header-description{color:var(--color-subtle)}.citizen-command-palette-detail-panel__header-copy{flex-shrink:0}.citizen-command-palette-detail-panel__header-copy--copied{color:var(--color-success) !important}.citizen-command-palette-detail-panel__pairs{display:flex;flex-direction:column;gap:var(--space-md);margin:0}.citizen-command-palette-detail-panel__pair{display:flex;flex-direction:column;gap:2px}.citizen-command-palette-detail-panel__label{color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}.citizen-command-palette-detail-panel__value{margin:0;overflow-wrap:break-word}.citizen-command-palette-list-item__actions{position:absolute;inset-inline-end:var(--citizen-command-palette-side-padding);top:0;display:flex;gap:var(--space-xxs);align-items:center;height:100%;padding-left:var(--space-xl);pointer-events:none;background-image:linear-gradient(to right,transparent 0%,transparent 30%,var(--actions-fade-color,inherit) 70%);opacity:0;transform:translateX(16px);transition-timing-function:var(--transition-timing-function-ease-in);transition-duration:var(--transition-duration-base);transition-property:opacity,transform}.citizen-command-palette-list-item__actions--visible{pointer-events:auto;opacity:1;transform:none;transition-timing-function:var(--transition-timing-function-ease-out)}.citizen-command-palette-list-item__action{border-radius:var(--border-radius-base)}a.citizen-command-palette-list-item__action.cdx-button .cdx-icon{padding:0}.citizen-command-palette-list-item__content{display:flex;column-gap:var(--space-sm);align-items:center;padding:var(--space-sm) var(--citizen-command-palette-side-padding);text-decoration:none}button.citizen-command-palette-list-item__content{width:100%;font:inherit;color:inherit;text-align:inherit;cursor:pointer;background:none;border:0}.citizen-command-palette-list-item__content:hover{text-decoration:none}.citizen-command-palette-list-item__content--compact{padding-block:var(--space-xs)}.citizen-command-palette-list-item__icon{flex-shrink:0;color:var(--color-subtle)}.citizen-command-palette-list-item__text{flex:1;min-width:0;overflow:hidden;line-height:1.125rem}.citizen-command-palette-list-item__text__label{font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized);font-size:var(--font-size-medium);line-height:var(--line-height-medium)}.citizen-command-palette-list-item__text__label .cdx-search-result-title{display:inline}.citizen-command-palette-list-item__text__description{color:var(--color-subtle)}.citizen-command-palette-list-item__text .cdx-search-result-title{font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized)}.citizen-command-palette-list-item__text .cdx-search-result-title__match{color:var(--color-subtle)}.citizen-command-palette-list-item__text__label,.citizen-command-palette-list-item__text__description{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.citizen-command-palette-list-item__text-inline{display:flex;flex:1;column-gap:var(--space-xs);align-items:baseline;min-width:0;font-size:var(--font-size-medium);line-height:var(--line-height-medium)}.citizen-command-palette-list-item__text-inline .citizen-command-palette-list-item__text__label{flex-shrink:0;min-width:0;max-width:100%;overflow:hidden;text-overflow:ellipsis;font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized);white-space:nowrap}.citizen-command-palette-list-item__text-inline .citizen-command-palette-list-item__text__label .cdx-search-result-title{display:inline;font-weight:var(--font-weight-semi-bold);color:var(--color-emphasized)}.citizen-command-palette-list-item__text-inline .citizen-command-palette-list-item__text__label .cdx-search-result-title__match{color:var(--color-subtle)}.citizen-command-palette-list-item__text-inline__description{flex:1 1 0;min-width:0;overflow:hidden;text-overflow:ellipsis;color:var(--color-subtle);white-space:nowrap}.citizen-command-palette-list-item__metadata{display:flex;gap:var(--space-xxs);color:var(--color-subtle)}.citizen-command-palette-list-item__metadata__item{display:flex;column-gap:var(--space-xxs);align-items:center;padding:2px var(--space-xs);line-height:var(--line-height-small);background:var(--color-surface-2);border:var(--border-subtle);border-radius:var(--border-radius-base)}.citizen-command-palette-list-item__metadata__item .cdx-icon{color:var(--color-subtle)}.citizen-command-palette-list-item__metadata__item--status-success{color:var(--color-success);background-color:var(--background-color-success-subtle);border-color:var(--border-color-success)}.citizen-command-palette-list-item__metadata__item--status-error{color:var(--color-error);background-color:var(--background-color-error-subtle);border-color:var(--border-color-error)}.citizen-command-palette-gallery-item{display:block;padding:0;overflow:hidden;color:inherit;text-decoration:none;cursor:pointer;outline:0;background:none;border:0;border-radius:var(--border-radius-medium)}a.citizen-command-palette-gallery-item,button.citizen-command-palette-gallery-item{font:inherit;color:inherit;text-align:inherit}.citizen-command-palette-gallery-item:hover{text-decoration:none}.citizen-command-palette-gallery-item__thumbnail{border:1px solid var(--border-color-subtle);border-radius:var(--border-radius-medium)}.citizen-command-palette-gallery-item__thumbnail::after{position:absolute;inset:0;pointer-events:none;content:'';border-radius:inherit;box-shadow:inset 0 0 0 2px transparent}.citizen-command-palette-gallery-item--highlighted .citizen-command-palette-gallery-item__thumbnail{border-color:var(--border-color-progressive)}.citizen-command-palette-gallery-item--highlighted .citizen-command-palette-gallery-item__thumbnail::after{box-shadow:inset 0 0 0 2px var(--border-color-progressive)}.citizen-command-palette-gallery-item--active .citizen-command-palette-gallery-item__thumbnail{border-color:var(--border-color-progressive--active)}.citizen-command-palette-gallery-item--active .citizen-command-palette-gallery-item__thumbnail::after{box-shadow:inset 0 0 0 2px var(--border-color-progressive--active)}.citizen-command-palette-image{position:relative;display:block;overflow:hidden;background-color:var(--background-color-neutral-subtle)}.citizen-command-palette-image--ratio-1-1{aspect-ratio:1}.citizen-command-palette-image--ratio-4-3{aspect-ratio:1.33333333}.citizen-command-palette-image--ratio-3-2{aspect-ratio:1.5}.citizen-command-palette-image--ratio-16-9{aspect-ratio:1.77777778}.citizen-command-palette-image__image{display:block;width:100%;height:100%}.citizen-command-palette-image__image--fit-fill{object-fit:fill}.citizen-command-palette-image__image--fit-contain{object-fit:contain}.citizen-command-palette-image__image--fit-cover{object-fit:cover}.citizen-command-palette-image__image--fit-none{object-fit:none}.citizen-command-palette-image__image--fit-scale-down{object-fit:scale-down}.citizen-command-palette-image__placeholder{display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--color-subtle)}.citizen-command-palette-image__placeholder-icon.cdx-icon--medium{width:25% !important;min-width:2rem !important;height:auto !important;min-height:0 !important;aspect-ratio:1}

.citizen-command-palette{--font-size-medium:1rem;--line-height-medium:1.625rem;}

.citizen-command-palette-list-item__thumbnail.cdx-thumbnail{display:flex;width:2.5rem;height:2.5rem;flex-shrink:0;padding:0;border:0;border-radius:0;background-color:transparent;color:oklch(0.5325 0.1679 262.29);}
.citizen-command-palette-list-item__thumbnail .cdx-thumbnail__placeholder{display:flex;align-items:center;justify-content:center;width:100%;height:100%;background-color:oklch(0.94 0.015 262.29);}
.citizen-command-palette-list-item__thumbnail .cdx-icon{width:1.25rem;height:1.25rem;}
.citizen-command-palette-list-item__thumbnail .cdx-icon svg{width:100%;height:100%;}
.citizen-command-palette .cdx-thumbnail__placeholder__icon--vue.cdx-icon{color:oklch(0.4 0.07 262.29);}
.citizen-command-palette .cdx-thumbnail__placeholder__icon--vue.cdx-icon svg{color:inherit;}

.cdx-text-input{display:inline-flex;align-items:center;min-width:100%;min-height:32px;background-color:var(--background-color-base,#fff);border:1px solid var(--border-color-base,#a2a9b1);border-radius:var(--border-radius-base,4px);}
.cdx-text-input--status-default{border-color:var(--border-color-base,#a2a9b1);}
.cdx-text-input__input{flex:1 1 auto;min-width:0;min-height:32px;height:32px;padding:0 8px;border:0;background:transparent;box-shadow:none;font-family:inherit;font-size:16px;line-height:22px;color:var(--color-base,#202122);appearance:none;}
.cdx-text-input__input:focus{outline:0;}

.citizen-command-palette-header__input.cdx-text-input{background-color:transparent;border:none;border-radius:0;min-height:0;flex-grow:1;min-width:0;}
.citizen-command-palette-header__input .cdx-text-input__input,
.citizen-command-palette-header__input .cdx-text-input__input:enabled{
	color:rgba(0, 18, 65, 1);
	accent-color:oklch(0.5325 0.1679 262.29);
	appearance:none;
	background-color:rgba(0, 0, 0, 0);
	border-bottom-color:oklch(0.2 0.09 262.29);
	border-bottom-width:0;
	border-bottom-style:none;
}
.citizen-command-palette-header__input .cdx-text-input__input::placeholder{color:oklch(0.4 0.07 262.29);opacity:1;}

.citizen-command-palette-header__input .cdx-text-input__clear-icon{position:absolute;top:50%;right:9px;transform:translateY(-50%);flex-shrink:0;min-width:16px;min-height:16px;width:1rem;height:1rem;color:var(--color-base,#202122);cursor:pointer;display:none;border-radius:0;}
.citizen-command-palette-header__input.cdx-text-input--has-value .cdx-text-input__clear-icon{display:inline-flex;}
.citizen-command-palette-header__input .cdx-text-input__clear-icon:hover{background-color:var(--background-color-interactive-subtle,#f8f9fa);}

.citizen-notifications-button::after{display:none !important}

.cdx-label{display:flex;flex-direction:column;line-height:1.375}
.cdx-label__label__icon.cdx-icon{margin-right:4px}
.cdx-label__label__text{font-weight:700}
legend.cdx-label{padding:0}
fieldset label.cdx-label__label .cdx-label__label__text{font-weight:400}
.cdx-label:not(.cdx-label--disabled) .cdx-label__label__optional-flag,.cdx-label:not(.cdx-label--disabled) .cdx-label__description{color:var(--color-subtle,#54595d)}
.cdx-label--disabled,.cdx-label--disabled .cdx-label__label__icon{color:var(--color-disabled,#72777d)}
.cdx-label--visually-hidden{display:block;clip:rect(1px,1px,1px,1px);position:absolute!important;width:1px;height:1px;margin:-1px;border:0;padding:0;overflow:hidden}
.cdx-label:not(.cdx-label--visually-hidden){padding-bottom:8px}
.cdx-checkbox__label,.cdx-checkbox__label.cdx-label{display:inline-flex;position:relative;z-index:0;padding-left:calc(1.25rem + 8px);line-height:1.4285714}
.cdx-checkbox__label.cdx-label{padding-bottom:0}
.cdx-checkbox__label.cdx-label .cdx-label__label__text{font-weight:400}
.cdx-checkbox:hover>.cdx-checkbox__input:enabled,.cdx-checkbox:hover>.cdx-checkbox__input:enabled~.cdx-label .cdx-label__label,.cdx-checkbox:hover>.cdx-checkbox__input:enabled~.cdx-checkbox__label:not(.cdx-label){cursor:pointer}
.cdx-checkbox__input:disabled~.cdx-checkbox__label,.cdx-checkbox__input:disabled~.cdx-checkbox__label.cdx-label{color:var(--color-disabled,#72777d)}
.cdx-menu-item{list-style:none;position:relative;padding:8px 12px;line-height:1.6;transition-property:background-color,color,border-color,box-shadow;transition-duration:.1s}
.cdx-menu-item__content{display:flex;align-items:center;line-height:1.4285714;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}
.cdx-menu-item__content,.cdx-menu-item__content:hover{text-decoration:none}
.cdx-menu-item--has-description .cdx-menu-item__content{align-items:flex-start}
.cdx-menu-item__text{max-width:100%}
.cdx-menu-item__text__description{display:block}
.cdx-menu-item__thumbnail.cdx-thumbnail,.cdx-menu-item__icon{margin-right:8px}
.cdx-menu-item__selected-icon{height:1.4285714em;margin-left:auto}
.cdx-menu-item__icon.cdx-icon,.cdx-menu-item__selected-icon.cdx-icon{color:inherit}
.cdx-menu-item--bold-label .cdx-menu-item__text__label{font-weight:700}
.cdx-menu-item--hide-description-overflow .cdx-menu-item__text{overflow:hidden}
.cdx-menu-item--hide-description-overflow .cdx-menu-item__text__description{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cdx-menu-item--enabled,.cdx-menu-item--enabled .cdx-menu-item__content{color:var(--color-base,#202122)}
.cdx-menu-item--enabled .cdx-menu-item__text__supporting-text,.cdx-menu-item--enabled .cdx-menu-item__text__description{color:var(--color-subtle,#54595d)}
.cdx-menu-item--enabled.cdx-menu-item--highlighted{background-color:var(--background-color-interactive-subtle,#f8f9fa);color:var(--color-base--hover,#404244);cursor:pointer}
.cdx-menu-item--enabled.cdx-menu-item--highlighted .cdx-menu-item__content,.cdx-menu-item--enabled.cdx-menu-item--highlighted .cdx-menu-item__text__description{color:var(--color-base--hover,#404244)}
.cdx-menu-item--enabled.cdx-menu-item--active{background-color:var(--background-color-interactive,#eaecf0);color:var(--color-emphasized,#101418)}
.cdx-menu-item--enabled.cdx-menu-item--active .cdx-menu-item__content,.cdx-menu-item--enabled.cdx-menu-item--active .cdx-menu-item__text__description{color:var(--color-emphasized,#101418)}
.cdx-menu-item--enabled.cdx-menu-item--selected{background-color:var(--background-color-progressive-subtle,#f1f4fd)}
.cdx-menu-item--enabled.cdx-menu-item--selected .cdx-menu-item__content{color:var(--color-progressive,#36c)}
.cdx-menu-item--enabled.cdx-menu-item--selected.cdx-menu-item--highlighted .cdx-menu-item__content{color:var(--color-progressive--hover,#4b77d6)}
.cdx-menu-item--enabled.cdx-menu-item--selected.cdx-menu-item--highlighted .cdx-menu-item__text__description{color:var(--color-subtle,#54595d)}
.cdx-menu-item--enabled.cdx-menu-item--selected.cdx-menu-item--active .cdx-menu-item__content{color:var(--color-progressive--active,#233566)}
.cdx-menu-item--enabled.cdx-menu-item--selected.cdx-menu-item--active .cdx-menu-item__text__description{color:var(--color-subtle,#54595d)}
.cdx-menu-item--disabled{color:var(--color-disabled,#72777d);cursor:default}
.cdx-menu-item--disabled .cdx-menu-item__text__description{color:var(--color-disabled,#72777d)}
.cdx-menu-item--destructive .cdx-menu-item__content{color:var(--color-destructive,#d73333)}
.cdx-menu-item--destructive.cdx-menu-item--highlighted .cdx-menu-item__content{color:var(--color-destructive--hover,#fc493b)}
.cdx-menu-item--destructive.cdx-menu-item--active .cdx-menu-item__content{color:var(--color-destructive--active,#9f3526)}
.cdx-menu-item--destructive.cdx-menu-item--selected.cdx-menu-item--highlighted .cdx-menu-item__content,.cdx-menu-item--destructive.cdx-menu-item--selected.cdx-menu-item--highlighted .cdx-menu-item__text__description{color:var(--color-destructive--hover,#fc493b)}
.cdx-menu{background-color:var(--background-color-base,#fff);display:flex;flex-direction:column;position:absolute;left:0;z-index:50;box-sizing:border-box;width:100%;border:1px solid var(--border-color-base,#a2a9b1);border-radius:2px;box-shadow:0 2px 2px rgba(0,0,0,.2)}
.cdx-menu__progress-bar.cdx-progress-bar{position:absolute;top:0}
.cdx-menu__listbox{margin:0;padding:0;overflow-y:auto}
.cdx-menu--has-footer .cdx-menu-item:last-of-type{position:absolute;bottom:0;box-sizing:border-box;width:100%}
.cdx-menu--has-footer .cdx-menu-item:last-of-type:not(:first-of-type){border-top:1px solid var(--border-color-subtle,#c8ccd1)}
.cdx-menu-button__menu-wrapper{position:relative}
.cdx-menu-button .cdx-menu{min-width:8rem;max-width:16rem}
.cdx-dialog .cdx-menu-button{position:static}
.cdx-radio__label,.cdx-radio__label.cdx-label{display:inline-flex;position:relative;z-index:0;padding-left:calc(1.25rem + 8px);line-height:1.4285714}
.cdx-radio__label.cdx-label{padding-bottom:0}
.cdx-radio__label.cdx-label .cdx-label__label__text{font-weight:400}
.cdx-radio:hover>.cdx-radio__input:enabled,.cdx-radio:hover>.cdx-radio__input:enabled~.cdx-label .cdx-label__label,.cdx-radio:hover>.cdx-radio__input:enabled~.cdx-radio__label:not(.cdx-label){cursor:pointer}
.cdx-radio__input:disabled~.cdx-radio__label,.cdx-radio__input:disabled~.cdx-radio__label.cdx-label{color:var(--color-disabled,#72777d)}
.cdx-select-vue{display:inline-block;position:relative}
.cdx-select-vue__handle{box-sizing:border-box;min-width:256px;min-height:32px;border-width:1px;border-style:solid;border-radius:2px;padding-top:4px;padding-bottom:4px;padding-left:12px;padding-right:calc(16px + 1.25rem);font-size:inherit;line-height:1.375;position:relative;width:100%}
.cdx-select-vue--has-start-icon .cdx-select-vue__handle{padding-left:calc(20px + 1.25rem)}
.cdx-select-vue__start-icon.cdx-icon{position:absolute;top:50%;min-width:20px;min-height:20px;width:1.25rem;height:1.25rem;transition-property:color;transition-duration:.1s;left:12px;transform:translateY(-50%)}
.cdx-select-vue__indicator.cdx-icon{color:var(--color-base,#202122);position:absolute;top:50%;min-width:12px;min-height:12px;width:.75rem;height:.75rem;transition-property:color;transition-duration:.1s;right:12px;transform:translateY(-50%)}
.cdx-select-vue--enabled .cdx-select-vue__handle{background-color:var(--background-color-interactive-subtle,#f8f9fa);color:var(--color-base,#202122);border-color:var(--border-color-base,#a2a9b1);transition-property:background-color,color,border-color,box-shadow;transition-duration:.1s}
.cdx-select-vue--enabled .cdx-select-vue__handle:hover{background-color:var(--background-color-base,#fff);color:var(--color-base--hover,#404244);border-color:var(--border-color-base,#a2a9b1);cursor:pointer}
.cdx-select-vue--enabled .cdx-select-vue__handle:focus{border-color:var(--border-color-progressive--focus,#36c);box-shadow:inset 0 0 0 1px var(--box-shadow-color-progressive--focus,#36c);outline:1px solid transparent}
.cdx-select-vue--enabled .cdx-select-vue__handle:active{color:var(--color-emphasized,#101418);border-color:var(--border-color-interactive,#72777d)}
.cdx-select-vue--enabled .cdx-select-vue__handle:hover .cdx-select-vue__indicator{color:var(--color-base--hover,#404244)}
.cdx-select-vue--enabled.cdx-select-vue--expanded .cdx-select-vue__handle{background-color:var(--background-color-base,#fff)}
.cdx-select-vue--enabled.cdx-select-vue--expanded .cdx-select-vue__handle .cdx-select-vue__indicator{color:var(--color-base,#202122)}
.cdx-select-vue--disabled .cdx-select-vue__handle{background-color:var(--background-color-disabled-subtle,#eaecf0);color:var(--color-disabled,#72777d);border-color:var(--border-color-disabled,#c8ccd1);cursor:default}
.cdx-select-vue--disabled .cdx-select-vue__indicator,.cdx-select-vue--disabled .cdx-select-vue__start-icon{color:var(--color-disabled,#72777d)}
.cdx-select-vue--status-error.cdx-select-vue--enabled .cdx-select-vue__handle{border-color:var(--border-color-error,#9f3526)}
.cdx-select-vue--status-error.cdx-select-vue--enabled .cdx-select-vue__handle:hover{border-color:var(--border-color-error--hover,#fc493b)}
.cdx-select-vue--status-error.cdx-select-vue--enabled .cdx-select-vue__handle:focus{border-color:var(--border-color-progressive--focus,#36c)}
.cdx-dialog .cdx-select-vue{position:static}
.cdx-table-pager__start .cdx-select,.cdx-table-pager__start .cdx-select-vue__handle{min-width:8rem}
.cdx-toggle-switch{display:inline-flex;align-items:center;justify-content:flex-start;position:relative;z-index:0;margin-bottom:12px}
.cdx-toggle-switch--align-switch{display:flex;justify-content:space-between}
.cdx-toggle-switch:last-child{margin-bottom:0}
.cdx-toggle-switch__label,.cdx-toggle-switch__label.cdx-label{order:-1}
.cdx-toggle-switch__label:not(:empty),.cdx-toggle-switch__label.cdx-label:not(:empty){padding-right:6px}
.cdx-toggle-switch .cdx-toggle-switch__label.cdx-label{padding-bottom:0}
.cdx-toggle-switch .cdx-toggle-switch__label.cdx-label .cdx-label__label__text{font-weight:400}
.cdx-toggle-switch__switch{transform:translateZ(0);background-color:var(--background-color-interactive-subtle,#f8f9fa);display:inline-block;flex-shrink:0;position:relative;box-sizing:border-box;min-width:48px;min-height:32px;width:3rem;height:2rem;border-width:1px;border-style:solid;border-color:var(--border-color-interactive,#72777d);border-radius:9999px;overflow:hidden;transition-property:background-color,color,border-color,box-shadow;transition-duration:.25s}
.cdx-toggle-switch__switch:before{content:"";display:block;position:absolute;top:1px;right:1px;bottom:1px;left:1px;z-index:1;border:1px solid var(--border-color-transparent,transparent);border-radius:9999px;transition-property:background-color,color,border-color,box-shadow;transition-duration:.25s}
.cdx-toggle-switch__switch__grip{position:absolute;top:50%;box-sizing:border-box;min-width:20px;min-height:20px;width:1.25rem;height:1.25rem;border:1px solid var(--border-color-interactive,#72777d);border-radius:50%;transform:translate(.3125rem) translateY(-50%);transition-property:background-color,border-color,transform;transition-duration:.25s,.1s,.1s}
.cdx-toggle-switch__input{opacity:0;position:absolute;right:0;z-index:2;min-width:48px;min-height:32px;width:3rem;height:2rem;margin:0;font-size:inherit}
.cdx-toggle-switch__input:checked~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{background-color:var(--background-color-base,#fff);border-color:var(--border-color-inverted,#fff);transform:translate(calc(100% + .0625rem)) translateY(-50%)}
.cdx-toggle-switch__input:enabled:hover,.cdx-toggle-switch__input:enabled~.cdx-label .cdx-label__label:hover,.cdx-toggle-switch__input:enabled~.cdx-toggle-switch__label:not(.cdx-label):hover{cursor:pointer}
.cdx-toggle-switch__input:enabled~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{background-color:var(--background-color-base-fixed,#fff)}
.cdx-toggle-switch__input:enabled:hover~.cdx-toggle-switch__switch{background-color:var(--background-color-base,#fff);border-color:var(--border-color-progressive--hover,#4b77d6)}
.cdx-toggle-switch__input:enabled:hover~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{background-color:var(--background-color-base-fixed,#fff);border-color:var(--border-color-progressive--hover,#4b77d6)}
.cdx-toggle-switch__input:enabled:active~.cdx-toggle-switch__switch{background-color:var(--background-color-progressive--active,#233566);border-color:var(--border-color-progressive--active,#233566)}
.cdx-toggle-switch__input:enabled:active~.cdx-toggle-switch__switch:before{border-color:var(--border-color-progressive--active,#233566)}
.cdx-toggle-switch__input:enabled:active~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{border-color:var(--border-color-inverted,#fff)}
.cdx-toggle-switch__input:enabled:focus:not(:active)~.cdx-toggle-switch__switch{border-color:var(--border-color-progressive,#36c);box-shadow:inset 0 0 0 1px var(--box-shadow-color-progressive--focus,#36c);outline:1px solid transparent}
.cdx-toggle-switch__input:enabled:focus:not(:active)~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{border-color:var(--border-color-progressive,#36c)}
.cdx-toggle-switch__input:enabled:checked~.cdx-toggle-switch__switch{background-color:var(--background-color-input-binary--checked,#36c);border-color:var(--border-color-progressive,#36c)}
.cdx-toggle-switch__input:enabled:checked~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{border-color:var(--background-color-base,#fff)}
.cdx-toggle-switch__input:enabled:checked:hover~.cdx-toggle-switch__switch{background-color:var(--background-color-progressive--hover,#4b77d6);border-color:var(--border-color-progressive--hover,#4b77d6)}
.cdx-toggle-switch__input:enabled:checked:active~.cdx-toggle-switch__switch{background-color:var(--background-color-progressive--active,#233566);border-color:var(--border-color-progressive--active,#233566);box-shadow:inset 0 0 0 1px var(--box-shadow-color-progressive--active,#233566)}
.cdx-toggle-switch__input:enabled:checked:active~.cdx-toggle-switch__switch:before{border-color:var(--border-color-progressive--active,#233566)}
.cdx-toggle-switch__input:enabled:checked:active~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{background-color:var(--background-color-base-fixed,#fff);border-color:var(--border-color-inverted,#fff)}
.cdx-toggle-switch__input:enabled:checked:focus:not(:active)~.cdx-toggle-switch__switch{border-color:var(--border-color-progressive,#36c)}
.cdx-toggle-switch__input:enabled:checked:focus:not(:active)~.cdx-toggle-switch__switch:before,.cdx-toggle-switch__input:enabled:checked:focus:not(:active)~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{border-color:var(--border-color-inverted,#fff)}
.cdx-toggle-switch__input:disabled{cursor:default}
.cdx-toggle-switch__input:disabled~.cdx-toggle-switch__switch{background-color:var(--background-color-disabled,#c8ccd1);border-color:var(--border-color-disabled,#c8ccd1)}
.cdx-toggle-switch__input:disabled~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{border-color:var(--border-color-inverted,#fff);box-shadow:inset 0 0 0 1px var(--box-shadow-color-inverted,#fff)}
.cdx-toggle-switch__input:disabled:checked~.cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip{background-color:var(--background-color-base,#fff)}
.cdx-typeahead-search__menu.cdx-menu{border-top-left-radius:0;border-top-right-radius:0}
.cdx-typeahead-search .cdx-menu-item{padding:0}
.cdx-typeahead-search .cdx-menu-item__content{padding:8px 12px}
.cdx-typeahead-search__search-footer.cdx-menu-item{box-sizing:border-box;min-height:56px}
.cdx-typeahead-search__search-footer.cdx-menu-item:visited{color:var(--color-base,#202122)}
.cdx-typeahead-search__search-footer.cdx-menu-item:hover{text-decoration:none;cursor:pointer}
.cdx-typeahead-search__search-footer__active.cdx-menu-item .cdx-typeahead-search__search-footer__icon.cdx-icon,.cdx-typeahead-search__search-footer__active.cdx-menu-item .cdx-typeahead-search__search-footer__text{color:var(--color-progressive,#36c)}
.cdx-typeahead-search .cdx-menu-item:first-child .cdx-typeahead-search__search-footer{border-top:unset}

.citizen-notifications__footer{display:flex;justify-content:space-between;align-items:center;gap:var(--space-sm);flex-shrink:0;padding:var(--space-xs) var(--space-md);border-top:var(--border-subtle)}
.citizen-notifications__footer .citizen-notifications__see-all{display:flex;justify-content:center;align-items:center;gap:var(--space-xs);margin:0;padding:0 11px;font-size:1rem;text-align:center;border-top:0;color:var(--color-base);text-decoration:none}
.citizen-notifications__footer .citizen-notifications__see-all:hover{background-color:var(--background-color-interactive-subtle--hover)!important}
.citizen-notifications__footer .citizen-notifications__see-all>span{font-size:1rem}
.citizen-notifications__footer .citizen-notifications__prefs{display:flex;justify-content:center;align-items:center;margin:0;padding:0}
.citizen-notifications__footer .citizen-notifications__prefs>span{font-size:var(--font-size-small)}

.citizen-notifications .citizen-notifications__header .cdx-icon--medium,
.citizen-notifications .citizen-notifications__footer .cdx-icon--medium,
.citizen-userMenu .citizen-menu__content-list .cdx-icon--medium,
.citizen-userMenu .citizen-menu__content-list .cdx-icon--medium>svg{width:20px!important;height:20px!important;min-width:20px!important;min-height:20px!important;padding:0!important;margin:0!important}
.citizen-notifications .citizen-notifications__header .cdx-icon--medium>svg,
.citizen-notifications .citizen-notifications__footer .cdx-icon--medium>svg{width:20px!important;height:20px!important;min-width:20px!important;min-height:20px!important}

.citizen-userMenu .citizen-userInfo-stats-item-value{font-size:1rem!important;line-height:1.625rem!important}

.citizen-userMenu .citizen-userInfo-title a,
.citizen-userMenu .citizen-userInfo-title > div{
	font-size:1.125rem!important;font-weight:var(--font-weight-semi-bold)!important;
	line-height:1.625rem;color:var(--color-emphasized);padding-block:var(--space-xxs);
	padding-left:0!important;margin-left:0!important}
.citizen-userMenu .citizen-userInfo-title .citizen-keyboard-hint-key{display:none!important}

.citizen-userMenu #p-personal #pt-logout a{
	color:var(--color-inverted-fixed,#fff)!important;
	background-color:var(--background-color-destructive,#b32424)!important;
	border:var(--border-width-base,1px) solid var(--border-color-base)!important;
	border-radius:var(--border-radius-medium,4px)!important;
	margin:var(--space-xs)!important;
}
.citizen-userMenu #p-personal #pt-logout a span,
.citizen-userMenu #p-personal #pt-logout a .citizen-ui-icon{color:var(--color-inverted-fixed,#fff)!important}
.citizen-userMenu #p-personal #pt-logout a:hover{background-color:var(--background-color-destructive--hover,#8b1a1a)!important}
.citizen-userMenu #p-personal #pt-logout a:active{background-color:var(--background-color-destructive--active,#6b1414)!important}
.citizen-userMenu #p-personal #pt-logout .citizen-keyboard-hint-key,
.citizen-userMenu #p-personal #pt-logout .citizen-keyboard-hint-keys{display:none!important}

.citizen-notifications__panel a,
.citizen-notifications__footer a,
.citizen-notifications-dropdown__card a,
.citizen-notifications__panel a:hover,
.citizen-notifications__footer a:hover,
.citizen-notifications-dropdown__card a:hover{text-decoration:none}

.citizen-notifications .citizen-notifications__header .citizen-notifications__title{font-size:1rem;padding:0;border:0}
.citizen-notifications .citizen-notifications__header .citizen-notifications__mark-all{color:oklch(0.6 0.05 262.29);padding:1px 0}

.citizen-notifications .cdx-tabs__header{border-bottom:1px solid var(--border-color-base);margin:0;background-color:transparent!important}
.citizen-notifications .cdx-tabs__list{position:relative;display:flex;flex:1;overflow-x:auto;scrollbar-width:none;background-color:transparent!important}
.citizen-notifications .cdx-tabs__list::-webkit-scrollbar{display:none}
.citizen-notifications .cdx-tabs__list__item,
.citizen-notifications .cdx-tabs__list__item:hover,
.citizen-notifications .cdx-tabs__list__item[aria-selected="true"],
.citizen-notifications .cdx-tabs__list__item[aria-selected="true"]:hover{background-color:transparent!important}
.citizen-notifications .cdx-tabs__list__item{position:relative;flex:1 1 0;padding:var(--space-xs) var(--space-sm);font-size:var(--font-size-small);font-weight:var(--font-weight-semi-bold);color:var(--color-base);border:0;cursor:pointer;white-space:nowrap;text-align:center;transition:color var(--transition-duration-base)}
.citizen-notifications .cdx-tabs__list__item[aria-selected="true"]{color:var(--color-progressive)}
.citizen-notifications .cdx-tabs__list__item:not([aria-selected="true"]):hover{color:var(--color-progressive--hover)}
.citizen-notifications .cdx-tabs__indicator{position:absolute;inset-block-end:-1px;inset-inline-start:0;height:2px;width:0;background-color:var(--color-progressive);border-radius:var(--border-radius-base);transition:left var(--transition-duration-medium) ease,width var(--transition-duration-medium) ease;pointer-events:none}
.citizen-notifications .cdx-tabs__content{position:relative;flex:1;min-height:0;overflow:hidden}
.citizen-notifications .cdx-tabs__track{display:flex;width:300%;height:auto;align-items:stretch;transition:transform var(--transition-duration-medium) ease,height var(--transition-duration-medium) ease;will-change:transform}
.citizen-notifications .cdx-tab{flex:0 0 33.3333%;width:33.3333%;min-width:33.3333%;display:flex;flex-direction:column;min-height:0;overflow:hidden}
.citizen-notifications .cdx-tab .citizen-notifications__list{display:flex;flex:1;flex-direction:column;min-height:0;overflow-y:auto;overscroll-behavior:contain}
.citizen-notifications .cdx-tabs__track .citizen-notifications__item{transition:opacity 240ms ease}
.citizen-notifications .cdx-tabs__track--switching .citizen-notifications__item{opacity:0}

.citizen-notifications__panel .citizen-notifications__item{flex-shrink:0;position:relative;display:grid;grid-template-columns:auto 1fr;column-gap:var(--space-sm);padding:var(--space-sm) var(--space-md);cursor:pointer;max-height:240px;overflow:hidden;transition:opacity 200ms ease,max-height 300ms ease,padding 300ms ease,margin 300ms ease,border-color 300ms ease,background-color var(--transition-duration-base)}
.citizen-notifications__panel .citizen-notifications__item+.citizen-notifications__item{border-top:var(--border-subtle)}
.citizen-notifications__panel .citizen-notifications__item--filtered-out{opacity:0;max-height:0;padding-block:0;margin-block:0;border-color:transparent;pointer-events:none}
.citizen-notifications__panel .citizen-notifications__item:hover{background-color:var(--color-surface-1--hover)}
.citizen-notifications__panel .citizen-notifications__item--read{background-color:var(--color-surface-1)}
.citizen-notifications__panel .citizen-notifications__item--read:hover{background-color:var(--color-surface-1--hover)}
.citizen-notifications__panel .citizen-notifications__item--read .citizen-notifications__item-header{color:var(--color-subtle)}
.citizen-notifications__panel .citizen-notifications__item-primary{position:absolute;inset:0}
.citizen-notifications__panel .citizen-notifications__item-primary::after{position:absolute;inset:0;z-index:1;content:""}
.citizen-notifications__panel .citizen-notifications__item-primary:focus-visible::after{outline:1px solid transparent;box-shadow:inset 0 0 0 2px var(--outline-color-progressive--focus)}
.citizen-notifications__panel .citizen-notifications__item-header a,
.citizen-notifications__panel .citizen-notifications__item-body a,
.citizen-notifications__panel .citizen-notifications__item-link{position:relative;z-index:2}
.citizen-notifications__panel .citizen-notifications__item-badge{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;margin-block-start:0.125rem;background-color:var(--color-surface-3);border-radius:var(--border-radius-circle)}
.citizen-notifications__panel .citizen-notifications__item-icon{width:1rem;height:1rem;background-color:var(--color-base);-webkit-mask-image:var(--citizen-notification-icon);mask-image:var(--citizen-notification-icon);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain}
.citizen-notifications__panel .citizen-notifications__item-content{min-width:0}
.citizen-notifications__panel .citizen-notifications__item-meta{display:flex;gap:var(--space-xs);align-items:baseline;font-size:var(--font-size-x-small);color:var(--color-subtle)}
.citizen-notifications__panel .citizen-notifications__item-category{overflow:hidden;text-overflow:ellipsis;font-weight:var(--font-weight-medium);white-space:nowrap}
.citizen-notifications__panel .citizen-notifications__item-time{flex-shrink:0;margin-inline-start:auto}
.citizen-notifications__panel .citizen-notifications__item-header{margin-block-start:var(--space-xxs);color:var(--color-base)}
.citizen-notifications__panel .citizen-notifications__item-body{display:block;margin-block-start:var(--space-xxs);color:var(--color-subtle);-webkit-line-clamp:none}
.citizen-notifications__panel .citizen-notifications__item-actions{display:flex;flex-wrap:wrap;gap:var(--space-xs);margin-block-start:var(--space-xxs);margin-inline:-11px}

html body .mw-notification-area {
	padding: var(--space-xs);
	font-size: var(--font-size-small);
	line-height: var(--line-height-small);
}
html body .mw-notification-area .mw-notification {
	padding: var(--space-sm) var(--space-md);
	color: var(--color-emphasized);
	background-color: var(--color-surface-1);
	border: solid var(--border-width-base) var(--border-color-base);
	border-radius: var(--border-radius-medium);
	box-shadow: var(--box-shadow-large);
	transition-timing-function: var(--transition-timing-function-ease-in);
	transition-duration: var(--transition-duration-base);
	transition-property: transform, opacity;
}
html body .mw-notification-area .mw-notification.mw-notification-visible {
	transition-timing-function: var(--transition-timing-function-ease-out);
	transition-duration: var(--transition-duration-medium);
}
html body .mw-notification-area .mw-notification.mw-notification-type-warn {
	background-color: var(--background-color-warning-subtle);
	border-color: inherit;
}
html body .mw-notification-area .mw-notification.mw-notification-type-error {
	background-color: var(--background-color-destructive-subtle);
	border-color: inherit;
}
html body .mw-notification-area .mw-notification.mw-notification-type-success {
	background-color: var(--background-color-success-subtle);
	border-color: inherit;
}
@layer citizen-tokens{:where(.citizen-theme-preview){color-scheme:light;--color-white:#fff;--color-black:#000;--color-gray-50:#f8f9fa;--color-gray-100:#eaecf0;--color-gray-200:#dadde3;--color-gray-300:#c8ccd1;--color-gray-400:#a2a9b1;--color-gray-500:#72777d;--color-gray-600:#54595d;--color-gray-700:#404244;--color-gray-800:#27292d;--color-gray-900:#202122;--color-gray-1000:#101418;--color-red-50:oklch(95% 0.015 10);--color-red-100:oklch(92% 0.03 10);--color-red-200:oklch(88% 0.052 10);--color-red-300:oklch(81% 0.095 10);--color-red-400:oklch(73% 0.155 10);--color-red-500:oklch(65% 0.195 10);--color-red-600:oklch(59% 0.2 10);--color-red-700:oklch(54% 0.18 10);--color-red-800:oklch(48% 0.16 10);--color-red-900:oklch(35% 0.135 10);--color-red-950:oklch(25% 0.075 10);--color-red-1000:oklch(16% 0.05 10);--color-orange-50:#ffead4;--color-orange-100:#ffdcb8;--color-orange-200:#ffc894;--color-orange-300:#ffa758;--color-orange-400:#f97f26;--color-orange-500:#d46926;--color-orange-600:#bb5c26;--color-orange-700:#a95226;--color-orange-800:#8e4424;--color-orange-900:#572c19;--color-orange-1000:oklch(16% 0.043 42);--color-yellow-50:oklch(96% 0.021 95);--color-yellow-100:oklch(92% 0.058 92);--color-yellow-200:oklch(87% 0.115 88);--color-yellow-300:oklch(80% 0.153 82);--color-yellow-400:oklch(71% 0.164 75);--color-yellow-500:oklch(62% 0.165 67);--color-yellow-600:oklch(57% 0.157 60);--color-yellow-700:oklch(53% 0.146 54);--color-yellow-800:oklch(47% 0.125 50);--color-yellow-900:oklch(33% 0.105 47);--color-yellow-950:oklch(25% 0.06 46);--color-yellow-1000:oklch(16% 0.032 46);--color-lime-50:#e3f2e4;--color-lime-100:#d1e9d2;--color-lime-200:#b9debc;--color-lime-300:#94cb9a;--color-lime-400:#5db26c;--color-lime-500:#259948;--color-lime-600:#1f893f;--color-lime-700:#1f7a39;--color-lime-800:#1f6631;--color-lime-900:#183f20;--color-lime-1000:oklch(16% 0.041 148);--color-green-50:oklch(95% 0.021 165);--color-green-100:oklch(91% 0.051 165);--color-green-200:oklch(86% 0.089 165);--color-green-300:oklch(79% 0.13 165);--color-green-400:oklch(69% 0.153 165);--color-green-500:oklch(61% 0.149 165);--color-green-600:oklch(56% 0.127 165);--color-green-700:oklch(51% 0.105 165);--color-green-800:oklch(46% 0.08599999999999999 165);--color-green-900:oklch(33% 0.073 165);--color-green-950:oklch(25% 0.05 165);--color-green-1000:oklch(16% 0.03 165);--color-blue-50:#e8eeff;--color-blue-100:#d9e2ff;--color-blue-200:#b6d4fb;--color-blue-300:#a6bbf5;--color-blue-400:#88a3e8;--color-blue-500:#6485d1;--color-blue-600:#4b77d6;--color-blue-700:#36c;--color-blue-800:#3056a9;--color-blue-900:#233566;--color-blue-1000:oklch(16% 0.052 271);--color-purple-50:#f0ecf6;--color-purple-100:#e6e0f0;--color-purple-200:#d9d0e9;--color-purple-300:#c5b9dd;--color-purple-400:#a799cd;--color-purple-500:#8d7ebd;--color-purple-600:#7a6db7;--color-purple-700:#6a60b0;--color-purple-800:#534fa3;--color-purple-900:#353262;--color-purple-1000:oklch(16% 0.05 288);--color-pink-50:#f5ebf2;--color-pink-100:#eedeea;--color-pink-200:#e6cede;--color-pink-300:#d9b4cd;--color-pink-400:#c690b4;--color-pink-500:#b5739e;--color-pink-600:#ac5c90;--color-pink-700:#9b527f;--color-pink-800:#82456a;--color-pink-900:#4e2c40;--color-pink-1000:oklch(16% 0.034 347);--color-maroon-50:#f6ebeb;--color-maroon-100:#f0dedd;--color-maroon-200:#e8cecd;--color-maroon-300:#dcb5b3;--color-maroon-400:#c99391;--color-maroon-500:#b57775;--color-maroon-600:#ac6262;--color-maroon-700:#9f5555;--color-maroon-800:#854848;--color-maroon-900:#512e2e;--color-maroon-1000:oklch(16% 0.03 23);--color-primary-oklch__h:262.29;--color-neutral-oklch__h:var(--color-primary-oklch__h);--color-primary-50:oklch(95% 0.024 var(--color-primary-oklch__h));--color-primary-100:oklch(92% 0.04 var(--color-primary-oklch__h));--color-primary-200:oklch(86% 0.06 var(--color-primary-oklch__h));--color-primary-300:oklch(80% 0.08500000000000001 var(--color-primary-oklch__h));--color-primary-400:oklch(72% 0.108 var(--color-primary-oklch__h));--color-primary-500:oklch(62% 0.13 var(--color-primary-oklch__h));--color-primary-600:oklch(58% 0.152 var(--color-primary-oklch__h));--color-primary-700:oklch(53% 0.17 var(--color-primary-oklch__h));--color-primary-800:oklch(47% 0.15 var(--color-primary-oklch__h));--color-primary-900:oklch(34% 0.105 var(--color-primary-oklch__h));--color-primary-1000:oklch(16% 0.05 var(--color-primary-oklch__h));--color-neutral-50:oklch(98% 0.005 var(--color-neutral-oklch__h));--color-neutral-100:oklch(94% 0.012 var(--color-neutral-oklch__h));--color-neutral-200:oklch(90% 0.02 var(--color-neutral-oklch__h));--color-neutral-300:oklch(84% 0.028 var(--color-neutral-oklch__h));--color-neutral-400:oklch(73% 0.035 var(--color-neutral-oklch__h));--color-neutral-500:oklch(51% 0.04 var(--color-neutral-oklch__h));--color-neutral-600:oklch(39% 0.035 var(--color-neutral-oklch__h));--color-neutral-700:oklch(30% 0.028 var(--color-neutral-oklch__h));--color-neutral-800:oklch(22% 0.02 var(--color-neutral-oklch__h));--color-neutral-900:oklch(17% 0.012 var(--color-neutral-oklch__h));--color-neutral-1000:oklch(11% 0.01 var(--color-neutral-oklch__h));--background-color-base:light-dark(var(--color-white),var(--color-neutral-1000));--background-color-base-fixed:var(--color-white);--background-color-neutral:light-dark(var(--color-neutral-100),var(--color-neutral-800));--background-color-neutral-subtle:light-dark(var(--color-neutral-50),var(--color-neutral-900));--background-color-interactive:light-dark(var(--color-neutral-100),var(--color-neutral-800));--background-color-interactive--hover:light-dark(var(--color-neutral-200),var(--color-neutral-700));--background-color-interactive--active:light-dark(var(--color-neutral-300),var(--color-neutral-600));--background-color-interactive-subtle:light-dark(var(--color-neutral-50),var(--color-neutral-900));--background-color-interactive-subtle--hover:light-dark(var(--color-neutral-100),var(--color-neutral-800));--background-color-interactive-subtle--active:light-dark(var(--color-neutral-200),var(--color-neutral-700));--background-color-disabled:light-dark(var(--color-neutral-200),var(--color-neutral-700));--background-color-disabled-subtle:light-dark(var(--color-neutral-100),var(--color-neutral-800));--background-color-notice-subtle:light-dark(var(--color-neutral-100),var(--color-neutral-800));--background-color-inverted:light-dark(var(--color-neutral-1000),var(--color-neutral-50));--background-color-icon:light-dark(rgba(0,0,0,var(--opacity-icon-base)),rgba(255,255,255,var(--opacity-icon-base)));--background-color-icon--hover:light-dark(rgba(0,0,0,var(--opacity-icon-base--hover)),rgba(255,255,255,var(--opacity-icon-base--hover)));--background-color-icon--active:light-dark(rgba(0,0,0,var(--opacity-icon-base--active)),rgba(255,255,255,var(--opacity-icon-base--active)));--background-color-progressive:var(--color-primary-700);--background-color-progressive--hover:var(--color-primary-800);--background-color-progressive--active:var(--color-primary-900);--background-color-progressive--focus:light-dark(var(--color-primary-700),var(--color-primary-500));--background-color-destructive:var(--color-red-700);--background-color-destructive--hover:var(--color-red-800);--background-color-destructive--active:var(--color-red-900);--background-color-destructive--focus:light-dark(var(--color-primary-700),var(--color-primary-500));--background-color-error:var(--color-red-500);--background-color-error--hover:var(--color-red-600);--background-color-error--active:var(--color-red-700);--background-color-progressive-subtle:light-dark(var(--color-primary-50),var(--color-primary-1000));--background-color-progressive-subtle--hover:light-dark(var(--color-primary-100),var(--color-primary-900));--background-color-progressive-subtle--active:light-dark(var(--color-primary-200),var(--color-primary-800));--background-color-destructive-subtle:light-dark(var(--color-red-50),var(--color-red-1000));--background-color-destructive-subtle--hover:light-dark(var(--color-red-100),var(--color-red-900));--background-color-destructive-subtle--active:light-dark(var(--color-red-200),var(--color-red-800));--background-color-error-subtle:light-dark(var(--color-red-50),var(--color-red-1000));--background-color-error-subtle--hover:light-dark(var(--color-red-100),var(--color-red-900));--background-color-error-subtle--active:light-dark(var(--color-red-200),var(--color-red-800));--background-color-warning-subtle:light-dark(var(--color-yellow-50),var(--color-yellow-1000));--background-color-success-subtle:light-dark(var(--color-green-50),var(--color-green-1000));--background-color-content-added:var(--background-color-success-subtle);--background-color-content-removed:var(--background-color-destructive-subtle);--background-color-target-text:light-dark(var(--color-orange-50),var(--color-orange-900));--background-color-button-quiet--hover:light-dark(rgba(0,24,73,0.027),rgba(255,255,255,0.04));--background-color-button-quiet--active:light-dark(rgba(0,24,73,0.082),rgba(255,255,255,0.08));--background-color-backdrop-light:light-dark(color-mix(in oklch,var(--color-neutral-50) calc(var(--backdrop-opacity) * 100%),transparent),color-mix(in oklch,var(--color-neutral-1000) calc(var(--backdrop-opacity) * 100%),transparent));--background-color-backdrop-dark:rgba(0,0,0,var(--backdrop-opacity));--background-color-transparent:transparent;--background-color-input-binary--checked:var(--color-progressive);--background-color-tab-list-item-framed--hover:rgba(255,255,255,0.3);--background-color-tab-list-item-framed--active:rgba(255,255,255,0.65);--border-color-base:light-dark(var(--color-gray-200),var(--color-gray-800));--border-color-emphasized:light-dark(var(--color-gray-900),var(--color-gray-100));--border-color-subtle:light-dark(var(--color-gray-100),var(--color-gray-900));--border-color-muted:light-dark(var(--color-gray-50),var(--color-gray-1000));--border-color-interactive:light-dark(var(--color-gray-300),var(--color-gray-700));--border-color-interactive--hover:light-dark(var(--color-gray-400),var(--color-gray-600));--border-color-interactive--active:light-dark(var(--color-gray-500),var(--color-gray-500));--border-color-disabled:light-dark(var(--color-gray-100),var(--color-gray-900));--border-color-divider:light-dark(var(--color-gray-200),var(--color-gray-800));--border-color-inverted:light-dark(var(--color-white),var(--color-gray-1000));--border-color-inverted-fixed:var(--color-white);--border-color-progressive:light-dark(var(--color-primary-700),var(--color-primary-500));--border-color-progressive--hover:light-dark(var(--color-primary-800),var(--color-primary-400));--border-color-progressive--active:light-dark(var(--color-primary-900),var(--color-primary-300));--border-color-progressive--focus:light-dark(var(--color-primary-700),var(--color-primary-500));--border-color-error:light-dark(var(--color-red-100),var(--color-red-950));--border-color-error--hover:light-dark(var(--color-red-200),var(--color-red-900));--border-color-error--active:light-dark(var(--color-red-300),var(--color-red-800));--border-color-warning:light-dark(var(--color-yellow-100),var(--color-yellow-950));--border-color-warning--hover:light-dark(var(--color-yellow-200),var(--color-yellow-900));--border-color-warning--active:light-dark(var(--color-yellow-300),var(--color-yellow-800));--border-color-success:light-dark(var(--color-green-100),var(--color-green-950));--border-color-destructive:light-dark(var(--color-red-100),var(--color-red-950));--border-color-destructive--hover:light-dark(var(--color-red-200),var(--color-red-900));--border-color-destructive--active:light-dark(var(--color-red-300),var(--color-red-800));--border-color-destructive--focus:light-dark(var(--color-primary-700),var(--color-primary-500));--border-color-content-added:var(--color-green-500);--border-color-content-removed:var(--color-red-500);--border-color-notice:var(--color-neutral-500);--border-color-transparent:transparent;--border-color-input--hover:var(--border-color-interactive);--border-color-input-binary:var(--border-color-interactive);--border-color-input-binary--hover:var(--border-color-progressive--hover);--border-color-input-binary--active:var(--border-color-progressive--active);--border-color-input-binary--focus:var(--border-color-progressive--focus);--border-color-input-binary--checked:var(--border-color-progressive);--color-base:light-dark(var(--color-neutral-900),var(--color-neutral-300));--color-base--hover:light-dark(var(--color-neutral-700),var(--color-neutral-200));--color-base--subtle:light-dark(var(--color-neutral-600),var(--color-neutral-400));--color-base-fixed:var(--color-gray-900);--color-emphasized:light-dark(var(--color-neutral-1000),var(--color-neutral-50));--color-subtle:light-dark(var(--color-neutral-600),var(--color-neutral-400));--color-placeholder:light-dark(var(--color-neutral-500),var(--color-neutral-500));--color-disabled:light-dark(var(--color-neutral-400),var(--color-neutral-600));--color-disabled-emphasized:light-dark(var(--color-neutral-400),var(--color-neutral-500));--color-neutral:light-dark(var(--color-neutral-700),var(--color-neutral-300));--color-notice:light-dark(var(--color-neutral-700),var(--color-neutral-400));--color-inverted:light-dark(var(--color-white),var(--color-neutral-1000));--color-inverted-fixed:var(--color-white);--color-inverted-primary:var(--color-white);--color-progressive:light-dark(var(--color-primary-700),var(--color-primary-400));--color-progressive--hover:light-dark(var(--color-primary-800),var(--color-primary-300));--color-progressive--active:light-dark(var(--color-primary-900),var(--color-primary-200));--color-progressive--focus:var(--color-primary-700);--color-destructive:light-dark(var(--color-red-700),var(--color-red-400));--color-destructive--hover:light-dark(var(--color-red-800),var(--color-red-300));--color-destructive--active:light-dark(var(--color-red-900),var(--color-red-200));--color-destructive--focus:var(--color-progressive--focus);--color-error:var(--color-destructive);--color-error--hover:var(--color-destructive--hover);--color-error--active:var(--color-destructive--active);--color-warning:light-dark(var(--color-yellow-700),var(--color-yellow-400));--color-success:light-dark(var(--color-green-700),var(--color-green-400));--color-visited:var(--color-progressive);--color-visited--hover:var(--color-progressive--hover);--color-visited--active:var(--color-progressive--active);--color-destructive--visited:var(--color-destructive);--color-destructive--visited--hover:var(--color-destructive--hover);--color-destructive--visited--active:var(--color-destructive--active);--color-content-added:var(--color-success);--color-content-removed:var(--color-destructive);--color-link:var(--color-progressive);--color-link--hover:var(--color-progressive--hover);--color-link--active:var(--color-progressive--active);--color-link--focus:var(--color-progressive--focus);--color-link--visited:var(--color-visited);--color-link--visited--hover:var(--color-visited--hover);--color-link--visited--active:var(--color-visited--active);--color-link-red:var(--color-destructive);--color-link-red--hover:var(--color-destructive--hover);--color-link-red--active:var(--color-destructive--active);--color-link-red--focus:var(--color-destructive--focus);--color-link-red--visited:var(--color-destructive--visited);--color-link-red--visited--hover:var(--color-destructive--visited--hover);--color-link-red--visited--active:var(--color-destructive--visited--active);--color-icon-progressive:light-dark(var(--color-primary-700),var(--color-primary-500));--color-icon-error:var(--color-red-500);--color-icon-warning:var(--color-yellow-500);--color-icon-success:var(--color-green-500);--color-icon-notice:var(--color-neutral-500);--box-shadow-color-base:var(--box-shadow-color-alpha-base);--box-shadow-color-alpha-base:light-dark(oklch(12% 0.01 var(--color-primary-oklch__h) / var(--shadow-opacity)),oklch(6% 0.01 var(--color-primary-oklch__h) / var(--shadow-opacity)));--box-shadow-color-progressive--active:var(--color-progressive--active);--box-shadow-color-progressive--focus:var(--color-progressive);--box-shadow-color-progressive-selected:var(--color-progressive);--box-shadow-color-progressive-selected--hover:var(--color-progressive--hover);--box-shadow-color-progressive-selected--active:var(--color-progressive--active);--box-shadow-color-destructive--focus:var(--color-progressive);--box-shadow-color-inverted:var(--color-white);--box-shadow-color-transparent:transparent;--color-surface-0:light-dark(var(--color-white),var(--color-neutral-1000));--color-surface-1:light-dark(var(--color-neutral-50),var(--color-neutral-900));--color-surface-1--hover:light-dark(var(--color-neutral-100),var(--color-neutral-800));--color-surface-1--active:light-dark(var(--color-neutral-200),var(--color-neutral-700));--color-surface-2:light-dark(var(--color-neutral-100),var(--color-neutral-800));--color-surface-2--hover:light-dark(var(--color-neutral-200),var(--color-neutral-700));--color-surface-2--active:light-dark(var(--color-neutral-300),var(--color-neutral-600));--color-surface-3:light-dark(var(--color-neutral-200),var(--color-neutral-700));--color-surface-4:light-dark(var(--color-neutral-300),var(--color-neutral-600));--color-syntax-red:light-dark(#e53935,#f07178);--color-syntax-orange:light-dark(#f76d47,#f78c6c);--color-syntax-yellow:light-dark(#e2931d,#ffcb6b);--color-syntax-green:light-dark(#91b859,#c3e88d);--color-syntax-cyan:light-dark(#39adb5,#89ddff);--color-syntax-blue:light-dark(#6182b8,#82aaff);--color-syntax-paleblue:light-dark(#8796b0,#b2ccd6);--color-syntax-purple:light-dark(#9c3eda,#c792ea);--color-syntax-brown:light-dark(#916b53,#916b53);--color-syntax-pink:light-dark(#ff5370,#ff9cac);--color-syntax-violet:light-dark(#945eb8,#bb80b3);--color-syntax-gray:light-dark(#90a4ae,#676E95);--color-syntax-grey:var(--color-syntax-gray);--opacity-icon-base:0.6;--opacity-icon-base--hover:0.74;--opacity-icon-base--active:0.87;--opacity-icon-base--selected:1;--opacity-icon-base--disabled:0.51;--opacity-icon-placeholder:0.51;--opacity-icon-subtle:0.67;--opacity-glass:0.9;--backdrop-opacity:0.65;--shadow-opacity:0.03;--font-size-x-small:0.75rem;--font-size-small:0.875rem;--font-size-medium:1rem;--font-size-large:1.125rem;--font-size-x-large:1.25rem;--font-size-xx-large:1.5rem;--font-size-xxx-large:1.75rem;--line-height-x-small:1.25rem;--line-height-small:1.375rem;--line-height-medium:1.625rem;--line-height-large:1.75rem;--line-height-x-large:1.875rem;--line-height-xx-large:2.125rem;--line-height-xxx-large:2.375rem;--line-height-content:1.625;--font-grade:25;--outline-color-progressive--focus:light-dark(var(--color-primary-700),var(--color-primary-500));--mix-blend-mode-base:normal;--mix-blend-mode-blend:multiply;--accent-color-base:var(--color-progressive);--filter-invert-icon:0;--filter-invert-primary-button-icon:1;--filter-invert:none;--filter-invert-primary:invert(1) hue-rotate(180deg);--backdrop-filter-blur:blur(2px);--backdrop-filter-frosted-glass:blur(8px) saturate(140%);--color-progressive-oklch__h:var(--color-primary-oklch__h);--color-progressive-hsl__h:220;--color-progressive-hsl__s:60%;--color-progressive-hsl__l:50%;--color-primary-oklch__h:var(--citizen-preview-color-primary-oklch__h,262.29);--color-neutral-oklch__h:var(--citizen-preview-color-neutral-oklch__h,var(--color-primary-oklch__h));--color-progressive-oklch__h:var(--citizen-preview-color-progressive-oklch__h,var(--color-primary-oklch__h));--color-progressive-hsl__h:var(--citizen-preview-color-progressive-hsl__h,220);--color-progressive-hsl__s:var(--citizen-preview-color-progressive-hsl__s,60%);--color-progressive-hsl__l:var(--citizen-preview-color-progressive-hsl__l,50%)}}.citizen-preferences{display:flex;flex-direction:column;gap:var(--space-sm);min-width:20rem;padding-block:var(--space-md)}.citizen-preferences-section{margin-inline:var(--space-md)}.citizen-preferences-section__heading{margin-bottom:var(--space-sm);color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}.citizen-preferences-section__content{display:flex;flex-direction:column;row-gap:var(--space-sm)}.citizen-preferences-section + .citizen-preferences-section{margin-top:var(--space-md)}.citizen-preferences-group{display:flex;margin-top:0}.citizen-preferences-group .cdx-label{padding-bottom:var(--space-xs)}.citizen-preferences-group .cdx-label__label__text{font-size:var(--font-size-small);font-weight:var(--font-weight-medium);color:var(--color-base)}.citizen-preferences-group .cdx-label__description{font-size:var(--font-size-small)}.citizen-preferences-group .cdx-field__control{width:100%}.citizen-preferences-radio{display:grid;grid-template-columns:repeat(var(--pref-columns,2),1fr);gap:var(--space-xxs)}.citizen-preferences-radio .cdx-radio,.citizen-preferences-radio .cdx-radio__wrapper,.citizen-preferences-radio .cdx-label,.citizen-preferences-radio .cdx-label__label{width:100%;min-width:0;height:100%}.citizen-preferences-radio .cdx-radio{margin-bottom:0}.citizen-preferences-radio .cdx-radio__icon{display:none}.citizen-preferences-radio .cdx-radio__wrapper{gap:0}.citizen-preferences-radio .cdx-label{padding:0}.citizen-preferences-card{display:flex;flex-direction:column;height:100%;overflow:hidden;cursor:pointer;border:var(--border-width-thick) solid var(--border-color-base);border-radius:var(--border-radius-medium);transition-duration:var(--transition-duration-base);transition-property:border-color,background-color}.cdx-radio:has(.cdx-radio__input:checked) .citizen-preferences-card{background-color:var(--background-color-progressive-subtle);border-color:var(--color-progressive)}.cdx-radio:has(.cdx-radio__input:focus-visible) .citizen-preferences-card{outline:2px solid var(--color-progressive);outline-offset:1px}.citizen-preferences-card__label{padding:var(--space-xxs) var(--space-xs);font-size:var(--font-size-small);color:var(--color-subtle);text-align:center}.cdx-radio:has(.cdx-radio__input:checked) .citizen-preferences-card__label{font-weight:var(--font-weight-semi-bold);color:var(--color-progressive)}.citizen-preferences-card__preview{display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:1.5;padding:var(--space-xs);color:var(--color-base);background-color:var(--color-surface-0);border-bottom:var(--border-subtle)}.citizen-preferences-card__preview .cdx-icon{width:2rem;height:2rem;color:inherit}@property --citizen-themepicker-ambient-border{syntax:'<color>';inherits:true;initial-value:transparent}@property --citizen-themepicker-ambient-border-hover{syntax:'<color>';inherits:true;initial-value:transparent}@property --citizen-themepicker-ambient-border-active{syntax:'<color>';inherits:true;initial-value:transparent}@property --citizen-themepicker-ambient-accent{syntax:'<color>';inherits:true;initial-value:transparent}.citizen-preferences-themepicker__grid{--citizen-themepicker-ambient-border:var(--border-color-interactive);--citizen-themepicker-ambient-border-hover:var(--border-color-interactive--hover);--citizen-themepicker-ambient-border-active:var(--border-color-interactive--active);--citizen-themepicker-ambient-accent:var(--color-progressive);display:flex;flex-wrap:wrap;gap:var(--space-sm)}.citizen-preferences-themepicker .cdx-radio__icon{display:none}.citizen-preferences-themepicker .cdx-radio,.citizen-preferences-themepicker .cdx-radio *{cursor:pointer}.citizen-preferences-themepicker .cdx-radio:has(.cdx-radio__input:checked),.citizen-preferences-themepicker .cdx-radio:has(.cdx-radio__input:checked) *{cursor:default}.citizen-preferences-themepicker .cdx-radio{margin-bottom:0}.citizen-preferences-themepicker .cdx-radio__wrapper{gap:0}.citizen-preferences-themepicker .cdx-label{padding:0}.citizen-preferences-themepicker__srlabel{position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}.citizen-preferences-themepicker__readout{min-height:1.25em;margin-top:var(--space-sm);font-size:var(--font-size-small);color:var(--color-subtle)}.citizen-preferences-themecircle{display:block;width:44px;height:44px;outline:2px solid transparent;outline-offset:2px;background:conic-gradient(from 0deg,var(--color-surface-0) 0 50%,var(--color-progressive) 50% 100%);border-radius:var(--border-radius-circle);box-shadow:inset 0 0 0 1px var(--citizen-themepicker-ambient-border);transition-duration:var(--transition-duration-base);transition-property:outline-color,border-radius}.citizen-preferences-themecircle--adaptive{background:conic-gradient(from -45deg,var(--color-white) 0 50%,var(--color-neutral-1000) 50% 100%)}.cdx-radio:hover .citizen-preferences-themecircle{outline-color:var(--citizen-themepicker-ambient-border-hover);border-radius:var(--border-radius-large)}.cdx-radio:active .citizen-preferences-themecircle{outline-color:var(--citizen-themepicker-ambient-border-active);border-radius:var(--border-radius-large)}.cdx-radio:has(.cdx-radio__input:checked) .citizen-preferences-themecircle,.cdx-radio:has(.cdx-radio__input:focus-visible) .citizen-preferences-themecircle{outline-color:var(--citizen-themepicker-ambient-accent);border-radius:var(--border-radius-large)}.citizen-command-palette-overlay{position:fixed;inset:0;z-index:999;display:block}.citizen-echo-notification-badge .citizen-ui-icon{display:block;width:1.25rem;height:1.25rem}.citizen-echo-notification-badge .citizen-ui-icon::before{display:block;width:100%;height:100%;content:"";background-color:currentcolor;mask-repeat:no-repeat;mask-position:center;mask-size:contain;background-image:none!important}.citizen-notifications-dropdown{display:inline-flex;align-items:center}.citizen-notifications-dropdown__card{min-width:320px;max-width:400px;max-height:60vh;overflow-y:auto}.citizen-notifications-all:hover{text-decoration:underline}.citizen-notifications-loading,.citizen-notifications-empty,.citizen-notifications-item:last-child{border-bottom:0}.citizen-notifications-item:hover{background-color:var(--background-color-interactive-subtle--hover)}.citizen-notifications-item-icon .citizen-ui-icon{width:1.25rem;height:1.25rem}.citizen-notifications-dropdown{display:inline-flex}.citizen-notifications{display:flex;flex-direction:column;height:auto;min-height:0;overflow:hidden;transition-timing-function:var(--transition-timing-function-ease-out);transition-duration:var(--transition-duration-medium);transition-property:height}
.mw-ui-icon-wikimedia-eye:before{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='%23000'%3E%3Cpath d='M10 14.5a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5M10 3C3 3 0 10 0 10s3 7 10 7 10-7 10-7-3-7-10-7'/%3E%3Ccircle cx='10' cy='10' r='2.5'/%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='%23000'%3E%3Cpath d='M10 14.5a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5M10 3C3 3 0 10 0 10s3 7 10 7 10-7 10-7-3-7-10-7'/%3E%3Ccircle cx='10' cy='10' r='2.5'/%3E%3C/g%3E%3C/svg%3E")}
.citizen-notifications__panel{display:flex;flex-direction:column;flex:1;min-height:0;height:auto;max-height:var(--header-card-maxheight,min(32rem,60vh))}.citizen-notifications__header{display:flex;flex-shrink:0;gap:var(--space-sm);align-items:center;justify-content:space-between;padding:var(--space-sm) var(--space-md)}.citizen-notifications__title{margin:0;font-size:var(--font-size-medium);font-weight:var(--font-weight-semi-bold)}.citizen-notifications__mark-all{color:var(--color-subtle)}.citizen-notifications__body{display:flex;flex:1;flex-direction:column;min-height:0}.citizen-notifications__list{display:flex;flex:1;flex-direction:column;margin:0;padding:0;list-style:none;overflow-y:auto;overscroll-behavior:contain}.citizen-notifications__item{display:list-item;padding:var(--space-sm) var(--space-md)}.citizen-notifications__item + .citizen-notifications__item{border-top:var(--border-subtle)}.citizen-notifications__item-content{display:flex;flex-direction:column;gap:var(--space-xs)}.citizen-notifications__item-meta{display:flex;gap:var(--space-xs);align-items:baseline;font-size:var(--font-size-small)}.citizen-notifications__item-category{color:var(--color-progressive);font-weight:var(--font-weight-medium)}.citizen-notifications__item-time{color:var(--color-subtle)}.citizen-notifications__item-header{margin-block-start:0.125rem;color:var(--color-emphasized);font-size:var(--font-size-small);line-height:var(--line-height-sm,1.5)}.citizen-notifications__item-body{margin-block-start:0.125rem;color:var(--color-subtle);font-size:var(--font-size-small);line-height:var(--line-height-sm,1.5);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.citizen-notifications__item-actions{margin-block-start:var(--space-xs);display:flex;flex-wrap:wrap;gap:var(--space-xs)}.citizen-notifications__item-link{justify-content:flex-start}.citizen-notifications__see-all{display:block;flex-shrink:0;padding:var(--space-sm) var(--space-md);font-size:var(--font-size-small);text-align:center;border-top:var(--border-subtle);color:var(--color-progressive);text-decoration:none}.citizen-notifications__see-all:hover{text-decoration:underline;background-color:var(--background-color-interactive-subtle--hover)}.citizen-notifications__empty{padding:var(--space-lg) var(--space-md);text-align:center;color:var(--color-subtle);font-size:var(--font-size-small)}.citizen-notifications__error{padding:var(--space-md);text-align:center;color:var(--color-error);font-size:var(--font-size-small)}.citizen-notifications__error[hidden],.citizen-notifications__skeleton[hidden]{display:none}.citizen-notifications__retry{margin-block-start:var(--space-sm)}.citizen-notifications__skeleton{display:flex;flex-direction:column;height:min(20rem,60vh);max-height:var(--header-card-maxheight)}.citizen-notifications__skeleton-item{display:grid;grid-template-columns:auto 1fr;gap:var(--space-xs);column-gap:var(--space-sm);padding:var(--space-sm) var(--space-md)}.citizen-notifications__skeleton-item + .citizen-notifications__skeleton-item{border-top:var(--border-subtle)}.citizen-notifications__skeleton-line{height:var(--font-size-small);background-color:var(--background-color-neutral);background-image:linear-gradient(90deg,transparent 0%,var(--background-color-interactive--hover) 50%,transparent 100%);background-repeat:no-repeat;background-position:200% 0;background-size:200% 100%;border-radius:var(--border-radius-base);animation:citizen-notifications-placeholder-shimmer 1600ms linear infinite}.citizen-notifications__skeleton-line--title{width:70%}.citizen-notifications__skeleton-line--meta{width:40%;margin-block-start:var(--space-xs)}.cdx-tabs--quiet{display:flex;flex-direction:column;flex:1;min-height:0}.cdx-tabs__header{display:flex;flex-shrink:0;align-items:center;border-bottom:var(--border-subtle)}.cdx-tabs__list{display:flex;flex:1;overflow-x:auto;scrollbar-width:none}.cdx-tabs__list::-webkit-scrollbar{display:none}.cdx-tabs__list__item{position:relative;padding:var(--space-sm) var(--space-sm);font-size:var(--font-size-small);font-weight:var(--font-weight-semi-bold);color:var(--color-subtle);background-color:transparent;border:0;cursor:pointer;white-space:nowrap}.cdx-tabs__list__item:hover{color:var(--color-emphasized)}.cdx-tabs__list__item[aria-selected="true"]{color:var(--color-progressive)}.cdx-tabs__list__item[aria-selected="true"]::after{content:"";position:absolute;inset-inline:var(--space-xs);inset-block-end:-1px;height:2px;background-color:var(--color-progressive);border-radius:var(--border-radius-base)}.cdx-tabs__content{display:flex;flex:1;flex-direction:column;min-height:0;overflow:hidden}.cdx-tab{display:flex;flex:1;flex-direction:column;min-height:0}.cdx-tab[hidden]{display:none}
.mw-ui-icon-wikimedia-variants::before{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2295 206 414 348%22 fill=%22%23000%22%3E%3Cpath d=%22M478.6,456.6h-84c0.6-3,1.2-5.7,1.5-8.7h72.6v-31.5H397v-8.7h68.1v-63.6H397v-6.9h45.6v-35.4h30.3v-32.7 h-30.3v-14.4h-44.1v14.4h-30.6l-32.1,68.1h19.8v6.9h-23.1l-30,63.6h53.1v8.7h-57.2l-8.2,17.5v14h64.2c-0.6,3-1.2,6-2.1,8.7h-72.8 l-1,2.1v29.7h49.8c-12.3,8.4-30.3,15-55.5,19.2c8.7,8.1,20.1,24,24.9,33c44.4-10.8,70.5-29.1,84.9-52.2h13.8l-15.3,23.4 c24.9,7.2,60,19.8,77.1,28.5l19.8-32.1c-13.5-6-36.9-13.8-57.6-19.8h58.2L478.6,456.6L478.6,456.6z M355.6,380.4h-25.8v-9.3h25.8 V380.4z M423.7,371.1v9.3H397v-9.3H423.7z M355,310.5v-8.7h43.5v8.7H355z%22/%3E%3Cpath d=%22M264.3,266.1h80.2l20-42.4l-1.5-0.5l-6.9,1.8H216.6v41.1h31.2l-24.9,5.1c12.6,53.4,29.4,99.3,54,136.5 c-21.6,21.6-48.3,37.5-78.9,47.7c8.7,8.4,19.2,25.2,24.6,36.6c6.7-2.7,13.2-5.6,19.5-8.6l57.3-121.7 C283.6,333.5,272,301,264.3,266.1z%22/%3E%3Cpath d=%22M198,323.4c-13.5-9.9-41.1-22.8-59.7-30L117,326.7c19.2,8.7,45.9,23.1,58.2,33.6L198,323.4z%22/%3E%3Cpath d=%22M211.5,245.1c-12.6-10.8-38.4-24-56.7-31.5L132,245.7c18.9,9,43.8,24,54.9,34.8L211.5,245.1z%22/%3E%3Cpath d=%22M180,366.6c-18,35.1-40.2,71.4-55.8,93.6l35.1,29.7c18-30,35.4-62.4,51-93.9L180,366.6z%22/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2295 206 414 348%22 fill=%22%23000%22%3E%3Cpath d=%22M478.6,456.6h-84c0.6-3,1.2-5.7,1.5-8.7h72.6v-31.5H397v-8.7h68.1v-63.6H397v-6.9h45.6v-35.4h30.3v-32.7 h-30.3v-14.4h-44.1v14.4h-30.6l-32.1,68.1h19.8v6.9h-23.1l-30,63.6h53.1v8.7h-57.2l-8.2,17.5v14h64.2c-0.6,3-1.2,6-2.1,8.7h-72.8 l-1,2.1v29.7h49.8c-12.3,8.4-30.3,15-55.5,19.2c8.7,8.1,20.1,24,24.9,33c44.4-10.8,70.5-29.1,84.9-52.2h13.8l-15.3,23.4 c24.9,7.2,60,19.8,77.1,28.5l19.8-32.1c-13.5-6-36.9-13.8-57.6-19.8h58.2L478.6,456.6L478.6,456.6z M355.6,380.4h-25.8v-9.3h25.8 V380.4z M423.7,371.1v9.3H397v-9.3H423.7z M355,310.5v-8.7h43.5v8.7H355z%22/%3E%3Cpath d=%22M264.3,266.1h80.2l20-42.4l-1.5-0.5l-6.9,1.8H216.6v41.1h31.2l-24.9,5.1c12.6,53.4,29.4,99.3,54,136.5 c-21.6,21.6-48.3,37.5-78.9,47.7c8.7,8.4,19.2,25.2,24.6,36.6c6.7-2.7,13.2-5.6,19.5-8.6l57.3-121.7 C283.6,333.5,272,301,264.3,266.1z%22/%3E%3Cpath d=%22M198,323.4c-13.5-9.9-41.1-22.8-59.7-30L117,326.7c19.2,8.7,45.9,23.1,58.2,33.6L198,323.4z%22/%3E%3Cpath d=%22M211.5,245.1c-12.6-10.8-38.4-24-56.7-31.5L132,245.7c18.9,9,43.8,24,54.9,34.8L211.5,245.1z%22/%3E%3Cpath d=%22M180,366.6c-18,35.1-40.2,71.4-55.8,93.6l35.1,29.7c18-30,35.4-62.4,51-93.9L180,366.6z%22/%3E%3C/svg%3E")}

html body .citizen-page-footer #catlinks,
html body #catlinks {
	border: 0 !important;
	background: transparent !important;
	padding: 0 !important;
	margin: 0 !important;
}

.citizen-page-footer{display:flex;flex-direction:column;gap:var(--space-xl);padding-top:var(--space-xl);margin-top:var(--space-xl)}
.page-info{display:flex;flex-wrap:wrap;gap:var(--space-xl)}
.page-info__item{display:flex;flex-direction:column;gap:var(--space-xxs)}
.page-info__label{color:var(--color-subtle);font-family:var(--font-family-overline);font-size:var(--font-size-overline);font-weight:var(--font-weight-overline);line-height:var(--line-height-overline);text-transform:var(--text-transform-overline);letter-spacing:var(--letter-spacing-overline)}
.page-info__text{color:var(--color-base);font-size:var(--font-size-small);line-height:var(--line-height-small)}
html body #catlinks .mw-normal-catlinks { border: 0 !important; background: transparent !important; }

.citizen-page-footer.ve-init-mw-desktopArticleTarget-uneditableContent,
.ve-init-mw-desktopArticleTarget-uneditableContent .citizen-page-footer {
	opacity: 1 !important;
}
.citizen-page-footer.ve-init-mw-desktopArticleTarget-uneditableContent #catlinks,
.citizen-page-footer.ve-init-mw-desktopArticleTarget-uneditableContent .catlinks,
.ve-init-mw-desktopArticleTarget-uneditableContent .citizen-page-footer #catlinks,
.ve-init-mw-desktopArticleTarget-uneditableContent .citizen-page-footer .catlinks {
	pointer-events: auto !important;
}
.citizen-page-footer.ve-init-mw-desktopArticleTarget-uneditableContent .page-info,
.ve-init-mw-desktopArticleTarget-uneditableContent .citizen-page-footer .page-info {
	opacity: 0.5 !important;
}
.ve-init-mw-desktopArticleTarget-categoryEdit {
	display: flex;
	gap: var(--space-xxs);
	align-items: center;
	align-self: flex-start;
	order: 1;
	width: 32px;
	height: 32px;
	padding: var(--space-xs);
	margin-top: auto;
	color: var(--color-base);
	cursor: pointer;
}
.ve-init-mw-desktopArticleTarget-categoryEdit .mw-editsection-bracket { display: none; }
.ve-init-mw-desktopArticleTarget-categoryEdit a {
	display: flex;
	align-items: center;
	font-size: 0;
	color: inherit !important;
	text-decoration: none;
}
.ve-init-mw-desktopArticleTarget-categoryEdit a::before {
	display: block;
	width: 1rem;
	height: 1rem;
	content: "";
	background-color: currentcolor;
	-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='m16.77 8 1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z'/%3E%3C/svg%3E");
	mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='m16.77 8 1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z'/%3E%3C/svg%3E");
	-webkit-mask-repeat: no-repeat;
	mask-repeat: no-repeat;
	-webkit-mask-position: center;
	mask-position: center;
	-webkit-mask-size: contain;
	mask-size: contain;
}
.ve-init-mw-desktopArticleTarget-categoryEdit:hover {
	background-color: var(--background-color-interactive-subtle--hover);
	border-radius: var(--border-radius-base);
}
.ve-init-mw-desktopArticleTarget-categoryEdit:focus { outline-color: var(--color-progressive); }
.ve-activated .ve-init-mw-desktopArticleTarget-originalContent #catlinks:hover {
	background-color: var(--background-color-button-quiet--hover);
}

html body #catlinks a { color: var(--color-link) !important; }
html body #catlinks a.new { color: var(--color-link-red) !important; }

html body .citizen-drawer__siteinfo .mw-logo-wordmark,
html body .citizen-footer__sitetitle .mw-logo-wordmark {
	margin-inline: 0 !important;
	align-self: flex-start !important;
	justify-self: flex-start !important;
	text-align: start !important;
}

html body .mw-logo-wordmark.cv-wordmark {
	display: block;
	height: 22px;
	width: auto;
	aspect-ratio: 105 / 22;
	background-color: light-dark(#000, #fff);
	-webkit-mask-image: url("https://zh.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-zh.svg");
	-webkit-mask-repeat: no-repeat;
	-webkit-mask-position: center;
	-webkit-mask-size: contain;
	mask-image: url("https://zh.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-zh.svg");
	mask-repeat: no-repeat;
	mask-position: center;
	mask-size: contain;
	line-height: 0;
	flex: 0 0 auto;
}

html body #catlinks a:hover,
html body #catlinks a:hover:visited {
	color: var(--color-inverted-primary) !important;
}
html body #catlinks a.new:hover,
html body #catlinks a.new:hover:visited {
	color: var(--color-inverted-fixed) !important;
}

.mw-parser-output a.new:not(.ilh-all *),
#mw-content-text a.new:not(.ilh-all *),
.mw-parser-output a.new:visited:not(.ilh-all *),
.mw-parser-output a.new:visited:hover:not(.ilh-all *) {
	color: var(--color-link-red) !important;
}
.mw-parser-output a.new:hover:not(.ilh-all *),
#mw-content-text a.new:hover:not(.ilh-all *) {
	color: var(--color-link-red--hover) !important;
}
.mw-parser-output a.new:active:not(.ilh-all *),
#mw-content-text a.new:active:not(.ilh-all *) {
	color: var(--color-link-red--active) !important;
}

.mw-parser-output a:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button),
.mw-parser-output a:visited:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button),
#mw-content-text a:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button),
#mw-content-text a:visited:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button) {
	color: var(--color-link) !important;
}
.mw-parser-output a:hover:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button),
.mw-parser-output a:visited:hover:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button),
#mw-content-text a:hover:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button) {
	color: var(--color-link--hover) !important;
}

.mw-parser-output a:active:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button),
.mw-parser-output a:visited:active:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button),
#mw-content-text a:active:not(.new):not([role="button"]):not(.oo-ui-buttonElement-button):not(.cdx-button) {
	color: var(--color-link--active) !important;
}

body.citizen-is-mainpage.action-view .citizen-page-header {
	margin-top: calc( var( --space-xl, 24px ) * 2 );
}
body.citizen-is-mainpage.action-view .citizen-page-header-inner {
	justify-content: center;
}
@media screen and ( min-width: 1120px ) {
	body.citizen-is-mainpage.action-view .citizen-page-header-inner {
		border-top: var( --border-width-base, 1px ) solid var( --border-color-base, rgba( 0, 0, 0, 0.1 ) );
	}
}
body.citizen-is-mainpage.action-view .citizen-page-heading,
body.citizen-is-mainpage.action-view #contentSub {
	display: none;
}
body.citizen-is-mainpage.action-view .citizen-body-container {
	margin-top: var( --space-xl, 24px );
}
body.citizen-is-mainpage.action-view .citizen-page-actions {
	margin-inline-start: 0;
}

body.citizen-is-mainpage.action-view .citizen-body-container {
	grid-template-columns: minmax(0, var(--width-layout, 1080px)) !important;
	grid-template-areas: "content" "footer" !important;
}
body.citizen-is-mainpage.action-view .citizen-page-sidebar {
	display: none !important;
}
body.citizen-is-mainpage.action-view .citizen-page-header-inner {
	max-width: var(--width-layout, 1080px) !important;
}

.mw-parser-output a.external,
html body.skin-vector-2022 .mw-parser-output a.external,
html body #mw-content-text a.external {
	background-image: none !important;
	background-position: initial !important;
	background-repeat: initial !important;
	background-size: initial !important;
	padding-right: 0 !important;
}

html:root {
	--color-surface-0: light-dark(oklch(96% 0.01 262.29), oklch(14% 0.01 262.29));
	--color-surface-1: light-dark(oklch(94% 0.015 262.29), oklch(calc(14% + 2%) 0.015 262.29));
	--color-surface-1--hover: light-dark(oklch(92% 0.02 262.29), oklch(calc(calc(14% + 2%) + calc(4% * 1)) 0.015 262.29));
	--color-surface-1--active: light-dark(oklch(90% 0.028 262.29), oklch(calc(calc(14% + 2%) + calc(4% * -1)) 0.015 262.29));
	--color-surface-2: light-dark(oklch(92% 0.02 262.29), oklch(calc(14% + (2% * 2)) 0.02 262.29));
	--color-surface-2--hover: light-dark(oklch(90% 0.028 262.29), oklch(calc(calc(14% + (2% * 2)) + calc(4% * 1)) 0.02 262.29));
	--color-surface-2--active: light-dark(oklch(84% 0.035 262.29), oklch(calc(calc(14% + (2% * 2)) + calc(4% * -1)) 0.02 262.29));
	--color-surface-3: light-dark(oklch(90% 0.03 262.29), oklch(calc(14% + (2% * 3)) 0.03 262.29));
	--color-surface-4: light-dark(oklch(88% 0.04 262.29), oklch(calc(14% + (2% * 4)) 0.04 262.29));
	--background-color-base: light-dark(oklch(96% 0.01 262.29), oklch(14% 0.01 262.29));
	--background-color-neutral: light-dark(oklch(calc(96% + (-2% * 2)) 0.02 262.29), oklch(calc(14% + (2% * 2)) 0.02 262.29));
	--background-color-neutral-subtle: light-dark(oklch(calc(96% + -2%) 0.015 262.29), oklch(calc(14% + 2%) 0.015 262.29));
	--background-color-interactive: light-dark(oklch(calc(96% + (-2% * 2)) 0.02 262.29), oklch(calc(14% + (2% * 2)) 0.02 262.29));
	--background-color-interactive--hover: light-dark(oklch(calc(calc(96% + (-2% * 2)) + calc(4% * 1)) 0.02 262.29), oklch(calc(calc(14% + (2% * 2)) + calc(4% * 1)) 0.02 262.29));
	--background-color-interactive--active: light-dark(oklch(calc(calc(96% + (-2% * 2)) + calc(4% * -1)) 0.02 262.29), oklch(calc(calc(14% + (2% * 2)) + calc(4% * -1)) 0.02 262.29));
	--background-color-interactive-subtle: light-dark(oklch(calc(96% + -2%) 0.015 262.29), oklch(calc(14% + 2%) 0.015 262.29));
	--background-color-interactive-subtle--hover: light-dark(oklch(calc(calc(96% + -2%) + calc(4% * 1)) 0.015 262.29), oklch(calc(calc(14% + 2%) + calc(4% * 1)) 0.015 262.29));
	--background-color-interactive-subtle--active: light-dark(oklch(calc(calc(96% + -2%) + calc(4% * -1)) 0.015 262.29), oklch(calc(calc(14% + 2%) + calc(4% * -1)) 0.015 262.29));
	--background-color-progressive: light-dark(oklch(53.25% 0.1679 262.29), oklch(60% 0.1679 262.29));
	--background-color-progressive-subtle: light-dark(hsl(220, 60%, 95%), hsl(220, 60%, 5%));
	--background-color-destructive: oklch(54% 0.18 10);
	--background-color-destructive--hover: oklch(48% 0.16 10);
	--background-color-destructive--active: oklch(35% 0.135 10);
	--background-color-disabled: light-dark(oklch(calc(96% + (-2% * 3)) 0.03 262.29), oklch(calc(14% + (2% * 3)) 0.03 262.29));
	--background-color-disabled-subtle: light-dark(oklch(calc(96% + -2%) 0.015 262.29), oklch(calc(14% + 2%) 0.015 262.29));
	--background-color-error: light-dark(hsl(340, 100%, 40%), hsl(340, 100%, 50%));
	--background-color-error-subtle: light-dark(hsl(340, 95%, 95%), hsl(340, 85%, 5%));
	--background-color-inverted: #101418;
	--border-color-base: light-dark(rgb(0 0 0 / 0.1), rgb(255 255 255 / 0.1));
	--border-color-emphasized: light-dark(oklch(20% 0.09 262.29), oklch(80% 0.05 262.29));
	--border-color-subtle: light-dark(rgb(0 0 0 / 0.05), rgb(255 255 255 / 0.05));
	--border-color-muted: light-dark(rgb(0 0 0 / 0.03), rgb(255 255 255 / 0.03));
	--border-color-interactive: light-dark(rgb(0 0 0 / 0.1), rgb(255 255 255 / 0.1));
	--border-color-interactive--hover: light-dark(rgb(0 0 0 / 0.2), rgb(255 255 255 / 0.2));
	--border-color-interactive--active: light-dark(rgb(0 0 0 / 0.3), rgb(255 255 255 / 0.3));
	--border-color-divider: light-dark(rgb(0 0 0 / 0.1), rgb(255 255 255 / 0.1));
	--border-color-progressive: light-dark(oklch(53.25% 0.1679 262.29), oklch(60% 0.1679 262.29));
	--border-color-disabled: light-dark(rgb(0 0 0 / 0.05), rgb(255 255 255 / 0.05));
	--color-base: light-dark(oklch(20% 0.09 262.29), oklch(80% 0.05 262.29));
	--color-base--hover: light-dark(oklch(24% 0.09 262.29), oklch(calc(80% + calc(4% * 1)) 0.05 262.29));
	--color-base--subtle: light-dark(oklch(35% 0.11 262.29), oklch(70% 0.07 262.29));
	--color-emphasized: light-dark(oklch(5% 0.07 262.29), oklch(93% 0.03 262.29));
	--color-subtle: light-dark(oklch(35% 0.11 262.29), oklch(70% 0.07 262.29));
	--color-placeholder: light-dark(oklch(40% 0.07 262.29), oklch(60% 0.03 262.29));
	--color-destructive: light-dark(hsl(340, 100%, 40%), hsl(340, 100%, 50%));
	--color-error: light-dark(hsl(340, 100%, 40%), hsl(340, 100%, 50%));
	--color-success: light-dark(hsl(170, 100%, 17%), hsl(170, 100%, 35%));
	--color-warning: light-dark(hsl(48, 100%, 40%), hsl(48, 100%, 60%));
	--color-inverted: light-dark(#fff, #fff);
	--color-inverted-fixed: light-dark(#fff, #fff);
	--color-progressive: light-dark(oklch(53.25% 0.1679 262.29), oklch(60% 0.1679 262.29));
	--color-progressive--hover: light-dark(oklch(57.25% 0.1679 262.29), oklch(calc(60% + calc(4% * 1)) 0.1679 262.29));
	--color-progressive--active: light-dark(oklch(49.25% 0.1679 262.29), oklch(calc(60% + calc(4% * -1)) 0.1679 262.29));
	--color-progressive--focus: light-dark(oklch(53.25% 0.1679 262.29), oklch(60% 0.1679 262.29));
	--color-link: light-dark(oklch(53.25% 0.1679 262.29), oklch(60% 0.1679 262.29));
	--color-link--hover: light-dark(oklch(57.25% 0.1679 262.29), oklch(calc(60% + calc(4% * 1)) 0.1679 262.29));
	--color-link--active: light-dark(oklch(49.25% 0.1679 262.29), oklch(calc(60% + calc(4% * -1)) 0.1679 262.29));
	--color-link--visited: light-dark(oklch(53.25% 0.1679 262.29), oklch(60% 0.1679 262.29));
	--color-link-red: var(--color-destructive);
	--color-link-red--hover: light-dark(hsl(340, 100%, 44%), hsl(340, 100%, 54%));
	--color-link-red--active: light-dark(hsl(340, 100%, 36%), hsl(340, 100%, 46%));
	--color-link-red--visited: var(--color-destructive);
	--accent-color-base: light-dark(oklch(53.25% 0.1679 262.29), oklch(60% 0.1679 262.29));
	--box-shadow-color-base: light-dark(oklch(12% 0.01 262.29 / 0.03), oklch(6% 0.01 262.29 / 0.44));
	--box-shadow-color-alpha-base: light-dark(oklch(12% 0.01 262.29 / 0.03), oklch(6% 0.01 262.29 / 0.44));
	--font-size-medium: 1rem;
	--line-height-medium: 1.625rem;
}

#firstHeading .mw-editsection {
	display: none !important;
}

.mw-parser-output .mw-heading,
.mw-parser-output .mw-heading h2,
.mw-parser-output .mw-heading h3,
.mw-parser-output .mw-heading h4,
.mw-parser-output .mw-heading h5,
.mw-parser-output .mw-heading h6 {
	border-bottom: 0 !important;
	text-decoration: none !important;
}
.mw-parser-output .mw-heading a { text-decoration: none !important; }

.mw-parser-output .mw-heading {
	display: flex !important;
	align-items: center;
	justify-content: flex-start !important;
	flex-wrap: wrap;
	column-gap: 0;
}
.mw-parser-output .mw-heading h2,
.mw-parser-output .mw-heading h3,
.mw-parser-output .mw-heading h4,
.mw-parser-output .mw-heading h5,
.mw-parser-output .mw-heading h6 {
	display: inline-flex !important;
	align-items: center;
	justify-content: flex-start !important;
	flex-grow: 0 !important;
	flex-basis: auto !important;
	margin: 0 !important;
	margin-block: 0 !important;
}
html body #bodyContent .mw-parser-output .mw-heading h2,
html body #bodyContent .mw-parser-output .mw-heading h3,
html body #bodyContent .mw-parser-output .mw-heading h4,
html body #bodyContent .mw-parser-output .mw-heading h5,
html body #bodyContent .mw-parser-output .mw-heading h6 {
	margin: 0 !important;
	margin-block: 0 !important;
}
.mw-parser-output .mw-heading > .mw-editsection,
.mw-parser-output .mw-heading.mw-heading2 > .mw-editsection {
	order: 0;
	flex-shrink: 0;
}
.mw-parser-output .mw-heading > .citizen-section-toggle { order: -2; }
.mw-parser-output .mw-heading { margin-block-start: 2em !important; }
.mw-parser-output .mw-heading.mw-heading3 { margin-block-start: 1.5em !important; }
.mw-parser-output .mw-heading.mw-heading4 { margin-block-start: 1.5em !important; }
.mw-parser-output .mw-heading.mw-heading5 { margin-block-start: 1.25em !important; }
.mw-parser-output .mw-heading.mw-heading6 { margin-block-start: 1.25em !important; }

.mw-parser-output .mw-heading .mw-editsection {
	display: inline-flex !important;
	align-items: center !important;
	justify-content: center !important;
	float: none !important;
	margin-inline-start: auto !important;
	margin-inline-end: 0 !important;
	width: 1.25rem;
	height: 1.25rem;
	box-sizing: content-box;
	font-size: 0 !important;
	line-height: 0 !important;
	color: var(--color-base, #202122) !important;
	vertical-align: middle;
	flex-shrink: 0;
	border-radius: var(--border-radius-base, 2px);
	transition: var(--transition-hover, opacity 0.1s ease);
	transition-property: opacity;
}
.mw-parser-output .mw-heading .mw-editsection .mw-editsection-bracket {
	display: none !important;
	font-size: 0 !important;
}
html body #bodyContent .mw-parser-output .mw-heading .mw-editsection a {
	display: inline-flex !important;
	align-items: center !important;
	justify-content: center !important;
	width: 1.25rem !important;
	height: 1.25rem !important;
	margin: 0 !important;
	text-indent: -9999px !important;
	overflow: hidden !important;
	white-space: nowrap !important;
	color: var(--color-base, #202122) !important;
	background-color: currentcolor;
	-webkit-mask-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWRpdAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJtMTYuNzcgOCAxLjk0LTJhMSAxIDAgMCAwIDAtMS40MWwtMy4zNC0zLjNhMSAxIDAgMCAwLTEuNDEgMEwxMiAzLjIzek0xIDE0LjI1VjE5aDQuNzVsOS45Ni05Ljk2LTQuNzUtNC43NXoiLz48L2c+PC9zdmc+Cg==");
	mask-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+CgkJZWRpdAoJPC90aXRsZT48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJtMTYuNzcgOCAxLjk0LTJhMSAxIDAgMCAwIDAtMS40MWwtMy4zNC0zLjNhMSAxIDAgMCAwLTEuNDEgMEwxMiAzLjIzek0xIDE0LjI1VjE5aDQuNzVsOS45Ni05Ljk2LTQuNzUtNC43NXoiLz48L2c+PC9zdmc+Cg==");
	-webkit-mask-repeat: no-repeat;
	mask-repeat: no-repeat;
	-webkit-mask-position: center;
	mask-position: center;
	-webkit-mask-size: contain;
	mask-size: contain;
	text-decoration: none !important;
	opacity: var(--opacity-icon-base, 0.65);
	transition: var(--transition-hover, opacity 0.1s ease);
	transition-property: opacity;
}
html body #bodyContent .mw-parser-output .mw-heading .mw-editsection a:hover {
	opacity: var(--opacity-icon-base--hover, 0.74);
}
html body #bodyContent .mw-parser-output .mw-heading .mw-editsection a:active {
	opacity: var(--opacity-icon-base--selected, 1);
}

.mw-parser-output .mw-heading .citizen-section-toggle {
	-webkit-appearance: none;
	appearance: none;
	background: transparent;
	border: 0 !important;
	padding: 0 !important;
	margin-inline-start: 0 !important;
	margin-inline-end: var(--space-sm, 0.5rem) !important;
	cursor: pointer;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	color: inherit;
	box-sizing: content-box;
	border-radius: var(--border-radius-base, 2px);
	vertical-align: middle;
	line-height: 1;
	order: -2;
	transition: var(--transition-hover, opacity 0.1s ease);
	transition-property: opacity;
}
.mw-parser-output .mw-heading .citizen-section-toggle .citizen-ui-icon {
	--size-icon: 1.25rem;
}
.mw-parser-output .mw-heading .citizen-section-toggle::before,
.mw-parser-output .mw-heading .citizen-section-toggle::after {
	content: none !important;
	display: none !important;
	background: none !important;
	-webkit-mask: none !important;
	mask: none !important;
}
.mw-parser-output .mw-heading .citizen-section-toggle:hover {
	opacity: var(--opacity-icon-base--hover, 0.7);
}
.mw-parser-output .mw-heading .citizen-section-toggle:active {
	opacity: var(--opacity-icon-base--selected, 1);
}
.mw-parser-output .mw-heading.citizen-section--collapsed .citizen-section-toggle .citizen-ui-icon::before {
	transform: rotate3d(1, 0, 0, 180deg);
}
.mw-parser-output .mw-heading.citizen-section--collapsed h2,
.mw-parser-output .mw-heading.citizen-section--collapsed h3,
.mw-parser-output .mw-heading.citizen-section--collapsed h4 {
	color: var(--color-subtle, #72777d) !important;
}
.mw-parser-output .citizen-section-hidden { display: none !important; }

.mw-parser-output figure[typeof~='mw:File'],
.mw-parser-output figure[typeof~='mw:File/Frameless'],
.mw-parser-output figure[typeof~='mw:File/Thumb'],
.mw-parser-output figure[typeof~='mw:File/Frame'],
.mw-parser-output .thumb,
.mw-parser-output .thumbinner {
	background: transparent !important;
	border: 0 !important;
	padding: 0 !important;
}
.mw-parser-output .mw-file-element,
.mw-parser-output figure img,
.mw-parser-output .thumb img,
.mw-parser-output .thumbimage {
	background: transparent !important;
	border: 0 !important;
	padding: 0 !important;
}
.mw-parser-output figure[typeof~='mw:File/Thumb'] > .mw-file-description,
.mw-parser-output figure[typeof~='mw:File/Frame'] > .mw-file-description,
.mw-parser-output figure[typeof~='mw:File/Thumb'] > span:first-child,
.mw-parser-output figure[typeof~='mw:File/Frame'] > span:first-child {
	display: block;
	overflow: hidden;
	border-radius: var(--border-radius-base, 4px);
}
.mw-parser-output figure[typeof~='mw:File/Thumb'] > figcaption,
.mw-parser-output figure[typeof~='mw:File/Frame'] > figcaption,
.mw-parser-output .thumbcaption {
	padding: 0 var(--border-radius-base, 4px) !important;
	color: var(--color-subtle, #72777d) !important;
	font-size: var(--font-size-small, 0.875rem) !important;

	background: transparent !important;
	border: 0 !important;
}
.mw-parser-output figure[typeof~='mw:File/Thumb'] > figcaption:not(:empty),
.mw-parser-output figure[typeof~='mw:File/Frame'] > figcaption:not(:empty) {
	margin-top: var(--space-xs, 4px);
}

.oo-ui-toolbar-bar {
	background-color: var(--color-surface-0, #fff) !important;
	border-block-end: 0 !important;
	border-radius: 0 !important;
	color: var(--color-base, #202122) !important;
	box-shadow: 0 1px 0 0 var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
}
.ve-init-mw-desktopArticleTarget-toolbar,
.ve-init-mw-desktopArticleTarget-toolbarPlaceholder,
.ve-ui-overlay-local,
.ve-ui-overlay-global,
.ve-ui-sidebarDialogWindowManager {
	font-size: 0.875rem;
}
.ve-init-mw-desktopArticleTarget-toolbar {
	z-index: 100;
}
.ve-init-mw-desktopArticleTarget-toolbar > .oo-ui-toolbar-bar {
	border-bottom: 0 !important;
	box-shadow: 0 1px 0 0 var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
}
.ve-init-mw-desktopArticleTarget .ve-init-mw-target-surface {
	margin-inline: 0 !important;
}
@media (min-width: 1120px) {
	.ve-ui-toolbar-floating.ve-init-mw-desktopArticleTarget-toolbar > .oo-ui-toolbar-bar {
		top: var(--header-size-block-start, 0px);
	}
}
.ve-init-mw-desktopArticleTarget-toolbar > .oo-ui-toolbar-bar > .oo-ui-toolbar-tools {
	position: relative;
	background-color: var(--color-surface-0, #fff) !important;
}
.ve-init-mw-desktopArticleTarget-toolbar > .oo-ui-toolbar-bar > .oo-ui-toolbar-tools:first-child {
	display: inline-block;
	max-width: calc(100% - 250px);
	white-space: nowrap;
}
.ve-init-mw-desktopArticleTarget-toolbar > .oo-ui-toolbar-bar > .oo-ui-toolbar-actions {
	border-left: var(--border-width-base, 1px) solid var(--border-color-base, rgb(0 0 0 / 0.1));
}
.oo-ui-toolbar .oo-ui-tool-link,
.oo-ui-toolbar .oo-ui-popupToolGroup-handle {
	border-radius: 0 !important;
}
.oo-ui-toolbar .oo-ui-tool,
.oo-ui-toolbar .oo-ui-toolGroup,
.oo-ui-toolbar .ve-ui-toolbar-group-format,
.oo-ui-toolbar .ve-ui-toolbar-group-style,
.oo-ui-toolbar .ve-ui-toolbar-group-cite,
.oo-ui-toolbar .ve-ui-toolbar-group-structure,
.oo-ui-toolbar .ve-ui-toolbar-group-insert,
.oo-ui-toolbar .ve-ui-toolbar-group-help,
.oo-ui-toolbar .ve-ui-toolbar-group-pageMenu,
.oo-ui-toolbar .ve-ui-toolbar-group-editMode {
	color: var(--color-base, #202122) !important;
}
.oo-ui-toolbar .oo-ui-tool-group .oo-ui-tool,
.oo-ui-toolbar .oo-ui-toolGroup .oo-ui-popupToolGroup-handle {
	color: var(--color-base, #202122) !important;
	transition: var(--transition-hover, opacity 0.1s ease);
	transition-property: background-color, color, opacity;
}
.oo-ui-toolbar .oo-ui-toolGroup .oo-ui-popupToolGroup-handle:hover,
.oo-ui-toolbar .oo-ui-toolGroup .oo-ui-popupToolGroup-handle:focus {
	background-color: var(--background-color-button-quiet--hover, rgba(0, 0, 0, 0.027)) !important;
	color: var(--color-emphasized, #202122) !important;
}
.oo-ui-toolbar .oo-ui-toolGroup .oo-ui-popupToolGroup-handle:active {
	background-color: var(--background-color-button-quiet--active, rgba(0, 0, 0, 0.082)) !important;
}
.oo-ui-toolbar .oo-ui-tool.oo-ui-widget-disabled {
	color: var(--color-base--subtle, #72777d) !important;
	opacity: 0.5 !important;
}
.oo-ui-widget.oo-ui-widget-enabled.oo-ui-selectWidget.oo-ui-selectWidget-unpressed.oo-ui-clippableElement-clippable.oo-ui-floatableElement-floatable.oo-ui-menuSelectWidget {
}
.oo-ui-toolbar .oo-ui-popupWidget,
.oo-ui-popupToolGroup .oo-ui-popupWidget {
	filter: drop-shadow(0 2px 1px rgb(0 0 0 / 0.3));
	transform: translateZ(0);
}
.oo-ui-toolbar .oo-ui-popupWidget .oo-ui-popupWidget-popup,
.oo-ui-toolbar .oo-ui-popupTool-popup .oo-ui-popupWidget-popup,
.oo-ui-popupToolGroup .oo-ui-popupWidget .oo-ui-popupWidget-popup,
.ve-ui-desktopContext .oo-ui-popupWidget-popup {
	background-color: var(--color-surface-1, #f8f9fa) !important;
	border: 1px solid var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
	border-radius: var(--border-radius-base, 4px) !important;
	box-shadow: none !important;
	color: var(--color-base, #202122) !important;
}
.ve-ui-mwTransclusionOutlineTemplateWidget-sticky {
	background-color: var(--color-surface-1, #f8f9fa) !important;
}
.ve-ce-branchNode-blockSlug,
.ve-ce-branchNode-newSlug {
	outline: 1px dashed var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
	background-color: var(--background-color-button-quiet--hover, rgba(0, 0, 0, 0.027)) !important;
}
.ve-ui-desktopContext-menu {
	width: 400px;
}
.ve-ui-desktopContext .ve-ui-linkContextItem .ve-ui-linkContextItem-label {
	width: calc(100% + 1em * 2);
	border-top-color: var(--border-color-base, rgb(0 0 0 / 0.1));
}
.ve-ui-desktopContext .ve-ui-linkContextItem .ve-ui-linkContextItem-label .ve-ui-linkContextItem-label-preview {
	color: var(--color-subtle, #54595d);
}
.oo-ui-window-content,
.oo-ui-dialog-content,
.oo-ui-processDialog-content,
.ve-ui-nodeDialog,
.ve-ui-mwTemplateDialog,
.ve-ui-mwTransclusionDialog-expanded,
.oo-ui-window-content-setup,
.oo-ui-window-content-ready {
	background-color: var(--color-surface-0, #fff) !important;
	color: var(--color-base, #202122) !important;
}
.oo-ui-processDialog-title,
.oo-ui-window-head,
.oo-ui-dialog-panel .oo-ui-horizontalLayout .oo-ui-labelElement-label {
	color: var(--color-base, #202122) !important;
}
.oo-ui-processDialog-actions,
.oo-ui-dialog .oo-ui-window-footer,
.oo-ui-window-footer {
	background-color: var(--color-surface-1, #f8f9fa) !important;
	border-block-start: 1px solid var(--border-color-subtle, rgb(0 0 0 / 0.05)) !important;
}
.oo-ui-inputWidget-input,
.oo-ui-textInputWidget input,
.oo-ui-textInputWidget textarea {
	background-color: var(--color-surface-0, #fff) !important;
	color: var(--color-base, #202122) !important;
	border: 1px solid var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
	border-radius: var(--border-radius-base, 2px) !important;
}
.oo-ui-inputWidget-input:focus,
.oo-ui-textInputWidget input:focus {
	border-color: var(--color-progressive, #36c) !important;
	box-shadow: inset 0 0 0 1px var(--color-progressive, #36c) !important;
}
.oo-ui-buttonElement-framed.oo-ui-flaggedElement-progressive .oo-ui-buttonElement-button {
	background-color: var(--color-surface-0, #fff) !important;
	color: var(--color-progressive, #36c) !important;
	border: 1px solid var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
	border-radius: var(--border-radius-base, 2px) !important;
}
.oo-ui-buttonElement-framed.oo-ui-flaggedElement-progressive .oo-ui-buttonElement-button:hover {
	background-color: var(--color-surface-2--hover, #eaecf0) !important;
	border-color: var(--color-progressive--hover, #4b77d6) !important;
}
.oo-ui-buttonElement-framed.oo-ui-flaggedElement-primary.oo-ui-flaggedElement-progressive .oo-ui-buttonElement-button {
	background-color: var(--color-progressive, #36c) !important;
	color: #fff !important;
	border: 1px solid var(--color-progressive, #36c) !important;
	border-radius: var(--border-radius-base, 2px) !important;
}
.oo-ui-buttonElement-framed.oo-ui-flaggedElement-primary.oo-ui-flaggedElement-progressive .oo-ui-buttonElement-button:hover {
	background-color: var(--color-progressive--hover, #4b77d6) !important;
	border-color: var(--color-progressive--hover, #4b77d6) !important;
}
.ve-ui-mwFloatingHelpElement-toggle.oo-ui-buttonElement-framed.oo-ui-flaggedElement-progressive > .oo-ui-buttonElement-button {
	border-radius: 50% !important;
}
.oo-ui-buttonElement-framed.oo-ui-flaggedElement-destructive .oo-ui-buttonElement-button,
.oo-ui-buttonElement-framed.oo-ui-flaggedElement-secondary .oo-ui-buttonElement-button {
	background-color: transparent !important;
	color: var(--color-base, #202122) !important;
	border: 1px solid var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
	border-radius: var(--border-radius-base, 4px) !important;
}

.mw-editform:has(.ext-WikiEditor-ResizingDragBar) .editOptions {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
.wikiEditor-ui .wikiEditor-ui-view {
	border: 0 !important;
}
.wikiEditor-ui .wikiEditor-ui-top {
	position: sticky !important;
	top: var(--header-offset-block-start, 0px) !important;
	border-bottom: 0 !important;
	box-shadow: 0 1px 0 0 var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
	z-index: 100;
	transition-timing-function: var(--transition-timing-function-ease, ease);
	transition-duration: var(--transition-duration-medium, 250ms);
	transition-property: top;
}
.wikiEditor-ui .wikiEditor-ui-top::before {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	z-index: -100;
	display: block;
	height: 100%;
	content: "";
	background-color: var(--color-surface-0, #fff);
	filter: opacity(0.9);
	-webkit-backdrop-filter: var(--backdrop-filter-frosted-glass, none);
	backdrop-filter: var(--backdrop-filter-frosted-glass, none);
}
.wikiEditor-ui-toolbar {
	background-color: var(--color-surface-0, #fff) !important;
	box-shadow: none !important;
}
.wikiEditor-ui textarea {
	width: 100%;
	border: 0;
}
.wikiEditor-ui textarea:focus {
	outline: 0;
}
.wikiEditor-ui .wikiEditor-ui-left {
	float: left;
	width: 100%;
}
.wikiEditor-ui .wikiEditor-ui-right {
	float: right;
	background: var(--background-color-neutral-subtle, #f8f9fa);
	overflow: hidden;
}
.wikiEditor-ui-toolbar .group,
.wikiEditor-ui-toolbar .section-secondary .group {
	border-color: var(--border-color-muted, rgb(0 0 0 / 0.03)) !important;
}
.wikiEditor-ui-toolbar .tabs,
.wikiEditor-ui-toolbar .section-main,
.wikiEditor-ui-toolbar .section-secondary {
	min-height: 42px;
	position: relative;
	float: left;
	height: 100%;
}
.wikiEditor-ui-toolbar .section-secondary {
	float: right;
}
.wikiEditor-ui-toolbar .section-secondary .group {
	padding-right: 0;
	border-left: 1px solid var(--border-color-muted, rgb(0 0 0 / 0.03));
	border-right: 0;
}
.wikiEditor-ui-toolbar .sections {
	float: left;
	width: 100%;
	clear: both;
}
.wikiEditor-ui-toolbar .sections .section {
	float: left;
	width: 100%;
	border-top: 1px solid var(--border-color-subtle, rgb(0 0 0 / 0.05));
}
.wikiEditor-ui-toolbar .sections .section-hidden {
	display: none;
}
.wikiEditor-ui-toolbar .sections .section-advanced:not(.section-hidden) {
	display: flex;
	overflow: auto;
}
.wikiEditor-ui-toolbar .group {
	min-height: 32px;
	margin: 0;
	padding-right: 0;
}
.wikiEditor-ui-toolbar .section-secondary .group {
	border-left: 1px solid var(--border-color-muted, rgb(0 0 0 / 0.03));
}
.wikiEditor-ui-toolbar .group-search {
	float: right;
	border-right: 0;
}
.wikiEditor-ui-toolbar .tabs span.tab a,
.wikiEditor-ui-toolbar .group .tool-select .label {
	display: flex !important;
	column-gap: var(--space-xxs, 4px);
	align-items: center;
	height: 42px !important;
	padding-inline: var(--space-xs, 8px);
	font-weight: var(--font-weight-medium, 500);
	color: var(--color-emphasized, #000) !important;
	text-decoration: none;
	filter: none;
}
.wikiEditor-ui-toolbar .tabs span.tab a::before,
.wikiEditor-ui-toolbar .group .tool-select .label::before,
.wikiEditor-ui-toolbar .tabs span.tab a::after,
.wikiEditor-ui-toolbar .group .tool-select .label::after {
	position: relative;
	inset: unset;
	opacity: var(--opacity-icon-base, 0.87);
	filter: var(--filter-invert, none);
}
.wikiEditor-ui-toolbar .tabs span.tab a:hover,
.wikiEditor-ui-toolbar .group .tool-select .label:hover {
	color: var(--color-emphasized, #000) !important;
	background-color: var(--background-color-button-quiet--hover, rgba(0, 0, 0, 0.027)) !important;
}
.wikiEditor-ui-toolbar .tabs span.tab a:active,
.wikiEditor-ui-toolbar .group .tool-select .label:active {
	color: var(--color-emphasized, #000) !important;
	background-color: var(--background-color-button-quiet--active, rgba(0, 0, 0, 0.082)) !important;
}
.wikiEditor-ui-toolbar .tabs {
	display: flex !important;
	max-width: 100%;
	margin-inline: 0;
	overflow: auto;
	white-space: nowrap;
	list-style: none;
}
.wikiEditor-ui-toolbar .tabs span.tab {
	position: relative;
	float: left;
	line-height: 42px;
}
.wikiEditor-ui-toolbar .tabs span.tab a:visited {
	color: var(--color-emphasized, #000) !important;
}
.wikiEditor-ui-toolbar .tabs span.tab a.current,
.wikiEditor-ui-toolbar .tabs span.tab a.current:visited {
	color: var(--color-progressive, #36c) !important;
	box-shadow: inset 0 -2px 0 0 var(--color-progressive, #36c);
}
.wikiEditor-ui-toolbar .group .label {
	float: left;
	border: 0;
	height: 38px !important;
	margin: 0 0 0 16px;
	font-size: var(--font-size-small, 0.875rem);
	font-weight: var(--font-weight-medium, 500);
	line-height: 38px;
	color: var(--color-subtle, #54595d) !important;
	cursor: default;
}
.wikiEditor-ui-toolbar .group .tool-select {
	float: left;
	background-color: transparent !important;
	height: 42px !important;
	margin: 0 !important;
	border: 0 !important;
	padding: 0;
	cursor: pointer;
}
.wikiEditor-ui-toolbar .group .tool-select .label {
	position: relative;
	font-size: inherit;
	line-height: 42px;
	letter-spacing: inherit;
	height: 42px !important;
	padding: 0 26px 0 8px;
	margin: 0;
	cursor: pointer;
}
.wikiEditor-ui-toolbar .group .tool-select .label::after {
	height: 42px;
}
.wikiEditor-ui-toolbar .group .tool-select .options {
	background-color: var(--background-color-base, #fff);
	border: 1px solid var(--border-color-subtle, rgb(0 0 0 / 0.05));
}
.wikiEditor-ui-toolbar .group .tool-select .menu .options {
	margin-top: 42px;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
}
.wikiEditor-ui-toolbar .group .tool-select .options .option {
	color: var(--color-emphasized, #000) !important;
}
.wikiEditor-ui-toolbar .group .tool-select .options .option:hover {
	background-color: var(--background-color-progressive-subtle, #f1f4fd) !important;
}
.wikiEditor-ui-toolbar .group .tool-select .menu .options .option:hover {
	background-color: var(--background-color-button-quiet--hover, rgba(0, 0, 0, 0.027)) !important;
}
.wikiEditor-ui-toolbar .group .tool-select .options .option[rel="heading-2"] {
	font-size: var(--font-size-xx-large, 1.5rem);
	font-weight: var(--font-weight-semi-bold, 600);
	line-height: var(--line-height-xx-large, 2rem);
}
.wikiEditor-ui-toolbar .group .tool-select .options .option[rel="heading-3"] {
	font-size: var(--font-size-x-large, 1.25rem);
	font-weight: var(--font-weight-semi-bold, 600);
	line-height: var(--line-height-x-large, 1.75rem);
}
.wikiEditor-ui-toolbar .group .tool-select .options .option[rel="heading-4"] {
	font-size: var(--font-size-large, 1.125rem);
	font-weight: var(--font-weight-semi-bold, 600);
	line-height: var(--line-height-large, 1.5rem);
}
.wikiEditor-ui-toolbar .group .tool-select .options .option[rel="heading-5"] {
	font-size: var(--font-size-medium, 1rem);
	font-weight: var(--font-weight-semi-bold, 600);
}
.wikiEditor-ui-toolbar .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement > .oo-ui-buttonElement-button {
	min-width: 42px;
	min-height: 42px;
	border-radius: var(--border-radius-base, 4px);
}
.wikiEditor-ui-toolbar .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement > .oo-ui-buttonElement-button > .oo-ui-iconElement-icon {
	left: 0.78571429em;
	opacity: var(--opacity-icon-base, 0.87);
}
.wikiEditor-ui-toolbar .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement > .oo-ui-buttonElement-button:hover {
	background-color: var(--background-color-button-quiet--hover, rgba(0, 0, 0, 0.027));
}
.wikiEditor-ui-toolbar .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement > .oo-ui-buttonElement-button:hover > .oo-ui-iconElement-icon {
	opacity: var(--opacity-icon-base--hover, 1);
}
.wikiEditor-ui-toolbar .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement > .oo-ui-buttonElement-button:active {
	background-color: var(--background-color-button-quiet--active, rgba(0, 0, 0, 0.082));
}
.wikiEditor-ui-toolbar .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement > .oo-ui-buttonElement-button:active > .oo-ui-iconElement-icon {
	opacity: var(--opacity-icon-base--selected, 1);
}
.wikiEditor-ui-toolbar .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement.tool-active > .oo-ui-buttonElement-button {
	background-color: var(--background-color-progressive-subtle, #f1f4fd);
}
.wikiEditor-ui-toolbar .ve-init-mw-editSwitch .oo-ui-popupToolGroup.oo-ui-iconElement {
	height: 42px;
}
.wikiEditor-ui-toolbar .ve-init-mw-editSwitch .oo-ui-popupToolGroup.oo-ui-iconElement .oo-ui-popupToolGroup-handle {
	padding-top: 42px;
	border-radius: var(--border-radius-base, 4px);
}
.wikiEditor-ui-toolbar .booklet > .index {
	float: left;
	width: 20%;
	height: 125px;
	overflow: hidden auto;
	resize: horizontal;
	min-width: 6em;
	max-width: 50%;
}
.wikiEditor-ui-toolbar .booklet > .index > div {
	padding: 4px 4px 4px 6px;
	cursor: pointer;
}
.wikiEditor-ui-toolbar .booklet > .index > :hover {
	background-color: var(--background-color-interactive, #eaecf0);
}
.wikiEditor-ui-toolbar .booklet > .index > .current {
	background-color: var(--background-color-progressive-subtle, #f1f4fd);
	color: var(--color-progressive, #36c);
}
.wikiEditor-ui-toolbar .booklet .pages {
	height: 125px;
	overflow: auto;
}
.wikiEditor-ui-toolbar .page-characters {
	padding-bottom: 5px;
}
.wikiEditor-ui-toolbar .page-characters div {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-xxs, 4px);
	padding: var(--space-xxs, 4px);
}
.wikiEditor-ui-toolbar .page-characters div span {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	padding: 0;
	margin: 0;
	font-family: var(--font-family-monospace, monospace);
	font-size: 1.25em;
	line-height: 1;
	border: 0 !important;
	border-radius: var(--border-radius-base, 4px);
	color: var(--color-base, #202122);
	text-decoration: none;
	cursor: pointer;
}
.wikiEditor-ui-toolbar .page-characters div span:hover {
	background-color: var(--background-color-button-quiet--hover, rgba(0, 0, 0, 0.027)) !important;
	text-decoration: none;
}
.wikiEditor-ui-toolbar .page-characters div span:active {
	background-color: var(--background-color-button-quiet--active, rgba(0, 0, 0, 0.082)) !important;
}
.wikiEditor-ui-toolbar .page-characters div .wikiEditor-character-highlighted {
	background-color: #7db1c5;
	color: var(--color-base, #202122);
}
.wikiEditor-ui-toolbar .booklet > .index .wikiEditor-character-highlighted {
	background-color: rgba(41, 98, 204, 0.1);
	color: var(--color-base, #202122);
}
.wikiEditor-ui-toolbar .page-table {
	padding-left: 5px;
	padding-right: 5px;
}
.wikiEditor-ui-toolbar .page-table table {
	background: none;
	border-collapse: collapse;
	width: 100%;
}
.wikiEditor-ui-toolbar .page-table th {
	color: var(--color-subtle, #54595d);
}
.wikiEditor-ui-toolbar .page-table td {
	color: var(--color-base, #202122);
	border-top: 1px solid var(--border-color-subtle, rgb(0 0 0 / 0.05));
}
.wikiEditor-ui-toolbar .page-table th,
.wikiEditor-ui-toolbar .page-table td {
	margin: 0;
	padding: 5px;
	text-align: left;
}
.wikiEditor-ui-toolbar .section-help .page-table .cell {
	vertical-align: top;
}
.wikiEditor-ui-toolbar .section-help .page-table .cell-syntax {
	font-family: monospace, "Courier";
}
.wikiEditor-ui-toolbar .section-help .page-table .cell-syntax,
.wikiEditor-ui-toolbar .section-help .page-table .cell-result {
	width: 40%;
}
.wikiEditor-ui-toolbar .section-help .page-table .cell-description {
	width: 20%;
}
.wikiEditor-toolbar-dialog .ui-dialog-content {
	padding: var(--space-md, 16px) !important;
}
.wikiEditor-toolbar-dialog .ui-dialog-content fieldset {
	border: 0 !important;
	margin: 0 !important;
	padding: 0 !important;
}
.wikiEditor-toolbar-dialog .ui-dialog-content input[type="text"] {
	box-sizing: border-box;
}
.wikiEditor-toolbar-dialog .ui-dialog-content input[type="radio"],
.wikiEditor-toolbar-dialog .ui-dialog-content input[type="checkbox"] {
	margin-left: 0;
}
.wikiEditor-toolbar-dialog .ui-dialog-titlebar-close {
	padding: 0;
}
body .wikiEditor-toolbar-dialog .ui-dialog-titlebar-close {
	right: 0.9em;
}
.wikiEditor-toolbar-dialog .ui-dialog-buttonpane {
	border-top-color: var(--border-color-base, rgb(0 0 0 / 0.1)) !important;
}
.wikiEditor-toolbar-dialog .wikieditor-toolbar-field-wrapper > label {
	color: var(--color-subtle, #54595d);
	font-family: var(--font-family-overline, sans-serif);
	font-size: var(--font-size-overline, 0.75rem);
	font-weight: var(--font-weight-overline, 600);
	line-height: var(--line-height-overline, 1rem);
	text-transform: var(--text-transform-overline, uppercase);
	letter-spacing: var(--letter-spacing-overline, 0.05em);
}
.wikiEditor-toolbar-dialog .wikieditor-toolbar-field-wrapper > label ~ input,
.wikiEditor-toolbar-dialog .wikieditor-toolbar-field-wrapper > label ~ select {
	margin-top: var(--space-xxs, 4px);
}
.wikiEditor-toolbar-dialog .wikieditor-toolbar-field-wrapper > input + label {
	margin-left: var(--space-xs, 8px);
	font-size: inherit;
	color: var(--color-base, #202122);
	letter-spacing: inherit;
}
.wikieditor-toolbar-field-wrapper {
	padding: 0 0 25px 0;
}
.wikieditor-toolbar-floated-field-wrapper {
	float: left;
	margin-right: 2em;
}
#wikieditor-toolbar-replace-search,
#wikieditor-toolbar-replace-replace {
	width: 100%;
}
#wikieditor-toolbar-table-dialog fieldset {
	width: 218px;
	padding: 0;
	float: left;
}
#wikieditor-toolbar-table-dialog .wikieditor-toolbar-table-preview-wrapper {
	width: 330px;
	padding: 0;
	float: right;
}
.wikieditor-toolbar-table-preview-content * {
	cursor: default;
}
.wikiEditor-toolbar-dialog .wikieditor-toolbar-table-preview-wrapper table {
	width: 100% !important;
}
.wikiEditor-toolbar-dialog .wikieditor-toolbar-table-preview-content table td {
	padding: 10px 4px !important;
	height: auto !important;
}
.wikiEditor-toolbar-dialog .wikieditor-toolbar-table-preview-content table th {
	padding: 7px 3px !important;
}
.wikieditor-toolbar-table-dimension-fields .wikieditor-toolbar-field-wrapper {
	float: left;
	margin-right: 20px;
	vertical-align: bottom;
}
.wikieditor-toolbar-dialog-wrapper {
	width: 100%;
}
#wikieditor-toolbar-file-target,
#wikieditor-toolbar-file-caption,
#wikieditor-toolbar-file-alt {
	width: 100%;
}
.wikieditor-toolbar-file-alt-help {
	float: right;
}
.wikieditor-toolbar-file-options .wikieditor-toolbar-field-wrapper {
	float: left;
	margin: 0 20px 0 0;
}
#wikieditor-toolbar-file-dialog + .ui-dialog-buttonpane .ui-dialog-buttonset {
	width: 100%;
	text-align: right;
}
#wikieditor-toolbar-file-dialog + .ui-dialog-buttonpane .ui-dialog-buttonset .ui-button:last-child {
	float: left;
}
body.rtl .wikiEditor-toolbar-dialog .ui-dialog-buttonpane button {
	float: left;
	margin: 0.5em 0.4em 0.5em 0 !important;
}
.wikiEditor-ui .CodeMirror {
	line-height: 1.5em;
	padding: 0.1em;
	clear: both;
	box-sizing: border-box;
}
.wikiEditor-ui .CodeMirror pre,
.wikiEditor-ui .CodeMirror .CodeMirror-lines {
	padding: 0;
}
.mw-wikiEditor-InsertLink-TitleInputField .oo-ui-messageWidget {
	color: var(--color-subtle, #54595d);
	font-weight: 400;
}
.mw-wikiEditor-InsertLink-LinkTypeField .oo-ui-radioOptionWidget {
	display: inline-block;
	margin-left: 1em;
}
.mw-wikiEditor-InsertLink-LinkTypeField .oo-ui-radioOptionWidget:first-child {
	margin-left: 0;
}
.mw-editform #wpTextbox1 {
	padding: 0;
	padding-bottom: var(--space-lg, 1.25rem);
	background-color: transparent;
	border: 0;
}
.mw-editform #wpTextbox1:focus {
	outline: 0;
}
.mw-editform .editOptions {
	padding: var(--space-lg, 1.25rem);
	font-size: var(--font-size-small, 0.875rem);
	color: var(--color-base);
	background-color: var(--color-surface-2);
	border: 0;
	border-radius: var(--border-radius-large, 12px);
}
.mw-editform #editpage-copywarn {
	margin-top: var(--space-sm, 0.75rem);
	margin-bottom: var(--space-sm, 0.75rem);
	color: var(--color-subtle);
	font-size: var(--font-size-small, 0.875rem);
	line-height: var(--line-height-small, 1.375rem);
}
.mw-editform .editButtons {
	margin-top: var(--space-md, 1rem);
}

.oo-ui-buttonElement-button:not(.oo-ui-window-frame),
.oo-ui-dropdownWidget-handle,
.oo-ui-checkboxInputWidget-checkIcon,
.oo-ui-inputWidget-input,
.oo-ui-textInputWidget input,
.oo-ui-textInputWidget textarea,
.oo-ui-popupWidget,
.mw-ui-button,
.cdx-checkbox__icon,
.cdx-dialog:not(.mw-mmv-dialog):not(.oo-ui-dialog),
.cdx-select,
.cdx-select-vue__handle,
select,
textarea,
:where(input:not([type="checkbox"]):not([type="radio"]):not([type="range"])),
button:not([class]),
input[type="submit"]:not([class]),
input[type="button"]:not([class]),
input[type="reset"]:not([class]) {
	border-radius: var(--border-radius-base, 4px) !important;
}

.cdx-button {
	border-radius: var(--border-radius-base, 4px) !important;
}

.citizen-cdx-button--size-large.cdx-button:not(.cdx-button--icon-only) {
	border-radius: var(--border-radius-medium, 8px) !important;
}

.oo-ui-panelLayout,
.mw-htmlform-ooui-wrapper {
	border: 0 !important;
	border-radius: 0 !important;
}

.citizen-page-actions .mw-portlet li.mw-list-item > a,
.citizen-menu__card-content .mw-list-item > a,
.vector-menu-content-list .mw-list-item > a {
	border-radius: var(--border-radius-base, 4px) !important;
}

.citizen-page-actions .mw-portlet li.mw-list-item > a.citizen-cdx-button--size-large:not(.cdx-button--icon-only) {
	border-radius: var(--border-radius-medium, 8px) !important;
}

button:not([class]),
input[type="submit"]:not([class]),
input[type="button"]:not([class]),
input[type="reset"]:not([class]) {
	min-height: 32px;
	padding: 0 12px;
	font-family: inherit;
	font-size: inherit;
	border: 1px solid var(--border-color-base, #a2a9b1);
	background-color: var(--background-color-interactive-subtle, #f8f9fa);
	color: var(--color-base, #202122);
	cursor: pointer;
}

input:not([type]):not([class]),
input[type="text"]:not([class]),
input[type="search"]:not([class]),
input[type="email"]:not([class]),
input[type="url"]:not([class]),
input[type="tel"]:not([class]),
input[type="password"]:not([class]),
input[type="number"]:not([class]),
select:not([class]) {
	height: 32px;
	padding: 0 8px;
	font-family: inherit;
	font-size: inherit;
	line-height: 30px;
	border: 1px solid var(--border-color-base, #a2a9b1);
	background-color: var(--background-color-base, #fff);
	color: var(--color-base, #202122);
}
textarea:not([class]) {
	padding: 5px 8px;
	font-family: inherit;
	font-size: inherit;
	border: 1px solid var(--border-color-base, #a2a9b1);
	background-color: var(--background-color-base, #fff);
	color: var(--color-base, #202122);
}

.mw-ui-button {
	min-height: 32px;
	font-family: inherit;
	font-size: inherit;
}
.cdx-button {
	min-height: 32px;
	font-family: inherit;
}

.oo-ui-buttonElement.oo-ui-labelElement > .oo-ui-buttonElement-button,
.oo-ui-buttonElement.oo-ui-labelElement > .oo-ui-buttonElement-button > .oo-ui-labelElement-label,
.oo-ui-dropdownWidget-handle .oo-ui-labelElement-label {
	line-height: 20px !important;
}
.oo-ui-processDialog .oo-ui-actionWidget > .oo-ui-buttonElement-button,
.oo-ui-processDialog .oo-ui-actionWidget > .oo-ui-buttonElement-button > .oo-ui-labelElement-label {
	line-height: 1.42857143em !important;
}

.oo-ui-textInputWidget input {
	height: 32px;
	padding-block: 0;
	line-height: 30px;
}
.oo-ui-tagMultiselectWidget .oo-ui-inputWidget-input,
.oo-ui-tagMultiselectWidget-handle .oo-ui-inputWidget-input,
.oo-ui-tokensWidget .oo-ui-inputWidget-input {
	background-color: transparent !important;
	border: 0 !important;
	border-radius: 0 !important;
	box-shadow: none !important;
}
.oo-ui-tagMultiselectWidget-handle {
	border-radius: var(--border-radius-base, 4px) !important;
}
.oo-ui-tagMultiselectWidget.oo-ui-tagMultiselectWidget-outlined .oo-ui-tagMultiselectWidget-handle {
	border-bottom-right-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
.oo-ui-actionFieldLayout .oo-ui-actionFieldLayout-input > .oo-ui-widget .oo-ui-tagMultiselectWidget-handle {
	border-radius: var(--border-radius-base, 4px) 0 0 var(--border-radius-base, 4px) !important;
}
.oo-ui-comboBoxInputWidget .oo-ui-inputWidget-input {
	border-top-right-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}
.oo-ui-comboBoxInputWidget.oo-ui-comboBoxInputWidget-empty .oo-ui-inputWidget-input,
.oo-ui-comboBoxInputWidget-php .oo-ui-inputWidget-input {
	border-top-right-radius: var(--border-radius-base, 4px) !important;
	border-bottom-right-radius: var(--border-radius-base, 4px) !important;
}
.oo-ui-comboBoxInputWidget-dropdownButton.oo-ui-indicatorElement .oo-ui-buttonElement-button,
.oo-ui-comboBoxInputWidget-dropdownButton.oo-ui-indicatorElement .oo-ui-buttonElement-button:focus {
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
.oo-ui-numberInputWidget-buttoned .oo-ui-inputWidget-input {
	border-radius: 0 !important;
}
.oo-ui-numberInputWidget-minusButton > .oo-ui-buttonElement-button {
	border-top-right-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}
.oo-ui-numberInputWidget-plusButton > .oo-ui-buttonElement-button {
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
.oo-ui-selectFileInputWidget-dropTarget {
	border-radius: var(--border-radius-base, 4px) !important;
}
.oo-ui-actionFieldLayout .oo-ui-actionFieldLayout-input > .oo-ui-widget.oo-ui-textInputWidget > .oo-ui-inputWidget-input,
.oo-ui-actionFieldLayout .oo-ui-actionFieldLayout-input > .oo-ui-widget .oo-ui-dropdownWidget-handle {
	border-radius: var(--border-radius-base, 4px) 0 0 var(--border-radius-base, 4px) !important;
}
.oo-ui-actionFieldLayout .oo-ui-actionFieldLayout-button .oo-ui-buttonElement-framed > .oo-ui-buttonElement-button {
	border-radius: 0 var(--border-radius-base, 4px) var(--border-radius-base, 4px) 0 !important;
}

.oo-ui-checkboxInputWidget [type="checkbox"],
.oo-ui-checkboxInputWidget [type="checkbox"] + span,
.oo-ui-radioInputWidget [type="radio"],
.oo-ui-radioInputWidget [type="radio"] + span {
	width: 20px !important;
	height: 20px !important;
}
.oo-ui-radioInputWidget [type="radio"] + span {
	background-color: var(--background-color-base, #fff) !important;
}

.oo-ui-buttonGroupWidget,
.oo-ui-buttonSelectWidget {
	border-radius: var(--border-radius-base, 4px) !important;
}
.oo-ui-buttonGroupWidget .oo-ui-buttonElement-framed .oo-ui-buttonElement-button,
.oo-ui-buttonSelectWidget .oo-ui-buttonOptionWidget .oo-ui-buttonElement-button {
	border-radius: 0 !important;
}
.oo-ui-buttonGroupWidget .oo-ui-buttonElement-framed:first-child .oo-ui-buttonElement-button,
.oo-ui-buttonSelectWidget .oo-ui-buttonOptionWidget:first-child .oo-ui-buttonElement-button {
	border-top-left-radius: var(--border-radius-base, 4px) !important;
	border-bottom-left-radius: var(--border-radius-base, 4px) !important;
}
.oo-ui-buttonGroupWidget .oo-ui-buttonElement-framed:last-child .oo-ui-buttonElement-button,
.oo-ui-buttonSelectWidget .oo-ui-buttonOptionWidget:last-child .oo-ui-buttonElement-button {
	border-top-right-radius: var(--border-radius-base, 4px) !important;
	border-bottom-right-radius: var(--border-radius-base, 4px) !important;
}
.oo-ui-tabOptionWidget {
	font-weight: var(--font-weight-medium, 500);
}
.oo-ui-tabSelectWidget-framed .oo-ui-tabOptionWidget {
	border-top-left-radius: var(--border-radius-base, 4px);
	border-top-right-radius: var(--border-radius-base, 4px);
}
.oo-ui-tabSelectWidget-framed .oo-ui-tabOptionWidget.oo-ui-widget-enabled:hover {
	background-color: var(--background-color-button-quiet--hover, rgba(0, 0, 0, 0.027));
}
.oo-ui-tabSelectWidget-framed .oo-ui-tabOptionWidget.oo-ui-widget-enabled:active {
	background-color: var(--background-color-button-quiet--active, rgba(0, 0, 0, 0.082));
}
.oo-ui-tabSelectWidget-frameless.oo-ui-widget-enabled:focus .oo-ui-tabOptionWidget.oo-ui-optionWidget-selected {
	border-radius: var(--border-radius-base, 4px);
}

.oo-ui-buttonElement > .oo-ui-buttonElement-button,
.mw-ui-button,
.cdx-button,
button:not([class]),
input[type="submit"]:not([class]),
input[type="button"]:not([class]),
input[type="reset"]:not([class]) {
	font-weight: var(--font-weight-medium, 500);
}

body > .oo-ui-windowManager,
#mw-teleport-target > .oo-ui-windowManager {
	font-size: 1rem !important;
}
.oo-ui-windowManager-modal > .oo-ui-dialog > .oo-ui-window-frame {
	background-color: var(--color-surface-1, #f8f9fa) !important;
}
.oo-ui-windowManager-modal .oo-ui-window-content {
	background-color: transparent !important;
}
.oo-ui-windowManager-modal:not(.oo-ui-windowManager-size-full) > .oo-ui-dialog > .oo-ui-window-frame {
	border-radius: var(--border-radius-medium, 8px) !important;
	box-shadow: var(--box-shadow-large) !important;
}
.oo-ui-processDialog .oo-ui-processDialog-navigation .oo-ui-actionWidget > .oo-ui-buttonElement-button,
.oo-ui-processDialog .oo-ui-processDialog-actions-other .oo-ui-actionWidget > .oo-ui-buttonElement-button {
	border-radius: 0 !important;
}
.oo-ui-processDialog .oo-ui-processDialog-navigation .oo-ui-processDialog-actions-primary .oo-ui-actionWidget > .oo-ui-buttonElement-button {
	border-top-right-radius: var(--border-radius-medium, 8px) !important;
}
.oo-ui-processDialog .oo-ui-processDialog-navigation .oo-ui-processDialog-actions-safe .oo-ui-actionWidget > .oo-ui-buttonElement-button {
	border-top-left-radius: var(--border-radius-medium, 8px) !important;
}
.oo-ui-processDialog-title {
	font-weight: var(--font-weight-semi-bold, 600);
}
.oo-ui-messageDialog-actions .oo-ui-actionWidget .oo-ui-buttonElement-button {
	border: 0 !important;
	border-radius: 0 !important;
}
.oo-ui-messageDialog-actions-horizontal .oo-ui-actionWidget:first-child > .oo-ui-buttonElement-button {
	border-radius: 0 0 0 var(--border-radius-medium, 8px) !important;
}
.oo-ui-messageDialog-actions-horizontal .oo-ui-actionWidget:last-child > .oo-ui-buttonElement-button {
	border-radius: 0 0 var(--border-radius-medium, 8px) 0 !important;
}
.oo-ui-messageDialog-actions-horizontal .oo-ui-actionWidget:only-child > .oo-ui-buttonElement-button {
	border-radius: 0 0 var(--border-radius-medium, 8px) var(--border-radius-medium, 8px) !important;
}
.oo-ui-messageDialog-actions-vertical .oo-ui-actionWidget:last-child > .oo-ui-buttonElement-button {
	border-radius: 0 0 var(--border-radius-medium, 8px) var(--border-radius-medium, 8px) !important;
}
.oo-ui-messageDialog-actions .oo-ui-actionWidget > .oo-ui-buttonElement-button,
.oo-ui-messageDialog-actions .oo-ui-actionWidget > .oo-ui-buttonElement-button > .oo-ui-labelElement-label {
	line-height: 2.85714286em !important;
}

.mw-prefs-search.oo-ui-fieldLayout {
	width: auto;
	padding-block: var(--space-xs);
	margin: 0;
	position: sticky;
	transition-timing-function: var(--transition-timing-function-ease);
	transition-duration: var(--transition-duration-medium);
	transition-property: top;
	box-shadow: 0 1px 0 0 var(--border-color-base);
	z-index: 100;
	top: var(--header-offset-block-start) !important;
}
.citizen-sticky-header-visible .mw-prefs-search.oo-ui-fieldLayout {
	--header-offset-block-start: calc(var(--header-size-block-start) + var(--height-sticky-header));
}
.citizen-feature-autohide-navigation-clientpref-1 .citizen-scroll--down .mw-prefs-search.oo-ui-fieldLayout {
	--header-offset-block-start: 0px;
}
.mw-prefs-search.oo-ui-fieldLayout::before {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	z-index: -100;
	display: block;
	height: 100%;
	content: "";
	background-color: var(--color-surface-0);
	filter: opacity(0.9);
	backdrop-filter: var(--backdrop-filter-frosted-glass);
}
.mw-prefs-search.oo-ui-fieldLayout .oo-ui-textInputWidget {
	max-width: none;
}
#preferences .mw-htmlform-submit-buttons {
	position: sticky;
	bottom: 0;
	background-color: oklch(0.96 0.01 262.29);
	padding: 16px 0;
	margin-inline: 0;
}
.mw-prefs-tabs-wrapper .oo-ui-tabSelectWidget-framed {
	display: flex;
}

html body .citizen-body-container {
	padding: 0 32px;
}
#preferences .mw-body-content {
	max-width: 1080px;
}

.mw-prefs-search.oo-ui-fieldLayout {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mw-prefs-search .oo-ui-textInputWidget input,
.mw-prefs-search input.oo-ui-inputWidget-input {
	background-color: oklch(0.96 0.01 262.29);
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	height: 36.57px;
	font-size: 16px;
	box-shadow: none;
}

#citizen-languages__card .citizen-menu__content-list,
#citizen-variants__card .citizen-menu__content-list,
#citizen-sticky-header-languages .citizen-menu__content-list,
#citizen-sticky-header-variants .citizen-menu__content-list {
	list-style: none;
	margin: 0;
	padding: 4px 0;
	text-align: start;
	font-size: 0.875rem;
	line-height: 1.5;
	color: var(--color-base, #202122);
}
#citizen-languages__card .citizen-menu__content-list > li,
#citizen-variants__card .citizen-menu__content-list > li,
#citizen-sticky-header-languages .citizen-menu__content-list > li,
#citizen-sticky-header-variants .citizen-menu__content-list > li {
	display: block;
	margin: 0;
	padding: 0;
}
#citizen-languages__card .citizen-menu__content-list > li > a,
#citizen-variants__card .citizen-menu__content-list > li > a,
#citizen-sticky-header-languages .citizen-menu__content-list > li > a,
#citizen-sticky-header-variants .citizen-menu__content-list > li > a {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 6px 16px;
	text-decoration: none;
	text-align: start;
	color: var(--color-base, #202122);
	font-size: 0.875rem;
}
#citizen-languages__card .citizen-menu__content-list > li > a:hover,
#citizen-variants__card .citizen-menu__content-list > li > a:hover,
#citizen-sticky-header-languages .citizen-menu__content-list > li > a:hover,
#citizen-sticky-header-variants .citizen-menu__content-list > li > a:hover {
	background-color: var(--background-color-interactive-subtle, #f8f9fa);
}
#citizen-languages__card .citizen-menu__heading,
#citizen-variants__card .citizen-menu__heading,
#citizen-sticky-header-languages .citizen-menu__heading,
#citizen-sticky-header-variants .citizen-menu__heading {
	text-align: start;
	font-size: 0.875rem;
	margin: 0;
	padding: 8px 16px 4px;
	color: var(--color-subtle, #54595d);
	font-weight: 600;
}

.citizen-preferences-group { border: 0; padding: 0; margin: 0; }
.citizen-preferences-group__labelrow { display: flex; gap: var(--space-xs, 8px); align-items: baseline; justify-content: space-between; width: 100%; }
.citizen-preferences-group .cdx-label:has(.citizen-preferences-group__labelrow) { width: 100%; }
.citizen-preferences-group .cdx-label:has(.citizen-preferences-group__labelrow) .cdx-label__label,
.citizen-preferences-group .cdx-label:has(.citizen-preferences-group__labelrow) .cdx-label__label__text { display: block; width: 100%; }
.citizen-preferences-group__readout { overflow: hidden; text-overflow: ellipsis; font-size: var(--font-size-small, 0.875rem); font-weight: var(--font-weight-normal, 400); color: var(--color-subtle, #54595d); white-space: nowrap; }
.citizen-preferences-segmented { box-sizing: border-box; display: grid; grid-auto-columns: 1fr; grid-auto-flow: column; height: 44px; padding: var(--space-xxs, 4px); border: var(--border-subtle, 1px solid var(--border-color-base, #c8ccd1)); border-radius: var(--border-radius-medium, 4px); }
.citizen-preferences-segmented .cdx-radio { position: relative; margin-bottom: 0px; border: var(--border-width-base, 1px) solid transparent; border-radius: var(--border-radius-base, 2px); transition-duration: var(--transition-duration-base, 100ms); transition-property: background-color, color; }
.citizen-preferences-segmented .cdx-radio__icon { display: none; }
.citizen-preferences-segmented .cdx-radio__wrapper,
.citizen-preferences-segmented .cdx-label,
.citizen-preferences-segmented .cdx-label__label { width: 100%; min-width: 0px; height: 100%; }
.citizen-preferences-segmented .cdx-radio__wrapper { gap: 0px; }
.citizen-preferences-segmented .cdx-label { padding: 0px; }
.citizen-preferences-segmented .cdx-label__label { display: flex; align-items: center; justify-content: center; padding-inline: var(--space-xxs, 4px); overflow: hidden; text-overflow: ellipsis; font-size: var(--font-size-small, 0.875rem); color: var(--color-subtle, #54595d); white-space: nowrap; }
.citizen-preferences-segmented .cdx-radio,
.citizen-preferences-segmented .cdx-radio * { cursor: pointer; }
.citizen-preferences-segmented .cdx-radio:has(.cdx-radio__input:checked),
.citizen-preferences-segmented .cdx-radio:has(.cdx-radio__input:checked) * { cursor: default; }
.citizen-preferences-segmented .cdx-radio + .cdx-radio::before { position: absolute; inset-block: var(--space-xxs, 4px); inset-inline-start: 0px; width: 1px; content: ""; background-color: var(--border-color-base, #c8ccd1); }
.citizen-preferences-segmented .cdx-radio:hover:not(:has(.cdx-radio__input:checked)),
.citizen-preferences-segmented .cdx-radio:active:not(:has(.cdx-radio__input:checked)) { background-color: var(--background-color-interactive, #eaecf0); border-color: var(--border-color-interactive, #a2a9b1); }
.citizen-preferences-segmented .cdx-radio:hover:not(:has(.cdx-radio__input:checked)) .cdx-label__label,
.citizen-preferences-segmented .cdx-radio:active:not(:has(.cdx-radio__input:checked)) .cdx-label__label { color: var(--color-emphasized, #202122); }
.citizen-preferences-segmented .cdx-radio:hover:not(:has(.cdx-radio__input:checked))::before,
.citizen-preferences-segmented .cdx-radio:active:not(:has(.cdx-radio__input:checked))::before,
.citizen-preferences-segmented .cdx-radio:hover:not(:has(.cdx-radio__input:checked)) + .cdx-radio::before,
.citizen-preferences-segmented .cdx-radio:active:not(:has(.cdx-radio__input:checked)) + .cdx-radio::before { opacity: 0; }
.citizen-preferences-segmented .cdx-radio:active:not(:has(.cdx-radio__input:checked)) { border-color: var(--color-progressive, #36c); }
.citizen-preferences-segmented .cdx-radio:has(.cdx-radio__input:checked) { background-color: var(--background-color-interactive, #eaecf0); border-color: var(--color-progressive, #36c); box-shadow: inset 0 0 0 var(--border-width-base, 1px) var(--color-progressive, #36c); }
.citizen-preferences-segmented .cdx-radio:has(.cdx-radio__input:checked) .cdx-label__label { color: var(--color-emphasized, #202122); }
.citizen-preferences-segmented .cdx-radio:has(.cdx-radio__input:checked)::before,
.citizen-preferences-segmented .cdx-radio:has(.cdx-radio__input:checked) + .cdx-radio::before { opacity: 0; }
.citizen-preferences-segmented .cdx-radio:has(.cdx-radio__input:focus-visible) { outline: 2px solid var(--color-progressive, #36c); outline-offset: 1px; }
.citizen-preferences-segmented__sample { display: block; font-weight: var(--font-weight-medium, 500); line-height: 1; }
.citizen-preferences-segmented__page { display: block; }
.citizen-preferences-segmented__page-frame { opacity: 0.45; fill: none; stroke: currentcolor; stroke-width: 1.5; }
.citizen-preferences-segmented__page-column { opacity: 0.75; fill: currentcolor; }
.citizen-preferences-segmented__srlabel { position: absolute; width: 1px; height: 1px; overflow: hidden; white-space: nowrap; clip-path: inset(50%); }

.mwe-popups,
.mwe-popups-container {
	border-radius: 8px;
	overflow: hidden;
}

.mwe-popups {
	background: var(--color-surface-1) !important;
}

.mwe-popups .mwe-popups-container {
	background: var(--color-surface-1) !important;
}

.mwe-popups .mwe-popups-container footer {
	display: none !important;
}

.mwe-popups .mwe-popups-extract {
	margin: var(--space-md) !important;
}

.mwe-popups .mwe-popups-extract[dir="ltr"]::after {
	background-image: linear-gradient(to right, rgba(255, 255, 255, 0), var(--color-surface-1) 50%) !important;
}

.mwe-popups .mwe-popups-extract[dir="rtl"]::after {
	background-image: linear-gradient(to left, rgba(255, 255, 255, 0), var(--color-surface-1) 50%) !important;
}

.mwe-popups.mwe-popups-type-reference .mwe-popups-container .mwe-popups-extract .mwe-popups-fade {
	background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color-surface-1) 50%) !important;
}

.mwe-popups.mwe-popups-no-image-pointer::before {
	border-top-color: var(--border-color-base) !important;
}

.mwe-popups.mwe-popups-no-image-pointer::after {
	border-top-color: var(--color-surface-1) !important;
}

.mwe-popups.mwe-popups-image-pointer::after {
	border-top-color: var(--color-surface-1) !important;
}

.mwe-popups.mwe-popups-image-pointer.flipped-x::after {
	border-top-color: var(--color-surface-1) !important;
}

.mwe-popups.flipped-x-y::after {
	border-bottom-color: var(--color-surface-1) !important;
}

.mwe-popups.flipped-x-y.mwe-popups-is-tall::after {
	border-bottom-color: var(--color-surface-1) !important;
}

.mwe-popups.flipped-y::after {
	border-bottom-color: var(--color-surface-1) !important;
}

.rt-tooltip,
[id^="ilhpp-"] {
	border-radius: 8px;
	overflow: hidden;
}

.mw-mmv-post-image {
	right: 0 !important;
	left: 0 !important;
	width: auto !important;
	padding-block: var(--space-xs) var(--space-md) !important;
	padding-inline: var(--space-md) !important;
	border-top: var(--border-base) !important;
	border-top-left-radius: var(--border-radius-medium) !important;
	border-top-right-radius: var(--border-radius-medium) !important;
	transform: translateY(calc(var(--space-xs) * -1)) !important;
	transition-timing-function: var(--transition-timing-function-ease) !important;
	transition-duration: var(--transition-duration-medium) !important;
	transition-property: background-color, border-color, color !important;
	background-color: color-mix(in oklch, var(--color-surface-1) calc(var(--opacity-glass, 0.9) * 100%), transparent) !important;
	-webkit-backdrop-filter: var(--backdrop-filter-frosted-glass) !important;
	backdrop-filter: var(--backdrop-filter-frosted-glass) !important;
	box-shadow: none !important;
}
.mw-mmv-above-fold {
	display: flex !important;
	gap: var(--space-md) !important;
	align-items: center !important;
	height: auto !important;
	padding-bottom: 0 !important;
	transition-timing-function: var(--transition-timing-function-ease) !important;
	transition-duration: var(--transition-duration-medium) !important;
	transition-property: margin, padding, border !important;
}
.mw-mmv-progress {
	top: -2px !important;
	right: calc(var(--space-md) * -1) !important;
	left: calc(var(--space-md) * -1) !important;
	width: auto !important;
	height: 2px !important;
	background-color: transparent !important;
}
.mw-mmv-progress-percent {
	height: 2px !important;
	background: var(--color-progressive) !important;
}
.mw-mmv-title-contain {
	padding-block: var(--space-xs) !important;
}
.mw-mmv-title-para {
	display: flex !important;
	flex-grow: 1 !important;
	order: -1 !important;
	height: auto !important;
	padding: var(--space-xs) 0 !important;
	margin: 0 !important;
	font-size: var(--font-size-medium) !important;
	line-height: var(--line-height-small) !important;
}
.mw-mmv-title-para .mw-mmv-ttf-ellipsis {
	display: none !important;
}
.mw-mmv-title {
	font-weight: var(--font-weight-semi-bold) !important;
	color: var(--color-emphasized) !important;
}
.mw-mmv-stripe-button.mw-mmv-description-page-button {
	margin: 0 !important;
}
.mw-mmv-stripe-button.mw-mmv-description-page-button.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive {
	min-height: 32px !important;
	padding-inline: 11px !important;
}
@media (max-width: 719.98px) {
	.mw-mmv-stripe-button.mw-mmv-description-page-button {
		gap: 0 !important;
		font-size: 0 !important;
	}
}

.mw-mmv-image-metadata {
	display: flex !important;
	gap: var(--space-md) !important;
	justify-content: space-between !important;
	padding-top: 0 !important;
	margin-top: 0 !important;
	font-size: var(--font-size-small) !important;
	line-height: 2 !important;
	background-color: transparent !important;
	border-top: 0 !important;
	transform: translateY(calc(var(--space-xxs) * -1)) !important;
}
.mw-mmv-image-metadata-desc-column,
.mw-mmv-image-metadata-links-column {
	width: auto !important;
}
.mw-mmv-image-metadata-column {
	float: none !important;
}
.mw-mmv-image-metadata-desc-column {
	flex-grow: 1 !important;
	max-width: none !important;
}
.mw-mmv-image-metadata-links-column {
	flex-grow: 1 !important;
	max-width: none !important;
	width: auto !important;
	text-align: start !important;
	transition: none !important;
}
.mw-mmv-credit {
	padding: 0 !important;
	font-size: inherit !important;
}
.mw-mmv-source-author {
	line-height: inherit !important;
}
.mw-mmv-image-links {
	margin: 0 !important;
	line-height: inherit !important;
	color: var(--color-subtle) !important;
}
.mw-mmv-image-links li {
	font-size: inherit !important;
}
.mw-mmv-author::before,
.mw-mmv-image-links li::before {
	background-color: currentcolor !important;
}
.mw-mmv-image-desc {
	padding: 0 !important;
	font-size: var(--font-size-small) !important;
}
.mw-mmv-image-desc-div {
	margin-bottom: 0 !important;
}
.mw-mmv-image-desc-div,
.mw-mmv-image-links-div {
	display: block !important;
}
.mw-mmv-permission-box {
	margin: var(--space-md) 0 !important;
}
.mw-mmv-image img {
	pointer-events: auto;
}
@media (pointer: coarse) {
	.mw-mmv-image img {
		pointer-events: none !important;
	}
}
.mw-mmv-image.error {
	display: grid !important;
	place-content: center !important;
	background-color: inherit !important;
}
.mw-mmv-image .error-box {
	--mmv-error-icon-size: 80px;
	position: relative !important;
	inset: unset !important;
	padding: calc(var(--mmv-error-icon-size) + var(--space-xxl)) 0 0 0 !important;
	margin: var(--space-md) 4.5rem !important;
	line-height: var(--line-height-small) !important;
	overflow-wrap: break-word !important;
	background-size: var(--mmv-error-icon-size) !important;
}
.mw-mmv-image .error-box .mw-mmv-error-text {
	font-size: var(--font-size-xxx-large) !important;
	font-weight: var(--font-weight-semi-bold) !important;
	color: hsl(var(--color-progressive-hsl__h, 220), 35%, 65%) !important;
}
.mw-mmv-image .error-box .mw-mmv-error-description {
	margin-top: var(--space-md) !important;
	font-size: var(--font-size-small) !important;
	color: hsl(var(--color-progressive-hsl__h, 220), 35%, 65%) !important;
}
.mw-mmv-dialog {
	max-width: calc(100vw - 66px - var(--padding-page, 1rem));
	background-color: var(--color-surface-1) !important;
	border: var(--border-base) !important;
	border-radius: var(--border-radius-base) !important;
}

.mw-mmv-post-image:not(.mw-mmv-untruncated) {
	color: hsl(var(--color-progressive-hsl__h, 220), 45%, 80%) !important;
	background-color: transparent !important;
	border-color: transparent !important;
	-webkit-backdrop-filter: none !important;
	backdrop-filter: none !important;
}
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-title-para {
	max-height: 3rem !important;
	padding-block: 0 !important;
}
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-title {
	overflow: hidden !important;
	color: hsl(var(--color-progressive-hsl__h, 220), 80%, 95%) !important;
}
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-stripe-button.mw-mmv-description-page-button.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive {
	background-color: transparent !important;
	border-color: rgba(255, 255, 255, 0.11) !important;
}
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-stripe-button.mw-mmv-description-page-button.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:hover {
	background-color: var(--background-color-button-quiet--hover) !important;
}
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-stripe-button.mw-mmv-description-page-button.cdx-button.cdx-button--fake-button--enabled.cdx-button--weight-primary.cdx-button--action-progressive:active {
	background-color: var(--background-color-button-quiet--active) !important;
}
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-credit,
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-image-desc,
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-image-links {
	color: hsl(var(--color-progressive-hsl__h, 220), 35%, 65%) !important;
}

.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-image-metadata a,
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-permission-link,
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-label {
	color: hsl(var(--color-progressive-hsl__h, 220), 45%, 75%) !important;
}
.mw-mmv-post-image:not(.mw-mmv-untruncated) .mw-mmv-image-links li.mw-mmv-license-li {
	line-height: inherit !important;
}

.mw-mmv-untruncated .mw-mmv-above-fold {
	padding-bottom: var(--space-xs) !important;
	margin-bottom: var(--space-md) !important;
	border-bottom: 1px solid var(--border-color-base) !important;
}
.mw-mmv-untruncated .mw-mmv-image-metadata {
	line-height: var(--line-height-medium) !important;
}
.mw-mmv-untruncated .mw-mmv-image-metadata-desc-column {
	max-width: var(--width-layout, 1080px) !important;
	transform: none !important;
}
@media (max-width: 719.98px) {
	.mw-mmv-untruncated .mw-mmv-image-metadata {
		flex-direction: column !important;
	}
	.mw-mmv-untruncated .mw-mmv-image-metadata-links-column {
		max-width: none !important;
	}
}

.cv-home {
	--cvh-card: light-dark(#fff, oklch(18.5% 0.02 262.29));
	--cvh-surface: light-dark(oklch(97% 0.008 262.29), oklch(16.5% 0.015 262.29));
	--cvh-surface-2: light-dark(oklch(94.5% 0.012 262.29), oklch(22% 0.02 262.29));
	--cvh-border: light-dark(rgb(0 0 0 / 0.1), rgb(255 255 255 / 0.1));
	--cvh-border-subtle: light-dark(rgb(0 0 0 / 0.06), rgb(255 255 255 / 0.06));
	--cvh-accent: var(--color-progressive, #36c);
	--cvh-accent-subtle: var(--background-color-progressive-subtle, hsl(220 60% 95%));
	--cvh-shadow-sm: 0 1px 2px var(--box-shadow-color-base, rgba(0, 0, 0, 0.06));
	--cvh-shadow-md: 0 2px 8px var(--box-shadow-color-base, rgba(0, 0, 0, 0.1)), 0 1px 3px var(--box-shadow-color-base, rgba(0, 0, 0, 0.06));
	--cvh-radius: var(--border-radius-base, 4px);
	--cvh-radius-md: var(--border-radius-medium, 8px);
	--cvh-radius-lg: var(--border-radius-large, 12px);
	--cvh-t-fast: 80ms cubic-bezier(0.2, 0, 0, 1);
	--cvh-t-base: 250ms cubic-bezier(0.2, 0, 0, 1);
	--cvh-pad: 1.25rem;
	font-family: var(--font-family-base, sans-serif);
	font-size: var(--font-size-medium, 1rem);
	line-height: 1.6;
	color: var(--color-base, #202122);
}
.cv-home *, .cv-home *::before, .cv-home *::after { box-sizing: border-box; }
.cv-home ul, .cv-home ol { list-style: none; margin: 0; padding: 0; }
.cv-home li { margin: 0; }
.cv-home p { margin: 0; }
.cv-home figure { margin: 0; float: none; }
.cv-home img { max-width: 100%; }
.cv-home-active > #mp-2012 {
	margin-top: 0.75rem;
	padding: 1.25rem;
	background: #fff;
	border: 1px solid var(--border-color-base, rgb(0 0 0 / 0.1));
	border-radius: var(--border-radius-medium, 8px);
}
.cv-home-active > #mp-2012 > #mp-2012-banner { display: none !important; }

.cv-home .home-band { position: relative; padding: 0.75rem 0; }
.cv-home .home-band__inner { width: 100%; margin-inline: auto; }
.cv-home .home-section-heading {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin: 0 0 0.75rem;
	padding: 0;
	border: 0;
	font-size: 1.125rem;
	font-weight: 600;
	letter-spacing: -0.01em;
	color: var(--color-emphasized, #101418);
}
.cv-home .home-section-heading::before {
	content: "";
	display: inline-block;
	width: 4px;
	height: 1em;
	background: var(--cvh-accent);
	border-radius: 2px;
}

.cv-home .home-hero {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin-top: 0.75rem;
	padding: 1.25rem var(--cvh-pad);
	background: #fff;
	border: 1px solid var(--border-color-base, rgb(0 0 0 / 0.1));
	border-radius: var(--border-radius-medium, 8px);
	overflow: hidden;
}
.cv-home .home-hero__content { position: relative; z-index: 1; width: 100%; }
.cv-home .home-hero__wordmark {
	display: block;
	height: 26.83px;
	width: auto;
	margin-inline: auto;
}
.cv-home .home-hero__title {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 2rem;
	font-weight: 500;
	letter-spacing: -0.025em;
	line-height: 1.05;
	color: var(--color-emphasized, #101418);
}
.cv-home .home-hero__title-dim { display: block; margin-bottom: 0.25em; font-size: 1.25rem; font-weight: 400; letter-spacing: 0; color: var(--color-subtle, #54595d); }
.cv-home .home-hero__lead {
	font-family: "Songti SC", "SimSun", "Noto Serif CJK SC", "Source Han Serif SC", serif;
	font-size: 1.125rem;
	letter-spacing: 0.08em;
	color: var(--color-base, #202122);
}
.cv-home .home-hero__tabs {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 0.75rem;
}
.cv-home .home-hero__tabs a {
	display: block;
	padding: var(--space-xs, 0.5rem) var(--space-md, 1rem);
	border-radius: var(--border-radius-base, 4px);
	font-size: 14px;
	line-height: 22px;
	font-weight: var(--font-weight-medium, 500);
	text-decoration: none;
}
.cv-home .home-hero__tabs a:hover {
	background-color: var(--background-color-button-quiet--hover, rgba(0, 24, 73, 0.027));
	text-decoration: none;
}
.cv-home .home-hero__tabs a:active {
	background-color: var(--background-color-button-quiet--active, rgba(0, 24, 73, 0.082));
}
html body #mw-content-text .mw-parser-output .cv-home .home-band .home-hero .home-hero__tabs a,
html body #mw-content-text .mw-parser-output .cv-home .home-band .home-hero .home-hero__tabs a:visited,
html body #mw-content-text .mw-parser-output .cv-home .home-band .home-hero .home-hero__tabs a:hover,
html body #mw-content-text .mw-parser-output .cv-home .home-band .home-hero .home-hero__tabs a:active {
	color: var(--color-emphasized, #101418) !important;
}

.cv-home .home-grid {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 1rem;
	align-items: stretch;
}
.cv-home .home-grid--two { grid-template-columns: repeat(12, 1fr); }
.cv-home .home-card--read { grid-column: span 8; }
.cv-home .home-card--aside { grid-column: span 4; }
.cv-home .home-card--tall { grid-column: span 8; grid-row: span 2; }

.cv-home .t-card {
	position: relative;
	display: flex;
	flex-direction: column;
	background: var(--cvh-card);
	border: 1px solid var(--cvh-border);
	border-radius: var(--cvh-radius-md);
	overflow: hidden;
	transition: border-color var(--cvh-t-base), box-shadow var(--cvh-t-base);
}
.cv-home .t-card--link:hover { border-color: var(--cvh-accent); box-shadow: var(--cvh-shadow-md); }

.cv-home .t-card__kicker {
	padding: 0.5rem 1rem;
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-align: center;
	color: var(--color-inverted, #fff);
	background: var(--cvh-accent);
	border-bottom: 1px solid color-mix(in srgb, var(--color-inverted, #fff) 18%, transparent);
}
.cv-home .t-card__kicker::before,
.cv-home .t-card__kicker::after {
	font-weight: 400;
	opacity: 0.72;
}
.cv-home .t-card__kicker::before { content: "[ "; }
.cv-home .t-card__kicker::after { content: " ]"; }
.cv-home .t-card__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	border-bottom: 1px solid var(--cvh-border-subtle);
}
.cv-home .t-card__title { font-weight: 600; color: var(--color-emphasized, #101418); }
.cv-home .t-card__description { color: var(--color-subtle, #54595d); font-size: 0.875rem; }
.cv-home .t-card__content {
	padding: 1rem;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.cv-home .t-card__body { color: var(--color-base, #202122); font-size: 0.875rem; line-height: 1.7; }
.cv-home .t-card__body ul { list-style: none; margin: 0; padding: 0; }
.cv-home .t-card__body li { position: relative; padding-left: 1rem; margin: 0; }
.cv-home .t-card__body li + li { margin-top: 2px; }
.cv-home .t-card__body li::before {
	content: "";
	position: absolute;
	left: 0.25rem;
	top: 0.7em;
	width: 4px;
	height: 4px;
	border-radius: 50%;
	background: var(--cvh-accent);
}
.cv-home .t-card__foot {
	margin-top: auto;
	padding-top: 0.5rem;
	border-top: 1px solid var(--cvh-border-subtle);
	display: flex;
	gap: 1rem;
}
.cv-home .t-card__readout { display: flex; flex-direction: column; font-family: var(--font-family-monospace, monospace); }
.cv-home .t-card__readout-label { font-size: 0.75rem; color: var(--color-subtle, #54595d); text-transform: uppercase; letter-spacing: 0.1em; }
.cv-home .t-card__readout-value { font-size: 1.125rem; font-weight: 500; color: var(--color-emphasized, #101418); }

.cv-home .t-card__media-layout { display: flex; flex-grow: 1; min-width: 0; }
.cv-home .t-card__media-layout--split { flex-direction: row; align-items: stretch; }
.cv-home .t-card__media { flex: none; overflow: hidden; background: var(--cvh-surface-2); }
.cv-home .t-card__media-layout--split > .t-card__media { width: 18rem; align-self: stretch; }
.cv-home .t-card__media img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 250ms ease;
}
.cv-home .t-card--link:hover .t-card__media img { transform: scale(1.05); }
.cv-home .t-card__media-body {
	flex-grow: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 1rem;
}
.cv-home .t-card__caption { color: var(--color-subtle, #54595d); font-size: 0.875rem; line-height: 1.6; }
.cv-home .featured-article .t-card__media-layout--split > .t-card__media { width: 22rem; }
.cv-home .featured-image .t-card__media--banner { aspect-ratio: 16 / 9; width: 100%; }
.cv-home .featured-image__media img { display: block; width: 100%; height: auto; border-radius: var(--cvh-radius); }
.cv-home .featured-image__media .t-card__caption { margin-top: 0.5rem; }
.cv-home .featured-good .t-card__body ul { margin-top: 0; }

.cv-home .dyk-list,
.cv-home .news-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.cv-home .dyk-list li {
	position: relative;
	padding-left: 1rem;
	color: var(--color-base, #202122);
	font-size: 0.875rem;
	line-height: 1.7;
}
.cv-home .dyk-list li::before {
	content: "…";
	position: absolute;
	left: 0;
	color: var(--cvh-accent);
	font-weight: 600;
}
.cv-home .news-list li {
	display: grid;
	grid-template-columns: 3rem 1fr;
	gap: 0.5rem;
	padding: 0.25rem 0;
	font-size: 0.875rem;
	border-bottom: 1px solid var(--cvh-border-subtle);
}
.cv-home .news-list li:last-child { border-bottom: 0; }
.cv-home .news-date {
	font-family: var(--font-family-monospace, monospace);
	color: var(--color-subtle, #54595d);
	font-size: 0.75rem;
}
.cv-home .otd-year {
	display: inline-block;
	min-width: 4rem;
	padding-right: 0.5rem;
	font-family: var(--font-family-monospace, monospace);
	font-weight: 600;
	color: var(--cvh-accent);
	text-align: right;
}

.cv-home .trending-tabs {
	display: inline-flex;
	background: var(--cvh-surface-2);
	border-radius: var(--cvh-radius);
	padding: 2px;
}
.cv-home .trending-tab {
	padding: 4px 10px;
	font-size: 0.75rem;
	color: var(--color-subtle, #54595d);
	background: transparent;
	border: 0;
	border-radius: var(--cvh-radius);
	cursor: pointer;
}
.cv-home .trending-tab:hover { color: var(--color-emphasized, #101418); }
.cv-home .trending-tab.is-active {
	background: var(--cvh-card);
	color: var(--color-emphasized, #101418);
	box-shadow: var(--cvh-shadow-sm);
}
.cv-home .trending-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.cv-home .trending-list li {
	display: grid;
	grid-template-columns: 1.75rem 1fr auto;
	gap: 0.5rem;
	align-items: baseline;
	padding: 0.25rem 0;
	font-size: 0.875rem;
	border-bottom: 1px solid var(--cvh-border-subtle);
}
.cv-home .trending-list li:last-child { border-bottom: 0; }
.cv-home .trending-rank {
	font-family: var(--font-family-monospace, monospace);
	font-weight: 600;
	color: var(--color-subtle, #54595d);
	text-align: center;
}
.cv-home .trending-list li:nth-child(1) .trending-rank { color: hsl(0 70% 50%); }
.cv-home .trending-list li:nth-child(2) .trending-rank { color: hsl(40 70% 45%); }
.cv-home .trending-list li:nth-child(3) .trending-rank { color: hsl(220 60% 50%); }
.cv-home .trending-views {
	font-family: var(--font-family-monospace, monospace);
	font-size: 0.75rem;
	color: var(--color-subtle, #54595d);
}

.cv-home .participate-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: 1rem;
}
.cv-home .participate-card {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 1rem;
	background: var(--cvh-card);
	border: 1px solid var(--cvh-border);
	border-radius: var(--cvh-radius-md);
	color: inherit;
	text-decoration: none;
	transition: var(--cvh-t-base);
}
.cv-home .participate-card:hover {
	border-color: var(--cvh-accent);
	transform: translateY(-2px);
	box-shadow: var(--cvh-shadow-md);
	text-decoration: none;
}
.cv-home .participate-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	background: color-mix(in srgb, var(--cvh-accent) 10%, transparent);
	border-radius: var(--cvh-radius);
	color: var(--cvh-accent);
	font-size: 1.25rem;
	margin-bottom: 0.25rem;
}
.cv-home .participate-icon .citizen-ui-icon { width: 1.25rem; height: 1.25rem; }
.cv-home .participate-title { font-weight: 600; color: var(--color-emphasized, #101418); }
.cv-home .participate-desc { font-size: 0.875rem; color: var(--color-subtle, #54595d); }

.cv-home .home-dir {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: 1.5rem 2rem;
}
.cv-home .home-dir__group { min-width: 0; }
.cv-home .home-dir__label {
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--color-subtle, #54595d);
	text-transform: uppercase;
	letter-spacing: 0.08em;
	margin-bottom: 0.5rem;
}
.cv-home .home-dir ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.cv-home .home-dir li a { font-size: 0.875rem; }

.cv-home .reminder-card {
	background: color-mix(in srgb, hsl(40 80% 50%) 8%, var(--cvh-card));
	border-color: color-mix(in srgb, hsl(40 80% 50%) 30%, var(--cvh-border));
}
.cv-home .home-foot__meta { margin-top: 1rem; text-align: center; color: var(--color-subtle, #54595d); font-size: 0.75rem; }

@media (max-width: 900px) {
	.cv-home .home-grid { grid-template-columns: 1fr; }
	.cv-home .home-card--read,
	.cv-home .home-card--aside,
	.cv-home .home-card--tall { grid-column: auto; grid-row: auto; }
	.cv-home .t-card__media-layout--split { flex-direction: column; }
	.cv-home .t-card__media-layout--split > .t-card__media { width: auto; aspect-ratio: 16 / 8; }
	.cv-home .home-hero__title { font-size: 1.75rem; }
}
@media (max-width: 640px) {
	.cv-home .home-hero { padding-block: 1rem; }
	.cv-home .home-hero__title { font-size: 1.5rem; }
	.cv-home .participate-grid { grid-template-columns: repeat(2, 1fr); }
	.cv-home .home-dir { grid-template-columns: repeat(2, 1fr); }
	.cv-home .news-list li { grid-template-columns: 2.5rem 1fr; }
	.cv-home .trending-list li { grid-template-columns: 1.25rem 1fr; }
	.cv-home .trending-views { display: none; }
}
@media print {
	.cv-home .home-hero__tabs { display: none !important; }
	.cv-home .home-band { break-inside: avoid; }
}

.cv-home .news-list--plain li { grid-template-columns: 1fr; }
.cv-home .t-card__foot { flex-wrap: wrap; align-items: center; }
.cv-home .t-card__foot a { font-size: 0.8125rem; }
.cv-home .participate-full .t-card__content > figure { max-width: 4.5rem; }
.cv-home .participate-full .t-card__content > p { font-size: 0.9375rem; }
.cv-home .participate-full .mw-ui-button { align-self: flex-start; margin-top: 0.5rem; }

html body #bodyContent .cv-home p,
html body .mw-parser-output .cv-home p { margin: 0 !important; }
html body #bodyContent .cv-home p.home-hero__lead,
html body .mw-parser-output .cv-home p.home-hero__lead { margin: 0.5rem 0 0 !important; }
html body #bodyContent .cv-home .t-card__body p + p,
html body .mw-parser-output .cv-home .t-card__body p + p { margin-top: 0.5rem !important; }
html body #bodyContent .cv-home h2.home-hero__title,
html body .mw-parser-output .cv-home h2.home-hero__title {
	margin: 0 !important;
	font-size: 2rem !important;
	line-height: 1.05 !important;
	font-weight: 500 !important;
	border: 0 !important;
	color: var(--color-emphasized, #101418) !important;
}
html body #bodyContent .cv-home h2.home-section-heading,
html body .mw-parser-output .cv-home h2.home-section-heading {
	margin: 0 0 0.75rem !important;
	font-size: 1.125rem !important;
	line-height: 1.4 !important;
	border: 0 !important;
	color: var(--color-emphasized, #101418) !important;
}
html body #bodyContent .cv-home h3,
html body .mw-parser-output .cv-home h3 {
	margin: 0 0 0.5rem !important;
	font-size: 1rem !important;
	line-height: 1.4 !important;
}

.cv-home .t-card__foot ul { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; }
.cv-home .t-card__foot .hlist li::after { content: none; }
.cv-home .t-card__foot a { color: var(--cvh-accent); text-decoration: none; }
.cv-home .t-card__foot a:hover { text-decoration: underline; }
.cv-home .t-card__body .mp-2012-block-nav-footer { display: none; }
.cv-home .t-card__body img { border-radius: var(--cvh-radius); }
.cv-home .t-card__body figure { float: none; margin: 0 0 0.5rem; }
.cv-home .t-card__caption b { font-weight: 600; }

`;

	if (document.head) document.head.appendChild(s);
}

function cvRun() {
	'use strict';

	console.log('[citizen-vector] script loaded');

	if (typeof mw === 'undefined' || typeof mw.config === 'undefined') {
		console.log('[citizen-vector] skipped: mw not ready yet');
		return;
	}
	const skin = mw.config.get('skin');
	if (skin !== 'vector-2022') {
		if (!document.querySelector('.vector-header-container, .vector-page-titlebar')) {
			console.log('[citizen-vector] skipped: skin=' + skin + ' and no Vector DOM');
			return;
		}
		console.log('[citizen-vector] skin=' + skin + ' but Vector DOM present, proceed');
	}
	console.log('[citizen-vector] script ready, skin=' + skin);

	var cvSkin = null;
	try { cvSkin = localStorage.getItem('cv-skin'); } catch (e) {}
	if (cvSkin === 'vector-2022') {
		console.log('[citizen-vector] skipped: cv-skin=vector-2022 (native Vector)');
		bootPreferencesInjection();
		return;
	}

function fixVeTargetContainer() {
	var el = document.querySelector('[data-mw-ve-target-container]');
	if (el) el.removeAttribute('data-mw-ve-target-container');
}
fixVeTargetContainer();

	function fixResponsiveViewport() {
		var vp = document.querySelector('meta[name="viewport"]');
		if (!vp) return;
		var target = 'width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.25, maximum-scale=5.0';
		if (vp.getAttribute('content') === target) return;
		vp.setAttribute('content', target);
	}
	fixResponsiveViewport();
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', fixResponsiveViewport);
	}

	function wikiUrl(page, opts) {
		try {
			if (mw.util && typeof mw.util.getUrl === 'function') return mw.util.getUrl(page, opts);
		} catch (e) {  }
		var t = String(page).replace(/ /g, '_');
		var ap = mw.config.get('wgArticlePath') || '/wiki/$1';
		var url = ap.replace('$1', t);
		if (opts) {
			var qs = Object.keys(opts).map(function (k) {
				return encodeURIComponent(k) + '=' + encodeURIComponent(opts[k]);
			}).join('&');
			if (qs) url += (url.indexOf('?') === -1 ? '?' : '&') + qs;
		}
		return url;
	}

	function wikiApi() {
		try {
			if (mw.util && typeof mw.util.wikiScript === 'function') return mw.util.wikiScript('api');
		} catch (e) {  }
		return (mw.config.get('wgScriptPath') || '/w') + '/api.php';
	}

	function escapeId(id) {
		try {
			if (mw.util && typeof mw.util.escapeIdForAttribute === 'function') return mw.util.escapeIdForAttribute(id);
		} catch (e) {  }
		return String(id).replace(/[^a-zA-Z0-9_\u00C0-\uFFFF-]/g, '_');
	}

	function isSpecialPage() {
		try {
			if (mw.config.get('wgCanonicalSpecialPageName')) return true;
			if (mw.config.get('wgNamespaceNumber') === -1) return true;
		} catch (e) {  }
		return false;
	}

	function isShareable() {
		try {
			return mw.config.get('wgNamespaceNumber') >= 0 && mw.config.get('wgArticleId') > 0;
		} catch (e) {  }
		return false;
	}

	function isHomePage() {
		try {
			const pn = mw.config.get('wgPageName') || '';
			return pn === 'Wikipedia:首页' || pn === '首页';
		} catch (e) {  }
		return false;
	}

	function isTalkNamespace() {
		try {
			const ns = mw.config.get('wgNamespaceNumber');
			if (typeof ns === 'number' && ns >= 0 && ns % 2 === 1) return true;
		} catch (e) {  }
		return false;
	}

	function isEditorPage() {
		try {
			const action = mw.config.get('wgAction');
			if (action === 'edit' || action === 'submit') return true;
		} catch (e) {  }
		try {
			const veaction = new URLSearchParams(location.search).get('veaction');
			if (veaction === 'edit' || veaction === 'editsource') return true;
		} catch (e) {  }
		return !!document.querySelector('.ve-ui-toolbar, .oo-ui-toolbar-bar, #wpTextbox1, .ve-ce-documentNode');
	}

	function isDiffPage() {
		try {
			if (mw.config.get('wgDiffOldId') || mw.config.get('wgDiffNewId')) return true;
			const sp = mw.config.get('wgCanonicalSpecialPageName');
			if (sp === 'Diff' || sp === 'MobileDiff' || sp === 'ComparePages') return true;
			if (new URLSearchParams(location.search).has('diff')) return true;
		} catch (e) {  }
		return !!document.querySelector('#mw-content-text table.diff');
	}

	function injectSkinOption() {
		const field = document.querySelector('#mw-htmlform-skin #mw-input-wpskin')
			|| document.querySelector('#mw-htmlform-skin .oo-ui-radioSelectWidget')
			|| document.querySelector('#mw-htmlform-skin .oo-ui-radioSelectInputWidget');
		if (!field) return;

		if (document.querySelector('#mw-htmlform-skin .citizen-vector-skin-option')) return;

		let cur = null;
		try { cur = localStorage.getItem('cv-skin'); } catch (e) {}
		const on = cur !== 'vector-2022';

		const userName = mw.config.get('wgUserName') || '';
		const preview = wikiUrl(mw.config.get('wgPageName') || mw.config.get('wgTitle'), { useskin: 'citizen-vector-2022' });
		const talk = wikiUrl('Skin_talk:Citizen-Vector 2022');
		const css = userName ? wikiUrl('User:' + userName + '/citizen-vector-2022.css') : '#';
		const js = userName ? wikiUrl('User:' + userName + '/citizen-vector-2022.js') : '#';

		const label = document.createElement('label');
		label.className = 'oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget oo-ui-radioOptionWidget citizen-vector-skin-option';
		label.setAttribute('role', 'radio');
		label.setAttribute('tabindex', '-1');

		const radioWrap = document.createElement('span');
		radioWrap.className = 'oo-ui-widget oo-ui-widget-enabled oo-ui-inputWidget oo-ui-radioInputWidget';
		const input = document.createElement('input');
		input.type = 'radio';
		input.className = 'oo-ui-inputWidget-input';
		input.value = 'citizen-vector-2022';
		input.setAttribute('name', 'cv-skin-option');
		input.setAttribute('tabindex', '-1');
		input.setAttribute('role', 'presentation');
		if (on) input.checked = true;
		radioWrap.appendChild(input);
		radioWrap.appendChild(document.createElement('span'));

		const labelEl = document.createElement('span');
		labelEl.className = 'oo-ui-labelElement-label';
		labelEl.innerHTML = '公民（Citizen） （<a href="' + talk + '">讨论</a> | ' +
			'<a href="' + preview + '">预览</a> | <a href="' + css + '">自定义CSS</a> | <a href="' + js + '">自定义JavaScript</a>）';

		label.appendChild(radioWrap);
		label.appendChild(labelEl);
		if (on) {
			label.classList.add('oo-ui-optionWidget-selected');
			label.setAttribute('aria-checked', 'true');
		}

		input.addEventListener('change', function () {
			if (!input.checked) return;
			try { localStorage.setItem('cv-skin', 'citizen-vector'); } catch (e2) {}
			location.reload();
		});

		field.prepend(label);

		if (on) {
			field.querySelectorAll('.oo-ui-optionWidget-selected').forEach(function (el) {
				if (el === label) return;
				el.classList.remove('oo-ui-optionWidget-selected');
				el.removeAttribute('aria-checked');
				const w = el.querySelector('input');
				if (w) w.checked = false;
			});
		}

		if (field.__cvChangeHooked) return;
		field.__cvChangeHooked = true;
		field.addEventListener('change', function (ev) {
			const v = ev.target && ev.target.value;
			if (!v || v === 'citizen-vector-2022') return;
			const own = document.querySelector('#mw-htmlform-skin .citizen-vector-skin-option');
			if (!own) return;
			if (own.classList.contains('oo-ui-optionWidget-selected')) {
				own.classList.remove('oo-ui-optionWidget-selected');
				own.removeAttribute('aria-checked');
				const w = own.querySelector('input');
				if (w) w.checked = false;
			}
			try { localStorage.setItem('cv-skin', 'vector-2022'); } catch (e2) {}
		});
	}

	function cvWatchSkinField() {
		const section = document.getElementById('mw-htmlform-skin');
		if (!section || section.__cvSkinObserver) return;
		let queued = false;
		section.__cvSkinObserver = new MutationObserver(function () {
			if (queued) return;
			queued = true;
			requestAnimationFrame(function () {
				queued = false;
				injectSkinOption();
			});
		});
		section.__cvSkinObserver.observe(section, { childList: true, subtree: true });
	}

	function bootPreferencesInjection() {
		const run = function () { cvWatchSkinField(); injectSkinOption(); };
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', run);
		} else {
			run();
		}
	}

	var _vpGuard = null;
	function armViewportGuard() {
		if (_vpGuard) return;
		var vp = document.querySelector('meta[name="viewport"]');
		if (!vp) return;
		var target = 'width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.25, maximum-scale=5.0';
		_vpGuard = new MutationObserver(function () {
			if (vp.getAttribute('content') !== target) vp.setAttribute('content', target);
		});
		_vpGuard.observe(vp, { attributes: true, attributeFilter: ['content'] });
	}
	armViewportGuard();
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', armViewportGuard);
	}

	if (!document.querySelector('.citizen-page-container')) {
		['.mw-page-container-inner', '.mw-page-container'].forEach(sel => {
			document.body.querySelectorAll(sel).forEach(n => {
				while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
				n.remove();
			});
		});
		document.body.querySelectorAll('.mw-footer-container').forEach(n => {
			while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
			n.remove();
		});

		const wrap = document.createElement('div');
		wrap.className = 'citizen-page-container';
		while (document.body.firstChild) wrap.appendChild(document.body.firstChild);
		document.body.appendChild(wrap);

		const html = document.documentElement;
		['citizen-header-position-left',
		 'citizen-feature-autohide-navigation-clientpref-1',
		 'citizen-feature-image-dimming-clientpref-0',
		 'citizen-animations-ready'
		].forEach(c => html.classList.add(c));
		if (!document.body.classList.contains('citizen-sections-enabled')) document.body.classList.add('citizen-sections-enabled');
		if (!document.body.classList.contains('skin-citizen')) document.body.classList.add('skin-citizen');
	}

	const CITIZEN_HEADER_HTML = [
		'<div class="citizen-header__logo">',
		'  <a href="https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5" class="mw-logo citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--icon-only cdx-button--weight-quiet" title="访问首页">',
		'    <span class="citizen-header-logo-svg cv-icon-fallback cv-icon-fallback-cv-home cv-home-icon" title="主页" aria-hidden="true"></span>',
		'    <svg class="citizen-header-logo-svg citizen-header-logo-char" viewBox="0 0 23 22" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
		'      <path fill="currentColor" d="M2.9 5C3.9 4 5.2 2.8 6.1 1.5C6.6 1.5 6.9 1.3 7 1L3.8 0C3.4 1.6 2.8 3.3 2.3 4.6C1.8 4.3 1.1 4.1 0.3 3.9L0.2 4.1C1.1 4.9 1.9 6.2 2.1 7.4C3.6 8.4 4.9 6.4 2.9 5ZM4.4 21.9C5.4 21.9 6.2 21.4 6.2 21.3V11L7.2 10.7C7.4 11.3 7.5 11.8 7.5 12.4C8.9 13.7 10.5 11.7 8.6 9.8C9.3 9.2 9.9 8.4 10.5 7.7V22H10.9C12 22 12.8 21.4 12.8 21.2V20.1H22.2C22.5 20.1 22.7 20 22.8 19.8C21.3 18.5 20.5 17.9 20.5 17.9L19.2 19.7H17.8V15.1H21.5C21.8 15.1 22 15 22.1 14.8L20 13L18.9 14.7H17.9V10.3H21.6C21.9 10.3 22.1 10.2 22.2 10C20.7 8.8 20 8.2 20 8.2L18.8 9.8H17.8V5.6H21.9C22.2 5.6 22.4 5.5 22.5 5.3C21 4 20.2 3.4 20.2 3.4L18.9 5.2H16.3C17.1 4.2 18.2 2.7 18.8 1.7C19.3 1.7 19.7 1.5 19.8 1.2L16.4 0.5C16.2 1.9 15.9 4 15.5 5.3H13L12.3 5.1C12.9 4.1 13.6 2.8 14.1 1.7C14.7 1.7 14.9 1.5 15 1.2L11.7 0.2C11 3.6 9.7 7.1 8.2 9.4C7.8 8.8 7.2 8.4 6.4 8.1L6.3 8.3C6.6 8.8 6.8 9.5 7.1 10.1C5.9 10.2 4.6 10.2 3.6 10.3C5.4 8.4 7.3 5.9 8.5 4.3C9 4.3 9.3 4.2 9.5 3.9L6.5 2.8C5.6 5 4.2 8 2.8 10.3C1.7 10.3 0.8 10.4 0.2 10.4L1 12.7C1.2 12.7 1.5 12.5 1.6 12.2C2.4 12 3.2 11.8 3.9 11.6V14.2L1.3 13.6C1.1 15.9 0.7 18.2 0 20L0.3 20.2C1.5 18.8 2.5 16.9 3.1 14.8C3.4 14.8 3.7 14.7 3.8 14.5V22L4.4 21.9ZM15.5 9.7H12.8V5.6H15.5V9.7ZM15.5 14.6H12.8V10.2H15.5V14.6ZM6.9 13.4L6.7 13.5C7.2 14.7 7.7 16.4 7.7 17.8C9.3 19.5 11.4 16.1 6.9 13.4ZM15.5 19.6H12.8V15H15.5V19.6Z"/>',
		'    </svg>',
		'  </a>',
		'</div>',

		'<div class="citizen-search citizen-header__item citizen-dropdown">',
		'  <details id="citizen-search-details" class="citizen-dropdown-details">',
		'    <summary id="citizen-search-summary" class="citizen-dropdown-summary citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--icon-only cdx-button--weight-quiet" title="打开/关闭搜索 [/]" aria-details="citizen-search-details">',
		'      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">',
		'        <circle cx="8" cy="8" r="6" fill="none" stroke="currentcolor" stroke-width="2"></circle>',
		'        <line class="citizen-icon-search__handle" x1="12.5" y1="12.5" x2="18" y2="18" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></line>',
		'        <line class="citizen-icon-search__close" x1="3.6" y1="3.6" x2="16.4" y2="16.4" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></line>',
		'        <line class="citizen-icon-search__close" x1="16.4" y1="3.6" x2="3.6" y2="16.4" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></line>',
		'      </svg>',
		'    </summary>',
		'  </details>',
		'</div>',

		'<div class="citizen-drawer citizen-header__item citizen-dropdown">',
		'  <details class="citizen-dropdown-details">',
		'    <summary class="citizen-dropdown-summary citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--icon-only cdx-button--weight-quiet" title="打开/关闭菜单" aria-details="citizen-drawer__card">',
		'      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">',
		'        <rect x="1" y="3" width="18" height="2" fill="currentcolor" rx="1"></rect>',
		'        <rect x="1" y="9" width="18" height="2" fill="currentcolor" rx="1"></rect>',
		'        <rect x="1" y="15" width="18" height="2" fill="currentcolor" rx="1"></rect>',
		'      </svg>',
		'    </summary>',
		'  </details>',
		'  <div id="citizen-drawer__card" class="citizen-drawer__card citizen-menu__card">',
		'    <div class="citizen-menu__card-content">',
		'      <div class="citizen-drawer__header">',
		'        <a href="/wiki/Main_Page" class="mw-logo citizen-drawer__logo" title="访问首页">',
		'          <img class="mw-logo-icon" src="https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg" alt="" aria-hidden="true" height="80" width="80" loading="lazy">',
		'        </a>',
		'        <div class="citizen-drawer__siteinfo">',
		'          <div class="citizen-siteStats">',
		'            <div class="citizen-siteStats__item" id="citizen-siteStats__item--articles" title="条目"><span class="citizen-ui-icon mw-ui-icon-article mw-ui-icon-wikimedia-article"></span><span id="citizen-siteStats__count-articles"></span></div>',
		'            <div class="citizen-siteStats__item" id="citizen-siteStats__item--images" title="文件"><span class="citizen-ui-icon mw-ui-icon-image mw-ui-icon-wikimedia-image"></span><span id="citizen-siteStats__count-images"></span></div>',
		'            <div class="citizen-siteStats__item" id="citizen-siteStats__item--users" title="用户"><span class="citizen-ui-icon mw-ui-icon-userAvatar mw-ui-icon-wikimedia-userAvatar"></span><span id="citizen-siteStats__count-users"></span></div>',
		'            <div class="citizen-siteStats__item" id="citizen-siteStats__item--edits" title="编辑"><span class="citizen-ui-icon mw-ui-icon-edit mw-ui-icon-wikimedia-edit"></span><span id="citizen-siteStats__count-edits"></span></div>',
		'          </div>',
		'          <div class="mw-logo-wordmark cv-wordmark" id="cv-site-wordmark"></div>',
		'        </div>',
		'      </div>',
		'      <section id="citizen-main-menu" class="citizen-main-menu citizen-drawer__menu">',
		'        <!-- 三列菜单（导航 / 协作 / 说明）由运行时用 data.drawerMenu 生成 -->',
		'      </section>',
		'    </div>',
		'  </div>',
		'</div>',

		'<div class="citizen-header__inner">',
		'  <div class="citizen-header__start"></div>',
		'  <div class="citizen-header__end">',

		'    <div class="citizen-notifications-dropdown citizen-header__item citizen-dropdown">',
		'      <details id="citizen-notifications-details" class="citizen-dropdown-details">',
		'        <summary class="citizen-dropdown-summary citizen-notifications-button citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" title="通知" data-counter-text="0" aria-details="citizen-notifications-dropdown__card">',
		'          <span class="citizen-ui-icon mw-ui-icon-wikimedia-bell"></span>',
		'          <span>通知</span>',
		'        </summary>',
		'      </details>',
		'      <div id="citizen-notifications-dropdown__card" class="citizen-menu__card">',
		'        <div class="citizen-menu__card-content">',
		'          <div id="citizen-notifications-content" class="citizen-notifications">',
		'            <div class="citizen-notifications__skeleton" role="status" aria-busy="true" aria-live="polite">',
		'              <div class="citizen-notifications__skeleton-item"><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--title"></span><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--meta"></span></div>',
		'              <div class="citizen-notifications__skeleton-item"><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--title"></span><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--meta"></span></div>',
		'              <div class="citizen-notifications__skeleton-item"><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--title"></span><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--meta"></span></div>',
		'              <div class="citizen-notifications__skeleton-item"><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--title"></span><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--meta"></span></div>',
		'              <div class="citizen-notifications__skeleton-item"><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--title"></span><span class="citizen-notifications__skeleton-line citizen-notifications__skeleton-line--meta"></span></div>',
		'            </div>',
		'            <div class="citizen-notifications__error" role="alert" hidden>',
		'              <p>无法加载通知。请检查您的网络连接并重试。</p>',
		'              <button class="cdx-button citizen-notifications__retry" type="button">重试</button>',
		'            </div>',
		'            <a class="citizen-notifications__see-all" href="https://zh.wikipedia.org/wiki/Special:Notifications">查看全部</a>',
		'          </div>',
		'        </div>',
		'      </div>',
		'    </div>',

		'    <div class="citizen-preferences-dropdown citizen-header__item citizen-dropdown">',
		'      <details id="citizen-preferences-details" class="citizen-dropdown-details">',
		'        <summary class="citizen-dropdown-summary citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--icon-only cdx-button--weight-quiet" title="打开/关闭外观设置菜单" aria-details="citizen-preferences-dropdown__card">',
		'          <span class="citizen-ui-icon mw-ui-icon-wikimedia-configure"></span>',
		'        </summary>',
		'      </details>',
		'      <div id="citizen-preferences-dropdown__card" class="citizen-menu__card">',
		'        <div class="citizen-menu__card-content">',
		'          <div id="citizen-preferences-content" class="citizen-preferences">',
		'            <div class="citizen-preferences-skeleton" role="status" aria-busy="true" aria-live="polite">',
		'              <div class="citizen-preferences-skeleton__heading"></div>',
		'              <div class="citizen-preferences-skeleton__row"><div class="citizen-preferences-skeleton__label"></div><div class="citizen-preferences-skeleton__description"></div></div>',
		'              <div class="citizen-preferences-skeleton__row"><div class="citizen-preferences-skeleton__label"></div><div class="citizen-preferences-skeleton__description"></div></div>',
		'              <div class="citizen-preferences-skeleton__row"><div class="citizen-preferences-skeleton__label"></div><div class="citizen-preferences-skeleton__description"></div></div>',
		'              <div class="citizen-preferences-skeleton__heading"></div>',
		'              <div class="citizen-preferences-skeleton__row"><div class="citizen-preferences-skeleton__label"></div><div class="citizen-preferences-skeleton__description"></div></div>',
		'              <div class="citizen-preferences-skeleton__row"><div class="citizen-preferences-skeleton__label"></div><div class="citizen-preferences-skeleton__description"></div></div>',
		'            </div>',
		'            <div class="citizen-preferences-error" role="alert" hidden>',
		'              <p class="citizen-preferences-error__message">无法加载偏好设置。请检查您的网络连接并重试。</p>',
		'              <button class="cdx-button citizen-preferences-error__retry" type="button">重试</button>',
		'            </div>',
		'          </div>',
		'        </div>',
		'      </div>',
		'    </div>',

		'    <div class="citizen-userMenu citizen-header__item citizen-dropdown">',
		'      <details class="citizen-dropdown-details">',
		'        <summary class="citizen-dropdown-summary citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--icon-only cdx-button--weight-quiet" title="打开/关闭个人菜单" aria-details="citizen-userMenu__card">',
		'          <span class="citizen-ui-icon mw-ui-icon-wikimedia-userAvatar"></span>',
		'        </summary>',
		'      </details>',
		'      <div id="citizen-userMenu__card" class="citizen-menu__card">',
		'        <div class="citizen-menu__card-content">',
		'          <div class="citizen-userInfo">',
		'            <div class="citizen-userInfo-title"><nav id="citizen-user-menu-userpage" class="citizen-menu"><div class="citizen-menu__content"><ul class="citizen-menu__content-list" id="cv-userpage-list"></ul></div></nav></div>',
		'            <div class="citizen-userInfo-text"><ul class="citizen-userInfo-usergroups" id="cv-usergroups"></ul></div>',
		'            <div class="citizen-userInfo-stats">',
		'              <div class="citizen-userInfo-stats-item"><div class="citizen-userInfo-stats-item-label">编辑数</div><div class="citizen-userInfo-stats-item-value" id="cv-user-editcount">0</div></div>',
		'              <div class="citizen-userInfo-stats-item"><div class="citizen-userInfo-stats-item-label">加入时间</div><div class="citizen-userInfo-stats-item-value" id="cv-user-regdate"></div></div>',
		'            </div>',
		'          </div>',
		'          <nav id="p-user-interface-preferences" class="citizen-menu mw-portlet mw-portlet-user-interface-preferences emptyPortlet" aria-label="user-interface-preferences"><div class="citizen-menu__heading">user-interface-preferences</div><div class="citizen-menu__content"><ul class="citizen-menu__content-list"></ul></div></nav>',
		'          <nav id="p-personal" class="citizen-menu mw-portlet mw-portlet-personal" aria-label="个人工具" title="用户菜单">',
		'            <div class="citizen-menu__heading">个人工具</div>',
		'            <div class="citizen-menu__content"><ul class="citizen-menu__content-list" id="cv-personal-list"></ul></div>',
		'          </nav>',
		'        </div>',
		'      </div>',
		'    </div>',

		'  </div>',
		'</div>',
	].join('\n');

	function init() {
		const gateHeader = document.querySelector('.vector-header-container');
		if (!gateHeader) return false;
		const data = extractVectorData();

		if (!isSpecialPage()) {
			const variantsContainer = document.querySelector('#p-variants');
			if (variantsContainer && !data.variants) {
				diag('variants-pending');
				return false;
			}
		}

		const VECTOR_TO_REMOVE = [
			'.vector-sticky-header',
			'.vector-sticky-header-container',
			'.vector-main-menu-landmark',
			'.vector-appearance-landmark',
			'.vector-page-tools-landmark',
			'.vector-toc-landmark',
			'.vector-user-links',
			'#mw-panel',
			'#mw-panel-toc',
			'.vector-page-titlebar',
			'.vector-page-title',

			'.vector-page-toolbar',
			'.vector-page-toolbar-container',
			'.vector-page-tools-dropdown',
			'.vector-main-menu-dropdown',
			'.vector-user-menu',
			'.vector-menu-tabs',
			'.vector-sitenotice-container',
			'.vector-pinnable-element',
			'.vector-pinnable-header',
			'.vector-column-start',
			'.vector-column-end',
			'.vector-page-titlebar-toc',
			'.vector-collapsible',
			'.vector-button-flush-left',
			'.vector-button-flush-right',
			'.mw-portlet-views',
			'.mw-portlet-associated-pages',
			'.mw-portlet-variants',
			'#p-lang-btn',
			'#p-lang',
			'.mw-portlet-lang',
			'.mw-portlet-lang-label',
			'.mw-portlet-lang-heading',
		];
		VECTOR_TO_REMOVE.forEach(sel => {
			if (data.toc && (sel === '.vector-column-start' || sel === '.vector-toc-landmark' ||
				sel === '#mw-panel-toc' || sel === '.vector-pinnable-element' || sel === '.vector-pinnable-header' ||
				sel === '.vector-page-titlebar' || sel === '.vector-page-titlebar-toc' || sel === '.vector-button-flush-left')) return;
			document.querySelectorAll(sel).forEach(el => el.remove());
		});

		const oldHeader = document.querySelector('.vector-header-container');
		if (!oldHeader) return false;

		const newHeader = document.createElement('header');
		newHeader.className = 'mw-header citizen-header';
		newHeader.innerHTML = CITIZEN_HEADER_HTML;
		const menuNav = newHeader.querySelector('#citizen-main-menu');
		if (menuNav && data.drawerMenu) {
			menuNav.innerHTML = '';
			const escAttr = v => String(v == null ? '' : v)
				.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
			data.drawerMenu.forEach(col => {
				const lis = col.items.map(it =>
					`<li id="${escAttr(it.id)}" class="mw-list-item"><a href="${escAttr(it.href)}"${it.title ? ` title="${escAttr(it.title)}"` : ''}${it.accesskey ? ` accesskey="${escAttr(it.accesskey)}"` : ''}><span>${escAttr(it.label)}</span></a></li>`
				).join('');
				menuNav.appendChild(makePortlet(col.id, col.heading, col.heading, lis, false, false));
			});
		}
		oldHeader.replaceWith(newHeader);

		fillUserMenu(data.personal);

		setupPreferencesPanel();

		setupNotificationsDropdown(data.notifications, data.notificationsCount);

		fetchSiteStats();

		setupDropdownDismiss();

		setupCommandPalette();

		buildPageHeader(data);
		try { initMainPageHomepage(); } catch (e) { console.error('[citizen-vector] homepage error:', e); }
		buildStickyHeader(data);
		buildPageSidebar(data);
		buildFooter(data);
		setupFooterFloatFade();
		setupTocCollapse();

		cleanupVectorScaffolding();

		renderRelativeTimes();

		setupSectionHeadings();

		wrapWikitablesInOverflow();

		window.__cvInited = true;
		return true;
	}

	function extractVectorData() {
		const data = {
			firstHeading: '',
			siteSub: '',
			views: '',
			associatedPages: '',
			tb: '',
			cactions: '',
			variants: '',
			toc: '',
			lastmod: '',
			footerPlaces: '',
			footerIcons: '',
			footerTagline: '',
			footerDesc: '',
			notifications: false,
			notificationsCount: 0,
			drawerMenu: null,
		};

		const titlebar = document.querySelector('header.vector-page-titlebar, .mw-body-header');
		if (titlebar) {
			const fh = titlebar.querySelector('#firstHeading');
			if (fh) data.firstHeading = fh.outerHTML;
		}
		const ss = document.querySelector('#siteSub');
		if (ss) {
			ss.remove();
			data.siteSub = '';
		}

		const grabList = (sel) => {
			const ul = document.querySelector(sel);
			if (!ul) return '';
			return ul.innerHTML;
		};
		const viewsRaw = grabList('#p-views ul') || grabList('#p-views .vector-menu-content-list');
		data.watch = (viewsRaw.match(/<li[^>]*id="ca-watch"[^>]*>[\s\S]*?<\/li>/i) ||
			viewsRaw.match(/<li[^>]*id="ca-unwatch"[^>]*>[\s\S]*?<\/li>/i)) || [''];
		data.watch = data.watch[0] || '';
		data.views = viewsRaw.replace(/<li[^>]*id="(?:ca-watch|ca-unwatch)"[^>]*>[\s\S]*?<\/li>/gi, '')
			.replace(/<li[^>]*id="(?:ca-bookmark|ca-save)"[^>]*>[\s\S]*?<\/li>/gi, '')
			.replace(/<li[^>]*class="[^"]*reading-lists-bookmark[^"]*"[^>]*>[\s\S]*?<\/li>/gi, '');

		const navItem = (id, label, title, fallbackHref) => {
			const a = document.querySelector('#' + id + ' a');
			return {
				id: id,
				label: label,
				title: (a && a.getAttribute('title')) || title,
				href: (a && a.getAttribute('href')) || fallbackHref,
				accesskey: (a && a.getAttribute('accesskey')) || '',
			};
		};
		data.drawerMenu = [
			{ id: 'p-navigation', heading: '导航', items: [
				navItem('n-mainpage-description', '首页', '访问首页', '/wiki/Wikipedia:%E9%A6%96%E9%A1%B5'),
				navItem('n-indexpage', '分类索引', '浏览分类索引', '/wiki/Wikipedia:%E5%88%86%E7%B1%BB%E7%B4%A2%E5%BC%95'),
				navItem('n-randompage', '随机条目', '随机进入一个条目', '/wiki/Special:Random'),
			] },
			{ id: 'p-collaboration', heading: '协作', items: [
				navItem('n-Featured_content', '特色内容', '特色内容', '/wiki/Portal:%E7%89%B9%E8%89%B2%E5%85%A7%E5%AE%B9'),
				navItem('n-currentevents', '新闻动态', '新闻动态', '/wiki/Portal:%E6%96%B0%E8%81%9E%E5%8B%95%E6%85%8B'),
				navItem('n-villagepump', '互助客栈', '参与维基百科社群的讨论', '/wiki/Wikipedia:%E4%BA%92%E5%8A%A9%E5%AE%A2%E6%A0%88'),
			] },
			{ id: 'p-drawer-about', heading: '说明', items: [
				navItem('n-about', '关于', '关于维基百科', '/wiki/Wikipedia:%E5%85%B3%E4%BA%8E'),
				navItem('n-contact', '联络我们', '联络我们', '/wiki/Wikipedia:%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC'),
				navItem('n-sitesupport', '资助', '资助维基百科',
					'https://donate.wikimedia.org/?wmf_source=donate&wmf_medium=sidebar&wmf_campaign=zh.wikipedia.org&uselang=zh'),
			] },
		];
		data.associatedPages = grabList('#p-associated-pages ul') || grabList('#p-associated-pages .vector-menu-content-list');
		data.tb = (grabList('#p-tb ul') || grabList('#p-tb .vector-menu-content-list'))
			.replace(/<li[^>]*id="t-specialpages"[^>]*>[\s\S]*?<\/li>/gi, '')
			.replace(/<li[^>]*id="t-cite"[^>]*>[\s\S]*?<\/li>/gi, '');
		data.cactions = (grabList('#p-cactions ul') || grabList('#p-cactions .vector-menu-content-list'))

			.replace(/<li[^>]*id="(?:ca-more-[^"]*|ca-[a-z0-9]+(?:-[a-z0-9]+)*-more)"[^>]*>[\s\S]*?<\/li>/gi, '') + data.watch;
		data.languages = grabList('#p-lang ul') || grabList('#p-lang .vector-menu-content-list') ||
			grabList('#p-lang-btn ul') || grabList('#p-lang-btn .vector-menu-content-list');
		data.variants = grabList('#p-variants ul') || grabList('#p-variants .vector-menu-content-list');

		const splitLis = (html, keepFn) => {
			if (!html || !html.trim()) return { kept: '', demoted: '' };
			const t = document.createElement('template');
			t.innerHTML = html;
			const kept = [], demoted = [];
			Array.from(t.content.children).forEach(li => {
				if (li.tagName !== 'LI') { kept.push(li.outerHTML); return; }
				const id = li.id || (li.firstElementChild && li.firstElementChild.id) || '';
				(keepFn(id, li) ? kept : demoted).push(li.outerHTML);
			});
			return { kept: kept.join(''), demoted: demoted.join('') };
		};
		const VIEW_KEEP = ['ca-view', 'ca-edit', 'ca-ve-edit', 'ca-viewsource', 'ca-history', 'ca-addsection'];
		const ASSOC_KEEP = /^(?:ca-nstab-|ca-user$|ca-talk$)/;
		const _v = splitLis(data.views, id => VIEW_KEEP.indexOf(id) !== -1);
		const _a = splitLis(data.associatedPages, id => ASSOC_KEEP.test(id));
		data.views = _v.kept;
		data.associatedPages = _a.kept;
		data.cactions = (data.cactions || '') + _v.demoted + _a.demoted;

		const _nsNumEarly = mw.config.get('wgNamespaceNumber');
		if (typeof _nsNumEarly === 'number' && _nsNumEarly >= 1 && _nsNumEarly % 2 === 1) {
			data.associatedPages = data.associatedPages
				.replace(/<li[^>]*id="ca-nstab-[^"]*"[^>]*>[\s\S]*?<\/li>/gi, '').trim();
		}

		if (isSpecialPage()) {
			data.watch = '';
			data.views = '';
			data.associatedPages = '';
			data.variants = '';

			data.languages = '';
		}

		const tocNode = document.querySelector('#mw-panel-toc') || document.querySelector('#toc');
		if (tocNode) data.toc = tocNode.outerHTML;
		const _nsNum = mw.config.get('wgNamespaceNumber');
		const NS_TOC_ALLOWED = [0, 4, 118];
		const _isTalkNs = typeof _nsNum === 'number' && _nsNum >= 1 && _nsNum % 2 === 1;
		if (NS_TOC_ALLOWED.indexOf(_nsNum) === -1 && !_isTalkNs) data.toc = '';

		if (isDiffPage()) data.toc = '';

		const lastmodNode = document.querySelector('#footer-info-lastmod, .last-modified-bar, #lastmod');
		if (lastmodNode) data.lastmod = lastmodNode.outerHTML;
		const footerInfoNode = document.querySelector('#footer-info');
		if (footerInfoNode) data.footerInfo = footerInfoNode.innerHTML;

		const fp = document.querySelector('#footer-places');
		if (fp) data.footerPlaces = fp.innerHTML;
		const fi = document.querySelector('#footer-icons');
		if (fi) data.footerIcons = fi.innerHTML;
		const ft = document.querySelector('#footer-tagline');
		if (ft) data.footerTagline = ft.textContent.replace(/\s+/g, ' ').trim();
		const fd = document.querySelector('#footer-desc');
		if (fd) data.footerDesc = fd.textContent.replace(/\s+/g, ' ').trim();

		let personalList = document.querySelector('.vector-user-links-legacy > ul');
		if (!personalList) {
			const mytalk = document.getElementById('pt-mytalk');
			if (mytalk) personalList = mytalk.closest('ul');
		}
		if (!personalList) {
			const ptParent = document.querySelector('[id^="pt-"]');
			if (ptParent) personalList = ptParent.parentElement;
		}
		if (personalList) data.personal = personalList.outerHTML;

		data.notifications = true;
		const vectorCounter = document.querySelector('.vector-menu-tabs-added [data-counter-num]');
		if (vectorCounter) data.notificationsCount = parseInt(vectorCounter.getAttribute('data-counter-num') || '0', 10);

		return data;
	}

	const CITIZEN_ACTION_ICONS = {
		'ca-view': 'mw-ui-icon-eye mw-ui-icon-wikimedia-eye',
		'ca-edit': 'mw-ui-icon-edit mw-ui-icon-wikimedia-edit',
		'ca-ve-edit': 'mw-ui-icon-edit mw-ui-icon-wikimedia-edit',
		'ca-history': 'mw-ui-icon-history mw-ui-icon-wikimedia-history',
		'ca-addsection': 'mw-ui-icon-add mw-ui-icon-wikimedia-add',
		'ca-viewsource': 'mw-ui-icon-editLock mw-ui-icon-wikimedia-editLock',
		'ca-talk': 'mw-ui-icon-speechBubbles mw-ui-icon-wikimedia-speechBubbles',
		'ca-nstab-main': 'mw-ui-icon-article mw-ui-icon-wikimedia-article',
		'ca-nstab-project': 'mw-ui-icon-article mw-ui-icon-wikimedia-article',
		'ca-nstab-template': 'mw-ui-icon-article mw-ui-icon-wikimedia-article',
		'ca-nstab-category': 'mw-ui-icon-article mw-ui-icon-wikimedia-article',
		'ca-nstab-user': 'mw-ui-icon-userAvatar mw-ui-icon-wikimedia-userAvatar',
		'ca-nstab-image': 'mw-ui-icon-image mw-ui-icon-wikimedia-image',
		'ca-nstab-file': 'mw-ui-icon-image mw-ui-icon-wikimedia-image',
		'ca-nstab-help': 'mw-ui-icon-help mw-ui-icon-wikimedia-help',
		'ca-nstab-portal': 'mw-ui-icon-article mw-ui-icon-wikimedia-article',
		'ca-watch': 'mw-ui-icon-star mw-ui-icon-wikimedia-star',
		'ca-unwatch': 'mw-ui-icon-unStar mw-ui-icon-wikimedia-unStar',
		'ca-delete': 'mw-ui-icon-trash mw-ui-icon-wikimedia-trash',
		'ca-move': 'mw-ui-icon-move mw-ui-icon-wikimedia-move',
		'ca-protect': 'mw-ui-icon-lock mw-ui-icon-wikimedia-lock',
		'ca-wikilove': 'mw-ui-icon-heart mw-ui-icon-wikimedia-heart',
		'ca-checkuser-userinfocard': 'mw-ui-icon-userAvatar mw-ui-icon-wikimedia-userAvatar',
		'ca-homepage': 'mw-ui-icon-home mw-ui-icon-wikimedia-home',
		't-whatlinkshere': 'mw-ui-icon-articleRedirect mw-ui-icon-wikimedia-articleRedirect',
		't-recentchangeslinked': 'mw-ui-icon-recentChanges mw-ui-icon-wikimedia-recentChanges',
		't-specialpages': 'mw-ui-icon-specialPages mw-ui-icon-wikimedia-specialPages',
		't-print': 'mw-ui-icon-printer mw-ui-icon-wikimedia-printer',
		't-permalink': 'mw-ui-icon-link mw-ui-icon-wikimedia-link',
		't-info': 'mw-ui-icon-infoFilled mw-ui-icon-wikimedia-infoFilled',
		't-cite': 'mw-ui-icon-reference mw-ui-icon-wikimedia-reference',
		't-upload': 'mw-ui-icon-upload mw-ui-icon-wikimedia-upload',
		't-urlshortener': 'mw-ui-icon-qrCode mw-ui-icon-wikimedia-qrCode',
		'wbc-editpage': 'mw-ui-icon-linkExternal mw-ui-icon-wikimedia-linkExternal',
		'ca-view-more': 'mw-ui-icon-eye mw-ui-icon-wikimedia-eye',
		'ca-viewsource-more': 'mw-ui-icon-editLock mw-ui-icon-wikimedia-editLock',
		'ca-history-more': 'mw-ui-icon-history mw-ui-icon-wikimedia-history',

		'n-mainpage-description': 'mw-ui-icon-home mw-ui-icon-wikimedia-home',
		'n-indexpage': 'mw-ui-icon-listBullet mw-ui-icon-wikimedia-listBullet',
		'n-randompage': 'mw-ui-icon-die mw-ui-icon-wikimedia-die',
		'n-Featured_content': 'mw-ui-icon-specialPages mw-ui-icon-wikimedia-specialPages',
		'n-currentevents': 'mw-ui-icon-recentChanges mw-ui-icon-wikimedia-recentChanges',
		'n-villagepump': 'mw-ui-icon-userTalk mw-ui-icon-wikimedia-userTalk',
		'n-about': 'mw-ui-icon-infoFilled mw-ui-icon-wikimedia-infoFilled',
		'n-contact': 'mw-ui-icon-message mw-ui-icon-wikimedia-message',
		'n-sitesupport': 'mw-ui-icon-star mw-ui-icon-wikimedia-star',
	};
	function makeLinkPortlet(id, heading, ariaLabel, rawHtml) {
		const nav = document.createElement('nav');
		nav.id = id;
		nav.className = 'citizen-menu mw-portlet mw-portlet-' + id.replace(/^p-/, '');
		nav.setAttribute('aria-label', ariaLabel);
		nav.innerHTML = `<div class="citizen-menu__heading">${heading}</div><div class="citizen-menu__content"><ul class="citizen-menu__content-list"></ul></div>`;
		const ul = nav.querySelector('.citizen-menu__content-list');

		const t = document.createElement('template');
		t.innerHTML = rawHtml;
		const seen = new Set();
		t.content.querySelectorAll('li a').forEach(a => {
			const href = a.getAttribute('href') || '';
			const text = (a.textContent || '').trim();
			if (!href || !text) return;
			const key = href || text;
			if (seen.has(key)) return;
			seen.add(key);
			const li = document.createElement('li');
			li.className = 'mw-list-item';
			const na = document.createElement('a');
			na.href = href;
			const span = document.createElement('span');
			span.textContent = text;
			na.appendChild(span);
			li.appendChild(na);
			ul.appendChild(li);
		});
		return nav;
	}

	function parseLangItems(rawHtml) {
		const out = [];
		if (!rawHtml || !rawHtml.trim()) return out;
		const t = document.createElement('template');
		t.innerHTML = rawHtml;
		const seen = new Set();
		t.content.querySelectorAll('li a').forEach(a => {
			const href = a.getAttribute('href') || '';
			const text = (a.textContent || '').trim();
			if (!href || !text) return;
			if (seen.has(href)) return;
			seen.add(href);
			const code = (a.getAttribute('hreflang') || a.getAttribute('lang') || '').toLowerCase();
			out.push({ href, code, text });
		});
		return out;
	}

	function buildStaticLangMenu(actions, rawHtml) {
		const items = parseLangItems(rawHtml).map(i => ({ href: i.href, code: i.code, name: i.text }));
		const langs = items;
		actions.insertAdjacentHTML('beforeend', `
			<div id="citizen-page-languages-dropdown" class="citizen-page-languages citizen-page-actions__item citizen-dropdown">
				<details class="citizen-dropdown-details">
					<summary class="citizen-dropdown-summary citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" title="更多语言" aria-details="citizen-languages__card" data-counter-text="${langs.length}">
						<span class="citizen-ui-icon mw-ui-icon-wikimedia-language"></span><span>更多语言</span>
					</summary>
				</details>
				<div id="citizen-languages__card" class="citizen-menu__card"><div class="citizen-menu__card-content"></div></div>
			</div>`);
		const card = actions.querySelector('#citizen-languages__card .citizen-menu__card-content');
		if (!card) return;
		const nav = document.createElement('nav');
		nav.id = 'p-langs';
		nav.className = 'citizen-menu mw-portlet mw-portlet-langs';
		nav.setAttribute('aria-label', '其他语言');
		nav.innerHTML = `<div class="citizen-menu__heading">其他语言</div><div class="citizen-menu__content"><ul class="citizen-menu__content-list"></ul></div>`;
		const ul = nav.querySelector('.citizen-menu__content-list');
		langs.forEach(l => {
			const li = document.createElement('li');
			li.className = 'mw-list-item';
			const a = document.createElement('a');
			if (l.href && l.href !== '#') {
				a.href = l.href;
			} else {
				a.href = '#';
				a.addEventListener('click', e => e.preventDefault());
			}
			if (l.code) { a.className = 'lang-' + l.code; a.setAttribute('data-lang', l.code); }
			const span = document.createElement('span');
			span.textContent = l.name;
			a.appendChild(span);
			li.appendChild(a);
			ul.appendChild(li);
		});
		card.appendChild(nav);
	}

	function makePortlet(id, heading, ariaLabel, rawLis, isButton, mergeVE, defaultIcon) {
		rawLis = rawLis.replace(/<li[^>]*id="(?:ca-bookmark|ca-save)"[^>]*>[\s\S]*?<\/li>/gi, '')
			.replace(/<li[^>]*class="[^"]*reading-lists-bookmark[^"]*"[^>]*>[\s\S]*?<\/li>/gi, '');
		const nav = document.createElement('nav');
		nav.id = id;
		nav.className = 'citizen-menu mw-portlet mw-portlet-' + id.replace(/^p-/, '');
		nav.setAttribute('aria-label', ariaLabel);
		nav.innerHTML = `<div class="citizen-menu__heading">${heading}</div><div class="citizen-menu__content"><ul class="citizen-menu__content-list"></ul></div>`;
		const ul = nav.querySelector('.citizen-menu__content-list');

		const t = document.createElement('template');
		t.innerHTML = rawLis;
		const lis = Array.from(t.content.querySelectorAll('li'));
		const hasEdit = lis.some(li => li.id === 'ca-edit');

		lis.forEach(li => {
			const idAttr = li.id || '';
			const a = li.querySelector('a');
			const href = a ? (a.getAttribute('href') || '') : '';
			const rawLabel = a ? (a.textContent || '').trim() : '';
			const isNew = li.classList.contains('new');
			const isSelected = li.classList.contains('selected');
			const aTitle = a ? (a.getAttribute('title') || '') : '';
			const aAccessKey = a ? (a.getAttribute('accesskey') || '') : '';

			if (mergeVE && idAttr === 'ca-ve-edit' && hasEdit) return;
			if (!a || !href) return;

			const isEdit = idAttr === 'ca-edit' || idAttr === 'ca-ve-edit';
			const displayLabel = isEdit ? '编辑' : rawLabel;

			const newLi = document.createElement('li');
			newLi.className = 'mw-list-item';

			if (/^ca-/.test(idAttr)) newLi.setAttribute('id', idAttr);
			if (isSelected) newLi.classList.add('selected');

			const newA = document.createElement('a');
			newA.href = href;
			if (aTitle) newA.setAttribute('title', aTitle);

			if (aAccessKey) newA.setAttribute('accesskey', aAccessKey);
			if (isNew) newA.classList.add('new');

			let iconCls = CITIZEN_ACTION_ICONS[idAttr];
			if (!iconCls && defaultIcon) iconCls = 'mw-ui-icon-' + defaultIcon + ' mw-ui-icon-wikimedia-' + defaultIcon;
			if (!iconCls && isButton) iconCls = 'mw-ui-icon-article mw-ui-icon-wikimedia-article';
			if (iconCls) newA.insertAdjacentHTML('afterbegin', `<span class="citizen-ui-icon ${iconCls}"></span>`);

			const textSpan = document.createElement('span');
			textSpan.textContent = displayLabel;
			newA.appendChild(textSpan);

			if (isButton) {
				newA.classList.add('citizen-cdx-button--size-large', 'cdx-button', 'cdx-button--fake-button', 'cdx-button--fake-button--enabled');
				newA.classList.add(isEdit ? 'cdx-button--weight-primary' : 'cdx-button--weight-quiet');
				if (isEdit) newA.classList.add('cdx-button--action-progressive');
			}

			newLi.appendChild(newA);
			ul.appendChild(newLi);
		});
		return nav;
	}
	function emptyPortlet(id, heading, ariaLabel, title) {
		const nav = document.createElement('nav');
		nav.id = id;
		nav.className = 'citizen-menu mw-portlet mw-portlet-' + id.replace(/^p-/, '') + ' emptyPortlet';
		nav.setAttribute('aria-label', ariaLabel);
		if (title) nav.setAttribute('title', title);
		nav.innerHTML = `<div class="citizen-menu__heading">${heading}</div><div class="citizen-menu__content"><ul class="citizen-menu__content-list"></ul></div>`;
		return nav;
	}
	function buildMoreCardContent(data) {
		const frag = document.createDocumentFragment();
		const hasCactions = !!(data.cactions && data.cactions.trim());
		const hasTb = !!(data.tb && data.tb.trim());
		frag.appendChild(hasCactions
			? makePortlet('p-cactions', '更多', '更多', data.cactions, false, false)
			: emptyPortlet('p-cactions', '更多', '更多', '更多选项'));
		frag.appendChild(hasTb
			? makePortlet('p-tb', '工具', '工具', data.tb, false, false)
			: emptyPortlet('p-tb', '工具', '工具', '工具'));
		return frag;
	}

	function buildPageHeader(data) {
		if (!data.firstHeading) return;

		const wrapper = document.createElement('header');
		wrapper.className = 'mw-body-header citizen-page-header';
		wrapper.id = 'citizen-page-header';
		wrapper.innerHTML = `
			<div class="citizen-page-header-inner">
				<div class="citizen-page-heading">
					<div class="firstHeading-container">
						${data.firstHeading}
						<div class="mw-indicators"></div>
					</div>
					${data.siteSub || ''}
				</div>
				<div class="citizen-page-actions"></div>
			</div>
		`;
		const actions = wrapper.querySelector('.citizen-page-actions');

		if (isShareable()) {
			actions.insertAdjacentHTML('beforeend', `
				<div class="citizen-share-trigger citizen-header__item">
					<button type="button" id="citizen-share" class="citizen-share citizen-cdx-button--size-large cdx-button cdx-button--weight-quiet cdx-button--icon-only" title="分享此页面" aria-label="分享此页面" aria-haspopup="dialog">
						<span class="citizen-ui-icon mw-ui-icon-wikimedia-share"></span><span>分享此页面</span>
					</button>
				</div>`);
		}

		if (!isSpecialPage()) buildStaticLangMenu(actions, data.languages);
		const variantNeeded = !!(data.variants && data.variants.trim());
		if (variantNeeded) {
			actions.insertAdjacentHTML('beforeend', `
				<div id="citizen-page-variants" class="citizen-page-variants citizen-page-actions__item citizen-dropdown">
					<details class="citizen-dropdown-details">
						<summary class="citizen-dropdown-summary citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" title="语言变体" aria-details="citizen-variants__card" data-counter-text="0">
							<span class="citizen-ui-icon mw-ui-icon-wikimedia-conversion"></span><span>语言变体</span>
						</summary>
					</details>
					<div id="citizen-variants__card" class="citizen-menu__card"><div class="citizen-menu__card-content"></div></div>
				</div>`);
			const varCard = actions.querySelector('#citizen-variants__card .citizen-menu__card-content');
			if (varCard) {
				varCard.appendChild(makeLinkPortlet('p-variants', '语言变体', '语言变体', data.variants));
				const varCnt = varCard.querySelectorAll('li.mw-list-item').length;
				const varWrap = varCard.closest('.citizen-page-variants');
				const varSum = varWrap ? varWrap.querySelector('summary[data-counter-text]') : null;
				if (varSum && varCnt > 0) varSum.setAttribute('data-counter-text', String(varCnt));
			}
		}

		if (data.views) actions.appendChild(makePortlet('p-views', '查看', '查看', data.views, true, true));

		if (data.associatedPages) actions.appendChild(makePortlet('p-associated-pages', '关联页面', '关联页面', data.associatedPages, true, false));

		actions.insertAdjacentHTML('beforeend', `
			<div id="citizen-page-more-dropdown" class="citizen-page-actions-more citizen-page-actions__item citizen-dropdown">
				<details class="citizen-dropdown-details">
					<summary class="citizen-dropdown-summary citizen-cdx-button--size-large cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" title="更多操作" aria-details="citizen-page-actions-more__card">
						<span class="citizen-ui-icon mw-ui-icon-wikimedia-ellipsis"></span><span>更多操作</span>
					</summary>
				</details>
				<div id="citizen-page-actions-more__card" class="citizen-menu__card"><div class="citizen-menu__card-content"></div></div>
			</div>`);
		const moreCard = actions.querySelector('#citizen-page-actions-more__card .citizen-menu__card-content');
		moreCard.appendChild(buildMoreCardContent(data));

		const oldTitlebar = document.querySelector('header.vector-page-titlebar, header.mw-body-header');
		if (oldTitlebar && oldTitlebar.id !== 'citizen-page-header') {
			if (data.toc) {
				const tocDropdown = oldTitlebar.querySelector('.vector-page-titlebar-toc, .vector-toc');
				if (tocDropdown) document.body.appendChild(tocDropdown);
			}
			oldTitlebar.replaceWith(wrapper);
		} else {
			const main = document.querySelector('main');
			if (main) main.prepend(wrapper);
		}
	}

	function buildStickyHeader(data) {
		if (document.getElementById('citizen-sticky-header')) return;
		if (isEditorPage()) return;

		if (mw.config.get('wgIsMainPage') === true && mw.config.get('wgAction') === 'view') return;

		const title = (data.firstHeading.replace(/<[^>]*>/g, '').trim()) || mw.config.get('wgTitle', '');
		const tagline = data.siteSub ? data.siteSub.replace(/<[^>]*>/g, '').trim() : '';

		const caMap = {};
		const collect = (html) => {
			if (!html) return;
			const t = document.createElement('template');
			t.innerHTML = html;
			t.content.querySelectorAll('a').forEach(a => {
				const li = a.closest('li[id]');
				if (!li) return;
				const m = li.id.match(/^ca-(\S+)$/);
				if (!m) return;
				caMap[m[1]] = { text: a.textContent.trim(), href: a.getAttribute('href') };
			});
		};
		collect(data.views);
		collect(data.associatedPages);
		collect(data.cactions);
		collect(data.tb);

		const btn = (idSuffix, icon, label, targetSel) =>
			`<button class="cdx-button cdx-button--weight-quiet cdx-button--action-default cdx-button--size-large cdx-button--icon-only" id="${idSuffix}-sticky-header" tabindex="-1" data-mw-citizen-click-target="${targetSel}" title="${label}"><span class="citizen-ui-icon ${icon}"></span><span></span></button>`;

		const actionButtons = [
			isShareable() ? btn('citizen-share', 'mw-ui-icon-wikimedia-share', '分享此页面', '#citizen-share') : '',
			caMap['view']        ? btn('ca-view',        'mw-ui-icon-wikimedia-eye',                          '查看',   '#ca-view > a') : '',
			caMap['subject']     ? btn('ca-subject',     'mw-ui-icon-wikimedia-article',                      '条目页', '[id^="ca-nstab-"]:not(.selected) > a') : '',
			caMap['history']     ? btn('ca-history',     'mw-ui-icon-wikimedia-history',            '历史',   '#ca-history > a') : '',
			caMap['edit']        ? btn('ca-edit',        'mw-ui-icon-wikimedia-wikiText',           '编辑',   '#ca-edit > a') : '',
			(!caMap['edit'] && caMap['ve-edit']) ? btn('ca-ve-edit', 'mw-ui-icon-wikimedia-edit', '可视化编辑', '#ca-ve-edit > a') : '',
			caMap['viewsource']  ? btn('ca-viewsource',  'mw-ui-icon-wikimedia-editLock',           '查看源代码', '#ca-viewsource > a') : '',
			caMap['addsection']  ? btn('ca-addsection',  'mw-ui-icon-wikimedia-speechBubbleAdd',              '新增段落', '#ca-addsection > a') : '',
			caMap['talk']        ? btn('ca-talk',        'mw-ui-icon-wikimedia-speechBubbles',                '讨论页', '#ca-talk > a') : '',
		].filter(Boolean).join('');

		const sticky = document.createElement('div');
		sticky.id = 'citizen-sticky-header';
		sticky.className = 'citizen-sticky-header';
		sticky.innerHTML = `
			<div class="citizen-sticky-header-background"></div>
			<div class="citizen-sticky-header-inner">
				<div class="citizen-sticky-header-start">
					<a href="#top" title="返回顶部" class="citizen-sticky-header-backtotop cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--size-large cdx-button--weight-quiet" tabindex="-1" aria-hidden="true">
						<div class="citizen-ui-icon mw-ui-icon-wikimedia-arrowUp"></div>
						<div class="citizen-sticky-header-page-info">
							<div class="citizen-sticky-header-page-title"><span class="mw-page-title-main">${escapeHtml(title)}</span></div>
							<div class="citizen-sticky-header-page-tagline">${escapeHtml(tagline)}</div>
						</div>
					</a>
				</div>
				<div class="citizen-sticky-header-end" aria-hidden="true">
					${actionButtons}
					<div id="citizen-sticky-header-languages" class="citizen-sticky-header-dropdown-container">
						<div class="citizen-page-languages citizen-page-actions__item citizen-dropdown">
							<details class="citizen-dropdown-details">
								<summary class="citizen-dropdown-summary cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only cdx-button--size-large" title="更多语言" data-counter-text="0" tabindex="-1">
									<span class="citizen-ui-icon mw-ui-icon-wikimedia-language"></span><span>更多语言</span>
								</summary>
							</details>
							<div class="citizen-menu__card"><div class="citizen-menu__card-content"></div></div>
						</div>
					</div>
					<div id="citizen-sticky-header-variants" class="citizen-sticky-header-dropdown-container">
						<div class="citizen-page-variants citizen-page-actions__item citizen-dropdown">
							<details class="citizen-dropdown-details">
								<summary class="citizen-dropdown-summary cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only cdx-button--size-large" title="语言变体" data-counter-text="0" tabindex="-1">
									<span class="citizen-ui-icon mw-ui-icon-wikimedia-conversion"></span><span>语言变体</span>
								</summary>
							</details>
							<div class="citizen-menu__card"><div class="citizen-menu__card-content"></div></div>
						</div>
					</div>
					<div id="citizen-sticky-header-more" class="citizen-sticky-header-dropdown-container">
						<div class="citizen-page-actions-more citizen-page-actions__item citizen-dropdown">
							<details class="citizen-dropdown-details">
								<summary class="citizen-dropdown-summary cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only cdx-button--size-large" title="更多操作" tabindex="-1">
									<span class="citizen-ui-icon mw-ui-icon-wikimedia-ellipsis"></span><span>更多操作</span>
								</summary>
							</details>
							<div class="citizen-menu__card"><div class="citizen-menu__card-content"></div></div>
						</div>
					</div>
				</div>
			</div>
		`;

		const container = document.createElement('div');
		container.className = 'citizen-sticky-header-container';
		container.appendChild(sticky);

		document.body.appendChild(container);

		sticky.addEventListener('click', (e) => {
			const b = e.target.closest('[data-mw-citizen-click-target]');
			if (!b) return;
			const sel = b.getAttribute('data-mw-citizen-click-target');
			const target = document.querySelector(sel);
			if (!target) return;
			e.preventDefault();
			if (typeof target.click === 'function') target.click();
			else if (target.href) location.href = target.href;
		});

		document.addEventListener('click', (e) => {
			const s = e.target.closest('#citizen-share');
			if (!s) return;
			e.preventDefault();
			if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(() => {});
			else if (navigator.clipboard) navigator.clipboard.writeText(location.href);
		});

		const langCard = sticky.querySelector('#citizen-sticky-header-languages .citizen-menu__card-content');
		if (langCard && data.languages) {
			langCard.appendChild(makeLinkPortlet('p-langs', '其他语言', '其他语言', data.languages));
			const langCnt = langCard.querySelectorAll('li.mw-list-item').length;
			const langWrap = sticky.querySelector('#citizen-sticky-header-languages');
			const langSum = langWrap ? langWrap.querySelector('summary[data-counter-text]') : null;
			if (langSum && langCnt > 0) langSum.setAttribute('data-counter-text', String(langCnt));
		}
		const varCard = sticky.querySelector('#citizen-sticky-header-variants .citizen-menu__card-content');
		if (varCard && data.variants) {
			varCard.appendChild(makeLinkPortlet('p-variants', '语言变体', '语言变体', data.variants));
			const varCnt = varCard.querySelectorAll('li.mw-list-item').length;
			const varWrap = sticky.querySelector('#citizen-sticky-header-variants');
			const varSum = varWrap ? varWrap.querySelector('summary[data-counter-text]') : null;
			if (varSum && varCnt > 0) varSum.setAttribute('data-counter-text', String(varCnt));
		}
		const moreCard = sticky.querySelector('#citizen-sticky-header-more .citizen-menu__card-content');
		if (moreCard) moreCard.appendChild(buildMoreCardContent(data));

		if (!document.getElementById('citizen-page-header-sticky-sentinel')) {
			const ph = document.getElementById('citizen-page-header');
			const sentinel = document.createElement('div');
			sentinel.id = 'citizen-page-header-sticky-sentinel';
			if (ph && ph.parentNode) ph.insertAdjacentElement('afterend', sentinel);
			else document.body.prepend(sentinel);
		}

		const BODY_VISIBLE = 'citizen-sticky-header-visible';
		const setVisible = (v) => {
			document.body.classList.toggle(BODY_VISIBLE, v);
			if (!v && document.body.classList.contains('cv-sidebar-collapsed')) {
				const det = document.querySelector('#citizen-toc .citizen-dropdown-details');
				if (det && det.open) det.open = false;
			}
			const h = sticky.getBoundingClientRect().height;
			if (h) document.documentElement.style.setProperty('--height-sticky-header', h + 'px');
		};
		let lastY = 0;
		let ticking = false;
		const onScroll = () => {
			const y = window.scrollY || document.documentElement.scrollTop;
			if (y > 80 && y > lastY) {
				setVisible(true);
			} else if (y < 40) {
				setVisible(false);
			}
			lastY = y;
			ticking = false;
		};
		window.addEventListener('scroll', () => {
			if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
		}, { passive: true });
	}

	function fillTocAsync(contents) {
		if (!contents) return;
		let tries = 0;
		const tryFill = () => {
			const src = document.querySelector('#vector-toc #mw-panel-toc-list, #mw-panel-toc-list.vector-toc-contents');
			if (src && src.querySelector('.vector-toc-list-item')) {
				const clone = src.cloneNode(true);
				contents.appendChild(clone);
				convertTocToCitizen(clone);
				contents.addEventListener('click', (e) => {
					const btn = e.target.closest('.citizen-toc-toggle');
					if (!btn) return;
					const li = btn.closest('.citizen-toc-list-item');
					if (!li) return;
					const expanded = li.classList.toggle('citizen-toc-list-item--expanded');
					btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
				});
				setupTocScrollSpy(contents);
				document.body.classList.add('citizen-toc-enabled');
				cleanupVectorToc();
				return;
			}
			if (++tries <= 60) setTimeout(tryFill, 100);
			else cleanupVectorToc();
		};
		tryFill();
	}

	function cleanupVectorToc() {
		document.querySelectorAll('.vector-toc-landmark, .mw-table-of-contents-container, .vector-column-start, .vector-toc, .vector-page-titlebar, .vector-page-titlebar-toc, .vector-unpinned-container').forEach(el => el.remove());
	}

	function cvhEl(tag, cls, html) {
		var el = document.createElement(tag);
		if (cls) el.className = cls;
		if (html != null) el.innerHTML = html;
		return el;
	}

	function cvhSanitize(node) {
		if (node.nodeType === 1) node.removeAttribute('id');
		node.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
		node.querySelectorAll('.mw-editsection, .editsection, style, .mw-empty-elt').forEach(function (el) { el.remove(); });
		node.querySelectorAll('.nomobile, .mobileonly').forEach(function (el) {
			el.classList.remove('nomobile');
			el.classList.remove('mobileonly');
		});
		return node;
	}

	function cvhHeading(block) {
		var h = block.querySelector('h2, h3');
		if (!h) return '';
		var t = h.cloneNode(true);
		t.querySelectorAll('.mw-editsection, .editsection').forEach(function (el) { el.remove(); });
		return (t.textContent || '').replace(/\s+/g, ' ').trim();
	}

	function cvhBodyHtml(block) {
		var c = cvhSanitize(block.cloneNode(true));
		var h = c.querySelector('h2, h3');
		if (h) h.remove();
		c.querySelectorAll('.mp-2012-block-nav-footer').forEach(function (el) { el.remove(); });
		return c.innerHTML.trim();
	}

	function cvhImageBody(block) {
		var box = cvhEl('div', 'featured-image__media');
		var img = block.querySelector('ul.gallery img, .thumb img, img');
		if (img) {
			var im = img.cloneNode(true);
			im.removeAttribute('style');
			im.removeAttribute('width');
			im.removeAttribute('height');
			box.appendChild(im);
		}
		var text = block.querySelector('.gallerytext');
		if (text) {
			var cap = cvhEl('p', 't-card__caption');
			cap.innerHTML = text.innerHTML;
			cvhSanitize(cap);
			box.appendChild(cap);
		}
		return box;
	}

	function cvhFoot(block) {
		var f = block.querySelector('.mp-2012-block-nav-footer');
		if (!f) return null;
		var ul = f.querySelector('ul');
		if (!ul) return null;
		var foot = cvhEl('div', 't-card__foot');
		foot.appendChild(cvhSanitize(ul.cloneNode(true)));
		return foot;
	}

	function cvhCard(opts) {
		var card = cvhEl(opts.tag || 'article',
			't-card' + (opts.cls ? ' ' + opts.cls : '') + (opts.link ? ' t-card--link' : ''));
		if (opts.kicker) card.appendChild(cvhEl('div', 't-card__kicker', escapeHtml(opts.kicker)));
		var content = cvhEl('div', 't-card__content');
		if (opts.body || opts.bodyNode) {
			var body = cvhEl('div', 't-card__body');
			if (opts.bodyNode) body.appendChild(opts.bodyNode);
			else body.innerHTML = opts.body;
			content.appendChild(body);
		}
		if (opts.foot) content.appendChild(opts.foot);
		card.appendChild(content);
		return card;
	}

	function cvhTrendingList(block) {
		var list = cvhEl('ul', 'trending-list');
		block.querySelectorAll('ul > li').forEach(function (li, i) {
			var row = cvhEl('li');
			row.appendChild(cvhEl('span', 'trending-rank', String(i + 1)));
			var a = li.querySelector('a');
			row.appendChild(a ? a.cloneNode(true) : cvhEl('span', null, (li.textContent || '').trim()));
			list.appendChild(row);
		});
		return list;
	}

	function cvhCountUp(el, target) {
		var start = 0;
		function frame(now) {
			if (!frame.t0) frame.t0 = now;
			var t = Math.min(1, (now - frame.t0) / 900);
			var eased = 1 - Math.pow(1 - t, 3);
			el.textContent = Math.round(target * eased).toLocaleString('zh-Hans-CN');
			if (t < 1) requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}

	function cvhFillHeroStats() {
		var vals = document.querySelectorAll('.cv-home [data-cvh-stat]');
		if (!vals.length) return;
		fetch(wikiApi() + '?action=query&meta=siteinfo&siprop=statistics&format=json')
			.then(function (r) { return r.json(); })
			.then(function (j) {
				var st = j && j.query && j.query.statistics;
				if (!st) return;
				vals.forEach(function (el) {
					var v = st[el.getAttribute('data-cvh-stat')];
					if (v != null) cvhCountUp(el, Number(v));
				});
			})
			.catch(function () {  });
	}

	function initMainPageHomepage() {
		if (!isHomePage()) return;
		var src = document.getElementById('mp-2012');
		if (!src || !src.parentNode) return;
		var host = src.parentNode;
		if (host.querySelector('.cv-home')) return;

		var get = function (sel) { return src.querySelector(sel); };
		var wrap = cvhEl('div', 'cv-home');

		var hero = cvhEl('div', 'home-hero');
		var heroContent = cvhEl('div', 'home-hero__content');

		var heroTitle = cvhEl('h2', 'home-hero__title');
		var wordmark = cvhEl('img', 'home-hero__wordmark');
		wordmark.src = 'https://zh.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-zh.svg';
		wordmark.alt = '维基百科';
		heroTitle.appendChild(wordmark);
		heroContent.appendChild(heroTitle);

		var sloganEl = get('#mp-2012-banner-title p');
		var slogan = '';
		if (sloganEl) {
			Array.prototype.some.call(sloganEl.childNodes, function (n) {
				if (n.nodeType === 1 && n.tagName === 'BR') return true;
				slogan += n.textContent || '';
				return false;
			});
		}
		var lead = cvhEl('p', 'home-hero__lead');
		lead.textContent = (slogan.replace(/\s+/g, ' ').trim()) || '海納百川，有容乃大';
		heroContent.appendChild(lead);
		hero.appendChild(heroContent);

		var introTable = get('#mp-2012-banner-intro table');
		if (introTable) {
			var tabs = cvhEl('div', 'home-hero__tabs');
			introTable.querySelectorAll('a').forEach(function (a) {
				tabs.appendChild(cvhSanitize(a.cloneNode(true)));
			});
			if (tabs.children.length) hero.appendChild(tabs);
		}

		var heroBand = cvhEl('section', 'home-band');
		heroBand.appendChild(hero);
		wrap.appendChild(heroBand);

		host.classList.add('cv-home-active');
		host.insertBefore(wrap, src);

		cvhFillHeroStats();
	}

	function cleanupVectorScaffolding() {
		document.querySelectorAll('.mw-content-container').forEach(mwc => {
			while (mwc.firstChild) mwc.parentNode.insertBefore(mwc.firstChild, mwc);
			mwc.remove();
		});
		document.querySelectorAll('.vector-body-before-content').forEach(vbb => {
			const ss = vbb.querySelector('#siteSub');
			if (ss) vbb.parentNode.insertBefore(ss, vbb);
			vbb.remove();
		});
		document.querySelectorAll('.vector-settings, #p-dock-bottom').forEach(el => el.remove());
		const jump = document.querySelector('.mw-jump-link');
		if (jump && jump.parentElement !== document.body) document.body.appendChild(jump);
		document.querySelectorAll('#mw-teleport-target').forEach(tt => {
			tt.classList.remove('vector-body');
			if (tt.parentElement !== document.body) document.body.appendChild(tt);
		});
	}

	function convertTocToCitizen(ul) {
		const prelude = ul.querySelector('#toc-mw-content-text');
		if (prelude) prelude.remove();

		ul.classList.remove('vector-toc-contents');
		ul.classList.add('citizen-toc-list');
		ul.removeAttribute('id');

		ul.querySelectorAll('li.vector-toc-list-item').forEach(li => {
			li.classList.remove('vector-toc-list-item');
			li.classList.add('citizen-toc-list-item');
			Array.from(li.classList).forEach(c => {
				if (c.startsWith('vector-toc-level-')) {
					li.classList.remove(c);
					li.classList.add('citizen-toc-level-' + c.slice('vector-toc-level-'.length));
				} else if (c === 'vector-toc-list-item-expanded') {
					li.classList.remove(c);
					li.classList.add('citizen-toc-list-item--expanded');
				}
			});

			const a = li.querySelector(':scope > a.vector-toc-link');
			if (a) {
				a.classList.remove('vector-toc-link');
				a.classList.add('citizen-toc-link', 'cdx-button', 'cdx-button--fake-button', 'cdx-button--fake-button--enabled', 'cdx-button--weight-quiet');
				a.setAttribute('role', 'button');
				const text = a.querySelector(':scope > .vector-toc-text');
				if (text) {
					text.classList.remove('vector-toc-text');
					text.classList.add('citizen-toc-text');
					const numb = text.querySelector(':scope > .vector-toc-numb');
					if (numb) {
						numb.classList.remove('vector-toc-numb');
						numb.classList.add('citizen-toc-numb');
					}
					text.querySelectorAll(':scope > span:not(.citizen-toc-numb)').forEach(s => s.classList.add('citizen-toc-heading'));
				}
			}

			const btn = li.querySelector(':scope > button.vector-toc-toggle');
			if (btn) {
				btn.classList.remove('vector-toc-toggle');
				btn.classList.add('citizen-toc-toggle', 'cdx-button', 'cdx-button--weight-quiet', 'cdx-button--icon-only', 'cdx-button--size-medium');
				btn.setAttribute('aria-expanded', 'false');
				const icon = btn.querySelector('.vector-icon');
				if (icon) {
					icon.classList.remove('vector-icon', 'vector-icon--x-small', 'mw-ui-icon-wikimedia-expand');
					icon.classList.add('citizen-ui-icon', 'mw-ui-icon-wikimedia-collapse');
				} else {
					btn.insertAdjacentHTML('afterbegin', '<span class="citizen-ui-icon mw-ui-icon-wikimedia-collapse"></span>');
				}
			}

			const sl = li.querySelector(':scope > ul.vector-toc-list');
			if (sl) {
				sl.classList.remove('vector-toc-list');
				sl.classList.add('citizen-toc-list');
				li.classList.add('citizen-toc-list-item--expanded');
				const btn2 = li.querySelector(':scope > .citizen-toc-toggle');
				if (btn2) btn2.setAttribute('aria-expanded', 'true');
			}
		});

		const contents = ul.closest('.citizen-toc-contents');
		if (contents && !contents.querySelector('.citizen-toc-indicator')) {
			contents.insertAdjacentHTML('afterbegin', '<div class="citizen-toc-indicator"></div>');
		}
	}

	function setupSectionHeadings() {
		const output = document.querySelector('.mw-parser-output');
		if (!output) return;

		const headings = Array.from(output.children)
			.filter(el => el.classList && el.classList.contains('mw-heading'));

		const levelOf = (el) => {
			const m = (el.className.match(/(?:^|\s)mw-heading(\d)(?:\s|$)/) || []);
			return m[1] ? parseInt(m[1], 10) : 2;
		};

		headings.forEach((heading) => {
			if (heading.querySelector(':scope > .citizen-section-toggle')) return;

			const level = levelOf(heading);
			const toggle = document.createElement('button');
			toggle.className = 'citizen-section-toggle';
			toggle.type = 'button';
			toggle.setAttribute('aria-expanded', 'true');
			toggle.setAttribute('aria-label', '折叠本节');
			toggle.innerHTML = '<span class="citizen-ui-icon mw-ui-icon-wikimedia-collapse"></span>';
			heading.appendChild(toggle);

			const contentSiblings = [];
			let sib = heading.nextElementSibling;
			while (sib) {
				if (sib.classList && sib.classList.contains('mw-heading')) {
					if (levelOf(sib) <= level) break;
				}
				contentSiblings.push(sib);
				sib = sib.nextElementSibling;
			}

			toggle.addEventListener('click', () => {
				const collapsed = heading.classList.toggle('citizen-section--collapsed');
				toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
				contentSiblings.forEach(el => {
					el.classList.toggle('citizen-section-hidden', collapsed);
				});
			});
		});
	}

	function setupTocScrollSpy(contents) {
		if (!contents) return;
		const body = document.getElementById('bodyContent');
		const indicator = contents.querySelector('.citizen-toc-indicator');
		if (!body || !indicator) return;

		const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
		const headingSelector = ['.mw-heading', ...HEADING_TAGS.map(t => `${t}:not([id])`)]
			.map(sel => `.mw-parser-output ${sel}`).join(', ');
		const headlineSelector = ['.mw-headline', ...HEADING_TAGS.map(t => `${t}[id]`)]
			.map(sel => `.mw-parser-output ${sel}`).join(', ');

		const TOP_MARGIN = 75;
		let sections = [];
		let activeIds = [];
		let indicatorUnitHeight = 0;
		let throttleId = null;

		const collect = () => {
			sections = Array.from(body.querySelectorAll(headingSelector)).map(h => {
				const headline = h.querySelector(headlineSelector);
				return { el: h, id: headline ? headline.id : '' };
			}).filter(s => s.id && document.getElementById('toc-' + s.id));
		};

		const getActiveLinks = (ids) => {
			let first = null, last = null;
			for (const id of ids) {
				const el = document.getElementById('toc-' + id);
				if (!el) continue;
				const link = el.querySelector('.citizen-toc-link');
				if (link && link.offsetParent !== null) {
					if (!first) first = link;
					last = link;
				}
			}
			return { first, last };
		};

		const applyIndicator = (top, height) => {
			if (top === null || top === undefined) {
				indicator.style.setProperty('--indicator-scale', '0');
				return;
			}
			if (!indicatorUnitHeight) {
				const firstLink = getActiveLinks(activeIds).first;
				indicatorUnitHeight = firstLink ? firstLink.getBoundingClientRect().height : 32;
				if (indicatorUnitHeight <= 0) indicatorUnitHeight = 32;
				indicator.style.setProperty('--indicator-unit-height', indicatorUnitHeight + 'px');
			}
			const scale = indicatorUnitHeight > 0 ? height / indicatorUnitHeight : 0;
			indicator.style.setProperty('--indicator-top', top + 'px');
			indicator.style.setProperty('--indicator-scale', String(scale));
		};

		const measureAndApply = () => {
			if (activeIds.length === 0) { applyIndicator(null, 0); return; }
			const { first, last } = getActiveLinks(activeIds);
			if (!first || !last) { applyIndicator(null, 0); return; }
			const positioningParent = indicator.offsetParent || contents;
			const containerRect = positioningParent.getBoundingClientRect();
			const firstRect = first.getBoundingClientRect();
			const lastRect = last.getBoundingClientRect();
			applyIndicator(
				firstRect.top - containerRect.top + positioningParent.scrollTop,
				lastRect.bottom - firstRect.top
			);
		};

		const changeActiveSections = (ids) => {
			const newKey = ids.slice().sort().join(',');
			const oldKey = activeIds.slice().sort().join(',');
			if (newKey === oldKey) return;
			contents.querySelectorAll('.citizen-toc-list-item--active').forEach(li => li.classList.remove('citizen-toc-list-item--active'));
			contents.querySelectorAll('.citizen-toc-level-1--active').forEach(li => li.classList.remove('citizen-toc-level-1--active'));
			activeIds = [];
			for (const id of ids) {
				const el = document.getElementById('toc-' + id);
				if (!el) continue;
				el.classList.add('citizen-toc-list-item--active');
				activeIds.push(id);
				const topSection = el.closest('.citizen-toc-level-1');
				if (topSection) {
					topSection.classList.add('citizen-toc-level-1--active', 'citizen-toc-list-item--expanded');
					const toggle = topSection.querySelector('.citizen-toc-toggle');
					if (toggle) toggle.setAttribute('aria-expanded', 'true');
				}
			}
			requestAnimationFrame(measureAndApply);
			requestAnimationFrame(scrollActiveIntoView);
		};

		const scrollActiveIntoView = () => {
			if (activeIds.length === 0) return;
			const { first } = getActiveLinks(activeIds);
			if (!first) return;
			const box = first.closest('#citizen-toc') || first.closest('.citizen-menu__card-content');
			if (!box) return;
			const boxRect = box.getBoundingClientRect();
			const itemRect = first.getBoundingClientRect();
			const pad = 8;
			const itemTop = itemRect.top - boxRect.top + box.scrollTop;
			const itemBottom = itemRect.bottom - boxRect.top + box.scrollTop;
			const viewTop = box.scrollTop;
			const viewBottom = viewTop + box.clientHeight;
			if (itemTop >= viewTop + pad && itemBottom <= viewBottom - pad) return;
			if (itemTop < viewTop + pad) {
				box.scrollTop += itemTop - (viewTop + pad);
			} else if (itemBottom > viewBottom - pad) {
				box.scrollTop += itemBottom - (viewBottom - pad);
			}
		};

		const calc = () => {
			collect();
			if (sections.length === 0) { changeActiveSections([]); return; }
			const sorted = sections.map(s => ({
				el: s.el,
				id: s.id,
				top: s.el.getBoundingClientRect().top - TOP_MARGIN
			})).sort((a, b) => a.top - b.top);

			const above = sorted.filter(s => s.top <= 0);
			const below = sorted.filter(s => s.top > 0);
			let startIdx;
			if (above.length > 0) startIdx = sorted.indexOf(above[above.length - 1]);
			else startIdx = sorted.indexOf(below[0]);

			let endIdx = startIdx;
			const innerHeight = window.innerHeight;
			for (let i = startIdx; i < sorted.length; i++) {
				if (sorted[i].top + TOP_MARGIN < innerHeight) endIdx = i;
			}
			changeActiveSections(sorted.slice(startIdx, endIdx + 1).map(s => s.id));
		};

		const handleScroll = () => {
			if (!throttleId) {
				throttleId = setTimeout(() => { throttleId = null; calc(); }, 200);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		const handleResize = () => { indicatorUnitHeight = 0; calc(); };
		window.addEventListener('resize', handleResize);
		requestAnimationFrame(() => requestAnimationFrame(calc));
	}

	function buildPageSidebar(data) {
		const main = document.querySelector('main');
		if (!main) return;

		let container = main.querySelector(':scope > .citizen-body-container');
		if (!container) {
			container = document.createElement('div');
			container.className = 'citizen-body-container';
			Array.from(main.children)
				.filter(k => !k.classList.contains('citizen-page-header'))
				.forEach(k => container.appendChild(k));
			main.appendChild(container);
		}
		container.querySelectorAll(':scope .mw-page-container').forEach(mwpc => {
			while (mwpc.firstChild) mwpc.parentNode.insertBefore(mwpc.firstChild, mwpc);
			mwpc.remove();
		});

		let bodyContent = container.querySelector('#bodyContent');
		if (!bodyContent) {
			bodyContent = document.createElement('div');
			bodyContent.id = 'bodyContent';
			bodyContent.className = 'citizen-body';
			container.insertBefore(bodyContent, container.firstChild);
		}
		bodyContent.classList.add('citizen-body');
		bodyContent.classList.remove('vector-body', 'citizen-body-container');
		Array.from(container.children).forEach(k => {
			if (k === bodyContent) return;

			if (k.contains(bodyContent)) return;
			if (k.classList.contains('citizen-page-sidebar')) return;
			if (k.classList.contains('citizen-page-footer')) return;
			if (k.classList.contains('citizen-body-container')) return;
			bodyContent.appendChild(k);
		});
		if (!bodyContent.querySelector(':scope > #contentSub')) {
			const cs = document.createElement('div');
			cs.id = 'contentSub';
			const sub = bodyContent.querySelector(':scope > #mw-content-text');
			if (sub) bodyContent.insertBefore(cs, sub);
			else bodyContent.appendChild(cs);
		}
		if (!bodyContent.querySelector('#mw-content-text')) {
			const mc = document.createElement('div');
			mc.id = 'mw-content-text';
			mc.className = 'mw-body-content';
			bodyContent.appendChild(mc);
		}

		const hasSidebarContent = !!(data.lastmod || data.toc) && !isEditorPage() && !isDiffPage();
		let sidebar = container.querySelector(':scope > .citizen-page-sidebar');
		if (!hasSidebarContent) {
			if (sidebar) sidebar.remove();
		} else {
			if (!sidebar) {
				sidebar = document.createElement('div');
				sidebar.className = 'citizen-page-sidebar';
				container.appendChild(sidebar);
			}
			sidebar.innerHTML = '';
		}

		if (sidebar && data.lastmod && !isHomePage()) {
			const titleText = data.lastmod.replace(/<[^>]*>/g, '').trim();
			const m = titleText.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s*[^\d]*(\d{1,2}):(\d{2})/);
			let tsUnix = '';
			if (m) {
				const [, y, mo, d, hh, mm] = m;
				tsUnix = Math.floor(new Date(+y, +mo - 1, +d, +hh, +mm).getTime() / 1000);
			}
			sidebar.insertAdjacentHTML('beforeend', `
				<nav id="citizen-sidebar-lastmod" class="citizen-menu" aria-label="最后修改时间">
					<div class="citizen-menu__heading">最后修改时间</div>
					<div class="citizen-menu__content">
						<ul class="citizen-menu__content-list">
							<li id="lm-time" class="mw-list-item"><a data-mw="interface" id="citizen-lastmod-relative" href="/index.php?title=${encodeURIComponent(mw.config.get('wgPageName', ''))}&diff=" title="${escapeHtml(titleText)}" data-timestamp="${tsUnix}"><span class="citizen-ui-icon mw-ui-icon-history mw-ui-icon-wikimedia-history"></span><span data-relative-time="${tsUnix}"></span></a></li>
						</ul>
					</div>
				</nav>`);
		}
		if (sidebar && data.toc) {
			sidebar.insertAdjacentHTML('beforeend', `
				<div id="citizen-toc" class="citizen-toc citizen-dropdown citizen-toc--collapse-enabled">
					<details class="citizen-dropdown-details">
						<summary class="citizen-dropdown-summary" title="目录" aria-details="mw-panel-toc">
							<span class="citizen-ui-icon mw-ui-icon-wikimedia-listBullet"></span>
							<span>目录</span>
						</summary>
					</details>
					<nav id="mw-panel-toc" class="citizen-toc-card citizen-menu__card" aria-labelledby="mw-panel-toc-label">
						<div class="citizen-menu__card-content">
							<a class="citizen-toc-top citizen-toc-link cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet" title="返回顶部" href="#top" role="button">
								<div class="citizen-ui-icon mw-ui-icon-wikimedia-arrowUp"></div>
								<div class="citizen-toc-text">返回顶部</div>
							</a>
							<div id="mw-panel-toc-label" class="citizen-menu__heading">目录</div>
							<div class="citizen-toc-contents" id="mw-panel-toc-list"></div>
						</div>
					</nav>
				</div>`);
			fillTocAsync(sidebar.querySelector('.citizen-toc-contents'));
		}

		if (!container.querySelector(':scope > .citizen-page-footer')) {
			const pageFooter = document.createElement('footer');
			pageFooter.className = 'citizen-page-footer';
			const origCatlinks = document.querySelector('#catlinks');
			if (origCatlinks) pageFooter.appendChild(origCatlinks);
			const pageInfo = buildPageInfo(data.footerInfo, data.lastmod);
			if (pageInfo) pageFooter.appendChild(pageInfo);
			container.appendChild(pageFooter);
		}
	}

	const CITIZEN_PAGE_INFO_LABELS = { lastmod: '最后修改时间', copyright: '著作权', credits: '作者' };
	function buildPageInfo(rawFooterInfo, rawLastmod) {
		let items = [];
		if (rawFooterInfo) {
			const t = document.createElement('template');
			t.innerHTML = '<ul>' + rawFooterInfo + '</ul>';
			items = Array.from(t.content.querySelectorAll('li'));
		} else if (rawLastmod) {
			const t2 = document.createElement('template');
			t2.innerHTML = rawLastmod;
			items = Array.from(t2.content.querySelectorAll('li'));
		}
		if (!items.length) return null;
		const wrap = document.createElement('div');
		wrap.className = 'page-info';
		items.forEach(li => {
			const name = (li.id || '').replace(/^footer-info-/, '');
			const label = CITIZEN_PAGE_INFO_LABELS[name];
			if (!label) return;
			if (name === 'lastmod' && isHomePage()) return;
			if (name === 'copyright') return;
			const section = document.createElement('section');
			section.id = li.id;
			section.className = 'page-info__item';
			const labelDiv = document.createElement('div');
			labelDiv.className = 'page-info__label';
			labelDiv.textContent = label;
			const textDiv = document.createElement('div');
			textDiv.className = 'page-info__text';
			textDiv.innerHTML = li.innerHTML.trim();
			section.appendChild(labelDiv);
			section.appendChild(textDiv);
			wrap.appendChild(section);
		});
		return wrap.children.length ? wrap : null;
	}

	function buildFooter(data) {
		const pageContainer = document.querySelector('.citizen-page-container');
		if (!pageContainer) return;
		pageContainer.querySelectorAll('.mw-footer-container').forEach(fc => {
			while (fc.firstChild) fc.parentNode.insertBefore(fc.firstChild, fc);
			fc.remove();
		});
		const oldFooter = pageContainer.querySelector('footer#footer') || pageContainer.querySelector('footer.mw-footer');

		const filteredIcons = data.footerIcons
			? data.footerIcons.replace(/<li[^>]*id="footer-copyrightico"[^>]*>.*?<\/li>/gi, '')
			: '';

		const footer = document.createElement('footer');
		footer.className = 'mw-footer citizen-footer';
		footer.innerHTML = `
			<div class="citizen-footer__container">
				<section class="citizen-footer__content">
					<div class="citizen-footer__siteinfo">
						<div id="footer-sitetitle" class="citizen-footer__sitetitle mw-wiki-title">
							<img class="mw-logo-icon" src="https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg" alt="" aria-hidden="true" loading="lazy" height="48" width="48">
							<div class="mw-logo-wordmark cv-wordmark"></div>
						</div>
						<p id="footer-desc" class="citizen-footer__desc">维基百科，自由的百科全书</p>
					</div>
					<nav id="footer-places"><ul>${data.footerPlaces || ''}</ul></nav>
				</section>
				<section class="citizen-footer__bottom">
					<div id="footer-tagline">${data.footerTagline ? escapeHtml(data.footerTagline) : '本站的全部文字在知识共享 署名-相同方式共享 4.0协议之条款下提供，附加条款亦可能应用。（请参阅使用条款）<br>Wikipedia®和维基百科标志是维基媒体基金会的注册商标；维基™是维基媒体基金会的商标。<br>维基媒体基金会是按美国国內稅收法501(c)(3)登记的非营利慈善机构。'}</div>
					<nav id="footer-icons" class="noprint"><ul>${filteredIcons || ''}</ul></nav>
				</section>
			</div>
		`;

		if (oldFooter) oldFooter.replaceWith(footer);
		else pageContainer.appendChild(footer);
	}

	function wrapWikitablesInOverflow() {
		const tables = document.querySelectorAll('.mw-parser-output table.wikitable');
		tables.forEach(t => {
			if (t.parentElement && t.parentElement.classList.contains('citizen-overflow-content')) return;
			const content = document.createElement('div');
			content.className = 'citizen-overflow-content';
			const wrapper = document.createElement('div');
			wrapper.className = 'citizen-overflow-wrapper';
			t.parentNode.insertBefore(wrapper, t);
			wrapper.appendChild(content);
			content.appendChild(t);
		});
	}

	function setupFooterFloatFade() {
		const mq = window.matchMedia('(max-width: 1119.98px)');

		const floats = () => {
			if (!mq.matches) {
				document.body.classList.remove('cv-footer-float-hidden');
				return;
			}
			const toc = document.querySelector('#citizen-toc');
			const pageActions = document.querySelector('.citizen-page-actions');
			const footer = document.querySelector('.mw-footer.citizen-footer') ||
				document.querySelector('.citizen-footer') ||
				document.querySelector('.mw-footer');
			if (!footer) {
				document.body.classList.remove('cv-footer-float-hidden');
				return;
			}
			const f = footer.getBoundingClientRect();
			const overlaps = (el) => {
				if (!el) return false;
				const r = el.getBoundingClientRect();
				if (r.width < 1 || r.height < 1) return false;
				return r.bottom > f.top && r.top < f.bottom && r.right > f.left && r.left < f.right;
			};
			const hit = overlaps(toc) || overlaps(pageActions);
			document.body.classList.toggle('cv-footer-float-hidden', hit);
		};

		const onScroll = () => floats();

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		if (mq.addEventListener) mq.addEventListener('change', onScroll);
		setInterval(floats, 250);
		floats();
	}

	function setupTocCollapse() {
		const getSidebar = () => document.querySelector('.citizen-page-sidebar');
		const getToc = () => document.querySelector('#citizen-toc');
		const STORAGE_KEY = 'cv-toc-collapsed';
		const isDesktop = () => window.matchMedia('(min-width: 1120px)').matches;
		const readPref = () => { try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; } };
		const writePref = (on) => { try { localStorage.setItem(STORAGE_KEY, on ? '1' : '0'); } catch (e) {  } };

		const resetDetails = (toc) => {
			const det = toc.querySelector('.citizen-dropdown-details');
			if (det) det.open = false;
		};
		const ensureAir = (toc) => {
			const content = toc.querySelector('.citizen-menu__card-content');
			if (!content) return;
			const mk = () => {
				const air = document.createElement('div');
				air.className = 'cv-toc-card-air';
				air.setAttribute('aria-hidden', 'true');
				return air;
			};
			if (!content.firstElementChild || !content.firstElementChild.classList.contains('cv-toc-card-air')) {
				content.prepend(mk());
			}
			if (!content.lastElementChild || !content.lastElementChild.classList.contains('cv-toc-card-air')) {
				content.append(mk());
			}
		};
		const CDX_SUMMARY_CLASSES = ['cdx-button', 'cdx-button--fake-button',
			'cdx-button--fake-button--enabled', 'cdx-button--weight-quiet',
			'cdx-button--icon-only', 'cdx-button--size-large'];
		const dressSummary = (toc, on) => {
			const sum = toc.querySelector('.citizen-dropdown-summary');
			if (!sum) return;
			CDX_SUMMARY_CLASSES.forEach((c) => sum.classList.toggle(c, on));
		};

		const applyLayout = (on) => {
			const toc = getToc();
			const sidebar = getSidebar();
			if (!toc || !sidebar) return;
			if (on) {
				ensureAir(toc);
				dressSummary(toc, true);
				const start = document.querySelector('.citizen-sticky-header-start');
				if (start) start.prepend(toc);
				else document.body.appendChild(toc);
				document.body.classList.add('cv-sidebar-collapsed');
			} else {
				sidebar.appendChild(toc);
				dressSummary(toc, false);
				document.body.classList.remove('cv-sidebar-collapsed');
			}
			resetDetails(toc);
		};

		const collapse = () => {
			if (!isDesktop()) return;
			applyLayout(true);
			writePref(true);
		};
		const expand = () => {
			applyLayout(false);
			writePref(false);
		};

		document.addEventListener('click', (e) => {
			if (!isDesktop()) return;
			const collapsed = document.body.classList.contains('cv-sidebar-collapsed');

			const heading = e.target.closest('#citizen-toc .citizen-menu__heading');
			if (heading && heading.textContent.trim().startsWith('目录')) {
				if (collapsed) expand();
				else collapse();
				return;
			}

			const summary = e.target.closest('#citizen-toc .citizen-dropdown-summary');
			if (summary) {
				if (!collapsed) collapse();
				return;
			}
		});

		window.matchMedia('(min-width: 1120px)').addEventListener('change', (e) => {
			if (e.matches) {
				if (readPref()) applyLayout(true);
			} else if (document.body.classList.contains('cv-sidebar-collapsed')) {
				applyLayout(false);
			}
		});

		if (readPref() && isDesktop()) collapse();
	}

	const PERSONAL_ICONS = {
		userTalk: 'userTalk',
		settings: 'settings',
		watchlist: 'watchlist',
		userContributions: 'userContributions',
		logOut: 'logOut'
	};

	function personalMenuHtml(userName) {
		const icon = (name) => '<span class="citizen-ui-icon mw-ui-icon-' + name + ' mw-ui-icon-wikimedia-' + name + '"></span>';
		const getUrl = (page) => wikiUrl(page);
		const items = [
			{ id: 'pt-mytalk', cls: 'new mw-list-item', icon: 'userTalk', text: '讨论',
				href: getUrl('User_talk:' + userName), title: '您的讨论页（页面不存在）[ctrl-option-n]', kbd: '⌃ ⌥ n', accesskey: 'n' },
			{ id: 'pt-preferences', cls: 'mw-list-item', icon: 'settings', text: '参数设置',
				href: getUrl('Special:Preferences'), title: '您的参数设置', kbd: '' },
			{ id: 'pt-watchlist', cls: 'mw-list-item', icon: 'watchlist', text: '监视列表',
				href: getUrl('Special:Watchlist'), title: '您正在监视更改的页面列表[ctrl-option-l]', kbd: '⌃ ⌥ l', accesskey: 'l' },
			{ id: 'pt-mycontris', cls: 'mw-list-item', icon: 'userContributions', text: '贡献',
				href: getUrl('Special:Contributions/' + userName), title: '您的贡献列表[ctrl-option-y]', kbd: '⌃ ⌥ y', accesskey: 'y' },
			{ id: 'pt-logout', cls: 'mw-list-item', icon: 'logOut', text: '退出',
				href: getUrl('Special:UserLogout'), title: '退出', kbd: '' }
		];
		return items.map(it =>
			'<li id="' + it.id + '" class="' + it.cls + '"><a href="' + it.href + '" title="' + it.title + '"' +
			(it.accesskey ? ' accesskey="' + it.accesskey + '"' : '') + '>' +
			icon(it.icon) + ' <span>' + it.text + '</span>' +
			(it.kbd ? '<kbd class="citizen-keyboard-hint-key">' + it.kbd + '</kbd>' : '') +
			'</a></li>'
		).join('');
	}

	function formatRegistrationDate(iso) {
		if (!iso) return '未知';
		const d = new Date(iso);
		if (isNaN(d.getTime())) return '未知';
		const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][d.getUTCDay()];
		return d.getUTCFullYear() + '年' + (d.getUTCMonth() + 1) + '月' + d.getUTCDate() + '日 (' + week + ')';
	}

	function fetchUserProfile() {
		const userName = mw.config.get('wgUserName');
		if (!userName) return;
		const api = wikiApi();
		const usergroupsEl = document.getElementById('cv-usergroups');
		const regdateEl = document.getElementById('cv-user-regdate');
		fetch(api + '?action=query&list=users&ususers=' +
			encodeURIComponent(userName) + '&usprop=groups%7Cregistration&format=json',
			{ credentials: 'same-origin' })
			.then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
			.then(d => {
				const u = d.query && d.query.users && d.query.users[0];
				if (!u) return;
				const implicit = ['*', 'user', 'autoconfirmed'];
				const labels = {
					bureaucrat: '行政员', 'interface-admin': '界面管理员', sysop: '管理员',
					checkuser: '查核员', oversight: '监督员', steward: '监管员',
					'extendedconfirmed': '延伸确认用户', editor: '编辑', patroller: '巡查员',
					rollbacker: '回退员', 'filemover': '文件移动员', 'templateeditor': '模板编辑员',
					transwiki: '跨维基导入者', import: '导入者', 'ipblock-exempt': 'IP封禁豁免',
					'accountcreator': '账号创建员', bot: '机器人'
				};
				const shown = (u.groups || []).filter(g => g && implicit.indexOf(g) === -1);
				console.log('[citizen-vector] 用户组诊断 raw=', JSON.stringify(u.groups || []), 'shown=', JSON.stringify(shown));
				if (usergroupsEl) usergroupsEl.innerHTML = shown.map(g =>
					'<li id="group-' + encodeURIComponent(g) + '-member" class="citizen-userInfo-usergroup"><a href="' +
					wikiUrl('Special:ListUsers') + '?group=' + encodeURIComponent(g) +
					'"><span>' + escapeHtml(labels[g] || g) + '</span></a></li>').join('');
				if (regdateEl && u.registration) regdateEl.textContent = formatRegistrationDate(u.registration);
			})
			.catch(e => console.warn('[citizen-vector] fetchUserProfile 失败：', e));
	}

	function fillUserMenu(personalHtml) {
		const userName = mw.config.get('wgUserName');
		const isAnon = !userName;

		const userpageList = document.getElementById('cv-userpage-list');
		if (userpageList) {
			if (isAnon) {
				userpageList.innerHTML = '<li id="pt-anonuserpage" class="mw-list-item"><a href="/wiki/Special:我的用户页面"><span>' + mw.config.get('wgUserName', '未登录') + '</span></a></li>';
			} else {
				userpageList.innerHTML = '<li id="pt-userpage" class="mw-list-item"><a href="/wiki/User:' + encodeURIComponent(userName) + '" title="您的用户页[ctrl-option-.]" accesskey="."><span>' + escapeHtml(userName) + '</span><kbd class="citizen-keyboard-hint-key">⌃ ⌥ .</kbd></a></li>';
			}
		}

		const usergroupsEl = document.getElementById('cv-usergroups');
		if (usergroupsEl && !isAnon) usergroupsEl.innerHTML = '';

		const editCountEl = document.getElementById('cv-user-editcount');
		if (editCountEl) editCountEl.textContent = isAnon ? '—' : (mw.config.get('wgUserEditCount', 0));

		const listEl = document.getElementById('cv-personal-list');
		if (listEl) listEl.innerHTML = isAnon ? '' : personalMenuHtml(userName);

		if (!isAnon) fetchUserProfile();
	}

	function setupNotificationsDropdown(enabled, initialCount) {
		const wrap = document.querySelector('.citizen-notifications-dropdown');
		if (!wrap) return;
		if (!enabled) { wrap.style.display = 'none'; return; }

		const summary = wrap.querySelector('.citizen-notifications-button');
		const content = document.getElementById('citizen-notifications-content');
		const skeleton = content && content.querySelector('.citizen-notifications__skeleton');
		const errorBox = content && content.querySelector('.citizen-notifications__error');
		const seeAll = content && content.querySelector('.citizen-notifications__see-all');
		let activeIndex = 0;

		function setCount(n) {
			const num = Math.max(0, n || 0);
			if (summary) summary.setAttribute('data-counter-text', String(num));
		}
		setCount(initialCount || 0);

		let loaded = false;
		let abort = null;

		const MOCK_NOTIFICATIONS = [
			{ type: 'alert', category: 'system', timestamp: { utcunix: String(Math.floor(Date.now()/1000) - 300) }, '*': { header: '系统维护通知', body: '本周五 22:00–次日 02:00 进行例行维护，期间可能短暂不可访问。', links: { primary: { url: 'https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5' } } } },
			{ type: 'alert', category: 'mention', timestamp: { utcunix: String(Math.floor(Date.now()/1000) - 1800) }, '*': { header: '张三 在 Talk:首页 提到了你', body: '你好 @Admin ，能否帮忙审核一下首页的新文案？', links: { primary: { url: 'https://zh.wikipedia.org/wiki/Talk:%E9%A6%96%E9%A1%B5' } } } },
			{ type: 'notice', category: 'thank-you-edit', timestamp: { utcunix: String(Math.floor(Date.now()/1000) - 7200) }, '*': { header: '感谢你的 500 次编辑！', body: '继续加油，你已经是社区的核心贡献者之一了。', links: { primary: { url: 'https://zh.wikipedia.org/wiki/Special:Preferences' } } } },
			{ type: 'notice', category: 'welcome', timestamp: { utcunix: String(Math.floor(Date.now()/1000) - 86400) }, '*': { header: '欢迎加入本站', body: '这里有新手指引，祝你编辑愉快！', links: { primary: { url: 'https://zh.wikipedia.org/wiki/Help:%E7%9B%AE%E5%BD%95' } } } },
			{ type: 'alert', category: 'edit-user-talk', timestamp: { utcunix: String(Math.floor(Date.now()/1000) - 172800) }, '*': { header: '李四 在你的讨论页留言', body: '关于上次的合并请求……', links: { primary: { url: 'https://zh.wikipedia.org/wiki/User_talk:Admin' } } } }
		];

		const CATEGORY_TITLE_PREFIX = 'echo-category-title-';

		function fetchNotifications() {
			const api = (mw.config.get('wgScriptPath') || '') + '/api.php';
			const url = api + '?' + [
				'action=query',
				'meta=notifications|allmessages',
				'notformat=model',
				'notfilter=!read',
				'notlimit=25',
				'notprop=list|count',
				'notsections=alert|message',
				'amprefix=' + CATEGORY_TITLE_PREFIX,
				'amenableparser=1',
				'amlang=' + encodeURIComponent(mw.config.get('wgUserLanguage') || 'en'),
				'format=json'
			].join('&');
			if (abort) abort.abort();
			abort = new AbortController();
			return fetch(url, { credentials: 'same-origin', signal: abort.signal })
				.then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
				.then(function (j) {
					const q = (j && j.query) || {};
					const notif = q.notifications;
					const labels = {};
					(q.allmessages || []).forEach(function (m) {
						labels[m.name.replace(CATEGORY_TITLE_PREFIX, '')] = (m['*'] || '').trim();
					});
					if (!notif) {
						if (j && j.error && j.error.code === 'login-required') {
							setCount(MOCK_NOTIFICATIONS.filter(function (n) { return n.type === 'alert'; }).length);
							return renderPanel(MOCK_NOTIFICATIONS, { rawcount: MOCK_NOTIFICATIONS.length, list: MOCK_NOTIFICATIONS }, {
								system: '系统', mention: '提及', 'thank-you-edit': '感谢', welcome: '欢迎', 'edit-user-talk': '留言'
							});
						}
						setCount(0); return renderEmpty();
					}
					const list2 = notif.list || [];
					const count = notif.rawcount || list2.length;
					setCount(count);
					if (!list2.length) return renderEmpty();
					renderPanel(list2, notif, labels);
				})
				.catch(function (e) {
					if (e && e.name === 'AbortError') return;
					renderError();
				});
		}

		function markAllRead() {
			const api = (mw.config.get('wgScriptPath') || '') + '/api.php';
			return mw.loader.using('mediawiki.user')
				.then(function () {
					const body = new URLSearchParams({
						action: 'echomarkread', format: 'json', formatversion: '2',
						all: '1', token: mw.user.tokens.get('csrfToken')
					});
					return fetch(api, {
						method: 'POST',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body, credentials: 'same-origin'
					});
				})
				.then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
				.then(function () { setCount(0); return fetchNotifications(); })
				.catch(function () {});
		}

		function pinContentHeight() {
			const h = content.getBoundingClientRect().height;
			content.style.transition = 'none';
			content.style.height = h + 'px';
			void content.offsetHeight;
		}
		function animateContentHeight(targetH) {
			const end = (targetH != null) ? targetH : content.scrollHeight;
			content.style.transition = '';
			void content.offsetHeight;
			content.style.height = end + 'px';
			const finish = () => {
				content.removeEventListener('transitionend', finish);
				content.style.height = '';
			};
			content.addEventListener('transitionend', finish);
			setTimeout(finish, 450);
		}

		function setupTabs() {
			const track = content.querySelector('.cdx-tabs__track');
			const indicator = content.querySelector('.cdx-tabs__indicator');
			const tabs = content.querySelectorAll('.cdx-tabs__list__item');
			if (!track || !indicator || !tabs.length) return;
			function place(i) {
				const btn = tabs[i];
				indicator.style.left = btn.offsetLeft + 'px';
				indicator.style.width = btn.offsetWidth + 'px';
			}
			let cur = 0;
			function switchTo(i) {
				if (i === cur) { place(i); return; }
				cur = i;
				activeIndex = i;
				tabs.forEach((b, j) => {
					const sel = j === i;
					b.setAttribute('aria-selected', String(sel));
					b.tabIndex = sel ? 0 : -1;
				});
				place(i);
				const panels = track.querySelectorAll('.cdx-tab');
				if (panels[i]) track.style.height = clampPanelHeight(panels[i]) + 'px';
				track.classList.add('cdx-tabs__track--switching');
				requestAnimationFrame(() => {
					track.style.transform = 'translateX(-' + (i * 33.3333) + '%)';
				});
				const done = () => {
					track.classList.remove('cdx-tabs__track--switching');
					track.removeEventListener('transitionend', onEnd);
				};
				const onEnd = (e) => { if (e.propertyName === 'transform') done(); };
				track.addEventListener('transitionend', onEnd);
				setTimeout(done, 500);
			}
			tabs.forEach((b, i) => b.addEventListener('click', () => switchTo(i)));
			function contentAvailable() {
				const c = content.querySelector('.cdx-tabs__content');
				const panel = content.querySelector('.citizen-notifications__panel');
				const inlineMax = panel && parseFloat(panel.style.maxHeight || '');
				if (inlineMax && inlineMax > 0) return inlineMax;
				if (c && c.clientHeight > 0) return c.clientHeight;
				return Infinity;
			}
			function panelNatural(panel) {
				const list = panel.querySelector('.citizen-notifications__list');
				if (list) return list.scrollHeight;
				const empty = panel.querySelector('.citizen-notifications__empty');
				return (empty ? empty.offsetHeight : panel.offsetHeight);
			}
			function clampPanelHeight(panel) {
				return Math.min(panelNatural(panel), contentAvailable());
			}
			requestAnimationFrame(() => {
				place(0);
				const panels = track.querySelectorAll('.cdx-tab');
				if (panels[0]) track.style.height = clampPanelHeight(panels[0]) + 'px';
				track.style.transform = 'translateX(0%)';
			});
		}

		function renderPanel(items, notif, labels) {
			if (!content) return;
			pinContentHeight();
			labels = labels || {};

			const isAlert = (n) => (n.section === 'alert') || (n.type === 'alert');
			const isNotice = (n) => (n.section === 'message') || (n.type === 'notice');
			const alerts = items.filter(isAlert);
			const notices = items.filter(isNotice);
			const tabDefs = [
				{ key: 'all', label: '全部', items: items },
				{ key: 'alert', label: '重要通知', items: alerts },
				{ key: 'notice', label: '常规通知', items: notices }
			];
			const mkPanel = (def) =>
				'<section class="cdx-tab" role="tabpanel" tabindex="-1">' +
					(def.items.length
						? '<ul class="citizen-notifications__list">' + def.items.map((n) => renderItem(n, labels)).join('') + '</ul>'
						: '<div class="citizen-notifications__empty">没有通知。</div>') +
				'</section>';

			content.innerHTML =
				'<div class="citizen-notifications__panel">' +
					'<header class="citizen-notifications__header">' +
						'<h2 class="citizen-notifications__title">通知</h2>' +
						'<button class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only citizen-notifications__mark-all" aria-label="标记所有为已读" title="标记所有为已读">' + checkAllSvg() + '</button>' +
					'</header>' +
					'<div class="citizen-notifications__body">' +
						'<div class="cdx-tabs cdx-tabs--quiet">' +
							'<div class="cdx-tabs__header"><div class="cdx-tabs__list" role="tablist">' +
								tabDefs.map((d, i) => '<button class="cdx-tabs__list__item" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" tabindex="' + (i === 0 ? '0' : '-1') + '"><span>' + d.label + '</span></button>').join('') +
								'<div class="cdx-tabs__indicator"></div>' +
							'</div></div>' +
							'<div class="cdx-tabs__content">' +
								'<div class="cdx-tabs__track">' + tabDefs.map(mkPanel).join('') + '</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<footer class="citizen-notifications__footer">' +
						'<a class="citizen-notifications__see-all cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet" href="https://zh.wikipedia.org/wiki/Special:Notifications">查看全部</a>' +
						'<a class="citizen-notifications__prefs cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" href="https://zh.wikipedia.org/wiki/Special:Preferences#mw-prefsection-echo" aria-label="通知设置" title="通知设置">' + prefsSvg() + '</a>' +
					'</footer>' +
				'</div>';

			const markAll = content.querySelector('.citizen-notifications__mark-all');
			if (markAll) markAll.addEventListener('click', markAllRead);

			setupTabs();
			animateContentHeight();
		}

		const NOTIF_ICON_URL_PATTERN = /^(?:https?:\/\/|\/\/|\/)[^"'\\\s]*$/;
		const NOTIF_ACTION_BUTTON_CLASS = 'cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--action-progressive';

		const REAL_WIKI_ORIGIN = 'https://zh.wikipedia.org';
		function toRealWikiUrl(u) {
			if (!u) return u;
			try {
				const url = new URL(u, location.origin);
				if (url.hostname === 'zh.wikipedia.org') return u;
				url.searchParams.delete('markasread');
				let path = url.pathname;
				if (path === '/index.php' || path.indexOf('/index.php/') === 0) {
					const m = path.match(/^\/index\.php\/(.+)$/);
					const title = m ? decodeURIComponent(m[1]) : url.searchParams.get('title');
					if (!m) url.searchParams.delete('title');
					if (title) path = '/wiki/' + encodeURIComponent(title.replace(/ /g, '_'));
				}
				const qs = url.searchParams.toString();
				const hash = url.hash === '#' ? '' : url.hash;
				return REAL_WIKI_ORIGIN + path + (qs ? '?' + qs : '') + hash;
			} catch (e) { return u; }
		}

		function renderItem(n, labels) {
			labels = labels || {};
			const star = (n['*'] && typeof n['*'] === 'object') ? n['*'] : {};
			const links = star.links || {};
			const primaryUrl = toRealWikiUrl((links.primary && links.primary.url) || '');
			const iconUrl = star.iconUrl || '';
			const header = star.header || '';
			const body = star.body || '';
			const categoryLabel = labels[n.category] || n.category || '';
			const unix = n.timestamp && n.timestamp.utcunix;
			const timeStr = unix ? renderRelativeTimeStr(Number(unix)) : '';
			const isRead = !!n.read;

			const plainHeader = escapeHtml(header.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
			const primaryLink = primaryUrl
				? '<a class="citizen-notifications__item-primary" href="' + escapeHtml(primaryUrl) + '" aria-label="' + plainHeader + '"></a>'
				: '';
			const icon = (iconUrl && NOTIF_ICON_URL_PATTERN.test(iconUrl))
				? '<span class="citizen-notifications__item-icon" style="--citizen-notification-icon:url(&quot;' + iconUrl + '&quot;)"></span>'
				: '';
			const badge = '<span class="citizen-notifications__item-badge" aria-hidden="true">' + icon + '</span>';
			const secondary = (links.secondary || []).filter((l) => l && l.url && l.label);
			const actions = secondary.length
				? '<div class="citizen-notifications__item-actions">' + secondary.map((l) =>
					'<a class="citizen-notifications__item-link ' + NOTIF_ACTION_BUTTON_CLASS + '" href="' + escapeHtml(toRealWikiUrl(l.url)) + '">' + escapeHtml(l.label) + '</a>').join('') + '</div>'
				: '';

			return '<li class="citizen-notifications__item' + (isRead ? ' citizen-notifications__item--read' : '') + '">' +
				primaryLink +
				badge +
				'<div class="citizen-notifications__item-content">' +
					'<div class="citizen-notifications__item-meta">' +
						(categoryLabel ? '<span class="citizen-notifications__item-category">' + escapeHtml(categoryLabel) + '</span>' : '') +
						(timeStr ? '<span class="citizen-notifications__item-time">' + timeStr + '</span>' : '') +
					'</div>' +
					(header ? '<div class="citizen-notifications__item-header">' + header + '</div>' : '') +
					(body ? '<div class="citizen-notifications__item-body">' + body + '</div>' : '') +
					actions +
				'</div>' +
			'</li>';
		}

		function renderEmpty() {
			if (!content) return;
			pinContentHeight();
			const tabDefs = [
				{ key: 'all', label: '全部' },
				{ key: 'alert', label: '重要通知' },
				{ key: 'notice', label: '常规通知' }
			];
			content.innerHTML =
				'<div class="citizen-notifications__panel">' +
					'<header class="citizen-notifications__header">' +
						'<h2 class="citizen-notifications__title">通知</h2>' +
						'<button class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only citizen-notifications__mark-all" aria-label="标记所有为已读" title="标记所有为已读">' + checkAllSvg() + '</button>' +
					'</header>' +
					'<div class="citizen-notifications__body">' +
						'<div class="cdx-tabs cdx-tabs--quiet">' +
							'<div class="cdx-tabs__header"><div class="cdx-tabs__list" role="tablist">' +
								tabDefs.map((d, i) => '<button class="cdx-tabs__list__item" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" tabindex="' + (i === 0 ? '0' : '-1') + '"><span>' + d.label + '</span></button>').join('') +
								'<div class="cdx-tabs__indicator"></div>' +
							'</div></div>' +
							'<div class="cdx-tabs__content">' +
								'<div class="cdx-tabs__track">' +
									tabDefs.map(() => '<section class="cdx-tab" role="tabpanel" tabindex="-1"><div class="citizen-notifications__empty">没有新通知。</div></section>').join('') +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<footer class="citizen-notifications__footer">' +
						'<a class="citizen-notifications__see-all cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet" href="https://zh.wikipedia.org/wiki/Special:Notifications">查看全部</a>' +
						'<a class="citizen-notifications__prefs cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" href="https://zh.wikipedia.org/wiki/Special:Preferences#mw-prefsection-echo" aria-label="通知设置" title="通知设置">' + prefsSvg() + '</a>' +
					'</footer>' +
				'</div>';
			setupTabs();
			animateContentHeight();
		}

		function renderError() {
			if (!content) return;
			if (skeleton) skeleton.hidden = true;
			if (errorBox) errorBox.hidden = false;
		}

		function checkAllSvg() {
			return '<span class="cdx-icon cdx-icon--medium"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><g><path d="m.29 12.71 1.42-1.42 2.22 2.22 8.3-10.14 1.54 1.26-9.7 11.86zM12 10h5v2h-5zm-3 4h5v2H9zm6-8h5v2h-5z"></path></g></svg></span>';
		}

		function prefsSvg() {
			return '<span class="cdx-icon cdx-icon--medium"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><g><g transform="translate(10 10)"><path id="cdx-icon-settings-a" d="M1.5-10h-3l-1 6.5h5m0 7h-5l1 6.5h3"></path><use xlink:href="#cdx-icon-settings-a" transform="rotate(45)"></use><use xlink:href="#cdx-icon-settings-a" transform="rotate(90)"></use><use xlink:href="#cdx-icon-settings-a" transform="rotate(135)"></use></g><path d="M10 2.5a7.5 7.5 0 000 15 7.5 7.5 0 000-15v4a3.5 3.5 0 010 7 3.5 3.5 0 010-7"></path></g></svg></span>';
		}

		function renderRelativeTimeStr(ts) {
			const now = (Date.now() / 1000) | 0;
			const diff = now - ts;
			if (diff < 60) return '刚刚';
			if (diff < 3600) return Math.floor(diff / 60) + ' 分钟前';
			if (diff < 86400) return Math.floor(diff / 3600) + ' 小时前';
			if (diff < 30 * 86400) return Math.floor(diff / 86400) + ' 天前';
			return Math.floor(diff / (30 * 86400)) + ' 个月前';
		}

		if (errorBox) {
			const retry = errorBox.querySelector('.citizen-notifications__retry');
			if (retry) retry.addEventListener('click', () => { errorBox.hidden = true; skeleton.hidden = false; fetchNotifications(); });
		}

		function positionNotificationsCard() {
			if (!summary || !wrap) return;
			const card = wrap.querySelector('.citizen-menu__card');
			if (!card) return;
			wrap.style.position = 'static';
			card.style.position = 'absolute';
			card.style.zIndex = '1000';
			card.style.margin = '8px';
			if (window.matchMedia('(min-width: 1120px)').matches) {
				card.style.left = '100%';
				card.style.right = 'auto';
				card.style.top = 'auto';
				card.style.bottom = '0px';
			} else {
				card.style.removeProperty('left');
				card.style.removeProperty('right');
				card.style.removeProperty('bottom');
				card.style.removeProperty('top');
			}
			card.style.maxHeight = (window.innerHeight - 16) + 'px';
			const notif = card.querySelector('.citizen-notifications');
			if (notif) {
				notif.style.removeProperty('display');
				notif.style.removeProperty('flex-direction');
				notif.style.removeProperty('flex');
				notif.style.removeProperty('min-height');
			}
			const panel = card.querySelector('.citizen-notifications__panel');
			if (panel) {
				panel.style.height = 'auto';
				panel.style.maxHeight = (window.innerHeight - 16) + 'px';
			}
		}

		const details = document.getElementById('citizen-notifications-details');
		if (details) {
			details.addEventListener('toggle', () => {
				if (details.open) {
					positionNotificationsCard();
					if (!loaded) { loaded = true; fetchNotifications(); }
				}
			});
		}
	}

	function fetchSiteStats() {
		const api = wikiApi();
		fetch(`${api}?action=query&meta=siteinfo&siprop=statistics&format=json`)
			.then(r => r.json())
			.then(d => {
				const s = d.query && d.query.statistics;
				if (!s) return;
				const map = { articles: 'articles', images: 'images', users: 'users', edits: 'edits' };
				for (const k in map) {
					const el2 = document.getElementById('citizen-siteStats__count-' + map[k]);
					if (el2 && typeof s[k] !== 'undefined') el2.textContent = s[k].toLocaleString();
				}
			})
			.catch(() => {});
	}

	function renderRelativeTimes() {
		const now = Math.floor(Date.now() / 1000);
		document.querySelectorAll('[data-relative-time]').forEach(el => {
			const ts = parseInt(el.getAttribute('data-relative-time'), 10);
			if (!ts || isNaN(ts)) return;
			const diff = now - ts;
			let txt;
			if (diff < 60) txt = '刚刚';
			else if (diff < 3600) txt = Math.floor(diff / 60) + '分钟前';
			else if (diff < 86400) txt = Math.floor(diff / 3600) + '小时前';
			else if (diff < 30 * 86400) txt = Math.floor(diff / 86400) + '天前';
			else if (diff < 365 * 86400) txt = Math.floor(diff / (30 * 86400)) + '个月前';
			else txt = Math.floor(diff / (365 * 86400)) + '年前';
			el.textContent = txt;
		});
	}

	function setupDropdownDismiss() {
		document.addEventListener('click', e => {
			const inDropdown = e.target.closest('.citizen-dropdown');
			if (inDropdown) {
				const own = inDropdown.querySelector('.citizen-dropdown-details');
				document.querySelectorAll('.citizen-dropdown-details[open]').forEach(d => {
					if (d !== own) d.open = false;
				});
				return;
			}
			if (e.target.closest('#citizen-command-palette-overlay')) return;
			document.querySelectorAll('.citizen-dropdown-details[open]').forEach(d => d.open = false);
			if (window.__cvClosePalette) window.__cvClosePalette();
		});
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				document.querySelectorAll('.citizen-dropdown-details[open]').forEach(d => d.open = false);
				if (window.__cvClosePalette) window.__cvClosePalette();
			}
		});
	}

	function setupPreferencesPanel() {
		const content = document.getElementById('citizen-preferences-content');
		if (!content) return;

		['theme', 'font', 'width', 'autoHide', 'perf'].forEach(function (k) {
			const stored = readPref(k, null);
			if (stored !== null) applyPref(k, stored);
		});

		content.innerHTML = buildPrefsHtml();
		bindPrefs(content);
	}

	const PREF_CLASS = {
		theme: 'skin-theme-clientpref',
		font: 'citizen-feature-custom-font-size-clientpref',
		width: 'citizen-feature-custom-width-clientpref',
		autoHide: 'citizen-feature-autohide-navigation-clientpref',
		perf: 'citizen-feature-performance-mode-clientpref'
	};

	function applyPref(key, value) {
		const cls = PREF_CLASS[key];
		const html = document.documentElement;
		[...html.classList].forEach(function (c) {
			if (c === cls || c.indexOf(cls + '-') === 0) html.classList.remove(c);
		});
		html.classList.add(cls + '-' + value);
		try { localStorage.setItem('cv-pref-' + key, value); } catch (e) {}
	}

	function readPref(key, fallback) {
		try {
			const v = localStorage.getItem('cv-pref-' + key);
			return v === null ? fallback : v;
		} catch (e) { return fallback; }
	}

	function fontLabel(v) { return ({ small: '小', standard: '标准', large: '大', 'x-large': '特大' })[v] || '标准'; }
	function widthLabel(v) { return ({ standard: '标准', wide: '宽', full: '全宽' })[v] || '标准'; }

	function prefSvg(path) {
		return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><g><path d="' + path + '"></path></g></svg>';
	}
	const THEME_ICON = 'M1 7h7v2H1zm0 4h7v2H1zm0 4h18v2H1zM1 3h18v2H1z';

	function themeCard(id, val, label, scheme) {
		return '<div class="cdx-radio cdx-radio--status-default"><div class="cdx-radio__wrapper">' +
			'<input id="' + id + '" class="cdx-radio__input" type="radio" name="skin-theme" value="' + val + '">' +
			'<span class="cdx-radio__icon"></span>' +
			'<div class="cdx-label cdx-radio__label"><label class="cdx-label__label" for="' + id + '">' +
				'<span class="cdx-label__label__text">' +
					'<span class="citizen-preferences-card">' +
						'<span class="citizen-preferences-card__preview citizen-preferences-card__preview--theme" style="color-scheme: ' + scheme + ';">' +
							'<span class="cdx-icon cdx-icon--medium">' + prefSvg(THEME_ICON) + '</span>' +
						'</span>' +
						'<span class="citizen-preferences-card__label">' + label + '</span>' +
					'</span>' +
				'</span>' +
			'</label></div>' +
		'</div></div>';
	}

	function widthSvg(colX, colW) {
		return '<svg class="citizen-preferences-segmented__page" width="38" height="24" viewBox="0 0 38 24" aria-hidden="true">' +
			'<rect class="citizen-preferences-segmented__page-frame" x="0.75" y="0.75" width="36.5" height="22.5" rx="2.5"></rect>' +
			'<rect class="citizen-preferences-segmented__page-column" x="' + colX + '" y="4.5" width="' + colW + '" height="15" rx="1"></rect>' +
		'</svg>';
	}

	function segField(id, name, label, opts, currentLabel) {
		const items = opts.map(function (o) {
			let inner;
			if (o.fontSize) {
				inner = '<span class="citizen-preferences-segmented__sample" style="font-size: ' + o.fontSize + ';" aria-hidden="true">文</span>';
			} else {
				inner = widthSvg(o.svg[0], o.svg[1]);
			}
			return '<div class="cdx-radio cdx-radio--status-default"><div class="cdx-radio__wrapper">' +
				'<input id="' + name + '-' + o.value + '" class="cdx-radio__input" type="radio" name="' + name + '" value="' + o.value + '"' + (o.label === currentLabel ? ' checked' : '') + '>' +
				'<span class="cdx-radio__icon"></span>' +
				'<div class="cdx-label cdx-radio__label"><label class="cdx-label__label" for="' + name + '-' + o.value + '">' +
					'<span class="cdx-label__label__text">' +
						inner + ' <span class="citizen-preferences-segmented__srlabel">' + o.label + '</span>' +
					'</span>' +
				'</label></div>' +
			'</div></div>';
		}).join('');
		return '<fieldset class="cdx-field cdx-field--is-fieldset citizen-preferences-group">' +
			'<legend class="cdx-label"><span class="cdx-label__label"><span class="cdx-label__label__text">' +
				'<span class="citizen-preferences-group__labelrow"><span>' + label + '</span> <span class="citizen-preferences-group__readout" aria-hidden="true" data-readout="' + name + '">' + currentLabel + '</span></span>' +
			'</span></span>' +
			'</legend>' +
			'<div class="cdx-field__control">' +
				'<div class="citizen-preferences-segmented">' + items + '</div>' +
			'</div><div class="cdx-field__help-text"></div>' +
		'</fieldset>';
	}

	function toggleField(id, pref, label, desc, isOn, hide) {
		return '<span class="cdx-toggle-switch cdx-toggle-switch--align-switch citizen-preferences-group"' + (hide ? ' style="display: none;"' : '') + '>' +
			'<input id="' + id + '" class="cdx-toggle-switch__input" type="checkbox" role="switch" data-pref="' + pref + '"' + (isOn ? ' checked' : '') + '>' +
			'<span class="cdx-toggle-switch__switch"><span class="cdx-toggle-switch__switch__grip"></span></span>' +
			'<div class="cdx-label cdx-toggle-switch__label">' +
				'<label class="cdx-label__label" for="' + id + '"><span class="cdx-label__label__text">' + label + ' </span></label>' +
				'<span class="cdx-label__description">' + desc + '</span>' +
			'</div>' +
		'</span>';
	}

	function buildPrefsHtml() {
		const font     = fontLabel(readPref('font', 'standard'));
		const width    = widthLabel(readPref('width', 'standard'));
		const autoHide = readPref('autoHide', '0');
		const perf     = readPref('perf', '0');

		return '<section class="citizen-preferences-section">' +
			'<div class="citizen-preferences-section__heading">外观</div>' +
			'<div class="citizen-preferences-section__content">' +
				'<fieldset class="cdx-field cdx-field--is-fieldset citizen-preferences-group" id="skin-client-prefs-skin-theme">' +
					'<legend class="cdx-label"><span class="cdx-label__label"><span class="cdx-label__label__text">颜色</span></span>' +
					'<span class="cdx-label__description">切换浅色和深色模式</span></legend>' +
					'<div class="cdx-field__control"><div class="citizen-preferences-radio" style="--pref-columns: 3;">' +
						themeCard('cv-theme-os', 'os', '自动', 'light dark') +
						themeCard('cv-theme-day', 'day', '浅色', 'light') +
						themeCard('cv-theme-night', 'night', '深色', 'dark') +
					'</div></div>' +
				'</fieldset>' +
				segField('cv-font', 'font', '字体', [
					{ 'label': '小', 'value': 'small', 'fontSize': '0.875rem' },
					{ 'label': '标准', 'value': 'standard', 'fontSize': '1rem' },
					{ 'label': '大', 'value': 'large', 'fontSize': '1.125rem' },
					{ 'label': '特大', 'value': 'x-large', 'fontSize': '1.25rem' }
				], font) +
				segField('cv-width', 'width', '宽度', [
					{ 'label': '标准', 'value': 'standard', 'svg': [9.2, 19.6] },
					{ 'label': '宽', 'value': 'wide', 'svg': [5.35, 27.3] },
					{ 'label': '全宽', 'value': 'full', 'svg': [1.5, 35] }
				], width) +
			'</div>' +
		'</section>' +
		'<section class="citizen-preferences-section">' +
			'<div class="citizen-preferences-section__heading">行为</div>' +
			'<div class="citizen-preferences-section__content">' +
				toggleField('cv-autohide', 'autoHide', '自动隐藏导航', '向下滚动时隐藏导航栏', autoHide === '1', true) +
				toggleField('cv-perf', 'perf', '性能模式', '减少动画和视觉效果', perf === '1') +
			'</div>' +
		'</section>';
	}

	function bindPrefs(root) {
		root.querySelectorAll('input[name="skin-theme"]').forEach(function (r) {
			if (r.value === readPref('theme', 'os')) r.checked = true;
			r.addEventListener('change', function () { applyPref('theme', r.value); });
		});
		root.querySelectorAll('.citizen-preferences-segmented input[type="radio"]').forEach(function (r) {
			r.addEventListener('change', function () {
				const name = r.getAttribute('name');
				applyPref(name, r.value);
				const ro = root.querySelector('[data-readout="' + name + '"]');
				if (ro) ro.textContent = (name === 'width' ? widthLabel : fontLabel)(r.value);
			});
		});
		root.querySelectorAll('.cdx-toggle-switch__input').forEach(function (inp) {
			inp.addEventListener('change', function () { applyPref(inp.getAttribute('data-pref'), inp.checked ? '1' : '0'); });
		});
	}

	function isMacPlatform(nav) {
		if (!nav) return false;
		const platform = (nav.userAgentData && nav.userAgentData.platform) || nav.platform || '';
		return /mac|iphone|ipad/i.test(platform);
	}
	function isLetterPressed(event, letter) {
		if (/^[a-z]$/i.test(event.key)) return event.key.toLowerCase() === letter;
		return event.code === 'Key' + letter.toUpperCase();
	}
	function isAltGraphChar(event, isMac) {
		if (event.metaKey || !event.altKey || (event.key || '').length !== 1 || event.key === ' ') return false;
		if (typeof event.getModifierState === 'function' && event.getModifierState('AltGraph')) return true;
		return event.ctrlKey || isMac;
	}
	function isAccessKeyChord(event, isMac) {
		if (event.metaKey) return false;
		if (event.altKey && event.shiftKey && !event.ctrlKey) return true;
		return isMac && event.ctrlKey && event.altKey && !event.shiftKey;
	}
	function isFormField(element) {
		if (!(element instanceof HTMLElement)) return false;
		const name = element.nodeName.toLowerCase();
		const type = (element.getAttribute('type') || '').toLowerCase();
		return name === 'select' || name === 'textarea' ||
			(name === 'input' && type !== 'submit' && type !== 'reset' && type !== 'checkbox' && type !== 'radio') ||
			element.isContentEditable;
	}
	const OPEN_SHORTCUTS = [
		(event, isMac) => event.key === '/' &&
			!event.metaKey &&
			(!event.ctrlKey || isAltGraphChar(event, isMac)),
		(event) => (event.ctrlKey || event.metaKey) &&
			!event.altKey &&
			!event.shiftKey &&
			isLetterPressed(event, 'k'),
		(event, isMac) => isAccessKeyChord(event, isMac) && isLetterPressed(event, 'f')
	];

	function setupCommandPalette() {
		const summary = document.querySelector('#citizen-search-summary');
		if (!summary) return;

		let overlay = null;
		let listbox = null;
		let input = null;
		let clearBtn = null;
		let footerHints = null;
		let viewport = null;
		let resultsContainer = null;
		let items = [];
		let activeIdx = -1;
		let timer = null;
		let paletteOpen = false;
		let paletteGen = 0;
		let searchGen = 0;
		let appliedQuery = null;
		const commandPaletteSiteName = mw.config.get('wgSiteName') || '';

		function searchUrl(query) {
			const api = (mw.config.get('wgScriptPath') || '') + '/api.php';
			return api + '?action=query&list=search&format=json&srlimit=8&srwhat=text&srsearch=' + encodeURIComponent(query);
		}

		function searchPageUrl(query) {
			const script = (mw.config.get('wgScript') || '/index.php');
			return script + '?search=' + encodeURIComponent(query) + '&fulltext=1';
		}

		function searchIconSvg() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
				'<g><path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"></path></g></svg>';
		}

		const RECENT_ITEMS_KEY = 'skin-citizen-command-palette-recent-items';
		const MAX_RECENT_ITEMS = 5;

		function getRecentItems() {
			return (mw.storage.getObject(RECENT_ITEMS_KEY) || []).slice();
		}

		function saveRecentItem(item) {
			const items = mw.storage.getObject(RECENT_ITEMS_KEY) || [];
			const existingIndex = items.findIndex(i => i.id === item.id);
			if (existingIndex !== -1) items.splice(existingIndex, 1);
			items.unshift(item);
			if (items.length > MAX_RECENT_ITEMS) items.pop();
			mw.storage.setObject(RECENT_ITEMS_KEY, items);
		}

		function saveSearchQuery(query) {
			saveRecentItem({
				type: 'fulltext-search',
				id: 'citizen-command-palette-result-search-' + escapeId(query),
				label: query,
				url: searchPageUrl(query)
			});
		}

		function articlesSearchIconSvg() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" aria-hidden="true">' +
				'<g>' +
					'<path d="M7 0a2 2 0 00-2 2h9a2 2 0 012 2v12a2 2 0 002-2V2a2 2 0 00-2-2z"></path>' +
					'<path d="M10.8 15.6a4.6 4.7 0 01-2.3.6 4.6 4.7 0 113.7-1.9l2.8 3V4.9A1.9 1.9 0 0013.1 3H4a1.9 1.9 0 00-2 1.9V18a1.9 1.9 0 001.9 2H13a1.9 1.9 0 001.4-.6z"></path>' +
					'<circle cx="8.5" cy="11.5" r="3"></circle>' +
				'</g>' +
			'</svg>';
		}

		function clearIconSvg() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
				'<g><path d="M10 0a10 10 0 1010 10A10 10 0 0010 0m5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"></path></g>' +
			'</svg>';
		}

		function fulltextActionIconSvg() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
				'<g>' +
					'<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"></path>' +
					'<circle cx="10" cy="10" r="3"></circle>' +
				'</g>' +
			'</svg>';
		}

		function editActionIconSvg() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
				'<g><path d="m16.77 8 1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z"></path></g>' +
			'</svg>';
		}

		function documentIconSvg() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
				'<g><path d="M16 1H4a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2zM8 4h4v1H8zM13 4h1v1h-1zM5 4h2v1H5zm8 7H7v-1h6zm0 3H7v-1h6z"></path></g>' +
			'</svg>';
		}

		function actionThumbnail(iconSvg) {
			return '<span class="cdx-thumbnail citizen-command-palette-list-item__thumbnail">' +
				'<span class="cdx-thumbnail__placeholder">' +
					'<span class="cdx-icon cdx-icon--medium cdx-thumbnail__placeholder__icon--vue">' + iconSvg + '</span>' +
				'</span>' +
			'</span>';
		}

		function buildActionItems(query) {
			const isPageEditable = !!mw.config.get('wgRelevantPageIsProbablyEditable');
			const actionItems = [];

			const fulltext = document.createElement('li');
			fulltext.id = 'citizen-command-palette-item-fulltext-search';
			fulltext.setAttribute('role', 'option');
			fulltext.className = 'citizen-command-palette-list-item';
			fulltext.setAttribute('data-type', 'action');
			fulltext.innerHTML =
				'<a href="' + searchPageUrl(query) + '" class="citizen-command-palette-list-item__content">' +
					actionThumbnail(fulltextActionIconSvg()) +
					'<div class="citizen-command-palette-list-item__text">' +
						'<div class="citizen-command-palette-list-item__text__label">' + escapeHtml(query) + '</div>' +
						'<div class="citizen-command-palette-list-item__text__description"><bdi>在所有页面全文搜索</bdi></div>' +
					'</div>' +
					'<div class="citizen-command-palette-list-item__metadata">' +
						'<div class="citizen-command-palette-list-item__metadata__item citizen-command-palette-list-item__metadata__item--type">操作</div>' +
					'</div>' +
				'</a>';
			fulltext.querySelector('a').addEventListener('click', () => saveSearchQuery(query));
			actionItems.push(fulltext);

			if (isPageEditable) {
				const edit = document.createElement('li');
				edit.id = 'citizen-command-palette-item-page-edit';
				edit.setAttribute('role', 'option');
				edit.className = 'citizen-command-palette-list-item';
				edit.setAttribute('data-type', 'action');
				edit.innerHTML =
					'<a href="' + wikiUrl(query, { action: 'edit' }) + '" class="citizen-command-palette-list-item__content">' +
						actionThumbnail(editActionIconSvg()) +
						'<div class="citizen-command-palette-list-item__text">' +
							'<div class="citizen-command-palette-list-item__text__label">' + escapeHtml(query) + '</div>' +
							'<div class="citizen-command-palette-list-item__text__description"><bdi>创建或编辑页面</bdi></div>' +
						'</div>' +
						'<div class="citizen-command-palette-list-item__metadata">' +
							'<div class="citizen-command-palette-list-item__metadata__item citizen-command-palette-list-item__metadata__item--type">操作</div>' +
						'</div>' +
					'</a>';
				actionItems.push(edit);
			}
			return actionItems;
		}

		function buildOverlay() {
			const siteName = mw.config.get('wgSiteName') || '';
			const lang = (mw.config.get('wgContentLanguage') || 'zh');
			overlay = document.createElement('div');
			overlay.id = 'citizen-command-palette-overlay';
			overlay.className = 'citizen-command-palette-overlay';
			overlay.setAttribute('data-v-app', '');
			overlay.innerHTML =
				'<div class="citizen-command-palette-backdrop"></div>' +
				'<div class="citizen-command-palette" role="search" aria-label="Command palette" data-palette-layout="list">' +
					'<div class="citizen-command-palette-header">' +
						'<div class="citizen-command-palette-header__input-area">' +
						'<span class="cdx-icon cdx-icon--medium citizen-command-palette-header__icon">' + searchIconSvg() + '</span>' +
						'<div class="cdx-text-input cdx-text-input--clearable cdx-text-input--status-default citizen-command-palette-header__input">' +
							'<input class="cdx-text-input__input" role="combobox" aria-autocomplete="list" aria-label="搜索' + escapeHtml(siteName) + '内容" aria-controls="citizen-command-palette-listbox" aria-expanded="true" placeholder="搜索' + escapeHtml(siteName) + '内容" type="search" size="1">' +
							'<span class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__clear-icon">' + clearIconSvg() + '</span>' +
						'</div>' +
					'</div>' +
					'</div>' +
					'<div class="citizen-command-palette__body">' +
							'<div class="citizen-command-palette__body-viewport">' +
								'<div class="citizen-command-palette__results">' +
								'<div id="citizen-command-palette-listbox" class="citizen-command-palette-list" role="listbox" aria-label="Results" tabindex="-1"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="citizen-command-palette__footer">' +
						'<div id="citizen-command-palette-footer-hints" class="citizen-command-palette__footer-hints"></div>' +
					'</div>' +
				'</div>';

			const existing = document.querySelector('#citizen-command-palette-overlay');
			if (existing) existing.remove();
			document.body.appendChild(overlay);

			listbox = overlay.querySelector('#citizen-command-palette-listbox');
			resultsContainer = overlay.querySelector('.citizen-command-palette__results');
			input = overlay.querySelector('.cdx-text-input__input');
			clearBtn = overlay.querySelector('.cdx-text-input__clear-icon');
			footerHints = overlay.querySelector('#citizen-command-palette-footer-hints');
			viewport = overlay.querySelector('.citizen-command-palette__body-viewport');
			overlay.style.display = 'none';

			overlay.querySelector('.citizen-command-palette-backdrop').addEventListener('click', closePalette);
			input.addEventListener('keydown', e => {
				if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
			});
			input.addEventListener('input', () => {
				updateInputState();
				clearTimeout(timer);
				timer = setTimeout(() => runSearch(input.value), 220);
			});
			if (clearBtn) {
				clearBtn.addEventListener('click', () => {
					input.value = '';
					updateInputState();
					renderDefault();
					input.focus();
				});
			}
			resultsContainer.addEventListener('mouseover', e => {
				if (!items.length) return;
				const li = e.target.closest('.citizen-command-palette-list-item');
				if (!li) return;
				const idx = items.indexOf(li);
				if (idx !== -1 && idx !== activeIdx) { activeIdx = idx; highlight(); }
			});
		}

		function updateInputState() {
			const hasValue = input.value.length > 0;
			input.classList.toggle('cdx-text-input__input--has-value', hasValue);
			const wrapper = input.closest('.cdx-text-input');
			if (wrapper) {
				wrapper.classList.toggle('cdx-text-input--has-value', hasValue);
				wrapper.classList.toggle('cdx-text-input--clearable', true);
			}
		}

		function renderFooterHints(hasQuery) {
			if (!footerHints) return;
			const hints = hasQuery
				? [['选择', '↵'], ['导航', '↑↓'], ['清空', 'Esc']]
				: [['搜索', '↵'], ['帮助', '?'], ['关闭', 'Esc']];
			footerHints.innerHTML = hints.map(([label, key]) =>
				'<div class="citizen-keyboard-hint"><span class="citizen-keyboard-hint-label">' + label + '</span><kbd class="citizen-keyboard-hint-key">' + key + '</kbd></div>'
			).join('');
		}

		function ensureListbox() {
			Array.from(resultsContainer.children).forEach(child => {
				if (!child.classList.contains('citizen-command-palette-list')) child.remove();
			});
			let lb = resultsContainer.querySelector('.citizen-command-palette-list');
			if (!lb) {
				lb = document.createElement('div');
				lb.id = 'citizen-command-palette-listbox';
				lb.className = 'citizen-command-palette-list';
				lb.setAttribute('role', 'listbox');
				lb.setAttribute('aria-label', 'Results');
				lb.setAttribute('tabindex', '-1');
				resultsContainer.appendChild(lb);
			}
			listbox = lb;
			return lb;
		}

		function getPaletteBody() { return overlay ? overlay.querySelector('.citizen-command-palette__body') : null; }
		function pinBodyHeight() {
			const b = getPaletteBody();
			if (!b) return;
			const h = b.getBoundingClientRect().height;
			b.style.transition = 'none';
			b.style.height = h + 'px';
			void b.offsetHeight;
		}
		function animateBodyHeight() {
			const b = getPaletteBody();
			if (!b) return;
			const end = b.scrollHeight;
			b.style.transition = '';
			void b.offsetHeight;
			b.style.height = end + 'px';
			const finish = () => {
				b.removeEventListener('transitionend', finish);
				b.style.height = '';
			};
			b.addEventListener('transitionend', finish);
			setTimeout(finish, 450);
		}

		function renderDefault() {
			pinBodyHeight();
			appliedQuery = '';
			const recent = getRecentItems();
			if (!recent.length) {
				renderEmptyState();
				return;
			}
			ensureListbox();
			listbox.innerHTML = '';
			items = [];
			recent.forEach(item => {
				const li = document.createElement('li');
				li.setAttribute('role', 'option');
				li.className = 'citizen-command-palette-list-item';
				li.id = item.id || (item.url ? 'citizen-command-palette-recent-' + item.url : '');
				const desc = item.type === 'fulltext-search' ? '全文搜索' :
					(item.description || '上次访问');
				const thumbIcon = item.type === 'fulltext-search' ? fulltextActionIconSvg() : documentIconSvg();
				li.innerHTML =
					'<a href="' + item.url + '" class="citizen-command-palette-list-item__content">' +
						actionThumbnail(thumbIcon) +
						'<div class="citizen-command-palette-list-item__text">' +
							'<div class="citizen-command-palette-list-item__text__label">' + escapeHtml(item.label || '') + '</div>' +
							'<div class="citizen-command-palette-list-item__text__description"><bdi>' + escapeHtml(desc) + '</bdi></div>' +
						'</div>' +
					'</a>';
				listbox.appendChild(li);
				items.push(li);
			});
			activeIdx = 0;
			renderFooterHints(true);
			highlight();
			animateBodyHeight();
		}

		function renderNoResults(q) {
			pinBodyHeight();
			appliedQuery = q == null ? '' : q;
			ensureListbox();
			listbox.innerHTML = '';
			items = buildActionItems(q);
			items.forEach(li => listbox.appendChild(li));
			activeIdx = 0;
			renderFooterHints(true);
			highlight();
			animateBodyHeight();
		}

		function renderEmptyState() {
			pinBodyHeight();
			appliedQuery = '';
			const empty = document.createElement('div');
			empty.className = 'citizen-command-palette-empty-state';
			empty.setAttribute('role', 'status');
			empty.innerHTML =
				'<div class="citizen-command-palette-empty-state__icon"><span class="cdx-icon cdx-icon--medium">' + articlesSearchIconSvg() + '</span></div>' +
				'<div class="citizen-command-palette-empty-state__content">' +
					'<div class="citizen-command-palette-empty-state__title">搜索' + escapeHtml(commandPaletteSiteName) + '内容</div>' +
					'<div class="citizen-command-palette-empty-state__description">请输入要搜索的内容</div>' +
				'</div>';
			resultsContainer.innerHTML = '';
			resultsContainer.appendChild(empty);
			listbox = null;
			items = [];
			activeIdx = -1;
			renderFooterHints(false);
			animateBodyHeight();
		}

		function renderResults(res, q) {
			pinBodyHeight();
			appliedQuery = q == null ? '' : q;
			if (!res || !res.query || !res.query.search || !res.query.search.length) {
				renderNoResults(q);
				return;
			}
			ensureListbox();
			listbox.innerHTML = '';
			items = [];
			res.query.search.forEach(r => {
				const li = document.createElement('li');
				li.setAttribute('role', 'option');
				li.className = 'citizen-command-palette-list-item';
				li.setAttribute('data-type', 'page');
				const snippet = (r.snippet || '').replace(/<[^>]+>/g, ' ');
				const href = wikiUrl(r.title);
				li.innerHTML =
					'<a href="' + href + '" class="citizen-command-palette-list-item__content">' +
						actionThumbnail(documentIconSvg()) +
						'<div class="citizen-command-palette-list-item__text">' +
							'<div class="citizen-command-palette-list-item__text__label">' + escapeHtml(r.title) + '</div>' +
							'<div class="citizen-command-palette-list-item__text__description"><bdi>' + escapeHtml(snippet) + '</bdi></div>' +
						'</div>' +
					'</a>';
				li.querySelector('a').addEventListener('click', () => {
					saveRecentItem({
						type: 'page',
						id: 'citizen-command-palette-result-page-' + escapeId(r.title),
						label: r.title,
						url: href,
						description: ''
					});
				});
				listbox.appendChild(li);
				items.push(li);
			});
			buildActionItems(input.value).forEach(li => {
				listbox.appendChild(li);
				items.push(li);
			});
			activeIdx = 0;
			renderFooterHints(true);
			highlight();
			animateBodyHeight();
		}

		function applyUniformType() {
			if (!viewport) return;
			const types = items.map(li => li.getAttribute('data-type')).filter(Boolean);
			const uniform = types.length > 0 && types.every(t => t === types[0]);
			viewport.classList.toggle('citizen-command-palette__body-viewport--uniform-type', uniform);
		}

		function highlight() {
			applyUniformType();
			items.forEach((li, i) => li.classList.toggle('citizen-command-palette-list-item--highlighted', i === activeIdx));
			if (items[activeIdx]) {
				items[activeIdx].scrollIntoView({ block: 'nearest' });
				input.setAttribute('aria-activedescendant', items[activeIdx].id || '');
			}
		}

		function runSearch(q) {
			if (!q) { searchGen++; renderDefault(); return; }
			const gen = ++searchGen;
			fetch(searchUrl(q)).then(r => r.json()).then(res => {
				if (gen !== searchGen) return;
				renderResults(res, q);
			}).catch(() => {});
		}

		function clearTransitionClasses(el) {
			const base = el.classList.contains('citizen-command-palette-backdrop') ? 'citizen-command-palette-backdrop' : 'citizen-command-palette';
			el.classList.remove(
				base + '-enter-active', base + '-enter-from', base + '-enter-to',
				base + '-leave-active', base + '-leave-from', base + '-leave-to'
			);
		}

		function playTransition(el, kind, gen, done) {
			const base = el.classList.contains('citizen-command-palette-backdrop') ? 'citizen-command-palette-backdrop' : 'citizen-command-palette';
			clearTransitionClasses(el);
			const active = base + '-' + kind + '-active';
			const from = base + '-' + kind + '-from';
			const to = base + '-' + kind + '-to';
			el.classList.add(active, from);
			void el.offsetWidth;
			el.classList.remove(from);
			el.classList.add(to);
			let called = false;
			const finish = () => {
				if (called) return;
				called = true;
				if (gen === paletteGen) {
					el.classList.remove(active, to, from);
					if (done) done();
				}
			};
			el.addEventListener('transitionend', function h(e) {
				if (e.target !== el) return;
				el.removeEventListener('transitionend', h);
				finish();
			});
			setTimeout(finish, 600);
		}

		function openPalette() {
			if (!overlay) buildOverlay();
			const gen = ++paletteGen;
			paletteOpen = true;
			document.querySelectorAll('.citizen-dropdown-details[open]').forEach(d => d.open = false);
			overlay.style.display = '';
			document.body.classList.add('citizen-command-palette-open');
			input.value = '';
			renderDefault();
			const card = overlay.querySelector('.citizen-command-palette');
			const backdrop = overlay.querySelector('.citizen-command-palette-backdrop');
			playTransition(card, 'enter', gen);
			playTransition(backdrop, 'enter', gen);
			requestAnimationFrame(() => input.focus());
		}

		function closePalette() {
			if (!overlay || !paletteOpen) return;
			paletteOpen = false;
			const gen = ++paletteGen;
			if (summary) summary.focus();
			document.body.classList.remove('citizen-command-palette-open');
			const card = overlay.querySelector('.citizen-command-palette');
			const backdrop = overlay.querySelector('.citizen-command-palette-backdrop');
			playTransition(card, 'leave', gen);
			playTransition(backdrop, 'leave', gen, () => { overlay.style.display = 'none'; });
		}

		function togglePalette() {
			if (paletteOpen) closePalette();
			else openPalette();
		}

		summary.addEventListener('click', e => {
			e.preventDefault();
			togglePalette();
		});

		window.addEventListener('keydown', e => {
			const isMac = isMacPlatform(window.navigator);
			if (OPEN_SHORTCUTS.some(matches => matches(e, isMac)) && !isFormField(e.target)) {
				e.preventDefault();
				openPalette();
				return;
			}
			if (!paletteOpen) return;
			if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) { activeIdx = Math.min(activeIdx + 1, items.length - 1); highlight(); } }
			else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) { activeIdx = Math.max(activeIdx - 1, 0); highlight(); } }
			else if (e.key === 'Enter') {
				e.preventDefault();
				if (appliedQuery !== input.value) {
					saveSearchQuery(input.value);
					window.location.href = searchPageUrl(input.value);
					return;
				}
				const li = items[activeIdx];
				const a = li && li.querySelector('a');
				if (a) window.location.href = a.href;
			}
		}, true);
		window.__cvClosePalette = closePalette;
	}

	function escapeHtml(s) {
		const d = document.createElement('div');
		d.textContent = s == null ? '' : String(s);
		return d.innerHTML;
	}

	function diag(tag) {
		var header = document.querySelector('.vector-header-container');
		var drawer = document.querySelector('#citizen-drawer');
		var nav = document.querySelector('#citizen-main-menu nav#p-navigation, nav#p-navigation');
		var style = document.querySelector('style[data-citizen-vector]');
		var navCount = nav ? nav.querySelectorAll('a').length : 0;
		console.log('[citizen-vector][' + tag + ']',
			'header=' + (header ? 'OK' : 'NO'),
			'nav=' + (nav ? 'OK' : (drawer ? 'drawer-only' : 'NO')),
			'navLinks=' + navCount,
			'hasStyle=' + (style ? 'YES' : 'NO'),
			'inited=' + (window.__cvInited ? 'YES' : 'NO'));
	}
	function scheduleInit(retries) {
		diag('try-' + retries);
		if (window.__cvInited) { diag('already'); return; }
		try {
			if (init() === true) { diag('done'); return; }
		} catch (e) {
			console.error('[citizen-vector] init error:', e);
		}
		if (retries <= 0) { diag('giveup'); return; }
		setTimeout(function() { scheduleInit(retries - 1); }, 100);
	}

	function initMainPageLayout() {
		if (!(mw.config.get('wgIsMainPage') === true && mw.config.get('wgAction') === 'view')) return;
		document.body.classList.add('citizen-is-mainpage');
		var main = document.querySelector('main#content');
		var header = document.querySelector('header#citizen-page-header');
		var content = document.querySelector('div.citizen-body-container');
		if (main && header && content) {
			main.appendChild(header);
		}
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMainPageLayout);
	} else {
		initMainPageLayout();
	}

	function cvFixSaveDialogHeight() {
		if (!isEditorPage()) return;
		var tries = 0;
		(function waitForVe() {
			if (window.ve && ve.ui && ve.ui.MWSaveDialog && ve.ui.MWSaveDialog.prototype.setDimensions) {
				var proto = ve.ui.MWSaveDialog.prototype;
				if (proto.__cvHeightFixed) return;
				proto.__cvHeightFixed = true;
				var origSetDimensions = proto.setDimensions;
				proto.setDimensions = function () {
					var res = origSetDimensions.apply(this, arguments);
					var content = this.$content && this.$content[0];
					if (content && content.classList.contains('oo-ui-window-content-setup')
						&& !content.classList.contains('oo-ui-window-content-ready')) {

						this.__cvResizeTries = (this.__cvResizeTries || 0) + 1;
						if (this.__cvResizeTries <= 6 && !this.__cvResizeQueued) {
							this.__cvResizeQueued = true;
							var self = this;
							setTimeout(function () {
								self.__cvResizeQueued = false;
								try { self.updateSize(); } catch (e) {  }
							}, 300);
						}
					} else {
						this.__cvResizeTries = 0;
					}
					return res;
				};
				return;
			}
			if (++tries < 300) setTimeout(waitForVe, 100);
		})();
	}
	cvFixSaveDialogHeight();

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() { scheduleInit(40); });
	} else {
		scheduleInit(40);
	}

	bootPreferencesInjection();
}

function cvBoot() {
	cvInjectCSS();
	cvRun();
}
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', cvBoot);
} else {
	cvBoot();
}
