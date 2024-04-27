import User from "../models/user.model.js";
import { object, string } from 'yup';
import jwt from 'jsonwebtoken';

let userValidation = object({
    name: string().required().min(2).max(12),
    email: string().email().required(),
    password: string().required()
        .test('password', 'Password must contain at least one letter, one number and be at least 4 characters long', (value) => {
            return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/.test(value)
        })  // Password must contain at least one letter, one number and be at least 4 characters long
})

const genearteJWT = (user) => {
    return jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "10d"
    })
}

const register = async (req, res) => {
    try {
        const isValid = userValidation.validateSync(req.body)
        if (!isValid) {
            throw new Error("Invalid data");
        }
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new Error("User already exists");
        }
        const user = new User(req.body)
        await user.save()
        console.log(user);
        return res.status(201).json({ message: "User created Successfully", user })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("User not found")
        }
        if (password === user.password) {
            const token = genearteJWT(user)
            console.log(token);
            return res
                .status(200)
                .cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
                    sameSite: "none"
                })
                .json({ message: "Login Successful", user, token })
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.id).populate("todos")
        // console.log(user);
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.json({ error: 'Failed to logout' });
            }

            res.clearCookie('sid'); // replace 'sid' with the name of your session cookie
            return res.json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }

}


export {
    register,
    login,
    getCurrentUser,
    logout
}