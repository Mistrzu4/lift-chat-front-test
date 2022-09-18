import { useState, useEffect, Fragment } from 'react';
import React from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./features/postsSlice";
import { TextField } from '@mui/material';
import moment from 'moment';

const Input = ({ scrollToBottom, classNamesInput, nickname }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const onSavePostClicked = () => {
        var message = text;
        var user = nickname;
        var date = moment().add(2, 'hours');
        console.log(text, user, date);
        dispatch(addNewPost({ message, user, date })).unwrap().then(() => {
            scrollToBottom();
        })
        setText('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onSavePostClicked();
    }

    return (
        <div className={`Input ${classNamesInput}`}>
            <form onSubmit={e => onSubmit(e)}>
                <TextField
                    id="filled-basic"
                    label="Winda-domość"
                    type="text"
                    variant="filled"
                    style={{ width: '100%' }}
                    onChange={e => setText(e.target.value)}
                    value={text}
                />
                <Button type="submit" variant="contained" style={{ backgroundColor: '#8e969d' }}>Wyślij</Button>
            </form>
        </div>
    );
}

export default Input;