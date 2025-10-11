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

// List of valid statuses
const validStatuses = ["pending", "paid", "shipped", "completed", "cancelled"];

// Helper to get query param
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Helper to set query param
function setQueryParam(name, value) {
    const params = new URLSearchParams(window.location.search);
    if (value === "" || value == null) {
        params.delete(name);
    } else {
        params.set(name, value);
    }
    window.location.search = params.toString();
}

// Helper to validate date (yyyy-mm-dd)
function isValidDate(dateStr) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

// Render last update
function renderLastUpdate() {
    const el = document.getElementById("last-update");
    const date = new Date(el.textContent);
    el.textContent = date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Handle edit profile
function handleEditProfile() {
    const btnOpenEditProfile = document.getElementById("btn-open-edit-profile");
    const dialogEditProfile = document.getElementById("dialog-edit-profile");
    const backdropEditProflie = document.getElementById("backdrop-edit-profile");
    const btnCloseEditProfile = document.getElementById("btn-close-edit-profile");

    btnOpenEditProfile.addEventListener('click', () => {
        dialogEditProfile.classList.remove('hidden');
    })

    btnCloseEditProfile.addEventListener('click', () => {
        dialogEditProfile.classList.add('hidden');
    })

    backdropEditProflie.addEventListener('click', () => {
        dialogEditProfile.classList.add('hidden');
    })

    dialogEditProfile.addEventListener('click', (e) => {
        e.stopPropagation();
    })

}

async function handleAddAddress() {
    const btnOpenAddAddress = document.getElementById("btn-open-add-address");
    const dialogAddAddress = document.getElementById("dialog-add-address");
    const backdropAddAddress = document.getElementById("backdrop-add-address");
    const btnCloseAddAddress = document.getElementById("btn-close-add-address");

    btnOpenAddAddress.addEventListener('click', () => {
        dialogAddAddress.classList.remove('hidden');
    })

    btnCloseAddAddress.addEventListener('click', () => {
        dialogAddAddress.classList.add('hidden');
    })

    backdropAddAddress.addEventListener('click', () => {
        dialogAddAddress.classList.add('hidden');
    })

    dialogAddAddress.addEventListener('click', (e) => {
        e.stopPropagation();
    })

    const provinceSelect = document.getElementById("province");
    const districtSelect = document.getElementById("district");
    const wardSelect = document.getElementById("ward");

    const res = await fetch("/address/provinces");
    const provinces = await res.json();

    provinceSelect.innerHTML = `<option value="">-- Chọn tỉnh / thành phố --</option>`;
    provinces.forEach(p => {
        provinceSelect.innerHTML += `<option value="${p.name}">${p.name}</option>`;
    });

    provinceSelect.addEventListener("change", async (e) => {
        const selectedProvinceName = e.target.value;
        if (!selectedProvinceName) return;

        const selectedProvince = provinces.find(p => p.name === selectedProvinceName);
        if (!selectedProvince) return;

        districtSelect.disabled = false;

        const res = await fetch(`/address/districts/${selectedProvince.code}`);
        const districts = await res.json();

        districtSelect.innerHTML = `<option value="">-- Chọn quận / huyện --</option>`;
        districts.forEach(d => {
            districtSelect.innerHTML += `<option value="${d.name}">${d.name}</option>`;
        });

        wardSelect.innerHTML = `<option value="">-- Chọn phường / xã --</option>`;
        wardSelect.disabled = true;
    });

    districtSelect.addEventListener("change", async (e) => {
        const selectedDistrictName = e.target.value;
        if (!selectedDistrictName) return;

        const selectedProvinceName = provinceSelect.value;
        const selectedProvince = provinces.find(p => p.name === selectedProvinceName);
        if (!selectedProvince) return;

        const resDistricts = await fetch(`/address/districts/${selectedProvince.code}`);
        const districts = await resDistricts.json();
        
        const selectedDistrict = districts.find(d => d.name === selectedDistrictName);
        if (!selectedDistrict) return;

        wardSelect.disabled = false;

        const resWards = await fetch(`/address/wards/${selectedDistrict.code}`);
        const wards = await resWards.json();

        wardSelect.innerHTML = `<option value="">-- Chọn phường / xã --</option>`;
        wards.forEach(w => {
            wardSelect.innerHTML += `<option value="${w.name}">${w.name}</option>`;
        });
    });
}

// Initial display
updatePhoneNumberDisplay();
renderLastUpdate();
handleEditProfile();
handleAddAddress();