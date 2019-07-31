import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import web3 from 'web3';
import axios from 'axios';

const CreateScholarship = props => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send } = useCacheSend('Scholarships', 'create');

    const [name, updateName] = useState('');
    const [amount, updateAmount] = useState('');
    const [description, updateDescription] = useState('');
    const [USD, updateUSD] = useState(0);

    const [race, updateRace] = useState('');
    const [gender, updateGender] = useState('');

    useEffect(() => {
        axios.get(`https://api.coinmarketcap.com/v1/ticker/ethereum/`).then(res => {
            const price = res.data[0].price_usd;
            updateUSD((price * amount).toFixed(2));
        });
    }, [amount]);

    const create = ev => {
        ev.preventDefault();
        var value = web3.utils.toWei(amount,'ether');
        send(name, description, { value });
        updateName('');
        updateAmount('');
        updateDescription('');
        updateUSD(0);
    };

    return (
        <div className="card mt-4 mb-4">
        <div className="card-header">
            Create a Scholarship
        </div>
        <div className="card-body">
            <form onSubmit={create}>
                <div className="form-group">
                    <label className="">Scholarship Name</label>
                    <input className="form-control" value={name} onChange={ev => updateName(ev.target.value)} placeholder="Virginia Athletes" />
                </div>
                <div className="form-group">
                    <label className="">Scholarship Description</label>
                    <textarea className="form-control" value={description} onChange={ev => updateDescription(ev.target.value)} placeholder="Enter some more information about this scholarship..."></textarea>
                </div>
                <div className="form-group">
                    <label className="">Gender Preference</label>
                    <select onChange={ev => updateGender(ev.target.value)} value={gender} className="form-control">
                        <option value="">Any</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Nonbinary</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="">Ethnicity Preference</label>
                    <select onChange={ev => updateRace(ev.target.value)} value={race} className="form-control">
                        <option value="">Any</option>
                        <option>African American</option>
                        <option>American Indian/Alaska Native</option>
                        <option>Asian</option>
                        <option>Asian/Pacific Islander</option>
                        <option>Hispanic</option>
                        <option>Mixed</option>
                        <option>Native Hawaiian/Pacific Islander</option>
                        <option>White</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="">Award Amount</label>
                    <div className="input-group">
                        <input type="number" className="form-control" placeholder="0.01" value={amount} onChange={ev => updateAmount(ev.target.value)} />
                        <div className="input-group-append">
                            <span className="input-group-text">ETH</span>
                            <span className="input-group-text">${ USD }</span>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Scholarship</button>
            </form>
        </div>
        </div>
    )

}

export default CreateScholarship;