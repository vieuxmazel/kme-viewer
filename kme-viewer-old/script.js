function addHtml() {
    document.getElementById("light_track_profile_meta").innerHTML += "<div><span>Temps (kme)</span><span id=\"temps_marche\"class=\"right ng-binding\"></span></div>" +
        "<div>  <button id=\"kme-calcul\" onclick=\"\" style=\"padding-left: 0px;\">Calculer KME </button></div>";
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName("ol-oaycontainer-stopevent")[0].addEventListener('click', getKME_SuisseMobile);
    document.getElementsByClassName('menu')[0].addEventListener('mouseover', getPosition());
    alert("Hello !");
    console.error("Hello !")
});
// Fonction de calcul des kilomètres - efforts
function convertToKme(distance, deniv_pos, deniv_neg, rapport_distance = 300) {
    output = distance + deniv_pos / 100 + deniv_neg / rapport_distance;
    return output;
}

function calculTempsMarche(kme, vitesse = 4, outputType = "string") {
    tempsMarche = kme / vitesse;
    switch (outputType) {
        case "string":
            heureMarche = parseInt(tempsMarche);
            minMarche = Math.round(tempsMarche % 60);
            return heureMarche + " h " + minMarche + " min";
        default:
            return tempsMarche;
    }
}
function getPosition(){
    if (document.getElementById("menu-container").innerHTML.indexOf("Dessiner un parcours") > 0) { // Page de création d'un parcours
        position = "new-path";
    } else if (document.getElementById("menu-container").innerHTML.indexOf("Agrandir le profil / détails") > 0) { // Liste des parcours
        position = "show-path";
    } else if (document.getElementById("menu-container").innerHTML.indexOf("Annuler la modification") > 0) { // Page de modification du parcours
        position = "modify-path";
    } else {
        position = "other";
    }
    console.info(position);
    return position;
}
// Obtention de la distance horizontale
distance = parseFloat(document.getElementById("light_track_profile_meta").getElementsByClassName("right ng-binding")[1].innerHTML);
// Dénivellé positif et négatif
deniv = document.getElementById("light_track_profile_meta").getElementsByClassName("right ng-binding")[2].innerHTML.split("/");
console.log(deniv);
deniv_pos = parseFloat(deniv[0]);
deniv_neg = parseFloat(deniv[1]);

kil_effort = convertToKme(distance, deniv_pos, deniv_neg);

function getKME_SuisseMobile() {


    // Obtention de la distance horizontale
    distance = parseFloat(document.getElementById("light_track_profile_meta").getElementsByClassName("right ng-binding")[1].innerHTML);
    console.info(distance);
    // Dénivellé positif et négatif
    deniv = document.getElementById("light_track_profile_meta").getElementsByClassName("right ng-binding")[2].innerHTML.split("/");
    console.info(deniv);
    deniv_pos = parseFloat(deniv[0]);
    deniv_neg = parseFloat(deniv[1]);

    kil_effort = convertToKme(distance, deniv_pos, deniv_neg);
    console.info(calculTempsMarche(kil_effort, 4));
    //console.info(getPosition());
}
alert("Hello  !")

window.addEventListener('click', function () {
    alert('Chargé !')
  })

getKME_SuisseMobile()

document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName("ol-oaycontainer-stopevent")[0].addEventListener('click', getKME_SuisseMobile);
    document.getElementsByClassName('menu')[0].addEventListener('mouseover', getPosition());
    alert("Hello !");
    console.error("Hello !")
});

