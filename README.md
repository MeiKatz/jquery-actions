jQuery Actions
==============
Addon for contextmenus using HTML5 menu[type=context]
```HTML
<div id="details-area">
  <menu type="context" id="details">
    <li value="edit">Bearbeiten</li>
    <li value="delete">Löschen</li>
    <li value="details">Details</li>
  </menu>
  <div contextmenu="details"></div>
</div>
```
```JavaScript
$( "details-area" ).actions(function ( action ) {
  $( "[contextmenu=details]" ).append( action + "<br />" );
});
```
