document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedback-form');
    const previewButton = document.getElementById('preview-button');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            handleSubmit();
        });
    }

    if (previewButton) {
        previewButton.addEventListener('click', function(event) {
            previewForm();
        });
    }
});

function previewForm() {
    const email = document.getElementById('email')?.value || '';
    const firstname = document.getElementById('firstname')?.value || '';
    const lastname = document.getElementById('lastname')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const rating = document.querySelector('input[name="rating"]:checked')?.value || '';
    const comments = document.getElementById('comments')?.value || '';

    let errorMessage = "";

    if (!email) errorMessage += "Email is required.<br>";
    if (!firstname) errorMessage += "First name is required.<br>";
    if (!lastname) errorMessage += "Last name is required.<br>";
    if (!phone) errorMessage += "Phone number is required.<br>";
    else if (!/^\d+$/.test(phone)) errorMessage += "Phone number must contain only numeric values.<br>";
    if (!rating) errorMessage += "Rating is required.<br>";
    if (!comments) errorMessage += "Comments are required.<br>";

    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.innerHTML = errorMessage;
        if (errorMessage) {
            errorElement.style.display = 'block';
            return;
        } else {
            errorElement.style.display = 'none';
        }
    }

    updatePreviewElement('preview-email', email);
    updatePreviewElement('preview-firstname', firstname);
    updatePreviewElement('preview-lastname', lastname);
    updatePreviewElement('preview-phone', phone);
    updatePreviewElement('preview-rating', rating);
    updatePreviewElement('preview-comments', comments);

    toggleElementDisplay('feedback-form', 'none');
    toggleElementDisplay('preview-section', 'block');
}

function editForm() {
    toggleElementDisplay('preview-section', 'none');
    toggleElementDisplay('feedback-form', 'block');
}

function confirmForm() {
    toggleElementDisplay('preview-section', 'none');
    toggleElementDisplay('confirmation-section', 'block');
}

function handleSubmit() {
    // Here we will redirect to the confirmation page instead of toggling the sections
    window.location.href = 'confirmation.html';
}

function updatePreviewElement(id, value) {
    const element = document.getElementById(id);
    if (element) element.innerText = value;
}

function toggleElementDisplay(id, display) {
    const element = document.getElementById(id);
    if (element) element.style.display = display;
}
