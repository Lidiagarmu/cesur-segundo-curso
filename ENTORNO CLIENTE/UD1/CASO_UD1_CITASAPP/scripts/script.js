
//-----------------------------------------------------------------------------------------------------//

//funcion que se va a lanzar cuando hagamos click en Reservar


//Seleccionamos el boton reservar
const buttonReservar = document.querySelector("#reservar");
console.log("buttom reservar", buttonReservar);

//funcion handleClick
const handleClick = (event) => {

    //1 - evita la recarga o render de la pagina 
    event.preventDefault();
   
    //2 - seleccionamos inputs para ver su valor
    const inputNombreValue = document.querySelector("#name").value;
    const inputApellidoValue = document.querySelector("#surname").value;
    const inputFechaValue = document.querySelector("#date").value;
   

    // 3 - verificamos que los inputs tengan valor, es decir, que el usuario haya rellenado los campos
    if (inputNombreValue === "" && inputApellidoValue === "" && inputFechaValue === "") {

        //en caso de NO tener valor, seleccionamos div y cambiamos su display a inline para que se vea en pantalla la alerta
        const alertDiv = document.querySelector("#alert");
        alertDiv.style.display= "inline";

        //una vez mostrada la alerta, seleccionamos boton OK del div 
        //añadimos el escuchador del evento click y cambiamos de nuevo su display a none para que no se muestre en pantalla la alerta ni el boton
        const okButton =alertDiv.querySelector("button");
        okButton.addEventListener("click", () => alertDiv.style.display = "none" ) ;
        return          
    } 



    // 4.1 - Una vez hecho click en Reservar, cambiamos el H1 a !Confirmado!
    const tituloPrincipal = document.querySelector("h1");
    tituloPrincipal.textContent = "¡Confirmado!"

    // 4.2 - seleccionamos el main entero y lo vaciamos para que solo muestre el nuevo H1 
    const main = document.querySelector("main");
    main.innerHTML= "";

    // 4.3 - creamos template dentro del script y se lo metemos al main para que muestre los datos de la reserva que introdujo el usuario
    main.innerHTML= `  
        <div>
        
            <div id="info">
                <p>Sr/Sra ${inputNombreValue} ${inputApellidoValue} </p>
                <p>Ha reservado cita para el día ${inputFechaValue} </p>
            </div>

            <div>
            <button type="button" id="back">Volver</button>
            </div>

        </div>`;



        // 5 - seleccionamos boton Volver. Y cuando hagamos clic sobre el:
        
        const volverButton = document.querySelector ("#back");
        volverButton.addEventListener("click", () => {
            main.innerHTML="";

              // 5.1 - cambiamos el H1 de nuevo
             tituloPrincipal.textContent = "RESERVE SU CITA"


             // 5.2 cambiamos el main de nuevo con un nuevo template dentro del script
             main.innerHTML = `

            <form>

                <div>
                    <label for="name">Nombre:</label>
                    <input type="text" id="name"/>
                </div>

                <div>
                    <label for="surname">Apellidos:</label>
                    <input type="text" id="surname"/>
                </div>

                <div>
                    <label for="date">Fecha de reserva:</label>
                    <input type="date"  id="date"/>
                </div>

                <div>
                    <button type="submit" id="reservar">Reservar</button>
                    <button type="reset">Borrar formulario</button>
                </div>

        </form>

        <div id="alert">
            <p>Obligatorio rellenar todos los campos</p>
            <button type="button" id="confirm">OK</button>
        </div>`
        
        })
}


//-----------------------------------------------------------------------------------------------------//



// ESCUCHADOR DE EVENTO. Al hacer click en Reservar ejecutamos función handleClick
buttonReservar.addEventListener("click", (event) => handleClick(event));


//-----------------------------------------------------------------------------------------------------//

//FUNCION que limita la fecha al dia actual
const limitDate = () => {
const inputDate = document.querySelector("#date");
const currentYear = new Date ().getFullYear();
const currentMonth = new Date ().getMonth();
const currentDay = new Date ().getDate();
inputDate.min = `${currentYear}-${currentMonth+1}-${currentDay}`

}

//ejecutamos la función que nos limita la fecha
limitDate();