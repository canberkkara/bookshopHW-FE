import { useEffect, useState } from 'react';
import './MainPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [userid, setUserid] = useState<string>('quest');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    if (location.state != null) {
      setUserid(location.state as string);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    document.title = 'Anasayfa';
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown')) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const books = [
    {
      bookID: 1,
      author: 'Cengiz Aytmatov',
      title: 'Cemile',
      description:
        'Türk dünyasının önemli yazarlarından Cengiz Aytmatovun kendisini dünyaya tanıtan en önemli eseri.',
      info: '1958',
      image: '/src/assets/book-icons/cemile.png',
      price: 2,
    },
    {
      bookID: 2,
      author: 'John Steinbeck',
      title: 'Fareler ve İnsanlar',
      description:
        'Birbirine zıt karakterdeki iki mevsimlik tarım işçisinin, zeki George Milton ile güçlü kuvvetli fakat saf yoldaşı Lennie Smallun öyküsünü anlatır.',
      info: '1937',
      image: '/src/assets/book-icons/farelerveinsanlar.png',
      price: 1,
    },
    {
      bookID: 3,
      author: 'Cengiz Aytmatov',
      title: 'Gün Olur Asra Bedel',
      description:
        'Komünizm sırasında yaşanan anılar, insanların kutsal saydığı şeylerin yok sayılması ve aşkın sorgulanması...',
      info: '1980',
      image: '/src/assets/book-icons/gunolurasrabedel.png',
      price: 3,
    },
    {
      bookID: 4,
      author: 'Halide Edip Adıvar',
      title: 'Handan',
      description: 'Türk edebiyatında kadın psikolojisini anlatan ilk eserdir.',
      info: '1912',
      image: '/src/assets/book-icons/handan.png',
      price: 9,
    },
    {
      bookID: 5,
      author: 'Antoine de Saint-Exupery',
      title: 'Küçük Prens',
      description: 'Bir çocuğun gözünden büyüklerin dünyası ele alınmaktadır.',
      info: '1943',
      image: '/src/assets/book-icons/kucukprens.png',
      price: 10,
    },
    {
      bookID: 6,
      author: 'Sabahattin Ali',
      title: 'Kürk Mantolu Madonna',
      description:
        '1920li yıllarda Berline öğrenci olarak giden Raif Efendi ile ressam Maria Puder arasındaki aşkı anlatır.',
      info: '1943',
      image: '/src/assets/book-icons/kurkmantolumadanna.png',
      price: 7,
    },
    {
      bookID: 7,
      author: 'Sabahattin Ali',
      title: 'Kuyucaklı Yusuf',
      description:
        'Bir “tabiat insanı” olarak Yusufun kasaba eşrafı ve halk arasında giderek sertleşen güç gösterileri içinde temiz kalma, aşkını koruma, aslında var olma savaşını anlatır.',
      info: '1937',
      image: '/src/assets/book-icons/kuyucakliyusuf.png',
      price: 1,
    },
    {
      bookID: 8,
      author: 'Gazi Mustafa Kemal ATATÜRK',
      title: 'Nutuk',
      description:
        'Atatürkün 19 Mayısta Samsuna çıkışıyla başlar ve Millî Mücadele ile Türkiye Cumhuriyetinin kuruluş aşamalarını anlatır.',
      info: '1927',
      image: '/src/assets/book-icons/nutuk.png',
      price: 5,
    },
    {
      bookID: 9,
      author: 'Platon',
      title: 'Sokratesin Savunması',
      description:
        'Sokratesin mahkemede Atinalıların huzurunda, sürdürdüğü felsefi yaşam şeklinin doğruluğunu savunmasıdır.',
      info: 'MÖ 399',
      image: '/src/assets/book-icons/sokratesinsavunmasi.png',
      price: 3,
    },
    {
      bookID: 10,
      author: 'Fyodor Mihayloviç Dostoyevski',
      title: 'Suç ve Ceza',
      description:
        '"İdeolojik zehirlenme" sonucu yaşanan bir cinayeti içermektedir.',
      info: '1866',
      image: '/src/assets/book-icons/sucveceza.png',
      price: 5,
    },
  ];

  const handleTitleClick = (bookID: number) => {
    const selectedBook = books.find((book) => book.bookID === bookID);
    if (selectedBook) {
      navigate(`/detailPage/${bookID}`, { state: selectedBook });
    }
  };

  const onIconClick = () => {
    navigate('/anasayfa', { state: userid });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleExitClick = () => {
    // Handle exit click logic
    navigate('/');
  };

  const handleUserButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="mainPage">
        <div className="mainPageBar">
          <div className="search-container">
            <img
              src="src/assets/KitAppLogo.png"
              className="homepageIcon"
              onClick={onIconClick}
            />
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="dropdown">
            <button className="icon-button" onClick={handleUserButtonClick}>
              <i className="fas fa-user"></i>
            </button>
            {dropdownVisible && (
              <div className="navbar-buttons">
                <button
                  onClick={handleProfileClick}
                  style={{
                    background: 'white',
                    border: '1px solid black',
                  }}
                >
                  Profile
                </button>
                <button
                  onClick={handleExitClick}
                  style={{
                    background: 'white',
                    border: '1px solid black',
                    margin: '5px',
                  }}
                >
                  Exit
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mainPageGrid">
          <div className="book-list">
            {filteredBooks.map((book, index) => (
              <div className="book" key={index}>
                <div className="book-info">
                  <div className="author">
                    <i className="fas fa-user" style={{ margin: '10px' }}></i>
                    <p>{book.author}</p>
                  </div>
                  <h2
                    style={{
                      textAlign: 'left',
                      padding: '0px 10px',
                      margin: '0px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTitleClick(book.bookID)}
                  >
                    {book.title}
                  </h2>
                  <p
                    style={{
                      textAlign: 'left',
                      padding: '0px 10px',
                      margin: '0px',
                      fontSize: 15,
                    }}
                  >
                    {book.description}
                  </p>
                  <p
                    style={{
                      textAlign: 'left',
                      padding: '0px 10px',
                      margin: '0px',
                      color: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {book.info} - {book.price}$
                  </p>
                </div>
                <div className="button-container">
                  <img
                    src={book.image}
                    className="book-icon"
                    alt={book.title}
                  />
                </div>
                <br />
              </div>
            ))}
          </div>

          <div className="mainPageRightSide">
            <div className="follow">
              <h3
                style={{
                  textAlign: 'left',
                  padding: '0px 10px',
                  margin: '0px',
                }}
              >
                Who to Follow
              </h3>
              <div className="follow-person">
                <i className="fas fa-user" style={{ margin: '10px' }}></i>
                <p>Text</p>
                <button>Follow</button>
              </div>
              <div className="follow-person">
                <i className="fas fa-user" style={{ margin: '10px' }}></i>
                <p>Text</p>
                <button>Follow</button>
              </div>
            </div>
            <button style={{ background: 'transparent', color: 'blue' }}>
              See more suggestions
            </button>
            <div className="saved-part">
              <h3
                style={{
                  textAlign: 'left',
                  padding: '0px 10px',
                  margin: '0px',
                }}
              >
                Recently Saved
              </h3>
              <div className="saved-item">
                <div className="saved-name">
                  <i className="fas fa-user" style={{ margin: '10px' }}></i>
                  <h3
                    style={{
                      textAlign: 'left',
                      padding: '0px 10px',
                      margin: '0px',
                    }}
                  >
                    Title
                  </h3>
                </div>
                <p
                  style={{
                    textAlign: 'left',
                    padding: '0px 10px',
                    margin: '0px',
                  }}
                >
                  Text
                </p>
                <p
                  style={{
                    textAlign: 'left',
                    padding: '0px 10px',
                    margin: '0px',
                    color: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Text
                </p>
              </div>
              <div className="saved-item">
                <div className="saved-name">
                  <i className="fas fa-user" style={{ margin: '10px' }}></i>
                  <h3
                    style={{
                      textAlign: 'left',
                      padding: '0px 10px',
                      margin: '0px',
                    }}
                  >
                    Title
                  </h3>
                </div>
                <p
                  style={{
                    textAlign: 'left',
                    padding: '0px 10px',
                    margin: '0px',
                  }}
                >
                  Text
                </p>
                <p
                  style={{
                    textAlign: 'left',
                    padding: '0px 10px',
                    margin: '0px',
                    color: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Text
                </p>
              </div>
              <div className="saved-item">
                <div className="saved-name">
                  <i className="fas fa-user" style={{ margin: '10px' }}></i>
                  <h3
                    style={{
                      textAlign: 'left',
                      padding: '0px 10px',
                      margin: '0px',
                    }}
                  >
                    Title
                  </h3>
                </div>
                <p
                  style={{
                    textAlign: 'left',
                    padding: '0px 10px',
                    margin: '0px',
                  }}
                >
                  Text
                </p>
                <p
                  style={{
                    textAlign: 'left',
                    padding: '0px 10px',
                    margin: '0px',
                    color: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Text
                </p>
              </div>
              <button style={{ background: 'transparent', color: 'blue' }}>
                See All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
