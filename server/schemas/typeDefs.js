const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addedBook(booksData: BookInput!): User
        deleteBook(bookId: ID!): User
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        addedBooks: [Book]
    }
    
    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
    type Auth {
        token: ID!
        user: User
    }
`;

module.exports - typeDefs