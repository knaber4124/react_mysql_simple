import React, { useState } from 'react';
import ItemDataService from '../services/item.service';
const AddItem = () => {
    const initialItemState = {
        id: null,
        title: '',
        description: '',
        published: false
    };

    const [item, setItem] = useState(initialItemState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };
    const saveItem = () => {
        var data = {
            title: item.title,
            description: item.description
        };
        ItemDataService.createItem(data).then(res => {
            setItem({
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                published: res.data.published
            });
            setSubmitted(true);
            console.log(res.data);
        })
            .catch(error => {
                console.log(error);
            });
    };
    const newItem = () => {
        setItem(initialItemState);
        setSubmitted(false);
    };
    return (
        <div className='submit-form'>
            {submitted ? (
                <div>
                    <h4>You Submitted Successfully!</h4>
                    <button className='btn btn-success' onClick={newItem}>Add</button>
                </div>
            ) : (
                <div>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            className='form-control'
                            id='title'
                            required
                            value={item.title}
                            onChange={handleInputChange}
                            name='title'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            className='form-control'
                            id='description'
                            required
                            value={item.description}
                            onChange={handleInputChange}
                            name='description'
                        />
                    </div>
                    <button onClick={saveItem} className='btn btn-success'>
                        Submit
                    </button>

                </div>
            )}
        </div>
    );

}

export default AddItem;
