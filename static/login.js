function checkUsername() {
    let user = document.getElementById("username");
    if (user.value.length < 5 || user.value.length > 18) {
        alert("Username must be between 5 and 12 characters long.");

    } else if (user.value.indexOf(" ") !== -1) {
        alert("Username cannot contain spaces.");

    } else if (user.value.indexOf("@") === -1) {
        alert("Username invalid.");

    } else if (user.value.indexOf(".") === -1) {
        alert("Username invalid.");

    } else {
        user.style.color = "green";
    }
}

let plabel = document.getElementsByTagName("div")[0];
function checkPassword() {
    plabel.textContent = "";
    let pass = document.getElementById("password").value;
    if (pass.length < 7 || pass.length > 12) {
        alert("Password must be between 7 and 12 characters long.");

    } else {
        let hasCaps = /[A-Z]/.test(pass);
        let hasSmalls = /[a-z]/.test(pass);
        let hasNums = /[0-9]/.test(pass);
        let hasAlphaNumeric = hasCaps && hasSmalls && hasNums;
        let hasSpecialChar = /[!@#$%^&*()]/.test(pass);

        if (!hasAlphaNumeric || !hasSpecialChar) {
            pEl = document.createElement("p")
            pEl.textContent = "Password invalid ";
            pEl.style.color = "red";
            plabel.appendChild(pEl);
            pEl2 = document.createElement("p")
            pEl2.textContent = "please use a combo of special character, A - Z, a - z, 0 - 9";
            pEl2.style.color = "red";
            plabel.appendChild(pEl2);
            // alert("Password must contain at least one character from each set [A-Za-z0-9] and special characters from [!@#$%^&*()].");
        } else {

            document.getElementById("password").classList.toggle('makeGreen');
            pEl = document.createElement("p")
            pEl.textContent = "Password valid";
            pEl.style.color = "green";
            plabel.appendChild(pEl);
        }

    }
}

function clickBtn() {
    formEl = document.getElementsByTagName("form")[0];
    formEl.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        let url = "localhost:3000/loign";
        const body = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "applcation/json",
            },
            body: JSON.stringify(body)
        };


        fetch(url, options).then(function (response) {
            console.log("response status code : ", response.status);
            console.log("response text : ", response.statusText);
            console.log("response url : ", response.url);
            return response.text()
        }).then(function (loginStatus) {
            console.log(loginStatus);
        })

        alert("Form submitted successfully!");
    });

}
