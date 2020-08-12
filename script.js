// ********************************************* //
 // ************ S E M E S T R E  1 ************* //
 // ******************************************** //


function toggleS0() {
    fetch('https://notes.iutmulhouse.uha.fr/get_sem_list.php', {
    method: 'POST',
    })
        .then(res => {
        return res.json()
        })
        .then(function(semestres) {
            fetch('https://notes.iutmulhouse.uha.fr/bulletin_JSON.php?sem_id='+`${semestres[3]}`, {
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
                        + `<p class="noteGAUCHE">Note : ` + data.ue[i].note.value
                        + " Max. : " + data.ue[i].note.max
                        + " Min. : " + data.ue[i].note.min
                        + "<br>Rang : " + data.ue[i].rang + "/" + data.ue[i].effectif
                        + "</p><br>"
                        ;
                        for (j = 0; j < data.ue[i].module.length; j++) {
                            ue +=
                            `<div id="BoxMATIERE" class="boxToggle" onclick="openClose(this, event)">`
                            + data.ue[i].module[j].titre
                            + `<p class="noteGAUCHE">Note : ` + data.ue[i].module[j].note.value
                            + " (" + data.ue[i].module[j].coefficient + ")"
                            + "<br>Moy. : " + data.ue[i].module[j].note.moy
                            + " Max. : " + data.ue[i].module[j].note.max
                            + " Min. : " + data.ue[i].module[j].note.min
                            + "<br>Rang : " + data.ue[i].module[j].rang.value + "/" + data.ue[i].module[j].effectif.value
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
        
                // AFFICHAGE BULLETIN S1
                
                    document.getElementById("bulletin").innerHTML = ue;
        
                    document.getElementById("infosSituation").innerHTML =
                    `${data.situation}`
        
        
                }) // fermeture .then
        });
    };

// ********************************************* //
 // ************ S E M E S T R E  2 ************* //
 // ******************************************** //
function toggleS1() {
    fetch('https://notes.iutmulhouse.uha.fr/get_sem_list.php', {
    method: 'POST',
    })
        .then(res => {
        return res.json()
        })
        .then(function(semestres) {
            fetch('https://notes.iutmulhouse.uha.fr/bulletin_JSON.php?sem_id='+`${semestres[2]}`, {
                method: 'POST',

            // document.getElementById("bulletin").innerHTML += `${semestres[1]}`            
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
                        + `<p class="noteGAUCHE">Note : ` + data.ue[i].note.value
                        + " Max. : " + data.ue[i].note.max
                        + " Min. : " + data.ue[i].note.min
                        + "<br>Rang : " + data.ue[i].rang + "/" + data.ue[i].effectif
                        + "</p><br>"
                        ;
                        for (j = 0; j < data.ue[i].module.length; j++) {
                            ue +=
                            `<div id="BoxMATIERE" class="boxToggle" onclick="openClose(this, event)">`
                            + data.ue[i].module[j].titre
                            + `<p class="noteGAUCHE">Note : ` + data.ue[i].module[j].note.value
                            + " (" + data.ue[i].module[j].coefficient + ")"
                            + "<br>Moy. : " + data.ue[i].module[j].note.moy
                            + " Max. : " + data.ue[i].module[j].note.max
                            + " Min. : " + data.ue[i].module[j].note.min
                            + "<br>Rang : " + data.ue[i].module[j].rang.value + "/" + data.ue[i].module[j].effectif.value
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

                // AFFICHAGE BULLETIN S2
                    
                    document.getElementById("bulletin").innerHTML = ue;
        
                    document.getElementById("infosSituation").innerHTML =
                    `${data.situation}`
        
        
                }) // fermeture .then
        });
    };


 // ********************************************* //
 // ************ S E M E S T R E  3 ************* //
 // ******************************************** //
function toggleS2() {
    fetch('https://notes.iutmulhouse.uha.fr/get_sem_list.php', {
    method: 'POST',
    })
        .then(res => {
        return res.json()
        })
        .then(function(semestres) {
            fetch('https://notes.iutmulhouse.uha.fr/bulletin_JSON.php?sem_id='+`${semestres[1]}`, {
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
                        + `<p class="noteGAUCHE">Note : ` + data.ue[i].note.value
                        + " Max. : " + data.ue[i].note.max
                        + " Min. : " + data.ue[i].note.min
                        + "<br>Rang : " + data.ue[i].rang + "/" + data.ue[i].effectif
                        + "</p><br>"
                        ;
                        for (j = 0; j < data.ue[i].module.length; j++) {
                            ue +=
                            `<div id="BoxMATIERE" class="boxToggle" onclick="openClose(this, event)">`
                            + data.ue[i].module[j].titre
                            + `<p class="noteGAUCHE">Note : ` + data.ue[i].module[j].note.value
                            + " (" + data.ue[i].module[j].coefficient + ")"
                            + "<br>Moy. : " + data.ue[i].module[j].note.moy
                            + " Max. : " + data.ue[i].module[j].note.max
                            + " Min. : " + data.ue[i].module[j].note.min
                            + "<br>Rang : " + data.ue[i].module[j].rang.value + "/" + data.ue[i].module[j].effectif.value
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


                // AFFICHAGE BULLETIN S3
        
                    document.getElementById("bulletin").innerHTML = ue;
        
                    document.getElementById("infosSituation").innerHTML =
                    `${data.situation}`
        
        
                }) // fermeture .then
        });
    };


 // ********************************************* //
 // ************ S E M E S T R E  4 ************* //
 // ******************************************** //
function toggleS3() {
    fetch('https://notes.iutmulhouse.uha.fr/get_sem_list.php', {
    method: 'POST',
    })
        .then(res => {
        return res.json()
        })
        .then(function(semestres) {
            fetch('https://notes.iutmulhouse.uha.fr/bulletin_JSON.php?sem_id='+`${semestres[0]}`, {
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
                    
                    document.getElementById("beforeBulletin").innerHTML += `<p style="text-align: right; font-size: 14px; margin-right: 20px;">Note/20 (Coefficient)</p>`;

                    document.getElementById("bulletin").innerHTML = ue;
        
                    document.getElementById("infosSituation").innerHTML =
                    `${data.situation}`

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
        
        
                }) // fermeture .then
        });
    };


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