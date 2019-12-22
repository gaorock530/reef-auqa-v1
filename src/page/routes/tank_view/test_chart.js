import React, {useRef, useEffect} from 'react'
import Chart from 'chart.js'
import Select from '../../../components/form/select'
import {isMobile} from '../../../helper/constVar'
import FileSaver from 'file-saver'
import {dataURLToBlob} from '../../../helper/utils'



export default function TankView ({data}) {
  const canvas = useRef()
  const chart = useRef()

  

  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    const config = {

      scales: {
          yAxes: [{
              ticks: {
                display: !isMobile
              }
          }],
          xAxes: [{
            ticks: {
              display: !isMobile
            }
        }]
      },
      aspectRatio: isMobile?1:2,
      spanGaps: true,
      layout: {
        padding: {
            right: 10,
        }
      }   
    }
    console.log('draw')
    chart.current = new Chart(ctx, {
      type: 'line',
      
      data: {
        labels: ['11', '11', '11', '11', '11', '11', '11', '11', '11'],
        datasets: [{
            label: 'NO2',
            data: [21, 17, 12, 41, 12, 13.5, null, 13, 15],
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 5,
            pointHoverRadius: 6
        },
        {
          label: 'NO3',
          data: [12, 19, 3, 5, 2, 3.5],
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
            pointHitRadius: 5,
            pointHoverRadius: 6
        },
        {
          label: 'PH',
          data: [8, 7.9, 7.8, 7.8, 7.9, 8.1],
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
            pointHitRadius: 5,
            pointHoverRadius: 6
        }]
      },
      options: config
  })
    return () => {
      chart.current.destroy()
    }
  }, [])

  const onSave = () => {
    const a = chart.current.toBase64Image()
    const blob = dataURLToBlob(a)
    FileSaver.saveAs(blob, 'file.png')
  }


  return (
    <div className="tank-view-block tank-param-graph">
      <div className="tank-graph-tools">
        <Select options={['KH+PH', 'KH+Ca+Mg', 'NO2+NO3+PO4']} className="tank-graph-tools--select"/>
        <Select options={['最近5次', '最近10次', '最近20次']} className="tank-graph-tools--select"/>
        {!isMobile && <button onClick={onSave}>保存</button>}
      </div>
      <canvas ref={canvas}></canvas>
    </div>
  )
}