jQuery Actions
==============
Addon for contextmenus using HTML5 menu[type=context]
```html
<div id="details-area">
  <menu type="context" id="details">
    <li data-type="edit">Bearbeiten</li>
    <li data-type="delete">Löschen</li>
    <li data-type="details">Details</li>
  </menu>
  <div contextmenu="details"></div>
</div>
```
```javascript
$( "details-area" ).actions(function() {
  $( "[contextmenu=details]" ).append( $( this ).data( "action" ) + "<br />" );
});
```
