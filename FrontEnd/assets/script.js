const loginForm = document.querySelector('#btn-login');
const urlLogin = "http://localhost:5678/api/users/login";

function login(){
  e.preventDefault(); // prevent form from submitting normally
  
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#mdp').value;
  
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
    if(email === 'sophie.bluel@test.tld' && password === 'S0phie'){
      alert('Vous êtes connecté')
    }
    else{
      alert('Mauvais email ou mot de passe')
    }
  })
  .catch(error => console.error(error));
}

// const btnLogin = document.querySelector('#btn-login');
// if(btnLogin){
//   btnLogin.addEventListener('click', function() {
//     console.log('en marche')
// }); 
// }





//MODAL

const modal = document.querySelector(".modal-Edition");
const modalTrigger = document.querySelector(".edition");
const closeModal = document.getElementsByClassName("close")[0];
const closeModal2 = document.getElementsByClassName("close")[1];
const modalReturn = document.getElementsByClassName("js-return")[0];
const modalAjout = document.getElementsByClassName("modal-wrapper-ajout")[0];
const modalProjet = document.getElementsByClassName("modal-wrapper")[0];
const ajoutPhoto = document.getElementsByClassName("ajout-photo")[0];

modalTrigger.onclick = function() {
modal.style.display = "flex";
modal.style.background = "rgba(0, 0, 0, 0.8)"
}
ajoutPhoto.onclick = function() {
  modalProjet.style.display =  "none";
  modalAjout.style.display = "flex";
}
closeModal.onclick = function() {
  modal.style.display = "none";
}
closeModal2.onclick = function() {
  modal.style.display = "none";
}
modalReturn.onclick = function() {
  modalAjout.style.display = "none";
  modalProjet.style.display =  "flex";
}

window.onclick = function(event) {
  if (event.target == modal) {
	modal.style.display = "none";
  }
}

// PREVIEW DES BOUTTONS

function previewBeforeUpload(id){
  document.querySelector("#"+id).addEventListener("change",function(e){
    if(e.target.files.length == 0){
      return;
    }
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    document.querySelector("#"+id+"-preview div").innerText = file.name;
    document.querySelector("#"+id+"-preview img").src = url;
  });
}

previewBeforeUpload("file-1");


// RECUPERATION DES DONNEES DU FORMULAIRE ET ENVOIE


// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // prevent default form submission behavior
  
//   const formData = new FormData(form); // get form data
  
//   fetch('http://localhost:5678/api/works', {
//     method: 'POST',
//     header: {
//       'accept': 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//     body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//     // do something with the API response data
//     console.log(data);
    
//     // access form values in JavaScript
//     // const imgInput = document.querySelector('file-1').src;
//     const titre = form.elements.titre.value;
//     const categorie = form.elements.categorie.value;
    
//     // do something with the form values
//     console.log( titre, categorie);

//   })
//   .catch(error => console.error(error));
// });

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3ODcwMTY3MSwiZXhwIjoxNjc4Nzg4MDcxfQ.P7juC9A9-Wu-I1BtAAlXgQ29kI7LtIftavnE8P35fF0";

const envoieForm = document.querySelector('.valider');
const titreForm = document.querySelector('#titre-image');
const categorieForm = document.querySelector('#categorie');
const form = document.getElementById('form-photo');
const imgInput = document.getElementById('file-1');

const titre = titreForm.value;
const image = imgInput.value;
const categorie = categorieForm.value;

const formData = {

}

