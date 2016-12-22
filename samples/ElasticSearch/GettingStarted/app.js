var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    //log: 'trace'
});

Promise.resolve()
    .then(ping)
    //.then(index)
    //.then(get)
    .then(search)
    // .then(function(res) {
    //     console.log(res);
    // })
    .catch(function(err) {
        console.log("ERROR", err);
    });

function get() {
    return client.get({
        index: 'myindex',
        type: 'contact',
        id: 1
    }).then(function (response) {
        console.log("Ori found", response);

        return response;
    });

}

function ping() {
    return client.ping({
        requestTimeout: 30000,
    }).then(function () {
        //console.log("Cluster is OK");
    }).catch(function(err) {
        throw err;
    });
}

function index() {
    return client.index({
        index: 'myindex',
        type: 'contact',
        id: '2',
        body: {
            name: 'OriCalvo',
            email: 'ori@gmail.com',
        }
    }).then(function () {
        //console.log("Ori added or updated");
    });
}

function search() {
    return client.search({
        index: 'myindex',
        type: 'contact',
        body: {
            query: {
                match: {
                    name: 'Ori'
                }
            }
        }
    }).then(function (resp) {
        //console.log(resp);

        resp.hits.hits.forEach(function(hit) {
            console.log(hit);
        });

        if(resp.hits.hits.length > 0) {
            console.log("Ori found");
        }
        else {
            console.log("Ori NOT found");
        }
    });
}