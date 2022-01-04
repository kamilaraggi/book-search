const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, contex) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
        },
     Mutation: {
       addUser: async (parent, args) => {
                const user = await User.create(args);
                const token = signToken(user);
    
                return { token, user };
            },
      login: async (parent, { email, password }) => {
                const user = await User.findOne({ email });
    
                if (!user) {
                    throw new AuthenticationError('Incorrect credentials');
                }
    
                const correctPw = await user.isCorrectPassword(password);
    
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect credentials');
                }
    
                const token = signToken(user);
                return { token, user }
            },
            
      addBook: async (parent, { booksData }, context) => {
                if (context.user) {
                    const updateBook = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { addedBooks: booksData }},
                        { new: true }
                    );
    
                    return updateBook;
                }
            },


      deleteBook: async (parent, { bookId }, context) => {
    
        if (context.user) {

      const updateBook = await User.fineOneAndUpdate(
      { _id: context.user._id },
      { $pull: { addedBooks: { bookId }}},
       { new: true }
      )
    
      return updateBook;
       }
      }
     }
    }
    
    module.exports = resolvers;            