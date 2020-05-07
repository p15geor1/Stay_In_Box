//Dilosh metavliton
var MENU = 0
var Song;
var Amp;
var Vol;
var VolumeTample = [];
var RectangleX;
var RectangleY;
var RectangleDifficult;
var SliderValues = [];
var Timer = 3;
var Mouse_X_Y;
var Check_One = 0;
var Check_Two = 1;
var Check_Three = 0;
var SongTimeValue;
var ColorChange;
var img2;
var img3;
var img4;

// h sinarthsh preload fortwnei prin thn ekkinish ths efarmoghs polimesa poy 8a xreiastoyn, wste na einai etoima 
function preload() {
  Song = loadSound('SovietAnthem.mp3');
  img2 = loadImage('BackgroundIMG.png');
  img3 = loadImage('TryAgain.png');
  img4 = loadImage('about.png');
}

function setup() {
  createCanvas(800, 600); //dhmiourgia tou canva
  Amp = new p5.Amplitude(); // h AMP metraei olous tous hxous
  // Arxikopoihsh ths 8eshs toy or8ogoniou
  RectangleX = 0;
  RectangleY = height / 2;
  VolumeDifficult = 1;
  RectangleDifficult = 150; //h Default timh tou or8ogoniou
  CreateSliderFunction(); //sinartish pou dhmiourgei ta slider
  ColorChange = 1; //h Default timh tou xromatos ths grammhs
}

function draw() {
  //etoimos kodikas tou menou
  background(255);
  fill(0, 255, 0);
  rect(50, 50, 200, 75);
  fill(255, 0, 255);
  rect(50, 200, 200, 75);
  fill(255, 0, 0);
  rect(50, 350, 200, 75);
  textSize(50)
  fill(255);
  text('START', 70, 106);
  text('ABOUT', 65, 406);
  textSize(40);
  text('SETTINGS', 50, 250);
  image(img2, 280, -1, 550, 600);
  //mexri edo, to mono pou allakse htan h eikona
  //sto menu 0 den xreiazontai sliders, mono sta settings
  SliderHide();
  textSize(30)

  //To menu 1 einai o kwdikas tou paixnidiou
  if (MENU == 1) {
    background(0, 0, 255) //xrwma tou background
    TimerFunctionCheckMouse(); //sxoliasmos panw apo th sinarthsh
    //Ean to tragoudi de paizei kai o xrhsths den exei xasei kai o xrhsths se periptosh pou eixe pathsei pause afhsei to pontiki tote na ksekinhsh to tragoudi
    if (!Song.isPlaying() && Check_One === 0 && Check_Three === 0) {
      Song.play(); //h Default timh
      Song.setVolume(0.5); //h Default entash
    }
    //strogilopoihsh tou torinou xronou kai tou tornou xronou +2 kai sigrish metaksi tous
    if (round(SongTimeValue) + 2 == round(Song.currentTime())) {
      Song.rate(1); //an einai alh8is epistrefei h taxitita sto kanoniko
    }
    SoundSignal();// dhmiourgia ths optikopoihshs
    RectangleMove(RectangleDifficult);//dhmiourgia tou Or8ogwniou
    //epistrofh sto arxiko menou an pathuei to deksi click
    if (mouseButton == RIGHT) {
      MENU = 0
    }
    //an o xrhsths xasei tote emfanizetai h eikona img3 (Try Again)
    if (Check_One == 1) {
      image(img3, 0, 0);
    }

  } 
  if (MENU == 2) {
    //to keimeno pou emfanizetai sta settings
    background('Black')
    textSize(20)
    text('Right Click to return to MENU', 525, 30)
    textSize(30)
    text('Volume Difficult: ', 50, 100)
    text('Rectangle Difficult: ', 50, 200)
    text('Delay Help: ', 50, 300)
    text('Peak Color: ', 50, 400)
    InformationSettings(); //perigrafh twn epilogwn tou xrhsth 
    stroke(ColorChange, 204, 0);//allagi xrwmatos ths grammhs ipodeikshs kai dustuxos kai olou tou keimenou
    SliderShow(); //emfanish twn slider
    line(450, 350, 520, 420); //dhiourgia ths grammhs protpou
    SliderValuesFunction(); // h sinarthsh pou ginetai epilogh ton diaforwn timwn
    //epistrofh sto arxiko menou
    if (mouseButton == RIGHT) {
      MENU = 0
    }
  } // INSTRUCTIONS
  //h fwtografia me thn analitikh perigrafh twn senariwn kai tou tropou pou dhmiourghuhkan
  if (MENU == 3) {
    image(img4, 0, 0);
        //epistrofh sto arxiko menou

    if (mouseButton == RIGHT) {
      MENU = 0
    }
  } // EXIT 
}
// an ginei click se aftes tis sintetagmenes tote phgaine sto antistoixo menou
function mouseClicked() {
  if (MENU === 0) {
    if (mouseX < 200 && mouseX > 50) {
      if (mouseY < 125 && mouseY > 50) {
        MENU = 1
      }
      if (mouseY < 275 && mouseY > 200) {
        MENU = 2
      }
      if (mouseY < 425 && mouseY > 350) {
        MENU = 3
      }
    }
  }
}

