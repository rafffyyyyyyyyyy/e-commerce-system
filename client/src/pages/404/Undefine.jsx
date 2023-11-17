import React from 'react'
import { useNavigate } from 'react-router-dom'

function Undefine() {
    const navigate = useNavigate();
    return (
        <div style={{background: '#fff', left: '0', right: '0', bottom: '0', top: '0', position: 'fixed'}}>
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>404 Error Page</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">404 Error Page</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <h2 style={{textAlign: 'center', margin: '50px'}}>Online IT Products</h2>
                <section className="content">
                    <div className="error-page">
                        <h2 className="headline text-warning"> 404</h2>
                        <div className="error-content">
                            <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Page not found.</h3>
                            <p>
                                We could not find the page you were looking for.
                                Meanwhile, you may <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/')}>return to Home Page</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Undefine
