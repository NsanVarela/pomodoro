// Attribution d'éléments stables aux variables

const mainHeader = document.querySelector("#main-header"),
    description = document.querySelector("#description"),
    countdownContainer = document.querySelector("#countdown-container"),
    cancelContainer = document.querySelector("#cancel-container"),
    cancelButton = document.querySelector("#cancel-button"),
    videoContainer = document.querySelector("#video-container"),
    selectionContainer = document.querySelector("#selection-container"),
    instruction = document.querySelector("#instruction"),
    timeButtonsContainer = document.querySelector("#time-buttons-container"),
    takeBreak = document.querySelector(".take-break");

// Ajouter un event listener à selectionContainer
selectionContainer.addEventListener("click", renderCountDown);

// Écrire la logique pour afficher le compte à rebours sur la page
function renderCountDown(evt) {

    /* Si l'élément cliqué à l'intérieur de selectionContainer est un élément qui peut régler l'heure,
    alors on cache les éléments inutiles sur la page, et on lance le compte à rebours, en transmettant sous forme
    d'entier la minute choisie par l'utilisateur. */

    if (evt.target.classList.contains("set-time")) {
        videoContainer.innerHTML = "";

        hideElements(description, selectionContainer, videoContainer);
        unhideElements(countdownContainer, cancelContainer);

        const minutesChosen = parseFloat(evt.target.id);

        startCountdown(minutesChosen);
    }
}

// Fonction d'aide pour cacher les éléments que vous passez; utilisez les paramètres de repos pour prendre un nombre inconnu d'arguments.
function hideElements(...elems) {
    // Définir chaque élément comme étant caché
    elems.forEach((elem) => (elem.hidden = true));
}

// Fonction d'aide pour démasquer les éléments que vous passez dans le formulaire.
function unhideElements(...elems) {
    elems.forEach((elem) => (elem.hidden = false));
}

function startCountdown(minutesChosen) {
    // Calculer le temps total en secondes, la valeur d'affichage des secondes et la valeur d'affichage des minutes.
    let totalTimeInSeconds = minutesChosen * 60;

    // Réglez le compte à rebours pour qu'il s'exécute toutes les 1000 ms (1 seconde). Exécuter cette fonction chaque seconde.
    let setCountDownInterval = setInterval(function () {
        let displaySeconds = totalTimeInSeconds % 60;
        let displayMinutes = Math.floor(totalTimeInSeconds / 60);

        // Ajouter un zéro devant displaySeconds s'il s'agit d'un chiffre unique.
        displaySeconds = displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;

        // Ajoutez le temps au conteneur du compte à rebours
        countdownContainer.innerHTML = `${displayMinutes} : ${displaySeconds}`;

        // Décrémente le totalTimeInSeconds
        totalTimeInSeconds--;

        // Si le temps atteint 0, le compte à rebours s'arrête et la vidéo est rendue.
        if (totalTimeInSeconds < 0) {
            clearInterval(setCountDownInterval);
            renderVideo();
        }

        // Si le bouton d'annulation est cliqué, le rendu revient au début.
        cancelButton.addEventListener("click", (evt) => {
            clearInterval(setCountDownInterval);
            renderBackToStart();
        });
    }, 1000);
}

// Annule la séance de mise au point
function renderBackToStart() {
    hideElements(countdownContainer, cancelContainer, videoContainer, takeBreak);
    unhideElements(description, selectionContainer, timeButtonsContainer);
}

function renderVideo() {
    hideElements(countdownContainer, cancelContainer);
    unhideElements(videoContainer, selectionContainer, takeBreak);

    // Prenez l'URL d'une vidéo aléatoire et affichez-la en mode lecture automatique.
    const songURLs = [
        "https://www.youtube.com/embed/4Z-P7qOFcDk?rel=0&start=137&autoplay=1",
        "https://www.youtube.com/embed/KybAvaM3b90?rel=0&start=8&autoplay=1",
        "https://www.youtube.com/embed/W5HIisdWzvY?rel=0&start=39&autoplay=1",
        "https://www.youtube.com/embed/-H2Bjyw6AS8?rel=0&start=93&autoplay=1",
    ];

    const randomIdx = Math.floor(Math.random() * songURLs.length);

    videoContainer.innerHTML = `
    <iframe width="560" height="315" src=${songURLs[randomIdx]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
}
