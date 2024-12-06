const {z} = require('zod');

const userSchema = z.object({
    username: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.enum(['admin','user'])
})

const trainSchema = z.object({
    train_name: z.string().min(5).max(20),
    source: z.string().min(5).max(20),
    destination: z.string().min(5).max(20),
    totalSeats: z.number().int(),
})

module.exports = {userSchema, trainSchema};