const urlAPI = "https://681ea61ac1c291fa6634a60c.mockapi.io/qlkh/users"

const loginButton = document.getElementById('login');
const registerButton = document.getElementById('register');
const container = document.getElementById('container');
const signUpBtn = document.getElementById('sign-up')
const signInBtn = document.getElementById('sign-in')
const alertBox = document.querySelector('.alert');
const alertHeader = document.getElementById('alert-type')
const alertText = document.getElementById('alert-text')

signInBtn.onclick = (e) => {
    e.preventDefault();
    fetch(urlAPI)
        .then(res => res.json())
        .then(data => {
            var usernameLogin = document.getElementById('email-login').value;
            var passwordLogin = document.getElementById('password-login').value;

            if (usernameLogin == "" || passwordLogin == "") {
                showAlert("Cảnh báo", "Hãy điền đầy đủ thông tin")
                setTimeout(() => {
                    hideAlert()
                }, 5000)
                return
            }

            user = data.find(u => u.email == usernameLogin)

            if (!user) {
                showAlert("Cảnh báo", "Email không đúng")
                setTimeout(() => {
                    hideAlert()
                }, 5000)
                return
            }

            if (user.password != passwordLogin) {
                showAlert("Cảnh báo", "Password không đúng")
                setTimeout(() => {
                    hideAlert()
                }, 5000)
                return
            }

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            showAlert("Thành công", "Đăng nhập thành công")
            setTimeout(() => {
                hideAlert()
            }, 5000)
            window.location.href = "../index.html";
        })
}

signUpBtn.onclick = (e) => {
    e.preventDefault()
    fetch(urlAPI)
        .then(res => res.json())
        .then(data => {
            var usernameSignup = document.getElementById('email-signup').value;
            var passwordSignup = document.getElementById('password-signup').value;
            var nameSignup = document.getElementById('username-signup').value;

            if (usernameSignup == "" || passwordSignup == "" || nameSignup =="") {
                showAlert("Cảnh báo", "Hãy điền đầy đủ thông tin")
                setTimeout(() => {
                    hideAlert()
                }, 5000)
                return
            }

            if (!usernameSignup.includes("@gmail.com")) {
                showAlert("Cảnh báo", "Tên đăng nhập không đúng định dạng email")
                setTimeout(() => {
                    hideAlert()
                }, 5000)
                return
            }

            user = data.find(u => u.email == usernameSignup)

            if (user) {
                showAlert("Cảnh báo", "Tên đăng nhập đã tồn tại")
                setTimeout(() => {
                    hideAlert()
                }, 5000)
                return
            }

            if (passwordSignup.length < 8) {
                showAlert("Cảnh báo", "Mật khẩu phải có ít nhất 8 ký tự")
                console.log("Mật khẩu phải có ít nhất 8 ký tự")
                setTimeout(() => {
                    hideAlert()
                }, 5000)
                return;
            }

            const today = new Date();
            const createdAt = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

            signUpData = {
                "name": nameSignup,
                "email": usernameSignup,
                "password": passwordSignup,
                "createdAt": createdAt,
                "id": data.length + 1
            }

            fetch(urlAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Dữ liệu trả về từ API:", data);
                    showAlert("Thành công", "Đăng kí thành công")
                    console.log("Đăng kí thành công")
                    setTimeout(() => {
                        hideAlert()
                    }, 5000)
                })
                .catch(error => {
                    console.error("Có lỗi xảy ra khi gửi yêu cầu:", error);
                });

            container.classList.remove("active");
        })
}

registerButton.addEventListener("click", () => {
    container.classList.add("active");
})

loginButton.addEventListener("click", () => {
    container.classList.remove("active");
})

function showAlert(alertType, text) {
    alertHeader.innerText = alertType
    alertText.innerText = text
    if (alertType.toLowerCase() == "cảnh báo") {
        alertHeader.style.color = "red";
    } else if (alertType.toLowerCase() == "thành công") {
        alertHeader.style.color = "green";
    }    
    alertBox.classList.add('show');
}

function hideAlert() {
    alertBox.classList.remove('show');
}

alertBox.addEventListener("click", () => {
    hideAlert()
})
