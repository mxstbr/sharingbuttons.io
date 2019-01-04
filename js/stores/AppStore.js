var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActions = require('../actions/AppActions');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('react/lib/Object.assign');

/**
 * DATA
 */
var _data = {
	"url": "http://sharingbuttons.io",
	"text": "Super fast and easy Social Media Sharing Buttons. No JavaScript. No tracking.",
	"icons": {
		"solid": true,
		"circle": false
	},
	"generalStyling": ".resp-sharing-button__link,\n.resp-sharing-button__icon {\n  display: inline-block\n}\n\n.resp-sharing-button__link {\n  text-decoration: none;\n  color: #fff;\n  margin: 0.5em\n}\n\n.resp-sharing-button {\n  border-radius: 5px;\n  transition: 25ms ease-out;\n  padding: 0.5em 0.75em;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif\n}\n\n.resp-sharing-button__icon svg {\n  width: 1em;\n  height: 1em;\n  margin-right: 0.4em;\n  vertical-align: top\n}\n\n.resp-sharing-button--small svg {\n  margin: 0;\n  vertical-align: middle\n}\n\n/* Non solid icons get a stroke */\n.resp-sharing-button__icon {\n  stroke: #fff;\n  fill: none\n}\n\n/* Solid icons get a fill */\n.resp-sharing-button__icon--solid,\n.resp-sharing-button__icon--solidcircle {\n  fill: #fff;\n  stroke: none\n}\n\n.resp-sharing-button--twitter {\n  background-color: #55acee\n}\n\n.resp-sharing-button--twitter:hover {\n  background-color: #2795e9\n}\n\n.resp-sharing-button--pinterest {\n  background-color: #bd081c\n}\n\n.resp-sharing-button--pinterest:hover {\n  background-color: #8c0615\n}\n\n.resp-sharing-button--facebook {\n  background-color: #3b5998\n}\n\n.resp-sharing-button--facebook:hover {\n  background-color: #2d4373\n}\n\n.resp-sharing-button--tumblr {\n  background-color: #35465C\n}\n\n.resp-sharing-button--tumblr:hover {\n  background-color: #222d3c\n}\n\n.resp-sharing-button--reddit {\n  background-color: #5f99cf\n}\n\n.resp-sharing-button--reddit:hover {\n  background-color: #3a80c1\n}\n\n.resp-sharing-button--google {\n  background-color: #dd4b39\n}\n\n.resp-sharing-button--google:hover {\n  background-color: #c23321\n}\n\n.resp-sharing-button--linkedin {\n  background-color: #0077b5\n}\n\n.resp-sharing-button--linkedin:hover {\n  background-color: #046293\n}\n\n.resp-sharing-button--email {\n  background-color: #777\n}\n\n.resp-sharing-button--email:hover {\n  background-color: #5e5e5e\n}\n\n.resp-sharing-button--xing {\n  background-color: #1a7576\n}\n\n.resp-sharing-button--xing:hover {\n  background-color: #114c4c\n}\n\n.resp-sharing-button--whatsapp {\n  background-color: #25D366\n}\n\n.resp-sharing-button--whatsapp:hover {\n  background-color: #1da851\n}\n\n.resp-sharing-button--hackernews {\nbackground-color: #FF6600\n}\n.resp-sharing-button--hackernews:hover, .resp-sharing-button--hackernews:focus {   background-color: #FB6200 }\n\n.resp-sharing-button--vk {\n  background-color: #507299\n}\n\n.resp-sharing-button--vk:hover {\n  background-color: #43648c\n}",
	"sizes": {
		"small": false,
		"medium": false,
		"large": true
	},
	"networks": {
		'facebook': {
			'visible': true,
			'name': 'Facebook',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.5H14.5V5.6c0-.9.6-1.1 1-1.1h3V.54L14.17.53C10.24.54 9.5 3.48 9.5 5.37V7.5h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm3.6 11.5h-2.1v7h-3v-7h-2v-2h2V8.34c0-1.1.35-2.82 2.65-2.82h2.35v2.3h-1.4c-.25 0-.6.13-.6.66V9.5h2.34l-.24 2z"/></svg>'
			},
			'style': '.resp-sharing-button--facebook {\n  background-color: #3b5998;\n  border-color: #3b5998;\n}\n\n.resp-sharing-button--facebook:hover,\n.resp-sharing-button--facebook:active {\n  background-color: #2d4373;\n  border-color: #2d4373;\n}',
			'scriptSize': 73.3,
			'requests': 3
		},
		'twitter': {
			'visible': true,
			'name': 'Twitter',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.4 4.83c-.8.37-1.5.38-2.22.02.94-.56.98-.96 1.32-2.02-.88.52-1.85.9-2.9 1.1-.8-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.12 1.04-3.78-.2-7.12-2-9.37-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.73-.03-1.43-.23-2.05-.57v.06c0 2.2 1.57 4.03 3.65 4.44-.67.18-1.37.2-2.05.08.57 1.8 2.25 3.12 4.24 3.16-1.95 1.52-4.36 2.16-6.74 1.88 2 1.3 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93l-.02-.6c.9-.63 1.96-1.22 2.57-2.14z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z"/><circle cx="12" cy="12" r="11.5"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.26 9.38v.34c0 3.48-2.64 7.5-7.48 7.5-1.48 0-2.87-.44-4.03-1.2 1.37.17 2.77-.2 3.9-1.08-1.16-.02-2.13-.78-2.46-1.83.38.1.8.07 1.17-.03-1.2-.24-2.1-1.3-2.1-2.58v-.05c.35.2.75.32 1.18.33-.7-.47-1.17-1.28-1.17-2.2 0-.47.13-.92.36-1.3C7.94 8.85 9.88 9.9 12.06 10c-.04-.2-.06-.4-.06-.6 0-1.46 1.18-2.63 2.63-2.63.76 0 1.44.3 1.92.82.6-.12 1.95-.27 1.95-.27-.35.53-.72 1.66-1.24 2.04z"/></svg>'
			},
			'style': '.resp-sharing-button--twitter {\n  background-color: #55acee;\n  border-color: #55acee;\n}\n\n.resp-sharing-button--twitter:hover,\n.resp-sharing-button--twitter:active {\n  background-color: #2795e9;\n  border-color: #2795e9;\n}',
			'scriptSize': 52.7,
			'requests': 4
		},
		'google': {
			'visible': true,
			'name': 'Google+',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.85 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.32-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.84 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.33-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><ellipse cx="10.24" cy="8.5" transform="rotate(-45 10.234 8.5)" rx="2.89" ry="3.08"/><path d="M9.85 5.5h4.2"/><ellipse cx="10.24" cy="16.32" rx="4.48" ry="2.59"/><path d="M11.85 11.1c-.93 2.35 2.86 1.64 2.86 5.22M17.5 7v5M20 9.5h-5"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.65 8.6c-.02-.66-.3-1.3-.8-1.8S10.67 6 9.98 6c-.63 0-1.2.25-1.64.68-.45.44-.68 1.05-.66 1.7.02.68.3 1.32.8 1.8.96.97 2.6 1.04 3.5.14.45-.45.7-1.05.67-1.7zm-2.5 5.63c-2.14 0-3.96.95-3.96 2.1 0 1.12 1.8 2.08 3.94 2.08s3.98-.93 3.98-2.06c0-1.14-1.82-2.1-3.98-2.1z"/><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm-1.84 19.4c-2.8 0-4.97-1.35-4.97-3.08s2.15-3.1 4.94-3.1c.84 0 1.6.14 2.28.36-.57-.4-1.25-.86-1.3-1.7-.26.06-.52.1-.8.1-.95 0-1.87-.38-2.57-1.08-.67-.68-1.06-1.55-1.1-2.48-.02-.94.32-1.8.96-2.45.65-.63 1.5-.93 2.4-.92V5h3.95v1h-1.53l.12.1c.67.67 1.06 1.55 1.1 2.48.02.93-.32 1.8-.97 2.45-.16.15-.33.3-.5.4-.2.6.05.8.83 1.33.9.6 2.1 1.42 2.1 3.56 0 1.73-2.17 3.1-4.96 3.1zM20 10h-2v2h-1v-2h-2V9h2V7h1v2h2v1z"/></svg>'
			},
			'style': '.resp-sharing-button--google {\n  background-color: #dd4b39;\n  border-color: #dd4b39;\n}\n\n.resp-sharing-button--google:hover,\n.resp-sharing-button--google:active {\n  background-color: #c23321;\n  border-color: #c23321;\n}',
			'scriptSize': 15.1,
			'requests': 1
		},
		'tumblr': {
			'visible': true,
			'name': 'Tumblr',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M12.5 4.5v3h2v2h-2v3.72c0 2.47 1.48 2.7 3 1.7v2.7c-4.1 1.92-6-.62-6-3.6V9.5h-2V8.14c.55-.18 1.24-.43 1.63-.77.4-.33.7-.73.94-1.2.24-.46.4-.95.5-1.67h1.93z"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M15.492,17.616C11.401,19.544,9.5,17,9.5,14.031 V9.5h-2V8.142c0.549-0.178,1.236-0.435,1.627-0.768c0.393-0.334,0.707-0.733,0.943-1.2c0.238-0.467,0.401-0.954,0.49-1.675H12.5v3h2 v2h-2v3.719c0,2.468,1.484,2.692,2.992,1.701V17.616z"/>\n     </svg>'
			},
			'style': '.resp-sharing-button--tumblr {\n  background-color: #35465C;\n  border-color: #35465C;\n}\n\n.resp-sharing-button--tumblr:hover,\n.resp-sharing-button--tumblr:active {\n  background-color: #222d3c;\n  border-color: #222d3c;\n}',
			'scriptSize': 11.6,
			'requests': 1
		},
		'email': {
			'visible': true,
			'name': 'E-Mail',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-3-9.5L12 14 3.5 8.5m0 7.5L7 14m13.5 2L17 14"/></svg>',
				'solid' : '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.5 16c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5v8zm-2-7.5L12 13 6.5 8.5m11 6l-4-2.5m-7 2.5l4-2.5"/><circle cx="12" cy="12" r="11.5"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm8 16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8z"/><path d="M17.9 8.18c-.2-.2-.5-.24-.72-.07L12 12.38 6.82 8.1c-.22-.16-.53-.13-.7.08s-.15.53.06.7l3.62 2.97-3.57 2.23c-.23.14-.3.45-.15.7.1.14.25.22.42.22.1 0 .18-.02.27-.08l3.85-2.4 1.06.87c.1.04.2.1.32.1s.23-.06.32-.1l1.06-.9 3.86 2.4c.08.06.17.1.26.1.17 0 .33-.1.42-.25.15-.24.08-.55-.15-.7l-3.57-2.22 3.62-2.96c.2-.2.24-.5.07-.72z"/></svg>'
			},
			'style': '.resp-sharing-button--email {\n  background-color: #777777;\n  border-color: #777777;\n}\n\n.resp-sharing-button--email:hover,\n.resp-sharing-button--email:active {\n  background-color: #5e5e5e;\n  border-color: #5e5e5e;\n}',
			'scriptSize': 0,
			'requests': 0,
			'openInThisWindow': true
		},
		'pinterest': {
			'visible': true,
			'name': 'Pinterest',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z"/></svg>',
				'circle': '\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M8 11.2c-.15-.32-.25-.72-.25-1.22 0-2.32 1.74-4.4 4.53-4.4 2.47 0 3.82 1.5 3.82 3.52 0 2.64-1.17 4.88-2.9 4.88-.97 0-1.7-.8-1.46-1.77.28-1.14.8-2.4.8-3.23 0-.76-.4-1.38-1.23-1.38-.95 0-1.74 1-1.74 2.37 0 .86.3 1.45.3 1.45l-1.2 5c-.34 1.5-.04 3.33-.02 3.5.02.1.16.15.22.06.1-.12 1.26-1.56 1.66-3l.66-2.53c.32.6 1.25 1.14 2.24 1.14 2.95 0 4.95-2.7 4.95-6.3 0-2.73-2.3-5.27-5.82-5.27-4.36 0-6.57 3.14-6.57 5.75 0 .85.18 1.64.53 2.28l1.5-.8z"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm1.4 15.56c-1 0-1.94-.53-2.25-1.14l-.65 2.52c-.4 1.45-1.57 2.9-1.66 3-.06.1-.2.07-.22-.04-.02-.2-.32-2 .03-3.5l1.18-5s-.3-.6-.3-1.46c0-1.36.8-2.37 1.78-2.37.85 0 1.25.62 1.25 1.37 0 .85-.53 2.1-.8 3.27-.24.98.48 1.78 1.44 1.78 1.73 0 2.9-2.24 2.9-4.9 0-2-1.35-3.5-3.82-3.5-2.8 0-4.53 2.07-4.53 4.4 0 .5.1.9.25 1.23l-1.5.82c-.36-.64-.54-1.43-.54-2.28 0-2.6 2.2-5.74 6.57-5.74 3.5 0 5.82 2.54 5.82 5.27 0 3.6-2 6.3-4.96 6.3z"/></svg>'
			},
			'style': '.resp-sharing-button--pinterest {\n  background-color: #bd081c;\n  border-color: #bd081c;\n}\n\n.resp-sharing-button--pinterest:hover,\n.resp-sharing-button--pinterest:active {\n  background-color: #8c0615;\n  border-color: #8c0615;\n}',
			'scriptSize': 12.9,
			'requests': 3
		},
		'linkedin': {
			'visible': false,
			'name': 'LinkedIn',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5h-.04c-1.5 0-2.5-1.18-2.5-2.48 0-1.33 1.02-2.4 2.56-2.4s2.5 1.1 2.52 2.43c0 1.3-.98 2.45-2.55 2.45zm11.5 6c-1.1 0-2 .9-2 2v7h-5s.06-12 0-13h5V10s1.55-1.46 3.94-1.46c2.96 0 5.06 2.15 5.06 6.3v6.66h-5v-7c0-1.1-.9-2-2-2z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15 12.5c-.28 0-.5.22-.5.5v3.5h-3s.03-6.48 0-7h3v.83s.46-.75 1.7-.75c1.56 0 2.3 1.12 2.3 3.3v3.62h-3V13c0-.28-.23-.5-.5-.5zm-7.5-3h2v7h-2z"/><circle cx="8.5" cy="6.5" r="1"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M9.5,16.5h-2v-7h2V16.5z M8.5,7.5 c-0.553,0-1-0.448-1-1c0-0.552,0.447-1,1-1s1,0.448,1,1C9.5,7.052,9.053,7.5,8.5,7.5z M18.5,16.5h-3V13c0-0.277-0.225-0.5-0.5-0.5 c-0.276,0-0.5,0.223-0.5,0.5v3.5h-3c0,0,0.031-6.478,0-7h3v0.835c0,0,0.457-0.753,1.707-0.753c1.55,0,2.293,1.12,2.293,3.296V16.5z" />\n    </svg>'
			},
			'style': '.resp-sharing-button--linkedin {\n  background-color: #0077b5;\n  border-color: #0077b5;\n}\n\n.resp-sharing-button--linkedin:hover,\n.resp-sharing-button--linkedin:active {\n  background-color: #046293;\n  border-color: #046293;\n}',
			'scriptSize': 47.7,
			'requests': 2
		},
		'reddit': {
			'visible': false,
			'name': 'Reddit',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><ellipse cx="12" cy="15" rx="9.5" ry="6.5"/><path d="M15.54 17.88c-.96.55-2.2.88-3.54.88-1.35 0-2.6-.33-3.55-.9"/><circle cx="16" cy="13.5" r="1.5"/><circle cx="8" cy="13.5" r="1.5"/><path d="M18.74 10.42C19.14 9.58 20 9 21 9c1.38 0 2.5 1.12 2.5 2.5 0 1.25-.92 2.3-2.12 2.47"/><circle cx="20" cy="4.5" r="2.5"/><path d="M5.26 10.42C4.86 9.58 4 9 3 9 1.62 9 .5 10.12.5 11.5c0 1.25.92 2.3 2.12 2.47M12 8.5s-.13-7.4 5.5-4"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 13.37C1.5 13.07 1 12.35 1 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.05zm3.7.13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.8 4.8c-1.08.63-2.42.96-3.8.96-1.4 0-2.74-.34-3.8-.95-.24-.13-.32-.44-.2-.68.15-.24.46-.32.7-.18 1.83 1.06 4.76 1.06 6.6 0 .23-.13.53-.05.67.2.14.23.06.54-.18.67zm.2-2.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.7-2.13c-.38-1.16-1.2-2.2-2.3-3.05.38-.5.97-.82 1.6-.82 1.1 0 2 .9 2 2 0 .84-.53 1.57-1.3 1.87z"/></svg>',
				'circle': '\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><ellipse cx="12" cy="14.37" rx="6.2" ry="4.24"/><path d="M14.3 16.25c-.62.36-1.42.57-2.3.57-.88 0-1.7-.2-2.32-.58"/><circle cx="14.61" cy="13.39" r=".98"/><circle cx="9.39" cy="13.39" r=".98"/><path d="M16.4 11.38c.26-.55.82-.92 1.47-.92.9 0 1.63.73 1.63 1.63 0 .8-.6 1.47-1.38 1.6"/><circle cx="17.22" cy="7.52" r="1.63"/><path d="M7.6 11.38c-.26-.54-.82-.92-1.47-.92-.9 0-1.63.73-1.63 1.63 0 .8.6 1.47 1.38 1.6M12 10.12s-.08-4.82 3.6-2.6"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="9.391" cy="13.392" r=".978"/><path d="M14.057 15.814c-1.14.66-2.987.655-4.122-.004-.238-.138-.545-.058-.684.182-.13.24-.05.545.19.685.72.417 1.63.646 2.568.646.93 0 1.84-.228 2.558-.642.24-.13.32-.44.185-.68-.14-.24-.445-.32-.683-.18zM5 12.086c0 .41.23.78.568.978.27-.662.735-1.264 1.353-1.774-.2-.207-.48-.334-.79-.334-.62 0-1.13.507-1.13 1.13z"/><path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm6.673 14.055c.01.104.022.208.022.314 0 2.61-3.004 4.73-6.695 4.73s-6.695-2.126-6.695-4.74c0-.105.013-.21.022-.313C4.537 13.73 4 12.97 4 12.08c0-1.173.956-2.13 2.13-2.13.63 0 1.218.29 1.618.757 1.04-.607 2.345-.99 3.77-1.063.057-.803.308-2.33 1.388-2.95.633-.366 1.417-.323 2.322.085.302-.81 1.076-1.397 1.99-1.397 1.174 0 2.13.96 2.13 2.13 0 1.177-.956 2.133-2.13 2.133-1.065 0-1.942-.79-2.098-1.81-.734-.4-1.315-.506-1.716-.276-.6.346-.818 1.395-.88 2.087 1.407.08 2.697.46 3.728 1.065.4-.468.987-.756 1.617-.756 1.17 0 2.13.953 2.13 2.13 0 .89-.54 1.65-1.33 1.97z"/><circle cx="14.609" cy="13.391" r=".978"/><path d="M17.87 10.956c-.302 0-.583.128-.79.334.616.51 1.082 1.112 1.352 1.774.34-.197.568-.566.568-.978 0-.623-.507-1.13-1.13-1.13z"/></svg>'
			},
			'style': '.resp-sharing-button--reddit {\n  background-color: #5f99cf;\n  border-color: #5f99cf;\n}\n\n.resp-sharing-button--reddit:hover,\n.resp-sharing-button--reddit:active {\n  background-color: #3a80c1;\n  border-color: #3a80c1;\n}',
			'scriptSize': 0.2,
			'requests': 0
		},
		'xing': {
			'visible': false,
			'name': 'XING',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.8 4.5h-5l3 5.5-4 6.5h5l4-6.5zm16.7-4H18l-8 14 5.3 9h5.4l-5.2-9z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.2 9.7l-3-5.4C7.2 4 7 4 6.8 4h-5c-.3 0-.4 0-.5.2v.5L4 10 .4 16v.5c0 .2.2.3.4.3h5c.3 0 .4 0 .5-.2l4-6.6v-.5zM24 .2l-.5-.2H18s-.2 0-.3.3l-8 14v.4l5.2 9c0 .2 0 .3.3.3h5.4s.3 0 .4-.2c.2-.2.2-.4 0-.5l-5-8.8L24 .7V.2z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M8.4 8.5h-3L7 11.3l-2.2 3.2h3l2.3-3.2zm10-3h-3.2l-5 8.5 3.2 5.5h3.3l-3-5.5z"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM7.8 14.5h-3L7 11.3 5.3 8.5h3l1.8 2.8L8 14.5zm9 5h-3.4l-3-5.5L15 5.5h3.2L13.6 14l3 5.5z"/></svg>'
			},
			'style': '.resp-sharing-button--xing {\n  background-color: #1a7576;\n  border-color: #1a7576;\n}\n\n.resp-sharing-button--xing:hover\n.resp-sharing-button--xing:active {\n  background-color: #114C4C;\n  border-color: #114C4C;\n}',
			'scriptSize': 4.6,
			'requests': 3
		},
		'whatsapp': {
			'visible': false,
			'name': 'WhatsApp',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-width="1px" d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="12" r="11.5"/><path stroke-width="1px" d="M17.6 6.2c-1.5-1.5-3.4-2.3-5.5-2.3-4.3 0-7.8 3.5-7.8 7.8 0 1.4.4 2.7 1 3.9l-1.1 4 4.1-1.1c1.1.6 2.4.9 3.7.9 4.3 0 7.8-3.5 7.8-7.8.1-2-.7-3.9-2.2-5.4zm-5.5 11.9c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2.4.6.7-2.4-.2-.2c-.6-1-1-2.2-1-3.4 0-3.6 2.9-6.5 6.5-6.5 1.7 0 3.3.7 4.6 1.9 1.2 1.2 1.9 2.8 1.9 4.6-.1 3.5-3 6.4-6.6 6.4zm3.5-4.8c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.4.1-.1.2-.5.6-.6.8-.1.1-.2.1-.4 0s-.8-.3-1.6-1c-.6-.5-1-1.2-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3s.1-.2.2-.3c.1-.1 0-.2 0-.3s-.4-1.1-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4s-.3 0-.5.2-.7.7-.7 1.6c0 1 .7 1.9.8 2s1.4 2.1 3.3 2.9c.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1 1.1-.5 1.3-.9.2-.5.2-.8.1-.9 0-.2-.2-.3-.4-.4z"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path d="m12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 3.8c2.2 0 4.2 0.9 5.7 2.4 1.6 1.5 2.4 3.6 2.5 5.7 0 4.5-3.6 8.1-8.1 8.1-1.4 0-2.7-0.4-3.9-1l-4.4 1.1 1.2-4.2c-0.8-1.2-1.1-2.6-1.1-4 0-4.5 3.6-8.1 8.1-8.1zm0.1 1.5c-3.7 0-6.7 3-6.7 6.7 0 1.3 0.3 2.5 1 3.6l0.1 0.3-0.7 2.4 2.5-0.7 0.3 0.099c1 0.7 2.2 1 3.4 1 3.7 0 6.8-3 6.9-6.6 0-1.8-0.7-3.5-2-4.8s-3-2-4.8-2zm-3 2.9h0.4c0.2 0 0.4-0.099 0.5 0.3s0.5 1.5 0.6 1.7 0.1 0.2 0 0.3-0.1 0.2-0.2 0.3l-0.3 0.3c-0.1 0.1-0.2 0.2-0.1 0.4 0.2 0.2 0.6 0.9 1.2 1.4 0.7 0.7 1.4 0.9 1.6 1 0.2 0 0.3 0.001 0.4-0.099s0.5-0.6 0.6-0.8c0.2-0.2 0.3-0.2 0.5-0.1l1.4 0.7c0.2 0.1 0.3 0.2 0.5 0.3 0 0.1 0.1 0.5-0.099 1s-1 0.9-1.4 1c-0.3 0-0.8 0.001-1.3-0.099-0.3-0.1-0.7-0.2-1.2-0.4-2.1-0.9-3.4-3-3.5-3.1s-0.8-1.1-0.8-2.1c0-1 0.5-1.5 0.7-1.7s0.4-0.3 0.5-0.3z"/></svg>'
			},
			'style':'.resp-sharing-button--whatsapp {\n  background-color: #25D366;\n  border-color: #25D366;\n}\n\n.resp-sharing-button--whatsapp:hover,\n.resp-sharing-button--whatsapp:active {\n  background-color: #1DA851;\n  border-color: #1DA851;\n}',
			'scriptSize': 15.1,
			'requests': 1
		},
		'hackernews': {
			'visible': false,
			'name': 'Hacker News',
			'icons': {
				'normal': '\n			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><path stroke-width="5px" fill-rule="evenodd" d="M60.94 82.314L17 0h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L103.49 0h18.69L77.84 83.308v53.087h-16.9v-54.08z"></path></svg>',
				'solid': '\n			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><path fill-rule="evenodd" d="M60.94 82.314L17 0h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L103.49 0h18.69L77.84 83.308v53.087h-16.9v-54.08z"></path></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="122.5"/><path fill-rule="evenodd" stroke-width="10px" d="M128 256c70.692 0 128-57.308 128-128C256 57.308 198.692 0 128 0 57.308 0 0 57.308 0 128c0 70.692 57.308 128 128 128zm-9.06-113.686L75 60h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L161.49 60h18.69l-44.34 83.308v53.087h-16.9v-54.08z"/></svg>',
				'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill-rule="evenodd" d="M128 256c70.692 0 128-57.308 128-128C256 57.308 198.692 0 128 0 57.308 0 0 57.308 0 128c0 70.692 57.308 128 128 128zm-9.06-113.686L75 60h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L161.49 60h18.69l-44.34 83.308v53.087h-16.9v-54.08z"/></svg>'
			},
			'style': '.resp-sharing-button--hackernews {\n  background-color: #FF6600;\n  border-color: #FF6600;\n}\n\n.resp-sharing-button--hackernews:hover\n.resp-sharing-button--hackernews:active {\n  background-color: #FB6200;\n  border-color: #FB6200;\n}',
			'scriptSize': 4.6,
			'requests': 3
		},
    'vk': {
			'visible': false,
			'name': 'VK',
      'icons': {
    		'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-width="1.5px" d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z"/></svg>',
    		'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z"/></svg>',
    		'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path stroke-width="1.5px" d="M20.44 7.62h-2.9c-.24 0-.463.133-.577.347 0 0-1.156 2.13-1.528 2.848-1 1.932-1.647 1.326-1.647.43V8.152c0-.537-.436-.972-.973-.972h-2.182c-.604-.044-1.188.227-1.543.717 0 0 1.106-.18 1.106 1.313 0 .37.02 1.434.035 2.328.008.355-.274.65-.63.656-.187.003-.365-.074-.49-.213-.892-1.24-1.632-2.585-2.202-4.004-.1-.216-.316-.355-.556-.355H3.716c-.248 0-.45.198-.452.445 0 .055.01.108.028.16.8 2.195 4.25 9.094 8.185 9.094h1.655c.362 0 .654-.294.654-.655v-1c0-.356.29-.643.646-.643.162 0 .32.063.438.175l1.98 1.862c.18.166.413.26.658.26h2.604c1.255 0 1.255-.872.57-1.547-.48-.474-2.22-2.308-2.22-2.308-.307-.32-.336-.813-.07-1.166.563-.742 1.482-1.95 1.873-2.47.534-.707 1.498-2.21.176-2.21z"/></svg>',
    		'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 6.352 5.15 11.5 11.5 11.5 6.352 0 11.5-5.148 11.5-11.5C23.5 5.65 18.352.5 12 .5zm8.11 16.82h-2.603c-.244 0-.48-.094-.658-.26l-1.98-1.862c-.118-.112-.276-.175-.438-.175-.355 0-.646.287-.646.643v1c0 .36-.292.654-.654.654h-1.655c-3.935 0-7.385-6.898-8.185-9.093-.018-.052-.028-.105-.028-.16.002-.247.204-.445.452-.445h2.637c.24 0 .456.14.556.355.57 1.42 1.31 2.764 2.2 4.004.126.14.304.217.49.214.357-.006.64-.3.63-.656-.014-.894-.034-1.958-.034-2.328 0-1.493-1.106-1.313-1.106-1.313.355-.49.94-.76 1.543-.717h2.182c.537 0 .974.435.974.972v3.093c0 .896.646 1.502 1.646-.43.37-.718 1.527-2.848 1.527-2.848.114-.214.337-.347.577-.347h2.9c1.323 0 .358 1.502-.175 2.21-.392.52-1.31 1.727-1.873 2.47-.267.353-.238.845.07 1.165 0 0 1.74 1.834 2.22 2.31.685.673.685 1.545-.57 1.545z"/></svg>'
    	},
			'style': '.resp-sharing-button--vk {\n  background-color: #507299;\n  border-color: #507299;\n}\n\n.resp-sharing-button--vk:hover\n.resp-sharing-button--vk:active {\n  background-color: #43648c;\n  border-color: #43648c;\n}',
			'scriptSize': 6.3,
			'requests': 3
		},
    'telegram': {
      'visible': false,
      'name': 'Telegram',
      'icons': {
        'normal': '\n     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-width="1.5px" d="M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z"/></svg>',
        'solid': '\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z"/></svg>',
        'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M2.505 11.053c-.31.118-.505.738-.505.738s.203.62.513.737l3.636 1.355 1.417 4.557a.787.787 0 0 0 1.25.375l2.115-1.72a.29.29 0 0 1 .353-.01L15.1 19.85a.786.786 0 0 0 .746.095.786.786 0 0 0 .487-.573l2.793-13.426a.787.787 0 0 0-1.054-.893l-15.568 6z"/></svg>',
        'solidcircle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 23.5c6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5.5 5.65.5 12 5.65 23.5 12 23.5zM2.505 11.053c-.31.118-.505.738-.505.738s.203.62.513.737l3.636 1.355 1.417 4.557a.787.787 0 0 0 1.25.375l2.115-1.72a.29.29 0 0 1 .353-.01L15.1 19.85a.786.786 0 0 0 .746.095.786.786 0 0 0 .487-.573l2.793-13.426a.787.787 0 0 0-1.054-.893l-15.568 6z" fill-rule="evenodd"/></svg>'
      },
      'style': '.resp-sharing-button--telegram {\n  background-color: #54A9EB;\n}\n\n.resp-sharing-button--telegram:hover {\n  background-color: #4B97D1;}',
      'scriptSize': 4.6,
      'requests': 3
    },
	}
}

