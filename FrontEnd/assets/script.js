// var token = sessionStorage.getItem("token");
const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MjE1NTYyNCwiZXhwIjoxNjgyMjQyMDI0fQ.UyHv_Gqz8tqARISGdqU3hWeXjnVbym1oKJj95v3HVAI";
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



function saveImage() {
  const url = "http://localhost:5678/api/works";
  form.onsubmit = async (formData) => {
  formData.preventDefault();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept':'application/json',
       'Authorization':`Bearer ${token}`, 
      },
      body: formData,
    });
    if (response.status == 201) { alert ("Un  projet a été ajouté")};
  } 
  catch (error){
    console.log(error);
  }
  }
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
if(send){ 
  send.addEventListener('click', function() {

    const titreForm = document.querySelector('#titre-image').value;
    const categorieForm = document.querySelector('#categorie').value;
    const imgInput = document.getElementById('file-1').files[0];
    console.log(titreForm)
    console.log(categorieForm)
    console.log(imgInput)
    
  
    const formData = new FormData();
    formData.append("image", imgInput);
    formData.append("title", titreForm);
    formData.append("category", categorieForm);
    // saveImage();
    })
}

  



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
      document.querySelectorAll('.categorie-1')[0].style.display = "block"
    document.querySelectorAll('.categorie-2')[i].style.display  = 'block';
    document.querySelectorAll('.categorie-3')[0].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[2].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[3].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[4].style.display  = 'block';
    document.querySelectorAll('.categorie-2')[5].style.display  = 'block';
    document.querySelectorAll('.categorie-3')[1].style.display  = 'block';
    document.querySelectorAll('.categorie-3')[2].style.display  = 'block';
    }
	});

  eventCategorieObjet.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
    document.querySelectorAll('.categorie-1')[0].style.display = "block"
    document.querySelectorAll('.categorie-2')[i].style.display = "none"
    document.querySelectorAll('.categorie-3')[0].style.display = "none"
    document.querySelectorAll('.categorie-3')[1].style.display = "none"
    document.querySelectorAll('.categorie-2')[2].style.display  = 'none';
    document.querySelectorAll('.categorie-2')[3].style.display  = 'none';
    document.querySelectorAll('.categorie-2')[4].style.display  = 'none';
    document.querySelectorAll('.categorie-2')[5].style.display  = 'none';
    document.querySelectorAll('.categorie-3')[2].style.display  = 'none';
    }
	});
  eventCategorieAppartements.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
      document.querySelectorAll('.categorie-1')[0].style.display  = 'none';
      document.querySelectorAll('.categorie-1')[1].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[i].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[2].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[3].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[4].style.display  = 'block';
      document.querySelectorAll('.categorie-2')[5].style.display  = 'block';
      document.querySelectorAll('.categorie-3')[0].style.display  = 'none';
      document.querySelectorAll('.categorie-3')[1].style.display  = 'none';
      document.querySelectorAll('.categorie-3')[2].style.display  = 'none';
    }
	});
  eventCategorieHotels.addEventListener('click', () => {
    for (var i=0;i<5;i+=1){
      document.querySelectorAll('.categorie-1')[0].style.display  = 'none';
      document.querySelectorAll('.categorie-1')[1].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[i].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[2].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[3].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[4].style.display  = 'none';
      document.querySelectorAll('.categorie-2')[5].style.display  = 'none';
      document.querySelectorAll('.categorie-3')[0].style.display  = 'block';
      document.querySelectorAll('.categorie-3')[1].style.display  = 'block';
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