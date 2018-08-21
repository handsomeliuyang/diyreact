export function updateDomProperties(dom, prevProps, nextProps) {

    const isListener = name => name.startsWith("on");
    const isAttribute = name=>!isListener(name) && name !== 'children';

    // 移除事件
    Object.keys(prevProps).filter(isListener).forEach((name)=>{
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
    });
    // 移除属性
    Object.keys(prevProps).filter(isAttribute).forEach((name)=>{
        dom[name] = null;
    });

    // 处理事件
    Object.keys(nextProps).filter(isListener).forEach((name)=>{
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
    });

    // 处理属性
    Object.keys(nextProps).filter(isAttribute).forEach((name)=>{
        dom[name] = nextProps[name];
    });
}

export function createDomElement(fiber) {
    const isTextElement = fiber.type === "TEXT ELEMENT";
    const dom = isTextElement ? window.document.createTextNode("") : window.document.createElement(fiber.type);

    updateDomProperties(dom, [], fiber.props);

    return dom;
}