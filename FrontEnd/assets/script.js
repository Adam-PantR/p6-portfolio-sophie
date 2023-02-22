// const { query } = require("express");

urlWorks = 'http://localhost:5678/api/works';
let reponse = fetch(urlWorks);
fetch(urlWorks)
.then(reponse => reponse.json())
.then(data => console.log(data));


const obj = JSON.parse(backEndInfo);


for (let i = 0 ; i < data.lenght; i++ ){

	const backEndElements = data[i];

	//On créer une image pour chacun des projets présents dans le backend
	const imagesElement = document.createElement("img");
	imagesElement.src = backEndElements.data.imageUrl;
	

	//On créer un text p pur chaque title
	const textElement = document.createElement("figcaption");
	textElement.innerHTML =backEndElements.data.title;

    const newProject =document.createElement("figure");
    

	const projects =document.querySelector(".gallery");
    

	projects.appendChild(newProject)
	newProject.appendChild(imagesElement);
	newProject.appendChild(textElement);
}



// const btnName = document.getElementById('btn-name');
// const inputName = document.getElementById('input-name');
// const outputText = document.getElementById('output');

// let btn = () => {
//     fetch("http://localhost:5678/api/works/" + inputName.value)
//         .then(reponse => reponse.json())
//         .then(data => { 
//             outputText.textContent = "";
//             outputText.textContent = `Le projet ${data.title}`;
//             const img = document.createElement("img");
//             img.src = data.imageURL;
//             output.appendChild(img) 
//     })
// }



// async function fetchProject() {
//     const reponse = await fetch('http://localhost:5678/api/works')
//     if (reponse.ok = true){
//         return reponse.json();
//     }
//     throw new Error ("Impossible de contacter le serveur")
// }

// fetchProject().then(project => console.log(project))

// const buttonTrier = document.querySelector('.btn-trier')

// buttonTrier.addEventListener('click', function(){
//     array.from()

// })