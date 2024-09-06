import React, { useEffect, useState } from 'react'
import './Cell.css'

export default function Cell({row, column}) {
    const [solutions,setSolutions] = useState(0)
    const [color, setColor] = useState('beige')
    useEffect(()=>{

        fetch(`http://localhost:8080/validate/${row.property}/${row.value}/${column.property}/${column.value}`)
        .then((r)=>{
            if(r.ok){
                r.json().then((d)=>setSolutions(d))
            }
        })
    },[row,column])

    function getColor(){
        if(solutions==0){
            return('red')
        }
        if(solutions>0&&solutions<3){
            return('orange')
        }
        else{
            return('green')
        }
    }



  return (
    <div className='cell' style={{backgroundColor:getColor()}}>
        <p>{solutions} Answer(s)</p>
        <p>Row Property: {row.property}</p>
        <p>Row Value: {row.value}</p>
        <p>Column Property: {column.property}</p>
        <p>Column Value: {column.value}</p>

    </div>
  )
}
