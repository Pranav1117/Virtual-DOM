// BUILDING YOUR OWN JSX RENDERER / HOW VIRTUAL DOM WORKS BEHIND THE SCENE

/** To build ur own VIRTUAL DOM first u need to understand how react works behind the scene
    
    first we need to understand how babel handle JSX or how we can write code without JSX
    second how to represent virtual dom in memory
    third converting virtual dom into real dom
    fourth handling changes and only updating the change in real DOM 

    on high level we need to implement this :-

    JSX => VIRTUAL DOM => REAL DOM

    before the introduction of JSX we used to write code with the help of React.createElement
     
    for e.g.
    */

    // return (
        <div className = 'main' >
            <p>Hello</p>
        </div>
    // )

    // before JSX this code would be written as
 
    // return (
        React.createElement('div' , {className:'main'}, 
            React.createElement('p',{} , 'Hello')
        );
    // )
    // Nowdays, transpiler do this for us(Babel)   
    
    <div className = 'main' >
        <p>Hello</p>
    </div>

    // we need to represent this DOM in memory 

    { type : 'div', props : {className :"main"}, children:[
        {type : 'p', props : {}, children :[ 'Hello' ]} ]
    }

    // We represent DOM elements with objects like and DOM text nodes with plain JS strings
    
    // Basically like this => { type: ‘…’, props: { … }, children: [ … ] }
    
    // let's write helper function h : 

    function h(type, props, ...children) {
        return { type, props, children };
    }
     
    // this function will return object with 3 properties => 1.type 2.props 3.children
    // {type:... , props :{} , children : []} 
    
    // this will be our virtual DOM 
    
    // ---------
    
    // Now we need to create Real DOM using virtual DOM
    // Let's create function that will take this virtual DOM as an input and create real DOM

    function createElement(node){

        if (typeof node == "string") return document.createTextNode(node);

        const $el= document.createElement(node.type)

        node.childern.map(createElement).forEach($el.appendChild.bind($el));
        return $el;

    }

    // Okay up until now we have function that takes JSX and create Real DOM
    // Now we need to handle changes in virtual DOM and reflect those on real DOM.

    // Let's create a function that handle those changes
    // we have to handle 3 cases while implementing changes
    // first New Element or node is added
    // second Element or node deleted
    // third Element or node has been changed


    // this is a helper function that will check if 2 nodes are changed or not 
    function changed(node1,node2){
        return typeof node1 !== typeof node2 ||   // this will return true if both node's types are different
        typeof node1 === 'string' && node1 !== node2 ||  //this will first check if both are strings and if yes they are different it wiil return true
        node1.type !== node2.type  // this will return true if node1.types is different from nodes2.types

        // so basically it will return true if both nodes are different
    }

    function handleDom( $DOM, newElement, oldElement,index=0) {
    //    this will add new Element
        if(!oldElement){
            $DOM.appendChild(createElement(newElement))
        }
        // this will remove element
        else if(!newElement){
            $DOM.reomveChild($DOM.childNodes[index])
        }
        // this will check if nodes are changed then only it will replace changed node
        else if(changed(newElement,oldElement)){
            $DOM.replaceChild(createElement(newElement),
            $DOM.childNodes[index])
        }
    }
