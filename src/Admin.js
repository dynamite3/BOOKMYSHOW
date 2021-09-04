import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from 'react-bootstrap/Button';
import { apiendpoint } from './App';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles, withStyles } from '@material-ui/core/styles';

export function Admin() {

    const [theator, setTheator] = useState([]);
    const [theatorNumber, setTheatorNumber] = useState("")
    const [rows, setRows] = useState("")
    const [columns, setColumns] = useState("")
    const [movie,setMovie]=useState("")
    const [timings,setTimings]=useState("")
    const [seats, setSeats] = useState("")
    const [addroomflag,setaddroomflag]=useState(true)
    const [id,setid]=useState(null)

    function getRooms() {
        fetch(apiendpoint + "/admin", {
            method: "GET",
            headers: { 'Access-Control-Allow-Origin': "*" }
        })
            .then((data) => data.json())
            .then((rooms) => setTheator(rooms));

    }
    useEffect(() => {
        getRooms();
    }, []);


    function addRoom() {

        const total = rows * columns
        const seatdata = []
        for (var i = 1; i <= total; i++) {
            var obj={}
            obj[i] = false
            seatdata[i-1] = obj
        }
        console.log(seatdata)
        fetch(apiendpoint + "/admin",
            {

                method: "POST",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify(
                    [{
                        theatorNumber: theatorNumber,
                        rows: rows,
                        columns: columns,
                        seats: seatdata,
                        timings: timings,
                        movie : movie
                    }]),
            })
            .then((data) => data.json())
            .then(() => (
                getRooms(),
                removeContent(),
                handleClick()
            )
            );
    }

    function deletRoom(id) {
        fetch(apiendpoint + "/admin/" + id,
            { method: "DELETE" }
        )
            .then(() => getRooms())
    }

    function editRoom(id, name, rows, columns ,movie,timings) {
        setaddroomflag(!addroomflag)
        setid(id)
        addroomflag ? setTheatorNumber(name) : setTheatorNumber("")
        addroomflag ? setRows(rows) : setRows("")
        addroomflag ? setColumns(columns) : setColumns("")
        addroomflag ? setTimings(timings) : setTimings("")
        addroomflag ? setMovie(movie) : setMovie("")

    }
    function updateRoom() {
        const total = rows * columns
        const seatdata = []
        for (var i = 1; i <= total; i++) {
            var obj={}
            obj[i] = false
            seatdata[i-1] = obj
        }
        fetch(apiendpoint + "/admin/" + id,
            {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(
                    {
                        theatorNumber: theatorNumber,
                        rows: rows,
                        columns: columns,
                        seats: seatdata,
                        timings: timings,
                        movie : movie
                    }),
            })
            .then((data) => data.json())
            .then(() => (getRooms(),
                removeContent(),
                handleClick(),
                setaddroomflag(true)));

    }


    function removeContent() {
        setTheatorNumber("")
        setColumns("");
        setRows("")
        setMovie("")
        setTimings("")

    }


//snakbar
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': { marginTop: theme.spacing(2), },
        },
    }));
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
//snakbar close


    return (
        <>
            <Container className="maincontainer">
                <Row className="r1">
                    <div className="form">
                        <div className="subform">

                            <TextField
                                value={theatorNumber} id="filled-basic" label="Name" variant="filled"
                                onChange={(event) => setTheatorNumber(event.target.value)} />
                            <TextField
                                value={rows} id="filled-basic" label="Rows" variant="filled"
                                onChange={(event) => setRows(event.target.value)} />
                            <TextField
                                value={columns} id="filled-basic" label="Columns" variant="filled"
                                onChange={(event) => setColumns(event.target.value)} />
                        </div>
                        <div className="subform">

                            <TextField
                                value={movie} id="filled-basic" label="Movie" variant="filled"
                                onChange={(event) => setMovie(event.target.value)} />
                            <TextField
                                value={timings} id="filled-basic" label="Timings" variant="filled"
                                onChange={(event) => setTimings(event.target.value)} />
    
                        </div>


                        <Button variant="primary"
                            onClick={() => addroomflag? addRoom():updateRoom()}
                        >
                            { addroomflag ?  "ADD ROOM" : "UPDATE ROOM"}
                        </Button>
                    </div>

                </Row>

                <Row className="r2">
                    <div className="cardbox">
                        {theator.map((room) => <Room id={room._id} name={room.theatorNumber} rows={room.rows} columns={room.columns} seats={room.seats} movie={room.movie} timings={room.timings} deletRoom={deletRoom} editRoom={editRoom}/>)}
                    </div>
                </Row>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Action Successfull
                    </Alert>
                </Snackbar>
            </Container>

        </>
    );
}
function Room({ id, name, rows, columns, seats,movie,timings, deletRoom,editRoom }) {
    const history = useHistory();
    return (

        <Card
            onClick={() => history.push("/admin/" + id)}
            id="user_card" className="user_card"
        >
            <img className="profilepic" src="https://www.gannett-cdn.com/-mm-/c6ce345dd3cc67c30388965835e2347ef87cfcc7/c=0-366-2700-1885/local/-/media/2020/03/03/USATODAY/usatsports/MotleyFool-TMOT-b9d6657b-hotel-room.jpg?width=2700&height=1519&fit=crop&format=pjpg&auto=webp"></img>

            <div id="descrip">
                <h1>NAME : {name}</h1>
                <h4>ROWS : {rows}</h4>
                <h4>COLUMNS: {columns} </h4>

            </div>

            <div className="seats">

                <h2>SEATS : {seats.length}</h2>
            </div>

            <Card id="movie_card">
                <h2>{movie}</h2>
                <h4>{timings}</h4>
            </Card>


            <div className="list_option">
                <Fab
                    onClick={() => editRoom(id, name, rows, columns,movie,timings,)}
                    color="secondary" aria-label="edit">
                    <EditIcon />
                </Fab>
                <IconButton aria-label="delete"
                onClick={()=> deletRoom(id)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>

        </Card>
    );

}
