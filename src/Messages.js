import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, fetchPosts } from "./features/postsSlice";
import { useEffect } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import moment from 'moment';
import 'moment/locale/pl'


const Messages = ({ classNamesContent, scrollRef, scrollToBottom }) => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);


    useEffect(() => {
        dispatch(fetchPosts())
            .then(() => {
                scrollToBottom();
            })
    }, [dispatch])

    const renderMessage = (message) => {
        return (
            <li className={'Messages-message'} >
                <div>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <Typography variant="caption" display="block" gutterBottom style={{ opacity: '50%', marginTop: '20px' }} sx={{ fontSize: 10 }} >
                            {moment(message.date).fromNow()}
                        </Typography>

                    </Grid>

                    <Typography variant="caption" display="block" gutterBottom style={{ opacity: '70%', marginBottom: '0px' }} >
                        {message.user}
                    </Typography>

                    <div className="Messages">
                        <span>{message.message}</span>
                    </div>


                </div>
            </li >
        );
    }
    return (
        <ul className={`Messages-list ${classNamesContent}`} ref={scrollRef} id="elo">
            {posts.map(m => renderMessage(m))}
        </ul>
    );
}

export default Messages;