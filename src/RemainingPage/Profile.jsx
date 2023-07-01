import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import profilex from '../img/profile.png';

function Profile() {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      try {
        const q = query(collection(db, 'profile'), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        const profileData = querySnapshot.docs.map((doc) => doc.data());
        setProfile(profileData[0]);
      } catch (error) {
        console.log('An error occurred while fetching profile:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchProfile(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setName(profile.name);
    setAddress(profile.address);
    setPhone(profile.phone);
  };

  const handleSaveClick = async () => {
    try {
      const profileRef = doc(db, 'profile', profile.id);
      await updateDoc(profileRef, {
        name,
        address,
        phone
      });
      setProfile({
        ...profile,
        name,
        address,
        phone
      });
      setEditMode(false);
    } catch (error) {
      console.log('An error occurred while saving profile:', error);
    }
  };

  return (
    <div className='d-flex flex-column p-2 justify-content-center ' >
         <h2 className='text-align-center mt-3 mb-3'>Profile details</h2>
    <div className='d-flex flex-wrap p-2 justify-content-center'>
   
      <img src={profile.profilePic || {profilex}} alt="Avatar" className="avatar" />
      <div className='d-flex flex-column p-2'>
        <div className='me-5 p-1 mt-3'><strong className='p-2  me-1'>Name:</strong>
          {editMode ? (
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            profile.name
          )}
        </div>
        <div className='me-5 p-1'>
          <strong className='p-2 me-1 '>Email:</strong>
          {profile.email}
        </div>
        <div className='me-5 p-1'>
          <strong className='p-2 me-1 '>Phone:</strong>
          {editMode ? (
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          ) : (
            profile.phone
          )}
        </div>
        <div className='me-5 p-1'>
          <strong className='p-2 me-1 '>Address:</strong>
          {editMode ? (
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          ) : (
            profile.address
          )}
        </div>
        {editMode ? (
          <button className="btn btn-primary mt-2" onClick={handleSaveClick}>Save</button>
        ) : (
          <button className="btn btn-primary" onClick={handleEditClick}>Edit Details</button>
        )}
     
     </div>
    </div>
    </div>
  );
}

export default Profile;