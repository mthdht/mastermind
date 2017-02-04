/*
 * Mastermind Jeu de plateau
 *
 * author: Dehondt Matthieu
 *
 */



/***************************************************
 * variable de plateau
 * - ligne courante,
 * - pion de combinaison courant,
 * - pion de resultat courant,
 * - combinaison
 * - combinaison a trouver
 ****************************************************/
var currentLine;
var currentPawnCombinaison ;
var currentPawnResult;
var combinaison;
var combinaisonToFind;
var playerScore;
var joueur;
var message = "Appuyez sur play pour jouer ";
document.getElementById('message').innerHTML = message;


/* *************************************************************************
 * fonction d' initialisation
 **************************************************************************/

//function d'initialisation des variable
function initialize() {
    currentLine = 9;
    currentPawnCombinaison = 0;
    currentPawnResult = 0;
    combinaison = "";
    combinaisonToFind = "";
    playerScore = 10;
    console.log("initialize good, variable initialized");
    message = "il vous reste " + (currentLine +1) + " tentatives";
    document.getElementById('message').innerHTML = message;
}

function play() {
    initialize();
    var pions = document.querySelectorAll('.pion');
    for (var pion of pions) {
	pion.style.backgroundColor = 'transparent';
	pion.style.border = '1px solid #888562';
    }

    var pionResult = document.querySelectorAll('.pion-resultat');
    for (var result of pionResult) {
	result.style.backgroundColor = 'transparent';
	result.style.border = '1px solid #888562';
    }
    genereCombinaison();
    console.log(combinaisonToFind);
    joueur = prompt('Veuillez saisir votre nom');
    document.querySelectorAll('.joueur')[0].innerHTML += joueur;

    //add event listener
    document.querySelectorAll(".purple")[0].addEventListener('click', function(){ drawColor('#962d3e'); });
    document.querySelectorAll(".blue")[0].addEventListener('click', function(){ drawColor('#004358'); });
    document.querySelectorAll(".green")[0].addEventListener('click', function(){ drawColor('#477725'); });
    document.querySelectorAll(".yellow")[0].addEventListener('click', function(){ drawColor('#eb7f00'); });
    document.querySelectorAll(".orange")[0].addEventListener('click', function(){ drawColor('#b64926'); });
    document.querySelectorAll(".red")[0].addEventListener('click', function(){ drawColor('#8e001c'); });
    document.querySelectorAll(".undo")[0].addEventListener('click', undo);
    document.querySelectorAll(".submit")[0].addEventListener('click', submit);
}




/**************************************************
 * fonction pour fonctionnement plateau
 ****************************************************/

/* gerenere une combinaison a trouver*/
function genereCombinaison() {
    combinaisonToFind = "";
    for (var i = 0; i < 4; i++) {
	combinaisonToFind += Math.floor((Math.random() * 6));
    }
}


/* function pour transformer couleur en chiffre pour combinaison*/
function whichColor(color) {
    var num;
    switch (color) {
	case "#962d3e":
	    num = 0;
	    break;
	case "#004358":
	    num = 1;
	    break;
	case "#477725":
	    num = 2;
	    break;
	case "#eb7f00":
	    num = 3;
	    break;
	case "#b64926":
	    num = 4;
	    break;
	case "#8e001c":
	    num = 5;
	    break;
    }

    return num;
}


/*  function pour dessiner cercle de combinaison*/

function drawColor(color) {
    //verifie ligne non complete
    if (currentPawnCombinaison == 4 ) {
	console.log("combinaison line over");
    }
    else {
	//selectionne pion courant
	var pawn = document.querySelectorAll("div.pion-" + currentPawnCombinaison)[currentLine];

	//change style
	pawn.style.backgroundColor = color;
	pawn.style.border = 'none';

	// complete combinaison
	combinaison += whichColor(color);
	currentPawnCombinaison++;

	// log les valeur de varaible
	console.log(currentPawnCombinaison);
	console.log(combinaison);
    }
}

