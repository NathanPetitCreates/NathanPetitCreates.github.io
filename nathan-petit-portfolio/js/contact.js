document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Change button state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Success message
                showMessage('Message sent successfully!', 'success');
                form.reset();
            } else {
                // Error message
                showMessage('Oops! There was a problem sending your message.', 'error');
            }
        } catch (error) {
            showMessage('Oops! There was a problem sending your message.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});

function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Insert message after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageElement, form.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}
