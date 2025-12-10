      AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });

      
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

  
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });

       
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                  
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

       
 document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const loader = document.getElementById('loader');


    formMessage.style.display = 'none';

   
    buttonText.style.display = 'none';
    loader.style.display = 'inline';   
    submitButton.disabled = true;      



    const resetFormState = () => {
        buttonText.style.display = 'inline';
        loader.style.display = 'none';               submitButton.disabled = false;     
    };



    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
      
        resetFormState();

        if (data.success) {
           
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.style.color = 'green';
            formMessage.style.display = 'block';
            form.reset();
        } else {
           
            const errorMessage = data.message || 'Oops! Something went wrong. Please try again.';
            formMessage.textContent = errorMessage;
            formMessage.style.color = 'red';
            formMessage.style.display = 'block';
        }
    })
    .catch(error => {
        
        resetFormState();
        
     
        formMessage.textContent = 'A network error occurred. Check your connection and try again.';
        formMessage.style.color = 'red';
        formMessage.style.display = 'block';
    });
});