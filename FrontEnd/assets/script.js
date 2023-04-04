const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDUyMDAyNywiZXhwIjoxNjgwNjA2NDI3fQ.1jt1FRpSdIug6VwklIj-74sKbk1uuH74QUPnWNZeHAE"
// const axios = require('axios');
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

const envoieForm = document.querySelector('.valider');
const titreForm = document.querySelector('#titre-image');
const categorieForm = document.querySelector('#categorie');
const form = document.getElementById('form-photo');
const imgInput = document.getElementById('file-1');


const titre = titreForm.value;
const image = imgInput.value;
const categorie = categorieForm.value;

const imageCreated = document.getElementById('js-created-img');
const imageCreatedSrc = imageCreated.src;
const imageCreatedSrcValue = imageCreatedSrc.value;

// function testSaveImage() {


//   const imageUrl = "https://example.com/image.jpg"; // L'URL de l'image à envoyer
//   const endpointUrl = "htpp://localhost:5678/api/categories"; // L'URL de l'API pour télécharger l'image
//   // Créer une instance de l'objet FormData
//   const formData = new FormData();
//   // Ajouter l'image à FormData en utilisant l'URL de l'image
//   formData.append("imageUrl", imageUrl);
//   // Créer une requête POST avec la méthode fetch
//     fetch(endpointUrl, {
//       method: "POST",
//       body: formData
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Erreur lors de la requête");
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log("Réponse de l'API :", data);
//     })
//     .catch(error => {
//       console.error("Erreur :", error);
//     });
//   }


function saveImage() {
  const url = "http://localhost:5678/api/works";

  const formdata= {
   "id": 12,
   "titre":titre,
   "imageUrl": image, 
   "categoryId": categorie,
   "userId": 1,
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(url, {
      method: 'POST',
      headers: {
       'Authorization':`Bearer ${token}`,
       "Content-Type": "multipart/form-data", 
      },
      body: new FormData(form)
    });
    let result = await response.json();
    alert(result.message);
    // const response = fetch(url, {
    //   method: "POST",
    //   headers: {
    //     'Authorization':`Bearer ${token}`,
    //     "Accept": "application/json",
    //     "Content-Type": "multipart/form-data",     
    //   },
    //   body: formdata,
    // })
    // .then(response => {
    //   if(!response.ok){
    //     throw new Error('Network was not ok') 
    //   }
    //   console.log("Image saved:", response);
    //   console.log(data)
    // })
    // .then(response => {
    //   response.json
    //   console.log('ca marche')
    // })
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------------

  // AXIOS

  // --------------------------------------------------------------------------------------------------------------------------------------------------



function saveImageAxios() {
  

   // Récupérer les valeurs des champs du formulaire

  const form = document.getElementById('form-photo');
  const titreForm = document.querySelector('#titre-image').value;
  const categorieForm = document.querySelector('#categorie').value;
  const imgInput = document.getElementById('file-1').files[0];

  // Création d'un objet FormData contenant l'image
  const formData = new FormData();
  formData.append('titre', titreForm);
  formData.append('categoryId', categorieForm)
  formData.append('image', imgInput);
  // Envoi de la requête POST vers l'URL souhaitée
  fetch('http://localhost:5678/api/works', {
    method:'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization':`Bearer ${token}`,
      'X-Custom-Header': 'custom-value'
    }
  })
  .then(response => {
    if(!response.ok){
      throw new Error("Erreur de la requete")
    }
    return response.json();
  })
  .then((response) => {
    console.log(response.data);
    alert('Image saved successfully');
  }).then(data => {
    console.log("Reponse de l'API : ", data);
  }).catch((error) => {
    console.error(error);
 });
}
 






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
  figureGallery.style.display = "block"
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

// function newProject() {

//    // CREATION DU PROJET DANS LA MODAL

//   const divProject = document.querySelector('.div-modal3');
//   const figureElement = document.createElement("figure");
//   const imagesElement = document.createElement("img");
// 	imagesElement.src = imagesElement.value;
//   const icone1 = document.createElement('i');
//   icone1.className = ('fa-solid fa-up-down-left-right');
//   const icone2 = document.createElement('i');
//   icone2.className = ('fa-solid fa-trash');

//   divProject.appendChild(figureElement);
// 	figureElement.appendChild(imagesElement);
// 	figureElement.appendChild(icone1);
//   figureElement.appendChild(icone2);


//   console.log('Un projet a été ajouté')
// }


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
  saveImageAxios()
  saveImage();
  // newProject();
  // galleryNewProject();
  
})


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

  let idCategorie1 = document.querySelectorAll('.categorie-1');
  let idCategorie2 = document.querySelectorAll('.categorie-2');
  let idCategorie3 = document.querySelectorAll('.categorie-3');

  let categorie1Lenght = idCategorie1.lenght
  let categorie3Lenght = idCategorie3.lenght

  eventCategorieTous.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
    document.querySelectorAll('.categorie-1')[i].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[i].style.display  = 'block';
    document.querySelectorAll('.categorie-3')[i].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[2].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[3].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[4].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[5].style.display  = 'block';
    document.querySelectorAll('.categorie-3')[2].style.display  = 'block';
    }

    // for (var i=0;i<categorie1Lenght;i+=1){
    //   document.querySelectorAll('.categorie-1')[i].style.display  = 'block';
    //   }
    //   for (var i=0;i<categorie2Lenght;i+=1){
    //     document.querySelectorAll('.categorie-2')[i].style.display  = 'block';
    //   document.querySelectorAll('.categorie-3')[i].style.display  = 'block';
    //   document.querySelectorAll('.categorie-2')[2].style.display  = 'block';
    //   document.querySelectorAll('.categorie-2')[3].style.display  = 'block';
    //   document.querySelectorAll('.categorie-2')[4].style.display  = 'block';
    //   document.querySelectorAll('.categorie-2')[5].style.display  = 'block';
    //   document.querySelectorAll('.categorie-3')[2].style.display  = 'block';
      // }
	});

  eventCategorieObjet.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
    document.querySelectorAll('.categorie-1')[i].style.display = "block"
    document.querySelectorAll('.categorie-2')[i].style.display = "none"
    document.querySelectorAll('.categorie-3')[i].style.display = "none"
    document.querySelectorAll('.categorie-2')[2].style.display  = 'none';
    document.querySelectorAll('.categorie-2')[3].style.display  = 'none';
    document.querySelectorAll('.categorie-2')[4].style.display  = 'none';
    document.querySelectorAll('.categorie-2')[5].style.display  = 'none';
    document.querySelectorAll('.categorie-3')[2].style.display  = 'none';
    }
	});
  eventCategorieAppartements.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
      document.querySelectorAll('.categorie-1')[i].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[i].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[2].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[3].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[4].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[5].style.display  = 'block';
      document.querySelectorAll('.categorie-3')[i].style.display  = 'none';
      document.querySelectorAll('.categorie-3')[2].style.display  = 'none';
    }
	});
  eventCategorieHotels.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
      document.querySelectorAll('.categorie-1')[i].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[i].style.display  = 'none';
      document.querySelectorAll('.categorie-3')[i].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[2].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[3].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[4].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[5].style.display  = 'none';
      document.querySelectorAll('.categorie-3')[2].style.display  = 'block';
    }
	});



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