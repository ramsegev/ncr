import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import UsersTable from "./UsersTable";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    searchInput: {
        margin: "15px 0"
    },
    hideAlert: {
        display: "none"
    },
});
const Users = () => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [toggleAlert, setToggleAlert] = useState(classes.hideAlert);
    const WAIT_INTERVAL = 1000
    let timerID;
    let rowsArray = [];
    useEffect(() => {
        rowsArray = [];
        getUsers(1);
    }, []);
    useEffect(() => {
        setFilteredRows(rows);
        setToggleAlert(rows.length > 0 ?  classes.hideAlert : "");
    }, [rows]);
    const getUsers = (pageNum) => {
        fetch("https://jsonmock.hackerrank.com/api/article_users/?page="+pageNum)
            .then(res => res.json())
            .then(res => {
                res.data.forEach( row => {
                    rowsArray.push(createData(row.username, row.about, row.submission_count, row.comment_count, row.created_at))
                    //return createData(row.username, row.about, row.submission_count, row.comment_count, row.created_at)
                });
                setRows([...rowsArray, ...rows]);
                if(res.total>rowsArray.length)
                    getUsers(pageNum+1);
            }).catch(err=>console.log(err))
    };
    const createData = (
        userName,
        about,
        submittedArticles,
        commentsCount,
        signupDate,
    ) => {
        return { userName, about, submittedArticles, commentsCount, signupDate};
    };
    const handleSearch = (e) => {
        const rowsArray = [];
            rows.forEach((row) =>{
            if(row.userName.search(e.target.value) > -1)
                rowsArray.push(row);
        })
        clearTimeout(timerID)
        timerID = setTimeout(() => {
            setFilteredRows(rowsArray);
        }, WAIT_INTERVAL)
    }


    return (
        <>
            <div className={classes.container} >
                <TextField id="outlined-search" label="Search by Name" type="search" variant="outlined" className={classes.searchInput} onChange={handleSearch}/>
                <Alert className={toggleAlert} severity="info" color="info">
                    Information is being fetched from the service
                </Alert>
            </div>
            <UsersTable key={filteredRows} rows={filteredRows} />

        </>
    );
}
export default Users;