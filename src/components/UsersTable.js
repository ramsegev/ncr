import React, {useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    tableContainer: {
        height: "80%",
    },
    emptyTable: {
        margin: "auto",
        fontSize: "2rem"
    }
});
const UsersTable = props => {
    const classes = useStyles();

    const {rows} = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const columns = [
        { id: 'userName', label: 'User Name', minWidth: 150 },
        { id: 'about', label: 'About', minWidth: 100},
        {
            id: 'submittedArticles',
            label: 'Submitted Articles',
            minWidth: 150,
            align: 'right',
        },
        {
            id: 'commentsCount',
            label: 'Comments Count',
            minWidth: 150,
            align: 'right',
        },
        {
            id: 'signupDate',
            label: 'Signup Date',
            minWidth: 150,
            align: 'right',
            format: value => {
                const date = new Date(value*1000);
                return (date.getMonth()+1) + "/" + date.getDay() + "/" + date.getFullYear()
            }
        },
    ];
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow hover tabIndex={-1} key={"row_"+row.userName + index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        }) :  <TableRow><TableCell className={classes.emptyTable}>User was not found</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage="Users per page"
                labelDisplayedRows={
                    ({ from, to, count }) =>`Total of ${count} Users`
                }
            />
        </Paper>
    );
};

export default UsersTable;