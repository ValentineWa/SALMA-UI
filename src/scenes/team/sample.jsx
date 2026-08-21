<!DOCTYPE html>

<html class="light" lang="en"><head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Accusoft Admin Dashboard</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
    darkMode: "class",
    theme: {
    extend: {
    "colors": {
    "primary": "#b80049",
    "secondary-container": "#e29bfe",
    "inverse-on-surface": "#f3f0ef",
    "primary-fixed-dim": "#ffb2be",
    "on-secondary-fixed": "#320047",
    "tertiary-fixed-dim": "#ffb961",
    "surface-container-highest": "#e5e2e1",
    "surface-dim": "#dcd9d9",
    "on-error": "#ffffff",
    "surface": "#fcf9f8",
    "secondary-fixed": "#f8d8ff",
    "error": "#ba1a1a",
    "secondary": "#83439e",
    "outline": "#8f6f73",
    "surface-tint": "#bc004b",
    "on-primary-fixed": "#400014",
    "tertiary": "#835100",
    "on-secondary-container": "#692985",
    "inverse-primary": "#ffb2be",
    "tertiary-fixed": "#ffddb9",
    "surface-bright": "#fcf9f8",
    "surface-container-high": "#eae7e7",
    "on-tertiary-fixed": "#2b1700",
    "on-secondary-fixed-variant": "#692984",
    "on-primary": "#ffffff",
    "on-tertiary-container": "#fffbff",
    "on-secondary": "#ffffff",
    "inverse-surface": "#303030",
    "surface-container-low": "#f6f3f2",
    "on-tertiary": "#ffffff",
    "surface-container-lowest": "#ffffff",
    "outline-variant": "#e4bdc2",
    "on-surface-variant": "#5b3f43",
    "on-error-container": "#93000a",
    "on-tertiary-fixed-variant": "#663e00",
    "surface-variant": "#e5e2e1",
    "on-primary-fixed-variant": "#900038",
    "surface-container": "#f0eded",
    "on-primary-container": "#fffbff",
    "on-surface": "#1b1c1c",
    "error-container": "#ffdad6",
    "primary-container": "#e2165f",
    "secondary-fixed-dim": "#ebb2ff",
    "on-background": "#1b1c1c",
    "tertiary-container": "#a46700",
    "primary-fixed": "#ffd9de",
    "background": "#fcf9f8"
},
    "borderRadius": {
    "DEFAULT": "0.25rem",
    "lg": "18px",
    "xl": "18px",
    "full": "9999px"
},
    "spacing": {
    "lg": "24px",
    "sidebar_width": "260px",
    "gutter": "24px",
    "container_max_width": "1440px",
    "sm": "8px",
    "base": "4px",
    "xs": "4px",
    "xl": "32px",
    "md": "16px"
},
    "fontFamily": {
    "body-lg": ["Inter"],
    "label-md": ["Inter"],
    "title-lg": ["Inter"],
    "display-lg-mobile": ["Inter"],
    "headline-sm": ["Inter"],
    "body-md": ["Inter"],
    "display-lg": ["Inter"],
    "display-md": ["Inter"],
    "label-sm": ["Inter"]
}
}
}
}
</script>
<style>
    .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
    body { font-family: 'Inter', sans-serif; }
    .custom-shadow { box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05); }
    .sidebar-transition { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
</head>
<body class="bg-surface text-on-surface">
<!-- Mobile Navigation Drawer Overlay -->
<div class="fixed inset-0 bg-black/50 z-40 hidden transition-opacity duration-300 opacity-0" id="sidebar-overlay" onclick="toggleSidebar()"></div>
<!-- Navigation Drawer -->
<aside class="fixed inset-y-0 left-0 z-50 flex flex-col h-full w-[260px] bg-primary dark:bg-primary sidebar-transition -translate-x-full lg:translate-x-0 shadow-xl" id="sidebar">
    <!-- Brand Header -->
    <div class="px-8 py-8">
        <span class="font-display-md text-display-md font-bold text-on-primary">Accusoft</span>
    </div>
    <!-- Navigation Links -->
    <nav class="flex-1 px-4 space-y-2 overflow-y-auto">
        <!-- Active State: Dashboard -->
        <a class="flex items-center gap-4 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg border-l-4 border-inverse-on-surface scale-[0.98] transition-all duration-200" href="#">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="font-label-md text-label-md">Dashboard</span>
        </a>
        <a class="flex items-center gap-4 px-4 py-3 text-on-primary/80 hover:text-on-primary hover:bg-primary-fixed-variant/20 transition-colors rounded-lg" href="#">
            <span class="material-symbols-outlined">group</span>
            <span class="font-label-md text-label-md">Customers</span>
        </a>
        <a class="flex items-center gap-4 px-4 py-3 text-on-primary/80 hover:text-on-primary hover:bg-primary-fixed-variant/20 transition-colors rounded-lg" href="#">
            <span class="material-symbols-outlined">account_tree</span>
            <span class="font-label-md text-label-md">Projects</span>
        </a>
        <a class="flex items-center gap-4 px-4 py-3 text-on-primary/80 hover:text-on-primary hover:bg-primary-fixed-variant/20 transition-colors rounded-lg" href="#">
            <span class="material-symbols-outlined">shopping_cart</span>
            <span class="font-label-md text-label-md">Orders</span>
        </a>
        <a class="flex items-center gap-4 px-4 py-3 text-on-primary/80 hover:text-on-primary hover:bg-primary-fixed-variant/20 transition-colors rounded-lg" href="#">
            <span class="material-symbols-outlined">inventory_2</span>
            <span class="font-label-md text-label-md">Inventory</span>
        </a>
        <a class="flex items-center gap-4 px-4 py-3 text-on-primary/80 hover:text-on-primary hover:bg-primary-fixed-variant/20 transition-colors rounded-lg" href="#">
            <span class="material-symbols-outlined">account_balance_wallet</span>
            <span class="font-label-md text-label-md">Accounts</span>
        </a>
        <a class="flex items-center gap-4 px-4 py-3 text-on-primary/80 hover:text-on-primary hover:bg-primary-fixed-variant/20 transition-colors rounded-lg" href="#">
            <span class="material-symbols-outlined">task</span>
            <span class="font-label-md text-label-md">Tasks</span>
        </a>
    </nav>
</aside>
<!-- Main Content Area -->
<div class="lg:pl-[260px] min-h-screen flex flex-col">
    <!-- Top App Bar -->
    <header class="sticky top-0 right-0 z-40 h-16 w-full flex items-center justify-between px-md md:px-lg bg-surface dark:bg-inverse-surface border-b border-outline-variant/30 shadow-sm">
        <div class="flex items-center gap-4">
            <button class="lg:hidden p-2 rounded-full hover:bg-surface-container-high transition-all text-primary" onclick="toggleSidebar()">
                <span class="material-symbols-outlined">menu</span>
            </button>
            <div class="hidden md:flex items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant/30 w-64 lg:w-96">
                <span class="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
                <input class="bg-transparent border-none focus:ring-0 text-body-md w-full placeholder:text-on-surface-variant/50" placeholder="Search here" type="text"/>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
                <p class="font-title-lg text-body-md font-bold text-on-surface">John Doe</p>
                <p class="text-[11px] text-on-surface-variant/70 uppercase tracking-wider">Super admin</p>
            </div>
            <div class="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden">
                <img class="w-full h-full object-cover" data-alt="A professional headshot of a smiling male executive with clean-cut hair and business attire, set against a soft, bright office background with warm lighting. The image captures a sense of modern SaaS leadership and approachability, using a crisp, high-resolution portrait style consistent with a premium admin dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMMNmaJ_lX-ffBBgCFtnGy6pTj3TIT0zdi3h_PLVFPM4dRJTZ4nRNitESPbTEDhn-Yi71tvtOMfaBNTrx9lxBf7t1jHhLSrn5wux4La7gtrrieRyxyXag_50Yq6pUhatPkQGBWJ3lAjtXSNvUP0ckuiNNKW2SMxtS6pebuYF9JJYCe886kjLINn8lefTy4TQUyczT55AN3swudnuWBCrOIVvIaiSkbwNpcbvnsEQopAQ-kpioFUDO8"/>
            </div>
        </div>
    </header>
    <!-- Page Canvas -->
    <main class="flex-1 p-md md:p-xl space-y-xl">
        <!-- Page Title -->
        <div class="flex justify-between items-end">
            <h1 class="font-headline-sm text-[28px] font-bold text-on-surface">Dashboard</h1>
        </div>
        <!-- Statistics Grid (Horizontal Scrolling on Mobile) -->
        <div class="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-md no-scrollbar pb-2">
            <div class="min-w-[180px] flex-shrink-0 bg-white p-lg rounded-xl custom-shadow flex flex-col gap-1 border border-[#F0F0F3]">
                <span class="text-on-surface-variant text-label-sm uppercase tracking-wide">Customers</span>
                <h2 class="text-display-md text-primary font-bold">54</h2>
                <div class="mt-2 flex items-center text-[10px] text-green-600 font-bold">
                    <span class="material-symbols-outlined text-[14px]">trending_up</span>
                    <span>+12%</span>
                </div>
            </div>
            <div class="min-w-[180px] flex-shrink-0 bg-white p-lg rounded-xl custom-shadow flex flex-col gap-1 border border-[#F0F0F3]">
                <span class="text-on-surface-variant text-label-sm uppercase tracking-wide">Projects</span>
                <h2 class="text-display-md text-primary font-bold">79</h2>
                <div class="mt-2 flex items-center text-[10px] text-primary/60 font-bold">
                    <span class="material-symbols-outlined text-[14px]">pending</span>
                    <span>5 Pending</span>
                </div>
            </div>
            <div class="min-w-[180px] flex-shrink-0 bg-white p-lg rounded-xl custom-shadow flex flex-col gap-1 border border-[#F0F0F3]">
                <span class="text-on-surface-variant text-label-sm uppercase tracking-wide">Orders</span>
                <h2 class="text-display-md text-primary font-bold">124</h2>
                <div class="mt-2 flex items-center text-[10px] text-green-600 font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Completed</span>
                </div>
            </div>
            <div class="min-w-[180px] flex-shrink-0 bg-primary p-lg rounded-xl custom-shadow flex flex-col gap-1 text-on-primary">
                <span class="text-on-primary/70 text-label-sm uppercase tracking-wide">Income</span>
                <h2 class="text-display-md font-bold">$6K</h2>
                <div class="mt-2 flex items-center text-[10px] font-bold">
                    <span class="material-symbols-outlined text-[14px]">account_balance_wallet</span>
                    <span>Target hit</span>
                </div>
            </div>
        </div>
        <!-- Bento Content Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <!-- Recent Projects (Large Card) -->
            <div class="lg:col-span-2 bg-white rounded-xl custom-shadow border border-[#F0F0F3] overflow-hidden">
                <div class="px-lg py-md flex items-center justify-between border-b border-outline-variant/30">
                    <h3 class="font-headline-sm text-on-surface">Recent Projects</h3>
                    <button class="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-sm font-bold hover:opacity-90 transition-all">See all</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                        <tr class="bg-surface-container-low">
                            <th class="px-lg py-4 font-label-sm text-on-surface-variant/70 uppercase">Project</th>
                            <th class="px-lg py-4 font-label-sm text-on-surface-variant/70 uppercase">Dept</th>
                            <th class="px-lg py-4 font-label-sm text-on-surface-variant/70 uppercase">Status</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant/20">
                        <tr class="hover:bg-surface-container-low transition-colors h-[72px]">
                            <td class="px-lg py-4 font-body-md font-medium text-on-surface">Enterprise Sync</td>
                            <td class="px-lg py-4 font-body-md text-on-surface-variant">Cloud Solutions</td>
                            <td class="px-lg py-4">
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-secondary"></span>
                                    <span class="font-body-md text-secondary">Review</span>
                                </div>
                            </td>
                        </tr>
                        <tr class="hover:bg-surface-container-low transition-colors h-[72px]">
                            <td class="px-lg py-4 font-body-md font-medium text-on-surface">Mobile CRM</td>
                            <td class="px-lg py-4 font-body-md text-on-surface-variant">Development</td>
                            <td class="px-lg py-4">
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                                    <span class="font-body-md text-primary">In Progress</span>
                                </div>
                            </td>
                        </tr>
                        <tr class="hover:bg-surface-container-low transition-colors h-[72px]">
                            <td class="px-lg py-4 font-body-md font-medium text-on-surface">Database Migration</td>
                            <td class="px-lg py-4 font-body-md text-on-surface-variant">Architecture</td>
                            <td class="px-lg py-4">
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-tertiary"></span>
                                    <span class="font-body-md text-tertiary">Pending</span>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- New Customer Panel -->
            <div class="bg-white rounded-xl custom-shadow border border-[#F0F0F3] overflow-hidden flex flex-col">
                <div class="px-lg py-md flex items-center justify-between border-b border-outline-variant/30">
                    <h3 class="font-headline-sm text-on-surface">New Customer</h3>
                    <button class="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-sm font-bold hover:opacity-90 transition-all">See all</button>
                </div>
                <div class="p-lg space-y-md">
                    <div class="flex items-center justify-between group">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden">
                                <img class="w-full h-full object-cover" data-alt="A high-quality portrait of a professional woman with a bright smile, wearing a modern charcoal blazer. She is set against a clean, light-colored background that reflects a professional SaaS branding. Soft, natural lighting highlights her features, evoking a sense of trust and corporate excellence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_mAEy6__Qc40h6F2bwZ6VJWS3NTXmZPqDNtSV5_skz1RhGbe9uSZdq1qXQMULIHHDUU_go-ecO7ShnLR1O5xiHqUdUEhkr0n5I9HcJ6DzOUCJ73UMEKp_7hcy0YN-RFbFrYxw_76CtmDaMEcOsSXcZyP0BbHjsYBNYIQnQfSOZQfiRyHzfK6O1JjngwgA_Iwk3wf71p2PJpqiG2-kha_IsfcqgJNWgcpNpeGHQ3nLEyRxR6To7m9o"/>
                            </div>
                            <div>
                                <h4 class="font-title-lg text-body-md font-bold text-on-surface">Sarah Miller</h4>
                                <p class="text-label-sm text-on-surface-variant">TechFlow Inc.</p>
                            </div>
                        </div>
                        <button class="text-on-surface-variant/40 group-hover:text-primary transition-colors">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                    <div class="flex items-center justify-between group">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden">
                                <img class="w-full h-full object-cover" data-alt="A professional studio portrait of a young male entrepreneur with a friendly expression. He is wearing a minimalist navy blue t-shirt and has styled short hair. The lighting is soft and even, creating a clean light-mode aesthetic suitable for a high-end customer dashboard. The background is a subtle gradient of light gray." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQZ7dUK94VgBZI2wqnGQpKky58kc_grfYDfk0Uj1YfaN5iwqTcaeVbf6K5ojTW1GBiZFoU6CDCR8_1Z9JMh7VUW-TlaXx2POeb8Efua-iBPGI8xXreBTHqcDp70wlhP2BVRRiMMXeCVnz6phq72BtKAPITJ1dIqiFBF7oNz6KVgT-0Gch-6XAgGZkRBkXA_bIkNQeKknNYuJYLpla1XgUba80oZ5HBYOMzkObX_EzdcB5BsbtB_jft"/>
                            </div>
                            <div>
                                <h4 class="font-title-lg text-body-md font-bold text-on-surface">David Chen</h4>
                                <p class="text-label-sm text-on-surface-variant">Nebula Creative</p>
                            </div>
                        </div>
                        <button class="text-on-surface-variant/40 group-hover:text-primary transition-colors">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                    <div class="flex items-center justify-between group">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden">
                                <img class="w-full h-full object-cover" data-alt="A portrait of a confident business leader, mid-40s, with a gentle and professional demeanor. The image is captured with shallow depth of field, blurring a bright, modern glass-walled office in the background. The lighting is elegant and soft, emphasizing clarity and sophistication, perfectly aligned with a premium modern dashboard design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKMelpH1hJ3_mmpsahm4BjZLakKd08-uVITevk65vcpkVN5BR5IfEAPrHLlr3WgHelcertLSxJqdlzQhAXXa2jCkepsj1Z3SnWmtZgE6BOUFRFRu5-PCWH0nCDLju6bG1vwiAs81WBIbxjVUhaME7BUU6PSqTre9sBxVY85TIz2A9Rmzt5P6EGBK3oQsYf3Fe3Me_t0zY3awu89o6qqGhu8Zi9HtGK_DXA6bYyNSBDuWuZ5WNIv8ER"/>
                            </div>
                            <div>
                                <h4 class="font-title-lg text-body-md font-bold text-on-surface">Emma Thompson</h4>
                                <p class="text-label-sm text-on-surface-variant">Global Logistics</p>
                            </div>
                        </div>
                        <button class="text-on-surface-variant/40 group-hover:text-primary transition-colors">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Task Quick Action (Bento Bottom) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-xl">
            <div class="relative h-48 rounded-xl overflow-hidden custom-shadow group">

                <div class="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-lg">
                    <div class="text-on-primary">
                        <h3 class="font-headline-sm font-bold">Analytics Report</h3>
                        <p class="text-body-md opacity-80 mt-1">Review your weekly performance</p>
                        <button class="mt-4 bg-white text-primary px-6 py-2 rounded-lg font-bold text-label-md transition-all hover:scale-105 active:scale-95">Generate Now</button>
                    </div>
                </div>
            </div>
            <div class="bg-surface-container-high rounded-xl p-lg flex items-center justify-between border border-outline-variant/30">
                <div>
                    <h3 class="font-title-lg text-on-surface font-bold">Inventory Status</h3>
                    <p class="text-body-md text-on-surface-variant">12 items low on stock</p>
                </div>
                <div class="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin-slow"></div>
            </div>
        </div>
    </main>
</div>
<!-- Mobile Navigation Toggle Script -->
<script>
    function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = !sidebar.classList.contains('-translate-x-full');

    if (isOpen) {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
} else {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    setTimeout(() => {
    overlay.classList.add('opacity-100');
    overlay.classList.remove('opacity-0');
}, 10);
}
}

    // Close sidebar on window resize if switching to desktop
    window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
    document.getElementById('sidebar').classList.remove('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.add('hidden');
} else {
    document.getElementById('sidebar').classList.add('-translate-x-full');
}
});
</script>
</body></html>