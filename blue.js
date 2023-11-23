/* 
   Whenever a DOM state change occurs (innerHTML, innerText, etc.) is updated
   we need to look for any new tags that need to be bound to a function. We
   assume  jQuery is available.

   We search tags for bluejs attribute bluejs="binding" and bluejs-trigger="event"
   the name tag supplies the context for the trigger endpoints.
*/


class BlueJS{
    constructor(){
        this._tags = new Map();
        this._tagBindings = new Map();
        this._mutation = new MutationObserver(this.observe);
    }

    API(){
        var arr = [];
        this._tagBindings.forEach((value, key)=>{
            arr.push(key)
        })
        return arr;
    }

    addBinding(name, context,handler){
        var blueBinding = new Binding(context, handler);
        this._tagBindings.set(name, blueBinding);
    }

    addTag(uuid, tagElement){
        if(!this._tags.has(uuid)){
            this._tags.set(uuid, tagElement);
        }
    }

    initiate(){
        this._mutation = new MutationObserver(this.observe);
        this.register();
        this._mutation.observe(document.body, {childList: true, subtree: true});
    }

    register(){
        //Document Query for all tags with bluejs attribute
        const tags = document.querySelectorAll('[bluejs]');
        tags.forEach((tag)=>{
            var name = tag.getAttribute('bluejs');
            var trigger = tag.getAttribute('bluejs-trigger');
            var binding = tag.getAttribute('bluejs-binding');

            if(trigger == "load"){
                tag = document;
                trigger = "DOMContentLoaded"
            }

            var element = new TagElement(tag, name, trigger, binding);
            this.addTag(name, element);
            if(this._tagBindings.get(binding) == null){
                console.log("Binding not found for " + binding)
                return
            }
            this.setHandler(tag,binding,trigger, this._tagBindings.get(binding)._handler)
            element._bound = true;
        })
    }

    observe(mutations){
        //For every DOM tag element we add tags with bluejs attribute
        const self = bluejs;
        mutations.forEach((mutation)=>{
            if(mutation.type == 'childList'){
                const addedTags = Array.from(mutation.addedNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
                addedTags.forEach(tag => {
                    const childTags = tag.querySelectorAll('[bluejs]');
                    childTags.forEach((childTag)=>{
                        const name = childTag.getAttribute('bluejs');
                        const trigger = childTag.getAttribute('bluejs-trigger');
                        const binding = childTag.getAttribute('bluejs-binding');
                        var element = new TagElement(childTag, name, trigger, binding);
                        self.addTag(childTag,name, element);
                        self.setHandler(childTag, binding,trigger)
                        element._bound = true;
                    });
                });
            }
        })
    }

    setHandler(tag,name, trigger){
        console.log("Set handler for " + name + " on " + trigger)
        if(this._tagBindings.get(name) == null){
            console.log("Binding not found for " + name)
            return
        }
        var handler = this._tagBindings.get(name)._handler;
        tag.addEventListener(trigger, handler);
    }
}

class Binding{
    constructor(context, handler){
        this._context = context;
        this._handler = handler;
    }
}

class TagElement{
    constructor(tag, uuid, trigger, bindingName){
        this._tag = tag;
        this._uuid = uuid;
        this._blue = bindingName;
        this._trigger = trigger;
        this._bound = false;
    }
}

const bluejs = new BlueJS();

document.addEventListener("DOMContentLoaded", function(){
    bluejs.initiate();
});
