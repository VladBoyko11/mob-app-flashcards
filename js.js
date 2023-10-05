var sound = 'grunt'
var bear = { sound: 'roar'}

function roar(){
    console.log(this.sound)
}

roar.apply(bear)