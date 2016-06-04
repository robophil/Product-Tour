var ProductTour;
(function ( jQuery ) {
	ProductTour = function(options){
	var added = false;
	
	this.startTour = ()=>{
		jQuery.fn.exists = function(){ return this.length > 0; }
		jQuery('.cd-tour-wrapper').exists() && initTour();
	}

	this.addNewTourSteps = (items)=> {
		if(!(items instanceof Array)) return;
		if(added) {
			console.warn('Tour steps has already been added');
			return;
		}
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

		added = true;
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

	function createNavigation(steps, n) {
		var tourNavigationHtml = '<div class="cd-nav"><span><b class="cd-actual-step">1</b> of '+n+'</span><ul class="cd-tour-nav"><li><a href="#0" class="cd-prev">&#171; Previous</a></li><li><a href="#0" class="cd-next">Next &#187;</a></li></ul></div><a href="#0" class="cd-close">Close</a>';

		steps.each(function(index){
			var step = jQuery(this),
				stepNumber = index + 1,
				nextClass = ( stepNumber < n ) ? '' : 'inactive',
				prevClass = ( stepNumber == 1 ) ? 'inactive' : '';
			var nav = jQuery(tourNavigationHtml).find('.cd-next').addClass(nextClass).end().find('.cd-prev').addClass(prevClass).end().find('.cd-actual-step').html(stepNumber).end().appendTo(step.children('.cd-more-info'));
		});
	}

	function showStep(step, layer) {
		step.addClass('is-selected').removeClass('move-left');
		smoothScroll(step.children('.cd-more-info'));
		showLayer(layer);
	}

	function smoothScroll(element) {
		if(jQuery(window).width() < 768) return;
		var top = jQuery(jQuery("li.cd-single-step.is-selected input").val()).offset().top;
		var height = jQuery(jQuery("li.cd-single-step.is-selected input").val()).height();

		(top < jQuery(window).scrollTop()) && jQuery('body,html').animate({'scrollTop': top - height}, 'slow');
		(top + height > jQuery(window).scrollTop() + jQuery(window).height() ) && jQuery('body,html').animate({'scrollTop': top - height}, 'slow'); 
	}

	function showLayer(layer) {
		layer.addClass('is-visible').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			layer.removeClass('is-visible');
		});
	}

	function changeStep(steps, layer, bool) {
		var visibleStep = steps.filter('.is-selected'),
			delay = (viewportSize() == 'desktop') ? 300: 0; 
		visibleStep.removeClass('is-selected');

		jQuery("li.cd-single-step input").each(function(i){
			jQuery(jQuery(this).val()).removeAttr('style');
		});

		(bool == 'next') && visibleStep.addClass('move-left');

		setTimeout(function(){
			( bool == 'next' )
				? showStep(visibleStep.next(), layer)
				: showStep(visibleStep.prev(), layer);
			jQuery(jQuery("li.cd-single-step.is-selected input").val()).css({'z-index': 90001, position: 'relative'});
		}, delay);
	}

	function closeTour(steps, wrapper, layer) {
		steps.removeClass('is-selected move-left');
		wrapper.removeClass('active');
		layer.removeClass('is-visible');
		jQuery('.overlay-tour').css({display: 'none'});
		jQuery("li.cd-single-step input").each(function(i){
			jQuery(jQuery(this).val()).removeAttr('style');
		});
	}

	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.cd-tour-wrapper'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}

}
}( jQuery ));