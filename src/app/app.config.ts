
export const DASHBOARD = {
    "MENU":
        [
            { name: "What is WRAP?", component:"WhatisWrapPage",sub: []},
            { name: "Wellness Toolbox", component: "WellnessToolboxPage", sub: [] },
            { name: "Daily Plan", component: "DailyMaintenancePage", sub: [] },
            { name: "Stressors", component: "TriggersPage", sub: [] },
            { name: "Early Warning Signs", component: "EarlyWarningSignsPage", sub: [] },
            { name: "When Things Are Breaking Down", component: "BreakingDownPage", sub: [] },
            {
                name: "Crisis Plan", component: "CrisisPage", sub: [ ]
            },
            {
                name: "Post-Crisis Plan", component: "PostcrisisplanPage", sub: [] 
            },
            {
                name: "Email My Plan", component: "EmailmyPage", sub: []
            },
            {
                name: "More About WRAP", component: "AboutPage", sub: [
                    { name: "Key Concepts", component: "KeyConceptsPage" },
                    { name: "Values & Ethics", component: "ValueEthicsPage" },
                    { name: "About", component: "AboutPage" },
                    { name: "WRAP Bookstore", component:"WrapBookstorePage"},
                   
                ]
            },
            { name: "App Tutorial", component: "TakeTourPage",sub: [] },
        ],
};
export const Icon = {
    "ICONS":
        [
            // { asset: '../assets/images/1-16.png', id: 0 },
            { asset: 'assets/icon_svg/book.svg', id: 1 },
            { asset: 'assets/icon_svg/apple.svg', id: 2 },
            { asset: 'assets/icon_svg/meditation.svg', id: 3 },
            { asset: 'assets/icon_svg/kung_fu_logo.svg', id: 4 },
            { asset: 'assets/icon_svg/magnet.svg', id: 5 },
            { asset: 'assets/icon_svg/chat.svg', id: 6 },
            { asset: 'assets/icon_svg/sound.svg', id: 7 },
            { asset: 'assets/icon_svg/thumbs_down.svg', id: 8 },
            { asset: 'assets/icon_svg/thumbs_up.svg', id: 9 },
            { asset: 'assets/icon_svg/pencil.svg', id: 10 },
            { asset: 'assets/icon_svg/group.svg', id: 11 },
            { asset: 'assets/icon_svg/battery.svg', id: 12 },
            { asset: 'assets/icon_svg/dumble.svg', id: 13 },
            { asset: 'assets/icon_svg/tools.svg', id: 14 },
            { asset: 'assets/icon_svg/tools_1.svg', id: 15 },
            { asset: 'assets/icon_svg/emoji_sad.svg', id: 16 },
            { asset: 'assets/icon_svg/emoji_smile.svg', id: 17 },
            { asset: 'assets/icon_svg/direction_arrow.svg', id: 18 },
            { asset: 'assets/icon_svg/pallet.svg', id: 19 },
            { asset: 'assets/icon_svg/book_1.svg', id: 20 },
            { asset: 'assets/icon_svg/cup.svg', id: 21 },
            { asset: 'assets/icon_svg/run.svg', id: 22 },
            { asset: 'assets/icon_svg/hexagon.svg', id: 23 },
            { asset: 'assets/icon_svg/globe.svg', id: 24 },
        ]
};