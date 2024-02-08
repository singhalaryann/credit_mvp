// Updated Code -- 

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config()
// }

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const passport = require("passport");
// const initializePassport = require("./passport-config");
// const flash = require("express-flash");
// const session = require("express-session");
// const methodOverride = require("method-override");         
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// );

// const users = [];

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({extended: false}));
// app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(methodOverride("_method"));

// mongoose.connect('mongodb+srv://admin:Ayushcha1234@cluster0.qwiwpgv.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// app.use(cors());
// app.use(bodyParser.json());

// // Lender Schema
// const lenderSchema = new mongoose.Schema({
//   name: String,
//   role: { type: String, default: 'lender' },
//   email: { type: String, unique: true },
//   password: String,
// });

// const Lender = mongoose.model('Lender', lenderSchema);

// // Borrower Schema
// const borrowerSchema = new mongoose.Schema({
//   name: String,
//   role: { type: String, default: 'borrower' },
//   email: { type: String, unique: true },
//   password: String,
// });

// const Borrower = mongoose.model('Borrower', borrowerSchema);

// // Underwriter Schema
// const underwriterSchema = new mongoose.Schema({
//   name: String,
//   role: { type: String, default: 'underwriter' },
//   email: { type: String, unique: true },
//   password: String,
// });

// const Underwriter = mongoose.model('Underwriter', underwriterSchema);

// // Registration Endpoint
// app.post('/register', checkNotAuthenticated,  async (req, res) => {
//   try {
//     body_text = req.body
//     // name = body_text.name
//     role = body_text.role
//     email = body_text.email
//     const hashedPassword = await bcrypt.hash(body_text.password, 10);

//     // let newUser;
//     switch (role) {
//       case 'borrower':
        
//         const existingBorrower = await Borrower.findOne({ email });
//         if (existingBorrower) {
//           return res.status(409).json({ success: false, message: 'Email already registered' });
//         }

//         newUser = new Borrower({
//           name: body_text.name, 
//           email: body_text.email, 
//           password: hashedPassword, 
//           role: body_text.role,
//         });
//         break;

//       case 'lender':
//         const existingLender = await Lender.findOne({ email });
//         if (existingLender) {
//           return res.status(409).json({ success: false, message: 'Email already registered' });
//         }

//         newUser = new Lender({
//           name: body_text.name,
//           email: body_text.email,
//           password: hashedPassword,
//           role: body_text.role,
//         });
//         break;

//       case 'underwriter':

//         const existingUnderwriter = await Underwriter.findOne({ email });
        
//         if (existingUnderwriter) {
//           return res.status(409).json({ success: false, message: 'Email already registered' });
//         }

//         newUser = new Underwriter({
//           name: body_text.name,
//           email: body_text.email,
//           password: hashedPassword,
//           role: body_text.role,
//         });
//         break;

//       default:
//         return res.status(400).json({ success: false, message: 'Invalid role specified' });
//     }

//     await newUser.save();

//     console.log(`${role} registered successfully`);
//     res.json({ success: true, message: `${role} registered successfully` });
//   } catch (error) {
//     console.error(`Error during registration:`, error);
//     res.status(500).json({ success: false, message: `An error occurred during registration` });
//   }
// });

// // Login Endpoint
// // Login Endpoint
// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await Lender.findOne({ email }) || await Borrower.findOne({ email }) || await Underwriter.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Send user profile data along with success message
//     res.json({
//       success: true,
//       message: 'Login successful',
//       role: user.role,
//       profile: {
//         name: user.name,
//         email: user.email
//       },
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ success: false, message: `An error occurred during login: ${error.message}` });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// // Get User Data Endpoint
// app.get('/user/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     res.json({
//       success: true,
//       message: 'User data retrieved successfully',
//       userData: {
//         name: user.name,
//         email: user.email,
//         bio: user.bio,
//         linkedin: user.linkedin,
//         investorType: user.investorType,
//         fundSize: user.fundSize,
//         geography: user.geography,
//         accreditedStatus: user.accreditedStatus,
//         preferredYield: user.preferredYield,
//         assetPreference: user.assetPreference,
//       },
//     });
//   } catch (error) {
//     console.error('Error during user data retrieval:', error);
//     res.status(500).json({ success: false, message: 'An error occurred during user data retrieval' });
//   }
// });

// // Get Underwriter Data Endpoint
// app.get('/getunderwriterData', async (req, res) => {
//   try {
//     const underwriterData = await Underwriter.find({ role: 'underwriter' });
//     console.log("data", underwriterData);

//     if (!underwriterData || underwriterData.length === 0) {
//       return res.status(404).json({ success: false, message: 'Underwriter data not found' });
//     }
  
