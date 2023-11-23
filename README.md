# bluejs
Javascript Events &amp; Sessions Library for Frontend Framework/Application Development


# Overview

BlueJS offers a simple way to manage and attach DOM events to HTML elements for dynamically updating DOMs. This framework is intended to be used where the host backend is offering Templated DOM updates to a display frontend. The library is a shallow unopinionated framework and leaves all handler development to the user. There is no swapping logic involved as is customary in HTMX as it is assumed the fetched data handlers assume control of handler response.

`<li bluejs="unique-tag" bluejs-trigger="click" bluejs-binding="myHandler"> Item1 </li>`

This let's us easily address registered handlers for dynamically loaded content and let's us seperate presentation concerns and backend state. Additionally we make the active tag and context available to the handlers in the global state for adding context.

# Handlers

We map handlers through `bluejs.addBinding(name, handler)` so keep in mind that you will effectively be developing a handlers key based API. Calling `bluejs.API()` presents a dictionary of keys and handler descriptions to your application

# Initialization

bluejs should have the handlers added prior to usage. Once the document loads bluejs will register the current DOM and then listen for any changes on the DOM. If you need to improve performance you can have bluejs listen to a subtree tag item on the DOM.

BlueJs is meant to be a simple library for managing dynamically loaded content and allows users to implement their own custom handlers, this lets us write and control our async operations with  any fidelity we need without further abstraction or need for extensions. For example we can plug in any sort of request mechanism over any protocol as long as the behavior is captured by our handlers.


# Usage

Load in the bluejs file into your application

```
<script src="https://github.com/andewx/bluejs/blue.js.min" crossorigin="anonymous"></script
```

Define event handlers `function myHandler(e){e.preventDefault()}` and pass to `bluejs` when initializing your application with `bluejs.addBinding(name,handler)`

Bind the event handlers to dynamically imported elements by including the `bluejs` attributes. 

`<li bluejs="unique-tag" bluejs-trigger="click" bluejs-binding="myHandler"> Item1 </li>`

# Feature Requests

This is just a port of a simple event handler library feel free to modify and extend as needed. Not actively maintained.

