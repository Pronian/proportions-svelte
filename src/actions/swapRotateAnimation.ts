export function createSwapAnimation(options?: { 
    duration?: number,
    easingCSS?: string,
    verticalOriginOffset?: number
}) {
    const { 
        duration = 500,
        easingCSS = 'ease-in-out',
        verticalOriginOffset = 0
    } = options || {};

    const transitionString = `transform ${duration}ms ${easingCSS}`;

    let isAnimating = false;
    let timeout: ReturnType<typeof setTimeout>;
    let leftElement: HTMLElement;
    let leftChildElement: HTMLElement;
    let rightElement: HTMLElement;
    let rightChildElement: HTMLElement;
    let verticalCenter: number;

    function clearStyles(...nodes: HTMLElement[]) {
        for (const node of nodes) {
            node.style.transform = '';
            node.style.transformOrigin = '';
            node.style.transition = '';
        }
    }

    function updateStyles(node: HTMLElement, transformOriginX: number = 0, rotationDeg: number = 0) {
        node.style.transform = `rotate(${rotationDeg}deg)`;
        if (transformOriginX !== 0) {
            node.style.transformOrigin = `${transformOriginX}px ${verticalCenter}px`;
        } else {
            node.style.transformOrigin = `center ${verticalCenter}px`;
        }
        node.style.transition = transitionString;
    }

    function triggerAnimation(onCompleteCallback = () => {}) {
        if (isAnimating) {
            clearTimeout(timeout);
            clearStyles(leftElement, leftChildElement, rightElement, rightChildElement);
            isAnimating = false;
        }
        
        if (
            leftElement && leftChildElement
            && rightElement && rightChildElement
            && leftElement.parentElement instanceof HTMLElement
        ) {
            verticalCenter = leftElement.offsetHeight / 2 + verticalOriginOffset;
            let xCenterParentElement = leftElement.parentElement.offsetWidth / 2;
            let xCenterAccordingRightElement = rightElement.offsetWidth - xCenterParentElement

            let hasXScrollbar = document.documentElement.scrollWidth > document.documentElement.clientWidth;
            let hasYScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;
            document.documentElement.style.overflowX = hasXScrollbar ? '' : 'hidden';
            document.documentElement.style.overflowY = hasYScrollbar ? '' : 'hidden';
            updateStyles(leftElement, xCenterParentElement, 180);
            updateStyles(leftChildElement, 0, -180);

            updateStyles(rightElement, xCenterAccordingRightElement, 180);
            updateStyles(rightChildElement, 0, -180);

            isAnimating = true;

            timeout = setTimeout(() => {
                clearStyles(leftElement, leftChildElement, rightElement, rightChildElement);
                isAnimating = false;
                document.documentElement.style.overflowX = '';
                document.documentElement.style.overflowY = '';
                onCompleteCallback();
            },duration);
        }
    }

    function actionRotateRight(node: HTMLElement) {
        if (node.firstElementChild instanceof HTMLElement === false) return;
        leftElement = node;
        leftChildElement = node.firstElementChild as HTMLElement;
    }

    function actionRotateLeft(node: HTMLElement) {
        if (node.firstElementChild instanceof HTMLElement === false) return;
        rightElement = node;
        rightChildElement = node.firstElementChild as HTMLElement;
    }

    return {
        triggerAnimation,
        actionRotateRight,
        actionRotateLeft
    }
}