/*  function pour dessiner cercle de reslultat*/
function drawResult(color) {
    if (currentPawnResult == 4) {
	console.log("result line over")
    }
    else {
	//selectionne le bon pion courant
	var pawnResult = document.querySelectorAll("div.pion-resultat-" + currentPawnResult)[currentLine];

	//change style
	pawnResult.style.backgroundColor = color;
	pawnResult.style.border = 'none';

	//chaange currentPawnResult
	currentPawnResult++;

	// log les valeur de varaible
	console.log(currentPawnResult);
    }
}


/*  fonction pour defaire un choix (undo)*/
function undo() {
    //verifife que l'on peut defaire un choix
    if (currentPawnCombinaison == 0) {
	console.log("line not started");
    }
    else {
	var pawn = document.querySelectorAll("div.pion-" + (currentPawnCombinaison -1))[currentLine];
	console.log(pawn);
	pawn.style.backgroundColor = 'transparent';
	pawn.style.border = '1px solid #888562';
	currentPawnCombinaison--;
	combinaison = combinaison.substring(0, combinaison.length -1);
	console.log(combinaison);
	console.log(currentPawnCombinaison);
    }
}

/*  function pour soumettre une combinaison*/
function submit() {
    if (currentPawnCombinaison != 4) {
	console.log("line not over");
    }
    else {
	var result = compare(combinaison, combinaisonToFind);
	for (var i = 0; i < result[0]; i++) {
	    drawResult('black');
	}
	for (var i = 0; i < result[1]; i++) {
	    drawResult('#bfbfbf');
	}
	currentLine--;
	playerScore--;
	document.querySelectorAll('.player-score')[0].innerHTML = "Score: " + playerScore;

	if (combinaisonToFind == combinaison || currentLine == -1) {
	    document.querySelectorAll(".purple")[0].removeEventListener('click', drawColor);
	    document.querySelectorAll(".blue")[0].removeEventListener('click', function(){ drawColor('#004358'); });
	    document.querySelectorAll(".green")[0].removeEventListener('click', function(){ drawColor('#477725'); });
	    document.querySelectorAll(".yellow")[0].removeEventListener('click', function(){ drawColor('#eb7f00'); });
	    document.querySelectorAll(".orange")[0].removeEventListener('click', function(){ drawColor('#b64926'); });
	    document.querySelectorAll(".red")[0].removeEventListener('click', function(){ drawColor('#8e001c'); });
	    document.querySelectorAll(".undo")[0].removeEventListener('click', undo);
	    document.querySelectorAll(".submit")[0].removeEventListener('click', submit);
	    message = "Bravo, vous avez " + playerScore + " points !";
	    document.getElementById('message').innerHTML = message;
	}
	else {
	    currentPawnCombinaison = 0;
	    currentPawnResult = 0;
	    message = "il reste " + (currentLine + 1) + " tentatives !";
	    document.getElementById('message').innerHTML = message;
	    combinaison = "";
	}
    }
}

/* test les combinaison, renvoi le nombre de pion mal placé et bien placé*/
function compare(combinaison, combinaisonToFind) {
    var resultatBienPlace = 0;
    var resultatMalPlace = 0;
    for (var i = 0; i < 4; i++) {
	if (combinaison.charAt(i) == combinaisonToFind.charAt(i)) {
	    console.log(i, combinaison.charAt(i), combinaisonToFind.charAt(i));
	    var tab1 = combinaison.split("");
	    var tab2 = combinaisonToFind.split("");
	    tab1[i] = 'a';
	    tab2[i] = 'x';
	    combinaison = tab1.join("");
	    combinaisonToFind = tab2.join("");
	    console.log(combinaison,combinaisonToFind);
	    resultatBienPlace++
	}
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
	    if (combinaison.charAt(i) == combinaisonToFind.charAt(j)) {
		console.log(i, combinaison.charAt(i), combinaisonToFind.charAt(j));
		tab1 = combinaison.split("");
		tab2 = combinaisonToFind.split("");
		tab1[i] = 'b';
		tab2[j] = 'y';
		combinaison = tab1.join("");
		combinaisonToFind = tab2.join("");
		console.log(combinaison,combinaisonToFind);
		resultatMalPlace++;
		break;
	    }
        }
    }
    return [resultatBienPlace, resultatMalPlace];
}
