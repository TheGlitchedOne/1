//start
document.addEventListener("DOMContentLoaded", () => {
    start_tracking();
});

function start_tracking() {
    const start_output = document.getElementById("start_output");
    const orientation_output = document.getElementById("Device_Orientation");

    // 1. AUTOMATIC GEOLOCATION TRACKING (No loop needed)
    if (!navigator.geolocation) {
        if (start_output) start_output.innerHTML = "Geolocation støttes ikke.";
    } else {
        if (start_output) start_output.innerHTML = "Henter posisjon...";
        
        navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
            
                if (start_output) {
                    start_output.innerHTML = `
                        📍 <strong>Live Posisjon:</strong><br>
                        Breddegrad: ${lat}<br>
                        Lengdegrad: ${lon}<br><br>
                        <a href="https://maps.google.com/?q=${lat},${lon}" target="_blank">Åpne i Google Maps</a>
                    `;
                }
            },
            (error) => {
                if (start_output) start_output.innerHTML = "Feil: " + error.message;
            },
            { enableHighAccuracy: true }
        );
    }

    // 2. GYROSCOPE INITIALIZATION (Checks if it can run silently)
    // Note: iOS will require clicking your manual "Hent Gyroskop" button, 
    // but Android/Desktop will start tracking right here on load automatically!
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener('deviceorientation', handleOrientation);
    }
}





//copy pase code
function getLocation() {
      const output = document.getElementById("output");

      if (!navigator.geolocation) {
        output.innerHTML = "Geolocation støttes ikke.";
        return;
      }

      output.innerHTML = "Henter posisjon...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
    
        output.innerHTML += `
          <br><br>📍 <strong>Posisjon:</strong><br>
          Breddegrad: ${lat}<br>
          Lengdegrad: ${lon}<br>
          <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">Åpne i Google Maps</a>
        `;
      },
      (error) => {
        output.innerHTML = "Feil: " + error.message;
      }
    );
    }

function getBattery() {
      const output = document.getElementById("output");

      if (!navigator.getBattery) {
        output.innerHTML += "<br>⚠️ Batteri-API støttes ikke.";
        return;
      }

      navigator.getBattery().then((battery) => {
        const level = Math.round(battery.level * 100);
        const charging = battery.charging ? "Ja 🔌" : "Nei";

        output.innerHTML += `
          <br><br>🔋 <strong>Batteristatus:</strong><br>
          Nivå: ${level}%<br>
          Lader: ${charging}
        `;
      });
    }

function vibratePhone() {
      const output = document.getElementById("output");

      if (!navigator.vibrate) {
        output.innerHTML += "<br>⚠️ Vibrasjon støttes ikke.";
        return;
      }

      // Vibrasjonsmønster: vibrer – pause – vibrer
      navigator.vibrate([200, 100, 200]);

      output.innerHTML += "<br><br>📳 Telefon vibrerer!";
    }
//AI
function getOrientation() {//*Device Orientation
  const output = document.getElementById("Device_Orientation_button");

  // iOS requires explicit permission for device orientation
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          output.innerHTML = "Gyroskop-tilgang ble avvist.";
        }
      });
  } else {
    // Android and desktops don't require explicit permission popups
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

function handleOrientation(event) {//*Network Information
  const output = document.getElementById("output");
  const alpha = Math.round(event.alpha); // Rotation around z-axis (0-360)
  const beta = Math.round(event.beta);   // Front-to-back tilt (-180 to 180)
  const gamma = Math.round(event.gamma); // Left-to-right tilt (-90 to 90)

  output.innerHTML = `
    <br>🔄 <strong>Gyroskop data:</strong><br>
    Kompassretning: ${alpha}°<br>
    Tilt Forover/Bakover: ${beta}°<br>
    Tilt Venstre/Høyre: ${gamma}°
  `;
}
function checkNetwork() {//*Screen Orientation & Properties
  const output = document.getElementById("output");
  const isOnline = navigator.onLine ? "Ja, du er tilkoblet! 🌐" : "Nei, du er offline! ❌";

  output.innerHTML = `<br>📶 <strong>Nettverksstatus:</strong> ${isOnline}`;
}


function getScreenInfo() {
  const output = document.getElementById("output");
  const width = window.screen.width;
  const height = window.screen.height;
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const orientationType = isLandscape ? "Landskap (Vannrett) 📱" : "Portrett (Loddrett) 📱";

  output.innerHTML = `
    <br>🖥️ <strong>Skjerminfo:</strong><br>
    Oppløsning: ${width} x ${height} piksler<br>
    Retning: ${orientationType}
  `;
}

function speakText() {//*Text-to-Speech AP
  // Stop any speech that's currently running
  window.speechSynthesis.cancel(); 

  const speech = new SpeechSynthesisUtterance();
  speech.text = "Hei! Mobilinfoen din ser veldig bra ut.";
  speech.lang = "no-NO"; // Norwegian voice
  speech.volume = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);
}

