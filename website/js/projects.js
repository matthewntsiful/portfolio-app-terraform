document.addEventListener('DOMContentLoaded', () => {
    // Initialize project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    let delay = 0;
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, delay);
        delay += 100; // Stagger the animation
    });

    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.getElementById('projects-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.categories.includes(filter)) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    void card.offsetWidth;
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                    // Wait for animation to complete before hiding
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Case study toggle
    document.addEventListener('click', (e) => {
        // Open case study
        if (e.target.closest('.view-case-study')) {
            const card = e.target.closest('.project-card');
            if (card) {
                card.classList.add('flipped');
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Close case study
        if (e.target.closest('.close-case-study')) {
            const card = e.target.closest('.project-card');
            if (card) {
                card.classList.remove('flipped');
                document.body.style.overflow = '';
            }
        }
    });

    // Close case study with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const flippedCard = document.querySelector('.project-card.flipped');
            if (flippedCard) {
                flippedCard.classList.remove('flipped');
                document.body.style.overflow = '';
            }
        }
    });

    // Close case study when clicking outside
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        const isCardClick = e.target.closest('.card-inner');
        const isViewButton = e.target.closest('.view-case-study');
        
        if (card && !isCardClick && !isViewButton) {
            card.classList.remove('flipped');
            document.body.style.overflow = '';
        }
    });
});
