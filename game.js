let character_position; //2D array with character's coordinates (pair of ints)
let character_speed; //2D array with character's speed in x and y directions respectively (pair of ints)
let character_img_front, character_img_back, character_img_left, character_img_right; //All 4 sides of the character sprite image asset
let win_width = window.innerWidth;
let win_height = window.innerHeight;
let character_size = [150, 150];
let current_character_facing;
let tile_size = 50;
let tile_color = [];
let bg_resolution = [win_width/tile_size, win_height/tile_size];
let numtiles = bg_resolution[0]*bg_resolution[1];
let canvas;

function preload() {
    character_img_front = loadImage ('./Assets/thorstenfront.png');
    character_img_back = loadImage ('./Assets/thorstenback.png');
    character_img_left = loadImage ('./Assets/thorstenleft.png');
    character_img_right = loadImage ('./Assets/thorstenright.png');
    //for (let i = 0; i < numtiles; i++) { 
    //    tile_color[i] = random(120, 210);
    //}

    for (let i = 0; i < bg_resolution[0]; i++) {
        for (let j = 0; j < bg_resolution[1]; j++) {
            tile_color[j] = random(170, 210);
        }
    }
}

function setup() {
    canvas = createCanvas(win_width/2, win_height/2);
    //canvas.parent('main');
    color(0, 0, 0);
    stroke(0, 0, 0);
    imageMode(CENTER);
    character_position = [width/2, height/2];
    character_speed = [0, 0];
    character_img_front.resize(character_size[0], character_size[1]);
    character_img_back.resize(character_size[0], character_size[1]);
    character_img_left.resize(character_size[0], character_size[1]);
    character_img_right.resize(character_size[0], character_size[1]);
    current_character_facing = character_img_front;
}

function draw() {
    determineDirection();
    //background(200);
    drawBgTiles();
    image(current_character_facing, character_position[0], character_position[1]);
    if (keyIsPressed) {
        if (keyCode === UP_ARROW) {
            character_speed[1] = -5;
        } else if (keyCode === DOWN_ARROW) {
            character_speed[1] = 5;
        } else if (keyCode === LEFT_ARROW) {
        character_speed[0] = -5;
        } else if (keyCode === RIGHT_ARROW) {
            character_speed[0] = 5;
        } 
    }
    if (!keyIsPressed) {
        character_speed[0] = 0;
        character_speed[1] = 0;
    }
    updatePosition();
    print(determineDirection());
}

function loadAssets() {

}

function drawBgTiles(){
    stroke(0, 10);
    for (let i = 0; i < width / tile_size; i++) {
        for (let j = 0; j < height / tile_size; j++) {
            fill(100, tile_color[j], 75);
            rect(i * tile_size, j * tile_size, tile_size, tile_size);
        }
    }
}



window.onresize = function() {
    win_width = window.innerWidth;
    win_height = window.innerHeight;
    canvas.size(win_width, win_height);
}

function updatePosition() {
    character_position[0] += character_speed[0];
    character_position[1] += character_speed[1];
}

function determineDirection() {
    if (character_speed[0] > 0) {
        current_character_facing = character_img_right;
    return 'RIGHT';
    } else if (character_speed[0] < 0) {
        current_character_facing = character_img_left;
        return 'LEFT';
    } else if (character_speed[1] > 0) {
        current_character_facing = character_img_front;
        return 'DOWN';
    } else if (character_speed[1] < 0) {
        current_character_facing = character_img_back
        return 'UP';
    } else {
        current_character_facing = character_img_front;
        return 'DOWN';
    }
}