function startLightSensor() {//*Device Light Level Sensor (Ambient Light API) ☀️
  const output = document.getElementById("light_output");

  if ('AmbientLightSensor' in window) {
    try {
      const sensor = new AmbientLightSensor();
      sensor.onreading = () => {
        output.innerHTML = `Lysnivå: ${sensor.illuminance} lux`;
        // Automatically change background if it's dark!
        if (sensor.illuminance < 20) {
          document.body.style.backgroundColor = "black";
          document.body.style.color = "white";
        }
      };
      sensor.start();
    } catch (err) {
      output.innerHTML = "Feil med lyssensor: " + err.message;
    }
  } else {
    // Fallback: Check if the phone's operating system is set to Dark Mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    output.innerHTML = prefersDark ? "Systemet ditt er i Mørk Modus 🌙" : "Systemet ditt er i Lys Modus ☀️";
  }
}

function getKameraInfo() {//*Visual & Audio Hardware Check (Media Devices) 📸
  const output = document.getElementById("media_output");

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    output.innerHTML = "Mediaenheter støttes ikke.";
    return;
  }

  navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      let videoCount = 0;
      let audioCount = 0;

      devices.forEach((device) => {
        if (device.kind === 'videoinput') videoCount++;
        if (device.kind === 'audioinput') audioCount++;
      });

      output.innerHTML = `
        <br>🎥 <strong>Maskinvare funnet:</strong><br>
        Antall kameraer: ${videoCount}<br>
        Antall mikrofoner: ${audioCount}
      `;
    })
    .catch((err) => {
      output.innerHTML = "Kunne ikke hente info: " + err.message;
    });
}

function shareApp() {//*Native Share Menu (Web Share API) 📤
  if (navigator.share) {
    navigator.share({
      title: 'Min Mobilinfo App',
      text: 'Sjekk ut denne kule nettsiden som henter live telefondata!',
      url: window.location.href
    })
    .then(() => console.log('Vellykket deling!'))
    .catch((error) => console.log('Deling avbrutt', error));
  } else {
    alert("Nativ deling støttes ikke på denne nettleseren.");
  }
}

//function nvan() { }

//  if (condition1) {   }
//   else if (condition2) {  } 
//   else { }

//  if (condition1 === '22' && condition2 === '11')   utfører hvis condition1 og condition2 er riktige

    //input
    //const navn = document.getElementById("navn").value;
    //console.log(navn);

    //output
    //document.getElementById("output").innerHTML = "Hello World";

    // leger til text i teden for å erstatte
    //document.getElementById("output").innerHTML += "Hello World";

//const nvan = navn2;   can ikke redigeres 
//let nvan = navn2;     kan redigeres

// for(var i = 0; i <= 12; i++) { } // looper fra 0 til 12
// while (true) { } looper til den blir stoppet


//window.location.href = "link"; // Change this URL to your first target

//  random number 
    //  Returns a random integer from 0 to 9:
    //  Math.floor(Math.random() * 10);

    //returns a random number between min and max (both included):
    // return Math.floor(Math.random() * (max - min + 1) ) + min;
//array
    //make an array                         let arr = [1, 2, 3, 4, 5]; // Array Declaration
    //Print the entire array                console.log(arr);
    //reverse array                         arr.reverse();
    //sort array                            (a, b) => a - b); // Ascending               arr.sort((a, b) => b - a); // Descending
    //Merge Two Arrays                      let merged = [...arr1, ...arr2];
    //remove duplicates let arraynavn       [...new Set(arr)];          arr.filter((item, index) => arr.indexOf(item) === index);
    //Find Maximum and Minimum              let max = Math.max(...arr);     let min = Math.min(...arr);
    //Sum of All Elements                   let sum = arr.reduce((acc, val) => acc + val, 0);
    //Check if Array Includes a Value       arr.includes(5);  // true or false
    //Find First Matching Element           let found = arr.find(x => x > 10);
    //Remove Specific Element               arr = arr.filter(item => item !== valueToRemove);
    //Get Unique Elements Only              let unique = arr.filter((item, index) => arr.indexOf(item) === index);

    
//sumboler    
    //   +  Addition
    //   -	Subtraction
    //   *	Multiplication
    //   **	Exponentiation 2^2
    //   /	Division
    //   %	Modulus (Division Remainder)
    //   ++	Increment
    //   --	Decrement

    // ==	equal to
    // ===	equal value and equal type
    // !=	not equal
    // !==	not equal value or not equal type
    // >	greater than
    // <	less than
    // >=	greater than or equal to
    // <=	less than or equal to
    // ?	ternary operator

    // &	&&  AND	
    // |    ||	OR	
    // ~	    NOT	
    // ^	    XOR