'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

function step1(rentals, cars) {
    for (var i = 0; i < rentals.length; i++) {
        var datePick = new Date(rentals[i].pickupDate);
        var dateReturn = new Date(rentals[i].returnDate);
        var priceDay = 0;
        var priceKM = 0;
        var distance = rentals[i].distance;
        for (var j = 0; j < cars.length; j++) {
            if (rentals[i].carId == cars[j].id) {
                priceDay = cars[j].pricePerDay;
                priceKM = cars[j].pricePerKm;
            }
        }
        rentals[i].price = rental_price(datePick, dateReturn, priceDay, priceKM, distance);
    }

}
function rental_price(datePick, dateReturn, priceDay, priceKM, distance) {
    var Day = day(datePick, dateReturn) + 1;
    return Day * priceDay + distance * priceKM;
}

function day(datePick, dateReturn) {
    return (dateReturn - datePick) / (1000 * 60 * 60 * 24);

}

function step2(rentals) {
    for (var i = 0; i < rentals.length; i++) {
        var datePick = new Date(rentals[i].pickupDate);
        var dateReturn = new Date(rentals[i].returnDate);
        var difference = day(datePick, dateReturn);
        if (difference >= 1 && difference < 4) {
            rentals[i].price = rentals[i].price * 0.9;
        }
        else if (difference >= 4 && difference < 10) {
            rentals[i].price = rentals[i].price * 0.7;
        }

        else { rentals[i].price = rentals[i].price * 0.5; }


    }

}

function step3(rentals) {
    for (var i = 0; i < rentals.length; i++) {
        var commission = 0.3 * rentals[i].price;
        var datePick = new Date(rentals[i].pickupDate);
        var dateReturn = new Date(rentals[i].returnDate);
        var difference = day(datePick, dateReturn);
        rentals[i].commission['insurance'] = 0.5 * commission;
        rentals[i].commission['treasury'] = difference * 1;
        rentals[i].commission['virtuo'] = commission - rentals[i].commission['insurance'] - rentals[i].commission['treasury']
       
    }
}

function step4(rentals) {
    for (var i = 0; i < rentals.length; i++) {
        if (rentals[i].options['deductibleReduction'] == 'true') {
            var datePick = new Date(rentals[i].pickupDate);
            var dateReturn = new Date(rentals[i].returnDate);
            var difference = day(datePick, dateReturn);
            rentals[i].price += 4 * difference;
        }
    }
}

function step5(rentals, actors) {
    for (var i = 0; i < rentals.length; i++) {
        for (var j = 0; j < actors[i]['payment'].length; j++) {
            if (actors[i]['payment'][j]['who'] == 'driver') {
                var datePick = new Date(rentals[i].pickupDate);
                var dateReturn = new Date(rentals[i].returnDate);
                var difference = day(datePick, dateReturn);
                var reduction = 4 * difference;

                if (rentals[i].options['deductibleReduction'] == 'true') {
                    actors[i]['payment'][j]['amount'] = rentals[i].price + reduction;

                }
                else { actors[i]['payment'][j]['amount'] = rentals[i].price; }

            }

            else if (actors[i]['payment'][j]['who'] == 'partner') {
                actors[i]['payment'][j]['amount'] = 0.7 * rentals[i].price;
            }
            else if (actors[i]['payment'][j]['who'] == 'insurance') {
                actors[i]['payment'][j]['amount'] = rentals[i].commission['insurance'];
            }

            else if (actors[i]['payment'][j]['who'] == 'treasury') {
                actors[i]['payment'][j]['amount'] = rentals[i].commission['treasury'];
            }

            else {
                var datePick = new Date(rentals[i].pickupDate);
                var dateReturn = new Date(rentals[i].returnDate);
                var difference = day(datePick, dateReturn);
                var reduction = 4 * difference;

                if (rentals[i].options['deductibleReduction'] == 'true') {
                    actors[i]['payment'][j]['amount'] = rentals[i].commission['virtuo'] + reduction;

                }
                else {
                    actors[i]['payment'][j]['amount'] = rentals[i].commission['virtuo'];
                }

            }
        }
    }
}

    

step1(rentals, cars);
step2(rentals);
step3(rentals);
step4(rentals);
step5(rentals, actors);

//console.log(rentals);
console.log(actors);