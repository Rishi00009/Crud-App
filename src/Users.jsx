// Users.js
import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState("");
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [street, setstreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [catchPharse, setcatchPharse] = useState('');
  const [bs, setBs] = useState('');
  

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);





  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      const user = {
        id,
        name,
        email,
        username,
        phone,
        website,
        address: {
          street: street || '',
          suite: suite || '',
          city: city || '',
          zipcode: zipcode || '',
          geo: {
            lat: lat || '',
            lng: lng || ''
          }
        },
        company: {
          name: companyname || '',
          catchPhrase: catchPharse || '',
          bs: bs || ''
        }
      };
      const updatedUser = await updateUser(id, user);
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      setId(null);
    } else {

      const lastUserId = users.length > 0 ? users[users.length - 1].id : 0; // get the last ID from the existing users
    const newId = lastUserId + 1

      const newUser = {
        id: newId,
        name,
        email,
        username,
        phone,
        website,
        address: {
          street: street || '',
          suite: suite || '',
          city: city || '',
          zipcode: zipcode || '',
          geo: {
            lat: lat || '',
            lng: lng || ''
          }
        },
        company: {
          name: companyname || '',
          catchPhrase: catchPharse || '',
          bs: bs || ''
        }
      };
      setUsers([...users, newUser]);
    }
    setId(null);
    setName('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setUsername('');
    setstreet('');
    setSuite('');
    setCity('');
    setZipcode('');
    setLat('');
    setLng('');
    setCompanyname('');
    setcatchPharse('');
    setBs('');
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };


  const handleEdit = (user) => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setWebsite(user.website);
    setUsername(user.username);
    if (user.address) {
      setstreet(user.address?.street);
      setSuite(user.address?.suite);
      setCity(user.address?.city);
      setZipcode(user.address?.zipcode);
      setLat(user.address.geo?.lat);
      setLng(user.address.geo?.lng);
    }
    if (user.company) {
      setCompanyname(user.company?.name);
      setcatchPharse(user.company?.catchPhrase);
      setBs(user.company?.bs);
    }
  };


  return (
    <div>
      <h1 className='heading'>Users</h1>
      <form className='form' onSubmit={handleSubmit}>
      
        <input className='name'
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
        <input className='name'
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input className='name'
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone Number"
        />
        <input className='name'
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          placeholder="Website"
        />
        <input className='name'
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Use Name"
        />
        <input className='name'
          type="text"
          value={street}
          onChange={(event) => setstreet(event.target.value)}
          placeholder="Street"
        />
        <input className='name'
          type="text"
          value={suite}
          onChange={(event) => setSuite(event.target.value)}
          placeholder="Suite"
        />
        <input className='name'
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="City"
        />
        <input className='name'
          type="text"
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
          placeholder="Zipcode"
        />
        <input className='name'
          type="text"
          value={lat}
          onChange={(event) => setLat(event.target.value)}
          placeholder="Lat"
        />
        <input className='name'
          type="text"
          value={lng}
          onChange={(event) => setLng(event.target.value)}
          placeholder="Lng"
        />
        <input className='name'
          type="text"
          value={companyname}
          onChange={(event) => setCompanyname(event.target.value)}
          placeholder="Company Name"
        />
        <input className='name'
          type="text"
          value={catchPharse}
          onChange={(event) => setcatchPharse(event.target.value)}
          placeholder="Catch Pharse"
        />
        <input className='name'
          type="text"
          value={bs}
          onChange={(event) => setBs(event.target.value)}
          placeholder="Bs"
        />




        <button className='submit' type="submit">Submit</button>
      </form>
      <div >
        {users.map((user) => (
          <div className='datas' key={user.id}>
            <p  style={{fontWeight:'bold' , margin:'0px' , textAlign:'center' , fontSize:'large'}}>{user.id}</p>
            <p className='data'><b>Name :</b> {user.name} </p>
            <p className='data'><b>Mail ID :</b> {user.email}</p>
            <p className='data'><b>User Name :</b> {user.username}</p>
            <p className='data'><b>Website :</b> {user.website}</p>
            <p className='data' >
            <p style={{fontWeight:'bold' , margin:'0px'}}> Address : </p>
            <p className='details'>Street : {user.address?.street}</p>
            <p className='details'>Suite : {user.address?.suite}</p>
            <p className='details'>City : {user.address?.city}</p>
            <p className='details'>Zipcode : {user.address?.zipcode}</p>
            <p className='details'> Lat : {user.address?.geo.lat}</p>
            <p className='details'>Lng : {user.address?.geo.lng}</p>
            </p>
            <p className='data'><b>Phone Number :</b> {user.phone}</p>
            <p className='data'>
              <p style={{fontWeight:'bold' , margin:'0px'}}>Company :</p>
              <p className='details'  >Name : {user.company?.name}</p>
              <p className='details'>CatchPhrase : {user.company?.catchPhrase}</p>
              <p className='details'>Bs : {user.company?.bs}</p>
            </p>
            
            
            

            <button className='edit' onClick={() => handleEdit(user)}>Edit</button>
            <button className='delete' onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;