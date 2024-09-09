let character_position; //2D array with character's coordinates (pair of ints)
let character_speed; //2D array with character's speed in x and y directions respectively (pair of ints)
let character_img_front, character_img_back, character_img_left, character_img_right; //variables for 4 sides of the character sprite image asset
let daisy, tulip, grass1, grass2, grass3, grass4, grass5, grass6; //variables for the foliage assets
let nav_sign; //variable for navigation sign asset
let education_hat; //variable for graduation hat asset
let coding_laptop; //variable for laptop asset
let camera; //variable for camera asset
let backgroundimg; //variable for background image
let daisies, grasses, tulips; //array of foliage coordinates
let win_width = window.innerWidth;
let win_height = window.innerHeight;
let character_size = [150, 150];
let current_character_facing;
let tile_size = 50;
let tile_color = [];
let bg_resolution = [win_width/tile_size, win_height/tile_size];
let numtiles = bg_resolution[0]*bg_resolution[1];
let canvas;
let worldsize = [2400, 2400];


function preload() {
    loadAssets();
    for (let i = 0; i < bg_resolution[0]; i++) {
        for (let j = 0; j < bg_resolution[1]; j++) {
            tile_color[j] = random(170, 210);
        }
    }   
}

function setup() {
    canvas = createCanvas(800, 800);
    //canvas.parent('main');
    color(0, 0, 0);
    stroke(0, 0, 0);
    imageMode(CENTER);
    translate(width/2, height/2);
    character_position = [width/2, height/2];
    character_speed = [0, 0];
    resizeAssets();
    current_character_facing = character_img_front;
}

function draw() {
    determineDirection();
    image(backgroundimg, character_position[0], character_position[1]);
    renderFoliage();
    image(current_character_facing, width/2, height/2);
    checkForMovement();
    updatePosition();
    determineDirection();
    checkBounds();
}

function renderFoliage() {
    image(daisy, character_position[0]-200, character_position[1]-200);
    image(daisy, character_position[0]+180, character_position[1]+50);
    image(tulip, character_position[0]-250, character_position[1]+125);
    for (let daisypos of daisies) {
        image(daisy, character_position[0]+daisypos[0], character_position[1]+daisypos[1]);
    }
    for (let tulippos of tulips) {
        image(tulip, character_position[0]+tulippos[0], character_position[1]+tulippos[1]);
    }
    for (let grasspos of grasses) {
        image(grasspos[0], character_position[0]+grasspos[1], character_position[1]+grasspos[2]);
    }
    
    
}

function checkForMovement() {
    if (keyIsPressed) {
        print(character_position);
        if (keyCode === UP_ARROW) {
            character_speed[1] = 5;
        } else if (keyCode === DOWN_ARROW) {
            character_speed[1] = -5;
        } else if (keyCode === LEFT_ARROW) {
            character_speed[0] = 5;
        } else if (keyCode === RIGHT_ARROW) {
            character_speed[0] = -5;
        } 
    }
    if (!keyIsPressed) {
        character_speed[0] = 0;
        character_speed[1] = 0;
    }
}

function resizeAssets(){
    character_img_front.resize(character_size[0], character_size[1]);
    character_img_back.resize(character_size[0], character_size[1]);
    character_img_left.resize(character_size[0], character_size[1]);
    character_img_right.resize(character_size[0], character_size[1]);
    daisy.resize(60,50);
    tulip.resize(80, 90);
    for (let grass of grasses) {
        grass[0].resize(50, 50);
    }
    backgroundimg.resize(worldsize[0], worldsize[1]);

}

function loadAssets() {
    let daisies_amount = 10;
    let tulips_amount = 10;
    let grass_amount = 30;
    daisy_assets = [];
    let tulip_assets = [];
    let grass_assets = [];
    backgroundimg = loadImage ('./Assets/cvrpgbackground.png');
    character_img_front = loadImage ('./Assets/thorstenfront.png');
    character_img_back = loadImage ('./Assets/thorstenback.png');
    character_img_left = loadImage ('./Assets/thorstenleft.png'); 
    character_img_right = loadImage ('./Assets/thorstenright.png');
    daisy = loadImage ('./Assets/whitedaisy.png');
    tulip = loadImage ('./Assets/redtulip.png');
    grass1 = loadImage ('./Assets/grass1.png');
    grass2 = loadImage ('./Assets/grass2.png');
    grass3 = loadImage ('./Assets/grass3.png');
    grass4 = loadImage ('./Assets/grass4.png');
    grass5 = loadImage ('./Assets/grass5.png');
    grass6 = loadImage ('./Assets/grass6.png');
    nav_sign = loadImage ('./Assets/navigationsign.png');
    education_hat = loadImage ('./Assets/educationhat.png');
    coding_laptop = loadImage ('./Assets/codinglaptop.png');
    camera = loadImage ('./Assets/camera.png');
    let randomgrasses = [grass1, grass2, grass3, grass4, grass5, grass6];
    

    for(let i=0; i<=daisies_amount; i++) {
        daisy_assets[i] = [round(random(-worldsize[0], worldsize[1])), round(random(-worldsize[0], worldsize[1]))];
    }

    for(let i=0; i<=tulips_amount; i++) {
        tulip_assets[i] = [round(random(-worldsize[0], worldsize[1])), round(random(-worldsize[0], worldsize[1]))];
    }

    for(let i=0; i<=grass_amount; i++) {
        let index = round(random(0,randomgrasses.length-1));
        let grass = randomgrasses[index];
        grass_assets[i] = [grass, round(random(-worldsize[0], worldsize[1])), round(random(-worldsize[0], worldsize[1]))];
        
    }

    daisies = daisy_assets;
    tulips = tulip_assets;
    grasses = grass_assets;
    
}



function checkBounds(){
    if (character_position[0] >= worldsize[0]/2) {
        character_position[0] -= 30;
    }
    if (character_position[0] <= 0-(backgroundimg.width/2+400)) {
        character_position[0] += 30;
    }
    if (character_position[1] >= worldsize[1]/2) {
        character_position[1] -= 30;
    }
    if (character_position[1] <= 0) {
        character_position[1] += 30;
    }
}

function updatePosition() {
    character_position[0] += character_speed[0];
    character_position[1] += character_speed[1];
}

function determineDirection() {
    if (character_speed[0] > 0) {
        current_character_facing = character_img_left;
    
    } else if (character_speed[0] < 0) {
        current_character_facing = character_img_right;
        
    } else if (character_speed[1] > 0) {
        current_character_facing = character_img_back;
        
    } else if (character_speed[1] < 0) {
        current_character_facing = character_img_front
        
    } else {
        current_character_facing = character_img_front;
       
    }
}
