
//Aquí se selecciona el elemento HTML con el id="display". Este elemento sería, por ejemplo, el 
//cuadro de texto donde se mostrará la entrada y el resultado de la calculadora.
let display = document.getElementById('display');

/*
Se seleccionan todos los elementos HTML que tengan la clase btn. Como getElementsByClassName devuelve una c
olección tipo "array" (HTMLCollection), se convierte en un verdadero array con Array.from para poder aplicar
 funciones como map
*/
let buttons = Array.from(document.getElementsByClassName('btn'));


/*Se recorre el array de botones con map, y para cada botón se le añade un "escuchador" del evento click. 
sto significa que cuando se haga clic en cualquiera de los botones, se ejecutará el código dentro de la 
función addEventListener */

buttons.map(button => {
    button.addEventListener('click', (e) => {

        /*Si el botón clicado tiene el id="clear", esto significa que el botón de "limpiar" fue presionado, por lo
         que se vacía el campo de visualización (display.value = ''). */
        if(e.target.id === 'clear') {
            display.value = '';

            /*Si el botón clicado tiene el id="equals", que generalmente sería el botón "=", intenta evaluar
             la expresión que está escrita en el campo de visualización usando eval().

        - eval(display.value) toma el contenido de display.value (que sería una cadena como 2+3*4) y evalúa esa 
        expresión matemática.
        - Si la evaluación tiene éxito, se muestra el resultado.
        - Si hay algún error (por ejemplo, si la expresión es inválida), el catch captura el error y 
        muestra "Error" en lugar de bloquear la aplicación. */
        } else if (e.target.id === 'equals') {
            try {
                display.value = eval(display.value);
            }catch {
                display.value = "Error";
            }
            /*Para todos los demás botones (números y operadores como +, -, *, etc.), se obtiene el valor almacenado
             en el atributo data-value del botón presionado. Este valor se añade al campo de visualización.

            Por ejemplo, si haces clic en el botón con data-value="2", se añadirá "2" al final de la expresión en
             display.value */
        } else {
            display.value += e.target.getAttribute('data-value');
        }
        });
    });
