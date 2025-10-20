const searchForm = document.getElementById('search-bar');
const queryInput = document.getElementById('input-query');
const statusCheckbox = document.getElementById('status-checkbox');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const queryValue = queryInput.value.trim();
    const isActive = statusCheckbox.checked;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('q', queryValue);
    currentUrl.searchParams.set('is_active', isActive);
    window.location.href = currentUrl.toString();
});

function renderInitPage() {
    const currentParams = new URLSearchParams(window.location.search);
    const queryParam = currentParams.get('q') || '';
    const isActiveParam = currentParams.get('is_active') === 'true';
    queryInput.value = queryParam;
    statusCheckbox.checked = isActiveParam;
}

renderInitPage();