//     res.json({
//       success: true,
//       message: 'Underwriter data retrieved successfully',
//       underwriterData: underwriterData.map(user => ({
//         name: user.name,
//         email: user.email,
//         bio: user.bio,
//         linkedin: user.linkedin,
//         website: user.website,
//         geography: user.geography,
//         underwriterType: user.underwriterType,
//         assetSpeciality: user.assetSpeciality,
//         creditRating: user.creditRating,
//         education: user.education,
//         professionalExperience: user.professionalExperience,
//         totalLoansUnderwritten: user.totalLoansUnderwritten,
//       })),
//     });
//   } catch (error) {
//     console.error('Error during underwriter data retrieval:', error);
//     res.status(500).json({ success: false, message: 'An error occurred during underwriter data retrieval' });
//   }
// });
// // Add this endpoint for fetching borrower data
// app.get('/getborrowerData', async (req, res) => {
//   try {
//     const borrowerData = await Borrower.find({ role: 'borrower' });

//     if (!borrowerData || borrowerData.length === 0) {
//       return res.status(404).json({ success: false, message: 'Borrower data not found' });
//     }

//     res.json({
//       success: true,
//       message: 'Borrower data retrieved successfully',
//       borrowerData: borrowerData.map(user => ({
//         name: user.name,
//         email: user.email,
//         bio: user.bio,
//         linkedin: user.linkedin,
//         website: user.website,
//         geography: user.geography,
//         creditRating: user.creditRating,
//         aum: user.aum,
//         npas: user.npas,
//         assetType: user.assetType,
//         foundedYear: user.foundedYear,
//         linkToDeck: user.linkToDeck,
//         fundingStage: user.fundingStage,
//       })),
//     });
//   } catch (error) {
//     console.error('Error during borrower data retrieval:', error);
//     res.status(500).json({ success: false, message: 'An error occurred during borrower data retrieval' });
//   }
// });
// // Add this endpoint for fetching lender data
// app.get('/getlenderData', async (req, res) => {
//   try {
//     const lenderData = await Lender.find({ role: 'lender' });

//     if (!lenderData || lenderData.length === 0) {
//       return res.status(404).json({ success: false, message: 'Lender data not found' });
//     }

//     res.json({
//       success: true,
//       message: 'Lender data retrieved successfully',
//       lenderData: lenderData.map(user => ({
//         name: user.name,
//         email: user.email,
//         bio: user.bio,
//         linkedin: user.linkedin,
//         investorType: user.investorType,
//         fundSize: user.fundSize,
//         geography: user.geography,
//         accreditedStatus: user.accreditedStatus,
//         preferredYield: user.preferredYield,
//         assetPreference: user.assetPreference,
//       })),
//     });
//   } catch (error) {
//     console.error('Error during lender data retrieval:', error);
//     res.status(500).json({ success: false, message: 'An error occurred during lender data retrieval' });
//   }


// });


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://admin:Ayushcha1234@cluster0.qwiwpgv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

//User Schema - 
const UserSchema = new mongoose.Schema({
  role: { type: String, required: true},
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
});
const User = mongoose.model('User', UserSchema, "users");


// Lender Schema
const lenderSchema = new mongoose.Schema({
  name: String,
  role: { type: String, default: 'lender' },
  email: { type: String, unique: true },
  password: String,
});
const Lender = mongoose.model('Lender', lenderSchema);

// Borrower Schema
const borrowerSchema = new mongoose.Schema({
  name: String,
  role: { type: String, default: 'borrower' },
  email: { type: String, unique: true },
  password: String,
});

const Borrower = mongoose.model('Borrower', borrowerSchema);

// Underwriter Schema
const underwriterSchema = new mongoose.Schema({
  name: String,
  role: { type: String, default: 'underwriter' },
  email: { type: String, unique: true },
  password: String,
});

const Underwriter = mongoose.model('Underwriter', underwriterSchema);

