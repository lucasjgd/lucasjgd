function majDescription(){
    bindedFields.push({name : "description"});
  }
  
function Convertir() {
    const csv = document.getElementById('mot').value;

    const texte = csv.trim(); // Suppression des espaces en trop
    const ligne = texte.split('\n');
    ligne.shift(); // Permet de supprimer la première ligne (LIEN,MOTS CLES TROUVE,REPETITION).

    const mindmap = {
        "displayName": "Veille technologique",
        "skills": [],
        "xOffset": 0,
        "yOffset": 0,
        "scale": 0.5
    };

    // Créer le nœud pour "Mot clés"
    const noeudVeille = {
        "icon": "",
        "id": 0,
        "name": "Veille technologique",
        "parents": [],
        "childs": [],
        "fillColor": "#007bff",
        "posX": 1000, 
        "posY": 100 
    };
    mindmap.skills.push(noeudVeille);

    let posX = 100; 
    const posY = 150; 
    const espace = 200; // Espacement entre les nœuds

    const liensRencontre = []; // Stocker quand le lien est rencontré

    // Créer les nœuds de site et les relier à "Mot clés"
    for (let i = 0; i < ligne.length; i++) {
        const [lien, motsCles, repetition] = ligne[i].split(',');
        const lienT = lien.trim();
        const mot = motsCles.trim();
        const repetitionTrim = repetition.trim();

        if (!liensRencontre.includes(lienT)) {
            liensRencontre.push(lienT); // Ajout du lien à la liste des liens rencontrés

            noeudLien = {
                "icon": "",
                "id": mindmap.skills.length,
                "name": lienT,
                "parents": [{ "id": 0 }], // Relier à "Mot clés"
                "childs": [],
                "fillColor": "#007bff",
                "posX": posX + 400, 
                "posY": posY + 100
            };
            mindmap.skills.push(noeudLien); // Ajouter à la liste de compétences dans mindmap le lien  
            posX += espace; // Augmenter la position X pour le prochain nœud 
        }
    
        // Créer le nœud pour les mots clés
        const noeudMot = {
            "icon": "",
            "id": mindmap.skills.length,
            "name": mot,
            "parents": [{ "id": noeudLien.id }],
            "childs": [],
            "fillColor": "#FFFF00",
            "posX": posX, 
            "posY": posY + 300 
        };
        mindmap.skills.push(noeudMot); // Ajouter à la liste de compétences dans mindmap le mot clé
    
        // Créer le nœud pour la répétition
        const noeudRepetition = {
            "icon": "",
            "id": mindmap.skills.length,
            "name": `Répétition: ${repetitionTrim}`,
            "parents": [{ "id": noeudMot.id }],
            "childs": [],
            "fillColor": "#008000",
            "posX": posX, 
            "posY": posY + 500
        };
        mindmap.skills.push(noeudRepetition); // Ajouter à la liste de compétences dans mindmap le nombre de répétitions
    
        posX += espace; // Pour qu'il y ait un espace entre chaque nœud
    }

    const json = document.getElementById('result');
    json.value = JSON.stringify(mindmap, null, 2); // Convertir une valeur JavaScript en chaîne JSON
}
