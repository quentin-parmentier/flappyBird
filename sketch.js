
var panSpeed = 5;
var gravity = 1;
var players = new Array();
var pipes = new Array();
var nextStep = 100;
var nb_pipes= 0;

///GEN PART
var POP = [];
var NB_POP = 200;
var TOP_SELECT = 15;
var MUTATION_RATE = 0.10;
var LEARNING = true;
var GENERATION = 1;
var STEP = 0;
const tab_reseau = [{size:3,fnc:""} , {size:2,fnc:"linear"} , {size:1,fnc:"linear"}]

function setup(){
    window.canvas = createCanvas(800,window.innerHeight);
    players = [];
    frameCount = 0;
    nb_pipes = 0;

    for(let i = 0; i < NB_POP; i++){
        players.push(new Player(50,canvas.height/2));
    }
    
    if(GENERATION == 1){
        createFirstGeneration(tab_reseau,NB_POP);
    }

    pipes = [];
    pipes.push(new Pipe());

}

function draw(){
    
    background(135,206,235);

    players.forEach((player,index) => {
     
        if(player.alive){

            player.update();
            let table_entry = player.distance(pipes); //Distance X / Distance Y
            let sortie = POP[index].calculerSorties(table_entry);

            if(sortie < 0){
                player.flap();
            }

            player.show();
        }
        
    });

    //Si tous morts ? On créer une nouvelle gen et on recommence
    if(numberOfAlive() == 0 && !LEARNING){
        fitness();
        creatingBabies(tab_reseau);
        setup();

    }else if(nb_pipes == 5 && LEARNING){
        fitness();
        console.log(POP)
        creatingBabies(tab_reseau);
        setup();

    }else{

        if(frameCount % nextStep == 0){
            pipes.push(new Pipe());
        }

        pipes.forEach((pipe,index) => {
            
            pipe.update();
            pipe.show();

            if((pipe.x + pipe.w + 20) < 60){
                pipes.splice(index, 1);
                nb_pipes++;
            }
        })
    }
}

function keyPressed(){

    switch (key) {
        case ' ':
            players.forEach(player => {
                player.flap();
            })
            break;
        
        case 'p' :
            LEARNING = !LEARNING;
            break;
        default:
            break;
    }
}

/// GEN PART

function createFirstGeneration(tab_reseau,nb_wanted){
    
    NB_POP = nb_wanted;

    for (let index = 0; index < nb_wanted; index++) {
        POP.push(new RNN(tab_reseau,[]));
    }
}

//On récupère les x meilleurs réseaux
function getTopPOP(){
    var listTop = new Array();
    POP.sort((a, b) => a.getScore < b.getScore ? 1 : -1); //Tri du plus Grand au plus Petit
    
    listTop = POP.slice(0,TOP_SELECT);
    return listTop;
}

//On accouple les différents réseaux en fonction de leurs poids et performance
function creatingBabies(tab_reseau){
    GENERATION ++;
    console.log("GENERATION : " + GENERATION);
    let topPOP = getTopPOP();

    topPOP.forEach(element => {

        element.setScore = 0;

    })
    
    let newGen = new Array();
    newGen = topPOP;

    for (let index = 0; index < NB_POP - TOP_SELECT; index++) {

        //On récupère deux parents
        let parentOne = topPOP[Math.floor(Math.random() * Math.floor(TOP_SELECT))];
        let parentTwo = topPOP[Math.floor(Math.random() * Math.floor(TOP_SELECT))];

        
        //On récupère la moitié des poids de l'un et de l'autre
        let wOne = parentOne.getW;
        let wTwo = parentTwo.getW;
        
        let newWeigths = [];

        wOne.slice(0,wOne.length/2).forEach(element => {
            newWeigths.push(element);
        });

        wTwo.slice(wTwo.length/2,wTwo.length).forEach(element => {
            newWeigths.push(element);
        });

        newWeigths = mutateBabies(newWeigths);

        newGen.push(new RNN(tab_reseau,newWeigths));
    }

    POP = newGen;

}

//Mutation du nouveau bébé
function mutateBabies(tab_weigths){
    
    let mutate_tab = new Array();
    tab_weigths.forEach(element => {
        if(Math.random() < MUTATION_RATE){
            mutate_tab.push(Math.random() * 2 - 1);
        }else{
            mutate_tab.push(element);
        }
    });
    return mutate_tab;
}

function fitness(){

    players.forEach((player,index) => {
        POP[index].setScore = player.score;
    });
}


function numberOfAlive(){
    count = 0;
    players.forEach(player => {
        if(player.alive == true){
            count++;
        }
    })

    return count;
}
