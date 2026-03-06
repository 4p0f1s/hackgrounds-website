document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.timeline');
    

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => observer.observe(item));
    

    function updateProgress() {
        if (!progressBar || !timeline) return;
        
        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection) return;
        
        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.offsetHeight;
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const scrolled = scrollPosition - sectionTop + windowHeight / 2;
        let progress = Math.min(Math.max((scrolled / sectionHeight) * 100, 0), 100);
        

        const maxProgress = 45; 
        progress = Math.min(progress, maxProgress);
        
        progressBar.style.width = progress + '%';
        

        if (timeline) {
            timeline.style.setProperty('--progress', progress + '%');
        }
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
});
