### GTT Booster

GTT Booster is an Open Source Chrome Extension for Google Translator Toolkit. It was developed with space-based languages in mind, but you may have some luck using it for scriptio continua languages like Chinese or Hindi.

GTT Booster is freely available under the GPL 3.0 or later.

### State of the repository

The repository was closed source from its conception in 2014-15 until February 2018. The code is currently [on hold] being migrated to a cleaner version where principal UI elements have been wrapped in convenience classes that expose convenient public methods to simplify development.

For example, an old piece of code may look something like this:
```
if (segmentDomElement.className === 'someGtcClass') {
  // perform action
}
```

A newer piece of code however, has already abstracted away the DOM manipulations:
```
if (segment.isConfirmed) {
  // perform action
}
```
This reduces the necessity for dealing with the DOM directly, and speeds up development.

The present goal is to entirely localize DOM manipulations to one part of the code (`/src/1_domMappings`), akin to the Page Object Model.
These mappings are then consumed in `/src/2_classes`.
Lastly, the classes/objects are to be implemented in `/src/4_controller`, with the notable exception of `src/workbench/2_classes/Toolbar`, which is a self-contained widget.

The controller sets up custom events and EventListeners. This pattern is favored because of its maintainability compared with previously tried approaches.
