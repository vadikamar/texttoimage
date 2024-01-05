import { useState } from 'react'
import { BsSearch ,BsArrowRight} from 'react-icons/bs'
import "./Home.css"


function Home() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
console.log(imageUrl.length)
  const handleConvert = () => {
    const formData = new FormData();
    formData.append('prompt', text);

    fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': 'b8143224cc554c75d25a1e56ee83363354d6e9d3a813f456f23cbaacde0b960857fa44e458ecd123c555c5083f5e5b43',
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blobData) => {
        const imageUrl = URL.createObjectURL(blobData);
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error('There was an error:', error);
      });
  };

  return (
    <>
    <div className='home '>
        <div className='heading'>
          <h1 >Text to Image</h1>
        </div>
        <div className='searchField'>
        <div className='searchbar'>
            <label className='icon'><BsSearch /></label>
            <input
                className='inputField'
                type="text"
                placeholder="Enter your text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        <button className='btn' onClick={handleConvert}>Convert</button>
        </div>
        {imageUrl && <img className='img' src={imageUrl} alt="Generated Image" />}
       
    </div>
    <p>Crafted with 🧡 by <span>some wizards</span></p>
    </>
  );
}

export default Home;
