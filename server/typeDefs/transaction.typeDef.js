const transactionTypeDef = `#graphql
type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    user: User!
}

type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
    categoryStatistics: [CategoryStatistics!]
}

type CategoryStatistics {
    category: String!
    amount: Float!
}

type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
}

input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
}

input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    date: String
}
`
export default transactionTypeDef;