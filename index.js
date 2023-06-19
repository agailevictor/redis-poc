import {AggregateSteps, AggregateGroupByReducers, createClient, SchemaFieldTypes} from 'redis';
// Create a Redis client
const redisclient = createClient();

(async () => {
    await redisclient.connect();
})();
  
console.log("Connecting to the Redis");
  
redisclient.on("ready", () => {
    console.log("Connected!");
});
  
redisclient.on("error", (err) => {
    console.log("Error in the Connection");
});

try {
 
    await redisclient.ft.create('idx:one-access:audit:accept:terms', {
        '$.termsId': {
            type: SchemaFieldTypes.TEXT,
            AS: 'termsId'
        },
        '$.versionNo': {
            type: SchemaFieldTypes.NUMERIC,
            AS: 'versionNo'
        },
        '$.uaoId': {
            type: SchemaFieldTypes.TEXT,
            AS: 'uaoId'
        },
        '$.userId': {
            type: SchemaFieldTypes.TEXT,
            AS: 'userId'
        },
        '$.acceptedTime': {
            type: SchemaFieldTypes.NUMERIC,
            AS: 'acceptedTime',
            SORTABLE: true
        },
    }, {
        ON: 'JSON',
        PREFIX: 'one-access:audit:accept:terms:'
    });

    // FT.CREATE idx:one-access:audit:accept:terms ON JSON PREFIX 1 "one-access:audit:accept:terms:" SCHEMA $.termsId AS termsId TEXT $.versionNo AS versionNo NUMERIC $.uaoId AS uaoId AS uaoId TEXT $.userId AS userId TEXT $.acceptedTime AS acceptedTime NUMERIC SORTABLE
    // await redisclient.ft.create('idx:users', {
    //     '$.name': {
    //         type: SchemaFieldTypes.TEXT,
    //         SORTABLE: true
    //     },
    //     '$.city': {
    //         type: SchemaFieldTypes.TEXT,
    //         AS: 'city'
    //     },
    //     '$.age': {
    //         type: SchemaFieldTypes.NUMERIC,
    //         AS: 'age'
    //     }
    // }, {
    //     ON: 'JSON',
    //     PREFIX: 'user:'
    // });
} catch (e) {
    if (e.message === 'Index already exists') {
        console.log('Index exists already, skipped creation.');
    } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(e);
        process.exit(1);
    }
}

await Promise.all([
  redisclient.json.set('one-access:audit:accept:terms:1', '$', {
    termsId: "term1",
    versionNo: 1,
    uaoId: "uao1",
    userId: "user1",
    acceptedTime: 1624094400  // Unix timestamp for June 19, 2021, 00:00:00 UTC
  }),
  redisclient.json.set('one-access:audit:accept:terms:2', '$', {
    termsId: "term2",
    versionNo: 1,
    uaoId: "uao1",
    userId: "user1",
    acceptedTime: 1624174800  // Unix timestamp for June 20, 2021, 00:00:00 UTC
  }),
  redisclient.json.set('one-access:audit:accept:terms:3', '$', {
    termsId: "term3",
    versionNo: 1,
    uaoId: "uao1",
    userId: "user1",
    acceptedTime: 1624255200  // Unix timestamp for June 21, 2021, 00:00:00 UTC
  }),
  redisclient.json.set('one-access:audit:accept:terms:4', '$', {
    termsId: "term1",
    versionNo: 1,
    uaoId: "uao2",
    userId: "user2",
    acceptedTime: 1624335600  // Unix timestamp for June 22, 2021, 00:00:00 UTC
  }),
  redisclient.json.set('one-access:audit:accept:terms:5', '$', {
    termsId: "term2",
    versionNo: 1,
    uaoId: "uao2",
    userId: "user2",
    acceptedTime: 1624416000  // Unix timestamp for June 23, 2021, 00:00:00 UTC
  }),
  redisclient.json.set('one-access:audit:accept:terms:6', '$', {
    termsId: "term3",
    versionNo: 1,
    uaoId: "uao2",
    userId: "user2",
    acceptedTime: 1624496400  // Unix timestamp for June 24, 2021, 00:00:00 UTC
  })
]);



// await Promise.all([
//     redisclient.json.set('user:1', '$', {
//         "name": "Paul John",
//         "email": "paul.john@example.com",
//         "age": 42,
//         "city": "London"
//     }),
//     redisclient.json.set('user:2', '$', {
//         "name": "Eden Zamir",
//         "email": "eden.zamir@example.com",
//         "age": 29,
//         "city": "Tel Aviv"
//     }),
//     redisclient.json.set('user:3', '$', {
//         "name": "Paul Zamir",
//         "email": "paul.zamir@example.com",
//         "age": 35,
//         "city": "Tel Aviv"
//     }),
// ]);