import test from 'ava';
import browserEnv from 'browser-env';
import {request, cancel} from 'requestidlecallback';
import {render} from '../src/diyreact';

// browserEnv(['document', 'window']);
browserEnv();

typeof document;
typeof window;

// 是测试环境，不是browser环境，没有真正的window.requestIdleCallback函数，自己创造一个
window.requestIdleCallback = function(task){
    function timeRemaining(){
        return 2;
    }

    task({
        timeRemaining : timeRemaining
    });
};

console.log(window.requestIdleCallback);

test.beforeEach(t=>{
    let root = document.getElementById("root");
    if(!root) {
        root = document.createElement("div");
        root.id = 'root';
        document.body.appendChild(root);
    }
    t.context.root = root;
});

// test.afterEach.always(t=>{
//     const root = t.context.root;
//     root.innerHTML = "";
//     document.body.removeChild(root);
// });

test('render div', t=>{
    const root = t.context.root;

    const element = {
        type: "div",
        props: {}
    };

    render(element, root);

    t.is(root.innerHTML, "<div></div>");
});

test('render div with children', t=>{
    const root = t.context.root;

    const element = {
        type: "div",
        props: {
            children : [
                {type:"b", props:{}},
            ]
        }
    };

    render(element, root);

    t.is(root.innerHTML, '<div><b></b></div>');
});

test('render div with props', t=>{
    const root = t.context.root;

    const element = {
        type: "div",
        props: {
            id: "foo"
        }
    };

    render(element, root);

    t.is(root.innerHTML, '<div id="foo"></div>');
});

test('render span with text child', t=>{
    const root = t.context.root;

    const element = {
        type: "span",
        props: {
            children: [
                {
                    type: "TEXT ELEMENT",
                    props: {
                        nodeValue: "Foo"
                    }
                }
            ]
        }
    };

    render(element, root);

    t.is(root.innerHTML, '<span>Foo</span>');
});