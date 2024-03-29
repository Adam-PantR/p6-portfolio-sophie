const token = localStorage.getItem("token");

//MODAL

const modal = document.querySelector(".modal-Edition");
const modalTrigger = document.querySelector(".edition");
const closeModal = document.getElementsByClassName("close")[0];
const closeModal2 = document.getElementsByClassName("close")[1];
const modalReturn = document.getElementsByClassName("js-return")[0];
const modalAjout = document.getElementsByClassName("modal-wrapper-ajout")[0];
const modalProjet = document.getElementsByClassName("modal-wrapper")[0];
const ajoutPhoto = document.getElementsByClassName("ajout-photo")[0];
const figureGallery = document.createElement("figure");

modalTrigger.onclick = function () {
  modal.style.display = "flex";
  modal.style.background = "rgba(0, 0, 0, 0.8)";
};
ajoutPhoto.onclick = function () {
  modalProjet.style.display = "none";
  modalAjout.style.display = "flex";
};
closeModal.onclick = function () {
  modal.style.display = "none";
};
closeModal2.onclick = function () {
  modal.style.display = "none";
};
modalReturn.onclick = function () {
  modalAjout.style.display = "none";
  modalProjet.style.display = "flex";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// PREVIEW DES BOUTTONS

function previewBeforeUpload(id) {
  document.querySelector("#" + id).addEventListener("change", function (e) {
    if (e.target.files.length == 0) {
      return;
    }
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    document.querySelector("#" + id + "-preview div").innerText = file.name;
    document.querySelector("#" + id + "-preview img").src = url;
  });
}

previewBeforeUpload("file-1");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// GESTION DES FETCH POST & GET
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Création + Post du nouveau projet créé dans la modale
function createImage() {
  let titreForm = document.querySelector("#titre-image");
  let categorieForm = document.querySelector("#categorie");
  let imgInput = document.getElementById("file-1");
  if (titreForm.value == "") {
    alert("Il  faut ajouter un titre");
    return;
  }
  if (categorieForm.value == "") {
    alert("Il faut ajouter unecatégorie");
    return;
  }
  if (imgInput.value == "") {
    alert("Il faut ajouter une image");
    return;
  }

  console.log(titreForm.value);
  console.log(categorieForm.value);
  console.log(imgInput.files[0]);

  let formData = new FormData();
  formData.append("image", imgInput.files[0]);
  formData.append("title", titreForm.value);
  formData.append("category", categorieForm.value);

  // Déclaration de URL = Fetch Works


  const url = "http://localhost:5678/api/works";

  // Envoie du formulaire en POST 
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("erreur lors du transfert");
    })
    .then((data) => {
      console.log(data);
      // document.querySelector('.fa-xmark close').click();
      importImage();
      importImageModal();
    })
    .catch((error) => {
      console.error(error);
    });
}

const accueil = document.querySelector(".gallery");
const modalProjets = document.querySelector(".div-modal");

// Importation des images dans l'accueil

function importImage() {
  const url = "http://localhost:5678/api/works";
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((reponse) => reponse.json())
    .then((data) => {
      accueil.innerHTML = "";
      data.forEach((works) => {
        // CREATION DES PROJETS A LA PAGE D ACCUEIL

        const figureGallery = document.createElement("figure");
        figureGallery.className = "categorie-" + works.categoryId;
        figureGallery.style.display = "block";
        const imagesGallery = document.createElement("img");
        imagesGallery.src = works.imageUrl;
        const titreImageGallery = document.createElement("figcaption");
        titreImageGallery.innerText = works.title;

        accueil.appendChild(figureGallery);
        figureGallery.appendChild(imagesGallery);
        figureGallery.appendChild(titreImageGallery);
      });
    });
}
// Importation des images dans la modale

function importImageModal() {
  const url = "http://localhost:5678/api/works";
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((reponse) => reponse.json())
    .then((data) => {
      modalProjets.innerHTML = "";
      data.forEach((item) => {
        // CREATION DES PROJETS DANS LA MODAL
        const figureModal = document.createElement("figure");
        const imagesModal = document.createElement("img");
        imagesModal.src = item.imageUrl;
        const iconeImagesModal1 = document.createElement("i");
        iconeImagesModal1.className = "fa-solid fa-up-down-left-right";
        const iconeImagesModal2 = document.createElement("i");
        iconeImagesModal2.className = "fa-solid fa-trash";
        iconeImagesModal2.setAttribute("data-id", item.id);
        const editerImageModal = document.createElement("figcaption");
        editerImageModal.innerText = "éditer";

        modalProjets.appendChild(figureModal);
        figureModal.appendChild(imagesModal);
        figureModal.appendChild(iconeImagesModal1);
        figureModal.appendChild(iconeImagesModal2);
        figureModal.appendChild(editerImageModal);
      });
    });
}
// Appel des fonctions d'importation