//an enw paizei to paixnidi ginei click tote kane pause to tragoudi
function mousePressed() {
  if (MENU == 1) {
    Song.pause();
    Check_Three = 1;
  }
}


//an afhsei to deksi click o xrhsths tote sinexizei to tragoudi
function mouseReleased() {
  if (MENU == 1) {
    Song.play();
  }

}

//an path8ei kapoio koumpi sinarthsh
function keyPressed() {
  //an path8ei to SHIFT enw to paixnidi trexei kai o xrhsths exei akoma boh8eies
  if (keyCode == SHIFT && MENU == 1 && Check_Two <= 3 && Check_Two > 0) {
    //rikse thn taxitita sto 0.5
    Song.rate(0.5);
    // krathse ta torina deyterolepta
  
    SongTimeValue = Song.currentTime();
    // console.log(SongTimeValue);
    Check_Two--;//rixnei mia boh8eia afou xrhsimopoih8hke
  }
}


//dhmiourgia ths optikopoihshs
function SoundSignal() {

  //apo8hkeuetai h timh ths entashs sth timh vol
  Vol = Amp.getLevel();
  //gemizei o pinakas VolumeTample
  VolumeTample.push(Vol);
  //console.log(Vol);
  //dhmiourgia sxhmatos, arxh
  beginShape();
  noFill(); //na mhn iparxei gemisma
  //mia for pou diapernaei ta stoixeia tou pinaka
  for (var i = 0; i < VolumeTample.length; i++) {
    //an h entash einai anamesa se 0.05 kai 0.1 tote to xrwma epiloghs tou xrhsth
    if (VolumeTample[i] > 0.05 && VolumeTample[i] < 0.1) {
      stroke(ColorChange, 204, 0);
    //an h entash einai pano apo 0.1 tote kokkino 
    } else if (VolumeTample[i] > 0.1) {
      stroke('red')
      //allws mavro
    } else {
      stroke('black');
    }
    //dhmiourgia sxhmatos to x sto i kai to y analoga me thn entash prosarmosmeno na emfanizetai sth katallhlh 8esh ston canva
    vertex(i, (VolumeTample[i] * (-400) + height / 2));
    //texnikh apo ta ma8hmata p5.js, opws anaferetai sto about
  }
  endShape();//telos tou sxhmatos

  //an h optikopoihsh plhsiasei konta sto telos tou canva
  if (VolumeTample.length > width - 150) {
    VolumeTample.splice(0, 1);//8elw na diagrapso to prwto stoixeio kai mono afto
    //afto simvainei gia na adiasei h teleftaia 8esh tou pinaka kai na ksanagemisei me to epomeno stoixeio pou 8eloume
  }
}

function RectangleMove(RectangleDifficult) {

  //dhmiourgeia tou Or8ogwniou
  stroke(50);
  fill(255, 0, 0);
  rect(RectangleX, RectangleY, 30, RectangleDifficult); //oi arxikes times X kai Y pou orisame sth korifh kai to height RectangleDifficult exei na kanei me th timh pou edwse o xrhsths

  //metakinhsh tou Or8ogwniou
  for (var i = 0; i < VolumeTample.length; i++) {
    RectangleX = i + 5 //metakinhsh tou x
    RectangleY = (VolumeTample[i] * (-600) + (height / 2) - 50)//metakinhsh tou Y, oi times einai peripou idiees me tis times ths optikopoihshs, wste na fainetai idios o tropos metakinhshs
  }
}

function CreateSliderFunction() {
  //dhmiourgia twn slider
  VolumeSlider = createSlider(1, 3, 1);
  VolumeSlider.position(320, 80);
  VolumeSlider.style('width', '80px');

  RectangleSlider = createSlider(1, 3, 1);
  RectangleSlider.position(320, 180);
  RectangleSlider.style('width', '80px');

  HelpSlider = createSlider(1, 3, 1);
  HelpSlider.position(320, 280);
  HelpSlider.style('width', '80px');

  ColorSlider = createSlider(1, 255, 1);
  ColorSlider.position(320, 380);
  ColorSlider.style('width', '80px');
  
}

//emfanish twn sloder
function SliderShow() {
  VolumeSlider.show();
  RectangleSlider.show();
  HelpSlider.show();
  ColorSlider.show();
}

