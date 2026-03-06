import React from 'react'
import Like from './Like'

const emotionStyles = {
  sadness: {
    bg: "bg-blue-200",
    emoji: "😢"
  },
  joy: {
    bg: "bg-yellow-200",
    emoji: "😄"
  },
  love: {
    bg: "bg-pink-200",
    emoji: "❤️"
  },
  anger: {
    bg: "bg-red-200",
    emoji: "😡"
  },
  fear: {
    bg: "bg-purple-200",
    emoji: "😨"
  },
  surprise: {
    bg: "bg-teal-200",
    emoji: "😲"
  }
}

const ThoughtCard = ({ content, id, emotion, confidence }) => {

  const style = emotionStyles[emotion] || { bg: "bg-orange-200", emoji: "💭" }
  const percent = confidence ? Math.round(confidence * 100) : 0

  return (
    <div>
      <div
        className={`relative md:p-4 p-3 m-auto font-oswald 
        ${style.bg} 
        w-[250px] h-[180px] md:w-[300px] md:h-[350px] 
        rounded-xl shadow-md flex flex-col justify-between`}
      >

        {/* Thought */}
        <p className='text-center font-bold md:text-lg text-sm m-auto'>
          {content}
        </p>

        {/* Emotion Badge */}
        <div className='flex items-center justify-between text-xs md:text-sm'>

          <div className='flex items-center gap-1 bg-white/60 px-2 py-1 rounded-full shadow'>
            <span>{style.emoji}</span>
            <span className='capitalize'>{emotion}</span>
          </div>

          {/* Confidence Bar */}
          {confidence && (
            <div className="flex flex-col items-end w-[80px]">
              <span className="text-[10px]">{percent}%</span>
              <div className="w-full bg-gray-300 rounded-full h-1">
                <div
                  className="bg-black h-1 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          )}

        </div>

      </div>

      <Like postid={id} />
    </div>
  )
}

export default ThoughtCard