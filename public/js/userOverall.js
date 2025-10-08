// Function to update the phone number display based on visibility state
const profilePhoneNumber = document.getElementById('profile-phone-number');
const btnToggleProfilePhoneNumber = document.getElementById('btn-toggle-profile-phone-number');
let isPhoneNumberVisible = false;

function updatePhoneNumberDisplay() {
    btnToggleProfilePhoneNumber.innerHTML = '';
    if (user.phone === undefined || user.phone === null || user.phone === '') {
        profilePhoneNumber.innerHTML = 'Số điện thoại chưa được cập nhật';
        return;
    }

    if (isPhoneNumberVisible) {
        profilePhoneNumber.innerHTML = user.phone || 'No phone number provided';
        const visibleIcon = document.createElement('i');
        visibleIcon.className = 'fa-regular fa-eye';
        btnToggleProfilePhoneNumber.appendChild(visibleIcon);
    } else {
        // Mask phone number if available
        if (user.phone && user.phone.length >= 4) {
            profilePhoneNumber.innerHTML =
                user.phone.slice(0, 2) + '   &#10033;&#10033;&#10033;&#10033;   ' + user.phone.slice(-2);
        } else {
            profilePhoneNumber.innerHTML = 'No phone number provided';
        }
        const invisibleIcon = document.createElement('i');
        invisibleIcon.className = 'fa-regular fa-eye-slash';
        btnToggleProfilePhoneNumber.appendChild(invisibleIcon);
    }
}

btnToggleProfilePhoneNumber.addEventListener('click', () => {
    isPhoneNumberVisible = !isPhoneNumberVisible;
    updatePhoneNumberDisplay();
});

// Format grandTotalOrders as Vietnamese currency
const grandTotalElem = document.getElementById('grand-total-orders');
document.addEventListener('DOMContentLoaded', function () {
    if (grandTotalElem) {
        const value = Number(grandTotalElem.textContent) || 0;
        grandTotalElem.textContent = value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
});

// Handle render recent orders
function renderRencetOrders() {
    const recentOrdersDOM = document.getElementById('recent-orders');
    
    if (recentOrders.length === 0) {
        const imgDOM = document.createElement('img');
        imgDOM.src = "/asset/images/icons/empty.f8088c4d.png";
        imgDOM.classList = "m-auto w-[140px] h-[104px] rounded-full object-cover";

        const pDOM = document.createElement('p');
        pDOM.innerHTML = 'Bạn chưa có đơn hàng nào gần đây? Hãy bắt đầu mua sắm ngay nào!';
        pDOM.classList = 'mt-2 text-center text-sm text-gray-500';

        const aDOM = document.createElement('a');
        aDOM.innerHTML = 'Mua sắm ngay.';
        aDOM.href = "/";
        aDOM.classList = 'ml-3 text-sm text-cellphones-500 hover:text-cellphones-600 hover:underline';
        pDOM.appendChild(aDOM);

        recentOrdersDOM.appendChild(imgDOM);
        recentOrdersDOM.appendChild(pDOM);
    }
    else {
        const pDOM = document.createElement('p');
        pDOM.innerHTML = 'Có đơn hàng';
        pDOM.classList = 'mt-2 text-center text-sm text-gray-500';

        recentOrdersDOM.appendChild(pDOM);
    }
}

// Handle render vouchers
function renderVouchers() {
    const vouchersDOM = document.getElementById('vouchers');
    
    if (vouchers.length === 0) {
        const imgDOM = document.createElement('img');
        imgDOM.src = "/asset/images/icons/empty.f8088c4d.png";
        imgDOM.classList = "m-auto w-[140px] h-[104px] rounded-full object-cover";

        const pDOM = document.createElement('p');
        pDOM.innerHTML = 'Bạn chưa có ưu đãi nào.';
        pDOM.classList = 'mt-2 text-center text-sm text-gray-500';

        const aDOM = document.createElement('a');
        aDOM.innerHTML = 'Xem sản phẩm.';
        aDOM.href = "/";
        aDOM.classList = 'ml-3 text-sm text-cellphones-500 hover:text-cellphones-600 hover:underline';
        pDOM.appendChild(aDOM);

        vouchersDOM.appendChild(imgDOM);
        vouchersDOM.appendChild(pDOM);
    }
    else {
        const pDOM = document.createElement('p');
        pDOM.innerHTML = 'Có vouchers';
        pDOM.classList = 'mt-2 text-center text-sm text-gray-500';

        vouchersDOM.appendChild(pDOM);
    }
}

// Handle render favourite products
function renderFavouriteProducts() {
    const favouriteProductsDOM = document.getElementById('favourite-products');
    
    if (favouriteProducts.length === 0) {
        const imgDOM = document.createElement('img');
        imgDOM.src = "/asset/images/icons/empty.f8088c4d.png";
        imgDOM.classList = "m-auto w-[140px] h-[104px] rounded-full object-cover";

        const pDOM = document.createElement('p');
        pDOM.innerHTML = 'Bạn chưa có sản phẩm nào yêu thích? Hãy bắt đầu mua sắm ngay nào!';
        pDOM.classList = 'mt-2 text-center text-sm text-gray-500';

        const aDOM = document.createElement('a');
        aDOM.innerHTML = 'Mua sắm ngay.';
        aDOM.href = "/";
        aDOM.classList = 'ml-3 text-sm text-cellphones-500 hover:text-cellphones-600 hover:underline';
        pDOM.appendChild(aDOM);

        favouriteProductsDOM.appendChild(imgDOM);
        favouriteProductsDOM.appendChild(pDOM);
    }
    else {
        const pDOM = document.createElement('p');
        pDOM.innerHTML = 'Có sản phẩm yêu thích';
        pDOM.classList = 'mt-2 text-center text-sm text-gray-500';

        favouriteProductsDOM.appendChild(pDOM);
    }
}

// Initial display
updatePhoneNumberDisplay();
renderRencetOrders();
renderVouchers();
renderFavouriteProducts();
if (errors.length > 0) {
    alert(errors.join('\n'));
}