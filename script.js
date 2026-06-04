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