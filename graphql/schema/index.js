const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    input UserInput {
        address: String!
        email: String!
        fName: String!
        lName: String!
        password: String!
    }

    type AuthData {
        userId: ID!
        address: String!
        fName: String!
        lName: String!
        token: String!
        tokenExpiration: Int!
        refreshToken: ID!
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
        login(email: String!, password: String!): AuthData!
        logout: String
        refreshSession: AuthData!
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
