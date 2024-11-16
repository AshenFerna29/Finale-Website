window.addEventListener('load', () => {
    const splash = document.getElementById('splash');

    setTimeout(() => {
        splash.classList.add('hidden');
    }, 3000); // Splash screen stays for 3 seconds

    splash.addEventListener('transitionend', () => {
        window.location.href = 'main/HomePage.html'; // Redirect to main.html after fade out
    });
});
