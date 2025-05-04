        document.getElementById('booking-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // 1. Get Form Data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const people = document.getElementById('people').value;
            const message = document.getElementById('message').value;

            // 2. Validate Form Data (Optional, but recommended)
            if (!name || !email || !phone || !date || !time || !people) {
                alert('Please fill in all required fields.');
                return; // Stop the process if fields are missing
            }

            //  Basic Email Validation (Optional)
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // 3. Prepare EmailJS Template Parameters
            const templateParams = {
                name: name,
                email: email,
                phone: phone,
                date: date,
                time: time,
                people: people,
                message: message,
            };

            // 4. Send Email using EmailJS
            // Replace with your actual EmailJS service ID and template ID
            const serviceId = 'service_6sezhx5';  //  Replace with your Service ID
            const templateId = 'template_6nmnodf';    // Replace with your Template ID
            const publicKey = 'ZVuXC7afHqHl1ZNzW'; // Replace with your Public Key

            emailjs.init(publicKey); // Initialize EmailJS with your Public Key
            emailjs.send(serviceId, templateId, templateParams)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Your booking request has been sent successfully!');
                    document.getElementById('booking-form').reset(); // Clear the form
                })
                .catch((error) => {
                    console.error('FAILED...', error);
                    alert('Sorry, there was an error sending your request. Please try again.');
                });
        });
