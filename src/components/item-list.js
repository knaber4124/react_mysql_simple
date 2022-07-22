import React, { useState, useEffect } from 'react';
import ItemDataService from '../services/item.service';
import { Link } from 'react-router-dom';

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        retrieveItems();
    }, []);
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    const retrieveItems = () => {
        ItemDataService.getAll().then(res => {
            setItems(res.data);
            console.log(res.data);
        })
            .catch(err => {
                console.log(err);
            });
    };
    const refreshList = () => {
        retrieveItems();
        setCurrentItem(null);
        setCurrentIndex(-1);
    };
    const setActiveItem = (item, index) => {
        setCurrentItem(item);
        setCurrentIndex(index);
    };
    const removeAllItems = () => {
        ItemDataService.removeAll()
            .then(res => {
                console.log(res.data);
                refreshList();
            })
            .catch(err => {
                console.log(err);
            });
    };
    const findByTitle = () => {
        ItemDataService.findByTitle(searchTitle)
            .then(res => {
                setItems(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='list row'>
            <div className='col-md-8'>
                <div className='input-group mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search by title'
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className='input-group-append'>
                        <button className='btn btn-outline-secondary' type='button' onClick={findByTitle}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <h4>Items List</h4>
                <ul className='list-group'>
                    {items && items.map((item, index) => {
                        <li className={'list-group item' + (index === currentIndex ? 'active' : '')}
                            onClick={() => setActiveItem(item, index)}
                            key={index}
                        >
                            {item.title}
                        </li>
                    })}
                </ul>
                <button className='m-3 btn btn-sm btn-danger' onClick={removeAllItems}>
                    Remove All
                </button>
            </div>
            <div className='col-md-6'>
                {currentItem ? (
                    <div>
                        <h4>Item</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{' '}
                            {currentItem.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{' '}
                            {currentItem.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{' '}
                            {currentItem.published ? 'Published' : 'Pending'}
                        </div>
                        <Link to={'/items' + currentItem.id} className='badge badge-warning'>
                            Edit
                        </Link>
                    </div>
                ):(
                    <div>
                        <br/>
                        <p>Please Click on an Item</p>
                    </div>
                )
            }
            </div>
        </div>
    )
};
export default ItemsList;