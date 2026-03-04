document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    } else {
        // Default to light mode
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    // Markdown Rendering Logic
    async function loadMarkdown(file, containerId, renderFunction) {
        try {
            const response = await fetch(file, { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const markdown = await response.text();

            // Render basic HTML using marked
            const html = marked.parse(markdown);
            const container = document.getElementById(containerId);
            if (!container) return;

            // Create a temporary div to parse the generated HTML nodes
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Use the specific render function to format it beautifully
            renderFunction(tempDiv, container);
        } catch (error) {
            console.error(`Could not load ${file}:`, error);
            const container = document.getElementById(containerId);
            if (container) container.innerHTML = `<p class="italic-text">Error loading content.</p>`;
        }
    }

    // Render Skills
    function renderSkills(tempDiv, container) {
        const headings = tempDiv.querySelectorAll('h2');
        headings.forEach(heading => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';

            const h3 = document.createElement('h3');
            h3.textContent = heading.textContent;

            let p = document.createElement('p');
            // Assuming next sibling is a paragraph containing the skills
            let nextEl = heading.nextElementSibling;
            if (nextEl && nextEl.tagName === 'P') {
                p.innerHTML = nextEl.innerHTML;
            }

            categoryDiv.appendChild(h3);
            categoryDiv.appendChild(p);
            container.appendChild(categoryDiv);
        });
    }

    // Render Experience
    function renderExperience(tempDiv, container) {
        const headings = tempDiv.querySelectorAll('h2');
        headings.forEach(heading => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'timeline-item';

            const dot = document.createElement('div');
            dot.className = 'timeline-dot';
            itemDiv.appendChild(dot);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'timeline-content';

            const headerDiv = document.createElement('div');
            headerDiv.className = 'timeline-header';

            const titlesDiv = document.createElement('div');

            // Parse heading: Role | Company
            let rawTitle = heading.textContent;
            let role = rawTitle;
            let company = "";
            let githubLink = heading.querySelector('a'); // Might exist inside h2 initially

            if (rawTitle.includes('|')) {
                const parts = rawTitle.split('|');
                role = parts[0].trim();
                company = parts[1].replace(/github/i, '').trim();
            }

            const h3 = document.createElement('h3');
            h3.textContent = role;
            titlesDiv.appendChild(h3);

            const h4 = document.createElement('h4');
            h4.textContent = company;
            titlesDiv.appendChild(h4);
            headerDiv.appendChild(titlesDiv);

            // Get date from next element (paragraph with em)
            let nextEl = heading.nextElementSibling;
            if (nextEl && nextEl.tagName === 'P') {
                const dateSpan = document.createElement('span');
                dateSpan.className = 'date';

                let dateText = nextEl.textContent;

                // if there are links in this paragraph, append them next to the company name
                const links = nextEl.querySelectorAll('a');
                if (links.length > 0) {
                    links.forEach(l => {
                        const link = document.createElement('a');
                        link.href = l.href;
                        link.className = 'link';
                        link.textContent = l.textContent;
                        h4.appendChild(document.createTextNode(' | '));
                        h4.appendChild(link);
                        dateText = dateText.replace('|', '').replace(l.textContent, '').trim();
                    });
                }

                dateSpan.textContent = dateText;
                headerDiv.appendChild(dateSpan);
                nextEl = nextEl.nextElementSibling;
            }

            contentDiv.appendChild(headerDiv);

            // Find UL for bullets
            if (nextEl && nextEl.tagName === 'UL') {
                nextEl.className = 'bullet-list';
                contentDiv.appendChild(nextEl);
            }

            itemDiv.appendChild(contentDiv);
            container.appendChild(itemDiv);
        });
    }

    // Render Projects
    function renderProjects(tempDiv, container) {
        const headings = tempDiv.querySelectorAll('h2');
        headings.forEach(heading => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card project-card';

            const headerDiv = document.createElement('div');
            headerDiv.className = 'card-header';

            const h3 = document.createElement('h3');
            // Safe extraction of text without child node text
            let text = "";
            heading.childNodes.forEach(n => {
                if (n.nodeType === Node.TEXT_NODE) text += n.textContent;
            });
            h3.textContent = text.replace('|', '').trim();
            headerDiv.appendChild(h3);

            const linksDiv = document.createElement('div');
            linksDiv.className = 'card-links';

            // Get links from heading
            const links = heading.querySelectorAll('a');
            links.forEach(l => {
                const a = document.createElement('a');
                a.href = l.href;
                a.className = 'link';
                a.textContent = l.textContent;
                linksDiv.appendChild(a);
            });

            let nextEl = heading.nextElementSibling;

            // Check for tagline / links in first p
            if (nextEl && nextEl.tagName === 'P') {
                let tagline = document.createElement('p');
                tagline.className = 'project-tagline';

                // Some links might be in the paragraph
                let innerText = nextEl.innerHTML;
                const pLinks = nextEl.querySelectorAll('a');
                pLinks.forEach(l => {
                    const a = document.createElement('a');
                    a.href = l.href;
                    a.className = 'link';
                    a.textContent = l.textContent;
                    linksDiv.appendChild(a);
                    innerText = innerText.replace(l.outerHTML, '').replace('|', '').trim();
                });

                if (innerText.length > 0 && innerText !== ' ' && innerText !== '|') {
                    tagline.innerHTML = innerText;
                    cardDiv.appendChild(tagline);
                }

                nextEl = nextEl.nextElementSibling;
            }

            headerDiv.appendChild(linksDiv);
            cardDiv.appendChild(headerDiv);

            // check for direct bullet list
            if (nextEl && nextEl.tagName === 'UL') {
                nextEl.className = 'bullet-list mt-top';
                cardDiv.appendChild(nextEl);
                nextEl = nextEl.nextElementSibling;
            }

            // Check for subsections natively
            while (nextEl && nextEl.tagName === 'H3') {
                const subDiv = document.createElement('div');
                subDiv.className = 'project-subsection';

                const h4 = document.createElement('h4');
                h4.textContent = nextEl.textContent;
                subDiv.appendChild(h4);

                nextEl = nextEl.nextElementSibling;
                if (nextEl && nextEl.tagName === 'UL') {
                    nextEl.className = 'bullet-list';
                    subDiv.appendChild(nextEl);
                    nextEl = nextEl.nextElementSibling;
                }
                cardDiv.appendChild(subDiv);
            }

            container.appendChild(cardDiv);
        });
    }

    // Render Education and Achievements
    function renderEducation(tempDiv, container) {
        // Education List
        const edHeadings = tempDiv.querySelectorAll('h2');
        if (edHeadings.length > 0) {
            const edTitle = document.createElement('h2');
            edTitle.className = 'section-heading';
            edTitle.textContent = 'Education';
            container.appendChild(edTitle);

            const cardList = document.createElement('div');
            cardList.className = 'card-list';

            edHeadings.forEach(heading => {
                const card = document.createElement('div');
                card.className = 'card';

                const header = document.createElement('div');
                header.className = 'card-header';

                const h3 = document.createElement('h3');
                h3.innerHTML = `<i class="fas fa-university mr-sm"></i> ${heading.textContent}`;
                header.appendChild(h3);

                let nextEl = heading.nextElementSibling;
                if (nextEl && nextEl.tagName === 'P') {
                    const dateSpan = document.createElement('span');
                    dateSpan.className = 'date';
                    dateSpan.textContent = nextEl.textContent;
                    header.appendChild(dateSpan);
                    nextEl = nextEl.nextElementSibling;
                }
                card.appendChild(header);

                if (nextEl && nextEl.tagName === 'P') {
                    const p = document.createElement('p');
                    p.className = 'italic-text';
                    p.innerHTML = nextEl.innerHTML;
                    card.appendChild(p);
                }
                cardList.appendChild(card);
            });
            container.appendChild(cardList);
        }

        // Achievements
        const h1s = tempDiv.querySelectorAll('h1');
        if (h1s.length > 0) {
            const sectionWrap = document.createElement('section');
            sectionWrap.id = "achievements";
            sectionWrap.className = "section-spacing fade-in m-bottom";

            const cdn = document.createElement('div');
            cdn.className = 'section-container';

            const grid = document.createElement('div');
            grid.className = 'one-col-grid';

            h1s.forEach(heading => {
                const col = document.createElement('div');
                const h2 = document.createElement('h2');
                h2.className = 'section-heading';
                h2.textContent = heading.textContent;
                col.appendChild(h2);

                let nextEl = heading.nextElementSibling;
                if (nextEl && nextEl.tagName === 'UL') {
                    nextEl.className = 'bullet-list card-pad';
                    col.appendChild(nextEl);
                }
                grid.appendChild(col);
            });

            cdn.appendChild(grid);
            sectionWrap.appendChild(cdn);

            // Insert after education section
            container.parentElement.parentElement.insertAdjacentElement('afterend', sectionWrap);

            // Re-apply observer for dynamically added sections
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });
            observer.observe(sectionWrap);
        }
    }

    // Render About
    function renderAbout(tempDiv, container) {
        // Just extract all the content and append to the container
        container.innerHTML = tempDiv.innerHTML;

        // Add styling classes to headers and paragraphs
        const h1 = container.querySelector('h1');
        if (h1) {
            h1.className = 'hero-title';
            // Replace bold tags in h1 (if any) with normal text, the title is already styled
            h1.innerHTML = h1.textContent;
        }

        const paragraphs = container.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.className = 'hero-bio';

            // Style links inside paragraphs
            const links = p.querySelectorAll('a');
            links.forEach(l => {
                l.className = 'link';
            });
        });
    }

    // Render Publications
    function renderPublications(tempDiv, container) {
        const headings = tempDiv.querySelectorAll('h2');
        headings.forEach((heading, index) => {
            const pubTitle = document.createElement('h2');
            pubTitle.className = 'section-heading';
            if (index > 0) pubTitle.style.marginTop = '40px';
            pubTitle.textContent = heading.textContent; // e.g. "News", "Publications"
            container.appendChild(pubTitle);

            let nextEl = heading.nextElementSibling;
            if (nextEl && nextEl.tagName === 'UL') {
                nextEl.className = 'bullet-list';
                // Style any links inside the bullets
                const links = nextEl.querySelectorAll('a');
                links.forEach(l => l.className = 'link');

                container.appendChild(nextEl);
            }
        });
    }

    // Load all markdown files
    loadMarkdown('src/about.md', 'about-content', renderAbout);
    loadMarkdown('src/news.md', 'news-content', renderPublications);
    loadMarkdown('src/publications.md', 'publications-content', renderPublications);
    loadMarkdown('src/skills.md', 'skills-content', renderSkills);
    loadMarkdown('src/experience.md', 'experience-content', renderExperience);
    loadMarkdown('src/projects.md', 'projects-content', renderProjects);

    // We moved the achievements out to publications, so we only need to render the education cards.
    // The previous renderEducation function still works fine if it just finds h2s for the cards.
    loadMarkdown('src/education.md', 'education-content', renderEducation);
    loadMarkdown('src/extracurricular.md', 'extracurricular-content', renderPublications);
});
