document.addEventListener('DOMContentLoaded', () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.replace('home.html');
        return;
    }
    const icons = document.querySelectorAll('.icon');
    const modal = $('#projectModal');
    const modalBody = $('#modalBody');
    const startButton = $('#startButton');
    const startMenu = $('#startMenu');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const iconContainers = document.querySelectorAll('.icons-container');
    const hireMeButton = document.getElementById('hireMeButton');

    // Setup initial random positions for icons (only for active tab)
    function layoutActiveIcons() {
        const activeContainer = document.querySelector('.icons-container.active');
        if (!activeContainer) return;

        const rect = activeContainer.getBoundingClientRect();
        const containerWidth = Math.max(0, rect.width);
        const containerHeight = Math.max(0, rect.height);
        const edgeMargin = 12; // keep icons away from edges

        const activeIcons = activeContainer.querySelectorAll('.icon');
        activeIcons.forEach(icon => {
            // Reset any previous drag translate so we compute from clean origin
            icon.style.transform = 'translate(0px, 0px)';
            icon.setAttribute('data-x', 0);
            icon.setAttribute('data-y', 0);

            const iconWidth = icon.offsetWidth || 120;
            const iconHeight = icon.offsetHeight || 120;

            const maxLeft = Math.max(edgeMargin, containerWidth - iconWidth - edgeMargin);
            const maxTop = Math.max(edgeMargin, containerHeight - iconHeight - edgeMargin);

            // If container is too small, fallback to (edgeMargin, edgeMargin)
            let left = edgeMargin;
            let top = edgeMargin;
            if (containerWidth > iconWidth + edgeMargin * 2) {
                left = Math.floor(edgeMargin + Math.random() * (maxLeft - edgeMargin));
            }
            if (containerHeight > iconHeight + edgeMargin * 2) {
                top = Math.floor(edgeMargin + Math.random() * (maxTop - edgeMargin));
            }

            icon.style.position = 'absolute';
            icon.style.left = `${left}px`;
            icon.style.top = `${top}px`;
        });
    }

    layoutActiveIcons();
    window.addEventListener('resize', () => {
        layoutActiveIcons();
    });

    // Initialize interact.js draggable
    interact('.icon').draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            start (event) {
                event.target.classList.add('dragging');
                event.target.style.zIndex = 1000;
            },
            move (event) {
                const target = event.target;
                
                // Get the current position
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                
                // Update the element's position
                target.style.transform = `translate(${x}px, ${y}px)`;
                
                // Store the position
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end (event) {
                event.target.classList.remove('dragging');
                event.target.style.zIndex = 1;
            }
        }
    });

    // Single click/tap to open project, but not if dragging
    let dragHappened = false;
    interact('.icon').on('dragmove', function (event) {
        dragHappened = true;
    });

    icons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            // If drag just happened, do not open modal
            if (dragHappened) {
                dragHappened = false;
                return;
            }
            const project = icon.getAttribute('data-project');
            openModal(project);
        });
        // For touch devices, use Interact.js tap event
        interact(icon).on('tap', function (event) {
            // If drag just happened, do not open modal
            if (dragHappened) {
                dragHappened = false;
                return;
            }
            const project = icon.getAttribute('data-project');
            openModal(project);
        });
    });

    if (hireMeButton) {
        hireMeButton.addEventListener('click', () => {
            openModal('HireMe');
        });
    }

    function openModal(project) {
        switch (project) {
            case '2DFluidSolver':
                modalBody.html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/9BaUaAe4TmI?si=QRom_XN0AWaW5BO3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> <br><a href="https://github.com/nav89-ux" > CLICK HERE TO SEE MY CODE ON GITHUB </a>`);
                modal.find('.modal-title').text('2D fluid solver');
                break;
            case 'MusicVisualizer':
                modalBody.html(`<iframe  width="800" height="800" src="https://editor.p5js.org/snaved159/full/kxgVyb5mX"></iframe>`);
                modal.find('.modal-title').text('Audio visualization - using the FFT (Fast Fourier transform) provided by p5');
                break; 
            case 'OrbitalGravitySimulation':
                modal.find('.modal-title').text('Orbital Gravity Simulation')
                var content = `<p>Simulates orbital dynamics using vector algebra. Pythagorean theorem in C++. <a href="https://github.com/nav89-ux" target="_blank">View Repository</a></p>
                            <img src="Assets/gravityDemo1.gif" alt="Orbital Gravity Simulation GIF 1" style="width:100%; height:auto;"/>
                            <img src="Assets/gravity2SourcesSmall.gif" alt="Orbital Gravity Simulation GIF 2" style="width:100%; height:auto;"/>
                            `;
                modalBody.html(content);                            
                break;
            case 'SpaceWars':
                modal.find('.modal-title').text('HOW TO PLAY? LEFT mouse click = bullet, Right mouse click = bomb and arrow/WASD for movement')
                modalBody.html('<p><a href="https://bongseng.itch.io/">Art created by bongseng</a></p> <br><iframe  width="850" height="650" src="https://editor.p5js.org/snaved159/full/hKcTgE64E"></iframe>');                            
                break;
            case 'ClothSim':
                modal.find('.modal-title').text('Cloth simulator')
                modalBody.html('<p><a href="https://superheroslice.pages.dev">Click to check it out on the site</a></p> <br><iframe src="https://superheroslice.pages.dev" width="100%" height="600" frameborder="0"></iframe>');                            
                break;
            case 'EarthQuakes':
              modal.find('.modal-title').text('Visualization of real world Earthquakes in the past 30 days from now around the planet.')
             modalBody.html('<iframe width="1024" height="512" src="https://editor.p5js.org/snaved159/full/lgDSXK8Yc"></iframe>');                            
            break;
            case 'UpWay':
                modal.find('.modal-title').text('UP WAY GAME')
               modalBody.html('<p><a href="https://naved90.itch.io/up-way">Play UP WAY on itch.io</a><br><img src="Assets/gameDemo.gif"  style="width:100%; height:auto;"/>');                            
              break;
            case 'HVAC':
                modal.find('.modal-title').text('AI HVAC support chatbot');
                modalBody.html('<div><p>I built a 24/7 AI assistant for an HVAC business that answers common customer questions and captures leads using the OpenAI API.</p><ul><li>Trained on the service pages, pricing, and FAQs.</li><li>Helps visitors get instant answers instead of waiting for email replies.</li><li>Collects contact details so the team can follow up and book more jobs.</li></ul><p>Demo video:</p><iframe width="560" height="315" src="https://www.youtube.com/embed/O2U7A3uSEVo?si=RWVkP33KZR6wwhRp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>');
                break;
            case 'givegigs':
                modal.find('.modal-title').text('GiveGigs  moderation dashboard for a freelance marketplace');
                modalBody.html('<div><p>GiveGigs is a freelance marketplace similar to Fiverr. I built a full role based moderation system and dashboard using Next.js and Supabase.</p><ul><li>Moderation views for reviewing gigs and user reports.</li><li>Role based access for admins, moderators, and normal users.</li><li>Fixed authentication issues and implemented user profile pages.</li></ul><p><a href="https://givegigs.vercel.app" target="_blank">Open GiveGigs</a></p><br><img src="Assets/givegigs.png" style="width:100%; height:auto;"><br><img src="Assets/givegigs1.png" style="width:100%; height:auto;"><br><img src="Assets/givegigs2.png" style="width:100%; height:auto;"></div>');
                break;
            case 'DebateDash':
                modal.find('.modal-title').text('DebateDash  real time debate platform');
                modalBody.html('<div><p>DebateDash is a real time debate and discussion platform with profiles and in app currency. Users can challenge each other, join debates, and react to posts similar to a social network.</p><ul><li>Live debate challenges and threaded discussions.</li><li>Virtual currency and rewards to increase engagement.</li><li>User profiles and feed similar to a lightweight social network.</li></ul><p><a href="https://debatedash.com/" target="_blank">Click here to check it out</a></p><br><img src="Assets/debatedash.gif" style="width:100%; height:auto;"><br><img src="Assets/debatedash.png" style="width:100%; height:auto;"></div>');
                break;
            case 'HireMe':
                modal.find('.modal-title').text('Let’s build something valuable');
                modalBody.html('<div class="hire-me-modal"><p class="process-kicker">Founder-focused product engineering</p><h2>From an early idea to a product you can confidently grow.</h2><p class="hire-me-intro">I work directly with founders and small teams to clarify the opportunity, make smart technical decisions, and ship useful software without unnecessary complexity.</p><div class="hire-me-value-grid"><div><strong>Build the right thing</strong><span>I help turn loose requirements into a focused roadmap, differentiated features, and a practical first version.</span></div><div><strong>Own the technical work</strong><span>Architecture, database design, frontend, backend, AI integration, quality, and documentation—all connected.</span></div><div><strong>Stay aligned as we ship</strong><span>Clear communication, visible progress, and fast iteration when the product needs to change.</span></div></div><div class="hire-me-approach"><strong>How we start</strong><p>We begin with a free conversation about your goals, users, and scope. I will give you an honest recommendation, clear next steps, and a transparent quote before work begins.</p></div><p class="hire-me-rate"><strong>Transparent rate:</strong> $20 an hour for scoped development work.</p><p class="hire-me-contact"><strong>Tell me what you’re building</strong><br>Email: <a href="mailto:snaved159@gmail.com">snaved159@gmail.com</a></p></div>');
                break;
            case 'googleSignIn':
                modal.find('.modal-title').text('Google Sign-in Authentication');
                modalBody.html('<p>Mobile app Authentication with Sign-in with google in react native and supabase</p><br><img src="Assets/auth.png" style="width:100%; height:auto;">');
                break;
            case 'Testimonial':
                modal.find('.modal-title').text('Client testimonial');
                modalBody.html('<img src="Assets/Testimonial.jpeg" alt="Client testimonial praising Naved\'s AI development work" style="width:100%; height:auto;">');
                break;
            case 'ProductProcess':
                modal.find('.modal-title').text('From idea to production');
                modalBody.html('<div class="product-process-modal"><p class="process-kicker">Founding / Product Engineer</p><h2>I help founders turn ideas into products people want.</h2><p>I combine product thinking, full-stack engineering, and AI-native development to move from idea → architecture → MVP → production without sacrificing quality.</p><div class="desktop-process-flow"><div><span>01</span><strong>Shape</strong><small>Requirements and product direction</small></div><div><span>02</span><strong>Research</strong><small>Competitors and market gaps</small></div><div><span>03</span><strong>Build</strong><small>Architecture, AI, frontend, backend</small></div><div><span>04</span><strong>Iterate</strong><small>Feedback, quality, and growth</small></div></div><div class="ownership-list"><span>Product strategy</span><span>System design</span><span>AI integration</span><span>Team &amp; QA coordination</span><span>Documentation</span><span>Monetization input</span></div></div>');
                break;
            default:
                modalBody.html(`<p>Project not found.</p>`);
        }
        
        // Add loading animation
        modalBody.prepend('<div class="loading-spinner" style="text-align: center; margin-bottom: 15px;"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>');
        
        // Remove spinner after content loads
        setTimeout(() => {
            $('.loading-spinner').remove();
        }, 1000);
        
        modal.modal('show');
    }

    // Start Menu Logic
    startButton.on('click', function() {
        startMenu.toggle();
        
        // Add animation when opening menu
        if (startMenu.is(':visible')) {
            anime({
                targets: '#startMenu',
                opacity: [0, 1],
                translateY: [10, 0],
                easing: 'easeOutExpo',
                duration: 300
            });
        }
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('#startButton, #startMenu').length) {
            startMenu.hide();
        }
    });

    $('.start-menu-item').on('click', function() {
        const project = $(this).data('project');
        openModal(project);
        startMenu.hide();
    });

    // Make descriptions clickable too
    // Enable both hover and click to show start menu descriptions
    document.querySelectorAll('.start-menu-item').forEach(item => {
        // Hover to show
        item.addEventListener('mouseenter', function() {
            item.classList.add('active');
        });
        item.addEventListener('mouseleave', function() {
            item.classList.remove('active');
        });

        // Click to toggle (for accessibility)
        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('start-menu-description')) return;
            item.classList.toggle('active');
            e.stopPropagation();
        });

        // Click description to open modal
        item.querySelector('.start-menu-description').addEventListener('click', function(e) {
            const project = item.getAttribute('data-project');
            openModal(project);
            item.classList.remove('active');
            e.stopPropagation();
        });
    });
    // Hide all submenus if clicking outside
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.start-menu-item').forEach(i => i.classList.remove('active'));
    });


    // Add entrance animation for icons in active tab
    function animateActiveIcons() {
        const active = document.querySelector('.icons-container.active .icon');
        anime({
            targets: '.icons-container.active .icon',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'easeOutElastic(1, .5)',
            duration: 800
        });
    }
    animateActiveIcons();

    // Tab ripple + switching logic
    tabButtons.forEach(btn => {
        // Ripple on click
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--x', x + 'px');
            btn.style.setProperty('--y', y + 'px');
            btn.classList.remove('rippling');
            // Force reflow to restart animation
            // eslint-disable-next-line no-unused-expressions
            btn.offsetHeight;
            btn.classList.add('rippling');

            const target = btn.getAttribute('data-tab');

            // Update active state on buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active state on containers
            iconContainers.forEach(c => {
                if (c.getAttribute('data-tab') === target) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });

            // Layout and animate icons for the newly active tab
            layoutActiveIcons();
            animateActiveIcons();
        });
    });
});

