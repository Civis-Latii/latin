class Latinword {
    constructor(nom,gen,gender,english) {
        this.nom=nom;
        this.gen=gen;
        this.gender=gender;
        this.english=english;
        this.declension="";

        let stem = "";
        const iumwordslist = ["corporis","temporis","vulneris","itineris","artis","montis","noctis","partis","principis","urbis","civis","hostis","navis","maris"];
        if (gen.slice(-4)=="arum") { //1st plural only
          this.declension="1st";
          stem=gen.slice(0,-4);
          this.nomsg="-";
          this.vocsg="-";
          this.accsg="-";
          this.gensg="-";
          this.datsg="-";
          this.ablsg="-";
          //no 1st neuter
          this.nompl=nom;
          this.vocpl=nom;
          this.accpl=stem+"as";
          this.genpl=gen;
          this.datpl=stem+"is";
          this.ablpl=stem+"is";
        }
          else if (gen.slice(-4)=="orum") { //2nd plural only
          this.declension="2nd";
          stem=gen.slice(0,-4);
          this.nomsg="-";
          this.vocsg="-";
          this.accsg="-";
          this.gensg="-";
          this.datsg="-";
          this.ablsg="-";
          
          this.nompl=nom;
          this.vocpl=nom;
          if (gender=="n pl") {  //2nd plural only, neuter
            this.accpl=nom;
        }
          else {
            this.accpl=stem+"os";
        }
          this.genpl=gen;
          this.datpl=stem+"is";
          this.ablpl=stem+"is";
        }
          else if (gen.slice(-2)=="um" || gen.slice(-3)=="ium") { //3rd plural only
            this.declension="3rd";
            stem=gen.slice(0,-2);
            this.nomsg="-";
            this.vocsg="-";
            this.accsg="-";
            this.gensg="-";
            this.datsg="-";
            this.ablsg="-";
    
            this.nompl=nom;
            this.vocpl=nom;
            if (gender=="n pl") { //3rd plural only, neuter
              this.accpl=nom;
          }
            else {
              this.accpl=stem+"es";
          }
            this.genpl=gen;
            this.datpl=stem+"ibus";
            this.ablpl=stem+"ibus";
        }
          else if (gen.slice(-2)=="uum") { //4th plural only
            this.declension="4th";
            stem=gen.slice(0,-2);
            this.nomsg="-";
            this.vocsg="-";
            this.accsg="-";
            this.gensg="-";
            this.datsg="-";
            this.ablsg="-";
    
            this.nompl=nom; //4th dec. has nom and acc same, regardless of gender
            this.vocpl=nom;
            this.accpl=nom;
            this.genpl=gen;
            this.datpl=stem+"ibus";
            this.ablpl=stem+"ibus";
          }
            //no 5th plural only
        
          else if (gen.slice(-2)=="ae") { //1st singular
            this.declension="1st";
            stem=gen.slice(0,-2);
            this.nomsg=nom;
            this.vocsg=nom;
            this.accsg=stem+"am";
            this.gensg=gen;
            this.datsg=stem+"ae";
            this.ablsg=stem+"a";
            //no 1st neuter
            this.nompl=stem+"ae";
            this.vocpl=stem+"ae";
            this.accpl=stem+"as";
            this.genpl=stem+"arum";
            this.datpl=stem+"is";
            this.ablpl=stem+"is";
          }
          else if (gen.slice(-1)=="i" && !(gen.slice(-2)=="ei")) { //2nd singular, making sure does not apply to 5th dec. "ei"
            this.declension="2nd";
            stem=gen.slice(0,-1);
            this.nomsg=nom;
            if (gender=="n") { //2nd neuter
              this.vocsg=nom;
              this.accsg=nom;
              
              this.nompl=stem+"a";
              this.vocpl=stem+"a";
              this.accpl=stem+"a";
          }
            else {
              this.vocsg=stem+"e";
              this.accsg=stem+"um";
              
              this.nompl=stem+"i";
              this.vocpl=stem+"i";
              this.accpl=stem+"os";
          }
            this.gensg=gen;
            this.datsg=stem+"o";
            this.ablsg=stem+"o";
          
            this.genpl=stem+"orum";
            this.datpl=stem+"is";
            this.ablpl=stem+"is";
          }
          else if (gen.slice(-2)=="is") { //3rd singular
            this.declension="3rd";
            stem=gen.slice(0,-2);
            this.nomsg=nom;
            this.vocsg=nom;
            if (gender=="n") { //3rd neuter
              this.accsg=nom;
              if (nom=="mare") { //accounting for true perfect i stems
                this.nompl=stem+"ia";
                this.vocpl=stem+"ia";
                this.accpl=stem+"ia";  
              }
              else {
                this.nompl=stem+"a";
                this.vocpl=stem+"a";
                this.accpl=stem+"a";

              }
            }
            else {
              this.accsg=stem+"em";
              
              this.nompl=stem+"es";
              this.vocpl=stem+"es";
              this.accpl=stem+"es";
          }
            this.gensg=gen;
            this.datsg=stem+"i";
            this.ablsg=stem+"e";

            if (iumwordslist.includes(gen)) { //accounting for ium words
              this.genpl=stem+"ium";
            }
            else {
              this.genpl=stem+"um";
            }
            this.datpl=stem+"ibus";
            this.ablpl=stem+"ibus";
          }
          else if (gen.slice(-2)=="us") { //4th singular
            this.declension="4th";
            stem=gen.slice(0,-2);
            this.nomsg=nom;
            this.vocsg=nom;
            if (gender=="n") { //4th neuter
              this.accsg=nom;
              this.datsg=nom;
              this.ablsg=nom;
    
              this.nompl=stem+"ua";
              this.vocpl=stem+"ua";
              this.accpl=stem+"ua";
          }
            else {
              this.accsg=stem+"um";
              this.datsg=stem+"ui";
              this.ablsg=stem+"u";
    
              this.nompl=nom;
              this.vocpl=nom;
              this.accpl=nom;
          }
            this.gensg=gen;
    
            this.genpl=stem+"uum";
            this.datpl=stem+"ibus";
            this.ablpl=stem+"ibus";
          }
          else if (gen.slice(-2)=="ei") { //5th singular
            this.declension="5th";
            stem=gen.slice(0,-2);
            this.nomsg=nom;
            this.vocsg=nom;
            this.accsg=nom;
            this.gensg=gen;
            this.datsg=stem+"ei";
            this.ablsg=stem+"e";
            //no 5th neuter
            this.nompl=stem+"es";
            this.vocpl=stem+"es";
            this.accpl=stem+"es";
            this.genpl=stem+"erum";
            this.datpl=stem+"ebus";
            this.ablpl=stem+"ebus";
          }
        }
      } //This is the constructor to decline every latinword in the vocab list properly

