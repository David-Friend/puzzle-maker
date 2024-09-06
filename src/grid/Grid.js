import React, { useState } from 'react'
import Cell from '../cells/Cell'
import Label from '../labels/Label'
import './Grid.css'

export default function Grid() {
const [row1, setRow1] = useState({property:'notLoaded', value:'default'})
const [row2, setRow2] = useState({property:'notLoaded', value:'default'})
const [row3, setRow3] = useState({property:'notLoaded', value:'default'})
const [column1, setCol1] = useState({property:'notLoaded', value:'default'})
const [column2, setCol2] = useState({property:'notLoaded', value:'default'})
const [column3, setCol3] = useState({property:'notLoaded', value:'default'})
const [date,setDate] = useState(Date.now)

function changeRow(id,key,value){
switch(id){
    case 0:
        key=='property'?setRow1({property:value, value:row1.value}):setRow1({value:value, property:row1.property})
        break
    case 1:
        key=='property'?setRow2({property:value, value:row2.value}):setRow2({value:value, property:row2.property})
        break
    case 2:
        key=='property'?setRow3({property:value, value:row3.value}):setRow3({value:value, property:row3.property})
        break
    }
}


function changeBoth(id,data){
    if(id.axis=='row'){
        switch(id.number){
            case 0:
                setRow1(data)
                break
            case 1:
                setRow2(data)
                break
            case 2:
                setRow3(data)
                break
        }
    }
    if(id.axis =='column'){
        switch(id.number){
            case 0:
                setCol1(data)
                break
            case 1:
                setCol2(data)
                break
            case 2:
                setCol3(data)
                break
        }
    }
}


function changeColumn(id,key,value){
    switch(id){
        case 0:
            key=='property'?setCol1({property:value, value:column1.value}):setCol1({value:value, property:column1.property})
            break
        case 1:
            key=='property'?setCol2({property:value, value:column2.value}):setCol2({value:value, property:column2.property})
            break
        case 2:
            key=='property'?setCol3({property:value, value:column3.value}):setCol3({value:value, property:column3.property})
            break
        }
}
function getDate(date){
    let x = date
    if (x) {
        x = x.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) {
            return m + '/' + d + '/' + y;
        });
    }
    return x
}

function createBoard(){
    const rows = [{property:row1.property, value:row1.value},{property:row2.property, value:row2.value},{property:row3.property, value:row3.value}]
    const columns = [{property:column1.property, value:column1.value},{property:column2.property, value:column2.value},{property:column3.property, value:column3.value}]


    fetch(`http://localhost:8080/makepuzzle`, {
        method: "POST",
        body: JSON.stringify({
            rows:rows,
            columns: columns,
            createdDate: date,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
}




return (
    <div>
        <button>Randomize All</button>
        <div className='cellContainer'>
        <div className='rowLabels'>
           <Label data={row1} id={{axis:'row',number:0}} changeLabel={changeRow} changeBoth={changeBoth}/>
           <Label data={row2} id={{axis:'row',number:1}} changeLabel={changeRow} changeBoth={changeBoth}/>
           <Label data={row3} id={{axis:'row',number:2}} changeLabel={changeRow} changeBoth={changeBoth}/>
        </div>
        <div className='columnLabels'>
         <Label data={column1} id={{axis:'column',number:0}} changeLabel={changeColumn} changeBoth={changeBoth}/>
         <Label data={column2} id={{axis:'column',number:1}} changeLabel={changeColumn} changeBoth={changeBoth}/>
         <Label data={column3} id={{axis:'column',number:2}} changeLabel={changeColumn} changeBoth={changeBoth}/>
        </div>
        <Cell row={row1} column={column1}/> <Cell row={row1} column={column2}/> <Cell row={row1} column={column3}/>
        <Cell row={row2} column={column1}/> <Cell row={row2} column={column2}/> <Cell row={row2} column={column3}/>
        <Cell row={row3} column={column1}/> <Cell row={row3} column={column2}/> <Cell row={row3} column={column3}/>
        </div>
        <form onSubmit={(e)=>{e.preventDefault();createBoard()}}>
        <label>Date:</label>
        <input type='date' onChange={(e)=>setDate(getDate(e.target.value))}/>
        <button>Submit</button>
        </form>
    </div>
  )
}
