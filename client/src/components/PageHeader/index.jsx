import React from 'react'
import stytles from '../../css/PageHeader.module.css'

export default function PageHeader(props) {
  return (
    <div className={stytles.row}>
        <div className={stytles.pageHeader}>
            {props.title}
        </div>
    </div>
  )
}
