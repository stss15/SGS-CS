(function () {
    const ATTRIBUTE_PREFIX = 'data-sgs-on';
    const BOUND_FLAG_PREFIX = 'sgsBoundOn';
    const compiledExpressions = new Map();

    const compileExpression = (expression) => {
        if (!compiledExpressions.has(expression)) {
            compiledExpressions.set(expression, new Function('event', expression));
        }
        return compiledExpressions.get(expression);
    };

    const runExpression = (element, event, expression) => {
        try {
            const evaluator = compileExpression(expression);
            const result = evaluator.call(element, event);
            if (result === false) {
                event.preventDefault();
                event.stopPropagation();
            }
        } catch (error) {
            // Legacy expressions must fail safely so one bad handler doesn't break the page.
            console.error('Legacy inline handler failed:', error);
        }
    };

    const bindLegacyAttribute = (element, attributeName, expression) => {
        if (!attributeName.startsWith(ATTRIBUTE_PREFIX)) return;

        const eventName = attributeName.slice(ATTRIBUTE_PREFIX.length);
        if (!eventName) return;

        const flagName = `${BOUND_FLAG_PREFIX}${eventName}`;
        if (element.dataset[flagName] === 'true') return;

        element.addEventListener(eventName, (event) => runExpression(element, event, expression), false);
        element.dataset[flagName] = 'true';

        if (eventName === 'error' && element.tagName === 'IMG' && element.complete && element.naturalWidth === 0) {
            runExpression(element, new Event('error'), expression);
        }
    };

    const migrateInlineAttributes = (element) => {
        if (!element || element.nodeType !== 1) return;

        const currentAttributes = Array.from(element.attributes || []);
        currentAttributes.forEach((attribute) => {
            if (!attribute.name.startsWith('on')) return;

            const modernName = `${ATTRIBUTE_PREFIX}${attribute.name.toLowerCase()}`;
            if (!element.hasAttribute(modernName)) {
                element.setAttribute(modernName, attribute.value || '');
            }
            element.removeAttribute(attribute.name);
        });
    };

    const bindElement = (element) => {
        if (!element || element.nodeType !== 1) return;

        migrateInlineAttributes(element);
        Array.from(element.attributes || []).forEach((attribute) => {
            if (attribute.name.startsWith(ATTRIBUTE_PREFIX)) {
                bindLegacyAttribute(element, attribute.name, attribute.value || '');
            }
        });
    };

    const bindTree = (root) => {
        if (!root || root.nodeType !== 1) return;
        bindElement(root);
        root.querySelectorAll('*').forEach((node) => bindElement(node));
    };

    const observeNewNodes = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        bindTree(node);
                    }
                });
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    };

    const init = () => {
        bindTree(document.documentElement);
        observeNewNodes();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
