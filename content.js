/* Check for changement */
const observer = new MutationObserver((mutations, obs) => {
    const grid = document.querySelector('.grid.bg-zinc-50');
    console.log('I ❤️');
    if (grid) {
        applyDarkModeToGrid(grid);
        applyDarkModeToHeader()
        
        const gridObserver = new MutationObserver(() => {
            applyDarkModeToHeader()
            applyDarkModeToGrid(grid);
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
        
        topBar.style.backgroundColor = "#1E1E1E";
        topBar.style.color = "#FFFFFF";
        const applyDarkToAllChildren = (element) => {
            element.style.backgroundColor = "#1E1E1E";
            element.style.color = "#FFFFFF";
            
            if (element.classList.contains('h-16')) {
                element.style.backgroundColor = "#1E1E1E";
            }
            
            if (element.classList.contains('grow') || element.classList.contains('w-full')) {
                element.style.backgroundColor = "#1E1E1E";
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
            el.style.backgroundColor = "#1E1E1E";
            el.style.color = "#FFFFFF";
            
            el.querySelectorAll('*').forEach(child => {
                child.style.backgroundColor = "#1E1E1E";
                child.style.color = "#FFFFFF";
            });
        });
    });
}
function applyDarkModeToGrid(grid) {
    // Define the theme in general in the background of the card //
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

    /* Banner message */
    if (!document.getElementById("darkmode-banner")) {
        const banner = document.createElement("div");
        banner.id = "darkmode-banner";
        banner.textContent = "🌙 Mode sombre activé sur la grille + achievements";
        banner.style.position = "fixed";
        banner.style.top = "0";
        banner.style.left = "0";
        banner.style.width = "100%";
        banner.style.backgroundColor = "#000";
        banner.style.color = "#FFF";
        banner.style.textAlign = "center";
        banner.style.padding = "10px";
        banner.style.zIndex = "9999";
        banner.style.fontSize = "18px";
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 2000);
    }
}

observer.observe(document, { childList: true, subtree: true });
