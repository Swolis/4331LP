const { MongoClient } = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    // this is our Database Connection String
    const uri = "mongodb+srv://buisnessInABox:GZW2YHtng2qNTMUo@cluster0.jvawjrm.mongodb.net/?retryWrites=true&w=majority";


    //since we have no API rn this is just a way to assign values to our collections and DB
    var name="John James"
    var username="yourWelcome"
    var password="thankYou"
    var companyName="00000"
    var email="johndoe@example.com"
    var dbName="test3"

//creates our Mongo Client
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        //we add our new registered user to ourClients collection
        await addClient(client,
            {
            name: name,
            username:username,
            password:password,
            companyName:companyName,
            email: email,
            dbName:dbName,
            signup_date: "2023-10-24T00:00:00Z",
            }
            
            );
            //we Create our database for our client as well as an employee collectoin
        await createEmployeeCollection(dbName,client,
            {
                name: "Lovely Loft",
                summary: "A charming loft in Paris",
                bedrooms: 1,
                bathrooms: 1
            }
        );
        //we create our ingridients collection
        await createIngridientCollection(dbName,client,
            {
                name: "Lovely Loft",
                summary: "A charming loft in Paris1",
                bedrooms: 1,
                bathrooms: 1
            }
        );
        //we create our recipie collection
        await createRecipieCollection(dbName,client,
            {
                name: "Lovely Loft",
                summary: "A charming loft in Paris2",
                bedrooms: 1,
                bathrooms: 1
            }
        );

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function addClient(client, newListing){
    const result = await client.db("Clients").collection("ourClients").insertOne(newListing);
    
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function createEmployeeCollection(name,client, newListing){
    const result = await client.db(name).collection("employee").insertOne(newListing);
    
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function createIngridientCollection(name,client, newListing){
    
    const result = await client.db(name).collection("products").insertOne(newListing);
    
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function createRecipieCollection(name,client, newListing){
    
    const result = await client.db(name).collection("recipie").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
