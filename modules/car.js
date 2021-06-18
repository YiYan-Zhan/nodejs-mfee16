const car = {
    brand: "FORD",
    color: "Red",
    owner: "Vincent Jan",
};

exports.getOwner = function () {
    return car.owner;
};

exports.setOwner = function (owner) {
    car.owner = owner;
};

exports.car = car;
