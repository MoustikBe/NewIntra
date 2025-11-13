/* Check for changement */
const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';

/* Check for changement */
const observer = new MutationObserver((mutations, obs) => {
    const grid = document.querySelector('.grid.bg-zinc-50');
    console.log('I ❤️');

    if (grid) {
        /* Always activate the button */
        applyDarkModeToSidebar();

        /* Only apply if the dark theme is active */
        if (isDarkModeEnabled) {
            applyDarkModeToHeader();
            applyDarkModeToFooter();
            applyDarkModeToGrid(grid);
        }

        const gridObserver = new MutationObserver(() => {
            /* Only apply if the dark theme is active */
            if (isDarkModeEnabled) {
                applyDarkModeToHeader();
                applyDarkModeToFooter();
                applyDarkModeToSidebar();
                applyDarkModeToGrid(grid);
            }
        });

        gridObserver.observe(grid, { childList: true, subtree: true });
        obs.disconnect();
    }
});

/* The code for the topbar of the intra, the one with the login */ 
function applyDarkModeToHeader() {
    const topBar = document.querySelector('.flex.flex-row.items-center.justify-between.h-full.px-5.bg-white.gap-4');
    
    if (topBar) {
        //console.log('Barre du haut trouvée');
        
        topBar.style.backgroundColor = "#2C2C2C";
        topBar.style.color = "#FFFFFF";
        const applyDarkToAllChildren = (element) => {
            element.style.backgroundColor = "#2C2C2C";
            element.style.color = "#FFFFFF";
            
            if (element.classList.contains('h-16')) {
                element.style.backgroundColor = "#2C2C2C";
            }
            
            if (element.classList.contains('grow') || element.classList.contains('w-full')) {
                element.style.backgroundColor = "#2C2C2C";
            }
            Array.from(element.children).forEach(child => applyDarkToAllChildren(child));
        };
        applyDarkToAllChildren(topBar);
        
    } 
    else {
        //console.log('❌ Barre du haut non trouvée');
    }
    
    const specificBars = [
        '.flex.flex-row.grow.h-16.gap-3',
        '.grow.h-16.hidden.md\\:flex',
        '.flex.flex-row.items-center.w-full',
        '.h-full.flex.items-center.md\\:hidden'
    ];
    
    specificBars.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            //console.log(`✅ Barre spécifique trouvée: ${selector}`);
            el.style.backgroundColor = "#2C2C2C";
            el.style.color = "#FFFFFF";
            
            el.querySelectorAll('*').forEach(child => {
                child.style.backgroundColor = "#2C2C2C";
                child.style.color = "#FFFFFF";
            });
        });
    });
}

function applyDarkModeToFooter() {
    const footer = document.querySelector('.justify-center.flex.flex-col.gap-4.text-sm.text-gray-500.px-4.py-3.text-center.sm\\:flex-row');
    
    if (footer) {
        console.log('✅ Footer trouvé');
        
        footer.style.backgroundColor = "#1E1E1E";
        footer.style.color = "#AAAAAA";
        
        const footerLinks = footer.querySelectorAll('a, .hover\\:text-emerald-500');
        footerLinks.forEach(link => {
            link.style.color = "#CCCCCC";
            
            /* Hoover color change */
            link.addEventListener('mouseenter', () => {
                link.style.color = "#10B981";
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.color = "#CCCCCC";
            });
        });
        
        const footerChildren = footer.querySelectorAll('*');
        footerChildren.forEach(child => {
            if (child.style.color.includes('107, 114, 128') ||
                child.classList.contains('text-gray-500')) {
                child.style.color = "#AAAAAA";
            }
        });
    } else {
        console.log('❌ Footer non trouvé');
        
        const alternativeSelectors = [
            '[class*="footer"]',
            '.text-gray-500.text-center',
            '.px-4.py-3',
            '.justify-center.flex'
        ];
        
        for (let selector of alternativeSelectors) {
            const altFooter = document.querySelector(selector);
            if (altFooter && altFooter.textContent && altFooter.textContent.length > 10) {
                console.log('✅ Footer trouvé avec sélecteur alternatif:', selector);
                altFooter.style.backgroundColor = "#1E1E1E";
                altFooter.style.color = "#AAAAAA";
                
                const links = altFooter.querySelectorAll('a');
                links.forEach(link => {
                    link.style.color = "#CCCCCC";
                });
                break;
            }
        }
    }
}

