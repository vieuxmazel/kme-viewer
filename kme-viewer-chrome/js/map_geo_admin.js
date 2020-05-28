
// Variables globales pour la montée, la descente et la vitesse
var vitesse=4;
var ratio_descente = 300;
var ratio_montee = 100;

// Fonctions de mise à jour des variables globales lorsqu'elles sont modifiées
function update_vitesse(){
    vitesse = document.getElementById("vitesse_marche").value;
}
function update_montee(){
    ratio_montee = document.getElementById("ratio-montee").value;
}
function update_descente(){
    ratio_descente = document.getElementById("ratio-descente").value;
}
function getKme(facteurMontee=100, facteurDescente=300) {
    if (document.getElementById("profile-popup").style.display == "block") { // => Si il y a un profile de marche en cours de calcul
        var montee = parseFloat(document.getElementsByClassName("ga-profile-elevation-up")[0].getElementsByClassName("ga-profile-icon-text")[0].innerHTML.replace('\'', '')); // Montée
        var descente = parseFloat(document.getElementsByClassName("ga-profile-elevation-down")[0].getElementsByClassName("ga-profile-icon-text")[0].innerHTML.replace('\'', '')); // Descente
        var distance_string = (document.getElementsByClassName("ga-profile-slopeDist")[0].getElementsByClassName("ga-profile-icon-text")[0].innerHTML);
        var distance;
        if(distance_string.search('km')){
            distance = parseFloat(distance_string.replace('\'', '')); // Distance Horizontale
            console.log(distance + " km");
        }else{
            distance = parseFloat(distance_string.replace('\'', ''))/1000;
            console.log(distance + " mètres");
        }
        return montee / facteurMontee + descente / facteurDescente + distance
    }
    return "error"
}

function calcul_temps_marche(kme, vitesse, format="number")
{
    var output;
    switch(format){
        case "string" : 
            heures = Math.floor(kme/vitesse);
            minutes = Math.floor(kme%vitesse/vitesse*60);
            output = heures + "h et " + minutes + "min";
            break;
        case "number" : 
        default:
            output = Math.round(kme/vitesse*100)/100; 
            break;
    }
    return output;
}

function click_detect(){
    var kme = Math.round(getKme(ratio_montee, ratio_descente)*100)/100;
    var duree = calcul_temps_marche(kme, vitesse, "string");
    document.getElementById("kme-distance").innerHTML=kme;
    document.getElementById("kme-duree").innerHTML=duree;
}




/* Ancienne intégration du plugin
function init_new_char(){
// Agrandissement de l'espace des icônes (avec les information de montée, descente, etc.)
document.getElementsByClassName("ga-wrapper")[0].style.width = "2000px";
// HTML pour les icônes
var string = '<div><div class="fa fa-clock-o"></div><div class="ga-profile-icon-text ng-binding" style="width:150px;"><span translate="" class="ng-scope" style="width: 150px; padding-left:3px;" id="temps-kme">km-e : env. 4h 23min</span></div></div><div class="ga-profile-slopeDist" style="width:150px;" translate-attr="{title: \'profile_slope_distance\'}" title="Distance effective en effort"><div class="fa fa-resize-horizontal"></div><div class="ga-profile-icon-text ng-binding" id="distance-kme">17.66 km-e</div></div>'
//Ajout des icônes et des km-e dans l'icône
document.getElementsByClassName("ga-wrapper")[0].insertAdjacentHTML('beforeend', string);
}
*/







// Ajout des scripts dans l'HTML pour qu'ils s'exécute dans la page.
function integration_HTML(){
    var script = 'var vitesse=4,ratio_descente=300,ratio_montee=100;function update_vitesse(){vitesse=document.getElementById("vitesse_marche").value}function update_montee(){ratio_montee=document.getElementById("ratio-montee").value}function update_descente(){ratio_descente=document.getElementById("ratio-descente").value}function getKme(e=100,t=300){return"block"==document.getElementById("profile-popup").style.display?(montee=parseFloat(document.getElementsByClassName("ga-profile-elevation-up")[0].getElementsByClassName("ga-profile-icon-text")[0].innerHTML),descente=parseFloat(document.getElementsByClassName("ga-profile-elevation-down")[0].getElementsByClassName("ga-profile-icon-text")[0].innerHTML),distance=parseFloat(document.getElementsByClassName("ga-profile-slopeDist")[0].getElementsByClassName("ga-profile-icon-text")[0].innerHTML),montee/e+descente/t+distance):"error"}function calcul_temps_marche(e,t,n="number"){var a;switch(n){case"string":heures=Math.floor(e/t),minutes=Math.floor(e%t),a=heures+"h et "+minutes+"min";break;case"number":default:a=e/t}return a}function click_detect(){var e=getKme(ratio_montee,ratio_descente),t=calcul_temps_marche(e,vitesse,"string");document.getElementById("kme-distance").innerHTML=e,document.getElementById("kme-duree").innerHTML=t}document.addEventListener("click",click_detect);console.log("clic!");';
    var string = '<div id="kme-plugin" style="padding : 5px; background-color:#E6E6E6; border-radius:10px; z-index:10000; position:absolute; top:20px; right:50px;"> <div> Calcul de km-efforts : <span>Vitesse de marche : <input required type="number" step="0.5" min="0.5" value="4" id="vitesse_marche" style="width:50px;" onchange="update_vitesse()"/>km-e/h</span> <input required type="number" step="50" min="0" value="100" id="ratio-montee" style="width:50px;" onchange="update_montee()"/>m de montée=1 kme <input required type="number" step="50" min="0" value="300" id="ratio-descente" style="width:50px;" onchange="update_descente()"/>m de descente=1 kme </div><div> <span class="fa fa-resize-horizontal"></span> <span id="kme-distance">x</span> km-e <span class="fa fa-clock-o"></span> <span id="kme-duree">xh xmin</span></div></div>';
    document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeEnd', string); //Ajout du des information sur la page
    document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeEnd', '<script>' + script + '</script>') //Ajout des scripts dans l'HTML

}
integration_HTML();
/* HTML à minifier
<div id="kme-plugin" style="padding : 5px; background-color:#E6E6E6; border-radius:10px;  z-index:10000; position:absolute; top:20px; right:50px;">
    <div>
        Calcul de km-efforts : 
        <span>Vitesse de marche : 
            <input required type="number" step="0.5" min="0.5" value="4" id="vitesse_marche" style="width:50px;" onchange="update_vitesse()"/>km-e/h</span>        
        <input required type="number" step="50" min="0" value="100" id="ratio-montee" style="width:50px;" onchange="update_montee()"/>m de montée = 1 kme
        <input required type="number" step="50" min="0" value="300" id="ratio-descente" style="width:50px;" onchange="update_descente()"/>m de descente = 1 kme
    </div>
    <div>
        <span class="fa fa-resize-horizontal"></span>
        <span id="kme-distance">x</span> km-e
        <span class="fa fa-clock-o"></span>
        <span id="kme-duree">xh xmin</span>
    </div>
</div> 
*/
document.getElementById("vitesse_marche").addEventListener("change", update_vitesse);
document.getElementById("ratio-montee").addEventListener("change", update_montee);
document.getElementById("ratio-descente").addEventListener("change", update_descente);
document.addEventListener("mousemove", click_detect);