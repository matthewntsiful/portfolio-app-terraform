// SEO utilities with fallbacks
let seoUtils = {
    initSEO: () => {},
    updateMetaTags: () => {},
    updateCanonicalUrl: () => {}
};

// Function to load SEO utilities
async function loadSEO() {
    try {
        const module = await import('./seo-utils.js');
        seoUtils = {
            initSEO: module.initSEO || seoUtils.initSEO,
            updateMetaTags: module.updateMetaTags || seoUtils.updateMetaTags,
            updateCanonicalUrl: module.updateCanonicalUrl || seoUtils.updateCanonicalUrl
        };
    } catch (error) {
        console.warn('SEO utilities not available, using fallbacks');
    }
}

// Initialize SEO
loadSEO();

// Constants
const POSTS_PER_PAGE = 6;


// Blog initialization
const initBlog = async () => {
    try {
        console.log('Initializing blog...');
        
        // Load blog posts
        const posts = await fetchBlogPosts();
        
        if (posts && posts.length > 0) {
            // Initialize blog features
            displayPosts(posts);
            initPagination(posts);
            initSearch(posts);
            initCategoryFilters(posts);
            initTagCloud(posts);
            
            console.log('Blog initialized successfully');
            return true;
        } else {
            displayError('No blog posts found');
            return false;
        }
    } catch (error) {
        console.error('Error initializing blog:', error);
        displayError('Failed to load blog posts. Please try again later.');
        return false;
    }
};

// Export the initBlog function for module import
export { initBlog };

