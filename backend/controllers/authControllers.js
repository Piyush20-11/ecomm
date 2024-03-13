import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";


// Register user   =>  /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user ,201 ,res);
});

// login user  =>  /api/v1/login

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) 
  {
    return next(new ErrorHandler("Please enter email and password" ,400));
  }

  const user= await User.findOne({ email}).select("+password");
  if(!user)
  {
    return next(new ErrorHandler("Invalid email and password" ,400));
  }

  const isPasswordMatched= await user.comparePassword(password);

  if(!isPasswordMatched)
  {
    return next(new ErrorHandler("Invalid email and password" ,401));
  }
  // const token=user.getJwtToken();

  // res.status(201).json({
  //   token,
  // });

  sendToken(user ,201 ,res);
});

// Logout user   =>  /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged Out",
  });
});