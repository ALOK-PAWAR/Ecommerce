const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');

document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
        const productId = event.target.dataset.id;
        const email = prompt('Enter your email for the receipt:');

        const response = await fetch('/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, email })
        });

        const { clientSecret, downloadLink } = await response.json();

        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: stripe.elements().create('card'),
                billing_details: { email }
            }
        });

        if (!error) {
            alert('Payment successful! Download link: ' + downloadLink);
            window.location.href = downloadLink;
        } else {
            alert('Payment failed: ' + error.message);
        }
    });
});
