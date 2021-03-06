import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as contacts_idl, canisterId as contacts_id } from 'dfx-generated/crud';

const agent = new HttpAgent();
const crud = Actor.createActor(contacts_idl, { agent, canisterId: contacts_id });
import { fromOptional, toOptional } from './helper';

const Display = (props) => {

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = () => {
        crud.findAll().then((result) => {
            if (result) {
                setCustomers(result);
            }
        });
    }

    const addCustomer = (() => {
        props.history.push('/add/-1');
    });

    const editCustomer = ((id) => {
        props.history.push(`/add/${id}`);
    });

    const deleteCustomer = ((id) => {
        crud.updateOrDelete(parseInt(id), toOptional(null)).then((result) => {
            if (result) {
                loadCustomers();
            }
        });
    });

    return (
        <div className="row">
            <div>
                <button className="btn btn-primary" onClick={addCustomer}>
                    Add New Customer
                </button>
            </div>
            <h2 className="text-center">List of our Customers:</h2>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {<tbody>
                    {Object.entries(customers).map(
                        cust =>
                            <tr key={cust[1].id}>

                                <td>
                                    < input name="name" value={cust[1].name} type="text"
                                    />
                                </td>

                                <td>
                                    < input name="address" value={cust[1].address} type="text"
                                    />
                                </td>

                                <td>
                                    < input name="email" value={cust[1].email} type="text"
                                    />
                                </td>
                                <td>
                                    <button onClick={() => editCustomer(cust[1].id)} className="btn btn-info">Update</button>
                                    <button onClick={() => deleteCustomer(cust[1].id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                    )}
                </tbody>
                }
            </table>
        </div>
    )
}
export default Display