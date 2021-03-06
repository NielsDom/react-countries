import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'

const List = ({
  info,
  textInput
}) => {

  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })


  const highlight = (tohighlight) => tohighlight.split('').map(x=> textInput.toUpperCase().includes(x.toUpperCase()) ? <span style={{backgroundColor: 'rgb(61, 174, 163)', color:'white'}}>{x}</span> : <span>{x}</span>)

  return <div className='itemContainer' onClick={()=>console.log(info)}>
  <div className='itemImage'>
    <img src={info.flag} style={{height:80, marginTop: 10, flex: 1, paddingRight: 15 }} alt="Logo" />
  </div>
  <div style={{display: 'flex', position: 'relative', flex: 6, flexDirection: 'column', height: 100}} onClick={() => set(state => !state)}>
    <animated.div style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
    <div className='itemInfoContainer'>
      <div>country: <b>{highlight(info.name)}</b>({info.nativeName})</div>
      <div>capital: <b>{highlight(info.capital)}</b></div>
      <div>gini: <b>{info.gini === ''? 'null' : info.gini}</b></div>
      <div>population: <b>{info.population}</b></div>
    </div>
    </animated.div>
    <animated.div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
    <div className='itemInfoContainer'>
      <div>languages: {info.languages.map(({name})=> <b key={name}>{name} /</b>)} </div>
      <div>currency: <b>{info.currencies[0].name+'('+info.currencies[0].symbol+')'}</b></div>
      <div>regional blocs: <b>{info.regionalBlocs.map(({name})=><b key={name}>{name} /</b>)}</b></div>
      <div>population: <b>{info.population}</b></div>
    </div>
    </animated.div>
  </div>

</div>
}

export default List