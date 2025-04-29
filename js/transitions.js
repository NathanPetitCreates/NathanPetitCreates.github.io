document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        // Only handle internal links
        if (link.href.startsWith(window.location.origin)) {
            link.addEventListener('click', handleLinkClick);
        }
    });
});

function handleLinkClick(e) {
    // Don't handle hash links
    if (e.currentTarget.href.includes('#')) {
        return;
    }

    e.preventDefault();
    const target = e.currentTarget.href;

    // Start fade out
    document.body.style.animation = 'fadeOut 0.5s ease-out forwards';

    // Wait for animation to complete
    setTimeout(() => {
        window.location.href = target;
    }, 500);
}
