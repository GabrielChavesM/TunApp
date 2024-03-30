const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require("./config")

const app = express()

// Convert data into JSON format
app.use(express.json())

app.use(express.urlencoded({extended: false}))

// Use EJS as the view engine
app.set('view engine', 'ejs')

// Static file
app.use(express.static("public"))

app.get("/", (req, res) =>{
    res.render("login")
})

app.get("/signup", (req, res) =>{
    res.render("signup")
})

// Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    // Check if the user already exists in the database
    const existingUserName = await collection.findOne({name: data.name})
    const existingUserEmail = await collection.findOne({email: data.email})
    if(existingUserName || existingUserEmail) {
        res.send("<script>alert('Usuário já existente. Tente novamente com outro nome ou email.'); window.location='/signup';</script>");
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10 // Number of salt rounds to bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashedPassword // Replace the hash password with the original password
        const userdata = await collection.insertMany(data)
        console.log(userdata)
    }
})

// Login user
app.post("/login", async (req, res) => {
    try {
        const checkName = await collection.findOne({ name: req.body.username })
        const checkEmail = await collection.findOne({ email: req.body.email })

        if (!checkName || !checkEmail) {
            res.send("<script>alert('Nome de usuário ou email não se encontram registados.'); window.location='/';</script>");
            return; // Adding return to prevent further execution
        }

        // Determine which field to use for comparison
        const userToCheck = checkName ? checkName : checkEmail;

        // Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, userToCheck.password)
        if (isPasswordMatch) {
            res.render("home")
        } else {
            res.send("<script>alert('Palavra-passe incorreta.'); window.location='/';</script>");
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred while logging in.");
    }
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
