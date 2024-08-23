import React, { useEffect, useState } from 'react';
import './Purchase.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Purchase: React.FC = () => {
  const [userid, setUserid] = useState<string>('quest');
  const [book, setBook] = useState<any>({});
  const [amount, setAmount] = useState<string>('1'); // Initial amount as string
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  useEffect(() => {
    if (state != null) {
      setUserid(state.userid);
      setBook(state.book);
      setTotalPrice(state.book.price); // Initial total price
    } else {
      navigate('/');
    }
  }, [state, navigate]);

  useEffect(() => {
    document.title = 'Purchase';
  }, []);

  useEffect(() => {
    // Parse input value as integer, default to 1 if invalid
    const newAmount = parseInt(amount, 10) || 1;
    setAmount(newAmount.toString()); // Update amount as string
    setTotalPrice(book.price * newAmount);
  }, [amount, book.price]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setAmount(newValue.toString());
    } else {
      setAmount('1'); // Default to 1 if input is not a valid number
    }
  };

  const onBackButtonClick = () => {
    navigate(`/detailPage/${book.bookID}`, { state: book });
  };

  return (
    <div>
      <div className="purchasePage">
        <div className="back-container">
          <div className="back-icon">
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <button className="back-button" onClick={onBackButtonClick}>
            Back
          </button>
        </div>
        <div className="purchaseLeft">
          <h2 style={{ textAlign: 'left' }}>Payment</h2>
          <img
            src={book.image}
            className="book-cover-purchase"
            alt={book.title}
          />
          <div className="amount-part">
            <p>{book.title}</p>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange} // Use custom event handler
              style={{ width: '35px' }}
            />
          </div>
          <div className="price-part">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="purchaseRight">
          <h2>Shipping Information</h2>
          <p>E-mail</p>
          <input type="email" />
          <p>Shipping Information</p>
          <textarea rows={4}></textarea>
          <h2>Card Details</h2>
          <input placeholder="1234 5678 1234 5678" />
          <div className="card-details">
            <input placeholder="MM/YYYY" style={{ width: '40%' }} />
            <input placeholder="CVV" style={{ width: '40%' }} />
          </div>
          <button style={{ background: 'green' }}>
            Pay ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