function saveImage() {
  const url = "http://localhost:5678/api/works";
  const formdata = {
   "id": 12,
   "titre":titre,
   "imageUrl": image, 
   "categoryId": categorie,
   "userId": 1,
  };
    const response = fetch(url, {
      method: "POST",
      headers: {
        'Authorization':`Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",     
      },
      body: data,
    })
    .then(response => {
      if(!response.ok){
        throw new Error('Network was not ok') 
      }
      console.log("Image saved:", response);
      console.log(data)
    })
    .then(response => {
      response.json
      console.log('ca marche')
    })
    };


function importImage() {
  const url = "http://localhost:5678/api/works";
  let reponse = fetch(url, {
     method: "GET",
     headers: {
       'Authorization':`Bearer ${token}`,
       "Content-Type": "application/json",     
     }
   })
  .then(reponse => reponse.json())
  .then(data => {
    console.table(data);
    for (const item of data) {
      // CREATION DES PROJETS A LA PAGE D ACCUEIL
  const accueil = document.querySelector('.gallery');
  const figureGallery = document.createElement('figure');
  figureGallery.className = 'categorie-' + item.categoryId;
  const imagesGallery = document.createElement('img');
  imagesGallery.src = item.imageUrl;
  const titreImageGallery = document.createElement('figcaption')
  titreImageGallery.innerText = item.title;

  accueil.appendChild(figureGallery);
  figureGallery.appendChild(imagesGallery);
  figureGallery.appendChild(titreImageGallery); 

    }
    })
  .catch(error => console.error(error));
  }

  function importImageModal() {
    const url = "http://localhost:5678/api/works";
    let reponse = fetch(url, {
       method: "GET",
       headers: {
         'Authorization':`Bearer ${token}`,
         "Content-Type": "application/json",     
       }
     })
    .then(reponse => reponse.json())
    .then(data => {
      for (const item of data) {

   // CREATION DES PROJETS DANS LA MODAL
   const modalProjets = document.querySelector('.div-modal');
   const figureModal = document.createElement('figure');
   const imagesModal = document.createElement('img');
   imagesModal.src = item.imageUrl;
   const iconeImagesModal1 = document.createElement('i');
   iconeImagesModal1.className = ('fa-solid fa-up-down-left-right');
   const iconeImagesModal2 = document.createElement('i');
   iconeImagesModal2.className = ('fa-solid fa-trash');
   const editerImageModal = document.createElement('figcaption')
   editerImageModal.innerText = 'éditer';
 
 
   modalProjets.appendChild(figureModal);
   figureModal.appendChild(imagesModal);
   figureModal.appendChild(iconeImagesModal1);
   figureModal.appendChild(iconeImagesModal2); 
   figureModal.appendChild(editerImageModal);  
  }
})
.catch(error => console.error(error));
}
    
importImageModal()
importImage()

// CREATION DE L APERCU DU PROJET

function newProject() {

   // CREATION DU PROJET DANS LA MODAL

  const divProject = document.querySelector('.div-modal3');
  const figureElement = document.createElement("figure");
  const imagesElement = document.createElement("img");
	imagesElement.src = e.target.files[0];
  const icone1 = document.createElement('i');
  icone1.className = ('fa-solid fa-up-down-left-right');
  const icone2 = document.createElement('i');
  icone2.className = ('fa-solid fa-trash');

  divProject.appendChild(figureElement);
	figureElement.appendChild(imagesElement);
	figureElement.appendChild(icone1);
  figureElement.appendChild(icone2);


  console.log('Un projet a été ajouté')
}


  // CREATION DY PROJET DANS LA PAGE D ACCUEIL
function galleryNewProject() {
  const accueil = document.querySelector('.gallery');
  const figureGallery = document.createElement('figure');
  figureGallery.className = ('new-project');
  const imagesGallery = document.createElement('img');
  let imageSRC = document.getElementById('js-created-img').value;
  imagesGallery.className = ('new-image');
  imagesGallery.src = imageSRC;
  const titreImageGallery = document.createElement('figcaption')
  titreImageGallery.innerText = titreForm.value;


  accueil.appendChild(figureGallery);
  figureGallery.appendChild(imagesGallery);
  figureGallery.appendChild(titreImageGallery); 
  
    console.log('un projet a été ajouté à la gallerie');
 
}





const send = document.querySelector('.valider');
send.addEventListener('click', () => {
  saveImage();
  newProject();
  galleryNewProject();
  
})






// const data = fetch('http://localhost:5678/api/works', {
//   method:'POST',
//   headers: {
//     "Content-Type": 'application/json',
//   },
//   body: JSON.stringify(),
// })

// envoieForm.onclick =  function addData() {
//   data.index = data.length+1;
//   data.id = data.length+1;
//   data.title = titreForm.value;
//   data.imageUrl = imgInput.value;
//   data.categoryId = categorieForm.id;
//   data.userId = 1;
//   data.category =  categorieForm.value;
// }



// MISE EN PLACE DES ACTFS AU FILTRE

let currentFiltre = 0;
const filtre = document.querySelectorAll('.itemFiltre');

filtre.forEach((itemFiltre, index) => {
	itemFiltre.addEventListener('click', () => {
	  currentFiltre = index;
	  setActiveFiltre();
	});
  });

  const eventCategorieTous  =document.querySelector('#tous');
  const eventCategorieObjet  = document.querySelector('#objets');
  const eventCategorieAppartements  = document.querySelector('#appartements');
  const eventCategorieHotels  = document.querySelector('#hotels');
  
  eventCategorieTous.addEventListener('click', () => {
    for (var i=0;i<12;i+=1){
	  idCategorie1[i].style.display  = 'block';
    idCategorie2[i].style.display  = 'block';
    idCategorie3[i].style.display  = 'block';
    idCategorie2[2].style.display  = 'block';
    idCategorie2[3].style.display  = 'block';
    idCategorie2[4].style.display  = 'block';
    idCategorie2[5].style.display  = 'block';
    idCategorie3[2].style.display  = 'block';
    }
	});

  eventCategorieObjet.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
      idCategorie1[i].style.display  = 'block';
      idCategorie2[i].style.display  = 'none';
      idCategorie2[2].style.display  = 'none';
      idCategorie2[3].style.display  = 'none';
      idCategorie2[4].style.display  = 'none';
      idCategorie2[5].style.display  = 'none';
      idCategorie3[i].style.display  = 'none'; 
      idCategorie3[2].style.display  = 'none';
    }
	});
  eventCategorieAppartements.addEventListener('click', () => {
    for (var i=0;i<12;i+=1){
      idCategorie1[i].style.display  = 'none';
      idCategorie2[i].style.display  = 'block';
      idCategorie2[2].style.display  = 'block';
      idCategorie2[3].style.display  = 'block';
      idCategorie2[4].style.display  = 'block';
      idCategorie2[5].style.display  = 'block';
      idCategorie3[i].style.display  = 'none';
      idCategorie3[2].style.display  = 'none';
    }
	});
  eventCategorieHotels.addEventListener('click', () => {
    for (var i=0;i<12;i+=1){
      idCategorie1[i].style.display  = 'none';
      idCategorie2[i].style.display  = 'none';
      idCategorie3[i].style.display  = 'block';
      idCategorie2[2].style.display  = 'none';
      idCategorie2[3].style.display  = 'none';
      idCategorie2[4].style.display  = 'none';
      idCategorie2[5].style.display  = 'none';
      idCategorie3[2].style.display  = 'block';
    }
	});

let idCategorie1 = document.querySelectorAll('.categorie-1');
let idCategorie2 = document.querySelectorAll('.categorie-2');
let idCategorie3 = document.querySelectorAll('.categorie-3');

function setActiveFiltre() {
	filtre.forEach(itemFiltre => itemFiltre.classList.remove('itemFiltre-Selected'));
	filtre[currentFiltre].classList.add('itemFiltre-Selected');
}
  
  setActiveFiltre();

  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
   console.log(data[0])

  });

  //Ajout de la possibilité de supprimer les projets 

  const deleteProjet = document.querySelector('.fa-trash')