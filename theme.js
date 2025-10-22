document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light-mode') {
        body.classList.add('light-mode');
        if (themeToggle) {
            themeToggle.checked = true; 
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light-mode');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }
});