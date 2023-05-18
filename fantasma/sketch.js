var torreImg, torre;
var portaImg, porta, grupoPorta;
var gradeImg, grade, grupoGrade;
var player, player_parado, player_pulando;
var grupoBlocoInvisivel, blocoInvisivel;
var estadoJogo = "jogar";
var somAssustador;
var playerparado;

function preload() {
    //é assim que carrega a imagem da torre
    torreImg = loadImage("torre.png");
    //agora, do mesmo jeito, carregue as imagens da grade e da porta
    portaImg = loadImage("porta.png")
    gradeImg = loadImage("grade.png")
    
    
    //carregando as animações do fantasma
    player_parado = loadAnimation("fantasma parado.png");
    player_pulando = loadAnimation("fantasma pulando.png");

    //programe para carregar o som
    somAssustador = loadSound("uuu.wav")
    //é assim que cria um grupo
    grupoBlocoInvisivel = new Group()
    //agora, crie aqui os grupos das grades e das portas
    grupoGrade = new Group()
    grupoPorta = new Group()
}

function setup() {
    createCanvas(600, 600);
    //criando a torre
    torre = createSprite(300, 300);
    torre.addImage("torre", torreImg);
    torre.velocityY = 1;

    //tocar o som em loop
   

    //criando o player
    player = createSprite(200, 200, 50, 50);
    player.addAnimation("player parado", player_parado);
    player.addAnimation("player pulando", player_pulando)
    player.scale = 0.3;

    edges = createEdgeSprites();
}

function draw() {
    background(200);
    
    

    if (estadoJogo === "jogar") {
        //é aqui que muda a animação do player para ele parado.
        player.changeAnimation("player parado")

        //código para controlar o jogador para cima
        if (keyDown("space")){
            player.velocityY = -10
            player.changeAnimation("player pulando")
        }
        

        //esse é o código para controlar o jogador para Esquerda
        if (keyDown("left")) {
            player.x -= 3;
            player.changeAnimation("player pulando");
        }

        //agora, adicione o código para controlar o jogador para direita
        if (keyDown("right")){
            player.x += 3
            player.changeAnimation("player pulando")
        }
        
        //do mesmo jeito que adicionou a gravidade do trex, adicione a do player.
         player.velocityY += 0.8  
        
        //Do mesmo jeito que fez um loop infinito para o solo do trex, adicione o código para a torre estar em loop infinito
        if (torre.y > 600){
        torre.y = height/2
}

        //programe para o player colidir com as grades
        player.collide(grupoGrade) 

        //é aqui que chama a função gerarPortas()
        gerarPortas()
        
 
        drawSprites();

        //código para finalizar o jogo
        if (player.isTouching(grupoBlocoInvisivel) || player.y > height) {
            estadoJogo = "fim";
        }
    }
    if (estadoJogo === "fim") {
        background(0);
        fill("yellow");
        textSize(25);
        text("BOO! Só tomou esse susto porque PERDEU", 20, 200);
        somAssustador.loop()
    }

}


function gerarPortas() {

    if (frameCount % 240 === 0) {

        porta = createSprite(200, -50);
        porta.x = Math.round(random(120, 400))

        grade = createSprite(porta.x, 10);

        blocoInvisivel = createSprite(porta.x, 25, grade.width, 2);

        //adicione o código para o bloco invisivel ser invisivel
        blocoInvisivel.visible = false

        //adicione o código para adicionar as imagens nas sprites
        grade.addImage (gradeImg)
        porta.addImage (portaImg)
        
           
        //é assim que se dá velocidade para o bloco
        blocoInvisivel.velocityY = 1;
        //agora, dê velocidade para a porta e para a grade
        grade.velocityY = blocoInvisivel.velocityY
        porta.velocityY = grade.velocityY
        //é assim que se dá tempo de vida para a sprite
        blocoInvisivel.lifetime = 800;
        //agora, dê tempo de vida para a porta e a grade
        porta.lifetime = blocoInvisivel.lifetime
        grade.lifetime = porta.lifetime 
        //programe para que o player esteja na frente da porta aumentando seu depth
        player.depth > porta.depth
        //é assim que se adiciona uma sprite no grupo
        grupoBlocoInvisivel.add(blocoInvisivel);
        //agora, adicione a sprite de porta no grupo das portas e a sprite de grade no grupo das grades.
        grupoGrade.add(grade)
        grupoPorta.add(porta)

    }


}
