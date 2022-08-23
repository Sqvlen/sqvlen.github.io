var canvas = document.getElementById("pingpong");

const context = canvas.getContext('2d');

function DrawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}


function DrawArc(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

canvas.addEventListener("mousemove", GetMousePos);

function GetMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

function ResetBall(){
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

function DrawNet() {
    for(let i = 0; i <= canvas.height; i += 15) {
        DrawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

function DrawText(text, x, y) {
    context.fillStyle = "#FFF";
    context.font = "75px fantasy";
    context.fillText(text, x, y);
}

function Collision(b, a) {
    a.top = a.y;
    a.bottom = a.y + a.height;
    a.left = a.x;
    a.right = a.x + a.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return a.left < b.right && a.top < b.bottom && a.right > b.left && a.bottom > b.top;
}

function Update() {
    if(ball.x - ball.radius < 0 ) {
        com.score++;
        ResetBall();
    }
    else if(ball.x + ball.radius > canvas.width) {
        user.score++;
        ResetBall();
    }
    
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    //UI
    com.y += ((ball.y - (com.y + com.height / 2))) * 0.1;
    
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
    }
    
    let player = (ball.x + ball.radius < canvas.width / 2) ? user : com;
    
    if(Collision(ball,player)) {
        let collidePoint = (ball.y - (player.y + player.height / 2));
        collidePoint = collidePoint / (player.height / 2);
        
        let angleRad = (Math.PI/4) * collidePoint;
        
        let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        ball.speed += 0.1;
    }
}

function Render() {
    DrawRect(0, 0, canvas.width, canvas.height, "#000");

    DrawText(user.score,canvas.width/4,canvas.height/5);
    DrawText(com.score,3*canvas.width/4,canvas.height/5);
    
    DrawNet();

    DrawRect(user.x, user.y, user.width, user.height, user.color);
    DrawRect(com.x, com.y, com.width, com.height, com.color);
    
    DrawArc(ball.x, ball.y, ball.radius, ball.color);
}
function Game() {
    Update();
    Render();
}
let framePerSecond = 50;

let loop = setInterval(game, 1000 / framePerSecond);

const ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "yellow"
}

const user = {
    x : 0,
    y : (canvas.height - 100) / 2,
    width : 10,
    height : 100,
    score : 0,
    color : "yellow"
}

const com = {
    x : canvas.width - 10,
    y : (canvas.height - 100) / 2,
    width : 10,
    height : 100,
    score : 0,
    color : "yellow"
}

const net = {
    x : (canvas.width - 2) / 2,
    y : 0,
    height : 10,
    width : 2,
    color : "yellow"
}