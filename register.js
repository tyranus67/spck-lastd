const formRegister = document.querySelector("#register-form");
const inputUsername = formRegister.querySelector("#username");
const inputEmail = formRegister.querySelector("#email");
const inputPassword = formRegister.querySelector("#password");
const messageContainer = document.createElement("div");
messageContainer.classList.add("form-message");
formRegister.appendChild(messageContainer);

formRegister.addEventListener("submit", handleRegisterSubmit);

function handleRegisterSubmit(event) {
    event.preventDefault();

    const username = inputUsername.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    // Kiểm tra định dạng
    if (!username || username.length < 3) {
        showMessage("Username must be at least 3 characters long.", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters long.", "error");
        return;
    }

    const user = {
        username,
        email,
        password: btoa(password), // Mô phỏng mã hóa đơn giản
        createdAt: new Date().toISOString()
    };

    // Lấy danh sách người dùng
    let listUser = JSON.parse(localStorage.getItem("list-user")) || [];

    // Kiểm tra email đã tồn tại
    if (listUser.some(u => u.email === email)) {
        showMessage("This email is already registered.", "error");
        return;
    }

    // Thêm người dùng mới
    listUser.push(user);
    localStorage.setItem("list-user", JSON.stringify(listUser));
    showMessage("Registration successful! Redirecting to login...", "success");

    // Chuyển hướng sau 2 giây
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);

    formRegister.reset();
}

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Hàm hiển thị thông báo
function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.className = "form-message";
    messageContainer.classList.add(type === "error" ? "error" : "success");
}