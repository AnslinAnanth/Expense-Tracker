import React from 'react'

function CustomLoader() {
    return (
        <div  className='mainPop'>
            <div style={{ marginTop: "20px" }}>
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        border: "5px solid #ccc",
                        borderTop: "5px solid rgb(205, 171, 117)",
                        borderRadius: "50%",
                        animation: "spin 2s linear infinite",
                    }}
                ></div>
                <style>
                    {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
                </style>
            </div>
        </div>)

}

export default CustomLoader