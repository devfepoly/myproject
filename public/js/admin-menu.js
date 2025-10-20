const section = document.querySelector("#sidebarMenu");
const currentPath = normalizePath(window.location.pathname);

const menuItems = [
    {
        label: "Tổng quan",
        icon: "fa-regular fa-envelope-open",
        path: "/admin",
    },
    {
        label: "Brand",
        icon: "fa-solid fa-tag",
        path: "/admin/brand",
    },
    // Thêm các mục menu khác của bạn ở đây...
];

function normalizePath(path) {
    return path
        .replace(/\/{2,}/g, "/")
        .replace(/\/+$/, "")
        .toLowerCase();
}

section.innerHTML = menuItems.map(item => {
    const isActive = currentPath.split('?')[0] === item.path;

    return `
    <a href="${item.path}"
        class="flex-shrink-0 py-3 px-5 md:py-5 md:px-7 flex justify-center md:justify-start items-center gap-2 md:gap-3
        text-base md:text-lg font-semibold rounded-xl md:rounded-none shadow-md md:shadow-none transition-colors duration-200
        ${isActive
            ? "bg-cellphones-600 text-white md:bg-cellphones-50 md:text-cellphones-500 font-semibold md:border-l-4 border-cellphones-600"
            : "bg-white text-gray-700 hover:bg-cellphones-50 hover:text-cellphones-500 hover:border-b-2 md:hover:border-b-0 md:hover:border-l-4 hover:border-cellphones-600"} 
        ">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
    </a>
    `;
}).join('');

section.innerHTML += `
    <form action="/auth/logout" method="POST" class="flex-shrink-0">
        <button
            class="w-full flex-shrink-0 py-3 px-5 md:py-5 md:px-7 flex justify-center md:justify-start items-center gap-2 md:gap-3
            text-base md:text-lg font-semibold rounded-xl md:rounded-none shadow-md md:shadow-none transition-colors duration-200
            border-t-0 md:border-t-2 border-gray-200 cursor-pointer text-red-600 bg-white hover:bg-red-50 hover:text-red-700
            md:text-inherit md:bg-transparent md:hover:bg-cellphones-50 md:hover:text-cellphones-500 md:hover:border-b-0 md:hover:border-l-4 md:hover:border-cellphones-600
            ">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Đăng xuất</span>
        </button>
    </form>
`;