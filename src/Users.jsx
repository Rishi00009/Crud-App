import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api'; // Assuming these functions work

// --- Styling Definitions (Material 3 Inspired) ---
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f6f7f8', // Light background
  },
  heading: {
    color: '#007bff', // Primary color for heading
    marginBottom: '20px',
    textAlign: 'center',
  },
  // Form container style remains, but content will be managed in sections
  form: {
    padding: '20px',
    marginBottom: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two columns for inputs
    gap: '15px',
    padding: '10px 0',
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.3s',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  // Expansion Panel Styles
  expansionPanel: {
    marginBottom: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
  },
  expansionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#343a40',
    borderRadius: '8px',
  },
  expansionContent: {
    padding: '15px',
    borderTop: '1px solid #e0e0e0',
  },
  // User list styles (kept from previous iteration for context)
  usersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '150px',
  },
  cardHeader: {
    borderBottom: '1px solid #eeeeee',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  cardDetails: {
    margin: '10px 0',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  buttonGroup: {
    marginTop: '15px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  seeMoreButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textAlign: 'left',
    padding: '5px 0',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

// --- Component Start ---

const initialFormState = {
  id: null,
  name: '', email: '', phone: '', website: '', username: '',
  street: '', suite: '', city: '', zipcode: '', lat: '', lng: '',
  companyname: '', catchPharse: '', bs: '',
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [expandedUserIds, setExpandedUserIds] = useState([]);
  // New state to manage form expansion panels
  const [expandedFormPanel, setExpandedFormPanel] = useState('Personal'); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (event) => {
    const { placeholder, value } = event.target;
    // Map placeholder text to state keys
    const keyMap = {
      'Name': 'name', 'Email': 'email', 'Phone Number': 'phone', 'Website': 'website',
      'User Name': 'username', 'Street': 'street', 'Suite': 'suite', 'City': 'city',
      'Zipcode': 'zipcode', 'Lat': 'lat', 'Lng': 'lng', 'Company Name': 'companyname',
      'Catch Phrase': 'catchPharse', 'Bs': 'bs',
    };
    const key = keyMap[placeholder] || placeholder.toLowerCase().replace(/\s/g, '');
    const finalKey = key === 'usename' ? 'username' : key; 

    setFormData(prev => ({ ...prev, [finalKey]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, name, email, username, phone, website, street, suite, city, zipcode, lat, lng, companyname, catchPharse, bs } = formData;

    // ... (User payload creation logic is the same) ...
    const userPayload = {
      name, email, username, phone, website,
      address: { street, suite, city, zipcode, geo: { lat, lng } },
      company: { name: companyname, catchPhrase: catchPharse, bs },
    };

    if (id) {
      userPayload.id = id;
      try {
        const updatedUser = await updateUser(id, userPayload);
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      } catch (error) {
        console.error('Update failed:', error);
      }
    } else {
      const lastUserId = users.length > 0 ? users[0].id : 0; // Assuming newest user is ID 1
      const newId = lastUserId + 1;
      const newUser = { id: newId, ...userPayload };
      
      // Attempt to call create user (real-world API)
      try {
          // const createdUser = await createUser(newUser);
          // setUsers([createdUser, ...users]);
          // For a mock/front-end only creation:
          setUsers([newUser, ...users]);
      } catch (error) {
          console.error('Create failed:', error);
      }
    }
    
    setFormData(initialFormState); 
    setExpandedFormPanel('Personal'); // Reset to default view
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setExpandedUserIds(prev => prev.filter(uid => uid !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id, name: user.name || '', email: user.email || '', phone: user.phone || '', 
      website: user.website || '', username: user.username || '',
      street: user.address?.street || '', suite: user.address?.suite || '', city: user.address?.city || '', 
      zipcode: user.address?.zipcode || '', lat: user.address?.geo?.lat || '', lng: user.address?.geo?.lng || '',
      companyname: user.company?.name || '', catchPharse: user.company?.catchPhrase || '', bs: user.company?.bs || '',
    });
    setExpandedFormPanel('Personal'); // Open the main panel on edit
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const toggleSeeMore = (id) => {
    setExpandedUserIds(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };
  
  // Structured input definitions
  const formSections = {
    'Personal Details 👤': [
      { type: 'text', placeholder: 'Name', value: formData.name, required: true },
      { type: 'email', placeholder: 'Email', value: formData.email, required: true },
      { type: 'tel', placeholder: 'Phone Number', value: formData.phone },
      { type: 'text', placeholder: 'Website', value: formData.website },
      { type: 'text', placeholder: 'User Name', value: formData.username },
    ],
    'Address Details 🏠': [
      { type: 'text', placeholder: 'Street', value: formData.street },
      { type: 'text', placeholder: 'Suite', value: formData.suite },
      { type: 'text', placeholder: 'City', value: formData.city },
      { type: 'text', placeholder: 'Zipcode', value: formData.zipcode },
      { type: 'text', placeholder: 'Lat', value: formData.lat },
      { type: 'text', placeholder: 'Lng', value: formData.lng },
    ],
    'Company Details 🏢': [
      { type: 'text', placeholder: 'Company Name', value: formData.companyname },
      { type: 'text', placeholder: 'Catch Phrase', value: formData.catchPharse },
      { type: 'text', placeholder: 'Bs', value: formData.bs },
    ],
  };

  // Helper function for the expansion panel header
  const renderPanelHeader = (title) => (
    <div 
      style={styles.expansionHeader} 
      onClick={() => setExpandedFormPanel(expandedFormPanel === title ? null : title)}
    >
      <span>{title}</span>
      <span>{expandedFormPanel === title ? '▲' : '▼'}</span>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{formData.id ? '✏️ Edit User' : '✨ Create New User'}</h1>
      
      {/* --- User Form (Expanded Panels) --- */}
      <form style={styles.form} onSubmit={handleSubmit}>
        
        {Object.entries(formSections).map(([title, inputs]) => (
          <div key={title} style={styles.expansionPanel}>
            {renderPanelHeader(title)}
            
            {expandedFormPanel === title && (
              <div style={styles.expansionContent}>
                <div style={styles.formGrid}>
                  {inputs.map((input, index) => (
                    <input
                      key={index}
                      style={styles.input}
                      type={input.type}
                      value={input.value}
                      onChange={handleInputChange}
                      placeholder={input.placeholder}
                      required={input.required}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <button style={styles.submitButton} type="submit">
          {formData.id ? '💾 Update User' : '➕ Create User'}
        </button>
      </form>

      {/* --- Users List --- */}
      <h2 style={{...styles.heading, fontSize: '1.5rem', marginTop: '40px'}}>User Directory</h2>
      <div style={styles.usersGrid}>
        {users.map((user) => {
          const isExpanded = expandedUserIds.includes(user.id);

          return (
            <div key={user.id} style={styles.card}>
              <div>
                <div style={styles.cardHeader}>
                  <p style={{ fontWeight: 'bold', margin: '0', fontSize: '1.2rem', color: '#007bff' }}>
                    {user.name} 
                    <span style={{fontWeight: 'normal', fontSize: '0.8rem', color: '#6c757d', marginLeft: '8px'}}>(ID: {user.id})</span>
                  </p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#343a40' }}>
                    @{user.username} | {user.email}
                  </p>
                </div>
                
                {/* Minimized/Primary Details */}
                <p style={styles.cardDetails}>
                  <b>Phone:</b> {user.phone}
                </p>

                {/* Expanded Details (Hidden behind See More) */}
                {isExpanded && (
                  <>
                    <p style={{ fontWeight: 'bold', margin: '15px 0 5px 0', borderTop: '1px solid #eeeeee', paddingTop: '10px' }}>Address</p>
                    <p style={styles.cardDetails}>
                      {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
                    </p>
                    <p style={{ fontWeight: 'bold', margin: '15px 0 5px 0' }}>Company</p>
                    <p style={styles.cardDetails}>
                      **{user.company?.name}** - *"{user.company?.catchPhrase}"*
                    </p>
                  </>
                )}
                
                {/* See More/Less Button */}
                <button 
                  style={styles.seeMoreButton} 
                  onClick={() => toggleSeeMore(user.id)}
                >
                  {isExpanded ? 'See Less ▲' : 'See More... ▼'}
                </button>
              </div>

              {/* Action Buttons */}
              <div style={styles.buttonGroup}>
                <button style={styles.editButton} onClick={() => handleEdit(user)}>
                  ✏️ Edit
                </button>
                <button style={styles.deleteButton} onClick={() => handleDelete(user.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;