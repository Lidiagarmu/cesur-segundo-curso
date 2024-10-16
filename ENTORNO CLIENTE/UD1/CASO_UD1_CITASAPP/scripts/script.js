const buttonReservar = document.querySelector("#reservar");
console.log("buttom reservar", buttonReservar);


//funcion que se va a lanzar cuando hagamos click en Reservar
const handleClick = (event) => {

    //evita la recarga o render de la pagina 
    event.preventDefault();
   
    //seleccionamos inputs para ver su valor
    const inputNombreValue = document.querySelector("#name").value;
    const inputApellidoValue = document.querySelector("#surname").value;
    const inputFechaValue = document.querySelector("#date").value;
   

    //verificamos que los inputs tengan valor
    if (inputNombreValue === "" && inputApellidoValue === "" && inputFechaValue === "") {

        //en caso de NO tener valor, seleccionamos div y cambiamos su display a inline para que se vea en pantalla la alerta
        const alertDiv = document.querySelector("#alert");
        alertDiv.style.display= "inline";

        //una vez mostrada la alerta, seleccionamos boton OK del div 
        //añadimos el escuchador del evento click y cambiamos de nuevo su display a none para que no se muestre en pantalla
        const okButton =alertDiv.querySelector("button");
        okButton.addEventListener("click", () => alertDiv.style.display = "none" ) ;
        return          
    } 

    //cambiamos el H1 
    const tituloPrincipal = document.querySelector("h1");
    tituloPrincipal.textContent = "¡Confirmado!"

    //seleccionamos el main entero y lo vaciamos 
    const main = document.querySelector("main");
    main.innerHTML= "";

    //creamos template y se lo metemos al main
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

        const volverButton = document.querySelector ("#back");
        volverButton.addEventListener("click", () => {
            main.innerHTML="";

              //cambiamos el H1 de nuevo
             tituloPrincipal.textContent = "RESERVE SU CITA"
            
             //cambiamos el main de nuevo
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

// ESCUCHADOR DE EVENTO. Al hacer click en Reservar ejecutamos función handleClick
buttonReservar.addEventListener("click", (event) => handleClick(event));

//FUNCION que limita la fecha al dia actu"al

const limitDate = () => {
const inputDate = document.querySelector("#date");
const currentYear = new Date ().getFullYear();
const currentMonth = new Date ().getMonth();
const currentDay = new Date ().getDate();
inputDate.min = `${currentYear}-${currentMonth+1}-${currentDay}`

}

//ejecutamos la función que nos limita la fecha
limitDate();