import React from 'react'
import { MakhanaPop } from './MakhanaGraphic'

export default function FlavorPlate({ item, className = '' }) {
  const color = item?.swatch === 'chili' ? '#A9223A' : item?.swatch === 'pudina' ? '#17245B' : '#E2AE35'
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <MakhanaPop className="w-20 h-20" color={color} />
    </div>
  )
}
