const loginForm = document.querySelector("#login-form");
const inputEmail = loginForm.querySelector("#email");
const inputPassword = loginForm.querySelector("#password");
const messageContainer = document.createElement("div");
messageContainer.classList.add("form-message");
loginForm.appendChild(messageContainer);

loginForm.addEventListener("submit", checkEmailAndPassword);

function checkEmailAndPassword(event) {
    event.preventDefault();

    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    // Kiểm tra định dạng
    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    if (!password) {
        showMessage("Password cannot be empty.", "error");
        return;
    }

    // Lấy danh sách người dùng
    let listUser = JSON.parse(localStorage.getItem("list-user"));

    if (!listUser) {
        showMessage("No users registered in the system.", "error");
        return;
    }

    // Kiểm tra thông tin đăng nhập
    const user = listUser.find(u => u.email === email && u.password === btoa(password));

    if (user) {
        // Lưu trạng thái đăng nhập
        localStorage.setItem("current-user", JSON.stringify({
            email: user.email,
            username: user.username
        }));
        showMessage("Login successful! Redirecting...", "success");

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } else {
        showMessage("Invalid email or password.", "error");
    }
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