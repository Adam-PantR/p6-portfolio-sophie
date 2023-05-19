

// ----------------------------------------------------------------------------------------------------------------
// DERNIERE VERSION POST
// ----------------------------------------------------------------------------------------------------------------
const loginForm = document.querySelector('#btn-login');
const urlLogin = "http://localhost:5678/api/users/login";



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
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#mdp').value;
  fetch(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur dans l’identifiant ou le mot de passe');
    }
    return response.json();
  })
  .then(data => {
    if(data.token){
      localStorage.setItem('token', data.token);
      // token = data["token"];
      window.location.href='./index.html'     
    }
    else{
      alert('Token invalide')
    }    
  })
  .catch(error => console.error(error));
  return token;
}

const token = localStorage.getItem('token');

const btnLogin = document.querySelector('#btn-login');
if(btnLogin){
  btnLogin.addEventListener('click', function() {   
    login()
    getToken()   
}); 
}

const setLogin = document.querySelector(".login");
const setLogout = document.querySelector(".logout")

function viderToken(){
  localStorage.removeItem('token');
  setLogout.style.display = 'none';
  setLogin.style.display = 'block';
  location.reload();
 }

 setLogout.addEventListener('click', function() {
  viderToken();
 });

 if (typeof token === 'string' && token.length > 0){

  
  setLogout.style.display = 'block';
  setLogin.style.display = 'none';
  setLogout.addEventListener ('click', function (){
    viderToken();
  });
}