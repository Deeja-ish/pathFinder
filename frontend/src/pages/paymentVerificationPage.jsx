import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const PaymentVerificationPage = () => {
  const [message, setMessage] = useState('Verifying your payment...');
  const { login, getAuthHeader } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      // Get the 'reference' from the URL (e.g., ?reference=12345)
      const reference = new URLSearchParams(location.search).get('reference');

      if (!reference) {
        setMessage('No payment reference found. Redirecting...');
        setTimeout(() => navigate('/dashboard'), 3000);
        return;
      }

      try {
        // Call our backend to verify
        const { data } = await axios.get(
          `http://localhost:5001/api/payments/verify?reference=${reference}`,
          getAuthHeader()
        );

        // --- SUCCESS ---
        login(data);
        
        setMessage('Payment successful! You are now a Premium member. Redirecting...');
        setTimeout(() => navigate('/dashboard'), 3000);

      } catch (err) {
        console.error(err);
        setMessage('Payment verification failed. Please contact support. Redirecting...');
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    };

    verifyPayment();
  }, [location, getAuthHeader, login, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Payment Verification</h1>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default PaymentVerificationPage;