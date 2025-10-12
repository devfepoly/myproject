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

// Initial display
updatePhoneNumberDisplay();