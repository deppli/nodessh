

function a(){
    var b=1;
    return function(){
        b++;
        console.log(b);
    }
}
var c=a();
c();
c();
