 /* Pregunta: ¿Cuál es la función de 'document.getElementById' en JavaScript? */
        /* para seleccionar y acceder a un elemento del DOM por su atributi id */
        function checkAnswer() {
            /* Pregunta: ¿Qué hace 'prompt' y cómo se puede usar en lugar de 'alert'? */
            /* 'promt' cuadro de texto que se solicita al usuario para que ingrese algun valor y 'alert' solo muestra algun mensaje */
            let answer = prompt("Enter your answer:");

            /* Pregunta: ¿Cuál es el propósito de la instrucción 'if' en este fragmento de código? */
            /* verificar si el valor de la variable 'aswer' es igual a 'paris'  */
            if (answer.toLowerCase() === 'paris') {
                alert("Correct!");
            } else {
                alert("Try again!");
            }
        }

        /* Pregunta: ¿Cómo se puede manipular el DOM usando JavaScript para cambiar el contenido de un elemento? */
        document.getElementById("question").innerText = "What is the capital of Spain?";