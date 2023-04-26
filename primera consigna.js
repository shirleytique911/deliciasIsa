// ressultado de notas de un grupo de alumnos"x" con promedio y estado reeprobado y aprobado


let notas;
let promedio;
let suma=0




function bienvenido(alumno){
    let nombre=prompt(" Nombre del estudiante")
    if(nombre !== ""){
        alert("hola puedes continuar," + nombre)
    }else{
        alert("No  encontramos registro de notas de este alumno")
    }


    console.log("recuerde ingresar las notas a promediar, " + alumno)
    


}

bienvenido()


let resultado= parseInt(prompt("Digite la cantidad de notas a promediar del alumno"));
for(i=0; i< resultado; i++){
    let notas= parseInt(prompt("Digita la nota del alumno " + i));
    suma = suma + notas;
}
promedio = suma / resultado;

if(promedio >=50){
    console.log("su nota es "+promedio+" Aprobado.");
}else{
     console.log("su nota es "+promedio+" Reprobado.");
}

//para continuar consultando otro alumno

alert("Quiere seguir consultando")
let seguir =prompt("puedes seguir consultando")


if(seguir !=""){
    console.log ( bienvenido() )
    let resultado= parseInt(prompt("Digite la cantidad de notas a promediar del alumno"));
for(i=0; i< resultado; i++){
    let notas= parseInt(prompt("Digita la nota del alumno " + i));
    suma = suma + notas;
}
promedio = suma / resultado;

if(promedio >=50){
    console.log("su nota es "+promedio+" Aprobado.");
}else if(promedio <=50){
     console.log("su nota es "+promedio+" Reprobado.");
}else{
console.log("Numero de consultas completadas")
}

}









