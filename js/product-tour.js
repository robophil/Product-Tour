/**
 *
 * ### options permitted :
 * attribute        |   options     |   Value {default}
 * -----------------|---------------|------------------
 * data-html        |   html        |   true|false {false}
 * data-next        |   next        |   string|html depends on the data-html {'Next &#8618;'}
 * data-prev        |   prev        |   string|html depends on the data-html {'&#8617; Previous'}
 * data-overlay     |   overlay     |   true|false {true}
 *
 *
 * ### functions triggered
 * 1. onStart --> when the tour is start tour method is called.
 * 2. onClosed --> when the tour is close or destroyed. The current step element is available as the **relatedTarget** property of the event
 * 3. onChanged  --> when our tour moved from one step to another. The current step element is available as the **relatedTarget** property of the event
 * 4. onFinished(No use for the now) --> when our tour has finished its processing. The current step element is available as the **relatedTarget** property of the event
 */
var ProductTour;
(function ( jQuery ) {
    /**
     * Productor Class object
     * @param options holds the possible set of options allowed
     * @constructor
     */
	ProductTour = function(options){
	var added = false;//if tour steps has been added

        /**
         *  options initialization
         */
        options.next = options.next ? options.next : "Next";
        options.prev = options.prev ? options.prev : "Previous";
        options.html = "html" in options ? options.html : false;
        options.overlay = "overlay" in options ? options.overlay : true;
        console.log("Over Lay",options.overlay,"Html",options.html);
        //functions triggers
        options.onStart = options.onStart ? options.onStart : undefined;
        options.onChanged = options.onChanged ? options.onChanged : undefined;
        options.onClosed = options.onClosed ? options.onClosed : undefined;
        options.onFinished = options.onFinished ? options.onFinished : undefined;//no use for the now

        /**
         * startTour method
         * this checks if tour items has been added to the page, then initialize
         *
         * if the onStart method is added in our options run it
         */
	this.startTour =function (){
		jQuery.fn.exists = function(){ return this.length > 0; };
		jQuery('.cd-tour-wrapper').exists() && initTour();//checks if tour items has been added to the page, then initialize

        //running call our onStart trigger if specified
        if(jQuery.isFunction(options.onStart))
             options.onStart();
	};

        /**
         * this add steps to our tour
         * @param items {Array} of item_template below
         *  each item hold this possible items
         * {
            element,//{selector}specify the target element
            title,//title of the tour , can be optional incase the content design has title in it
            content,//content to  display
            image,//specify image to be shown on mobile view
            position//top, bottom, right, left  default-> bottom
            }
         */
	this.steps = function (items) {
        if(!(items instanceof Array)) return;//expecting an array. If not one, return
        if(added) {
            console.warn("Tour steps has already been added, you can't add step on the fly, coming on next version");
            return;
        }

        //DOM initialization
        var stepsHTML = "<ul class='cd-tour-wrapper'>";
        var itemHTML =  "<div><li class='cd-single-step'><input type='hidden' value=''><span>Step</span><div class='cd-more-info'><h2></h2><p></p><img src=''></div></li></div>";

        var itemString = "";
        jQuery.each(items,function (index, item) {
            //check and initialize items array of objects
            item.element = item.element ? item.element : undefined;
            item.title = item.title ? item.title : undefined;//if not specified dont add default since the content can do the design too
            item.content = item.content ? item.content : '';//leave blank
            item.image = item.image ? item.image : 'images/sample.jpg';//image is needed for mobile, dont see the need here
            item.position = item.position ? item.position : 'bottom';

            //find out if the element exists
            if(item.element == undefined)
                item.element = 'body';//if the item dosen't exist make it point to body
            else
                item.element += ":first"; //if exist just reference the first element

            var htmlElement = jQuery(itemHTML);

          if(item.title != undefined)
            jQuery('h2', htmlElement).text(item.title);
           else //remove the h2 node , in case the content want to override the design
              jQuery('h2', htmlElement).remove();

            jQuery('p', htmlElement).text(item.content);
            jQuery('.cd-more-info', htmlElement).addClass(item.position);
            jQuery('img', htmlElement).attr("src",item.image);//dont see the need here

            if(item.element){
                var widthHalf = jQuery(item.element).outerWidth()/2;//get half the width of item
                var heightHalf = jQuery(item.element).innerHeight()/2;//get half the height

                var top = jQuery(item.element).offset().top + -12 + heightHalf;//12px is the magical pixel ;)
                var left = jQuery(item.element).offset().left + widthHalf;

                jQuery('input', htmlElement).val(item.element);//save the target element in the dom
                jQuery('li.cd-single-step', htmlElement).css({top: top, left: left, height: '10px', width: '10px'});//Item is ready
            }
            //build the tour content
            itemString += htmlElement.html();
        });

        stepsHTML += itemString+ "</ul>";
        //attach tour to the dom
        jQuery('body').append(stepsHTML);
        if(options.overlay)
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


		//create the navigation for each step of the tour
		createNavigation(tourSteps, stepsNumber);

		//configuration setting initialzation
        if(options.html) {
            jQuery('.cd-next').html(options.next);
            jQuery('.cd-prev').html(options.prev);
        }else{
            jQuery('.cd-next').text(options.next);
            jQuery('.cd-prev').text(options.prev);
        }
		//init for first tour step display
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
            //running call our onClosed trigger if specified
            if(jQuery.isFunction(options.onClosed))
                options.onClosed(coverLayer);
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
                //running call our onClosed trigger if specified
                if(jQuery.isFunction(options.onClosed))
                    options.onClosed(coverLayer);
			}
		});

		if(!tourWrapper.hasClass('active')) {
				//in that case, the tour has not been started yet
				tourWrapper.addClass('active');
				showStep(tourSteps.eq(0), coverLayer);
		}
	}

	function createNavigation(steps, n) {
		var tourNavigationHtml = '<div class="cd-nav"><span><b class="cd-actual-step">1</b> of '+n+'</span><ul class="cd-tour-nav"><li><a href="javascript:;" class="cd-prev">&#8617; Previous</a></li><li><a href="javascript:;" class="cd-next">Next &#8618;</a></li></ul></div><a href="javascript:;" class="cd-close">Close</a>';

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

        /**
         * this changes step , if any is active call the onChanged(current_layer) function if specified
         * @param steps
         * @param layer
         * @param bool
         */
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
            //running call our onChange trigger if specified
            if(jQuery.isFunction(options.onChanged))
                options.onChanged(layer);
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