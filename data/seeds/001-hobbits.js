exports.seed = function (knex) {
    // delets all existing entries
    return knex("hobbits").then(function () {
        // inserts seed entries
        return knex("hobbits").insert([
            { name: "Frodo", age: 224 },
            { name: "Samwise", age: 227 },
            { name: "Merry", age: 218 },
            { name: "Pippin", age: 216 },
            { name: "Bilbo", age: 711 }
        ]);
    });
};
