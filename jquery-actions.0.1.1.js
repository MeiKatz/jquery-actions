/**
 * @author      Gregor Mitzka (gregor.mitzka@gmail.com)
 * @version     0.1.1
 * @date        2013-08-06
 * @licence     beer ware licence
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <gregor.mitzka@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Gregor Mitzka
 * ----------------------------------------------------------------------------
 */
(function ( $ ) {
	$.fn.actions = function ( callback ) {
		var $this = $( this );

		$this
		// open contextmenu
		.delegate( "[contextmenu]", "contextmenu", function ( e ) {
			var $contextmenu = $( "#" + $( this ).attr( "contextmenu" ) ).first();

			e.preventDefault();
			e.stopPropagation();

			// break if there is no context menu with the defined id
			if ( $contextmenu.length === 0 ) {
				return false;
			}

			// close all opened context menus if necessary
			if ( $( "menu[type=context]:visible" ).length > 0 ) {
				$( "menu[type=context]" ).hide();
				return false;
			}

			$contextmenu
			.css({
				"top"  : ( e.pageY - 18 ) + "px",
				"left" :   e.pageX        + "px"
			})
			.show();

			return false;
		})
		// click on a context menu item
		.delegate( "menu[type=context] li", "click", function() {
			callback.call( this );
		})
		// select item with mouse pointer
		.delegate( "menu[type=context] li", "mouseover", function() {
			$( "menu[type=context] li" ).removeClass( "selected" );
			$( this ).addClass( "selected" );
		})
		// remove selection when mouse pointer leaves area of the opened context menu
		.delegate( "menu[type=context] li", "mouseout", function() {
			$( "menu[type=context] li" ).removeClass( "selected" );
		})
		// close all opened context menus
		.on( "click", function() {
			$( "menu[type=context]" ).hide();
		});

		// select item in context menu with keyboard
		$( "body" ).on( "keydown", function ( e ) {
			// close menu on escape
			if ( e.which === 27 ) {
				$( "menu[type=context]" ).hide();
				return;
			}

			var $contextmenu = $( "menu[type=context]:visible" ).first();

			if ( $contextmenu.length === 0 ) {
				return;
			}

			var $items    = $contextmenu.children( "li" );
			var $selected = ($selected = $contextmenu.children( "li.selected" ).first()).length > 0 ? $selected : false;

			switch ( e.which ) {
				// arrow up
				case 38:
					$items.removeClass( "selected" );

					if ( $selected ) {
						var index = $items.index( $selected );
						$items.eq( index - 1 ).addClass( "selected" );
					} else {
						$items.last().addClass( "selected" );
					}
					break;

				// arrow down
				case 40:
					$items.removeClass( "selected" );

					if ( $selected ) {
						var index = $items.index( $selected );
						$items.eq( ( index + 1 ) % $items.length ).addClass( "selected" );
					} else {
						$items.first().addClass( "selected" );
					}
					break;

				// enter
				case 13:
					$( "menu[type=context]" ).hide();
					callback.call( $contextmenu.children( ".selected" ).get( 0 ));
					$( "menu[type=context] li" ).removeClass( "selected" );
					break;
			}
		});
	};
})( jQuery );
