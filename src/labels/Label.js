import React, { useEffect, useState } from 'react'
import './Label.css'
export default function Label({data, id, changeLabel, changeBoth}) {
    const [img,setImg] = useState('')

    useEffect(()=>{
        getImage()
    },[data.property,data.value])



    function getImage(){
        switch(data.property){
            case 'attribute':
              setImg(`/assets/attributes/${data.value}.webp`)
              break
            case 'race':
              setImg(`/assets/races/${data.value}.webp`)
              break
            case 'level':
              setImg(`/assets/levels/level_${data.value}.webp`)
              break
            case 'rank':
              setImg(`/assets/levels/rank_${data.value}.webp`)
              break
            case 'atk':
              setImg(`/assets/other/atk.webp`)
              break
            case 'def':
              setImg(`/assets/other/def.webp`)
              break
            case 'pend_scale':
              setImg(`/assets/levels/pend_scale_${data.value}.webp`)
              break
            case 'type':
              setImg(`/assets/card-types/${data.value}.webp`)
              break
            case 'md_rarity':
              setImg(`/assets/rarities/${data.value.split(' ').join('_')}.webp`)
              break
            case 'ocg_status':
              setImg(`/assets/other/${data.value}.webp`)
                break
            case 'tcg_status':
             setImg(`/assets/other/${data.value}.webp`)
                break
            case 'md_status':
              setImg(`/assets/other/${data.value}.webp`)
              break
            case 'link_rating':
              setImg(`/assets/levels/link_${data.value}.webp`)
              break
            case 'notloaded' :
                setImg(`/assets/other/default.webp`)
            break
          }
    }

    function getRandom(){
        fetch(`http://localhost:8080/randomize`).then((r)=>{
            if(r.ok){
              r.json()
              .then((d)=>{
                console.log(d)
                changeBoth(id,d)

            })
            }
          })
    }


  return (
    <div className='label'>
        <button onClick={getRandom}>Randomize</button>
        <label>Property:</label>
        <input type='text' value={data.property} onChange={(e)=>changeLabel(id.number,'property',e.target.value.toLocaleLowerCase())}/>
        <label>Value</label>
        <input type='text' value={data.value} onChange={(e)=>changeLabel(id.number,'value',e.target.value.toLocaleLowerCase())}></input>

        <div style={{display:'flex'}}>
            <p>{data.property}</p>
            <img src={img} alt={`${data.property}-image`}/>
        </div>


    </div>
  )
}
