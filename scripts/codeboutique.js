//DHAINI AMINE && DOURKI MOHAMED 2APG2

monPanier = new Array();

function test()
{
    alert("Hi");
}

function chargerArticles() 
{   
    var articles = document.getElementById("content");
    /*var ne = document.createElement("h2");
    ne.innerText = catalogue[0].nom;
    articles.appendChild(ne);*/
    /* var neImg = document.createElement("img");
    ne.setAttribute("src", catalogue[0].image);
    articles.appendChild(neImg);*/
    
    for(var i = 0; i < catalogue.length ; i++) 
    {
        var article = document.createElement("div");
        article.className = "article";
        article.id = i + "-article";

        /**********Affichage du nom de l'article *****************/
        var articleNom = document.createElement("h2");
        articleNom.className = "nom_art";
        articleNom.innerText = catalogue[i].nom;
        article.appendChild(articleNom);

        /**********Affichage de la photo de l'article *****************/
        var articleImg = document.createElement("img");
        articleImg.className = "img_art";
        articleImg.setAttribute("src", catalogue[i].image);
        article.appendChild(articleImg);

        /********Affichage de la description de l'article **********/
        var articleDesc = document.createElement("div");
        articleDesc.className = "desc_art";
        articleDesc.innerText = catalogue[i].desc;
        article.appendChild(articleDesc);

        /**********Affichage du prix de l'article *****************/
        var articlePrix = document.createElement("div");
        articlePrix.className = "prix_art";
        articlePrix.innerText = catalogue[i].prix + "DH";
        article.appendChild(articlePrix);

        /**********Affichage de la zone de commande *****************/
        var zoneCmd = document.createElement("div");
        zoneCmd.className = "cmd_art";
        var inputCmd  = document.createElement("input");
        inputCmd.className = "input_art";
        // On associe un id à chaque élément input
        inputCmd.id= i +"-qte";
        // l'élément inputCmd est de type number
        inputCmd.type ="number";
        // Par défaut la quantité affichée est égale à 0
        inputCmd.value = 0;
        // La quantité doit être comprise entre 0 et 5
        inputCmd.min = 0 ;
        inputCmd.max = 5 ;
        zoneCmd.appendChild(inputCmd);
        var bouton = document.createElement("button");
        bouton.className = "btn_art";
        //On associe un id au bouton
        bouton.id = i+"-cmd";

        bouton.onclick = function()
        {
            // On récupère la valeur de l'id du bouton de commande     
            var item = this.getAttribute("id");
            // On récupère la position de l'article dans le catalogue
            var pos = item.substring(0,1) ;
            // On ajoute cet article au panier
            ajouterAuPanier(pos);
        }

        zoneCmd.appendChild(bouton);
        article.appendChild(zoneCmd);
        articles.appendChild(article);
    }
}

function searchDansPanier(nom)
{
    for(var i = 0; i < monPanier.length ; i++)
    {
        if(monPanier[i].nom == nom)
        {
            return true;
        }           
    }
    return false;
}

function ajouterAuPanier(pos)
{  
    // A l'aide de searchDansPanier, on vérifie si l'article existe déjà dans le panier
    if (searchDansPanier(catalogue[pos].nom))
    {
       alert("L'article se trouve déja dans le panier ");
    }
    
    else
    {
        // On récupère l'id de la zone quantité associée à l'article qu'on veut commander 
        var ident = pos +"-qte"; 
        var qte = document.getElementById(pos + "-qte").value;
        
        if(qte > 0)
        {
           // On crée un objet pour y stocker le nom, le prix et la quantité de l'article commandé
           var articleCmd = {}; // creation d'un objet vide
           // On stocke le nom de l'article qui se trouve à la position pos dans le tableau catalogue.  
           articleCmd.nom = catalogue[pos].nom;    
           // Stockez le prix de l'article qui se trouve à la position pos  
           articleCmd.prix = catalogue[pos].prix; 
           // Stockez la quantité saisie 
           articleCmd.qte = qte; 
           // On calcule et on stocke le prix Hors Taxe  
           articleCmd.prixHt = articleCmd.prix* articleCmd.qte; 
           // à l'aide de la méthode push ajoutez l'objet articleCmd  dans le tableau monPanier 
           monPanier.push(articleCmd); 
           // à l'aide d'un alert affichez  au  client les informations de l'article commandé
           alert("Nom de l'article : " + articleCmd.nom + "\nPrix de l'article : " + articleCmd.prix + "\nQuantité : " + articleCmd.qte); 
        }

        else
        {
           alert("Choisissez une quantité > 0");
        }
    }
}

function stockerPanier(data)
{
    var panierJSON = {}; // On crée un objet vide
     
    // On met dans cet objet le tableau qu'on veut stocker
     
    panierJSON.monPanier = data;
     
    // On stocke en local à l'aide de l'objet localStorage et la méthode JSON.stringify
     
    localStorage.setItem("panierLocalStorage", JSON.stringify(panierJSON));
}

