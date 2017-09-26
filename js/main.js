
// LOADER
$(window).bind('load',function(){
	var p = 0;
	var per = setInterval(function(){
		$('#loader span').text(p++);
		if(p>100){
			clearInterval(per);
		}
	},20);
	setTimeout(function(){
		$('#loader').fadeOut(500).queue(function(){
			$('#global').animate({opacity: 1},1000);
		});
	},2250);
});


// SCROLL
$(function(){
	var vW = $(window).width();
	if(vW>736){
		$('#content').bind('DOMMouseScroll mousewheel',function(e){
			if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0){
				$('#content').addClass('scrollRight');
			}
			else {
				$('#content').removeClass('scrollRight');
			}
			return false; // Prevent page scroll
		});

		$('#btnConoce').click(function(){
			$('#content').addClass('scrollRight');
		});
		$('#btnBack2, header img').click(function(){
			$('#content').removeClass('scrollRight');
		});
	}
	else{
		var vH = $(window).height();
		$('#btnConoce').click(function(){
			$('#global').animate({scrollTop: vH},1250,'easeOutExpo');
		});
	}
});


// LANG
$(function(){
	var vW = $(window).width();
	if(vW>736){
		var state = 1;
		$('body').not('#lang .btnLang').click(function(){
			$('#lang .btnLang').removeClass('active');
			$('#lang ul').fadeOut(250);
			state=1;
		});
		$('#lang .btnLang').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			if(state==1){
				$(this).addClass('active');
				$('#lang ul').fadeIn(250);
				state=2;
			}
		});
	}

	$('#social .btnLang').click(function(){
		$('#global').addClass('blured');
		$('#popUp').fadeIn(500);
		setTimeout(function(){
			$('#btnClose').addClass('shown');
			$('#lang').fadeIn(500);
		},500);
	});
});


// MORPH
$(function(){
	var morphW = function(){
		var vW = $(window).width();
		if(vW>736){
			var h = $(window).height()/2;
			$('#morph').css('width',h);
		}
		else{}
	}
	$(document).ready(morphW);
	$(window).resize(morphW);
});


// EXPERIENCIA: Nav
$(function(){
	$('#btnExperimenta').click(function(){
		$('#global').css('pointer-events','none');
		$('#content').addClass('hidden');
		$('#grain, #morph, #lang, #social, footer').fadeOut(500);
		setTimeout(function(){
			$('#experiencia').fadeIn(625);
			$('#btnBack').addClass('shown');
		},625);
	});
	$('#btnBack').click(function(){
		$('#global').css('pointer-events','all');
		$('#experiencia').fadeOut(500);
		$('#btnBack').removeClass('shown');
		setTimeout(function(){
			$('#content').removeClass('hidden');
			$('#grain').fadeIn(500);
			setTimeout(function(){
				$('#morph, #lang, #social, footer').fadeIn(500);
			},625);
		},500);
	});
});


// CAPTIONS
$(function(){
	var imgSize = function(){
		$('#screen2 .col .p a figure').each(function(){
			var vH = $(window).height(),
				h  = vH/4,
				w  = h*0.66,
				bg = $(this).attr('data');
			$(this).css({
				width: w,
				height: h,
				backgroundImage: 'url('+bg+')'
			});
		});
	}
	$(document).ready(imgSize);
	$(window).resize(imgSize);

	$('#screen2 .col .p a').each(function(){
		$(this).click(function(){
			var src = $(this).find('figure').attr('data');
			$('#captions img').attr('src',src);
			$('#global').addClass('blured');
			$('#popUp, #captions').fadeIn(500);
			setTimeout(function(){
				$('#btnClose, #captions img').addClass('shown');
			},500);
		});
	});
});


// CONTACTO
$(function(){
	$('#btnContacto').click(function(){
		$('#global').addClass('blured');
		$('#popUp, #contacto').fadeIn(500);
		setTimeout(function(){
			$('#btnClose, #contacto').addClass('shown');
			$('input[data="required"]').first().focus();
		},500);
	});

	// Validation
	var focus = function(){
		$('input[data="required"]').first().focus();
	}
	var validate = function(){
		$('input[data="required"]').first().focus().addClass('validate');
		setTimeout(function(){
			$('input[data="required"]').removeClass('validate');
		},250);
	}
	var state = 1;
	$('#btnNext').click(function(e){
		e.preventDefault();
		var required = $('input[data="required"]').length;
		if(state==1 && required==2){
			$('#name').fadeOut(250).queue(function(){
				$('#email').fadeIn(250);
				$('#contacto > .wrapper span').text('2 / 3');
				focus();
				$(this).dequeue();
			});
			state=2;
		}
		else if(state==2 && required==1){
			$('#btnNext, #email').fadeOut(250).queue(function(){
				$('#message').fadeIn(250);
				$('#contacto > .wrapper span').text('3 / 3');
				focus();
				$('#submit').addClass('enabled');
				$(this).dequeue();
			});
		}
		else{
			validate();
		}
	});
	$('input[data="required"]').each(function(){
		$(this).change(function(){
			if($(this).val()){
				$(this).attr('data','');
			}
			else{
				$(this).attr('data','required');
			}
		});
	});

	// Circles
	function circles(){
		$('#submit.enabled .draggable').append('<span class="circle"><span>');
		$('.circle').each(function(){
			var $this = $(this);
			setTimeout(function(){
				$this.addClass('expand');
				setTimeout(function(){
					$this.remove();
				},2900);
			},100);
		});
	}
	var run    = circles();
	var repeat = setInterval(circles,1000);

	// Submit
	$('#submit .draggable').draggable({
		axis: 'x',
		containment: 'parent',
		revert: true,
		revertDuration: 250
	});
	var send = function(){
		var required = $('input[data="required"]').length;
		if(!required==0){
			validate();
		}
		else{
			$('#btnSubmit').appendTo('#submit .droppable');
			$('#submit .draggable').remove();
			$('#submit .droppable p').css('pointer-events','none').text('...');
			$('#contacto').submit();
		}
	}
	$('#submit .droppable').droppable({
		drop: function(event,ui){
			send();
		}
	});
	$('#submit .droppable p').click(function(){
		send();
	});
});


// POP-UP
$(function(){
	$('#btnClose').click(function(){
		$('#btnClose, #captions img').removeClass('shown');
		$('#contacto, #popUp #lang').fadeOut(500);
		setTimeout(function(){
			$('#contacto').removeClass('shown');
			$('#popUp, #captions').fadeOut(500);
			$('#global').removeClass('blured');
		},500);
	});
});


// RESPONSIVE
$(function(){
	var vW = $(window).width();
	if(vW<=736){
		$('#lang').prependTo('#popUp');
		$('#social, footer').appendTo('#screen2 .col.right');
	}
	else{
		$('#lang').prependTo('#global');
		$('#social, footer').appendTo('#global');
	}
});