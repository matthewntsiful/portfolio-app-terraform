// Immediately Invoked Function Expression to prevent global scope pollution
(function() {
    // Only define SkillItem if it doesn't already exist
    if (!customElements.get('skill-item')) {
        class SkillItem extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                const name = this.getAttribute('name') || '';
                const level = this.getAttribute('level') || '50';
                const levelText = this.getAttribute('level-text') || 'Intermediate';
                
                this.shadowRoot.innerHTML = `
                    <style>
                        .skill-container {
                            margin-bottom: 0.5rem;
                        }
                        .skill-header {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 0.25rem;
                        }
                        .skill-name {
                            color: #e5e7eb;
                            font-weight: 500;
                        }
                        .skill-level {
                            color: #38bdf8;
                            font-size: 0.875rem;
                        }
                        .progress-container {
                            width: 100%;
                            background-color: rgba(55, 65, 81, 0.5);
                            border-radius: 0.5rem;
                            height: 0.5rem;
                            overflow: hidden;
                        }
                        .progress-bar {
                            height: 100%;
                            border-radius: 0.5rem;
                            background: linear-gradient(90deg, #22c55e, #06b6d4);
                            transition: width 1s ease-in-out;
                        }
                    </style>
                    <div class="skill-container">
                        <div class="skill-header">
                            <span class="skill-name">${name}</span>
                            <span class="skill-level">${levelText}</span>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${level}%"></div>
                        </div>
                    </div>
                `;
            }
        }
        
        // Define the custom element
        customElements.define('skill-item', SkillItem);
    }
    
    // Only define SkillBadge if it doesn't already exist
    if (!customElements.get('skill-badge')) {
        class SkillBadge extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            
            connectedCallback() {
                const icon = this.getAttribute('icon') || 'fas fa-code';
                const name = this.getAttribute('name') || 'Skill';
                const color = this.getAttribute('color') || 'gray-400';
                
                this.shadowRoot.innerHTML = `
                    <style>
                        .badge-container {
                            background-color: rgba(31, 41, 55, 0.5);
                            padding: 1rem;
                            border-radius: 0.5rem;
                            text-align: center;
                            transition: all 0.3s;
                            border: 1px solid rgba(55, 65, 81, 0.5);
                        }
                        .badge-container:hover {
                            background-color: rgba(55, 65, 81, 0.5);
                            transform: translateY(-2px);
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                        }
                        .badge-icon {
                            font-size: 1.75rem;
                            margin-bottom: 0.5rem;
                            display: inline-block;
                        }
                        .badge-name {
                            color: #e5e7eb;
                            font-weight: 500;
                            font-size: 0.875rem;
                        }
                    </style>
                    <div class="badge-container">
                        <div class="badge-icon" style="color: var(--tw-${color.split('-')[0]}-${color.split('-')[1] || '400'})">
                            <i class="${icon}"></i>
                        </div>
                        <p class="badge-name">${name}</p>
                    </div>
                `;
            }
        }
        
        // Define the custom element
        customElements.define('skill-badge', SkillBadge);
    }
    
    // Add animation to skill cards when they come into view
    const animateSkills = () => {
        const skillCards = document.querySelectorAll('.skill-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        skillCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });
    };

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkills);
    } else {
        initSkills();
    }
    
    function initSkills() {
        if (document.getElementById('skills')) {
            animateSkills();
        }
    }
})();