// Registration Endpoint
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const body_text = req.body;
    const role = body_text.role;
    const email = body_text.email;
    const hashedPassword = await bcrypt.hash(body_text.password, 10);

    let newUser;

    switch (role) {
      case 'borrower':
        const existingBorrower = await Borrower.findOne({ email });
        if (existingBorrower) {
          return res.status(409).json({ success: false, message: 'Email already registered' });
        }
        newUser = new Borrower({
          name: body_text.name,
          email: body_text.email,
          password: hashedPassword,
          role: body_text.role,
        });
        break;

      case 'lender':
        const existingLender = await Lender.findOne({ email });
        if (existingLender) {
          return res.status(409).json({ success: false, message: 'Email already registered' });
        }
        newUser = new Lender({
          name: body_text.name,
          email: body_text.email,
          password: hashedPassword,
          role: body_text.role,
        });
        break;

      case 'underwriter':
        const existingUnderwriter = await Underwriter.findOne({ email });
        if (existingUnderwriter) {
          return res.status(409).json({ success: false, message: 'Email already registered' });
        }
        newUser = new Underwriter({
          name: body_text.name,
          email: body_text.email,
          password: hashedPassword,
          role: body_text.role,
        });
        break;

      default:
        return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }

    await newUser.save();

    console.log(`${role} registered successfully`);
    res.json({ success: true, message: `${role} registered successfully` });
  } catch (error) {
    console.error(`Error during registration:`, error);
    res.status(500).json({ success: false, message: `An error occurred during registration` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Login 
app.post("/login", async (req,res) => {
  console.log(req.body)
  console.log("login route triggered")
  const email = req.body.email
  const password = req.body.password
  if(await User.findOne({email}) ){
    const E = await User.findOne({email})
    res.json(E)
    console.log(E)
  }
  else{
    res.send("User not found")
  }
} ) 



// Get User Data Endpoint
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User data retrieved successfully',
      userData: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        linkedin: user.linkedin,
        investorType: user.investorType,
        fundSize: user.fundSize,
        geography: user.geography,
        accreditedStatus: user.accreditedStatus,
        preferredYield: user.preferredYield,
        assetPreference: user.assetPreference,
      },
    });
  } catch (error) {
    console.error('Error during user data retrieval:', error);
    res.status(500).json({ success: false, message: 'An error occurred during user data retrieval' });
  }
});




// Get Underwriter Data Endpoint
app.get('/getunderwriterData', async (req, res) => {
  try {
    const underwriterData = await Underwriter.find({ role: 'underwriter' });
    console.log("data", underwriterData);

    if (!underwriterData || underwriterData.length === 0) {
      return res.status(404).json({ success: false, message: 'Underwriter data not found' });
    }

    res.json({
      success: true,
      message: 'Underwriter data retrieved successfully',
      underwriterData: underwriterData.map(user => ({
        name: user.name,
        email: user.email,
        bio: user.bio,
        linkedin: user.linkedin,
        website: user.website,
        geography: user.geography,
        underwriterType: user.underwriterType,
        assetSpeciality: user.assetSpeciality,
        creditRating: user.creditRating,
        education: user.education,
        professionalExperience: user.professionalExperience,
        totalLoansUnderwritten: user.totalLoansUnderwritten,
      })),
    });
  } catch (error) {
    console.error('Error during underwriter data retrieval:', error);
    res.status(500).json({ success: false, message: 'An error occurred during underwriter data retrieval' });
  }
});
// Add this endpoint for fetching borrower data
app.get('/getborrowerData', async (req, res) => {
  try {
    const borrowerData = await Borrower.find({ role: 'borrower' });

    if (!borrowerData || borrowerData.length === 0) {
      return res.status(404).json({ success: false, message: 'Borrower data not found' });
    }

    res.json({
      success: true,
      message: 'Borrower data retrieved successfully',
      borrowerData: borrowerData.map(user => ({
        name: user.name,
        email: user.email,
        bio: user.bio,
        linkedin: user.linkedin,
        website: user.website,
        geography: user.geography,
        creditRating: user.creditRating,
        aum: user.aum,
        npas: user.npas,
        assetType: user.assetType,
        foundedYear: user.foundedYear,
        linkToDeck: user.linkToDeck,
        fundingStage: user.fundingStage,
      })),
    });
  } catch (error) {
    console.error('Error during borrower data retrieval:', error);
    res.status(500).json({ success: false, message: 'An error occurred during borrower data retrieval' });
  }
});
// Add this endpoint for fetching lender data
app.get('/getlenderData', async (req, res) => {
  try {
    const lenderData = await Lender.find({ role: 'lender' });

    if (!lenderData || lenderData.length === 0) {
      return res.status(404).json({ success: false, message: 'Lender data not found' });
    }

    res.json({
      success: true,
      message: 'Lender data retrieved successfully',
      lenderData: lenderData.map(user => ({
        name: user.name,
        email: user.email,
        bio: user.bio,
        linkedin: user.linkedin,
        investorType: user.investorType,
        fundSize: user.fundSize,
        geography: user.geography,
        accreditedStatus: user.accreditedStatus,
        preferredYield: user.preferredYield,
        assetPreference: user.assetPreference,
      })),
    });
  } catch (error) {
    console.error('Error during lender data retrieval:', error);
    res.status(500).json({ success: false, message: 'An error occurred during lender data retrieval' });
  }

});


