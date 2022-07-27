import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemDataService from '../services/item.service';

const Item = props => {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialItemState = {
        id: null,
        title: '',
        description: '',
        published: false
    };

    const [currentItem, setCurrentItem] = useState(initialItemState);
    const [message, setMessage] = useState('');
    const getItem = id => {
        ItemDataService.get(id).then(res => {
            setCurrentItem(res.data);
            console.log(res.data);
        })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (id)
            getItem(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };

    const updateItem = () => {
        ItemDataService.updateItem(currentItem.id, currentItem).then(res => {
            console.log(res.data);
            setMessage('The item was updated sucessfully!')
        })
            .catch(err => {
                console.log(err);
            })
    }

    const updatePublished = status => {
        var data = {
            id: currentItem.id,
            title: currentItem.title,
            description: currentItem.description,
            published: status
        };
        ItemDataService.updateItem(currentItem.id, data).then(res => {
            setCurrentItem({ ...setCurrentItem, published: status });
            console.log(res.data)
        })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteItem = () => {
        ItemDataService.removeAll(currentItem.id).then(res => {
            console.log(res.data);
            navigate('/items');
        })
            .catch(err => {
                console.log(err);
            });
        ;


        return (
            <div>
                {currentItem ? (
                    <div className='edit-form'>
                        <h4>Item</h4>
                        <form>
                            <div className='form-group'>
                                <label htmlFor='title'>Title</label>
                                <input type='text' className='form-control' id='description' name='description' value={currentItem.description} onChange={handleInputChange} />
                            </div>
                            <div className='form-group'>
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentItem.published ? 'Published' : 'Pending'}
                            </div>
                        </form>
                        {currentItem.published ? (
                            <button className='badge badge-primary mr-2' onClick={() => updatePublished(false)}>
                                Unpublish
                            </button>
                        ) : (
                            <button className='badge badge-primary mr-2' onClick={() => updatePublished(true)}>
                                Publish
                            </button>
                        )}
                        <button className='badge badge-danger mr-2' onClick={deleteItem}>
                            Delete
                        </button>
                        <button className='badge badge-success' type='submit' onClick={updateItem}>
                            Update
                        </button>
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please Click on an Item</p>
                    </div>
                )}
            </div>

        );
    };
};
export default Item;