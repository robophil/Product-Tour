function ProductTour(steps, options){

	this.addNewTourStep = (items)=> {
		var itemString = "<ul class='cd-tour-wrapper'>";

		for (var i = 0; i<items.length; i++) {
			items[i].element = items[i].element ? items[i].element : 0;
			items[i].title = items[i].title ? items[i].title : 'hey... i worked';
			items[i].content = items[i].content ? items[i].content : '';
			items[i].image = items[i].image ? items[i].image : '';
			items[i].class = items[i].class ? items[i].class : 'bottom';


			var foo = "<div><li class='cd-single-step'><input type='hidden' value=''><span>Step</span><div class='cd-more-info'><h2></h2><p></p><img src='images/wow.jpg'></div></li></div>"
			var htmlElement = jQuery(foo);
			jQuery('h2', htmlElement).text(items[i].title);
			jQuery('p', htmlElement).text(items[i].content);
			jQuery('.cd-more-info', htmlElement).addClass(items[i].class);
			jQuery('img', htmlElement).text(items[i].content);
			if(items[i].element){
				var widthHalf = jQuery(items[i].element).outerWidth()/2;
				var heightHalf = jQuery(items[i].element).outerHeight()-10;

				var top = jQuery(items[i].element).offset().top + heightHalf;
				var left = jQuery(items[i].element).offset().left + widthHalf;
				jQuery('input', htmlElement).val(items[i].element);
				jQuery('li.cd-single-step', htmlElement).css({top: top, left: left, height: '10px', width: '10px'});
			}
			itemString = itemString.concat(htmlElement.html());
		}

		itemString = itemString.concat("</ul>");
		jQuery('body').append(itemString);
		jQuery('body').append("<div class='overlay-tour'></div>");
	};

	function initTour() {
		var tourWrapper = jQuery('.cd-tour-wrapper'), //get the wrapper element
			tourSteps = tourWrapper.children('li'), //get all its children with tag 'li'
			stepsNumber = tourSteps.length, //get the no of elements in this array
			coverLayer = jQuery('.cd-cover-layer'),
			tourStepInfo = jQuery('.cd-more-info'),
			tourTrigger = jQuery('#cd-tour-trigger');
			jQuery('.overlay-tour').css({display: 'block'});
			//jQuery(jQuery(".active .cd-single-step.is-selected input").val()).css({'z-index': 90001});


		//create the navigation for each step of the tour
		createNavigation(tourSteps, stepsNumber);
		console.log(jQuery(".cd-single-step input").val());
		jQuery(jQuery("li.cd-single-step input").val()).css({'z-index': 90001, position: 'relative'});
		
		tourTrigger.on('click', function(){
			//start tour
			if(!tourWrapper.hasClass('active')) {
				//in that case, the tour has not been started yet
				tourWrapper.addClass('active');
				showStep(tourSteps.eq(0), coverLayer);
			}
		});

		//change visible step
		tourStepInfo.on('click', '.cd-prev', function(event){
			//go to prev step - if available
			( !jQuery(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'prev');
		});
		tourStepInfo.on('click', '.cd-next', function(event){
			//go to next step - if available
			( !jQuery(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'next');
		});

		//close tour
		tourStepInfo.on('click', '.cd-close', function(event){
			closeTour(tourSteps, tourWrapper, coverLayer);
		});

		//detect swipe event on mobile - change visible step
		tourStepInfo.on('swiperight', function(event){
			//go to prev step - if available
			if( !jQuery(this).find('.cd-prev').hasClass('inactive') && viewportSize() == 'mobile' ) changeStep(tourSteps, coverLayer, 'prev');
		});
		tourStepInfo.on('swipeleft', function(event){
			//go to next step - if available
			if( !jQuery(this).find('.cd-next').hasClass('inactive') && viewportSize() == 'mobile' ) changeStep(tourSteps, coverLayer, 'next');
		});

		//keyboard navigation
		jQuery(document).keyup(function(event){
			if( event.which=='37' && !tourSteps.filter('.is-selected').find('.cd-prev').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'prev');
			} else if( event.which=='39' && !tourSteps.filter('.is-selected').find('.cd-next').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'next');
			} else if( event.which=='27' ) {
				closeTour(tourSteps, tourWrapper, coverLayer);
			}
		});

		if(!tourWrapper.hasClass('active')) {
				//in that case, the tour has not been started yet
				tourWrapper.addClass('active');
				showStep(tourSteps.eq(0), coverLayer);
		}
	};

}