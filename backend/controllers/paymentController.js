const axios = require('axios');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;


const initializeTransaction = async (req, res) => {
  try {
    const { email } = req.user;
    
    const amount = 3000 * 100;

    const callback_url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-verification`;

    const paystackResponse = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount,
        callback_url,
        metadata: {
          userId: req.user._id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(paystackResponse.data.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Payment initialization failed.' });
  }
};


const verifyTransaction = async (req, res) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ message: 'Payment reference is required.' });
    }

    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    const { status, metadata, customer } = paystackResponse.data.data;

    if (status !== 'success') {
      return res.status(400).json({ message: 'Payment not successful.' });
    }

    const user = await User.findById(metadata.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.plan = 'premium';
    user.mapCount = 1000000;
    user.paystackCustomerCode = customer.customer_code;
    await user.save();

    const token = generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      plan: user.plan,
      token: token,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment verification failed.' });
  }
};


module.exports = { initializeTransaction, verifyTransaction };