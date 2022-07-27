var isSumOdd = Object.assign(function (x, y) {
    return (x + y) % 2 === 0;
}, {
    type: 'oddChecker',
    calculate: function (x, y) {
        return x + y;
    }
});
console.log(isSumOdd(1, 2));
console.log(isSumOdd.type);
console.log(isSumOdd.calculate(1, 2));
