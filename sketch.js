// creating the variables
var ironman;
var background;
var ironimg;
var bgimg;
var stoneimg;
var stonegroup;
var diamondimg;
var diamondgroup;
var diamondcount=0;
var spike;
var spikegroup;
var spikeimg;

function preload() 
{
  // loading the images
  ironimg=loadImage("images/iron.png");
  bgimg=loadImage("images/bg.jpg");
  stoneimg=loadImage("images/stone.png");
  diamondimg=loadImage("images/diamond.png")
  spikeimg=loadImage("images/spikes.png")
}


function setup() {
  createCanvas(1200,600); // creating canvas
  ironman=createSprite(300,300,30,30) // creating ironman sprite
  ironman.addImage(ironimg); // adding the image to ironman
  ironman.scale=0.3; // adjusting ironman's size
  edges=createEdgeSprites(); // ceating th edges
  // creating groups for stones, diamonds and spikes
  stonegroup=new Group(); 
  diamondgroup=new Group();
  spikegroup=new Group();
}

function draw()
{
  background(bgimg); // adding the background image
  background.scale=2; // adjusting background size
  ironman.setCollider("rectangle",100,0,200,400); // adding collider in ironman
  // creating the boundary
  ironman.bounceOff(edges[0]);
  ironman.bounceOff(edges[1]);
  ironman.bounceOff(edges[2]);
  // making ironman able to move on pressing the keys
  if(keyDown("up"))
  {
    ironman.velocityY=-10;
  }
  if(keyDown("left"))
  {
    ironman.x=ironman.x-10;
  }
  if(keyDown("right"))
  {
    ironman.x=ironman.x+10;
  }
  ironman.velocityY=ironman.velocityY+0.5; // adding downwards pull
  generatePlatforms() // generating the stones
  // making ironman able to stand and collide with the stones
  for(i=0;i<(stonegroup).length;i++)
  {
    var temp=stonegroup.get(i);
    if(temp.isTouching(ironman))
    {
      ironman.collide(temp);
    }
  }
  generateDiamonds() // generating the diamonds
  // making ironman able to collect the diamonds and increasing score on collecting diamonds
  for(var i=0;i<(diamondgroup).length;i++)
  {
    var temp1=(diamondgroup).get(i) ;
   if(temp1.isTouching(ironman))
    {
      diamondcount++;
      temp1.destroy();
      temp1=null;
    }
  }
  generatespikes() //generating the spikes
  // making ironman able to collect the spikes and decreasing score on collecting spikes
  for(var j=0;j<(spikegroup).length;j++)
  {
    var temp2=(spikegroup).get(j) ;
   if(temp2.isTouching(ironman))
    {
      diamondcount=diamondcount-5;
      temp2.destroy();
      temp2=null;
    }
  }

  drawSprites() // drawing the sprites
  textSize(20); // adding text size
  fill("white"); // text color
  text("diamonds collected : "+diamondcount,500,50); // displaying score
}

// function for generating the diamonds
function generatePlatforms() 
{
  if (frameCount % 60 === 0) 
  {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50,850);
    brick.addImage(stoneimg);
    brick.velocityY = 5;
    brick.lifetime = 250;
    stonegroup.add(brick);
  }
}

// function for generating the stones
function generateDiamonds()
{
  if (frameCount % 70 === 0)
  {
    var dmnd = createSprite(1200, 10, 40, 10);
    dmnd.x = random(40,860);
    dmnd.addImage(diamondimg);
    dmnd.scale=0.5;
    dmnd.velocityY = 3;
    dmnd.lifetime = 250;
    diamondgroup.add(dmnd);
  }
}

// function for generating the spikes
function generatespikes()
{
  if (frameCount % 70 === 0)
  {
    var spks = createSprite(1200, 10, 40, 10);
    spks.x = random(40,860);
    spks.addImage(spikeimg);
    spks.scale=0.5;
    spks.velocityY = 6;
    spks.lifetime = 250;
    spikegroup.add(spks);
  }
}