function applyDarkModeToGrid(grid) {
    grid.style.backgroundColor = "#1E1E1E";
    grid.style.color = "#FFFFFF";
    grid.style.transition = "background-color 0.5s, color 0.5s";

    /* The part of the achivements */
    const cards = grid.querySelectorAll('.bg-white');
    cards.forEach(card => {
        card.style.backgroundColor = "#2C2C2C";
        card.style.color = "#E0E0E0";
        card.style.border = "1px solid #444";
        card.style.transition = "background-color 0.5s, color 0.5s";
    });

    const borders = grid.querySelectorAll('.border-neutral-200');
    //console.log(`🎯 ${borders.length} éléments border-neutral-200 trouvés`);
    borders.forEach(el => {
        el.style.borderColor = 'rgb(83, 83, 83)';
        el.style.backgroundColor = 'rgb(44, 44, 44)';
    });

    const iconBackgrounds = grid.querySelectorAll('.bg-zinc-100');
    //console.log(`🎯 ${iconBackgrounds.length} fonds d'icônes trouvés`);
    iconBackgrounds.forEach(el => {
        el.style.backgroundColor = 'rgb(44, 44, 44)';
        el.style.border = '1px solid rgb(68, 68, 68)';
    });
    /* The end of the achivements part */

    /* Part that show the logtime */
    const scheduleGrids = grid.querySelectorAll('.bg-white.md\\:h-96');
    scheduleGrids.forEach(schedule => {
        schedule.style.backgroundColor = 'rgb(44, 44, 44)';
        schedule.style.color = 'rgb(224, 224, 224)';
        
        const allBorders = schedule.querySelectorAll('*');
        allBorders.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            
            // If the border is visible //
            if (computedStyle.borderWidth !== '0px' && computedStyle.borderWidth !== '') {
                element.style.borderColor = 'rgb(68, 68, 68)';
            }
            
            if (computedStyle.backgroundColor.includes('255, 255, 255') || 
                computedStyle.backgroundColor.includes('248, 250, 252') ||
                computedStyle.backgroundColor.includes('241, 245, 249')) {
                element.style.backgroundColor = 'rgb(44, 44, 44)';
            }
            
            // Text color //
            if (computedStyle.color.includes('0, 0, 0') || 
                computedStyle.color.includes('23, 23, 23') ||
                computedStyle.color.includes('38, 38, 38')) {
                element.style.color = '#E0E0E0';
            }
        });
    });
    /* Text part */
    const neutralTexts = document.querySelectorAll('.text-neutral-400');
    neutralTexts.forEach(t => {
        t.style.color = "#AAAAAA";
    });

    /* Black text to white */
    const darkTexts = grid.querySelectorAll('.text-black');
    darkTexts.forEach(el => {
        el.style.color = "#FFFFFF";
    });

    /* Place the title in bold */
    const boldTexts = grid.querySelectorAll('.font-bold');
    boldTexts.forEach(el => {
        el.style.color = "#EAEAEA";
    });

    /* Change scrollbar design */
    const style = document.createElement("style");
    style.textContent = `
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #1E1E1E; }
        ::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 10px;
            border: 2px solid #1E1E1E;
        }
        ::-webkit-scrollbar-thumb:hover { background-color: #888; }
        * { scrollbar-width: thin; scrollbar-color: #555 #1E1E1E; }
    `;
    document.head.appendChild(style);

    /* Border for profile */
    const borderProfile = document.querySelectorAll('.flex.gap-4.p-4.flex-col.border-r.pr-4').forEach(el => el.classList.remove('border-r'));

}

/* Setting the button to the side bar */
function applyDarkModeToSidebar() {
    const sidebarSelectors = [
        '.bg-\\[44E5566\\]',
        '.sidebar-animation',
        '.left-\\[-100%\\]',
        '[class*="sidebar"]',
        '.min-h-screen.flex.flex-col.justify-between'
    ];
    
    let sidebar = null;
    for (let selector of sidebarSelectors) {
        sidebar = document.querySelector(selector);
        if (sidebar) break;
    }
    
    if (!sidebar) return;

    if (!document.getElementById("darkmode-toggle-sidebar")) {
        const toggleBtn = document.createElement("button");
        toggleBtn.id = "darkmode-toggle-sidebar";
        toggleBtn.innerHTML = isDarkModeEnabled ? '☀️' : '🌙';
        toggleBtn.title = "Toggle Dark Mode";
        
        toggleBtn.style.cssText = `
            width: 45px;
            height: 45px;
            border-radius: 22px;
            border: 2px solid #666;
            background: ${isDarkModeEnabled ? "#2C2C2C" : "#f0f0f0"};
            color: ${isDarkModeEnabled ? "#FFD700" : "#333"};
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            margin: 15px auto;
        `;
        
        toggleBtn.addEventListener('click', function() {
            const currentlyDark = localStorage.getItem('darkMode') === 'true';
            localStorage.setItem('darkMode', !currentlyDark);
            location.reload();
        });
        
        const firstContainer = sidebar.querySelector('.flex.flex-col.w-full:first-child');
        if (firstContainer) {
            const btnWrapper = document.createElement("div");
            btnWrapper.style.cssText = `
                display: flex;
                justify-content: center;
                padding: 10px 0;
                border-bottom: 1px solid #333;
            `;
            btnWrapper.appendChild(toggleBtn);
            firstContainer.insertBefore(btnWrapper, firstContainer.firstChild);
        }
    }

    if (isDarkModeEnabled) {
        console.log('✅ Sidebar en mode sombre appliquée');
        sidebar.style.backgroundColor = "#1E1E1E";
        sidebar.style.color = "#FFFFFF";

        const links = sidebar.querySelectorAll('a');
        links.forEach(link => {
            link.style.color = "#CCCCCC";
            link.style.transition = "color 0.2s ease";
        });
    }
}

observer.observe(document, { childList: true, subtree: true });