// Sample blog posts data (in a real app, this would come from an API)
const samplePosts = [
    {
        id: 1,
        title: 'Implementing GitOps Workflow with ArgoCD and Kubernetes',
        date: '2023-07-20',
        excerpt: 'A comprehensive guide to implementing GitOps workflow using ArgoCD for continuous delivery in Kubernetes clusters.',
        category: 'devops',
        tags: ['GitOps', 'ArgoCD', 'Kubernetes', 'CI/CD'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        url: '/blog/implementing-gitops-workflow',
        readTime: '8 min read'
    },
    {
        id: 2,
        title: 'Optimizing AWS Costs for Startups',
        date: '2023-06-15',
        excerpt: 'Practical strategies to reduce your cloud bill without sacrificing performance or reliability.',
        category: 'cloud',
        tags: ['AWS', 'Cost Optimization', 'Cloud'],
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        url: '/blog/optimizing-aws-costs',
        readTime: '5 min read'
    },
    {
        id: 3,
        title: 'Building Secure CI/CD Pipelines',
        date: '2023-05-28',
        excerpt: 'How to implement security best practices in your deployment pipelines from day one.',
        category: 'devops',
        tags: ['DevOps', 'CI/CD', 'Security'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        url: '/blog/secure-cicd-pipelines',
        readTime: '7 min read'
    },
    {
        id: 4,
        title: 'Infrastructure as Code with Terraform',
        date: '2023-03-22',
        excerpt: 'Best practices for managing infrastructure as code using Terraform in enterprise environments.',
        category: 'automation',
        tags: ['Terraform', 'Infrastructure', 'Automation'],
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        url: '/blog/terraform-best-practices',
        readTime: '6 min read'
    },
    {
        id: 5,
        title: 'Implementing Zero Trust Security Model',
        date: '2023-02-10',
        excerpt: 'A practical approach to implementing Zero Trust security in modern cloud-native applications.',
        category: 'security',
        tags: ['Security', 'Zero Trust', 'Cloud Security'],
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        url: '/blog/zero-trust-security',
        readTime: '10 min read'
    },
    {
        id: 6,
        title: 'Automating Infrastructure with Ansible',
        date: '2023-01-05',
        excerpt: 'How we automated our infrastructure management using Ansible playbooks and roles.',
        category: 'automation',
        tags: ['Ansible', 'Automation', 'DevOps'],
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        url: '/blog/ansible-automation',
        readTime: '5 min read'
    }
];

async function loadAndDisplayBlogPost() {
    try {
        // Get the post slug from the URL
        const slug = window.location.pathname.split('/').pop();
        
        // In a real app, you would fetch the post from an API
        // const post = await fetchBlogPost(slug);
        const post = samplePosts.find(p => p.url === `/blog/${slug}`);
        
        if (!post) {
            // Post not found, redirect to blog listing
            window.location.href = '/blog';
            return;
        }
        
        // Update the page title and meta tags for SEO
        seoUtils.updateMetaTags(post);
        
        // Render the blog post
        renderBlogPost(post);
        
        // Update the canonical URL
        seoUtils.updateCanonicalUrl(window.location.origin + post.url);
    } catch (error) {
        console.error('Error loading blog post:', error);
        displayError('Failed to load the blog post. Please try again later.');
    }
}

/**
 * Render a single blog post
 * @param {Object} post - The blog post to render
 */
function renderBlogPost(post) {
    const main = document.querySelector('main');
    if (!main) return;
    
    // Format the date
    const formattedDate = formatDate(post.date);
    
    // Get related posts
    const relatedPosts = getRelatedPosts(post.id, samplePosts, 3);
    
    // Create the HTML for the blog post
    main.innerHTML = `
        <article class="max-w-4xl mx-auto px-4 py-12">
            <header class="mb-12">
                <div class="flex flex-wrap items-center gap-2 text-sm text-blue-400 mb-4">
                    <span class="inline-block px-3 py-1 bg-blue-500/10 rounded-full">
                        ${post.category}
                    </span>
                    <span class="text-gray-500">•</span>
                    <time datetime="${post.date}" class="text-gray-400">
                        <i class="far fa-calendar-alt mr-1"></i>${formattedDate}
                    </time>
                    <span class="text-gray-500">•</span>
                    <span class="text-gray-400">
                        <i class="far fa-clock mr-1"></i>${post.readTime}
                    </span>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">${post.title}</h1>
                <div class="flex items-center">
                    <img src="/images/avatar.jpg" alt="Matthew Ntsiful" class="w-12 h-12 rounded-full mr-4 border-2 border-blue-500/30">
                    <div>
                        <p class="text-white font-medium">Matthew Ntsiful</p>
                        <p class="text-blue-400 text-sm">Cloud & DevOps Engineer</p>
                    </div>
                </div>
            </header>
            
            <div class="prose prose-invert max-w-none">
                <div class="aspect-w-16 aspect-h-9 mb-12 rounded-xl overflow-hidden">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                </div>
                
                <!-- Blog post content -->
                <div id="blog-post-content" class="mt-8">
                    <p class="text-xl text-gray-300 mb-8 leading-relaxed">${post.excerpt}</p>
                    <!-- In a real app, this would be loaded from the markdown content -->
                    <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 mb-12">
                        <p class="text-gray-400 italic">This is a placeholder for the blog post content. In a real implementation, this would be loaded from the markdown file.</p>
                    </div>
                </div>
                
                <!-- Tags -->
                <div class="flex flex-wrap items-center gap-2 mt-12 mb-8">
                    <span class="text-gray-400 text-sm font-medium">Tags:</span>
                    ${post.tags.map(tag => `
                        <a href="/blog?tag=${tag.toLowerCase()}" 
                           class="inline-flex items-center px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-sm rounded-full transition-all duration-200">
                            #${tag}
                        </a>
                    `).join('')}
                </div>
                
                <!-- Share Buttons -->
                <div class="flex flex-wrap items-center gap-4 my-8 py-6 border-t border-b border-gray-800">
                    <span class="text-gray-400 text-sm font-medium">Share:</span>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}" 
                       target="_blank" rel="noopener noreferrer"
                       class="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" 
                       target="_blank" rel="noopener noreferrer"
                       class="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>
                    <button onclick="navigator.clipboard.writeText(window.location.href).then(() => {
                        const btn = document.querySelector('#copy-link-btn');
                        const icon = btn.querySelector('i');
                        const text = btn.querySelector('span');
                        icon.className = 'fas fa-check';
                        text.textContent = 'Copied!';
                        setTimeout(() => {
                            icon.className = 'fas fa-link';
                <div class="mt-16 pt-8 border-t border-gray-800">
                    <div class="flex flex-col md:flex-row items-center">
                        <img src="/images/avatar.jpg" alt="Matthew Ntsiful" class="w-20 h-20 rounded-full mb-4 md:mb-0 md:mr-6 border-2 border-blue-500/30">
                        <div class="text-center md:text-left">
                            <h3 class="text-xl font-bold text-white">Matthew Ntsiful</h3>
                            <p class="text-blue-400 mb-2">Cloud & DevOps Engineer</p>
                            <p class="text-gray-300 max-w-2xl mb-4">I write about cloud infrastructure, DevOps practices, and technology trends. Follow me for more updates on cloud-native technologies and software development.</p>
                            <div class="flex justify-center md:justify-start gap-4">
                                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                                   class="text-gray-400 hover:text-blue-400 transition-colors"
                                   aria-label="GitHub">
                                    <i class="fab fa-github text-xl"></i>
                                </a>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                                   class="text-gray-400 hover:text-blue-400 transition-colors"
                                   aria-label="LinkedIn">
                                    <i class="fab fa-linkedin text-xl"></i>
                                </a>
                                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
                                   class="text-gray-400 hover:text-blue-400 transition-colors"
                                   aria-label="Twitter">
                                    <i class="fab fa-twitter text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation -->
                <div class="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between gap-6">
                    <a href="/blog" class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group">
                        <i class="fas fa-arrow-left mr-2 transition-transform group-hover:-translate-x-1"></i>
                        Back to all posts
                    </a>
                    <div class="flex items-center gap-4">
                        <span class="text-gray-400 text-sm hidden sm:inline">Share this post:</span>
                        <div class="flex gap-2">
                            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}" 
                               target="_blank" rel="noopener noreferrer"
                               class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                               aria-label="Share on Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" 
                               target="_blank" rel="noopener noreferrer"
                               class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                               aria-label="Share on LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
    
    // Add syntax highlighting (if needed)
    if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
}


// Initialize pagination
function initPagination(posts) {
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    if (totalPages <= 1) return; // No need for pagination if only one page
    
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination flex justify-center mt-12 mb-8';
    
    let paginationHTML = `
        <div class="flex items-center space-x-2">
            <button class="pagination-prev px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50" disabled>
                <i class="fas fa-chevron-left mr-2"></i> Previous
            </button>
            <div class="pagination-pages flex items-center space-x-1">
                <!-- Page numbers will be inserted here -->
            </div>
            <button class="pagination-next px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50" ${totalPages === 1 ? 'disabled' : ''}>
                Next <i class="fas fa-chevron-right ml-2"></i>
            </button>
        </div>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    document.getElementById('blog-posts-container').after(paginationContainer);
    
    // Add page numbers
    const pagesContainer = paginationContainer.querySelector('.pagination-pages');
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `w-10 h-10 rounded-md ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`;
        pageBtn.textContent = i;
        pageBtn.dataset.page = i;
        pagesContainer.appendChild(pageBtn);
    }
    
    // Add event listeners
    paginationContainer.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        
        const currentPage = parseInt(document.querySelector('.pagination-pages button.bg-blue-600')?.textContent || '1');
        let newPage = currentPage;
        
        if (target.classList.contains('pagination-prev') && currentPage > 1) {
            newPage = currentPage - 1;
        } else if (target.classList.contains('pagination-next') && currentPage < totalPages) {
            newPage = currentPage + 1;
        } else if (target.dataset.page) {
            newPage = parseInt(target.dataset.page);
        }
        
        if (newPage !== currentPage) {
            displayPosts(paginatePosts(samplePosts, newPage));
            updatePaginationUI(newPage, totalPages);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Update pagination UI
function updatePaginationUI(currentPage, totalPages) {
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');
    const pageBtns = document.querySelectorAll('.pagination-pages button');;
    
    // Update active page
    pageBtns.forEach(btn => {
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('bg-gray-800', 'text-gray-300');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-800', 'text-gray-300');
        }
    });
    
    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Paginate posts
function paginatePosts(posts, page) {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return posts.slice(start, end);
}

// Initialize tag cloud
function initTagCloud(posts) {
    const tagCloud = document.getElementById('tag-cloud');
    if (!tagCloud) return;
    
    // Count tag frequencies
    const tagCounts = {};
    posts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    
    // Sort tags by frequency
    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15); // Limit to top 15 tags
    
    // Generate tag cloud HTML with smaller font sizes
    tagCloud.innerHTML = sortedTags.map(([tag, count]) => {
        // Reduce the base size and scaling factor for smaller tags
        const size = 0.8 + (count / Math.max(...Object.values(tagCounts))) * 0.8; // Reduced from 1-2em to 0.8-1.6em
        return `
            <a href="/blog?tag=${tag.toLowerCase()}" 
               class="inline-block px-2.5 py-1 m-0.5 rounded-full text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-400"
               style="font-size: ${size}em; opacity: ${0.7 + (size - 0.8) * 0.3};">
                #${tag}
            </a>
        `;
    }).join('');
}

// Get related posts based on tags
function getRelatedPosts(currentPostId, allPosts, limit = 3) {
    const currentPost = allPosts.find(p => p.id === currentPostId);
    if (!currentPost) return [];
    
    // Calculate relatedness score based on common tags
    const postsWithScores = allPosts
        .filter(post => post.id !== currentPostId)
        .map(post => ({
            ...post,
            score: post.tags.filter(tag => currentPost.tags.includes(tag)).length
        }))
        .filter(post => post.score > 0)
        .sort((a, b) => b.score - a.score);
    
    return postsWithScores.slice(0, limit);
}

function displayPosts(posts, containerId = 'blog-posts-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear loading state
    container.innerHTML = '';
    
    if (!posts || posts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 mb-4">
                    <i class="fas fa-inbox text-3xl text-gray-600"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-300 mb-2">No posts found</h3>
                <p class="text-gray-500 max-w-md mx-auto mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                <button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        onclick="document.querySelector('.category-filter[data-category=\'all\']').click()">
                    View All Posts
                </button>
            </div>
        `;
        return;
    }
    
    // Create posts grid
    const postsGrid = document.createElement('div');
    postsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    // Default images based on category
    const defaultImages = {
        'devops': 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'cloud': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'kubernetes': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'security': 'https://images.unsplash.com/photo-1563986768494-4dee2763ff33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'automation': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'default': 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };
    
    // Add each post to the grid
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10';
        
        // Determine image source - use post image if available, otherwise use default based on category
        const category = post.category ? post.category.toLowerCase() : 'default';
        const imageSrc = post.image || defaultImages[category] || defaultImages['default'];
        
        postElement.innerHTML = `
            <a href="${post.url}" class="block h-full">
                <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden relative">
                    ${!post.image ? `<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>` : ''}
                    <img src="${imageSrc}" 
                         alt="${post.title}" 
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         loading="lazy"
                         onerror="this.src='${defaultImages['default']}'">
                </div>
                <div class="p-6">
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full">
                            ${post.category}
                        </span>
                        <span class="text-gray-500 text-sm">•</span>
                        <time datetime="${post.date}" class="text-sm text-gray-400 flex items-center">
                            <i class="far fa-calendar-alt text-xs mr-1"></i>
                            ${formatDate(post.date)}
                        </time>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2"
                        style="min-height: 3.5rem;">
                        ${post.title}
                    </h3>
                    <p class="text-gray-400 text-sm mb-4 line-clamp-2" style="min-height: 2.5rem;">
                        ${post.excerpt}
                    </p>
                    <div class="flex items-center justify-between pt-3 border-t border-gray-700/50">
                        <span class="text-xs text-gray-500 flex items-center">
                            <i class="far fa-clock mr-1"></i>
                            ${post.readTime}
                        </span>
                        <span class="inline-flex items-center text-sm text-blue-400 group-hover:translate-x-1 transition-transform">
                            Read More
                            <i class="fas fa-arrow-right ml-1 text-xs mt-0.5"></i>
                        </span>
                    </div>
                </div>
                ${post.tags && post.tags.length > 0 ? `
                <div class="px-6 pb-6 pt-2 -mt-2">
                    <div class="flex flex-wrap gap-2">
                        ${post.tags.slice(0, 2).map(tag => `
                            <span class="inline-block px-2.5 py-1 text-xs text-gray-400 bg-gray-700/50 rounded-full">
                                #${tag}
                            </span>
                        `).join('')}
                        ${post.tags.length > 2 ? `
                            <span class="inline-flex items-center justify-center w-6 h-6 text-xs text-gray-400 bg-gray-700/50 rounded-full">
                                +${post.tags.length - 2}
                            </span>
                        ` : ''}
                    </div>
                </div>` : ''}
            </a>
        `;
        
        // Add click effect
        postElement.addEventListener('mousedown', () => {
            postElement.classList.add('scale-95');
        });
        
        postElement.addEventListener('mouseup', () => {
            postElement.classList.remove('scale-95');
        });
        
        postElement.addEventListener('mouseleave', () => {
            postElement.classList.remove('scale-95');
        });
        
        postsGrid.appendChild(postElement);
    });
    
    // Clear container and append the grid
    container.innerHTML = '';
    container.appendChild(postsGrid);
}

function initSearch(posts) {
    const searchInput = document.getElementById('blog-search-input');
    const searchButton = document.getElementById('blog-search-button');
    
    if (!searchInput) return;
    
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            displayPosts(posts);
            return;
        }
        
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.category.toLowerCase().includes(searchTerm)
        );
        
        displayPosts(filteredPosts);
        
        // Update URL with search query
        const url = new URL(window.location);
        url.searchParams.set('q', searchTerm);
        window.history.pushState({}, '', url);
    };
    
    // Search on input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    // Search on button click
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Check for search query in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        searchInput.value = searchQuery;
        performSearch();
    }
}

function initCategoryFilters(posts) {
    const filters = document.querySelectorAll('.category-filter');
    if (!filters.length) return;
    
    const updateActiveFilter = (activeFilter) => {
        filters.forEach(f => {
            f.classList.remove('active');
            if (f === activeFilter || f.getAttribute('data-category') === activeFilter) {
                f.classList.add('active');
            }
        });
    };
    
    const filterByCategory = (category) => {
        updateActiveFilter(category);
        
        if (category === 'all') {
            displayPosts(posts);
            return;
        }
        
        const filteredPosts = posts.filter(post => post.category === category);
        displayPosts(filteredPosts);
    };
    
    filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            const category = filter.getAttribute('data-category');
            
            // Update URL with category filter
            const url = new URL(window.location);
            if (category === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', category);
            }
            window.history.pushState({}, '', url);
            
            filterByCategory(category);
        });
    });
    
    // Check for category filter in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    if (categoryFilter) {
        filterByCategory(categoryFilter);
    } else if (window.location.pathname.endsWith('blog')) {
        // Set 'all' as active by default if no category is selected
        updateActiveFilter('all');
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function displayError(message) {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="blog-empty">
            <i class="fas fa-exclamation-triangle text-yellow-500"></i>
            <h3>Error Loading Posts</h3>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Fetches blog posts from the API
 * @returns {Promise<Array>} Array of blog posts
 */
async function fetchBlogPosts() {
    try {
        // In a real app, this would be your API endpoint
        const API_URL = 'https://api.yourblog.com/posts';
        
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // Enable CORS if needed
            mode: 'cors',
            cache: 'default'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API response to match our post structure if needed
        return data.posts ? data.posts.map(post => ({
            id: post.id,
            title: post.title,
            date: post.published_at || post.date,
            excerpt: post.excerpt || post.description || '',
            category: post.category || 'uncategorized',
            tags: post.tags || [],
            image: post.image?.url || post.featured_image || '/images/blog/placeholder.jpg',
            url: `/blog/${post.slug || post.id}`,
            readTime: post.read_time || calculateReadTime(post.content)
        })) : [];
        
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Return sample data as fallback
        return [...samplePosts];
    }
}

/**
 * Helper function to estimate read time
 * @param {string} content - The blog post content
 * @returns {string} Estimated read time
 */
function calculateReadTime(content) {
    if (!content) return '1 min read';
    
    // Average reading speed: 200 words per minute
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    return `${minutes} min read`;
}

