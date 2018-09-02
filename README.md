# Product-Tour
A responsive tour snippet, with a step-by-step guide(onboarding) to help users understand how to use your website.

```bash
npm install product-tour
```

## Requirements
- [Jquery](https://jquery.com/)

## Example
See index.html

## Usage
Simply include the following to get started
```html
<script src="<link to jquery.js>"></script>
<script src="product-tour.min.js" type="text/javascript"></script>
<link href="product-tour.min.css" rel="stylesheet" type="text/css"/>
```

```javascript
// initialize constructor
var productTour = new ProductTour({ 
	overlay:true, // optional (true || false) defaults: true
	onStart: function () {}, // called when tour starts || optional
	onChanged:function (e) {}, // called when tour changes || optional 
	onClosed:function (e) {}, // called when the tour has been closed || optional
	next: '', // optional defaults: 'Next'
	prev: '', // optional defaults: 'Previous'
	of: '', // optional defaults: 'of'
	html: // optional (true || false) defaults: false
});
// can only be called once
productTour.steps([ // pass an array of tour steps
	{
		element: '', // specify the target selector by id or class #search or .header (defaults: body)
		title: '', // title of the tour step
		content: '', // content. Could be text or html. (if html set html attribute above to be true)
		image: '', // specify image to be shown on mobile view
		position: '' // top, bottom, right, left
	},
	{
		element: '', // specify the target selector by id or class #search or .header (defaults: body)
		title: '', // title of the tour step
		content: '', // content. Could be text or html. (if html set html attribute above to be true)
		image: '', // specify image to be shown on mobile view
		position: '' // top, bottom, right, left
	}
]); 
productTour.startTour(); // initialize the tour
```

## Development
To clone and run project with a view of developing framework

NPM would help in getting our environment ready:
```bash
npm install
```

We used [**gulp**](http://gulpjs.com) in handling our building and test running of frame work.

Use the _**index.html**_ to do your design and testing of the framework with the browser. Simply use the command below:
```bash
gulp serve
```
This will listen to updates of our **product-tour.js** and **product-tour.css** and call:
```bash
gulp build
```
to help compile and build our minified version which is automatically or already called in our _index.html_
file so the browser is opened.

### Build Just the JS
```bash
gulp build-js
```

### Build Just the CSS
```bash
gulp build-css
```

## Credits
https://codyhouse.co/gem/product-tour/

## Demo
https://codyhouse.co/demo/product-tour/

## Contributions
Send a pull request or create an issue... thanks
