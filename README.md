# Product-Tour
A responsive tour snippet, with a step-by-step guide(onboarding) to help users understand how to use your website.

#Example
```javascript
		var productTour = new ProductTour({
				nextText: 'Next',
				prevText: 'Previous'
			});
			
		productTour.addNewTourSteps([{element: '#search', 
			title: 'Search for anything',
			content: "Search for any product, from any page, anytime........", 
			class: 'right'},
			
			{element:'.brand-carousel',
			 title: 'Brands',
			 content: "All your favourite brands available here on payporte.com"}]);
								 
		productTour.startTour();
```

#Usage
Simply include the following to get started
```html
<script src="product-tour.js" type="text/javascript"></script>
<link href="product-tour.css" rel="stylesheet" type="text/css" />
```
```javascript
//initialize constructor
var productTour = new ProductTour({ 
	nextText: '',
	prevText: '',
	beforeShow: function(){},//coming soon
	afterShow: function(){}//comming soon
});
//can only be called once
productTour.addNewTourSteps([//pass an array of tour steps
	element: '',//specify the target element #search or .header
	title: '',
	content: '',
	image: '',//specify image to be shown on mobile view
	class: ''//top, bottom, right, left
]);

productTour.startTour();//initialize the tour
```



#Credits
https://codyhouse.co/gem/product-tour/

#Demo
https://codyhouse.co/demo/product-tour/

#Contributions
Send a pull request or create an issue... thanks
