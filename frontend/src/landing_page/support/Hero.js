import React from 'react';

function Hero() {
  return (
    <div className='container mt-5 mb-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div className='left' style={{ marginRight: 'auto' }}>
          <h1>Support Portal</h1>
        </div>
        <div className='right' style={{ marginLeft: 'auto' }}>
          <button className="p-2 btn btn-primary fs-5 mb-5" style={{ width: 'auto', marginRight: 'auto' }}>
            My Tickets
          </button>
        </div>
      </div>
      <div className='search-box' style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        padding: '15px 20px', 
        borderRadius: '5px', 
        marginTop: '30px', 
        width: '90%', 
        border: '1px solid #ddd'
      }}>
        <div className='search-icon' style={{ marginRight: '15px', color: '#999' }}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <input 
          type="text" 
          placeholder="Eg: How do I open my account, How do i activate F&O..." 
          style={{ 
            width: '100%', 
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            color: '#666'
          }} 
        />
      </div>
    </div>
  );
}

export default Hero;