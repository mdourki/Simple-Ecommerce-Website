//DHAINI AMINE && DOURKI MOHAMED 2APG2

tabPanier = new Array();
var monTableau;
var panier;


function chargerPanier() { 
    // On récupère  l'objet stocké en local  
    panierLocal = JSON.parse(localStorage.getItem("panierLocalStorage")); 
    // On récupère le panier stocké dans cet objet qu'on stocke ensuite dans tabPanier 
    tabPanier = panierLocal.monPanier; 
    totalHt = 0; // cette variable servira à stocker le montant HT de la commande
    monTableau = document.getElementById("monpanier");
    // On parcoure le tableau tabPanier qui stocke les articles du panier 
    for( var i = 0; i < tabPanier.length ; i++) 
    {
        var ligne = document.createElement("tr");
        ligne.id = i +"ligne"; 
        var cellule1 = document.createElement("td"); 
        var imgElem = document.createElement("img"); 
        imgElem.setAttribute("src", "../images/poub.jpg");
        imgElem.className = "imgpoubelle";
        imgElem.id = i+"supp"; 
        
        /* on associe à l'image le gestionnaire d'évènement onclick, ainsi le client aura la possibilité de 
        supprimer du panier les articles qu'il ne désire plus acheter */ 
        imgElem.onclick = function() 
        { 
            var  reponse = confirm('Vous êtes sûr de supprimer cet article ?'); 
            if(reponse == true) 
            {
                var item = this.getAttribute("id"); 
                var pos = item.substring(0,1,1); 
                supprimerDuPanier(pos); 
            }
        }
        cellule1.appendChild(imgElem);
        ligne.appendChild(cellule1); 
        
        /* Nous allons maintenans créer les autres cellules nécessaires pour l'affichage des informations 
        des articles du panier (nom,prix,quantité, prixHT) */

        // on parcoure le panier 
        for(var prop1 in tabPanier[i]) 
        { 
            var cellule2 = document.createElement("td");  
            cellule2.innerText = tabPanier[i][prop1]; 
            ligne.appendChild(cellule2); 
        }
            
        /* On calcule maintenant le montant HT de la commande */
        totalHt = totalHt + tabPanier[i].prix * tabPanier[i].qte; /* !!!!!!!!!! */
        monTableau.appendChild(ligne);
        //console.log(monTableau.second);
    }

    /* On affiche  maintenant le montant HT de la commande dans un paragraphe  qu'on va insérer 
    comme enfant de l'élément <div id="montant" >. Cet élément se trouve déja dans la page 
    "panier.html" */

    total = document.createElement("p"); 
    total.className = "total"; 
    total.innerText = "Total :" + totalHt + "Dh";
    total.id = "totalht"; 
    document.getElementById("montant").appendChild(total);
}

function supprimerDuPanier(pos) 
{ 
    // On recalcule le montant HT de la commande
    totalHt = totalHt - tabPanier[pos].prixHt;
    var total = document.getElementById("totalht");
    monPanier.splice(pos,1);
    // On récupère la ligne qu'on veut supprimer 
    var maLigne = document.getElementById(pos + "ligne"); 
    // A l'aide de removeChild, supprimer l'élément "maLigne" de son parent "tableau" 
    monTableau.removeChild(maLigne);
    total.innerText = "Total :" + totalHt + "Dh"; 
    // On réinitialise le panier 
    panier.monPanier = tabPanier; 
    // On écrase le panier stocké en local 
    localStorage.setItem("panierLocalStorage",JSON.stringify(panier)); 
    // On recharge la page pour que les modifications soient prises en compte  
    window.location.reload(); 
}