let wordlist = [];
import { lexicon } from "./latinlexicon.js";
const words = lexicon.trim().replace(/\r?\n/g,"\t").split("\t"); //.trim() cuts out initial newline in lexicon file

for (let i=0;i<words.length;i+=4) {
  let word = new Latinword(words[i],words[i+1],words[i+2],words[i+3]);
  wordlist.push(word);
} //Creating a new Latinword for all words in the list

wordlist[wordlist.findIndex(obj => obj.nomsg === "domus")].ablsg="domo";
wordlist[wordlist.findIndex(obj => obj.nomsg === "domus")].accpl="domos";
wordlist[wordlist.findIndex(obj => obj.nomsg === "filius")].vocsg="fili"; //Setting irregular vocab forms

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
} //Basic random function

const display = { //booleans of whether or not to add each form to the pool
  nom: {sg: false, pl: false},
  voc: {sg: false, pl: false},
  acc: {sg: false, pl: false},
  gen: {sg: false, pl: false},
  dat: {sg: false, pl: false},
  abl: {sg: false, pl: false}
} //This is an object with 6 objects inside, each with 2 boolean properties

const cng = {
  Case: "",
  Num: "",
  Gender: "",
}

const casecheckboxes = document.querySelectorAll(".casecheckboxes"); //returns all the checkboxes
// => shortform for function (function(x) is x =>...; function(x) return y is x => y)
casecheckboxes.forEach(box => {
  box.addEventListener("click", () => {
    const casename = box.id;
    display[casename].sg = box.checked;
    display[casename].pl = box.checked;
  }) //when box clicked, update the display[casenum] to be the same as .checked (boolean) 
})

