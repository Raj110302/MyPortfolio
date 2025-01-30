document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const form = event.target;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all the fields.');
        return;
    }
    
    // Check email validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show a loading or success message
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Sending...';

    // Simulate form submission to Formspree (replace with your URL)
    fetch('https://formspree.io/f/xnnnoblp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you! Your message has been sent.');
            form.reset();  // Clear the form
        } else {
            alert('There was a problem sending your message. Please try again.');
        }
    })
    .catch(() => {
        alert('Failed to send the message. Please check your connection and try again.');
    })
    .finally(() => {
        button.disabled = false;
        button.textContent = 'Send Message';
    });
});
