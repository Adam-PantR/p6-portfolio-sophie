

// ----------------------------------------------------------------------------------------------------------------
// DERNIERE VERSION POST
// ----------------------------------------------------------------------------------------------------------------
const loginForm = document.querySelector('#btn-login');
const urlLogin = "http://localhost:5678/api/users/login";
var token;


function login() {
  let emailLogin = 'sophie.bluel@test.tld';
  let passwordLogin = 'S0phie';
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#mdp').value;
  
  if(email === emailLogin && password === passwordLogin){
  alert('Vous êtes connecté');
  }
  else{
    alert('Mauvais email ou mot de passe')
  }
  
}


// GET TOKEN FONCTIONNEL
function getToken(){
  let emailLogin = 'sophie.bluel@test.tld';
  let passwordLogin = 'S0phie';
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#mdp').value;
  fetch(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then(response => response.json())
  .then(data => {
    if(email === emailLogin && password === passwordLogin){
      token = data["token"];     
    }
    else{
      alert('Token invalide')
    }    
  })
  .catch(error => console.error(error));
  return token;
}


const btnLogin = document.querySelector('#btn-login');
if(btnLogin){
  btnLogin.addEventListener('click', function() {   
    login()
    getToken()  
    const token = getToken()
}); 
}
