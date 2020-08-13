function toggleSem() { 

    var semBtn = document.getElementsByName('semBtn');
    var n;
    var couleur = ["rouge","jaune","vert","bleu"];
    
    fetch('https://notes.iutmulhouse.uha.fr/get_sem_list.php', {
        method: 'POST',
        })
            .then(res => {
            return res.json()
            })
            .then(function(semestres) {
    
            semestres.reverse();
    
            var i; 
            var sem = "";
            var nbSem = semestres.length
    
            // document.getElementById("semestre_0" + nbSem).checked = true;
    
            
    
                switch (nbSem) {
                    case 1:
                        document.getElementById("semestre_02").disabled = true;
                        document.getElementById("semestre_03").disabled = true;
                        document.getElementById("semestre_04").disabled = true;
                    break;
                    case 2:
                        document.getElementById("semestre_03").disabled = true;
                        document.getElementById("semestre_04").disabled = true;
                    break;
                    case 3:
                        document.getElementById("semestre_04").disabled = true;
                    break;
                    default:
                        document.getElementById("semestre_02").disabled = false;
                        document.getElementById("semestre_02").disabled = false;
                        document.getElementById("semestre_03").disabled = false;
                        document.getElementById("semestre_04").disabled = false;
                }
    
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
                    
                        for (i = 0; i < data.ue.length; i++) {
                            ue +=
                            `<div class="BoxUE" id="BoxUE" onclick="openClose(this)">`
                            + data.ue[i].acronyme
                            + " " + data.ue[i].titre
                            + `<p class="noteGAUCHE"><b>Note :</b> ` + data.ue[i].note.value
                            + " <b>Max. :</b> " + data.ue[i].note.max
                            + " <b>Min. :</b> " + data.ue[i].note.min
                            + "<br><b>Rang :</b> " + data.ue[i].rang + "/" + data.ue[i].effectif
                            + "</p><br>"
                            ;
                            for (j = 0; j < data.ue[i].module.length; j++) {
                                ue +=
                                `<div id="BoxMATIERE" class="boxToggle" onclick="openClose(this, event)">`
                                + data.ue[i].module[j].titre
                                + `<p class="noteGAUCHE"><b>Note :</b> ` + data.ue[i].module[j].note.value
                                + " (" + data.ue[i].module[j].coefficient + ")"
                                + "<br><b>Moy. :</b> " + data.ue[i].module[j].note.moy
                                + " <b>Max. :</b> " + data.ue[i].module[j].note.max
                                + " <b>Min. :</b> " + data.ue[i].module[j].note.min
                                + "<br><b>Rang :</b> " + data.ue[i].module[j].rang.value + "/" + data.ue[i].module[j].effectif.value
                                + "</p>";
                                for (k = 0; k < data.ue[i].module[j].evaluation.length; k++) {
                                    ue +=
                                    `<div class="noteMATIERE boxToggle" id="noteMATIERE" onclick="openClose(this, event)">`
                                    + data.ue[i].module[j].evaluation[k].description
                                    + `<p class="noteGAUCHE">`
                                    + data.ue[i].module[j].evaluation[k].note
                                    + " (" + data.ue[i].module[j].evaluation[k].coefficient + ")"
                                    + "</p></div>";
                                }
                                ue += `</div>`
                            }
                            ue += `</div>`
                        }
            
            
            
            // AFFICHAGE DES INFORMATIONS ÉTUDIANTES            
            
                        document.getElementById("infosEtudiant").innerHTML =
            
                        `
                        ${data.etudiant.sexe} 
                        ${data.etudiant.nom} 
                        ${data.etudiant.prenom} <br>
                        Code INE : ${data.etudiant.code_ine} - 
                        N°Etudiant : ${data.etudiant.code_nip} <br> 
                         <br><br>
                        `;
    
            // AFFICHAGE DU BULLETIN S4
                        document.getElementById("bulletin").innerHTML = ue;
    
    
            // AFFICHAGE DES INFORMATIONS "STATIQUES"
                        
                        document.getElementById("beforeBulletin").innerHTML = `<p style="text-align: right; font-size: 14px; margin-right: 20px;">Note/20 (Coefficient)</p>`;
    
            
                        document.getElementById("infosSituation").innerHTML =
                        `${data.situation}`
    
    
                        //création de la date au format dd/mm/yyyy
                        var date = new Date();
                        var options = {
                            year: "numeric",
                            month: "2-digit",
                            day: "numeric"
                        };
    
                
                        document.getElementById("faitA").innerHTML =
                        `Fait à Mulhouse, le ` + date.toLocaleDateString("fr", options)
                        + `<br>Le chef de département MMI
                        <br><br>Michel GREVILLOT`
            
    
                        // var button = document.getElementsByClassName(".button");
                        // button.classList.toggle("buttonToggle");
    
                    }) // fermeture .then data
            }; // fermeture if
    
    
            }  // fermeture for
        }) // fermeture .then semestres
    } // fermeture function

    

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