var AppStore = assign({}, EventEmitter.prototype, {
	// Returns the current data
	getData: function() {
		this._updateLinks();
		return _data;
	},
	/**
	 * Toggles a social network
	 * @param  {string} name - The name of the network to be toggled
	 */
	_toggleNetwork: function(name) {
		_data.networks[name].visible = !_data.networks[name].visible;
	},
	/**
	 * Changes the URL that is shared on click
	 * @param {string} url - The url to be shared
	 */
	_setURL: function(url) {
		_data.url = url;
		this._updateLinks();
	},
	/**
	 * Changes the text that is shared on click
	 * @param {string} text - The text to be shared
	 */
	_setText: function(text) {
		_data.text = text;
		this._updateLinks();
	},
	/**
	 * @param  {string} size - The size of the buttons. Has to be "small", "medium" or "large"
	 */
	_changeSize: function(size) {
		var sizes = _data.sizes;

		for (var option in sizes) {
			if (sizes[option] === true) {
				sizes[option] = false;
			}
		}
		sizes[size] = true;
	},
	/**
	 * Toggles the type of icon used. Has to be "circle" or "solid"
	 * @param  {string} icon - The icon type
	 */
	_toggleIcon: function(type) {
		var icons = _data.icons;
		icons[type] = !icons[type];
	},
	/**
	 * Changes the sharing URLs
	 * @return {bool}
	 */
	_updateLinks: function() {
		var text = encodeURIComponent(_data.text);
		var url = encodeURIComponent(_data.url);

		var links = {
			'facebook': 'https://facebook.com/sharer/sharer.php?u=' + url,
			'twitter': 'https://twitter.com/intent/tweet/?text=' + text + '&url=' + url,
			'google': 'https://plus.google.com/share?url=' + url,
			'tumblr': "https://www.tumblr.com/widgets/share/tool?posttype=link&title=" + text + "&caption=" + text + "&content=" + url + "&canonicalUrl=" + url + "&shareSource=tumblr_share_button",
			'pinterest': 'https://pinterest.com/pin/create/button/?url=' + url + '&media=' + url + '&description=' + text,
			'linkedin': 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + text + '&summary=' + text + '&source=' + url,
			'reddit': 'https://reddit.com/submit/?url=' + url + '&resubmit=true&title=' + text,
			'email': 'mailto:?subject=' + text + '&body=' + url,
			'xing': 'https://www.xing.com/app/user?op=share;url=' + url + ';title=' + text,
			'whatsapp': 'whatsapp://send?text=' + text + '%20' + url,
			'hackernews':'https://news.ycombinator.com/submitlink?u=' + url + '&t=' + text,
			'vk': 'http://vk.com/share.php?title=' + text + '&url=' + url,
      'telegram': 'https://telegram.me/share/url?text=' + text + '&url=' + url,
		}

		for (var network in _data.networks) {
			_data.networks[network].link = links[network];
		}

		return true;
	},
	emitChange: function() {
		this.emit('change');
	},
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});

// Catch the events dispatched by the AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case AppConstants.TOGGLE_NETWORK:
			AppStore._toggleNetwork(action.name);
			break;
		case AppConstants.SET_URL:
			AppStore._setURL(action.url);
			break;
		case AppConstants.SET_TEXT:
			AppStore._setText(action.text);
			break;
		case AppConstants.CHANGE_SIZE:
			AppStore._changeSize(action.size);
			break;
		case AppConstants.TOGGLE_ICON:
			AppStore._toggleIcon(action.type);
			break;
		default:
			return false;
	}
	AppStore.emitChange();
	return true;
});

module.exports = AppStore;
