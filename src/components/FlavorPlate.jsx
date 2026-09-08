import React from 'react'
import { MakhanaPop } from './MakhanaGraphic'

export default function FlavorPlate({ item, className = '' }) {
  const color = item?.swatch === 'chili' ? '#FF3B00' : item?.swatch === 'pudina' ? '#107C41' : '#F5A623'
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <MakhanaPop className="w-20 h-20" color={color} />
    </div>
  )
}
