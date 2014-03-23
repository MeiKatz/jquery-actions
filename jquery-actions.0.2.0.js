/**
 * @author      Gregor Mitzka (gregor.mitzka@gmail.com)
 * @version     0.2.0
 * @date        2014-03-23
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
    // open contextmenu
    $( "[contextmenu]", this ).on( "contextmenu", function ( e ) {
      var $contextmenu = $( "#" + $(this).attr( "contextmenu" ) ).first();
      
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
      
      $contextmenu.css({
        "top"  : ( e.pageX - 18 ) + "px",
        "left" :   e.pageY        + "px"
      }).show();
      
      return false;
    });
    
    $( "menu[type=context] li", this ).on({
      // click on a context menu item
      "click" : function() {
        callback.call( this, $(this).attr( "value" ) || $(this).text() );
      },
      // select item with mouse pointer
      "mouseover" : function() {
        $( "menu[type=context] li" ).removeClass( "selected" );
        $(this).addClass( "selected" );
      },
      // remove selection when mouse pointer leaves area of the opened context menu
      "mouseout" : function() {
        $( "menu[type=context] li" ).removeClass( "selected" );
      }
    });
    
    // close all opened context menus
    $(this).on( "click", function() {
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
      var $selected = ( $selected = $contextmenu.children( "li.selected" ).first() ).length > 0
                    ? $selected
                    : false;

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
          var item = $contextmenu.children( ".selected" ).get( 0 );
          callback.call( item, $( item ).attr( "value" ) || $( item ).text() );
          $( "menu[type=context] li" ).removeClass( "selected" );
          break;
      }
    });
  };
})( jQuery );
