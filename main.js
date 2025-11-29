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
                modalBody.html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/9BaUaAe4TmI?si=QRom_XN0AWaW5BO3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> <br><a href="https://github.com/spyrex69/2D-Fluid-Solver/blob/main/Fluidsim2D.cpp" > CLICK HERE TO SEE MY CODE ON GITHUB </a>`);
                modal.find('.modal-title').text('2D fluid solver');
                break;
            case 'MusicVisualizer':
                modalBody.html(`<iframe  width="800" height="800" src="https://editor.p5js.org/snaved159/full/kxgVyb5mX"></iframe>`);
                modal.find('.modal-title').text('Audio visualization - using the FFT (Fast Fourier transform) provided by p5');
                break; 
            case 'OrbitalGravitySimulation':
                modal.find('.modal-title').text('Orbital Gravity Simulation')
                var content = `<p>Simulates orbital dynamics using vector algebra. Pythagorean theorem in C++. <a href="https://github.com/spyrex69/orbital-gravity-sim" target="_blank">View Repository</a></p>
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
            case 'ASP.NET':
                modal.find('.modal-title').text('ASP.NET Backend experience');
                modalBody.html('<div class="experience"><h2>Experience</h2><div class="job"><h3>Backend Developer @ Datamatics (EPP2D)</h3><p><em>Apr 2022 – May 2023</em></p><ul><li>Built async API endpoints for CRUD operations.</li><li>Wrote advanced SQL: CTEs, temp tables, joins, triggers, views.</li><li>Optimized queries & indexes → reduced load time by 40%.</li><li>Gathered requirements & delivered client-driven solutions.</li></ul></div><div class="job"><h3>Backend Developer @ Datamatics (ePHR)</h3><p><em>May 2023 – Nov 2024</em></p><ul><li>Developed full-stack features (Angular 15, .NET Core 7, SQL Server).</li><li>Implemented async services, PDF handling (iTextSharp), and security fixes.</li><li>Added localization support for multi-language use.</li><li>Created SQL stored procedures & bulk data scripts for millions of records.</li><li>Automated PDF forms with embedded JavaScript in Adobe Acrobat.</li></ul></div></div>');
                break;
            case 'DebateDash':
                modal.find('.modal-title').text('DebateDash  real time debate platform');
                modalBody.html('<div><p>DebateDash is a real time debate and discussion platform with profiles and in app currency. Users can challenge each other, join debates, and react to posts similar to a social network.</p><ul><li>Live debate challenges and threaded discussions.</li><li>Virtual currency and rewards to increase engagement.</li><li>User profiles and feed similar to a lightweight social network.</li></ul><p><a href="https://debatedash3.vercel.app/" target="_blank">Click here to check it out</a></p><br><img src="Assets/debatedash.gif" style="width:100%; height:auto;"><br><img src="Assets/debatedash1.gif" style="width:100%; height:auto;"></div>');
                break;
            case 'HireMe':
                modal.find('.modal-title').text('Work with me');
                modalBody.html('<div><h2>Freelance services</h2><p>I help founders and small busineses with practical, fast moving development work.</p><ul><li><strong>AI chatbots</strong> that answer FAQs and capture leads on your website using the OpenAI API. <strong>Price: 200$</strong></li><li><strong>Few bug fixes or one small important feature</strong> in stacks like Next.js, Supabase, and ASP.NET with SQL Server. <strong>Price: 100$</strong></li><li><strong>Refactor codebase or sections of codebase</strong> to improve structure, readability, and maintainability. <strong>Prices: small refactor 150$, medium-sized refactor 400$, full codebase refactor 600$</strong></li></ul><p>Typical projects starts with a free analysis and then a quote, with clear scope, timelines and fast delivery. 20$/hour</p><p><strong>Contact</strong><br>Email: <a href="mailto:snaved159@gmail.com">snaved159@gmail.com</a></p></div>');
                break;
            case 'googleSignIn':
                modal.find('.modal-title').text('Google Sign-in Authentication');
                modalBody.html('<p>Mobile app Authentication with Sign-in with google in react native and supabase</p><br><img src="Assets/auth.png" style="width:100%; height:auto;">');
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