//apokrispsh twn slider
function SliderHide() {
  VolumeSlider.hide();
  RectangleSlider.hide();
  HelpSlider.hide();
  ColorSlider.hide();
}


//mesw twn slider ginetai apo8hkeush twn timwn
function SliderValuesFunction() {
  SliderValues[0] = RectangleSlider.value();// epilogh tou mege8ous tou koutiou
  
  //prosarmoghs ths diskolias 
  if (SliderValues[0] == 1) {
    RectangleDifficult = 150;
  }
  if (SliderValues[0] == 2) {
    RectangleDifficult = 120;
  }
  if (SliderValues[0] == 3) {
    RectangleDifficult = 80;
  }

  //prosarmoghs ths entashs
  SliderValues[1] = VolumeSlider.value();
  if (SliderValues[1] == 1) {
    Song.setVolume(0.5);
  }
  if (SliderValues[1] == 2) {
    Song.setVolume(0.7);
  }
  if (SliderValues[1] == 3) {
    Song.setVolume(1);
  }

  //prosarmoghs tou ari8mou voh8eiwn
  SliderValues[2] = HelpSlider.value();
  if (SliderValues[2] == 1) {
    Check_Two = 1;
  }
  if (SliderValues[2] == 2) {
    Check_Two = 2;
  }
  if (SliderValues[2] == 3) {
    Check_Two = 3;
  }
  ColorChange = ColorSlider.value(); //prosarmogh tou xrwmatos
  //console.log(ColorChange);
}

//sinartisi timer kai elegxou tou shmeiou tou pontikiou se sxesh me to or8ogwnio
function TimerFunctionCheckMouse() {
 //etoimos kwdikas gia to xronometro
  //prosarmogi tou shmeiou kai tou mege8ous
  textAlign(CENTER, CENTER);
  textSize(100);
  text(Timer, 40, 50);
  //ka8e 1 sec  kai an den einai 0 o timer rikse to kata 1 ton Timer, edw ginetai o elegxos an exoun perasei 3 defterolepta pou exei dia8esima o xrhsths wste na exei ton kersora mesa sto kouti
  if (frameCount % 60 === 0 && Timer > 0) {
    Timer--;
  }
  //mexri edw etoimos kwdikas
  
  //an o timer einai 0 shmainei oti to pontiki 8a prepei na vrisketai mesa sto or8ogwnio
  if (Timer === 0) {
    background(0, 0, 255); //afto iparxei wste na kalipsi to Timer kai na eksafanistei
    
    //Se afto to shmeio ginetai elegxos an to pontiki vrisketai mesa sto kouti:
    //to X tou pontikiou prepei na einai metaksi tou shmeiou x pou arxizei to or8ogwnio kai tou shmeiou x+30 poy einai to mhkos tou
    //to Y you pontikiou prepei na einai metaksi tou shmeiou y pou arxizei to or8ogwnio kai tou shmeiou Y + th timh pou exei apofasisei o xrhsths oti 8a einai to mege8os tou height otan ka8orise thn diskolia
    if ((RectangleX < mouseX) && (mouseX < RectangleX + 30) && (RectangleY < mouseY) && (mouseY < RectangleY + RectangleDifficult)) {} else {
      Song.stop(); //telos tou tragoudiou
      Check_One = 1;
    }
  }
}

//sinarthsh pou eksigei sto xrhsth ti epiloges exei
function InformationSettings() {
  textSize(15)
  text('Όσο μεγαλύτερη η ένταση τόσο δυσκολότερο \nθα γίνει το παιχνίδι γιατί θα πρέπει να να ακολουθήσεις \nμεγαλύτερα εύρη με το ποντίκι!', 420, 75)
  text('Μπορείς να αυξήσεις τη \nδυσκολία του παιχνιδιού \nμικραίνοντας το ορθογώνιο!', 420, 175)
  text(' Πατώντας το SHIFT μπορείς να ξεπεράσεις \n ένα δύσκολο σημείο καθώς\n το τραγούδι θα πάει πιο σιγά,\n μπορείς να έχεις απο 1 έως 3 τέτοιες\n βοήθειες, διάλεξε!', 420, 260)
  text('Όταν τραγούδι βρίσκεται \nστα πιο δυνατά σημεία αλλάζει χρώμα! \nΔιάλεξε το χρώμα που σου αρέσει!', 525, 375)
  text('Πατώντας το SPACE μπορείς να\nπάρεις ένα διάλλειμα, \nτο τραγούδι θα κάνει μια πάυση. \nΠΡΟΣΟΧΗ, ο κέρσορας δε πρέπει να βγει απο\nτο ορθογώνιο!', 420, 460)

  textSize(30)
  text('ΜΕΙΝΕ ΣΤΟ ΚΟΥΤΙ!', 70, 500)
}