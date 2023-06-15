/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */
	// Wait for the document to load
// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
	// Get the contact form element
	var contactForm = document.getElementById('contactForm');
  
	// Add submit event listener to the form
	$('.submitform').click(()=> {
  
	  // Get the form fields
	  var contactName = document.getElementById('contactName');
	  var contactEmail = document.getElementById('contactEmail');
	  var contactMessage = document.getElementById('contactMessage');
	  var contactSubject = document.getElementById('contactSubject');
  
	  // Perform validation
	  var isValid = true;
  
	  if (contactName.value.trim() === '') {
		isValid = false;
		displayErrorMessage('Please enter your name.');
	  }
  
	  if (contactEmail.value.trim() === '') {
		isValid = false;
		displayErrorMessage('Please enter your email address.');
	  } else if (!isValidEmail(contactEmail.value.trim())) {
		isValid = false;
		displayErrorMessage('Please enter a valid email address.');
	  }
  
	  if (contactMessage.value.trim() === '') {
		isValid = false;
		displayErrorMessage('Please enter a message.');
	  }
  
	  // If form is valid, display success message
	  if (isValid) {
		displaySuccessMessage();
		// contactForm.reset(); // Reset the form
		sendFormData();
	  }
	
	})

  
	// Function to display the error message
	function displayErrorMessage(message) {
	  var messageWarning = document.getElementById('message-warning');
	  messageWarning.innerHTML = message;
	  messageWarning.style.display = 'block';
  
	  var messageSuccess = document.getElementById('message-success');
	  messageSuccess.style.display = 'none';
	}
  
	// Function to display the success message
	function displaySuccessMessage() {
	  var messageSuccess = document.getElementById('message-success');
	  messageSuccess.style.display = 'block';
  
	  var messageWarning = document.getElementById('message-warning');
	  messageWarning.style.display = 'none';
	}
  
	// Function to validate email address
	function isValidEmail(email) {
	  var emailRegex = /^\S+@\S+\.\S+$/;
	  return emailRegex.test(email);
	}
  
	// Function to send form data
	function sendFormData() {
	  // Retrieve the form data
	  var contactName = document.getElementById('contactName').value;
	  var contactEmail = document.getElementById('contactEmail').value;
	  var contactMessage = document.getElementById('contactMessage').value;
	  var contactSubject = document.getElementById('contactSubject').value;
	  // Make a POST request using Fetch API

	  var formData = {
		contactName: contactName,
		contactEmail: contactEmail,
		contactSubject: contactSubject,
		contactMessage: contactMessage
	  };
	  fetch("https://merciful-maize-manta.glitch.me/", {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	  })
		.then(function(response) {
			console.log("B")

			if (response) {
			return response.text();
		  } else {
			console.log("C")

			throw new Error('An error occurred while submitting the form.');
		  }
		})
		.then(function(responseText) {
			console.log("D")

			displayResponseMessage(); // Display the response message
		})
		.catch(function(error) {
			console.log("E")

		  displayErrorMessage(error.message); // Display the error message if the request failed
		});
	}
  
	// Function to display the response message
	function displayResponseMessage(response) {
	  var messageSuccess = document.getElementById('message-success');
	}
  });
  

	/* local validation */


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);