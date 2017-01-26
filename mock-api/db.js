module.exports = (function () {
    var _ = require('lodash');
    var faker = require('faker');
    return {
        Person: _.times(10, function (n) {
            return {
                Id: n + 1,
                LastName: faker.name.lastName(),
                FirstName: faker.name.firstName()
            }
        })
    }
})();