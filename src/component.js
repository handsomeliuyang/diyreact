// import {reconcile} from './reconciler'
import {scheduleUpdate} from './reconciler';

export class Component {
    constructor(props) {
        this.props = props;
        this.state = this.state || {};
    }

    setState(partialState){
        /*this.state = Object.assign({}, this.state, partialState);
        updateInstance(this.__internalInstance);*/

        scheduleUpdate(this, partialState);
    }
}

export function createInstance(fiber) {
    const instance = new fiber.type(fiber.props);
    instance.__fiber = fiber;
    return instance;
}

/*
function updateInstance(instance) {
    const element = instance.element;
    const parentDom = instance.dom.parentNode;
    reconcile(element, instance, parentDom);
}

export function createPublicInstance(element, internalInstance) {
    const {type, props} = element;
    const publicInstance = new type(props);
    publicInstance.__internalInstance = internalInstance;

    return publicInstance;
}*/
