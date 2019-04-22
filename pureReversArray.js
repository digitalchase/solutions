//Проблема метода Array.prototype.reverse()в том, что он изменяет массив который мы пытаемся развернуть, а это не очень хорошо, ведь в коде где то дальше, нам может понадобится тот же самый массив, но не перевернутый

//Поэтому вот вариант функции через Array.prototype.reduce();

let array = [0,1,2,3];

function pureReverse(arr) {
  return arr.reduce(function(ar, el) {
    return [el, ...ar]
  }, []);
}
