// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3ODA1MzAzOCwiZXhwIjoxNjc4MTM5NDM4fQ.Oap4muTfjq_FY_EFNoc4zN4QwGrf-LuaajglWIttvyk";

// document.getElementById('btn-login').addEventListener('click', ()=>{
    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('mdp').value;
//     console.log(email.value,password)

//      fetch('http://localhost:5678/api/users/login',{
//         method: "POST",
//         headers: {
//           'Authorization': Bearer + token,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
          
//         },
//         body: JSON.stringify({email: email, password: password})
//     }).then( res => {
//         console.log(res)
  

//     })

// })

// function validate(){
//     var mail = document.getElementById("email").value;
//     var password = document.getElementById("mdp").value;
//     if ( mail == "test@gmail.com" && password == "test"){
//     alert("Vous êtes maintenant conencté");
//     window.location.href = "index.html";
//     return true;
//     }
//     else {
//         alert("Wrong email or password");
//     }
//     }
// const login = document.querySelector('#btn-login');
// login.addEventListener('click', () => {
//     validate()

//     headerDisplayON = querySelector('.headerLogin');
//     headerDisplayON.style.display = ('flex');
// });


// ----------------------------------------------------------------------------------------------------------------
// DERNIERE VERSION POST
// ----------------------------------------------------------------------------------------------------------------
const loginForm = document.querySelector('#btn-login');
let tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3ODcwMTY3MSwiZXhwIjoxNjc4Nzg4MDcxfQ.P7juC9A9-Wu-I1BtAAlXgQ29kI7LtIftavnE8P35fF0";
const urlLogin = "http://localhost:5678/api/users/login";

let emailLogin = 'sophie.bluel@test.tld';
let passwordLogin = 'S0phie';
const email = document.querySelector('#email').value;
const password = document.querySelector('#mdp').value;

function login(){
  
  fetch(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`,
    },
    body: JSON.stringify({email, password})
  })
  .then(response => response.json())
  .then(data => {
     let token = data["token"];
     console.log(token)
  })
  .catch(error => console.error(error));
}

const btnLogin = document.querySelector('#btn-login');
if(btnLogin){
  btnLogin.addEventListener('click', function() {
  let emailLogin = 'sophie.bluel@test.tld';
  let passwordLogin = 'S0phie';
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#mdp').value;
    console.log(email)
    if(email === emailLogin && password === passwordLogin){
      login();
      alert('Vous êtes connecté');
    }
    else{
      alert('Mauvais email ou mot de passe')
    }
    
}); 
}





    // LOG IN
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3ODA1MzAzOCwiZXhwIjoxNjc4MTM5NDM4fQ.Oap4muTfjq_FY_EFNoc4zN4QwGrf-LuaajglWIttvyk";
    // document.querySelector('form').addEventListener('submit', function(e) {
    //     e.preventDefault(); // prevent the form from submitting via the browser
      
    //     const mail = document.getElementById('email').value;
    //     const password = document.getElementById('mdp').value;
      
    //     fetch('http://localhost:5678/api/users/login', {
    //       method: 'POST',
    //       body: JSON.stringify({ mail, password }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization':`Bearer ${token}`,
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       // handle the response from the server
    //       if (data.success) {
    //         alert("Login successfully");
    //         window.location = './index.html';
    //       } else {
    //         alert('Invalid username or password');
    //       }
    //     })
    //     .catch(error => console.error(error));
    //   });