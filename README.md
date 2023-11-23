# bluejs
Javascript Events &amp; Sessions Library for Frontend Framework/Application Development


# Overview

BlueJS offers a simple way to manage and attach DOM events to HTML elements for dynamically updating DOMs. This framework is intended to be used where the host backend is offering Templated DOM updates to a display frontend. The library is a shallow unopinionated framework and leaves all handler development to the user. There is no swapping logic involved as is customary in HTMX as it is assumed the fetched data handlers assume control of handler response.

`<li bluejs="unique-tag" bluejs-trigger="click" bluejs-binding="myHandler"> Item1 </li>`

