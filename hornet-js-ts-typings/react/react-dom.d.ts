// Type definitions for React (react-dom) 16.0
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>
//                 AssureSign <http://www.assuresign.com>
//                 Microsoft <https://microsoft.com>
//                 MartynasZilinskas <https://github.com/MartynasZilinskas>
//                 Josh Rutherford <https://github.com/theruther4d>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

/// <reference path="react.d.ts" />

declare namespace __React {
    namespace __DOM {

        function findDOMNode(instance: __React.ReactInstance): Element;

        function unmountComponentAtNode(container: Element): boolean;

        function createPortal(children:  __React.ReactNode, container: Element, key?: null | string):  __React.ReactPortal;

        const version: string;
        const render: Renderer;
        const hydrate: Renderer;

        function unstable_batchedUpdates<A, B>(callback: (a: A, b: B) => any, a: A, b: B): void;
        function unstable_batchedUpdates<A>(callback: (a: A) => any, a: A): void;
        function unstable_batchedUpdates(callback: () => any): void;

        function unstable_renderSubtreeIntoContainer<T extends Element>(parentComponent:  __React.Component<any>,
                                                                               element:  __React.DOMElement<DOMAttributes<T>, T>,
                                                                               container: Element,
                                                                               callback?: (element: T) => any): T;
        function unstable_renderSubtreeIntoContainer<P, T extends  __React.Component<P,  __React.ComponentState>>(parentComponent: Component<any>,
                                                                                                       element: CElement<P, T>,
                                                                                                       container: Element,
                                                                                                       callback?: (component: T) => any): T;
        function unstable_renderSubtreeIntoContainer<P>(parentComponent:  __React.Component<any>,
                                                               element:  __React.ReactElement<P>,
                                                               container: Element,
                                                               callback?: (component?:  __React.Component<P, ComponentState> | Element) => any): Component<P, ComponentState> | Element | void;

        interface Renderer {
            // Deprecated(render): The return value is deprecated.
            // In future releases the render function's return type will be void.
            <T extends Element>(element:  __React.DOMElement< __React.DOMAttributes<T>, T>,
                                container: Element | null,
                                callback?: () => void): T;

            (element: Array< __React.DOMElement< __React.DOMAttributes<any>, any>>,
             container: Element | null,
             callback?: () => void): Element;

            (element:  __React.SFCElement<any> | Array< __React.SFCElement<any>>,
             container: Element | null,
             callback?: () => void): void;

            <P, T extends  __React.Component<P,  __React.ComponentState>>(element:  __React.CElement<P, T>,
                                                        container: Element | null,
                                                        callback?: () => void): T;

            (element: Array< __React.CElement<any,  __React.Component<any,  __React.ComponentState>>>,
             container: Element | null,
             callback?: () => void):  __React.Component<any,  __React.ComponentState>;

            <P>(element:  __React.ReactElement<P>,
                container: Element | null,
                callback?: () => void):  __React.Component<P,  __React.ComponentState> | Element | void;

            (element: Array< __React.ReactElement<any>>,
             container: Element | null,
             callback?: () => void):  __React.Component<any,  __React.ComponentState> | Element | void;

            (parentComponent:  __React.Component<any> | Array< __React.Component<any>>,
             element: SFCElement<any>,
             container: Element,
             callback?: () => void): void;
        }
    }

    namespace __DOMServer {
        function renderToString(element: ReactElement<any>): string;

        function renderToStaticMarkup(element: ReactElement<any>): string;

        var version: string;
    }
}

declare module "react-dom" {
    import DOM = __React.__DOM;
    export = DOM;
}

declare module "react-dom/server" {
    import DOMServer = __React.__DOMServer;
    export = DOMServer;
}