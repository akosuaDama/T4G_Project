const signupBtn = document.querySelector('.btn-signup-card');
signupBtn.addEventListener('click', (e) => {
e.preventDefault();
alert('Signup successful! Redirecting to shop...');
window.location.href = '../pages/shop.html';
}); 