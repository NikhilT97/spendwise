const mongoose = require('mongoose')

const connectDB = async() => {

        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log('💚Database - connected')
        } catch (error) {
            console.log('💔Database - unable to connect',error.message)
            
        }

    
}

module.exports = connectDB;