importImageModal();
importImage();


// Suppression des projets dans la modal & le Fetch

const divModal = document.querySelector(".div-modal");
divModal.addEventListener("click", function (event) {
  if (event.target.closest(".fa-trash")) {
    const boutonSupprimer = event.target.closest(".fa-trash");
    const deleteById = boutonSupprimer.getAttribute("data-id");
    console.log(deleteById);
    //Fetch sur l'élément précis à supprimer
    fetch(`http://localhost:5678/api/works/${deleteById}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: deleteById,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Element supprimé");
        } else {
          throw new Error("Erreur lors de la suppression");
        }
        //   return response.json();
      })
      .then((data) => {
        console.log(data);
        importImageModal();
        importImage();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});


// Bouton ajout du nouveau projet

const send = document.querySelector(".valider");
send.addEventListener("click", function (event) {
  event.preventDefault();
  createImage();
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// GESTION DES FILTRES
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const filtreDiv = document.querySelector(".filtre");
const eventCategorieTous = document.querySelector("#tous");
const eventCategorieObjet = document.querySelector(".objets");
const eventCategorieAppartements = document.querySelector(".appartements");
const eventCategorieHotels = document.querySelector(".hotels");

let idCategorie1 = document.querySelectorAll(".categorie-1");
let idCategorie2 = document.querySelectorAll(".categorie-2");
let idCategorie3 = document.querySelectorAll(".categorie-3");
let idCategorieEmpty = document.querySelectorAll(".displayOff");

// Fonction de création de projet Image + Titre
function createWorkElement(works) {
  const figureGallery = document.createElement("figure");
  const imagesGallery = document.createElement("img");
  imagesGallery.src = works.imageUrl;
  const titreImageGallery = document.createElement("figcaption");
  titreImageGallery.innerText = works.title;

  accueil.appendChild(figureGallery);
  figureGallery.appendChild(imagesGallery);
  figureGallery.appendChild(titreImageGallery);
  return figureGallery;
}
//Récupération des projets présents dans l'API
function afficherProjects() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((projects) => {
      accueil.innerHTML = "";
      projects.forEach((works) => {
        const figureParCategorie = createWorkElement(works);
        accueil.appendChild(figureParCategorie);
      });
    });
}

eventCategorieTous.addEventListener('click' , function() {
  filtrerProjetsCategorie('tous')
})


function filtrerProjetsCategorie(categorie) {

  // MISE EN PLACE DES ACTFS AU FILTRE

    console.log(categorie)
    const filtrePreviouslySelected = document.querySelector('.itemFiltre-Selected');
    filtrePreviouslySelected.classList.remove('itemFiltre-Selected');

    const filtreCurrentlySelected = document.getElementById(categorie);
    filtreCurrentlySelected.classList.add('itemFiltre-Selected')

  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      const projetsFiltres = data.filter(function (works) {
        return works.category.name === categorie;
      });
      accueil.innerHTML = "";
      projetsFiltres.forEach((works) => {
        const figureParCategorie = createWorkElement(works);
        accueil.appendChild(figureParCategorie);
      });
    })
    .catch((error) => {
      console.log(error, "Erreur lors de la récupération des works");
    });
}
afficherProjects();
eventCategorieTous.addEventListener("click", afficherProjects)

async function fetchCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categoriesTest = response.json();
  return categoriesTest;
}
fetchCategories();

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((categorie) => {
      // Creation et filtre des projets
      const boutonCategorie = document.createElement("div");
      boutonCategorie.classList.add("itemFiltre");
      boutonCategorie.id = categorie.name;
      boutonCategorie.innerText = categorie.name;
      filtreDiv.appendChild(boutonCategorie);
      boutonCategorie.addEventListener("click", function () {
        filtrerProjetsCategorie(categorie.name);
      });
    });
  })
  .catch((error) => {
    console.log(error, "Erreur lors de la récupération des categories");
  });




// Gestion d'affichage au Login / Logout
const setLogin = document.querySelector(".login");
const setLogout = document.querySelector(".logout");
const modEdition = document.querySelector(".headerLogin");
const modifierEdition = document.querySelector(".modifier");

function viderToken() {
  localStorage.removeItem("token");
  setLogout.style.display = "none";
  setLogin.style.display = "block";
  modEdition.style.display = "none";
  modifierEdition.style.display = "none";
  location.reload();
}

if (token !== null) {
  setLogout.style.display = "block";
  setLogin.style.display = "none";
  modEdition.style.display = "flex";
  modifierEdition.style.display = "flex";
} else {
  modEdition.style.display = "none";
  modifierEdition.style.display = "none";
}

setLogout.addEventListener("click", function () {
  viderToken();
});