const playBTN = document.getElementById("play-btn");
const synth = new Tone.Synth().toDestination();

//Play a middle C for 2 seconds when the button is clicked
playBTN.addEventListener("click", () => {
    if(Tone.context.state !== "running") {
        Tone.start();
    }
    const now = Tone.now();
    // trigger the attack immediately
    synth.triggerAttack("C4", now);
    // wait two seconds before triggering the release
    synth.triggerRelease(now + 0.5);
});

const tarBTN = document.getElementById("tar-btn");
tarBTN.addEventListener("click", () =>{
    if(Tone.context.state !== "running") {
        Tone.start();
    }
    synth.triggerAttackRelease("E4", 0.5);
});


const ladderBTN = document.getElementById("ladder-btn");
ladderBTN.addEventListener("click", () => {
    if(Tone.context.state !== "running") {
        Tone.start();
    }
    const now = Tone.now();
    synth.triggerAttackRelease("A4", "8n", now);
    synth.triggerAttackRelease("B4", "8n", now + 0.5);
    synth.triggerAttackRelease("C4", "8n", now + 1);
});



const beatBTN = document.getElementById("beat-btn");
beatBTN.addEventListener("click", () => {
    if(Tone.context.state !== "running") {
        Tone.start();
    }
    const now = Tone.now();
    synth.triggerAttackRelease("C2", "8n", now);
    synth.triggerAttackRelease("C2", "8n", now + 0.5);
    synth.triggerAttackRelease("C2", "8n", now + 1);
    synth.triggerAttackRelease("C2", "8n", now + 1.5);
    
    synth.triggerAttackRelease("E4", "16n", now + 0.25);
    synth.triggerAttackRelease("G4", "16n", now + 0.75);
    synth.triggerAttackRelease("E4", "16n", now + 1.25);
    synth.triggerAttackRelease("A4", "16n", now + 1.75);
    
});


