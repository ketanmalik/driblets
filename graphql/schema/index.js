const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    input UserInput {
        address: String!
        email: String!
        fName: String!
        lName: String!
        password: String!
    }

    type User {
        _id: String!
        address: String!
        email: String!
        fName: String!
        lName: String!
        password: String
    }


    type RootQuery {
        test: String
        users: [User!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }
    
    schema{
        query: RootQuery
        mutation: RootMutation
    }`);
