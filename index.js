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

    }

