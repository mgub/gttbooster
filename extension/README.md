### State of the codebase

The repository was closed source from its conception in 2014 until February 2018. The code is currently [on hold] being migrated to a cleaner version where principal UI elements have been wrapped in convenience classes that expose convenient public methods to simplify development.

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
Lastly, the classes/objects are to be implemented in `/src/4_controller`, with the notable exception of `/src/workbench/2_classes/Toolbar`, which is currently a self-contained widget.

The controller sets up custom events and EventListeners. This pattern is favored because of its maintainability compared with previously tried approaches.

The development of this project has slowed down because of real-life, but I hope to maintain it for a long time to come to ensure people can continue benefitting.
