// DetailPage.tsx
import { useEffect, useState } from "react";
import "./DetailPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DetailPage: React.FC = () => {
  const [userid, setUserid] = useState<string>("quest");
  const navigate = useNavigate();
  const { bookID } = useParams<{ bookID?: string }>();
  const location = useLocation();
  const state = location.state as any;

  const [book, setBook] = useState<any>({
    bookID: "",
    author: "",
    title: "",
    description: "",
    info: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    if (state) {
      setBook(state);
    } else if (bookID) {
      // Assuming you fetch book details based on bookID
    }
  }, [state, bookID]);

  const onBackButtonClick = () => {
    navigate("/anasayfa", { state: userid });
  };

  const onBuyButtonClick = () => {
    navigate("/purchase", { state: { userid, book } });
  };

  const onIconClick = () => {
    navigate("/anasayfa", { state: userid });
  };

  return (
    <>
      <div className="mainPageBar">
        <div className="search-container">
          <img
            src="/src/assets/KitAppLogo.png"
            className="homepageIcon"
            onClick={onIconClick}
          />
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="navbar-buttons"></div>
      </div>
      <div className="back-container">
        <div className="back-icon">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <button className="back-button" onClick={onBackButtonClick}>
          Back
        </button>
      </div>

      <div className="detailPageLayout">
        <div className="detailPageLeftLayout">
          <div className="book-detail-container">
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
            <p className="author-button"> {book.author} </p>
            <div className="icon">
              <i className="fa-solid fa-book"></i>
            </div>
            <p>Tarih: {book.info}</p>
          </div>

          <div className="book-description">
            <p> {book.description}</p>
          </div>
          <div className="book-description-icon">
            <i className="fa-regular fa-bookmark"></i>
          </div>
          <div className="book-comment-header">
            <p> Adam Sandler - 18.05.2024 </p>
          </div>
          <div className="book-comment">
            <p>comment part</p>
          </div>
        </div>
        <div className="detailPageRightLayout">
          <img src={book.image} className="book-detail-icon" alt={book.title} />
          <button
            className="buy-Button"
            onClick={onBuyButtonClick}
            style={{ margin: "5px" }}
          >
            <div className="buy-Icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <p>Buy</p>
          </button>
          <div className="buy-description" style={{ margin: "5px" }}>
            <p> Book Name: {book.title} </p>
            <p> Author: {book.author}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
