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


import Form from 'react-bootstrap/Form';
import { BookTwoTone, EventSeatSharp, FormatColorReset, SelectAllSharp } from '@material-ui/icons';
import { isDOMComponent } from 'react-dom/test-utils';


export function Login() {
    const history = useHistory();
    const [theatorlist, setTheatorlist] = useState([]);
    const [usertheator,setuserTheator]=useState();
    const [contentflag,setcontentflag]=useState(false);
    const [filteredtheator,setfilteredtheator]=useState();
    const [booked,setbooked]=useState([])

    const[id,setid]=useState([])
    const cost=400
    var val,stat

    const [k,setk]=useState([])

    const [ct,setct]=useState(0)
    const [kseats,setkseats]=useState(0)

    async function getRooms() {
        fetch(apiendpoint + "/client", {
            method: "GET",
            headers: { 'Access-Control-Allow-Origin': "*" }
        })
            .then((data) => data.json())
            .then((rooms) => setTheatorlist(rooms));

    }
    useEffect(() => {
        getRooms();
    }, []);

   function setrequest(){
       //history.push("/client"+"/"+usertheator)
       setcontentflag(true)
       getRooms()
       setid(usertheator)
       setfilteredtheator(theatorlist.filter((e)=>e._id==usertheator))
       
   }

   function booking(id){
        
        if(booked.filter((e)=>e===id).length===0)
        {
            
            setbooked([...booked,id])
            setk([...k,id])
            setct(ct+1)
            bookeTheSeats();
        }
        else
        {
            setbooked(booked.filter((e)=>e!==id))
            setk(k.filter((e)=>e!==id))
            setct(ct-1)
        }
        
   }

   async function bookeTheSeats(){
    var ts=typeof(filteredtheator)!=="undefined"?(filteredtheator[0].seats):""
    //console.log(ts)
    // console.log(booked)
    // console.log(id)
    var arr=[booked,id,ts]
    fetch(apiendpoint + "/client" ,
            {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(
                    arr
                    ),
            })
            .then((data) => data.json())
            .then(()=>{
                setrequest();
                getRooms();
                window.location.reload();
            })
            // .then(() => (setrequest())
            // .then(()=>getRooms())
    
   }

   useEffect(() => {
    bookeTheSeats();
}, []);

//    console.log(...k)
//    console.log(booked)

   const m=typeof(filteredtheator)!=="undefined"? filteredtheator[0].rows:""
   const n=typeof(filteredtheator)!=="undefined"? filteredtheator[0].columns:""
    return (
        <>
            <Container className="maincontainer">
                <Row className="r1">
                    <div className="form">
                        <Form.Select
                            onChange={(event) => setuserTheator(event.target.value)}
                            aria-label="Default select example">
                            <option value="gg">Select Theator...</option>
                            {
                            theatorlist.map((e) => (<option value={e._id}>{e.theatorNumber} : {e.movie} ====> {e.timings}</option>))
                            }
                        </Form.Select>

                        <Button variant="primary"

                            onClick={() => setrequest()}
                        >
                            Submit
                        </Button>

                    </div>
                </Row>
           

                <Row>
                {
                    typeof(filteredtheator)!=="undefined"?
                    (<div id="card_body">
                        <Card id="card_head">
                        <h2>{filteredtheator[0].theatorNumber}</h2>

                        <Card id="card_des">
                        <h1>{filteredtheator[0].movie}</h1>
                        <h2>{filteredtheator[0].timings}</h2>
                        </Card>

                        <Card id="seat_card">
                        <div 
                            className="seatblock"
                            style={
                            {
                            display:"Grid",
                            padding:"2px",
                            gridTemplateColumns:`repeat(${n}, 1fr)`,
                            gridTemplateColumns:`repeat(${m}, 1fr)`
                            }
                            }>
                            {
                               filteredtheator[0].seats.map((e,i)=>( val=(Object.keys(e).[0]),stat=e[i+1],
                               stat===false ?
                                        <div 
                                        style=
                                        {
                                            {backgroundColor: k.filter((e)=>e===i+1).length>0 ? "rgba(0, 234, 233, 0.4)":""}
                                            }
                                        className="tile" 
                                        onClick={()=>booking(i+1)}
                                        
                                        ><b>{i+1}</b>
                                        </div>
                               :
                                        <div
                                        style={{backgroundColor:"tomato"}}
                                        className="tile"
                                        >
                                        <b>{i+1}</b>
                                        </div>

                               )
                               ) 
                            
                            }

                        </div>
                        </Card>
                        </Card>
                    </div>)
                    :""
                }
                </Row>
                <div class='bill-description'>
                    <Card className="smc"><h3>No.of seats selected : {ct} </h3></Card>
                    <Card className="smc"><h3>Cost per ticket :  Rs. {cost}</h3></Card>
                    <Card className="smc"><h3>Total Amount</h3><h1> Rs. {ct*cost}</h1></Card>
                    <Button variant="primary"
                    onClick={()=>typeof(filteredtheator)!=="undefined"?bookeTheSeats():""}
                    >
                        PAY
                    </Button>
                </div>
            </Container>
        </>
    );
}