let currentword = null;
let currentform = "";

function quiz() {
  if (document.getElementById("table").style.display=="block") {
    document.getElementById("table").style.display="none";
  }
  cases,numbers,genders.forEach(btn => {
    btn.classList.remove("selected")
  })
  document.getElementById("displaystatus").innerHTML=""
  const randword = random(wordlist);
  let quizwords = [];

  const Cases = ["nom","voc","acc","gen","dat","abl"];
  const Numbers = ["sg","pl"]

  Cases.forEach(c => {
    Numbers.forEach(n => {
      if (display[c][n] && randword[c + n] !== "-") {
        quizwords.push(randword[c + n])
      }
    })
  })


  if (quizwords.length == 0) {
    document.getElementById("displaystatus").innerHTML="Please select case before quizzing!";
    return;
  }

  const word = random(quizwords);

  currentword = randword;
  currentform = word;

  document.getElementById("quizword").innerHTML=word;
}

function checkans(randomword,randomform) {
    
    if (randomword.gender !== cng.Gender || randomform !== randomword[cng.Case+cng.Num]){
      document.getElementById("displaystatus").innerHTML="Incorrect!";
    }
    else {
      document.getElementById("displaystatus").innerHTML="Correct!";
    }
  }

document.getElementById("quiz").addEventListener("click",function(){
  quiz()
});

document.getElementById("checkans").addEventListener("click",function(){
  this.classList.add("flash");
  setTimeout(() => {
    this.classList.remove("flash");
  }, 100);
  if (!currentword) {
    document.getElementById("displaystatus").innerHTML="Please select case(s) before quizzing!";
    return; //if you click this before next it returns above. fix.
  }
  checkans(currentword,currentform);
});


const cases = document.querySelectorAll(".cases");

cases.forEach(btn => {
  btn.addEventListener("click", function() {
    cng.Case=this.id.replace("set","");
    cases.forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");
  })
})

const numbers = document.querySelectorAll(".numbers");

numbers.forEach(btn => {
  btn.addEventListener("click", function() {
    cng.Num=this.id.replace("set","");
    numbers.forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");
  })
})

const genders = document.querySelectorAll(".genders");

genders.forEach(btn => {
  btn.addEventListener("click", function() {
    cng.Gender=this.id.replace("set","");
    genders.forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");
  })
})
//Bottom of selection logic

document.getElementById("revealdeclensions").addEventListener("click", function() {
  table()
})

function table() {
  const CASES = ["nom","voc","acc","gen","dat","abl"]
  const NUMBERS = ["sg","pl"]
  CASES.forEach(c => {
    NUMBERS.forEach(n => {
      document.getElementById(`${c}${n}`).innerHTML=currentword[c + n]
    })
  })
  CASES.forEach(c => {
    NUMBERS.forEach(n => {
      document.getElementById(`${c}.${n}`).innerHTML=currentword[c + n]
    })
  })
  document.getElementById("dec").innerHTML=`${currentword.declension} dec.`;
  document.getElementById("currentword").innerHTML=`${currentword.nom}, ${currentword.gen}, ${currentword.gender}`;
  if (document.getElementById("table").style.display=="none") {
    document.getElementById("table").style.display="block";
  }
  else {
    document.getElementById("table").style.display="none";
  }
}

document.getElementById("table").style.display="none";

//Add a score/progress counter for users
//This should have Correct: x/y; Streak: ; Accuracy: z%;
//Add homepage where users can select which cases they want to quiz on
//Add quiz page where the quiz takes place
//Vice-verba like layout
//Decl. table in top right corner
//Progress/score bar along bottom
//Current word in BIG BOLD letters along top - e.g., maria, sea