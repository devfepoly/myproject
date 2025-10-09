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

// Main for filter by status
document.addEventListener('DOMContentLoaded', function () {
    const status = getQueryParam('status');
    const options = document.querySelectorAll('.options');

    // If status is multi-value or invalid, reset to ""
    let selectedStatus = "";
    if (status) {
        const statusArr = status.split(',');
        if (statusArr.length > 1 || !validStatuses.includes(statusArr[0])) {
            setQueryParam('status', "");
            return;
        }
        selectedStatus = statusArr[0];
    }

    options.forEach(li => {
        if ((selectedStatus === "" && li.dataset.status === "") ||
            (li.dataset.status === selectedStatus)) {
            li.classList.add('choosen');
            li.classList.remove('text-gray-300');
        } else {
            li.classList.remove('choosen');
            li.classList.add('text-gray-300');
        }

        // Add click event to update status in URL
        li.addEventListener('click', function () {
            setQueryParam('status', li.dataset.status);
        });
    });
});

// Main for filter by date
document.addEventListener('DOMContentLoaded', function () {
    // Set input values from query if valid, else remove from query
    const startInput = document.getElementById('start-date');
    const endInput = document.getElementById('end-date');
    const startDate = getQueryParam('start_date');
    const endDate = getQueryParam('end_date');

    if (startDate) {
        if (isValidDate(startDate)) {
            startInput.value = startDate;
        } else {
            setQueryParam('start_date', "");
        }
    }
    if (endDate) {
        if (isValidDate(endDate)) {
            endInput.value = endDate;
        } else {
            setQueryParam('end_date', "");
        }
    }

    // On click "Lọc", update query params
    document.getElementById('btn-filter-by-date').addEventListener('click', function () {
        const s = startInput.value;
        const e = endInput.value;
        const params = new URLSearchParams(window.location.search);

        if (isValidDate(s)) {
            params.set('start_date', s);
        } else {
            params.delete('start_date');
        }
        if (isValidDate(e)) {
            params.set('end_date', e);
        } else {
            params.delete('end_date');
        }
        window.location.search = params.toString();
    });

    // On click "Xóa lọc"
    document.getElementById('btn-cancel-filter-by-date').addEventListener('click', function () {
        startInput.value = "";
        endInput.value = "";
        const params = new URLSearchParams(window.location.search);

        params.delete('start_date');
        params.delete('end_date');

        window.location.search = params.toString();
    });
});

// Initial display
updatePhoneNumberDisplay();