const bottomOfPageIsVisible = () => document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight);

const getCurrentUrl = () => window.location.href

const elementContains = (parent, child) => parent !== child && parent.contains(child);

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName]

const setStyle = (el, ruleName, value) => (el.style[ruleName] = value);

const hasClass = (el, className) => el.classList.contains(className);

const hideElements = (...els) => [...els].forEach(el => (el.style.display = 'none'));

const showElements = (...els) => [...els].forEach(el => (el.style.display = ''));

const insertAfterElement = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString);

const insertBeforeElement = (el, htmlString) => el.insertAdjacentHTML('beforebegin', htmlString);

// Returns if current environment is a browser (true) or server such as node (false)
const isBrowser = () => ![typeof window, typeof document].includes('undefined')

const isBrowserTabFocused = () => !document.hidden

const nodeListToArray = nodeList => [...nodeList]

const scrollToTopAnimated = () => {
    const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
    }
};

// When called on an element, it smooth scrolls the element into view
const smoothScrollToElement = element =>
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });

// strips html tags from string
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '')
