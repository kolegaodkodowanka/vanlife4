import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getHostVans } from "../../api"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 





const firebaseConfig = {
    apiKey: "AIzaSyC42g_FKCivc7LsKFKU8zBtjiCRvUrWD34",
    authDomain: "vanlife-65757.firebaseapp.com",
    projectId: "vanlife-65757",
    storageBucket: "vanlife-65757.appspot.com",
    messagingSenderId: "217261920295",
    appId: "1:217261920295:web:d56b14126159c0bb11be02"
  };

  const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);

 



export default function HostVans() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [addVanVisible, setAddVanVisible] = React.useState(false)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };



  



  
    





    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])


    

   



    


    function addVanToggle() {
        setAddVanVisible(!addVanVisible)
    }


    const VanChart = () => {

    
        const handleAddVan = () => {
          const newVan = {
            name,
            price,
            type: selectedOption,
            description,
            imageUrl,
            hostId: "123"
          }

          setDoc(doc(db, "vans", "7"), {
            name: newVan.name,
            price: newVan.price,
            type: newVan.type,
            description: newVan.description,
            imageUrl: newVan.imageUrl,
            hostId: "123"
          });
        
          
 
          if(newVan.name) {
            setVans([...vans, newVan]) 


            setPrice('');
            setName('');
            setImageUrl('');
            setType('');
            setDescription('');

          }
        };
      


         
 {
    return  (

      <div className='review-adding'>  
        <input
        className='review-adding-name'
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
        className='review-adding-name'
          type="text"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <select className='van-adding-type' value={selectedOption} onChange={handleOptionChange}  >
        <option value="" disabled>
          Select van type
        </option>
  <option value="simple">simple</option>
  <option value="luxury">luxury</option>
  <option value="rugged">rugged</option>
</select>
        <input
        className='review-adding-name'
          type="text"
          placeholder="ImageUrl"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          required
        />
        <h6>Example imageUrl: https://images.pexels.com/photos/2303781/pexels-photo-2303781.jpeg</h6>
        <input
        className='review-adding-text'
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
         <p>
         <button onClick={handleAddVan}>Add Van</button>
        </p>
      </div>
    );
  };

  }





    const hostVansEls = vans.map(van => (
        <Link
            to={van.id}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    vans.length > 0 ? (
                        <section>
                            {hostVansEls}
                            <div
          
            className="host-van-link-wrapper"
        >
                            <div className="host-van-single">
                            <img src="https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png"  />
                            <div className="host-van-info">
                                <h3>Add van</h3>
                                <p className='review-add' onClick={addVanToggle}>{addVanVisible ?  "Hide" : "Click there to add another van" }</p>
                                </div>
                                </div>
                                </div>
                                
                                {addVanVisible ? VanChart() : null }   

                        </section>
                       

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    )
}