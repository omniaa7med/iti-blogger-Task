(function () {

    var form = document.getElementById('login');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var count;



    form.addEventListener('submit', handlesubmit);
    email.addEventListener('keyup', checkemail);
    password.addEventListener('keyup', checkpassword);

    //button sign in
    function handlesubmit(e) {
        count = 0;
        // e.preventDefault(); 
        checkemail();
        checkpassword();
        console.log(count);
        if (count == 2) {
            this.setAttribute('action', 'manageposts.html');
        } else {
            e.preventDefault();
        }
    }


    //validation email 
    function checkemail() {
        var paternEmail = /^[a-z]+\@(gmail|yahoo|domain)\.com$/g;
        var testemail = paternEmail.test(email.value);
        if (testemail == true) {
            email.style.border = '2px solid green';
            email.nextElementSibling.innerHTML = '';
            count++;
        } else {
            email.nextElementSibling.style.display = 'inline-block';
            email.nextElementSibling.innerHTML = 'please add email ';
            email.style.border = '2px solid red';
        }
    }

    //validation password 
    function checkpassword() {
        var paternPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{6,}$/g;
        var testpass = paternPass.test(password.value);
        if (testpass == true && password.value.length <= 12 && password.value.length > 6) {
            password.style.border = '2px solid green';
            password.nextElementSibling.style.display = 'none';
            count++;

        } else {
            password.nextElementSibling.style.display = 'inline-block';
            password.nextElementSibling.innerHTML = 'password include uppercase,speacil character,numbers,lowerCase';
            password.style.border = '2px solid red';
            console.log(password.value);

        }
    }

})()
