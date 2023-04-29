/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function Reset(){
   // Facciamo scomparire il risultato
   const result =document.querySelector('#result');
   result.innerHTML='';
   for (const box of boxes){
    // Le risposte ritornano allo stato originale
    box.classList.remove('selected');
    box.classList.remove('notselected');
    const notchecked = box.querySelector('img.checkbox');
    notchecked.src = 'images/unchecked.png';
    // Rendiamo le risposte nuovamente selezionabili
    box.addEventListener('click', Choose);
   }
   selectedboxes = {};
}

function Result(){
    let title;
    let contents;
    // Se l’utente sceglie valori unici come risultato del quiz viene utilizzata la risposta alla prima domanda
    if ( selectedboxes['one'] === selectedboxes['two'] || selectedboxes['two'] === selectedboxes['three'] || 
         (selectedboxes['one'] !== selectedboxes['two'] && selectedboxes['two'] !== selectedboxes['three'])){
        title = RESULTS_MAP[selectedboxes['one']]['title'];
        contents= RESULTS_MAP[selectedboxes['one']]['contents'];
    }
    const h1=document.createElement('h1');
    h1.textContent=title;
    const description =document.createElement('p');
    description.textContent= contents;
    const reset= document.createElement('button');
    reset.textContent='Ricomincia il quiz';
    reset.addEventListener('click', Reset);

    const result= document.querySelector('#result');
    result.appendChild(h1);
    result.appendChild(description);
    result.appendChild(reset); 
}

function Insertion(questionId,chosenId){
    // Inserimento dell'elemento scelto dall'utente nella mappa dei box selezionati
    selectedboxes[questionId] = chosenId;
    
    // Controllo se l'utente ha risposto a tutte le domande e tolgo l'EventListener da ogni box in modo tale che non possano essere modificati
    if(Object.keys(selectedboxes).length === 3)
    {
        for (const box of boxes)
        {
            box.removeEventListener('click', Choose);
        }
        // Finito il test si visualizza il risultato
        Result();
    }
}

function Choose(event){

    const div = event.currentTarget;
    const image = div.querySelector('img.checkbox');
    const chosenId = div.dataset.choiceId;
    const questionId = div.dataset.questionId;

    for (const box of boxes)
    {
        // Facciamo in modo che si selezioni solo il div selezionato della specifica domanda e si opacizzino quelli non selezionati
        if (questionId === box.dataset.questionId && chosenId !== box.dataset.choiceId){
            box.classList.remove('selected');
            box.classList.add('notselected');
            const notchecked = box.querySelector('img.checkbox');
            notchecked.src = 'images/unchecked.png';
        } else if (questionId === box.dataset.questionId && chosenId === box.dataset.choiceId){
            image.src = 'images/checked.png';
            box.classList.remove('notselected');
            box.classList.add('selected');
        }
    }
    // Inseriamo le risposte all'interno della mappa 'selectedboxes'
    Insertion(questionId,chosenId);
}

let selectedboxes = {};

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes)
{
    box.addEventListener('click', Choose);
}
