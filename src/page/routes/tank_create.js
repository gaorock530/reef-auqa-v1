import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import DayPicker from 'react-day-picker'
import {Helmet} from 'react-helmet'
import Input from '../../components/form/input'
import Option from '../../components/form/optionInput'
import Select from '../../components/form/select'
import Photo from '../../components/photo'
import {LocalTanks} from '../../helper/database'
import cuid from 'cuid'
import {metrics as metri, convert as conv, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT} from '../../helper/constVar'


import { faRulerVertical, faRulerHorizontal, faRuler } from '@fortawesome/free-solid-svg-icons'



export default () => {
  const errorMsg = "* 信息填写错误，请检查"
  const type = ['海水', '淡水']
  const demension = metri.length
  const metrics = metri.lengthText
  const convert = conv.lengthToM
  const [done, setDone] = useState(false)
  const [first, setFirst] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedDay, setSelectedDay] = useState()
  const [error, setError] = useState(false)
  const [option, setOption] = useState(0)
  const [data, setData] = useState({
    main: {
      length: 0,
      width:0,
      height: 0,
      deep: 0
    },
    sump: {
      length: 0,
      width:0,
      height: 0,
      deep: 0
    },
    metrics: 'mm',
    volume: 0,
    photo: null,
    name: '',
    type: false, // 海水
    size: '',
    sumpSize: ''
  })

  const onOptionChange = (v) => {
    setOption(v)
    const oldData = data
    oldData.metrics = demension[v]
    const output = calc(oldData, Number(v))
    oldData.volume = output.volume
    oldData.size = output.size
    oldData.sumpSize = output.sumpSize
    setData(oldData)
  }

  const calc = (ob, o) => {
    const op = o === undefined? option: o
    const output = {
      size: `${ob.main.length}${metrics[op]}×${ob.main.width}${metrics[op]}×${(ob.main.height || ob.main.deep)}${metrics[op]}`,
      sumpSize: `${ob.sump.length}${metrics[op]}×${ob.sump.width}${metrics[op]}×${(ob.sump.height || ob.sump.deep)}${metrics[op]}`,
    }
    const mainVolume = ob.main.length * convert[op] * ob.main.width * convert[op] * (ob.main.deep || ob.main.height) * convert[op]
    const sumpVolume = ob.sump.length * convert[op] * ob.sump.width * convert[op] * (ob.sump.deep || ob.sump.height) * convert[op]
    output.volume = Number(((mainVolume + sumpVolume) * 1000).toFixed(2))
    // result in Liters
    return output
  }

  const onChange = (cate, type, v) => {
    const oldData = data
    oldData[cate][type] = v
    const output = calc(oldData)
    oldData.volume = output.volume
    oldData.size = output.size
    oldData.sumpSize = output.sumpSize
    setData(oldData)
    if (error) setError(false)
  }

  const onChangeType = v => {
    const oldData = data
    oldData.type = !!v
    setData(oldData)
    if (error) setError(false)
  }

  const onName = v => {
    const oldData = data
    oldData.name = v
    setData(oldData)
    if (error) setError(false)
  }

  const onSelect = d => {
    const oldData = data
    oldData.photo = d
    setData(oldData)
    if (error) setError(false)
  }

  const onDayClick = v => {
    setSelectedDay(v)
    if (error) setError(false)
    // console.log(v)
  }

  const onSubmit = async e => {
    e.preventDefault()
    // console.log(data)
    if (!data.name || data.name.length > 20) return setError(true)
    if (!data.photo || data.photo.size > 500000) return setError(true)
    if (data.main.length * data.main.width * data.main.height * data.main.deep <= 0) return setError(true)
    if (data.main.height <= data.main.deep) return setError(true)
    if (data.sump.length + data.sump.width + data.sump.height + data.sump.deep > 0 && (!data.sump.length || !data.sump.width || !data.sump.height || !data.sump.deep)) return setError(true)
    if (data.sump.length && data.sump.width && data.sump.height && data.sump.deep && data.sump.height <= data.sump.deep) return setError(true)
    if (!first && !selectedDay) return setError(true)
    if (!first && selectedDay.getDate() >= new Date().getDate()) return setError(true)
    setUploading(true)
    // console.log('submit!')
    // setDone(true)
    const writeData = {
      name: data.name,
      type: !data.type,
      size: data.size,
      volume: data.volume,
      photo: 0,
      status: null,
      view: 0,
      like: 0,
      run: 0,
      last: 0,
      tags: ['从零开始'],
      cover: data.photo
    }

    await LocalTanks.setItem(cuid(), writeData)
    setUploading(false)
    setDone(true)
  }

  


  return done?<Redirect to="/tanks"/>:(
    <>
      <Helmet>
        <title>创建鱼缸</title>
        <meta name="description" content="ReefAqua 创建鱼缸" />
      </Helmet>
      <div className="constrained--small">
        <form onSubmit={onSubmit} noValidate>
          <Input placeholder="鱼缸名称" onChange={onName}/>
          <h3>全新开缸：</h3>
          <Select options={['是', '否']} onChange={() => setFirst(!first)}/>
          {!first && <>
            <h3>开缸时间：</h3>
            <DayPicker
              month={new Date()}
              locale="zh"
              months={MONTHS}
              weekdaysLong={WEEKDAYS_LONG}
              weekdaysShort={WEEKDAYS_SHORT}
              firstDayOfWeek={0}
              onDayClick={onDayClick}
              selectedDays={selectedDay}
              fixedWeeks
              fromMonth={new Date(1980, 1, 1)}
              toMonth={new Date()}
              disabledDays={[{after: new Date()}]}
            />
          </>}
          <h3>鱼缸类型：</h3>
          <Select options={type} onChange={onChangeType}/>
          <Photo onSelect={onSelect}>封面照片</Photo>
          <h3>主缸：</h3>
          <Option options={demension} placeholder="长度" icon={faRuler} onChange={onChange.bind(this, 'main', 'length')} onOption={onOptionChange} defaultOption={option}/>
          <Option options={demension} placeholder="宽度" icon={faRulerHorizontal} onChange={onChange.bind(this, 'main', 'width')} onOption={onOptionChange} defaultOption={option}/>
          <Option options={demension} placeholder="高度" icon={faRulerVertical} onChange={onChange.bind(this, 'main', 'height')} onOption={onOptionChange} defaultOption={option}/>
          <Option options={demension} placeholder="水深" icon={faRulerVertical} onChange={onChange.bind(this, 'main', 'deep')} onOption={onOptionChange} defaultOption={option}/>
          <h3>底缸：(选填)</h3>
          <Option options={demension} placeholder="长度" icon={faRuler} onChange={onChange.bind(this, 'sump', 'length')} onOption={onOptionChange} defaultOption={option}/>
          <Option options={demension} placeholder="宽度" icon={faRulerHorizontal} onChange={onChange.bind(this, 'sump', 'width')} onOption={onOptionChange} defaultOption={option}/>
          <Option options={demension} placeholder="高度" icon={faRulerVertical} onChange={onChange.bind(this, 'sump', 'height')} onOption={onOptionChange} defaultOption={option}/>
          <Option options={demension} placeholder="水深" icon={faRulerVertical} onChange={onChange.bind(this, 'sump', 'deep')} onOption={onOptionChange} defaultOption={option}/>
          {error && <h5>{errorMsg}</h5>}
          <h5>* 所有信息创建后无法修改，请认真填写。</h5>
          <button disabled={uploading}>创建</button>
        </form>
      </div>
      
    </>
  )
}