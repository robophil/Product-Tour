# Product-Tour
A responsive tour snippet, with a step-by-step guide(onboarding) to help users understand how to use your website.

#Example
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

#Credits
I found the source at https://codyhouse.co/gem/product-tour/
and made a jquery configurable plugin for this. Minor improvement and modification were done.

#Demo
https://codyhouse.co/demo/product-tour/

#Contributions
Send a pull request or create an issue... thanks
