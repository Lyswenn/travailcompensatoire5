// ********************************************* //
// ******** I N F O S  E T U D I A N T ******** //
// ******************************************** //

function afficheInfos() {
    fetch('https://notes.iutmulhouse.uha.fr/get_sem_list.php', {
        method: 'POST',
        })
            .then(res => {
            return res.json()
            })
            .then(function(semestres) {
                semestres.reverse();
                last = semestres[semestres.length-1];
                fetch('https://notes.iutmulhouse.uha.fr/bulletin_JSON.php?sem_id='+ last, {
                    method: 'POST',       
            })
            .then(res => {
                return res.json()
                })
                .then(function(data) {
                

    // AFFICHAGE DES INFORMATIONS ÉTUDIANTES
            
                
                document.querySelector("#infosEtudiant").innerHTML =
                
                `<div>
                ${data.etudiant.sexe} 
                ${data.etudiant.nom} 
                ${data.etudiant.prenom} </div><br>
                Code INE : ${data.etudiant.code_ine} <br> 
                N°Etudiant : ${data.etudiant.code_nip} <br> 
                <br><br>
                `;
                })
})
}

// ********************************************* //
// ************* B U L L E T I N ************* //
// ******************************************** //

var semBtn = document.getElementsByName('semBtn');

function toggleSem() { 

    var n;
    
    fetch('https://notes.iutmulhouse.uha.fr/get_sem_list.php', {        
        method: 'POST',
        })
            .then(res => {
            return res.json()
            })
            .then(function(semestres) {
    
                semestres.reverse();                
                var nbSem = semestres.length;
    
            // ↓ ne fonctionne pas, rend impossible de cocher une autre case que la dernière, à revoir ↓

            // document.querySelector("semestre_0" + nbSem).checked = true;
            
                    
            // ↓ devrait pouvoir permettre de rendre les boutons de semestre inutilisables si le semestre n'existe pas encore ↓
    
                switch (nbSem) {
                    case 1:
                        document.querySelector("#semestre_02").disabled = true;
                        document.querySelector("#semestre_03").disabled = true;
                        document.querySelector("#semestre_04").disabled = true;
                    break;
                    case 2:
                        document.querySelector("#semestre_03").disabled = true;
                        document.querySelector("#semestre_04").disabled = true;
                    break;
                    case 3:
                        document.querySelector("#semestre_04").disabled = true;
                    break;
                    default:
                        document.querySelector("#semestre_02").disabled = false;
                        document.querySelector("#semestre_02").disabled = false;
                        document.querySelector("#semestre_03").disabled = false;
                        document.querySelector("#semestre_04").disabled = false;
                }
    
            

            // ↓ permet de vérifier quel bouton radio a été sélectionné ↓

                for (n = 0 ; n < semBtn.length ; n ++) {
                    if(semBtn[n].checked) {
                        fetch('https://notes.iutmulhouse.uha.fr/bulletin_JSON.php?sem_id='+semestres[n], {
                            method: 'POST',       
                        })
                        .then(res => {
                            return res.json()
                            })
                            .then(function(data) {
                
                                var i;
                                var j;
                                var k;
                                var ue = "";           
                                
                                
                                    

                                
            // ↓ boucles pour les UE, modules et évaluations (dans l'ordre) ↓
                                
                                    for (i = 0; i < data.ue.length; i++) {
                                        ue +=
                                        `<div class="boxUE" onclick="openClose(this)">
                                        <p class="nomUE">`
                                        + data.ue[i].acronyme
                                        + " " + data.ue[i].titre
                                        + `</p><div class="noteGAUCHE">` + data.ue[i].note.value                                        
                                        + " (" + data.ue[i].rang + "/" + data.ue[i].effectif + ")<br>"
                                        + ` <div id="moyennes")><b>Min. :</b> ` + data.ue[i].note.min
                                        + " | <b>Max. :</b> " + data.ue[i].note.max
                                        + "</div></div><br>"
                                        ;
                                        for (j = 0; j < data.ue[i].module.length; j++) {
                                            ue +=
                                            `<div class="boxToggle boxModule box" onclick="openClose(this, event)"><p class="nomModule">`
                                            + data.ue[i].module[j].titre
                                            + ` <p class="coefficient">(Coefficient : ` + data.ue[i].module[j].coefficient + ")</p>"
                                            + `<div class="noteGAUCHE">` + data.ue[i].module[j].note.value
                                            + " (" + data.ue[i].module[j].rang.value + "/" + data.ue[i].module[j].effectif.value
                                            + `)<div id="moyennes")><b>Min. : </b>` + data.ue[i].module[j].note.min
                                            + " | <b>Moy. : </b>" + data.ue[i].module[j].note.moy
                                            + " | <b>Max. : </b>" + data.ue[i].module[j].note.max
                                            + "</div></div>";
                                            for (k = 0; k < data.ue[i].module[j].evaluation.length; k++) {
                                                ue +=
                                                `<div class="boxEval boxToggle box" onclick="openClose(this, event)">`
                                                + data.ue[i].module[j].evaluation[k].description
                                                +  ` <p class="coefficient"> (Coef.: ` + data.ue[i].module[j].evaluation[k].coefficient + `)`  
                                                + `<p class="noteGAUCHE">`
                                                + data.ue[i].module[j].evaluation[k].note
                                                + "</p></div>";
                                            }   // fermeture boucle for évaluations
                                            ue += `</div>`
                                        }       // fermeture boucle for module
                                        ue += `</div>`
                                    }           // fermeture boucle for UE

                                    

                                    if (localStorage.getItem('bulletin') != data) {
                                        console.log("Nouvelles notes.");
                                    } else {
                                        console.log("Pas de nouvelles notes.");
                                    }

                                    localStorage.setItem('bulletin', data);

    // AFFICHAGE DU BULLETIN

                            document.querySelector("#bulletin").innerHTML = ue;

                            document.querySelector("#moyTotales").innerHTML =
                            `<b>Note :</b> ${data.note.value}<br>
                            <p><b>Min.:</b> ${data.note.min} | 
                            <b>Moy.:</b> ${data.note.moy} | 
                            <b>Max.:</b> ${data.note.max}<br><br>
                            ${data.situation}</p>`

                            document.querySelector(".boutons").innerHTML =
                            `<button type="input" name="open" onclick="openAll('box')">Tout ouvrir</button>
                            <button type="input" name="close" onclick="closeAll('box')">Tout fermer</button>`

                            document.querySelector("#beforeBulletin").innerHTML = `<p style="text-align: right; font-size: 14px; margin-right: 20px;">Note/20 (Rang)</p>`;
                            
                            var date = new Date();
                            var options = {
                            year: "numeric",
                            month: "2-digit",
                            day: "numeric"
                            };
                        
                            document.querySelector("#finBulletin").innerHTML =
                            `* La moyenne des UE est modulée par un malus de 0,02 point par heure d'absence injustifiée.
                            <div class="infosMalus">
                                En cas de contestation de la présente décision, vous pouvez former :
                                <br>- soit un <b>recours gracieux</b> auprès de la Présidente de l'Université sans condition de délai,
                                <br>- soit un <b>recours contentieux</b> auprès du tribunal administratif de Strasbourg dans un délai de deux mois à compter de la notification de la présente décision
                            </div>
                            <p id="faitA"</div>Fait à Mulhouse, le ` + date.toLocaleDateString("fr", options) + `</p>`;
                            // + `<br>Le chef de département MMI
                            // <br><br>Michel GREVILLOT`

                
                            })          // fermeture .then data
                    };                  // fermeture if
                }                       // fermeture for
            })                          // fermeture .then semestres
}                                       // fermeture function




// ********************************************* //
// ************ O P E N & C L O S E ************ //
// ******************************************** //

function openClose(obj,event) {
    var box = obj.childNodes  // Donne la liste d'enfant de l'element selectionné avec des [NUMBER]
    for (var i=0; i<box.length; i++) { // selectionne tous les element enfants (pour enlever la selection [NUMBER])
        if (box[i].nodeName.toLowerCase() == 'div') {  // ligne magique qui selectionne juste les div dans les enfants, permet de faire difference entre les notes (en <p>) et les bulles (en <div>).
            box[i].classList.toggle("boxToggle");  // le toggle qui fait tout fonctionner !
        }
    }
    event.stopPropagation();
}



function openAll() {

    var i;
    var box = document.querySelectorAll(".box");

    for (i = 0 ; i < box.length ; i ++) {
        box[i].classList.remove("boxToggle");
    }
}

function closeAll() {

    var i;
    var box = document.querySelectorAll(".box");
    
    for (i = 0 ; box.length ; i ++) {
        box[i].classList.add("boxToggle");
    }

}