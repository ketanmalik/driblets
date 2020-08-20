const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    input ReportData {
        address: String!
        date: String!
        description: String
        intensity: String!
        objectId: String!
        status: String!
        trackingId: String!
    }

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

    type Report {
        _id: ID!
        address: String!
        creator: User!
        date: String!
        description: String!
        intensity: String!
        objectId: String!
        status: String!
        trackingId: String!
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
        addReport(report: ReportData): Report
        createUser(userInput: UserInput): User
    }
    
    schema{
        query: RootQuery
        mutation: RootMutation
    }`);
